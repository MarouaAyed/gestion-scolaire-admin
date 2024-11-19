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
  editingRole: Role = new Role();

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

  insertRole() {
    this.roleService.insertRole(this.role).subscribe((res) => {
      this.roles.push(res);
      this.role = new Role();
      window.location.reload();
    });
  }

  deleteRole(id: any) {
    this.roleService.deleteRole(id).subscribe((res) => {
      this.getRoleData();
    });
  }

  // Select a Role to edit and open the modal
  openEditRoleModal(ville: Role) {
    this.editingRole = { ...ville }; // Make a copy to edit
  }

  // Update Role data on the server
  updateRole() {
    if (this.editingRole) {
      this.roleService.updateRole(this.editingRole).subscribe((res) => {
        this.getRoleData();
        this.editingRole = new Role();
        window.location.reload();
      });
    }
  }
}
