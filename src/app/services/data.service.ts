import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class DataService {

	/**
	 * Constructor to declare defualt propeties of class.
	 * @param http - Declare Http Service property.
	 */
	constructor(private http: HttpService,
		private router: Router
	) { }

	login(){
		return this.http.get('users');
	}

	geStudentList(){
		return this.http.get('students');
	}

	onRegister(userObj){
		return this.http.post('users', userObj);
	}

	addUser(userObj){
		return this.http.post('students', userObj);
	}

	updateUser(userObj){
		const url = `students/${userObj.id}`;
		return this.http.put(url, userObj);
	}

	deleteUser(id){
		return this.http.delete(`students/${id}`);
	}

	logOut(){
		localStorage.clear();
		this.router.navigate(['auth/login']);
	}
	

}
