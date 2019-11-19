import { Injectable } from '@angular/core';
import { ComponentService } from '../../tui-core/component-creator/component.service';
import { MenuComponent } from './menu.component';
import { ViewTool } from '../../tui-core/component-creator/view-tool.class';
import { ComponentHandle } from '../../tui-core/component-creator/handle.class';
import { skipWhile } from 'rxjs/operators';
import { MenuOptions } from './menu-options.interface';
import { MenuItem } from '../collapse/node.interface';

@Injectable()
export class MenuService {

    private activeHandle: ComponentHandle;

    constructor(private componentService: ComponentService) { }

    showMenu(dom: HTMLElement, items: Array<string | MenuItem>, options?: MenuOptions) {
        try {
            // tslint:disable-next-line:no-unused-expression
            this.activeHandle && this.activeHandle.destroy();
            this.activeHandle = null;
        } catch (e) {

        }
        const handle = this.componentService.create(MenuComponent);
        const viewTool = new ViewTool();
        viewTool.toggleDom = dom;
        handle.instance.items = items;
        handle.instance.viewTool = viewTool;
        Object.assign(handle.instance, {
            offsetX: 0,
            offsetY: 0,
            position: Position.BOTTOM,
            minWidth: 0,
            animation: 'fadeIn',
            zIndex: '9999'
        }, options || {});
        handle.instance.handle = handle;
        this.activeHandle = handle;
        return handle.present().pipe(skipWhile(data => data === undefined));
    }
}

export enum Position {
    AUTO = 'auto',
    BOTTOM = 'bottom',
    TOP = 'top'
}