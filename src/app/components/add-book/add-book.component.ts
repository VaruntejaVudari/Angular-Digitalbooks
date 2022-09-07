import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"]
})
export class AddBookComponent implements OnInit {
  addForm: FormGroup | undefined;

  constructor(
    private formBuilder: FormBuilder,
    
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      imgUrl: [""],
      title: [""],
      description: [""],
    });
  }

  addBook() {
    
    this.router.navigate(['/display']);
  }
}