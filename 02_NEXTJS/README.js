NEXT JS

In getServerSideProps if we get empty response and we want to redirect to some other page:

export async function getServerSideProps(context) {
  const { query } = context;
  const url = query && query.slug && query.slug.join('/');
  const slug = query.slug;

  const delay = (s) => new Promise((resolve) => setTimeout(resolve, s));

  let brandById = null;
  try {
    const response = await axios.get(`${serverConfig.SERVER_URL}/${AXIOS_API_CALL.brands}/${slug}`);
    console.log('response', response);
    // if response is empty redirect to brendovi page
    if (response.status === 200) {
      brandById = response.data;
    }
  } catch (err) {
    console.error('Fetch data of featured products:', err);
  }

  if (!brandById) {
    return {
      redirect: {
        destination: '/brendovi',
        permanent: false,
      },
    };
  }

  await delay(400);

  return {
    props: {
      brandById: brandById,
      allProducts: allProducts,
    },
  };
}
—----------------------------------------------------------------------

  We can use this snippet
if (!brandById) {
  return {
    redirect: {
      destination: '/brendovi',
      permanent: false,
    },
  };
}

—----------------------------------------------------------------------
// to create new next app in current directory
npx create-next-app@latest ./
-----------------------------------------------------------------------
// to create route in next 13 in app directory 
// create a folder with name of route and create page.js file in it
// for example to create route /about
// mkdir about
// cd about
// touch page.js
-----------------------------------------------------------------------
// Inside component if we want to listen for click event on document:
const navRef = React.useRef(null);
<div ref={navRef} className="nav-cat">
  {/* Nav content */}
</div>
React.useEffect(() => {
  function handleClickOutside(event) {
    if (navRef.current && !navRef.current.contains(event.target)) {
      // User clicked outside of the nav, do something
      yourFunction();
    }
  }

  // Add the event listener
  document.addEventListener('mousedown', handleClickOutside);

  // Cleanup: remove the event listener when the component unmounts
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
-----------------------------------------------------------------------
// creating arrow in horizontal menu with overflow-x auto. 
// we need to hide an arrow right if we get to the max scroll position
const [rightArrowVisible, setRightArrowVisible] = useState(true);
const [leftArrowVisible, setLeftArrowVisible] = useState(false);
// on useEffect find out scroll position on mobile-navigation-items and console.log if scroll is done
useEffect(() => {
  const mobileNavItems = document.querySelector('.mobile-navigation-items');
  console.log('test1', { mobileNavItems });

  function handleScroll(e) {
    const maxScrollLeft = mobileNavItems.scrollWidth - mobileNavItems.clientWidth;
    console.log('test1', { maxScrollLeft });
    console.log('scroll left now', mobileNavItems.scrollLeft);
    if (Math.ceil(mobileNavItems.scrollLeft) === maxScrollLeft) {
      setRightArrowVisible(false);
    } else {
      setRightArrowVisible(true);
    }
    if (e.target.scrollLeft === 0) {
      setLeftArrowVisible(false);
    } else {
      setLeftArrowVisible(true);
    }
  }

  mobileNavItems.addEventListener('scroll', handleScroll);

  // Cleanup: remove the event listener when the component unmounts
  return () => {
    mobileNavItems.removeEventListener('scroll', handleScroll);
  };
}, []);
-----------------------------------------------------------------------
// example with local storage
// this is part of the code as example from akvadom 2023 CartContext.js
// we store delivery details in local storage and get it from there
const [deliveryDetails, setDeliveryDetails] = useState(() => {
  if (typeof window !== 'undefined') {
    const deliveryDetails1 = JSON.parse(window.localStorage.getItem('deliveryDetails'));

    if (deliveryDetails1 !== null) {
      return deliveryDetails1 || null;
    }
  }

  return null;
});
function handleDeliveryInfo(payload) {
  setDeliveryDetails(payload);
}
useEffect(() => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('cart', JSON.stringify(cart));
    window.localStorage.setItem('unavailableProducts', JSON.stringify(unavailableProducts));
    window.localStorage.setItem('deliveryDetails', JSON.stringify(deliveryDetails));
  }
}, [cart, deliveryDetails]);
// inside of page shipping-address on cart process we use this code
handleDeliveryInfo({ ...deliveryInfo, deliveryType, orderingAs });
-----------------------------------------------------------------------
// if we have setup next with tailwind we have tailwind.config.js file
// we can add custom colors in it
module.exports = {
  theme: {
    extend: {
      colors: {
        'akva-primary': '#00B4D8',
        'akva-secondary': '#FFD700',
        'akva-tertiary': '#FF6B6B',
        'akva-quaternary': '#FFD700',
        'akva-quinary': '#FFD700',
        'akva-senary': '#FFD700',
      },
    },
  },
  plugins: [],
};
// and then we can use these colors in our components
// for example in button component
// <button className="bg-akva-primary text-white">Primary</button>
// or for text color
// <p className="text-akva-primary">Primary</p>
// or for border color
// <div className="border border-akva-primary">Primary</div>
-----------------------------------------------------------------------
// we can use svg as component in next
// for example in component Icon.js
export default function RightArrow({
  className = "w-6 h-6",
  fill = "none",
  stroke = "currentColor",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke={stroke}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
      />
    </svg>
  );
}
-----------------------------------------------------------------------
// router.push vs router.replace in next.js
The behavior you're experiencing is due to how the router.push method works in Next.js. When you use router.push, 
it replaces the current entry in the history stack with the new URL. So when you press the back button, 
it takes you back to the page before the one you pushed onto the stack, not the previous state of the current page.

To fix this, you can use the router.replace method instead of router.push. The router.replace method 
works the same way as router.push, but it replaces the current history entry instead of adding a new one. 
This means that when you press the back button, it will take you back to the previous state of the current page.

Here's how you can do it:

Now, when you press the back button, it should take you back to the previous state of the current page, 
with all the query parameters you added while filtering.

router.push(`${path}?page=${currentPage}&sort=${sortString}${filterQuery}${isSale ? '&OnSale=true' : ''}${benefit.wic ? '&benefit_program=WIC' : ''}`, undefined, { scroll: false });
router.replace(`${path}?page=${currentPage}&sort=${sortString}${filterQuery}${isSale ? '&OnSale=true' : ''}${benefit.wic ? '&benefit_program=WIC' : ''}`, undefined, { scroll: false });
-----------------------------------------------------------------------
// example of memo in next.js
import React from 'react';
import { PrimaryButton } from '@/components/buttons/PrimaryButton';
import Image from 'next/image';
import Link from 'next/link';

const ImageTextBlurb = React.memo(({ image, btnText, title, subtitle, link }) => {
  console.log('ImageTextBlurb');
  return (
    <div className="image-text-blurb">
      <div className="image-text-blurb-container">
        <Image src={image} layout="fill" objectFit="cover" alt="image text blurb" />
      </div>
      <div className="image-text-blurb-content">
        <h4>{title}</h4>
        <p className="subtitle">{subtitle}</p>
        <Link href={link}>
          <a title={title}>
            <PrimaryButton text={btnText} />
          </a>
        </Link>
      </div>
    </div>
  );
});

export { ImageTextBlurb };
-----------------------------------------------------------------------
// do determine on whih pathname we are in next.js
// we can use usePathname hook
// https://nextjs.org/docs/app/api-reference/functions/use-pathname
import { usePathname } from "next/navigation";
const pathname = usePathname();
-----------------------------------------------------------------------
<Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
// here we have example of image with max height and width
// we can use object-contain or object-cover to fit image in container
-----------------------------------------------------------------------
// in react we can use immer to update state
// the way immer works is that it creates a draft of the state and then we can update the draft
// and then immer will create new state from the draft
// here is example of using immer
import produce from 'immer';
const person = {
  personal: {
    firstName: '',
    lastName: '',
  }
  address: {
    street: '',
    city: '',
    zip: '',
  }
}

const updatedPerson = produce(person, (draft) => {
  draft.personal.firstName = 'John';
  draft.personal.lastName = 'Doe';
  draft.address.street = '123 Main St';
  draft.address.city = 'Anytown';
  draft.address.zip = '12345';
});
// https://www.google.com/search?sca_esv=31c11a842872212b&sxsrf=ACQVn08JYr2SzGGNGaLo-l9eCYPUD3GE7w:1710234126957&q=immer+react&tbm=vid&source=lnms&prmd=vinsmbtz&sa=X&ved=2ahUKEwjatPrMru6EAxVTh_0HHfY7BdsQ0pQJegQIIRAB&biw=1848&bih=948&dpr=1#fpstate=ive&vld=cid:4920bba4,vid:8kC5fHlir4E,st:0
// https://www.youtube.com/@CodingWithChaim/videos
-----------------------------------------------------------------------
// if we want to prevent right click in react we can use useEffect
useEffect(() => {
  document.addEventListener(
    'contextmenu',
    function (e) {
      e.preventDefault();
    },
    false
  );

  return () => {
    document.removeEventListener(
      'contextmenu',
      function (e) {
        e.preventDefault();
      },
      false
    );
  };
}, []);
-----------------------------------------------------------------------
// forwardRef example
https://www.youtube.com/watch?v=0YTYqg0ETx8
-----------------------------------------------------------------------
// How do you override context for a specific part of the component tree?
// Sometimes, you may need to override the context with a different value for a certain part of the component tree. It is possible to override the context value by wrapping that part in a provider with a different value.

// As an example, the following code applies a blue background to all the pages except for the contact page, where a white background will be applied using a context provider:

<ColorContext.Provider value="blue">
  <About />
  <Services />
  <Clients />
  <ColorContext.Provider value="white">
    <Contact />
  </ColorContext.Provider>
</ColorContext.Provider>
-----------------------------------------------------------------------
// hooks to explore
useImperativeHandle, useImmer, useFetch, useDebounce, useForm, useLocalStorage, useDebugValue
https://usehooks.com/
https://github.com/imbhargav5/rooks
-----------------------------------------------------------------------
// form validation example reusable
export const validateInputs = (fields, rules) => {
  let formValid = true;
  let errors = {};

  for (let field in fields) {
    if (rules[field]) {
      for (let rule of rules[field]) {
        if (rule.type === 'required' && !fields[field]) {
          formValid = false;
          errors[field] = rule.message;
          break;
        }
        if (rule.type === 'regex' && !rule.pattern.test(fields[field])) {
          formValid = false;
          errors[field] = rule.message;
          break;
        }
      }
    }
  }

  return { formValid, errors };
};
// to consume it
const fields = {
  email: 'test@example.com',
  password: 'password',
};

const rules = {
  email: [
    { type: 'required', message: 'Email is required' },
    { type: 'regex', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email is invalid' },
  ],
  password: [
    { type: 'required', message: 'Password is required' },
  ],
};

const { formValid, errors } = validateInputs(fields, rules);
-----------------------------------------------------------------------
UserSchema.post("validate", function (user) {
  const notHashed = user.password;
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(notHashed, salt);
  user.password = hashed;
});
-----------------------------------------------------------------------
https://daisyui.com/
npm install -D daisyui@latest
// -D here means that we are installing it as a dev dependency
npm i @tailwindcss/typography
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};

-----------------------------------------------------------------------
