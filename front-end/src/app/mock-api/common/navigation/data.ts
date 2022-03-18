/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'tickets',
        title: 'Turnos',
        type: 'basic',
        icon: 'heroicons_outline:ticket',
        link: 'ticket',
        role: 'TODOS'
    },
    {
        id: 'weigher',
        title: 'Pesaje',
        type: 'basic',
        icon: 'heroicons_outline:scale',
        link: 'weigher/tickets/list-tickets',
        role: 'PESADOR'
    },
    {
        id: 'cash-register',
        title: 'Cobrar Productos',
        type: 'basic',
        icon: 'heroicons_outline:cash',
        link: 'cash-register/payment/list-pay-product',
        role: 'CAJA'
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example',
    },
];
