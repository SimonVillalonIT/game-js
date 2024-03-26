/** @type {import('tailwindcss').Config} */
import tailwindcssanimated from "tailwindcss-animated"
export default {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                KnightWarrior: ["KnightWarrior"]
            },
        },
    },
    plugins: [tailwindcssanimated],
}
