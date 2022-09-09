import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/modle/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  form!: FormGroup;
  tasks: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];
  idUbdate: any;
  isUbdateBtn: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addTask() {
    this.tasks.push({
      name: this.form.value.name,
      description: this.form.value.description,
      done: false,
    });
    this.form.reset();
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
  deleteInprogressTask(index: number) {
    this.inprogress.splice(index, 1);
  }
  deleteDoneTask(index: number) {
    this.done.splice(index, 1);
  }
  editTask(item: Task, index: number) {
    this.form.controls['name'].setValue(item.name);
    this.form.controls['description'].setValue(item.description);
    this.isUbdateBtn = true;
    this.idUbdate = index;
  }
  ubdateTask() {
    this.tasks[this.idUbdate].name = this.form.value.name;
    this.tasks[this.idUbdate].description = this.form.value.description;
    this.tasks[this.idUbdate].done = false;
    this.form.reset();
    this.isUbdateBtn = false;
    this.idUbdate = undefined;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
