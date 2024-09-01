import { Menu } from 'antd';
import img1 from '../assets/images/header-title.png';
import img2 from '../assets/images/logo11.png';
import img3 from '../assets/images/m1.png';

const items = [
  {
    label: ' صفحه اصلی',
    key: 'menuItem1',
  },
  {
    label: 'زیرسامانه‌ها',
    key: 'menuItem2',
  },
  {
    label: ' خدمات عمومی',
    key: 'menuItem3',
  },
  {
    label: 'فیلم‌های آموزشی',
    key: 'menuItem4',
  },
  {
    label: 'مستندات',
    key: 'menuItem5',
  },
  {
    label: 'استعلامات',
    key: 'menuItem6',
    icon: <i className="fa fa-bars" aria-hidden="true" />,
    children: [
      {
        label: 'شناسه کالا',
        key: 'submenu1',
      }
    ],
  },
  {
    label: 'سوالات متداول',
    key: 'menuItem7',
    icon: <i className="fa fa-bars" aria-hidden="true" />,
    children: [
      {
        label: ' تجارت داخلی',
        key: 'submenu2',
      },
      {
        label: 'تجارت خارجی',
        key: 'submenu3',
      },
      {
        label: ' شناسه کالا',
        key: 'submenu4',
      }
    ],
  },
  {
    label: 'ورود',
    key: 'menuItem8',
    icon: <i className="fa fa-sign-in" aria-hidden="true" />,
  },
  {
    label: 'ثبت نام ',
    key: 'menuItem9',
    icon: <i className="fa fa-user-plus" aria-hidden="true" />,
    children: [
      {
        label: ' ثبت کاربران ایرانی',
        key: 'submenu5',
      },
      {
        label: 'ثبت نام کاربران خارجی (Foreign Merchant)',
        key: 'submenu6',
      },
    ],
  },
];
const Header = () => {

  return (
    <div>
      <div className="login-header">
        <section className="img1">
          <img src={img2} alt="img" />
        </section>
        <section className="img2">
          <img src={img1} alt="img" className="img2" />
        </section>
        <section className="img3">
          <img src={img3} alt="img" className="img3" />
        </section>
      </div>
      <div >
        <Menu mode="horizontal" items={items} />
      </div>
    </div>
  )
}

export default Header;
