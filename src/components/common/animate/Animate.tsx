import { FC, PropsWithChildren, CSSProperties, useRef, RefObject, useState, useEffect } from "react";

const AnimateIn: FC<
    PropsWithChildren<{ from: CSSProperties; to: CSSProperties }>
> = ({ from, to, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const onScreen = useElementOnScreen(ref);
    const defaultStyles: CSSProperties = {
        transition: "600ms ease-in-out"
    };
    return (
        <div
            ref={ref}
            style={
                onScreen
                    ? {
                        ...defaultStyles,
                        ...to
                    }
                    : {
                        ...defaultStyles,
                        ...from
                    }
            }
        >
            {children}
        </div>
    );
};
function useElementOnScreen(ref: RefObject<Element>, rootMargin = "0px") {
    const [isIntersecting, setIsIntersecting] = useState(true);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { rootMargin }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);
    return isIntersecting;
} 

const FadeUp: FC<PropsWithChildren> = ({ children }) => (
    <AnimateIn
        from={{ opacity: 0, translate: "0 2rem" }}
        to={{ opacity: 1, translate: "none" }}
    >
        {children}
    </AnimateIn>
);
 
export default FadeUp; 