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