import { Component } from '@angular/core';
import axios from 'axios';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  students: any[] = [];
  products = [...products];
  showForm: boolean = false;
  addurl:any;
  fetchurl:any;

  // New variables to hold input field values
  newStudent = {
    name: '',
    age: '',
    dob: '',
    email: ''
  };
  ngOnInit(): void {
    this.fetchStudents();
console.log(window.location.origin)
console.log(window.location.origin.includes('localhost'))
this.addurl = window.location.origin.includes('localhost') ? 'http://localhost:3000/api/students/add' : 'http://54.167.60.106/api/students/add';
this.fetchurl = window.location.origin.includes('localhost') ? 'http://localhost:3000/api/students' : 'http://54.167.60.106/api/students';
console.log(this.fetchurl,"--------------")
  }

  addStudent(): void {

    axios.post(this.addurl, this.newStudent)
      .then(response => {
        console.log('Student added:', response.data);
        this.students.push(response.data); // Add the new student to the list
        this.fetchStudents();
        this.showForm = false; // Hide the form after successful submission
      })
      .catch(error => {
        console.error('Error adding student:', error);
      });
  }
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  fetchStudents(): void {
    axios.get(window.location.origin.includes('localhost') ? 'http://localhost:3000/api/students' : 'http://54.167.60.106/api/students')
      .then(response => {
        console.log('API Response:', response.data);
        this.students = response.data;
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }
  
}
