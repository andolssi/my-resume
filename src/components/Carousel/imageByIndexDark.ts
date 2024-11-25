
export const darkLogoLinks: string[] = [
    "/logos/mongoDB-logo-dark-theme.png",
    "/logos/express-logo-dark-theme.png",
    "/logos/react-logo.png",
    "/logos/nodejs-logo-dark-theme.png",
    "/logos/Typescript_logo_2020.svg.png",
    "/logos/nextjs-logo-dark-theme.png",
    "/logos/TanStack-Query -logo.png",
    "/logos/react-hook-form-logo-light-theme.png",
    "/logos/jest-logo.png",
    "/logos/bootstrap-logo.png",
    "/logos/JavaScript-logo.png",
    "/logos/css-logo.png",
    "/logos/html-logo.png",
    "/logos/git-logo-dark-theme.png",
    "/logos/styleX-logo-dark-theme.png",
    "/logos/tailwind-css-logo.png",
    "/logos/redux-logo.png",
    "/logos/zod-logo-light-theme.png",
    "/logos/lottie.webp",
    "/logos/gsap-min.webp",
    "/logos/Vitejs.webp",

]

const imageByIndexDark = (index: number): string => {

    return darkLogoLinks[index % darkLogoLinks.length]
}

export default imageByIndexDark
