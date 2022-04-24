const locales = {
    GB: {
        easyMode: "Easy mode",
        hardMode: "Hard mode",
        headtitle: "Currency converter",
        submitBtnText: "Let's go !",
        cryptoDropdown: {
            placeholder: "Search for one or more cryptocurrencies..",
            needMinimumChar: "You must enter at least 3 characters.",
            notFound: "No item matches the search."
        },
        fiatDropdown: {
            placeholder: "Search for one or more fiat money..",
            needMinimumChar: "You must enter at least 3 characters.",
            notFound: "No item matches the search."
        }
    },
    FR: {
        easyMode: "Mode facile",
        hardMode: "Mode difficile",
        headtitle: "Convertisseur de devises",
        submitBtnText: "C'est parti !",
        cryptoDropdown: {
            placeholder: "Recherchez une ou plusieurs cryptomonnaies..",
            needMinimumChar: "Vous devez entrer au moins 3 caractères.",
            notFound: "Aucun élément ne correspond à la recherche.",
        },
        fiatDropdown: {
            placeholder: "Recherchez une ou plusieurs monnaies fiduciaires..",
            needMinimumChar: "Vous devez entrer au moins 3 caractères.",
            notFound: "Aucun élément ne correspond à la recherche."
        }
    },
    RU: {
        easyMode: "Легкий режим",
        hardMode: "Высокая сложность",
        headtitle: "Конвертер валют",
        submitBtnText: "Пойдем !",
        cryptoDropdown: {
            placeholder: "Найдите одну или несколько криптовалют..",
            needMinimumChar: "Вы должны ввести не менее 3 символов.",
            notFound: "Ни один элемент не соответствует поиску."
        },
        fiatDropdown: {
            placeholder: "Поиск одной или нескольких фиатных денег..",
            needMinimumChar: "Вы должны ввести не менее 3 символов.",
            notFound: "Ни один элемент не соответствует поиску."
        }
    },
    DE: {
        easyMode: "Einfacher Modus",
        hardMode: "Harter Modus",
        headtitle: "Währungsrechner",
        submitBtnText: "Lass uns gehen !",
        cryptoDropdown: {
            placeholder: "Suche nach einer oder mehreren Kryptowährungen..",
            needMinimumChar: "Sie müssen mindestens 3 Zeichen eingeben.",
            notFound: "Kein Artikel entspricht der Suche."
        },
        fiatDropdown: {
            placeholder: "Suchen Sie nach einem oder mehreren Fiatgeld..",
            needMinimumChar: "Sie müssen mindestens 3 Zeichen eingeben.",
            notFound: "Kein Artikel entspricht der Suche."
        }
    }
}

export const getLocales = () => {
    return locales;
}