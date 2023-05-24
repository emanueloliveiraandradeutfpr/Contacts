IMask(document.querySelector("#dddContact"), {
    mask: IMask.MaskedRange,
    from: 11,
    to: 99,
});

IMask(document.querySelector("#numContact"), {
    mask: "00000{-}0000",
});

IMask(document.querySelector("#nomeContact"), {
    mask: /^[a-zA-Z\s]+$/,
});
