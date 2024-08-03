import { SelectMenuItem } from "@Typings/Components/Select.type";

const countryOfResidenceList: SelectMenuItem[] = [
    { name: "Afghanistan", value: "AF", iconSrc: "/flags/af.svg", default: false },
    { name: "Albania", value: "AL", iconSrc: "/flags/al.svg", default: false },
    { name: "Algeria", value: "DZ", iconSrc: "/flags/dz.svg", default: false },
    { name: "Andorra", value: "AD", iconSrc: "/flags/ad.svg", default: false },
    { name: "Angola", value: "AO", iconSrc: "/flags/ao.svg", default: false },
    { name: "Antigua and Barbuda", value: "AG", iconSrc: "/flags/ag.svg", default: false },
    { name: "Argentina", value: "AR", iconSrc: "/flags/ar.svg", default: false },
    { name: "Armenia", value: "AM", iconSrc: "/flags/am.svg", default: false },
    { name: "Australia", value: "AU", iconSrc: "/flags/au.svg", default: false },
    { name: "Austria", value: "AT", iconSrc: "/flags/at.svg", default: false },
    { name: "Azerbaijan", value: "AZ", iconSrc: "/flags/az.svg", default: false },
    { name: "Bahamas", value: "BS", iconSrc: "/flags/bs.svg", default: false },
    { name: "Bahrain", value: "BH", iconSrc: "/flags/bh.svg", default: false },
    { name: "Bangladesh", value: "BD", iconSrc: "/flags/bd.svg", default: false },
    { name: "Barbados", value: "BB", iconSrc: "/flags/bb.svg", default: false },
    { name: "Belarus", value: "BY", iconSrc: "/flags/by.svg", default: false },
    { name: "Belgium", value: "BE", iconSrc: "/flags/be.svg", default: false },
    { name: "Belize", value: "BZ", iconSrc: "/flags/bz.svg", default: false },
    { name: "Benin", value: "BJ", iconSrc: "/flags/bj.svg", default: false },
    { name: "Bhutan", value: "BT", iconSrc: "/flags/bt.svg", default: false },
    { name: "Bolivia", value: "BO", iconSrc: "/flags/bo.svg", default: false },
    { name: "Bosnia and Herzegovina", value: "BA", iconSrc: "/flags/ba.svg", default: false },
    { name: "Botswana", value: "BW", iconSrc: "/flags/bw.svg", default: false },
    { name: "Brazil", value: "BR", iconSrc: "/flags/br.svg", default: false },
    { name: "Brunei", value: "BN", iconSrc: "/flags/bn.svg", default: false },
    { name: "Bulgaria", value: "BG", iconSrc: "/flags/bg.svg", default: false },
    { name: "Burkina Faso", value: "BF", iconSrc: "/flags/bf.svg", default: false },
    { name: "Burundi", value: "BI", iconSrc: "/flags/bi.svg", default: false },
    { name: "Cabo Verde", value: "CV", iconSrc: "/flags/cv.svg", default: false },
    { name: "Cambodia", value: "KH", iconSrc: "/flags/kh.svg", default: false },
    { name: "Cameroon", value: "CM", iconSrc: "/flags/cm.svg", default: false },
    { name: "Canada", value: "CA", iconSrc: "/flags/ca.svg", default: false },
    { name: "Central African Republic", value: "CF", iconSrc: "/flags/cf.svg", default: false },
    { name: "Chad", value: "TD", iconSrc: "/flags/td.svg", default: false },
    { name: "Chile", value: "CL", iconSrc: "/flags/cl.svg", default: false },
    { name: "China", value: "CN", iconSrc: "/flags/cn.svg", default: false },
    { name: "Colombia", value: "CO", iconSrc: "/flags/co.svg", default: false },
    { name: "Comoros", value: "KM", iconSrc: "/flags/km.svg", default: false },
    { name: "Congo, Democratic Republic of the", value: "CD", iconSrc: "/flags/cd.svg", default: false },
    { name: "Congo, Republic of the", value: "CG", iconSrc: "/flags/cg.svg", default: false },
    { name: "Costa Rica", value: "CR", iconSrc: "/flags/cr.svg", default: false },
    { name: "Croatia", value: "HR", iconSrc: "/flags/hr.svg", default: false },
    { name: "Cuba", value: "CU", iconSrc: "/flags/cu.svg", default: false },
    { name: "Cyprus", value: "CY", iconSrc: "/flags/cy.svg", default: false },
    { name: "Czech Republic", value: "CZ", iconSrc: "/flags/cz.svg", default: false },
    { name: "Denmark", value: "DK", iconSrc: "/flags/dk.svg", default: false },
    { name: "Djibouti", value: "DJ", iconSrc: "/flags/dj.svg", default: false },
    { name: "Dominica", value: "DM", iconSrc: "/flags/dm.svg", default: false },
    { name: "Dominican Republic", value: "DO", iconSrc: "/flags/do.svg", default: false },
    { name: "Ecuador", value: "EC", iconSrc: "/flags/ec.svg", default: false },
    { name: "Egypt", value: "EG", iconSrc: "/flags/eg.svg", default: false },
    { name: "El Salvador", value: "SV", iconSrc: "/flags/sv.svg", default: false },
    { name: "Equatorial Guinea", value: "GQ", iconSrc: "/flags/gq.svg", default: false },
    { name: "Eritrea", value: "ER", iconSrc: "/flags/er.svg", default: false },
    { name: "Estonia", value: "EE", iconSrc: "/flags/ee.svg", default: false },
    { name: "Eswatini", value: "SZ", iconSrc: "/flags/sz.svg", default: false },
    { name: "Ethiopia", value: "ET", iconSrc: "/flags/et.svg", default: false },
    { name: "Fiji", value: "FJ", iconSrc: "/flags/fj.svg", default: false },
    { name: "Finland", value: "FI", iconSrc: "/flags/fi.svg", default: false },
    { name: "France", value: "FR", iconSrc: "/flags/fr.svg", default: false },
    { name: "Gabon", value: "GA", iconSrc: "/flags/ga.svg", default: false },
    { name: "Gambia", value: "GM", iconSrc: "/flags/gm.svg", default: false },
    { name: "Georgia", value: "GE", iconSrc: "/flags/ge.svg", default: false },
    { name: "Germany", value: "DE", iconSrc: "/flags/de.svg", default: false },
    { name: "Ghana", value: "GH", iconSrc: "/flags/gh.svg", default: false },
    { name: "Greece", value: "GR", iconSrc: "/flags/gr.svg", default: false },
    { name: "Grenada", value: "GD", iconSrc: "/flags/gd.svg", default: false },
    { name: "Guatemala", value: "GT", iconSrc: "/flags/gt.svg", default: false },
    { name: "Guinea", value: "GN", iconSrc: "/flags/gn.svg", default: false },
    { name: "Guinea-Bissau", value: "GW", iconSrc: "/flags/gw.svg", default: false },
    { name: "Guyana", value: "GY", iconSrc: "/flags/gy.svg", default: false },
    { name: "Haiti", value: "HT", iconSrc: "/flags/ht.svg", default: false },
    { name: "Honduras", value: "HN", iconSrc: "/flags/hn.svg", default: false },
    { name: "Hungary", value: "HU", iconSrc: "/flags/hu.svg", default: false },
    { name: "Iceland", value: "IS", iconSrc: "/flags/is.svg", default: false },
    { name: "India", value: "IN", iconSrc: "/flags/in.svg", default: false },
    { name: "Indonesia", value: "ID", iconSrc: "/flags/id.svg", default: false },
    { name: "Iran", value: "IR", iconSrc: "/flags/ir.svg", default: false },
    { name: "Iraq", value: "IQ", iconSrc: "/flags/iq.svg", default: false },
    { name: "Ireland", value: "IE", iconSrc: "/flags/ie.svg", default: false },
    { name: "Israel", value: "IL", iconSrc: "/flags/il.svg", default: false },
    { name: "Italy", value: "IT", iconSrc: "/flags/it.svg", default: false },
    { name: "Jamaica", value: "JM", iconSrc: "/flags/jm.svg", default: false },
    { name: "Japan", value: "JP", iconSrc: "/flags/jp.svg", default: false },
    { name: "Jordan", value: "JO", iconSrc: "/flags/jo.svg", default: false },
    { name: "Kazakhstan", value: "KZ", iconSrc: "/flags/kz.svg", default: false },
    { name: "Kenya", value: "KE", iconSrc: "/flags/ke.svg", default: false },
    { name: "Kiribati", value: "KI", iconSrc: "/flags/ki.svg", default: false },
    { name: "Korea, North", value: "KP", iconSrc: "/flags/kp.svg", default: false },
    { name: "Korea, South", value: "KR", iconSrc: "/flags/kr.svg", default: false },
    { name: "Kuwait", value: "KW", iconSrc: "/flags/kw.svg", default: false },
    { name: "Kyrgyzstan", value: "KG", iconSrc: "/flags/kg.svg", default: false },
    { name: "Laos", value: "LA", iconSrc: "/flags/la.svg", default: false },
    { name: "Latvia", value: "LV", iconSrc: "/flags/lv.svg", default: false },
    { name: "Lebanon", value: "LB", iconSrc: "/flags/lb.svg", default: false },
    { name: "Lesotho", value: "LS", iconSrc: "/flags/ls.svg", default: false },
    { name: "Liberia", value: "LR", iconSrc: "/flags/lr.svg", default: false },
    { name: "Libya", value: "LY", iconSrc: "/flags/ly.svg", default: false },
    { name: "Liechtenstein", value: "LI", iconSrc: "/flags/li.svg", default: false },
    { name: "Lithuania", value: "LT", iconSrc: "/flags/lt.svg", default: false },
    { name: "Luxembourg", value: "LU", iconSrc: "/flags/lu.svg", default: false },
    { name: "Madagascar", value: "MG", iconSrc: "/flags/mg.svg", default: false },
    { name: "Malawi", value: "MW", iconSrc: "/flags/mw.svg", default: false },
    { name: "Malaysia", value: "MY", iconSrc: "/flags/my.svg", default: false },
    { name: "Maldives", value: "MV", iconSrc: "/flags/mv.svg", default: false },
    { name: "Mali", value: "ML", iconSrc: "/flags/ml.svg", default: false },
    { name: "Malta", value: "MT", iconSrc: "/flags/mt.svg", default: false },
    { name: "Marshall Islands", value: "MH", iconSrc: "/flags/mh.svg", default: false },
    { name: "Mauritania", value: "MR", iconSrc: "/flags/mr.svg", default: false },
    { name: "Mauritius", value: "MU", iconSrc: "/flags/mu.svg", default: false },
    { name: "Mexico", value: "MX", iconSrc: "/flags/mx.svg", default: false },
    { name: "Micronesia", value: "FM", iconSrc: "/flags/fm.svg", default: false },
    { name: "Moldova", value: "MD", iconSrc: "/flags/md.svg", default: false },
    { name: "Monaco", value: "MC", iconSrc: "/flags/mc.svg", default: false },
    { name: "Mongolia", value: "MN", iconSrc: "/flags/mn.svg", default: false },
    { name: "Montenegro", value: "ME", iconSrc: "/flags/me.svg", default: false },
    { name: "Morocco", value: "MA", iconSrc: "/flags/ma.svg", default: false },
    { name: "Mozambique", value: "MZ", iconSrc: "/flags/mz.svg", default: false },
    { name: "Myanmar", value: "MM", iconSrc: "/flags/mm.svg", default: false },
    { name: "Namibia", value: "NA", iconSrc: "/flags/na.svg", default: false },
    { name: "Nauru", value: "NR", iconSrc: "/flags/nr.svg", default: false },
    { name: "Nepal", value: "NP", iconSrc: "/flags/np.svg", default: false },
    { name: "Netherlands", value: "NL", iconSrc: "/flags/nl.svg", default: false },
    { name: "New Zealand", value: "NZ", iconSrc: "/flags/nz.svg", default: false },
    { name: "Nicaragua", value: "NI", iconSrc: "/flags/ni.svg", default: false },
    { name: "Niger", value: "NE", iconSrc: "/flags/ne.svg", default: false },
    { name: "Nigeria", value: "NG", iconSrc: "/flags/ng.svg", default: false },
    { name: "North Macedonia", value: "MK", iconSrc: "/flags/mk.svg", default: false },
    { name: "Norway", value: "NO", iconSrc: "/flags/no.svg", default: false },
    { name: "Oman", value: "OM", iconSrc: "/flags/om.svg", default: false },
    { name: "Pakistan", value: "PK", iconSrc: "/flags/pk.svg", default: false },
    { name: "Palau", value: "PW", iconSrc: "/flags/pw.svg", default: false },
    { name: "Palestine", value: "PS", iconSrc: "/flags/ps.svg", default: false },
    { name: "Panama", value: "PA", iconSrc: "/flags/pa.svg", default: false },
    { name: "Papua New Guinea", value: "PG", iconSrc: "/flags/pg.svg", default: false },
    { name: "Paraguay", value: "PY", iconSrc: "/flags/py.svg", default: false },
    { name: "Peru", value: "PE", iconSrc: "/flags/pe.svg", default: false },
    { name: "Philippines", value: "PH", iconSrc: "/flags/ph.svg", default: false },
    { name: "Poland", value: "PL", iconSrc: "/flags/pl.svg", default: false },
    { name: "Portugal", value: "PT", iconSrc: "/flags/pt.svg", default: false },
    { name: "Qatar", value: "QA", iconSrc: "/flags/qa.svg", default: false },
    { name: "Romania", value: "RO", iconSrc: "/flags/ro.svg", default: false },
    { name: "Russia", value: "RU", iconSrc: "/flags/ru.svg", default: false },
    { name: "Rwanda", value: "RW", iconSrc: "/flags/rw.svg", default: false },
    { name: "Saint Kitts and Nevis", value: "KN", iconSrc: "/flags/kn.svg", default: false },
    { name: "Saint Lucia", value: "LC", iconSrc: "/flags/lc.svg", default: false },
    { name: "Saint Vincent and the Grenadines", value: "VC", iconSrc: "/flags/vc.svg", default: false },
    { name: "Samoa", value: "WS", iconSrc: "/flags/ws.svg", default: false },
    { name: "San Marino", value: "SM", iconSrc: "/flags/sm.svg", default: false },
    { name: "Sao Tome and Principe", value: "ST", iconSrc: "/flags/st.svg", default: false },
    { name: "Saudi Arabia", value: "SA", iconSrc: "/flags/sa.svg", default: false },
    { name: "Senegal", value: "SN", iconSrc: "/flags/sn.svg", default: false },
    { name: "Serbia", value: "RS", iconSrc: "/flags/rs.svg", default: false },
    { name: "Seychelles", value: "SC", iconSrc: "/flags/sc.svg", default: false },
    { name: "Sierra Leone", value: "SL", iconSrc: "/flags/sl.svg", default: false },
    { name: "Singapore", value: "SG", iconSrc: "/flags/sg.svg", default: false },
    { name: "Slovakia", value: "SK", iconSrc: "/flags/sk.svg", default: false },
    { name: "Slovenia", value: "SI", iconSrc: "/flags/si.svg", default: false },
    { name: "Solomon Islands", value: "SB", iconSrc: "/flags/sb.svg", default: false },
    { name: "Somalia", value: "SO", iconSrc: "/flags/so.svg", default: false },
    { name: "South Africa", value: "ZA", iconSrc: "/flags/za.svg", default: false },
    { name: "South Sudan", value: "SS", iconSrc: "/flags/ss.svg", default: false },
    { name: "Spain", value: "ES", iconSrc: "/flags/es.svg", default: false },
    { name: "Sri Lanka", value: "LK", iconSrc: "/flags/lk.svg", default: false },
    { name: "Sudan", value: "SD", iconSrc: "/flags/sd.svg", default: false },
    { name: "Suriname", value: "SR", iconSrc: "/flags/sr.svg", default: false },
    { name: "Sweden", value: "SE", iconSrc: "/flags/se.svg", default: false },
    { name: "Switzerland", value: "CH", iconSrc: "/flags/ch.svg", default: false },
    { name: "Syria", value: "SY", iconSrc: "/flags/sy.svg", default: false },
    { name: "Taiwan", value: "TW", iconSrc: "/flags/tw.svg", default: false },
    { name: "Tajikistan", value: "TJ", iconSrc: "/flags/tj.svg", default: false },
    { name: "Tanzania", value: "TZ", iconSrc: "/flags/tz.svg", default: false },
    { name: "Thailand", value: "TH", iconSrc: "/flags/th.svg", default: false },
    { name: "Timor-Leste", value: "TL", iconSrc: "/flags/tl.svg", default: false },
    { name: "Togo", value: "TG", iconSrc: "/flags/tg.svg", default: false },
    { name: "Tonga", value: "TO", iconSrc: "/flags/to.svg", default: false },
    { name: "Trinidad and Tobago", value: "TT", iconSrc: "/flags/tt.svg", default: false },
    { name: "Tunisia", value: "TN", iconSrc: "/flags/tn.svg", default: false },
    { name: "Turkey", value: "TR", iconSrc: "/flags/tr.svg", default: false },
    { name: "Turkmenistan", value: "TM", iconSrc: "/flags/tm.svg", default: false },
    { name: "Tuvalu", value: "TV", iconSrc: "/flags/tv.svg", default: false },
    { name: "Uganda", value: "UG", iconSrc: "/flags/ug.svg", default: false },
    { name: "Ukraine", value: "UA", iconSrc: "/flags/ua.svg", default: false },
    { name: "United Arab Emirates", value: "AE", iconSrc: "/flags/ae.svg", default: false },
    { name: "United Kingdom", value: "GB", iconSrc: "/flags/gb.svg", default: false },
    { name: "United States", value: "US", iconSrc: "/flags/us.svg", default: true },
    { name: "Uruguay", value: "UY", iconSrc: "/flags/uy.svg", default: false },
    { name: "Uzbekistan", value: "UZ", iconSrc: "/flags/uz.svg", default: false },
    { name: "Vanuatu", value: "VU", iconSrc: "/flags/vu.svg", default: false },
    { name: "Vatican City", value: "VA", iconSrc: "/flags/va.svg", default: false },
    { name: "Venezuela", value: "VE", iconSrc: "/flags/ve.svg", default: false },
    { name: "Vietnam", value: "VN", iconSrc: "/flags/vn.svg", default: false },
    { name: "Yemen", value: "YE", iconSrc: "/flags/ye.svg", default: false },
    { name: "Zambia", value: "ZM", iconSrc: "/flags/zm.svg", default: false },
    { name: "Zimbabwe", value: "ZW", iconSrc: "/flags/zw.svg", default: false },
];

export default countryOfResidenceList;