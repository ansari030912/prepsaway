import SingleBlog from "@/app/components/BlogPosts/SingleBlog";
import { X_API_Key } from "@/app/URL's/Api_X_Key";
import { Base_URL } from "@/app/URL's/Base_URL";

const decodeHTML = (html) => {
  return html
    ?.replace(/&amp;/g, "&")
    ?.replace(/&lt;/g, "<")
    ?.replace(/&gt;/g, ">")
    ?.replace(/&quot;/g, '"')
    ?.replace(/&#039;/g, "'")
    ?.replace(/&nbsp;/g, " ")
    ?.replace(/&iexcl;/g, "¡")
    ?.replace(/&cent;/g, "¢")
    ?.replace(/&pound;/g, "£")
    ?.replace(/&curren;/g, "¤")
    ?.replace(/&yen;/g, "¥")
    ?.replace(/&brvbar;/g, "¦")
    ?.replace(/&sect;/g, "§")
    ?.replace(/&uml;/g, "¨")
    ?.replace(/&copy;/g, "©")
    ?.replace(/&ordf;/g, "ª")
    ?.replace(/&laquo;/g, "«")
    ?.replace(/&not;/g, "¬")
    ?.replace(/&shy;/g, "­")
    ?.replace(/&reg;/g, "®")
    ?.replace(/&macr;/g, "¯")
    ?.replace(/&deg;/g, "°")
    ?.replace(/&plusmn;/g, "±")
    ?.replace(/&sup2;/g, "²")
    ?.replace(/&sup3;/g, "³")
    ?.replace(/&acute;/g, "´")
    ?.replace(/&micro;/g, "µ")
    ?.replace(/&para;/g, "¶")
    ?.replace(/&middot;/g, "·")
    ?.replace(/&cedil;/g, "¸")
    ?.replace(/&sup1;/g, "¹")
    ?.replace(/&ordm;/g, "º")
    ?.replace(/&raquo;/g, "»")
    ?.replace(/&frac14;/g, "¼")
    ?.replace(/&frac12;/g, "½")
    ?.replace(/&frac34;/g, "¾")
    ?.replace(/&iquest;/g, "¿")
    ?.replace(/&Agrave;/g, "À")
    ?.replace(/&Aacute;/g, "Á")
    ?.replace(/&Acirc;/g, "Â")
    ?.replace(/&Atilde;/g, "Ã")
    ?.replace(/&Auml;/g, "Ä")
    ?.replace(/&Aring;/g, "Å")
    ?.replace(/&AElig;/g, "Æ")
    ?.replace(/&Ccedil;/g, "Ç")
    ?.replace(/&Egrave;/g, "È")
    ?.replace(/&Eacute;/g, "É")
    ?.replace(/&Ecirc;/g, "Ê")
    ?.replace(/&Euml;/g, "Ë")
    ?.replace(/&Igrave;/g, "Ì")
    ?.replace(/&Iacute;/g, "Í")
    ?.replace(/&Icirc;/g, "Î")
    ?.replace(/&Iuml;/g, "Ï")
    ?.replace(/&ETH;/g, "Ð")
    ?.replace(/&Ntilde;/g, "Ñ")
    ?.replace(/&Ograve;/g, "Ò")
    ?.replace(/&Oacute;/g, "Ó")
    ?.replace(/&Ocirc;/g, "Ô")
    ?.replace(/&Otilde;/g, "Õ")
    ?.replace(/&Ouml;/g, "Ö")
    ?.replace(/&times;/g, "×")
    ?.replace(/&Oslash;/g, "Ø")
    ?.replace(/&Ugrave;/g, "Ù")
    ?.replace(/&Uacute;/g, "Ú")
    ?.replace(/&Ucirc;/g, "Û")
    ?.replace(/&Uuml;/g, "Ü")
    ?.replace(/&Yacute;/g, "Ý")
    ?.replace(/&THORN;/g, "Þ")
    ?.replace(/&szlig;/g, "ß")
    ?.replace(/&agrave;/g, "à")
    ?.replace(/&aacute;/g, "á")
    ?.replace(/&acirc;/g, "â")
    ?.replace(/&atilde;/g, "ã")
    ?.replace(/&auml;/g, "ä")
    ?.replace(/&aring;/g, "å")
    ?.replace(/&aelig;/g, "æ")
    ?.replace(/&ccedil;/g, "ç")
    ?.replace(/&egrave;/g, "è")
    ?.replace(/&eacute;/g, "é")
    ?.replace(/&ecirc;/g, "ê")
    ?.replace(/&euml;/g, "ë")
    ?.replace(/&igrave;/g, "ì")
    ?.replace(/&iacute;/g, "í")
    ?.replace(/&icirc;/g, "î")
    ?.replace(/&iuml;/g, "ï")
    ?.replace(/&eth;/g, "ð")
    ?.replace(/&ntilde;/g, "ñ")
    ?.replace(/&ograve;/g, "ò")
    ?.replace(/&oacute;/g, "ó")
    ?.replace(/&ocirc;/g, "ô")
    ?.replace(/&otilde;/g, "õ")
    ?.replace(/&ouml;/g, "ö")
    ?.replace(/&divide;/g, "÷")
    ?.replace(/&oslash;/g, "ø")
    ?.replace(/&ugrave;/g, "ù")
    ?.replace(/&uacute;/g, "ú")
    ?.replace(/&ucirc;/g, "û")
    ?.replace(/&uuml;/g, "ü")
    ?.replace(/&yacute;/g, "ý")
    ?.replace(/&thorn;/g, "þ")
    ?.replace(/&yuml;/g, "ÿ");
};

const Page = async ({ params }) => {
  const response = await fetch(`${Base_URL}/v1/blog/${params?.blog_perma}`, {
    headers: {
      "x-api-key": X_API_Key,
    },
    cache: "no-store",
    // Ensures fresh data is fetched
  });

  const data = await response.json();

  // Decode the HTML content server-side
  const decodedContent = decodeHTML(data?.blog_content);
  const decodedSummary = decodeHTML(data?.blog_summary);

  return (
    <SingleBlog
      data={{
        ...data,
        decodedContent,
        decodedSummary,
      }}
    />
  );
};

export default Page;
export async function generateMetadata({ params }) {
  const response = await fetch(`${Base_URL}/v1/blog/${params?.blog_perma}`, {
    headers: {
      "x-api-key": X_API_Key,
    },
  });

  const metaData = await response.json();

  // Server-compatible HTML decoding function
  function decodeHTML(html) {
    return html
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x2F;/g, "/");
  }

  const decodedSummary = decodeHTML(metaData?.blog_summary || "");
  const description =
    decodedSummary.length > 150
      ? decodedSummary.substring(0, 150).trimEnd() + "..."
      : decodedSummary;

  return {
    title: `${
      metaData?.blog_title ||
      "Preps Away delivers 100% accurate exam questions."
    }`,
    description: description,
    robots: {
      index: true,
    },
    icons: {
      other: [
        {
          rel: "canonical",
          url: `https://prepsaway.com/blog/${params.blog_perma}`,
        },
      ],
    },
  };
}
