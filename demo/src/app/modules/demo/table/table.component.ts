import { Component } from '@angular/core';
import { Pagination, requestObject, TableHeader, ToastService, ConfirmService } from 'projects/ng-tui/src/public_api';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: './table.component.html'
})
export class TableComponent {

    theads: Array<TableHeader | string> = ['No.', 'User', 'Link', 'Time', 'Opt'];

    constructor(private confirm: ConfirmService, private toast: ToastService) { }

    deleteItem(itemIndex: number) {
        this.confirm.danger('Warning', 'Are you sure?').subscribe(_ => {
            console.log('delete item index => ', itemIndex);
            this.toast.success('Delete Success', 'It`s just a test, no one will be delete');
        });
    }

    dataLoader(page: Pagination) {
        console.log(page);
        // `https://api.github.com/search/repositories?q=java&page=${page.page}&per_page=${page.limit}`

        return requestObject(`https://randomuser.me/api/?seed=cool1024&page=${page.page}&results=${page.limit}`)
            .pipe(
                map(res => {
                    const total = 1000;
                    const data = res.results.map(user => ({
                        id: user.id.value,
                        avatar: user.picture.thumbnail,
                        nick: user.name.first,
                        email: user.email,
                        gender: user.gender,
                        cell: user.cell,
                        phone: user.phone,
                        address: `${user.location.city} ${user.location.street}`,
                        registered: user.registered
                    }));
                    return { result: true, total, data };
                })
            );
    }
}