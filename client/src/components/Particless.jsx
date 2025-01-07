import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particless = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadFull(engine);
    }, []);

    const particlesOptions = useMemo(
        () => ({
            fullScreen: {
                enable: true,
                zIndex: -1,
            },
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: "#ccff15",
                },
                shape: {
                    type: "star",
                },
                opacity: {
                    value: 0.8,
                    random: true,
                },
                size: {
                    value: 5,
                    random: true,
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: "top",
                    random: true,
                    out_mode: "out",
                },
            },
            interactivity: {
                events: {
                    onhover: {
                        enable: true,
                        mode: "bubble",
                    },
                    onclick: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    bubble: {
                        distance: 400,
                        size: 4,
                        duration: 0.3,
                    },
                    repulse: {
                        distance: 200,
                    },
                },
            },
            retina_detect: true,
            background: {
                color: "#000",
            },
        }),
        []
    );

    return (
        <Particles
            className="particles"
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
        />
    );
};

export default React.memo(Particless);
