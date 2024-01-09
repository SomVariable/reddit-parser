export enum POST_INTERNAL_SERVER_ERRORS {
  UNEXPECTED = 'unexpected error'
}

export enum POST_BAD_REQUEST_ERRORS {
  MISSING_BROWSER = 'no browser for this user. Open it',
  MISSING_PAGE = 'no page for this user. Open it',
  MISSING_FLAIR = 'there is no such flair'
}

export enum POST_SELECTORS {
  FORM_SECTION_POST = "div._3vyt9N_0jfZuOwByiKDi9x > div > button:nth-child(1)",
  FORM_SECTION_IMAGES = "div._3vyt9N_0jfZuOwByiKDi9x > div > button:nth-child(2)",
  FORM_SECTION_LINK = "div._3vyt9N_0jfZuOwByiKDi9x > div > button:nth-child(3)",
  FORM_SECTION_POLL = "div._3vyt9N_0jfZuOwByiKDi9x > div > button:nth-child(4)",
  FORM_SECTION_POST_TITLE_INPUT = "div._3zkbHfhLbXp21FwGj_kNZV > div > textarea",
  FORM_SECTION_POST_TEXT_DIV = "#AppRouter-main-content > div > div > div._3ozFtOe6WpJEMUtxDOIvtU > div._31N0dvxfpsO6Ur5AKx4O5d > div._1OVBBWLtHoSPfGCRaPzpTf._3nSp9cdBpqL13CqjdMr2L_._2udhMC-jldHp_EpAuBeSR1.PaJBYLqPf_Gie2aZntVQ7._2OVNlZuUd8L9v0yVECZ2iA > div.HOFZo2X7Fr6JVBztpsByj > div._3w_665DK_NH7yIsRMuZkqB > div._1zq6UabIEJJ-z9grsiCJY7 > div:nth-child(2) > div > div > div._2baJGEALPiEMZpWB2iWQs7 > div > div:nth-child(1) > div > div > div",
  FORM_SECTION_POST_FLAIR_SPOILER_BUTTON = "div._2pAQpGYEPAVsPmV5uVmGGU > div > button:nth-child(2) > div",
  FORM_SECTION_POST_FLAIR_ADD_FLAIR_BUTTON = "button._1LD2Xsr3fioSkWZ13vMORC._5x1WjCc4HQF6tqnODOql0._2iuoyPiKHN3kfOoeIQalDT._2tU8R9NTqhvBrhoNAXWWcP.HNozj_dKjQZ59ZsfEegz8 > div",
  FORM_SECTION_POST_FLAIR_ADD_FLAIR_INPUT = "div._18cuM8Uu7RcIFu1bCT0r4t > input",
  FORM_SECTION_POST_FLAIR_ADD_FLAIR_FOUND_ELEMENT = "div._2AKP6aCod0Z6TuXXfc1ZqL > div > div:nth-child(2) > div:nth-child(2) > svg",
  FORM_SECTION_POST_FLAIR_ADD_FLAIR_APPLY_BUTTON = "button._2iuoyPiKHN3kfOoeIQalDT._10BQ7pjWbeYP63SAPNS8Ts.HNozj_dKjQZ59ZsfEegz8",
  FORM_SECTION_POST_FLAIR_NSFM_BUTTON = "div._2pAQpGYEPAVsPmV5uVmGGU > div > button:nth-child(3) > div",
  FORM_SECTION_IMAGES_UPLOAD_IMAGE_BUTTON = "div._1UbcPNs4A8n5PIWX0H5sGt > div > div > div > p > button",
  FORM_SECTION_IMAGES_ADD_IMAGE_BUTTON = "div._3cjkwfQbHf5cGuN_2K1uvN > div > span > button",
  FORM_SECTION_LINK_URL_TEXT_AREA = "div._1zq6UabIEJJ-z9grsiCJY7 > div:nth-child(2) > textarea",
  FORM_SECTION_POLL_ADD_OPINION = "div._2uAaCZzc_HQhLKkUJ66vU5 > button",
  FORM_SECTION_POLL__OPINIONS_INPUTS = "div.vtFOVcu_sAJUlHd8Vxx_S > div:nth-child(1)",
  FORM_ADD_TO_COLLECTION_BUTTON = "#PostCreation-AddToCollectionButton",
  FORM_CREATE_COLLECTION_BUTTON = "button._22f_S1XUre_FujBgOgEHJe._2iuoyPiKHN3kfOoeIQalDT._10BQ7pjWbeYP63SAPNS8Ts.HNozj_dKjQZ59ZsfEegz8",
  FORM_CANCEL_COLLECTION_BUTTON = "button._2tLOIj2nClBaVRuMBIJE8X._2iuoyPiKHN3kfOoeIQalDT._2tU8R9NTqhvBrhoNAXWWcP.HNozj_dKjQZ59ZsfEegz8",
  COLLECTION_TITLE_INPUT = "div._11JSvybbRhcX_cfoagpne_ > label > input",
  FORM_CREATE_POST_BUTTON = "button._18Bo5Wuo3tMV-RDB8-kh8Z._1_Xn_Na9NfUSd_yoc1w2Eb._2iuoyPiKHN3kfOoeIQalDT._10BQ7pjWbeYP63SAPNS8Ts.HNozj_dKjQZ59ZsfEegz8",
  COMMENT_BUTTON = "a._1UoeAeSRhOKSNdY_h3iS1O._1Hw7tY9pMr-T1F4P1C-xNU._3U_7i38RDPV5eBv7m4M-9J._2qww3J5KKzsD7e5DO0BvvU",
  COMMENT_COMMENT_DIV = "#overlayScrollContainer > div._1npCwF50X2J7Wt82SZi6J0 > div.u35lf2ynn4jHsVUwPmNU.Dx3UxiK86VcfkFQVHNXNi > div.uI_hDmU5GSiudtABRz_37 > div._1r4smTyOEZFO91uFIdWW6T.aUM8DQ_Nz5wL0EJc_wte6 > div:nth-child(2) > div > div > div._2baJGEALPiEMZpWB2iWQs7 > div > div:nth-child(1) > div > div > div",
  COMMENT_ACCEPT_COMMENT = "#overlayScrollContainer > div._1npCwF50X2J7Wt82SZi6J0 > div.u35lf2ynn4jHsVUwPmNU.Dx3UxiK86VcfkFQVHNXNi > div.uI_hDmU5GSiudtABRz_37 > div._1r4smTyOEZFO91uFIdWW6T.aUM8DQ_Nz5wL0EJc_wte6 > div:nth-child(2) > div > div > div._17TqawK-44tH0psnHPIhzS.RQTXfVRnnTF5ont3w58rx > div._3SNMf5ZJL_5F1qxcZkD0Cp > button"
}

export enum POST_BULL { NAME = 'post-bull', CREATE_POST = 'create-post'}

export enum POST_BUTTON_ID {
  LIKE = 0,
  DISLIKE = 1
}