import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { ForumService } from '../../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {

  lastQuestions: Question[] = [];

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.lastQuestions = this.forumService.listAllQuestions('0');
  }

}
