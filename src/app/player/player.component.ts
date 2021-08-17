import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuizService } from '../Quiz-service/quiz.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private route:ActivatedRoute,private qService:QuizService,private locationSt:LocationStrategy) { }
  questions!:any[]
  marksGot=0
  correctAnswers=0
  attempted=0;
  pager = {
    index: 0,
    size: 1,
    count: 3
  };
  qid:any
  ngOnInit(): void {
    this.qid=this.route.snapshot.params.qid
    setTimeout(()=>{
      this.qService.getQuestionsOfQuizuser(this.qid).subscribe((data:any)=>{
  this.questions=data;
  this.questions.forEach(q=>{
    q['givenAnswer']='';
  })
  console.log(this.questions)
  this.pager.count=this.questions.length
      },(error)=>{
        Swal.fire("error","error in loading questions of  quiz")
      })
    })
    console.log(this.qid)
    window.addEventListener("keyup", disableF5);

    window.addEventListener("keydown", disableF5);
    
    
    function disableF5(e:any) {
      
      if ((e.which || e.keyCode) == 116) e.preventDefault(); 
      
    };
    //this.qService.getQuestionsOfQuizuser(qid).subscribe(data=>{
      this.preventBackButton();
    }
    preventBackButton() {
      this.locationSt.onPopState(() => {
        history.pushState(null, '',location.href);
        history.pushState(null, '',location.href);
      })
    }
    submitAnswers()
    {
      console.log(this.questions)
    }
    get filteredQuestions() {
    return (this.questions) ?
      this.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }
  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
     // this.mode = 'quiz';
    }
  }
  

}
