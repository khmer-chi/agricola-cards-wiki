export const parseHash2Object = () => {
    return Object.fromEntries(new URLSearchParams(window.location.hash.slice(1)).entries());
};