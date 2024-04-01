import { getDictionary } from "./dictioneries/dictionaries";

export default async function Home({ params: { lang } }) {
    const dict = await getDictionary(lang);
    return (
        <>
            <h1 className='bg-gray-500'>{dict.homepage}</h1>
        </>
    );
}

