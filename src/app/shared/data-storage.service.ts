import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import "rxjs";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";


@Injectable()
export class DataStorageService{
    url: string = 'https://recipe-book-abccd.firebaseio.com/';
    constructor(private http: Http, private recipeService: RecipeService){ }

    storeRecipes(){
       return  this.http.put(this.url+'/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes(){
        this.http.get(this.url+'/recipes.json')
        .pipe(map((response: any) => {
                const recipes:Recipe[]=response.json()
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
             } ))
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
     }
}