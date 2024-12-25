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

  // New variables to hold input field values
  newStudent = {
    name: '',
    age: '',
    dob: '',
    email: ''
  };
  ngOnInit(): void {
    this.fetchStudents();
  }

  addStudent(): void {
    axios.post('http://localhost:3000/api/students/add', this.newStudent)
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
    axios.get('http://localhost:3000/api/students')
      .then(response => {
        console.log('API Response:', response.data);
        this.students = response.data;
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }
  
}
