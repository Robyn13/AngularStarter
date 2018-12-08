import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
    exports: [RouterModule],
    providers: [],
})
export class RoutingModule {}