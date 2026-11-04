exports.getBestAnalogs = (req, res) => {
    const analogData = {
        success: true,
        data: [
            {
                id: "ANL-001",
                earth_location: "Thrihnukagigur Lava Tubes, Iceland",
                space_target: "Lunar Lava Tubes (Marius Hills), Moon",
                coordinates: { lat: 63.998, lng: -21.698 },
                similarity_scores: { geology: 85, topography: 72, environment: 15, radiation_shielding: 92 },
                images: { earth: "https://example.com/iceland-tube.jpg", space: "https://example.com/moon-tube.jpg" },
                breakdown_analysis: {
                    gravity: "Earth 1g vs Moon 0.16g",
                    atmosphere: "Earth 1 atm vs Moon Vacuum",
                    radiation: "Surface is shielded, but external radiation differs massively."
                },
                so_what_factor: "Artemis Mission Preparation: Perfect structural analog to test robotic rovers navigating steep, rocky underground terrain without GPS signals.",
                niche_category: "Subsurface Extraterrestrial Habitats"
            }
        ]
    };
    res.status(200).json(analogData);
};