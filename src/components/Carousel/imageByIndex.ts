
export const logoLinks: string[] = [
    "/logos/mongoDB-logo-light-theme.png",
    "/logos/express-logo-light-theme.png",
    "/logos/react-logo.png",
    "/logos/nodejs-logo-light-theme.png",
    "/logos/Typescript_logo_2020.svg.png",
    "/logos/nextjs-logo-light-theme.png",
    "/logos/TanStack-Query -logo.png",
    "/logos/react-hook-form-logo-light-theme.png",
    "/logos/jest-logo.png",
    "/logos/bootstrap-logo.png",
    "/logos/JavaScript-logo.png",
    "/logos/css-logo.png",
    "/logos/html-logo.png",
    "/logos/git-logo-light-theme.png",
    "/logos/styleX-logo-light-theme.png",
    "/logos/tailwind-css-logo.png",
    "/logos/redux-logo.png",
    "/logos/zod-logo-light-theme.png",
    "/logos/lottie.webp",
    "/logos/gsap-min.webp",
    "/logos/Vitejs.webp",

]

const imageByIndex = (index: number): string => {

    return logoLinks[index % logoLinks.length]
}

export default imageByIndex
