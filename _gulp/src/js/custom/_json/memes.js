var image = "";

poncho_json.memes = {
    // // Get assets - run locally
    // var new_array = [];
    // $.ajax({
    //     url: "/dist/img/memes/assets/6_Other/",
    //     success: function (data) {
    //         // Check if
    //         if (data) {
    //             // Loop
    //             $(data).find("a").attr("href", function (i, val) {
    //                 // Check if
    //                 if (val.match(/\.(jpe?g|png|gif)$/)) {
    //                     new_array.push(val);
    //                 }
    //             });
    //         }
    //     }
    // });
    assets: {
        "1_Fur": ["Alien_Blue.png", "Alien_Green.png", "Alien_Red.png", "Fur_B&W.png", "Fur_Blue.png", "Fur_Green.png", "Fur_Light_Blue.png", "Fur_OG.png", "Fur_Orange.png", "Fur_Pink.png", "Fur_Purple.png", "Fur_Red.png", "Fur_Robot.png", "Fur_Yellow.png"],
        "2_Eyebrows": ["Angry.png", "OG.png"],
        "3_Mouth": ["Flat.png", "Grills.png", "OG.png", "Open.png", "Serious.png", "Smile.png", "Smirk.png", "Teeth.png", "Tongue.png", "Vampire.png", "Vampire_Smile.png"],
        "4_Eyes": ["Dead.png", "Glowing_Blue.png", "Glowing_Green.png", "Glowing_Purple.png", "Glowing_Red.png", "Glowing_Yellow.png", "Laser_Blue.png", "Laser_Green.png", "Laser_Purple.png", "Laser_Red.png", "Laser_Yellow.png", "Madness.png", "OG.png", "Pit_Vipers_Blue.png", "Pit_Vipers_Classic.png", "Pit_Vipers_Green.png", "Pit_Vipers_Grey.png", "Pit_Vipers_Purple.png", "Pit_Vipers_Red.png", "Pit_Vipers_Yellow.png", "Readers_OG.png", "Readers_Shut.png", "Readers_Wide.png", "Shades_Blue.png", "Shades_Classic.png", "Shades_Green.png", "Shades_Orange.png", "Shades_Purple.png", "Shades_Red.png", "Shut.png", "Smoker.png", "Squint.png", "Wide.png", "Wink.png"],
        "5_Hat": ["Buckethat_BASE.png", "Buckethat_Black.png", "Buckethat_Blue.png", "Buckethat_Green.png", "Buckethat_Peach.png", "Buckethat_Pink.png", "Buckethat_Poncho.png", "Buckethat_Red.png", "Buckethat_Weed.png", "Buckethat_White.png", "Buckethat_Yellow.png", "Cap_Ash.png", "Cap_BASE.png", "Cap_Gold.png", "Cap_Green.png", "Cap_Grey.png", "Cap_Light_Blue.png", "Cap_Pink.png", "Cap_Poncho.png", "Cap_Rainbow.png", "Cap_Red.png", "Cap_White.png", "Cap_Yellow.png", "Cowboy_Hat.png", "Crown.png", "Flipped_Brim_Blue.png", "Flipped_Brim_Green.png", "Flipped_Brim_Grey.png", "Flipped_Brim_Orange.png", "Flipped_Brim_Pink.png", "Flipped_Brim_Red.png", "Flipped_Brim_Yellow.png", "Headband_Black.png", "Headband_Blue.png", "Headband_Green.png", "Headband_Hippie.png", "Headband_Japan.png", "Headband_LightBlue.png", "Headband_Pink.png", "Headband_Poncho.png", "Headband_Red.png", "Headband_White.png", "Headband_Yellow.png", "Pirate.png", "Princess_Blue.png", "Princess_Pink.png", "Sombrero_Black&Orange.png", "Sombrero_Brown&White.png", "Sombrero_Green&Yellow.png", "Sombrero_OG.png", "Sombrero_Purple&Pink.png", "Sombrero_Red&Blue.png", "TopHat_Grey.png", "TopHat_Red.png", "Viking_Gold.png", "Viking_Silver.png"],
        "6_Other": ["Poncho_Logo.png", "Poncho_Pals_Logo.png", "base.png", "poncho.png", "poncho_head.png"]
    },
    templates: [
        {
            filename: "With_Sign",
            filetype: "png",
            state: "active"
        },
        {
            filename: "Change_My_Mind",
            filetype: "png",
            state: ""
        },
        {
            filename: "Smart",
            filetype: "png",
            state: ""
        },
        {
            filename: "Drake_Hotline_Bling",
            filetype: "png",
            state: ""
        },
        {
            filename: "Truck",
            filetype: "png",
            state: ""
        },
        {
            filename: "Dark_Army",
            filetype: "png",
            state: ""
        },
        {
            filename: "Pepe",
            filetype: "png",
            state: ""
        },
        {
            filename: "Ponchonator",
            filetype: "png",
            state: ""
        },
        {
            filename: "Gold_Poncho",
            filetype: "png",
            state: ""
        },
        {
            filename: "Celebration",
            filetype: "png",
            state: ""
        },
        {
            filename: "McDonalds",
            filetype: "png",
            state: ""
        },
        {
            filename: "Brain_Jeet_Holder",
            filetype: "png",
            state: ""
        },
        {
            filename: "Brain_Jeet",
            filetype: "png",
            state: ""
        },
        {
            filename: "Brain_Holder",
            filetype: "png",
            state: ""
        },
        {
            filename: "Workout",
            filetype: "png",
            state: ""
        },
        {
            filename: "Dark_Planet",
            filetype: "png",
            state: ""
        },
        {
            filename: "Death",
            filetype: "png",
            state: ""
        },
        {
            filename: "Background",
            filetype: "png",
            state: ""
        },
        {
            filename: "BASE_Blue",
            filetype: "png",
            state: ""
        },
        {
            filename: "Beige",
            filetype: "png",
            state: ""
        },
        {
            filename: "Blackout",
            filetype: "png",
            state: ""
        },
        {
            filename: "Green",
            filetype: "png",
            state: ""
        },
        {
            filename: "Light_Blue",
            filetype: "png",
            state: ""
        },
        {
            filename: "OG",
            filetype: "png",
            state: ""
        },
        {
            filename: "Orange",
            filetype: "png",
            state: ""
        },
        {
            filename: "Pink",
            filetype: "png",
            state: ""
        },
        {
            filename: "Punk",
            filetype: "png",
            state: ""
        },
        {
            filename: "Purple",
            filetype: "png",
            state: ""
        }
    ]
}