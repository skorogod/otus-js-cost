import type { BaseState } from ".";

export interface SettingsState extends BaseState  {
}

export type Dates = {[key: string]: {total: number}}

export type Category = {
    id: string,
    name: string,
    dates: Dates;
    subCategories: {[key: string]: SubCategory};
}

export type Categories = {[key: string]: Category | SubCategory}

export type SubCategory = Omit<Category, "subCategories">

export type CostDate = {
    total: Number
}


export interface DashboardState  extends BaseState 
{   
    checkedCategory: Category['id'];
    checkedSubcategory: SubCategory['id'];
}