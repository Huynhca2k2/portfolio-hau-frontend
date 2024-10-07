import axios from "axios";
import { content } from "../Content";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllItem = async (path, pop, lang) => {
  try {
    const response = await api.get(path, {
      params: {
        locale: lang,
        populate: pop,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    throw error;
  }
};

//fetch api homepage
export const fetchHomePage = async (lang) => {
  const data = await getAllItem(
    "/api/home-page",
    "home.image.src,home.items,home.button,skills.intro,skills.items.src,services.intro,services.items.src,projects.intro,projects.image.src,projects.items.src,testimonials.intro,testimonials.items.src,hireMe.intro,hireMe.image.src,contectMe.intro,contectMe.icons.src",
    lang
  );
  const res = data?.data?.attributes;

  const formattedData = {
    locale: res?.locale,
    home: {
      id: res?.home?.id,
      title: res.home.title,
      firstName: res.home.firstName,
      lastName: res.home.lastName,
      url: res.home.image.src.data.attributes.url,
      alt: res.home.image.alt,
      button: {
        id: res.home.button.id,
        content: res.home.button.content,
        slug: res.home.button.slug,
      },
      items: res?.home.items?.map((item) => ({
        id: item.id,
        number: item.number,
        description: item.description,
      })),
    },
    skills: {
      intro: {
        id: res.skills.intro.id,
        title: res.skills.intro.title,
        subTitle: res.skills.intro.subTitle,
      },
      items: res?.skills.items?.map((item) => ({
        id: item.id,
        alt: item.alt,
        url: item.src.data.attributes.url,
        title: item.title,
        content: item.content,
        description: item.description,
      })),
    },
    services: {
      intro: {
        id: res.services.intro.id,
        title: res.services.intro.title,
        subTitle: res.services.intro.subTitle,
      },
      items: res?.services.items?.map((item) => ({
        id: item.id,
        alt: item.alt,
        url: item.src.data.attributes.url,
        title: item.title,
        description: item.description,
      })),
    },
    projects: {
      alt: res.projects.image.alt,
      url: res.projects.image.src.data.attributes.url,
      intro: {
        id: res.projects.intro.id,
        title: res.projects.intro.title,
        subTitle: res.projects.intro.subTitle,
      },
      items: res?.projects.items?.map((item) => ({
        id: item.id,
        alt: item.alt,
        url: item.src.data.attributes.url,
        title: item.title,
      })),
    },
    testimonials: {
      intro: {
        id: res.testimonials.intro.id,
        title: res.testimonials.intro.title,
        subTitle: res.testimonials.intro.subTitle,
      },
      items: res?.testimonials.items?.map((item) => ({
        id: item.id,
        alt: item.alt,
        url: item.src.data.attributes.url,
        title: item.title,
        description: item.description,
      })),
    },
    hireMe: {
      alt: res.hireMe.image.alt,
      url: res.hireMe.image.src.data.attributes.url,
      description: res.hireMe.description,
      intro: {
        id: res.hireMe.intro.id,
        title: res.hireMe.intro.title,
        subTitle: res.hireMe.intro.subTitle,
      },
    },
    contectMe: {
      intro: {
        id: res.contectMe.intro.id,
        title: res.contectMe.intro.title,
        subTitle: res.contectMe.intro.subTitle,
      },
      icons: res?.contectMe.icons?.map((item) => ({
        id: item.id,
        alt: item.alt,
        url: item.src.data.attributes.url,
        content: item.content,
        slug: item.slug,
      })),
    },
  };

  return formattedData;
};
