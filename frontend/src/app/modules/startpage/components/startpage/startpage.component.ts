import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.scss']
})
export class StartpageComponent implements OnInit {

  public readonly cards: string[] = [
    "this is test one asdfasdf asdfasdf ",
    "testing a second caaard this time",
    "creative is the absolute opposite of this",
    "even more things",
    "fifth item, but its not full yet",
    "this is the last item in the startpage"
  ];

  constructor() { }

  ngOnInit() {
  }

}
