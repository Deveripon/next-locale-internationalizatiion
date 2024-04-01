import { getDictionary } from "../dictioneries/dictionaries";

const ContactPage = async ({ params: { lang } }) => {
    const dict = await getDictionary(lang);
    return <div>{dict.contact}</div>;
};

export default ContactPage;

