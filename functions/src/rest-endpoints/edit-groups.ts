import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { validateFirebaseIdToken } from '../utils/validate-firebase-token-middleware';

const checkAuthorization: express.RequestHandler = async (req, res, next) => {
  // get the person doc
  const doc = (
    await admin
      .firestore()
      .collection('persons')
      .doc((req as any).uid)
      .get()
  ).data();
  // check if person exists
  if (!doc) {
    res.status(400).send({ error: 'no person document found for current user' });
    return;
  }
  // only admins are allowed to change groups
  if (!doc.groups.admin) {
    res.status(403).send({ error: 'only admins can change groups' });
  }
  next();
};

const app = express();
// allow cross-origin requests (currently only needed for testing in emulator)
app.use(cors({ origin: true }));
app.use(cookieParser());

app.use(validateFirebaseIdToken);
app.use(checkAuthorization);

app.post('/addGroup', async (req, res) => {
  // add group field in person map
  try {
    await admin
      .firestore()
      .collection('persons')
      .doc(req.body.data.id)
      .update({ [`groups.${req.body.data.group}`]: true });
  } catch (error) {
    res.status(500).send({ error: 'failed to update person' });
    return;
  }
  res.send({ data: `added group ${req.body.data.group} to ${req.body.data.id}` });
});

app.post('/removeGroup', async (req, res) => {
  // delete group field from person with provided id
  try {
    await admin
      .firestore()
      .collection('persons')
      .doc(req.body.data.id)
      .update({ [`groups.${req.body.data.group}`]: admin.firestore.FieldValue.delete() });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'failed to update person', error, field: `groups.${req.body.data.group}`, id: req.body.data.id });
    return;
  }
  res.send({ data: `removed group ${req.body.data.group} from ${req.body.data.id}` });
});

// export express app as cloud function
export const editGroups = functions.region('europe-west1').https.onRequest(app);
