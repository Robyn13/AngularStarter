import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ServiceContractService } from './service/service-contract.service';

@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        HttpClientModule
    ],
    exports: [],
    providers: [
        ServiceContractService
    ],
})
export class CoreModule {}