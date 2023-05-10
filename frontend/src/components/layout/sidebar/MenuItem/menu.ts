import { icons } from '../../../../constants/icons'
import { IMenuItem } from '../../../../types/types'
export const menu: IMenuItem[] = [
    {
        title: 'Моя страница',
        link: '/profile',
        icon: icons.home
    },
    {
        title: 'Новости',
        link: '/',
        icon: icons.Feed
    },
    {
        title: 'Мессенджер',
        link: '/messages',
        icon: icons.Email
    },
    {
        title: 'Друзья',
        link: '/friends',
        icon: icons.PeopleOutline
    },

]