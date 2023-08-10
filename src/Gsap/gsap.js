import gsap from "gsap";

var tl = gsap.timeline();

export const navAnimation = (a, b, c) => {
  tl.from([a.current, b.current, c.current], {
    y: -100,
    duration: 1,
    delay: 0.5,
    opacity: 1,
    stagger: 0.2,
  });
};

export const card = (a) => {
  console.log("call");
  tl.from(a.current, {
    y: -800,
    duration: 1,
    delay: 0.1,
    opacity: 1,
    stagger: 0.2,
  });
};

export const name = (a) => {
  tl.from(a.current, {
    opacity: 1,
    y: -100,
    duration: 0.8,
  });
};
