export interface Website {
  id: string | number;
  imageUrl: string;
  title: string;
  description: string;
}

export const websitesData: Website[] = [
  {
    id: 1,
    imageUrl: "/images/websites/site1.jpg",
    title: "AutoTrader",
    description: "Платформа для продажу автомобілів"
  },
  {
    id: 2,
    imageUrl: "/images/websites/site2.jpg",
    title: "CarGurus",
    description: "Пошук та порівняння автомобілів"
  },
  {
    id: 3,
    imageUrl: "/images/websites/site3.jpg",
    title: "Cars.com",
    description: "Комплексний сервіс для автолюбителів"
  },
  {
    id: 4,
    imageUrl: "/images/websites/site4.jpg",
    title: "Edmunds",
    description: "Експертні огляди та ціни на автомобілі"
  },
  {
    id: 5,
    imageUrl: "/images/websites/site5.jpg",
    title: "Kelley Blue Book",
    description: "Оцінка вартості автомобілів"
  },
  {
    id: 6,
    imageUrl: "/images/websites/site6.jpg",
    title: "Carfax",
    description: "Історія автомобіля та звіти"
  }
]; 