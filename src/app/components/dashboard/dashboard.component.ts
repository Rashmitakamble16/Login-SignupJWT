import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { ArticleInterface } from 'src/app/article.interface';
import { ArticleServiceService } from 'src/app/article.service.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  searchValue = '';
  articles : ArticleInterface[] = [];
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });
  
  public users: any = [];

  public fullName : string = "";
  constructor(private api : ApiService, private auth: AuthService, private userStore: UserStoreService, private articleService: ArticleServiceService, private fb: FormBuilder) { }

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res=>{
      this.users = res;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(val=>{
      let fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName = val || fullNameFromToken
    })
  }

  fetchData(): void {
    this.articleService.getArticles(this.searchValue).subscribe((articles) => {
      this.articles = articles;
    });
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }

  logout(){
    this.auth.signOut();
  }
}
