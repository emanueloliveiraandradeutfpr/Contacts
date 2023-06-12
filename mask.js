function MaskInput(numContact) {
    const input = document.querySelector(`.${numContact}`);
    IMask(input, {
        mask: "{(}DDD{)} 00000{-}0000",
        blocks: {
            DDD: {
                mask: IMask.MaskedRange,
                from: 11,
                to: 99,
            },
        },
    });
}
