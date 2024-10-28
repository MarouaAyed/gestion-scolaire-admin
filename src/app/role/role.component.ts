import { Component, OnInit } from '@angular/core';
import { Role } from '../models/role/role.model';
import { RoleService } from '../services/role/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  roles: any[] = [];
  role: Role;

  constructor(private roleService: RoleService, private router: Router) {
    this.role = new Role();
  }

  ngOnInit(): void {
    this.getRoleData();
  }
  getRoleData() {
    console.log('liste des roles');
    this.roleService.getRoles().subscribe((res) => {
      console.log(res);
      this.roles = res['roles'];
    });
  }
  /*
 
  insertTrancheHoraire(){
    //console.log('bonjour-insertion-test');
    //console.log(this.product);


    this.tranchehoraireService.insertTrancheHoraire(this.tranchehoraire).subscribe(res =>{
      console.log(res);
     // this.getProductData();
    })
  } */

  insertRole() {
    //console.log('bonjour-insertion-test');
    //console.log(this.product);
    this.roleService.insertRole(this.role).subscribe((res) => {
      console.log(res);
      //this.roles = res['roles']
      this.roles.push(res);
      this.role = new Role();
      // this.getProductData();
    });
  }

  deleteRole(id: any) {
    //console.log(id);
    this.roleService.deleteRole(id).subscribe((res) => {
      //console.log(res);
      this.getRoleData();
    });
  }

  updateRole(id: any): void {
    this.router.navigate(['/edit-role', id]);
  }
}
