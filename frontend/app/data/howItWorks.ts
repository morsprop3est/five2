export interface HowItWorksStep {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 1,
    title: "Логін",
    description: "Відкрийте головну сторінку сайту та використовуйте свої облікові дані, щоб увійти в систему та отримати повний доступ до особистого кабінету.",
    imageUrl: "/images/how-it-works/step1.jpg"
  },
  {
    id: 2,
    title: "Додайте інформацію про автомобіль",
    description: "Вкажіть марку, модель, рік випуску та інші технічні характеристики вашого автомобіля.",
    imageUrl: "/images/how-it-works/step2.jpg"
  },
  {
    id: 3,
    title: "Завантажте фотографії",
    description: "Додайте якісні зображення автомобіля з різних ракурсів для кращого представлення.",
    imageUrl: "/images/how-it-works/step3.jpg"
  },
  {
    id: 4,
    title: "Встановіть ціну",
    description: "Визначте справедливу ціну для вашого автомобіля на основі ринкових показників.",
    imageUrl: "/images/how-it-works/step4.jpg"
  },
  {
    id: 5,
    title: "Отримайте пропозиції",
    description: "Покупачі зможуть зв'язатися з вами та обговорити умови покупки автомобіля.",
    imageUrl: "/images/how-it-works/step5.jpg"
  }
]; 