<!-- bim-click-design-internals.md -->
==**Hinweise zu den Backlog Items im vorigen Abschnitt**==:
- Die Backlog Items bis ca. #280 stellen das ursprünglich geplante **Minimum Viable Product (MVP)** 
  von **BIM.click Release 1.0** im Rahmen der ersten Förderungsstufe
  "Hightech digital" für das Projekt BIKM.click durch das Land Baden-Württemberg dar (wobei nicht 
  präzisiert wurde, welche Baueigenschaftsprofilformulare mit welcher fachlichen Funktionalität darin enthalten sind).
- Durch Stefan übernommene Items: #263, #273, #274 (diese sind kodiert, sind "unter Beobachtung"), #286 
  (erledigt), #279 (Flag-Update beim Bewegen von Zweigen, erledigt)

==**Achtung**: Die nachfolgenden **weiteren Items** sind weitere wichtige **Feature Requests**, für die eigene Nummernkreise (#500+, #600+)
verwendet wurden:==

500. ==**[WORK]**== (Prio 2) Weitere **Befüllung mit Stammdaten** für Baustoffe, Baueigenschaften, Baueigenschaftsprofile,
    Bauinformationen, Vorlagen für Baueinheiten
501. ==**[WORK]**== (Prio 2) **Baueigenschaftsprofilformulare** - siehe folgender Abschnitt "Internes Design" - generellere Lösung für Masken für 
    Bauvorhaben/Standort/Gebäude/Raum/Schichtaufbau/Schicht/... - Bauvorhaben, Standort, Gebäude, sind fertiggestellt, Schichtaufbau und Schicht sind 
    in Arbeit, eine erste Implementierung eines **generischen Baueigenschaftsprofilformulars** ist bereits zusätzlich fertiggestellt - Geschoss, Raum 
    sind noch zu implementieren. Dazu gehören als Ausbaustufen die folgenden Backlog Items.
502. ==**[WORK]**== (Prio 2) **Aktivierung von Baueigenschaftsprofilvarianten** mit bestimmten vordefinierten Vorgabewerten in Abhängigkeit von
     der gesetzten Option von bestimmten steuernden Aufzählungswerten, per QButton oder QSelect, der einen entsprechenden API-Aufruf auslöst, in Baueigenschaftsprofilformularen. Dies erfordert nur überschaubaren Zusatzaufwand, da das API für die Aktivierung eines Profils
     bereits vorhanden ist, und nur vom Frontend z.B. per QSelect mit den gewünschten Profilen angesteuert werden muss. Dieses API
     exposed die put-Methode baueinheitenController.updateAktivierungsZustandBaueigenschaftsProfilAnBaueinheit. Der Aufruf erfolgt
     wie in baueinheiten.vue, aktiviereBauvorhabenBaueigenschaftsProfilAnBaueinheit() - zunächst wird die Id des Profils per
     API Call ermittel, dann wird das API zur Aktivierung des Profils mit dieser Id aufgerufen. Nach diesem API-Aufruf
     muss am Frontend ein Refresh durchgeführt werden, um die am Backend vom API eingetragenen Vorgabewerte im Profilformular anzuzeigen.
     
     In einer Basisstufe würde man die z.B. für Nutzungsprofile von Räumen systemseitig vordefinierten Baueigenschaftsprofile
     hartkodiert in einer JSON- oder JS-Datei verwalten, welche von dem QSelect angezogen wird und deren Einträge als QSelect Options
     angezeigt werden. Alternativ könnte man die bereits angelegte Baueigenschaft "Baueinheit > Raum > Nutzung > Profil" (Aufzählungswert) verwenden, die
     als selektierbare Optionen die Bezeichnungen der vordefinierten nutzungsspezifischen Raumprofile enthalten sollte.
     Bezüglich der Optionen könnten die aus der vorläufig angelegten Baueigenschaft "Raum: Nutzungsprofil (nach erweiterter DIN 18599)"
     verwendet werden. Mit einer dieser Optionen würde dann direkt oder indirekt über eine Mapping-Funktion (Option => Profil) das obige API aufgerufen werden zur Profilaktivierung und Eintragung von Vorgabewerten. Allerdings macht im Zweig "Wohnung > ..."
     die Unterscheidung nach Eigentums-, Miet-, Sozial-, gewerblichen und freibeuflich genutzten Wohnungen wenig Sinn.

     Eventuell müsste auch eine Warnung bzw. Confirmation eingebaut werden, falls bereits ein (generisches oder nutzungsspezifisches) Raumprofil aktiviert ist, welches dann überschrieben
     würde. Die dafür benötigten, an einer Baueinheit aktivierten Profile sind ja am Frontend bereits geladen in
     selectedNodeTreeBaueinheiten.zugeordneteBaueigenschaftsProfile, inklusive der Zusatzinformation istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst, und es gibt bereits Methoden, die dafür benutzt werden können
     in baueinheiten.vue: istAktiviertBaueigenschaftsProfilAnNode(node, baueigenschaftsProfilBezeichnung) sowie
     istAktiviertProfilAnNodeUndNodeIstUntersterImPfadAnDemProfilAktiviertIst(node, baueigenschaftsProfilBezeichnung, modus).
          
     Der wichtigste Fall, wo eine Profilaktivierung aus einem Baueigenschaftsprofilformular heraus erfolgt, ist dieser: 
     Im Profilformular "Baueinheit > Raum" wurde im Zuge der ersten Implementierung von #502 im Unter-Tab "Nutzung" ein QSelect eingebaut, mit dem ein bestimmtes Nutzungsprofil aktiviert und dessen Vorgabewerte
     geladen werden. In diesem Fall ist das generische Profil für "Baueinheit > Raum" (das normalerweise keine Vorgabewerte hat) oder ein 
     bisheriges nutzungsspezifisches Profil für einen Raum bereits
     aktiviert, und die betreffende Baueinheit ist der unterste Knoten im
     Baum, an dem dieses Profil aktiviert ist (sonst würde das Profilformular erst gar nicht angezeigt werden). Hier würde
     also ein neues nutzungsspezifisches Profil für einen bestimmten Raumtyp (z.B. "Büroraum") aktiviert werden, obwohl die in diesem
     Profil enthaltenen Baueigenschaften bereits aktiviert sind durch die vorherige Aktivierung des generischen Profils "Baueinheit > Raum" oder
     des bisherigen nutzungsspezifischen Profils. Die Vorgabewerte aus den neuenProfil sollten in diesem Fall, gesteuert über die
     Einstellung vorgabeWerteUeberschreibenVorhandeneWerte, eventuelle vorhandene Werte überschreiben.

     ==**Achtung**==: Für diesen Fall musste entschieden werden, ob das vorher aktivierte generische Profil "Baueinheit > Raum" oder ein ggf. bereits
     aktiviertes nutzungsspezifisches Raumprofil
     entweder vor der Aktivierung des neuen nutzungsspezifischen Profils deaktiviert wird (in diesem Fall gehen
     allerdings alle vorhandenen Werte verloren, auch die, für die keine Vorgabewerte im nutzungsspezifischen
     Profil definiert sind, was unerwünscht ist), oder ob es vor (oder nach) Aktivierung des neuen nutzungsspezifischen Profils
     durch eine neue API-Funktion "unzugeordnet" wird, nämlich deaktiviert wird, **ohne** die ihm zugeordneten Baueigenschaften zu deaktivieren. Letzeres ist die bevorzugte Lösung - dafür wurde das API (Methode updateAktivierungsZustandBaueigenschaftsProfilAnBaueinheit() in baueinheiten.controller.js) um einen Parameter erweitert, welches am Backend den vorhandenen Profilaktivierungscode benutzt, und abhängig von diesem Parameter baueigenschaftenDeaktivieren lediglich die Deaktivierung der zugeordneten Baueigenschaften disabled. Dieser
     Code deaktiviert das vorher aktivierte Profil. Dazu musste in die Methode
     deaktiviereBaueigenschaftsProfilAufElternPfad() in baueigenschafts-profile-aktivierungslogik.js eingegriffen werden und  dort, gesteuert über den genannten Parameter,
     die Deaktivierung der dem Profil zugeordneten Baueigenschaften disabled werden. Diese Methode pulled das Profil aus dem Array zugeordneteBaueigenschaftsprofile, inklusive des Flags istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst. ==Allerdings
     gibt es damit noch ein Problem, dass das Profil nicht ggf. auch im Elternpfad "unzugeordnet" wird (siehe weiter unten).==

     Am Frontend konnte das diesen Vorgang steuernde QSelect nach der Vorlage des QSelects in Zeile 2772 ff.
     in baueinheit-standort-baueigenschafts-profil-formular programmiert werden: Dieses verwendet :value in Verbindung mit einer
     Methode @input = "newValue => selectModelChangedAufzaehlungswert(eigenschaft, newValue)" - dabei kann über den Parameter
     eigenschaft der bisher ausgewählte Option-Wert ermittelt werden (eigenschaft.aufzaehlungsWert), der Parameter newValue enthält
     den neu ausgewählten Option-Wert (Hinweis: Statt eigenschaft könnte auch direkt der alte Wert übergeben werden als Parameter oldValue).
     So ist sowohl das bisher ausgewählte Profil als auch das neu ausgewählte Profil ermittelbar (direkt aus der Option oder über eine
     Mapping-Tabelle). Statt der Mapping-Tabelle könnte auch per :option-value="opt => getProfil(opt)" (in Verbindung mit
     emit-value und map-options!) das passende Profil für eine Option bestimmt werden mittels einer Hilfsfunktion getProfil(opt).
     Siehe https://quasar.dev/vue-components/select#example--custom-label-value-and-disable-props. Der bisherige, noch
     experimentelle Code speist die
     Options aus einem nested Array, der sowohl das anzuzeigende Option Label als auch die Profilbezeichnung enthält, die dann einem 
     Array-Objekt
     per :option-label = "opt => Object(opt) === opt && 'optionsBezeichnung' in opt ? opt.optionsBezeichnung : '- Null -'" bzw. per
     :option-value = "opt => Object(opt) === opt && 'profilBezeichnung' in opt ? opt.profilBezeichnung : null" entnommen werden können.

     In dieser Funktion selectModelChangedAufzaehlungswert wurde dann noch zusätzlich einen Confirmation-Dialog eingebaut,
     welcher eine Confirmation Message anzeigt - bei negativer Confirmation wird der bisherige Option-Wert beibehalten,
     bei positiver Confirmation wird obiger Vorgang angestoßen, welcher das neu ausgewählte Profil aktiviert und das bisherige
     "unzuordnet".

     ==**Achtung**==: Auch die Funktionen, die in "Fachliche Planung" das relevanteste Profil anzeigen und die dabei verwendeten Funktionen 
     showZugeordneteBaueigenschaftsProfileAusgewaehlteBaueinheit() und die Funktionen zur Bestimmung und Aktualisierung von
     istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst() müssen entsprechend angepasst werden,
     in dem Sinne, das sie für alle Raumprofile funktionieren, auch für die nutzungsspezifischen Profilvarianten.
     Statt nur auf "Baueinheit > Raum" muss dort dann auf alle
     Nutzungsprofile für Räume geprüft werden, z.B. indem alle nutzungsspezifischen Raumprofile im Bezeichnungsschema stets "Baueinheit > Raum > ..." heißen, und für 
     ein in diesen Funktionen zu prüfendes Raumprofil per JS startsWith ermittelt wird, ob das Präfix "Baueinheit > Raum" ist, 
     und dann nur gegen dieses Präfix "Baueinheit > Raum" verglichen wird. Dies bereits punktuell eingebaut in baueinheiten.vue, Zeilen 14520 und 15072, sowie ganz am
     Anfang im Template für das Baueigenschaftsprofilformular für "Baueinheit > Raum", wo geprüft wird, welches Profil aktiviert ist.

     ==**[TODOs]**==:

     Die obige Lösung, dass beim Aktivieren eines anderen Raumnutzungsprofils nur das bisherige "unzugeordnet" wird, die
     dem Profil zugeordneten Baueigenschaften an der betreffenden Baueinheit aber aktiviert bleiben (mittels des speziellen 
     Parameters) und beim Aktivieren des neuen Raumnutzungsprofils ggf. mit anderen Vorgabewerten belegt werden, muss weiter evaluiert und validiert werden.

     Ein verbleibendes **Problem** damit und mit der Profil-Deaktivierung allgemein ist, dass ==**an Elternbaueinheiten** im Elternpfad bei dieser Art der 
     "Unzuordnung" die bisherige Profilvariante nicht "deaktiviert" bzw. "unzugeordnet" wird==, nur an der betreffenden Baueinheit selbst! 
     Dies lässt sich reproduzieren: Es tritt sowohl beim Wechsel einer Profilvariante per QSelect auf (z.B. am Elterngeschoss und 
     darüber), als auch bei einer manuellen Deaktivierung eines Profils (auch wenn es kein Raumprofil ist) per Admin-Funktion.
     Einfacher Testfall für letzteres: Profil "Allgemein > Test > Wertetypen" am Splash-Erlebnisbad aktivieren. Aktiviert es korrekt auch am 
     Knoten "Bauprojekte" in der
     Ebene darüber. Deaktivierung am "Splash-Erlebnisbad" führt aber nicht zu Deaktivierung an "Bauprojekte". Im Backend Log kam in diesem 
     Fall die irreführend Meldung "Vor $pull in Array zugeordneteBaueigenschaftsprofile mit deaktiviertem Profil für gesamten Pfad", aus
     baueigenschafts-profil-aktivierungs-logik.js, Zeile 880. Diese Meldung war aber falsch und wurde gefixt - die Deaktivierung
     des Profil erfolgt bisher nur am Knoten selbst und dessen Kindern und Kindeskindern, nicht im Elternpfad.

     Die Auswirkung dieser derzeit fehlenden Profildeaktivierung im Elternpfad ist, dass dadurch z.B. beim Deaktivieren des
     heutigen Profils "Baueinheit > Raum" an der Elternbaueinheit das Profil "Baueinheit > Raum" aktiviert bleibt, und so die Elternbaueinheit zum "Raum"
     wird, was bestimmte Frontend-Funktionen, die z.B. über die zur Aktivierung erlaubten Profile an diesem Knoten oder dessen
     Kindknoten entscheiden, durcheinander bringt. 
     
     Es ist hier sinnvoll, dass die Profil-Deaktivierungslogik künftig
     denselben Regeln folgt, wie die Logik im neuen Algorithmus für die Profildeaktivierung beim Löschen und Bewegen von Zweigen (Stefan, Epic 38.k). Dann müsste also diese neue Profildeaktivierungs-Funktion auch bei der Profil-Deaktivierung selbst eingebaut werden. Allerdings muss diese im Fall der Profil-Deaktivierung im Gegensatz zum Löschen nicht nur eine 
     Profildeaktivierung durchführen, sondern ggf. (gesteuert über den Parameter) auch die (im Code bereits vorhandene) Deaktivierung der zugehörigen Baueigenschaften. ==Diese darf allerdings stets nur an der Baueinheit selbst und deren Kindern und Kindeskindern erfolgen, nicht am Elternpfad! Dies ist im heutigen Code auch bereits so implementiert. Sonst gäbe
     es Probleme bei gemeinsamen Baueigenschaften in mehreren Profilen (z.B. "Baueinheit > Standort" und "Baueinheit > Gebäude"), und zusätzlich müsste vor jeder
     Baueigenschafts-Deaktivierung im Elternpfad aufwändig geprüft werden, ob es keine Kindbaueinheiten gibt, an denen diese aktiviert ist.==

     ==**Hinweis:** Bei der direkten, regulären Deaktivierung von einzelnen Baueigenschaften werden diese offenbar aus denselben
     Gründen ebenfalls nicht im Elternpfad 
     deaktiviert, sondern nur an der betreffenden Baueinheit selbst, sowie an deren Kindern und Kindeskindern!==

     Zusätzlich steht nach obiger Profildeaktivierung aktuell das Flag "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" am Elternknoten auf false, was definitiv falsch ist. Dies
     scheint ein Unterschied zum ähnlichen Problem #339 beim Löschen zu sein - beim Löschen ist das Flag korrekt gesetzt. Die obige Funktion von Stefan erledigt das korrekte Setzen dieser Flags gleich mit.
     Das Flag wird im derzeitigen Profildeaktivierungs-Code auch nicht aktualisiert an dieser Stelle.
     
     Dies alles markiert mit #502 in
     baueigenschafts-profil-aktivierungs-logik.js, deaktiviereBaueigenschaftsProfilAufElternPfad().
     
     Außerdem gibt es weitere Fälle zu beachten: Zum Beispiel kann es vorkommen, dass
     unter einem Geschoss zwei Räume mit unterschiedlichen Raumntzungsprofilen vorhanden sind. An den Baueinheiten im Elternpfad dieser Räume
     sind dann dementsprechend auch zwei unterschiedliche Raumprofile aktiviert (die allerdings ausschließlich gemeinsame Baueigenschaften haben). Beim Löschen
     eines dieser Räume müsste dann das Raumprofil dieses Raums auch am Elternpfad aus der Liste der aktivierten Profile ausgetragen werden.
     Beim Ändern des Nutzungsprofils eines dieser Räume müsste dieses auch im Elternpfad geändert werden. Dies erfolgt aktuell über obige "Unzuordnung".
     
     Die Funktionen, die "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" bestimmen, müssen ebenfalls berücksichtigen, dass es unterschiedliche Raumprofile an einem 
     Knoten und im Elternpfad geben kann. Beispiel in baueinheiten.vue:
     selectedNodeTreeBaueinheitenIstUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst() - diese Funktion enabled, ob u.a. das 
     Formular für "Baueinheit > Raum" angezeigt wird. Sie hat als Parameter die "echte" Profilbezeichnung ("Baueinheit > Raum > ...") und funktioniert per Vergleich
     mit dem Array zugeordneteBaueigenschaftsProfile und den dortigen Flags aus dem Backend. Sie würde so auch für
     Profilvarianten von Raum ("Baueinheit > Raum > ...) funktionieren, wird aber bisher stets mit "Baueinheit > Raum" aufgerufen, außer
     im Template-Teil von baueigenschaften.vue, wo sie an mehreren Stellen provisorisch bereits für 2 andere Nutzungsprofile enabled ist..
     
     Die Schwierigkeit dabei ist, dass sie auf dem vom Backend
     gesetzten Flags "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" im Array zugeordneteBaueigenschaftsProfile basiert. Eine kurze Inspektion des Backend-Codes in
     baueinheiten.controller.js zeigt, dass der Backend-Code auch die Profilvarianten von "Baueinheit > Raum" mit ihren Bezeichnungen 
     ("Baueinheit > Raum > ...") in den Array einträgt, inklusive des Flags. Dies
     führt am Frontend überall dort zu Fehlern, wo am Frontend nicht die Profilvariante ("Baueinheit > Raum > ...") verwendet wird, sondern per startsWith-Mapping 
     nur "Baueinheit > Raum", da dann "Baueinheit > Raum" verglichen wird mit "Baueinheit > Raum > ..." in den Arrays der tatsächlich (per Backend) aktivierten
     Profile. Mehrere von diesen Problemen betroffene Stellen im Frontend (baueinheiten.vue) identifiziert und provisorisch gefixt:
     - getTabVonHierarchischOberstemProfilFormularInAktiviertenBaueigenschaftsProfilen() - dort provisorisch das Problem gefixt mit 
       quick & dirty Fix, dass
       nach Anwahl z.B. von "Baueinheit > Raum > Wohnen > Flur in der Wohnung" nicht mehr das Profilformular für "Baueinheit > Raum" angezeigt wurde!
     - showZugeordneteBaueigenschaftsProfileAusgewaehlteBaueinheit() - ist verantwortlich für die
       Anzeige der an einer Baueinheit aktivierten Profile. Erste Anpassung eingebaut. Allerdings wurde trotzdem
       z.B. bei aktiviertem Profil "Baueinheit > Raum > ..." nicht die korrekte Liste angezeigt. Daher ähnlichen Quick Fix eingebuat wie in showZugeordneteBaueigenschaftsProfileAusgewaehlteBaueinheit() wie in obige Funktion
       getTabVonHierarchischOberstemProfilFormularInAktiviertenBaueigenschaftsProfilen() - das gemerkte Profil "Baueinheit > Raum > ..." weiter 
       unten im Code zum filter-Vergleich herangezogen, statt "Baueinheit > Raum".
     - istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst: Siehe oben (arbeitet auf dem "echten" aktivierten Raumprofil "Baueinheit > Raum > ...")
     - Auch das mittels "...relevantetes Profil anzeigen" per Kontextmenü anzeigbare Formular funktionierte bisher nur für "Baueinheit > Raum", 
       nicht für die Profilvarianten! Nach Anpassungen in der oben genannten Funktion 
       getTabVonHierarchischOberstemProfilFormularInAktiviertenBaueigenschaftsProfilen() scheint es korrekt zu funktionieren
       (Test per Profilwechsel für "Baueinheit > Raum" z.B. nach "Baueinheit > Raum > Wohnen > Flur in der Wohnung", dann auf dieses Menü-Item klicken, dann
       wird Profilformular "Baueinheit > Raum" angezeigt").
     - Die Liste der unter "...und relevantes Baueigenschaftsprofilformular daran anzeigen" Profile hatte bei
       aktiviertem Profil "Baueinheit > Raum > Wohnen > Flur" in der Wohnung" nicht "Baueinheit > Raum" enabled, funktioniert also noch nicht!
       Dies in Zeile 500 ff. in baueigenschaften.vue provisorisch enabled für 2 weitere Raumprofile.
     - Die Liste, die unter "...und bestimmtes Baueigenschaftsprofilformular daran anzeigen" zeigt bisher nur das generische
       Raumprofil an, sie muss künftig erweitert werden um die weiteren Raumprofile (sobald diese im System sind).
       Das Disabling von "Baueinheit > Raum" provisorisch angepasst für 2 weitere Raumprofile.
     - Die Liste, die unter "...Kindbaueinheit neu anlegen und Baueigenschaftsprofil daran aktivieren muss ebenfalls um
       diese erweitert werden, und darf zusätzlich nicht "Baueinheit > Raum" enablen, wenn an der Baueinheit selbst bereits eines der
       weiteren Raumprofile aktiviert ist, dies provisorisch angepasst für 2 weitere Raumprofile.

503. ==**[WORK]**== (Prio 2) **Bauinformationsprofile** und deren Aktivierung in Abhängigkeit von solchen steuernden Aufzählungwerten per obigem Button, der
     einen entsprechenden API-Aufruf auslöst, in Baueigenschaftsprofilformularen - siehe dazu das Epic im internen Design
     - **Update 04.01.2021**: Dazu zunächst im gesamten Code und in der BaueigenschaftenCollection auf Heroku mit der MongoDB Shell das Feld   
       "anzeigeText" umbenannt in "baueigenschaftsAnzeigeText". Dann in der BauinformationenCollection auf Heroku mit der MongoDB Shell ein Feld 
       "bauinformationsAnzeigeText"
       hinzugefügt. Dieses sollte in den Tables für die Bauinformationen zusätzlich zu oder statt der Bemerkung angezeigt werden, dito in den
       populierten Bauinformationen in Baueinheiten und Baustoffen (das bisher dort angezeigte Feld "bauinformationsBemerkung" ist potentiell sehr lang).
     - **Update 10.01.2021**: 
       - **[DONE]** am Backend und Frontend. Aktivierung von Bauinformationsprofilen in Baueinheiten
       - **[DONE]** Erweiterung aller Instanzen von Baueinheiten und Baustoffen in den jeweiligen Collections auf Heroku um den Array
         zugeordneteBauinformationsProfile mit geeignetem MongoDB Shell Command (updateMany mit $set, siehe internes Design)
       - ==**[TODO]**== Aktivierung von Bauinformationsprofilen in **Baustoffen** in Frontend und Backend - eine gemeinsame Controller-Methode dafür für 
          Baueinheiten und Baustoffe ist 
          bereits vorhanden am Backend, bisher nur in baueinheiten.controller.js (das API ist zu duplizieren nach baustoffe.controller.js oder als 
          gemeinsamer Code auszulagern nach bauinformations-profile-aktivierungslogik.js)
504. **[DONE]** (Prio 3) Zusätzliche **Kontextmenüs** an Baueinheiten (bzw. später auch Baustoffen):
     - **Zusammenlegung von Neuanlage Kindbaueinheit und Profilaktivierung** bzw. **Anlegen bestimmter Arten von Baueinheiten** 
       per Kontextmenü im Bauvorhabenbaum mit Profilaktivierung
       - Bereits vorhandene Alternative dafür: **Vorlagen für Baueinheiten** definieren und verwenden) - siehe dazu das Epic im internen Design
       - **Update 24.12.2020**: Für Profile "Baueinheit > Bauvorhaben" und "Baueinheit > Standort" bereits testweise implementiert, per Kontextmenü im Bauvorhabenbaum
         Baueinheit auswählen und Kindbaueinheit neu anlegen und Baueigenschaftsprofil daran aktivieren > Bauvorhaben/Standort" in baueinheiten.vue
       - **Update 25.12.2020**: Für Profile "Baueinheit > Bauvorhaben" und "Baueinheit > Standort" bereits testweise implementiert, per Kontextmenü im Bauvorhabenbaum
         "Baueinheit auswählen und Baueigenschaftsprofil daran aktivieren > Bauvorhaben/Standort" in baueinheiten.vue, dass damit dieses
         Profil aktiviert werden kann per Kontextmenü. Das Kontextmenü wird disabled, wenn das Profil bereits aktiviert ist.
         Dazu musste im Array zugeordneteBaueigenschaftsProfile zusätzlich das Feld baueigenschaftsProfilBezeichnung populiert werden in 
         baueinheiten.controller.js, damit per Baueigenschaftsprofilbezeichnung abgeprüft werden kann, ob das Profil bereits aktiviert ist 
         an einem Knoten.
     - **Anwahl bestimmter Baueigenschaftsprofilformulare** per Kontextmenü
       - **Update 30.12.2020**: Für Profile "Baueinheit > Bauvorhaben" und "Baueinheit > Standort" bereits testweise implementiert, per Kontextmenü im Bauvorhabenbaum
         "Baueinheit auswählen und bestimmtes Baueigenschaftsprofilformular daran anzeigen > Bauvorhaben/Standort" in baueinheiten.vue
         - Formulare für nicht aktivierte Profile werden im Untermenü dabei disabled, mit Hilfe von z.B.
           :disable="bauvorhabenBaueigenschaftsProfilIstAktiviertAnNodeTreeBaueinheiten(node)"
       - **Update 14.01.2021**: Weiter verfeinert im Zuge von #272, Kontextmenü umbenannt in "...und relevantes Baueigenschaftsprofil
         daran anzeigen > ..."
505. **[DONE]** (Prio 3) **Enabling/Disabling** und **automatische Anwahl von Baueigenschaftsprofilformularen** in der Tab-Leiste bei Auswahl
     einer Baueinheit im Bauvorhabenbaum, in Abhängigkeit 
     davon, ob bestimmte Baueigenschaftsprofiel aktiviert sind oder nicht - siehe dazu das Epic im internen Design.
     - Auf jeden Fall kann hier in Abhängigkeit davon, ob das Baueigenschaftsprofil für ein Baueigenschaftsprofilformular an einem Knoten aktiviert ist oder 
       nicht, das zugehörige Formular in der Tableiste **enabled** oder **disabled** werden.
       - Bei **Alternative 1 [selektiert]** im Backlog Item #506 ist dafür kein zusätzliches Flag notwendig. An Knoten weiter unten im Baum ist das zugehörige 
         Profil bei Alternative 1 nicht 
         aktiviert, und das Baueigenschaftsprofilformular kann an diesen Knoten deshalb disabled bleiben (aktivierte Profile sind im Array zugeordneteBaueigenschaftsProfile im Knoten, allerdings nur mit ihrer Id, nicht mit baueigenschaftsProfilBezeichnung - diese sollte mit in
         beim Laden einer Baueinheit mit in diesem Array populiert werden - wenn man das ändert, sollte aber auch gleich das Flag unten mit in den
         Array aufgenommen werden, das anzeigt, ob ein Profil manuell am untersten Knoten im Pfad aktiviert wurde, oder vom System
         bei der Profilaktivierung im Pfad der Elternbaueinheiten aktiviert wurde - dann kann die Disable-Computed-Funktion
         sowohl die Bezeichnung abfragen als auch dieses Flag und dann entscheiden ob das zugehörige Profilformular enabled oder disabled wird.
         Im Abschnitt "Design-Überlegungen zum automatischen Enablen/Disablen von Baueigenschaftsprofilformularen und verwandten Themen" 
         im internen Design erläutert, wo der davon betroffene Array zugeordneteBaueigenschaftsProfile verwendet wird.
       - Bei **Alternative 2 [deselektiert]** würde ein zusätzliches Flag mit eier komplexeren Steuerung notwendig (siehe internes Design)
     - Als **Ausbaustufe** (mittlerweile implementiert in #272) kann hier ein noch **selektiveres Enablen/Disablen** erfolgen, bei dem jeweils nur das entsprechende
       Baueigenschaftsprofilformular am **untersten Knoten im Pfad**, an dem das zugehörige Baueigenschaftsprofil aktiviert ist, enabled wird.
       - ==Bei **beiden Alternativen** wird dafür das genannte **zusätzliche Flag** notwendig, mit dessen Hilfe der jeweils unterste Knoten im Pfad, an dem das Profil vom Benutzer, und nicht wie an den Elternknoten im Pfad automatisch vom System im Rahmen der Profilaktivierung aktiviert wurde, identifiziert werden kann zur selektiveren Steuerung des Enablings/Disablings==
     - Für die **automatische Anwahl** des jeweils passenden Tabs unter "Baueigenschaftsprofile" sind verschiedene Implementierungsstufen denkbar:
          - In einer **Grundstufe** kann in der Reihenfolge "Bauvorhaben" > "Standort" > "Gebäude" > "Geschoss" > "Raum" > ..." bei mehreren aktivierten Profilen an
          einer Baueinheit jeweils das Unter-Tab für das in dieser Reihenfolge **am weitesten links stehende aktivierte Baueigenschaftsprofil** anzgezeigt werden
               - Beispiel: 
                    - An der Einstein-Schule wird, wenn dort "Baueinheit > Bauvorhaben", "Baueinheit > Standort" und alle weiteren Profile aktiviert sind, das Tab für "Bauvorhaben" angewählt
                    - "Standort" kann bei Bedarf manuell angewählt werden
                    - Falls "Baueinheit > Standort" auch an Kindknoten der Einstein-Schule aktiviert ist, sind dessen Felder im Profilformular an der Einstein-Schule nach
                    jetzigem Stand editierbar und werden beim Speichern an diese Kindknoten weitervererbt
                    - Falls "Baueinheit > Standort" in den Kindknoten der Einstein-Schule deaktiviert ist, wird dessen Profilformlar an diesen Kindknoten nach demselben
                    Algorithmus nicht automatisch angewählt, sondern das entsprechende, absolut weiter rechts stehende, relativ am weitesten links unter den aktivierten Profilen stehende Profilformular, z.B. "Gebäude" 
               - **Update 14.01.2021**: 
                 - **[DONE]** Implementiert per Funktion    
                 getTabVonHierarchischOberstemProfilFormularInAktiviertenBaueigenschaftsProfilen() in baueinheiten.vue. Diese wird aufgerufen:
                 - **[DONE]** Aus Kontextmenü "Baueinheit auswählen und passendes Baueigenschaftsprofilformular anzeigen"
                 - **[DONE]** Bei Wechsel des ausgewählten Knotens im Bauvorhabenbaum (watch auf selectedKeyTreeBaueinheiten)
                 - **[DONE]** Bei Tab-Wechsel (watch auf selectedKeyTreeBaueinheiten, nur wenn das neu ausgewählte Unter-Tab   
                   "baueigenschaftsProfilFormulareTabBaueinheiten" ist
                 - **[DONE]** Außerdem die Unter-Tabs unter "Baueinheiten > Baueigenschaftsprofilformulare" disabled in Abhängigkeit davon, ob sie
                   an der im Bauvorhabenbaum ausgewählten Baueinheit aktiviert sind oder nicht
                 - **[DONE]** Als Ausbaustufe (#272) auch noch automatische Disabling implementiert in Abhängigkeit des erwähnten 
                   neuen **Flags** für Tabs, die weiter oben im
                   Baum nur aktiviert sind, weil sie im Rahmen der Profilaktivierung an Elternknoten automatisch aktiviert wurden.
                   Das neue Flag im dafür geänderten Model für Baueinheiten und Baustoffe heißt 
                   istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst.
                 - **[DONE]** Das ausgewählte Unter-Tab wird im watch für selectedNodeTreeBaueinheiten unterschiedlich gesetzt für
                   Wurzelknoten, Bauvorlagenunterbaumwurzelknoten und den Bauprojektunterbaumwurzelknoten (Tab "Baueinheitsbeschreibung") und 
                   die übrigen Knoten (Tab "Baueigenschaftsprofilformulare" mit Steuerung des Unter-Unter-Tabs durch obige Funktion)
          - Dies kann dann in **Ausbaustufen** noch weiter optimiert werden, unter Nutzung des oben beschriebenen zusätzlichen 
            **Flags**, das im Zuge von #272 implementiert wurde (Flag istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst im
            Model für Baueinheiten und auch gleich für Baustoffe dort allerdings bisher nur am Backend)
               - Wegen dieses Flags im Pfad "weiter oben" disablete Formulare werden dann bei dieser Suche von links nach rechts nicht berücksichtigt
               - In obigem Beispiel, wenn an der Einstein-Schule "Baueinheit > Bauvorhaben", "Baueinheit > Standort" und alle weiteren Profile aktiviert sind, "Baueinheit > Bauvorhaben" und
                    "Baueinheit > Standort" jedoch nicht an dessen Kindknoten, ist Einstein-Schule für "Baueinheit > Bauvorhaben" und "Baueinheit > Standort" der unterste aktivierte Knoten im Pfad - deshalb
                    werden die beiden Profilformulare für "Baueinheit > Bauvorhaben" und "Baueinheit > Standort" mit Hilfe dieses Flags enabled, alle übrigen bleiben disabled
               - Die oben beschriebene automatische Anwahl kann dann nur auf diesen beiden enableten Profilen stattfinden, und mit dem beschriebenen Algorithmus
                 kann dann das Profilformular für "Baueinheit > Bauvorhaben" automatisch angewählt werden - das Profilformular für "Baueinheit > Standort" kann ggf. manuell angewählt werden.

506. **[REJECT]** (Prio 3) ==**[Entfällt bei Alternative 1]**== Eventuelle **Änderungen der Baueigenschaftsprofil-Aktivierungslogik** in Bezug auf vorhandene Kindknoten sowie beim Neuanlegen von Kindknoten: 
     - Siehe dazu das Epic im internen Design
     - Bisher werden by Default bei einer Profilaktivierung in ggf. vorhandenen Kindknoten <it>überhaupt keine</it> Baueigenschaften aus dem aktivierten Profil aktiviert (nur
       die Baueigenschaften im Profil am betreffenden Knoten selbst und desssen Elternknoten werden aktiviert)
     - Es muss dort (nur bei Alternative 2 unten) stattdessen künftig berücksichtigt werden, welche Baueigenschaften aus dem Elternknoten auch im Kindknoten aktiviert werden sollen
       a) bei der **Profilaktivierung** an einem Elternknoten für vorhandene Kindknoten, und
       b) beim **Neuanlegen von Kindknoten** unter einem Elternknoten
     - Wegen der Anforderung zur Weitervererbung z.B. von Sollwerten aus dem Standort werden bestimmte Baueigenschaften auch an vielen oder sogar allen Kindknoten 
       benötigt.
     - ==Diese Baueigenschaften müssen auf jeden Fall (bei beiden Alternativen unten) in diesen Kindknoten aktiviert werden, damit deren Werte weitervererbt werden für Vergleiche oder für computed-Funktionen im Kindknoten.==
     - ==Dafür, wie diese Aktivierung genau erfolgt, sind folgende **Alternativen** in Diskussion:==
       - **[Alternative 1- selektiert]**: ==**Gemeinsame Baueigenschaften zwischen mehreren Profilen**==
         - Die betreffenden Baueigenschaften werden mehreren Profilen zugeordnet, z.B. wird "Aufbauhöhe" mit derselben Baueigenschaftsbezeichnung dann sowohl dem
           Profil "Baueinheit > Geschoss" als auch dem Profil "Baueinheit > Bodenaufbau" zugeordnet (d.h. ist gemeinsam zwischen beiden Profilen)
         - An den Baueinheiten "weiter oben" (z.B. "Raum" bzw. "Geschoss") wird dann entsprechend deren Profil aktiviert. An der Baueinheit "weiter unten" wird nur das dieser entsprechende 
           Profil (z.B. „Bodenaufbau) mit **gemeinsamen Baueigenschaften** mit den Profilen "weiter oben" aktiviert - dadurch wird dann die erforderliche Wertevererbung für die gemeinsamen 
           Baueigenschaften ausgelöst.
         - Vorteil: Jede Baueinheit hat ihre eigenen Profile - im Baum unten (hier z.B. am Bodenaufbau) müssen nicht Profile von oben (hier vom Raum bzw. Geschoss) zusätzlich aktiviert werden
         - Achtung: Im Profil „Bodenaufbau“ darf dabei **kein eigener Vorgabewert** für die betreffende, gemeinsame Baueigenschaft eingetragen werden, da sonst dieser Vorgabewert bei 
          Aktivierung ds Profils „Bodenaufbau“ den Vorgabewert aus dem Profil „Raum“ überschreiben würde!
       - **[Alternative 2- deselektiert]** **Änderungen in der Profilaktivierungslogik**
         - Am Bodenaufbau würde sowohl das Profil „Raum“ bzw. „Geschoss“ als auch das Profil „Bodenaufbau“ aktiviert - die betreffenden Baueigenschaften müssen dabei nicht in mehreren Profilen 
           enthalten sein
         - Nachteil 1: In Bezug auf etwaige unterschiedliche Vorgabewerte in beiden Profilen käme es dann auch noch auf die Reihenfolge der Aktivierung die-ser Profile an!
         - Nachteil 2: Damit müssten dann die meisten Profile von weiter oben auch weiter unten im Baum aktiviert werden!
     - Wenn andererseits stets alle Baueigenschaften, die im Elternknoten aktiviert sind, auch am Kindknoten aktiviert sind, würde dies dazu führen, dass
       <it>alle</it> Baueigenschaften an <it>allen</it> Knoten im gesamten Baum aktiviert sind!
     - Zumindest im Baustoffbaum war das so nicht geplant, da dort auf jeden Fall bestimmte Baueigenschaften "selektiv" bzw. "exklusiv" nur für bestimmte
       Kategorien von Baustoffen gelten können
     - Im Bauvorhabenbaum gilt zumindest für die Baueigenschaften, die oben im Baum als Baueigenschaftsprofil "Baueinheit > Bauvorhaben" aktiviert sind, dass diese nicht an alle 
       direkten und indirekten Kindknoten weitervererbt werden müssen, und daher auf den Ebenen darunter deaktiviert bleiben können
     - Viele andere Profile für Baueinheiten im Bauvorhabenbaum (z.B. "Baueinheit > Standort" oder Profile für "Raum") müssen tendenziell allerdings eher nach unten weitervererbt 
       werden, d.h. die Baueigenschaften im Profil "Baueinheit > Bauvorhaben" könnte also eher eine Ausnahme, als die Regel sein!
     - Es also muss noch genauer designed werden und eventuell verwaltbar gemacht werden (am Besten im Sinne der selektiven Vererbung, d.h. Aktivierung ganzer 
       Baueigenschaftsprofile und der Unterscheidung ob Baustoff- oder Bauvorhabenbaum), welche Baueigenschaften aus einem Elternknoten auch im Kindknoten aktiviert werden sollen
     - Beim verwandten und geplanten Anlegen bestimmter Arten von Baueinheiten (siehe #504) könnte man die Aktivierung von Baueigenschaften aus dem aktuellen 
       Elternknoten dann nach derselben Logik ebenfalls selektiv steuern
507. ==**[WORK]**== (Prio 2) **Excel-Reports** a la BTKBuilder (in "Auswertungen") - ==dazu das Node Paket **exceljs** verwenden - https://www.npmjs.com/package/exceljs==
     - ==**Update 23.12.2020**==: In baueinheiten.controller.js, API-Methode exportBaueigenschaftenAnBaueinheit() wird bereits eine XLSX-Datei mittels ExcelJS 
       erzeugt. Dies kann im Frontend per Datenaustausch > Export > Baueigenschaften an Baueinheit getriggert werden!
       Dies exportiert alle Baueigenschaften mit ihren Werten an der per Id spezifizierten Baueinheit.
508. ==**[TODO]**== (Prio 2) **Datenaustausch (Revit, IFC, etc.)** - siehe folgender Abschnitt "Internes Design"
     - ==**Hinweise**==: ==Nach Diskussion gibt es für den Datenaustausch auf Attributebene folgende Schwerpunkte/Prioritäten:==
       - Es müssen nicht alle in BIM.click verwendeteten Attribute importiert oder exportiert werden!
         - Für den Export wichtig sind **bauteil- und baustoffbezogene** Daten (z.B. zu verwendende Baustoff in Böden, Wänden, etc.) für **Ausschreibungen**
         - Für den Import wichtig sind **geometriebezogene Daten** aus dem CAD-Modell (z.B. aus Revit)
     - Genauso wichtig wie der Austausch auf Attributebene ist die **Verortung** der Zielobjekte für die Attributierung! 
       - Siehe dazu auch die PowerPoint-Präsentation zur Attributierung von Revit-Modellen mit Rushforth Tools vom August 2020
       - Dabei spielt es auch eine große Rolle, wie der Architekt bestimmte Objekte (besonders geschichtete Bauteile wie Wände und Böden) 
         modelliert hat (z.B. bzgl. der Anzahl der im Modell vorhandenen Schichten - wenn diese vom BIM.click-Modell abweicht, muss ein
         geeignetes Mapping vorgenommen werden)
       - Mit Hilfe ggf. vereinbarter Kennzeichen/Tags an bestimmten Objekten (z.B. an Räumen per ausgestauschter "Raumliste") ist ein "Cross 
         Referencing" zwischen den Modellen als Orientierung für dieses Mapping möglich - ob solche Tags auch beim Export/Import eine Rolle spielen sollen,
         muss noch evaluiert werden
509. ==**[WORK]**== (Prio 3) Die **Zuordnung von Baustoffen zu Baueinheiten ("Hochzeit")** sollte selektiver erfolgen - siehe das entsprechende Epic im internen Design. Dazu existieren bereits Test-Methoden in baustoffe.controller.js, readFilteredExtraktBaustoffe()
510. ==**[TODO]**== (Prio 3) Der **Schichteditor** sollte im Endausbau eventuell **zweistufig** statt **einstufig** sein (mit 
     verschachtelten QExpansion Items) - BTKBuilder hatte
     dies adressiert, indem an jeder Schicht ein Attribut angeknipst werden konnte, ob die Schicht zum Bodenaufbau, zum Rohboden oder zur Bodenunterseite gehört - dies ist in BIM.click durch den Aufzählungswert "Schichttyp im Bodenaufbau" an einer Schicht ebenfalls möglich. Eventuell ist ein zusätzlicher Aufzähhlungswert nötig, um die einzelnen Schichten diesen drei "Schichtpaketen" zuzuordnen.
511. **[DONE]** (Prio 3) Funktionen zum **Kopieren/Duplizieren von Baueigenschaftsprofilen** - implementiert 20.04.2021 zum bequemeren Erstellen von 
Baueigenschaftsprofilen mit Vorgabewerten per "Cloning" (Duplizieren) existierender Profile
512. ==**[TODO]**== (Prio 3) **Formular** zum gemeinsamen **Editieren von Vorgabewerten** für alle Baueigenschaften in einem 
     Baueigenschaftsprofil - das Layout kann 
     vom generischen Baueigenschaftsprofilformular übernommen werden. Es ist allerdings vorläufig auch akzeptabel, dass die
     Vorgabewerte jeweils einzeln editiert werden im Tab "Baueigenschaften" > "Baueigenschaftsprofile" > "Details zum ausgewählten 
     Baueigenschaftsprofil" > "Zugeordnete Baueigenschaften am Baueigenschaftsprofil" > "Vorgabewerte für ausgewählte Baueigenschaft am
     Baueigenschaftsprofil". 
513. **[DONE]** (Prio 2) **Labels/Display-Namen/Anzeigetexte** für Baueigenschaften zusätzlich zur vorhandenen Bezeichnung einführen - diese können 
     dann auch ohne Angabe eines Labels in einer Layout-Datei für ein Baueigenschaftsprofilformular direkt angezeigt werden als Labels von Eingabefeldern und können somit
     zentral in der Datenbank verwaltet werden. Gewählte Terminologie dafür: **Anzeigetext** (an Eingabefeldern für die Baueigenschaft). Hinweis:
     Das weitere, bereits vorhandene Feld für die Baueigenschaftsbemerkung kann zusätzlich für Tooltips verwendet werden.
514. ==**[WORK]**== (Prio 2) Änderungen an Baueigenschaften:
     - **[DONE]** Das Merkmal **"Sollwert"*** (sollWertNichtIstWert) soll verschoben werden von den wertbezogenen zu den typbezogenen Merkmalen einer Baueigenschaft
       - Sollwerte können so identifiziert und unterschieden werden von Istwerten (d.h. nicht nur durch eine Konvention über die Baueigenschaftsbezeichnung)
       - Wenn Soll- und Istwert für eine Eigenschaft benötigt werden, sollten 2 verschieden Baueigenschaften dafür angelegt werden ("Dicke Sollwert" und "Dicke 
         Istwert" - an der ersten sollte das Flag "Sollwert" auf "true" stehen)
     - **[DONE]** Das Merkmal **"systemverwaltet"** sollte bei dieser Gelegenheit gleich mit dorthin verschoben werden, umd Eigenschaften, die vordefiniert 
       sind und auf denen Baueigenschaftsprofile aufgebaut sind, zu unterscheiden von anderen
     - **[DONE]** Bei dieser Umstrukturierung der Baueigenschaften sollte auch gleich das neue typbezogene Feld für den **Anzeigetext** pro 
       Baueigenschaft mit unterstützt werden (#513).
     - ==**[WORK]**== (Prio 3) Die Property **"Operator"** sollte dagegen von den typbezogenen zu den wertbezogenen Angaben verschoben werden, nur für Kennwerte 
       (und Kennwertepaare?), eventuell auch für  Bezeichnungs- und Aufzählungswerte
       - Sie können dann (Anforderung!) unterschiedlich sein an unterschiedlichen Baueinheiten 
       - Operator ">" bedeutet, dass der wahre Wert größer als der als Wert eingetragene Wert ist
       - Das kann so für Soll- und Istwerte verwendet werden
       - Für Sollwerte sollte besser nur "=" zugelassen werden, sonst entstehen uneindeutige Vergleichssituationen
       - Der Operator sollte dabei vom Markdown-Feld in ein Enum-Feld umgewandelt werden ["<", "<=", "=", ">=", ">"] - dabei die Unicode-Zeichen einsetzen
       - ==**Status 01.03.2022:**==
         - **[DONE]** In den Mongoose Models und den Controller-Methoden wurde die Property bereits verschoben von typbezogenen nach wertbezogenen Baueigenschaften und obiges enum dafür verwendet!
         - ==**[TODO]**== Allerdings wäre es bei **Wertepaaren** sogar sinnvoll, einen **zweiten Operator** vorzusehen!
         - ==**[TODO]**== In den Masken, z.B. in "Baueigenschaften an der Baueinheit/am Baustoff" oder in Profilformularen wird diese Prop operator bisher nicht exposed
         - Ausnahme: In baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue wird das Feld operator am UI exposed und benutzt!
         - ==**[TODO]**== Wenn dieses auf Wertepaare erweitert wird, wird wahrscheinlich eine zweite Property operator2 benötigt!
515. **[DONE]** (Prio 2) Erweiterung der **"Schutzkategorien"** - diverse neue hinzunehmen und umbenennen in "bauliche Fachgebiete", "fachliche Disziplinen" oder
     besser **"fachliche Rubriken"** ("Zuordnung zu fachlichen Rubriken"), u.a.:
     - Recht
     - Geografie (eventuell "Baueinheit > Standort > Lage >" deshalb umbenannt in "Baueinheit > Standort > Geografie")
     - Infrastruktur (eventuell "Baueinheit > Standort > Erschließung >" deshalb umbenannt in "Baueinheit > Standort > Infrastruktur")
     - Geopolitik
     - Projektmanagement
     - Umwelt und Klima
     - Hydrogeologie
     - Geometrie
     - Konstruktion
     - Nutzungs- und Betriebszeiten
     - Beleuchtung
     - Raumklima
     - Lastannahmen ==(sollte eventuell umbenannt werden in "Nutzlasten"!)==
     - Materialeigenschaften (für Baustoffe, eventuell bringen diese noch weitere Kategorien mit sich, z.B. Preise, Gewicht, Größe, Farbe, etc.)
     - Baueigenschaftsprofile (für die die Profilaktivierung durch "steuernden" Aufzählungswert)
     - Bauinformationsprofile (für die die Profilaktivierung durch "steuernden" Aufzählungswert)
     - Weitere Kandidaten für zusätzliche Rubriken, bisher nicht implementiert: Architektur, Mechanik, Wirtschaft, Rechnungswesen, Blitzschutz, etc.
     - Siehe Hinweise im internen Design zur Erweiterung der fachlichen Rubriken mittels MongoDB Shell
516. ==**[TODO]**== (Prio 3) **Button "Wert trotz Vererbung eintragen"** bzw. **"Geerbten Wert überschreiben"** , um **unter Beachtung der Vererbungsregeln** an 
     einem Knoten im Baum einen anderen statt eines geerbten Werts für eine (definierte) Baueigenschaft einzutragen, der einen 
     vom Elternknoten geerbten Wert ggf. überschreibt: Dieser Button würde es z.B. erlauben, ererbte Werte situationsabhängig zu ändern. An allen Elternknoten im Pfad zu diesem Knoten muss wegen der Vererbungsregel dann "undefiniert" eingetragen werden. Geschwisterknoten würden dennoch ihre Werte behalten. Diese Logik ist bereits beim Setzen
     von Vorgabewerten bei der Aktivierung von Baueigenschaftsprofilen implementiert, d.h. eine Codevorlage dafür ist schon vorhanden.
     Bei Sollwerten würde allerdings so eventuell der originale Sollwert im Elternknoten verloren gehen, so dass neu angelegte Kindknoten dann keinen Sollwert erben würden.
     Daher müsste in solchen Fällen jeweils ein separate Baueigenschaft für den Soll- und den Istwert angelegt werden. Es würde dann mit diesem Button ggf. der
     Istwert geändert werden, der Sollwert bliebe erhalten. Wie diese Soll- und Istwerte dann verwaltet werden (externalisiert/verwaltbar per Konstrukt "Soll-/Istwertegruppe" oder zunächst lediglich über interne Layout Files, die eventuell später in der Datenbank verwaltet werden), ist ein separates Thema.
517. **[DONE]** (Prio 3) **Impressum** und **Datenschutz** (z.B. per Links rechts unten im Footer, Verzweigung auf neue Seiten)
518. **[DONE]** (Prio 3) **"Go Home"** Funktion durch Klick auf Image links oben in my-layout.vue
519. **[DONE]** (Prio 3) **Security**: Vor Produktionsbetrieb in der Benutzer-Registrierung enablen, dass nur K&F E-Mails registriert werden, 
     sicherheitshalber am Backend, in authentifizierung.controller.registerBenutzer(). Dort implementiert, allerdings aktuell noch nicht aktiv. Am 31.02.2021 aktiv geschaltet.
520. **[DONE]** (Prio 3) **Überarbeitung des Standort-Profilformulars** gemäß Word-Dokument von Erik. Enthält u.a. Umgruppierung von Tabs und Masken,
     sowie die Verwaltung von **Gemeindeschlüsseln** und **Regionalschlüsseln**
521. **[DONE]** (Prio 3) **Überarbeitung des Gebäude-Profilformulars** mit neuen Attributen (sind noch in Arbeit bei Erik).
522. ==**[TODO]**== (Prio 3) Neue Attribute für Profil **"Baueinheit > Bauvorhaben"** - diese sind im Tab "Bauprojekte" im Excel-Sheet für die Baueigenschaften/Profile
523. ==**[TODO]**== (Prio 3) **Kaskadierte Dropdown-QSelect-Felder** über den Input-Feldern für Bauinformations- und Baueigenschaftsbezeichnungen, um damit aktiv
     das jeweilige Bezeichnungsschema (mit ">" als Trennzeichen) für den Benutzer zu steuern (heute noch freie Handeingabe)
524. ==**[TODO]**== (Prio 3) User Story/Workflow für **Upload und Review von Nachhaltigkeitsnachweisen** (Personas: Admin (Edit) und externer Partner):
     1.	Edit meldet sich in BIM.click an
     2.	Sie bekommt unter „Verwaltung“ ein neues Tab „Partner zum Dokumenten-Upload einladen“ zur Verfügung  gestellt
     3.	Dort gibt sie die E-Mail-Adresse des externen „Baustoff-Partners“ ein und drückt dann einen Knopf „Mail mit Upload-Seiten-Link an den externen Partner 
          schicken“
     4.	Der Partner erhält dann eine von BIM.click generierte E-Mail mit einem 24 oder 48 Stunden gültigen Link – diesen Code gibt es schon für unsere 
          Benutzerregistrierung
     5.	Wenn der Partner also diesen Link in der Mail anklickt, wird er auf eine temporäre Upload-Seite von BIM.click geleitet (den Rest von BIM.click sieht 
          er nicht)
     6.	Dort kann er nach dem Schema von Edit die von ihm gewünschten Baustoffe bzw. Dokumente „klassifizieren“ (mehrstufiges Dropdown-Feld)
     7.	Pro Baustoff kann er dann mit dem in BIM.click schon vorhandenen Datei-Uploader eine Datei (PDF, XLS, etc.) hochladen
     8.	Die so hochgeladenen Dokumente speichern wir ganz ähnlich wie die heute schon bin BIM.click bekannten Bauinformationen, aber in einer speziellen 
          „Staging Area“, damit nichts durcheinanderkommt
     9.	Wenn der Partner dann mit seinem Uploads fertig ist, drückt er auf seiner Upload-Seite einen Button „Uploads fertig – zum Review melden“
     10.	Dann wird von BIM.click eine E-Mail an Edit verschickt mit einem Hinweis, dass ein Partner neue Dokumente hochgeladen hat
     11.	Edit sieht das und meldet sich in BIM.click an. Sie sieht in einem neuen Tab, wahrscheinlich auch unter „Verwaltung“ die hochgeladenen Dokumente – die 
          Maske dafür hätte ungefähr dasselbe Layout wie die heute schon vorhandenen Bauinformationen
     12.	Sie kann jedem Dokument eventuell noch einen Status geben („Geprüft“ o.ä.)
     13.	Je nach Ausbaustufe kann sie diese Dokumente dann auch zu offiziellen Bauinformationen in BIM.click machen und sie so Baustoffen in BIM.click zuordnen 
          – das wäre eine sehr schöne integrierte Lösung

     ==**Weitere Anmerkungen dazu (April 2021)**==:
     - Es handelt sich hier um eine Kombination von:
       - **baustoffbezogenen Baueigenschaften**, z.B. 
         - die Einstufung der mit Nachhaltigkeitsnachweisen zu versehenden Baustoffs nach dem 
           mehrstufigen Schema in der Excel-Datei "ENV1.2_Dokumentation_und_Leitfaden_Bauteile_V1.30" 
           - Die Spalten A bis E (Produktgruppe) müsste ein entsprechender mehrstufiger Aufzählungswert werden
             - Alternativ könnte man diese Einstufung auch im Baustoffbaum reflektieren (mit Erik zu diskutieren)
           - Die Spalten F bis M könnten ein weiterer mehrstufiger Aufzählungswert werden (Qualitätsstufe, QS1 bis QS4)
         - Die Herstellerbezeichnung könnte ein weiterer Bezeichnungswert sein
         - Die Bauteilbezeichnung könnte ein weiterer Bezeichnungswert sein - alternativ könnte dafür auch die reguläre
           BIM.click Baustoffbezeichnng verwendet werden, die aber nur eindeutig ist, wenn der Elternpfad des betreffenden
           Baustoffs als Suffix mit aufgenommen wird ("Baustoffe > Baustoffbezeichnung Ebene 1 > Baustoffbezeichnung Ebene 2 > ... > Baustoffbezeichnung Blattebene)
         - der Prüfungsstatus des betreffenden Baustoffs (könnte ebenfalls ein Aufzählungswert sein)
       - **diesen Baustoffen zugeordnete Bauinformationen** (die hochgeladenen Nachhaltigkeitsnachweise)
         - Dies könnten auch mehrere pro Baustoff sein, z.B. für jede Produktgruppe oder Qualitätstufe eine Bauinformation
     - Entsprechend müssen im Schritt 13:
       - Neue Baustoffe dafür angelegt werden bzw. bereits vorhandene Baustoffe selektiert werden
       - Diese Baustoffe müssen dann attributiert werden mit den dafür anzulegenden
         Baueigenschaften (z.B. über ein zu aktivierendes **Baueigenschaftsprofil "Nachhaltigkeit"** für Baustoffe mit entsprechendem **Baueigenschaftsprofilformular** - selber Mechanismus wie in "Baueinheiten")
       - Diesen Baustoffen können dann jeweils der/die zugehörigen Nachhaltigkeitsnachweise als **Bauinformationen zugeordnet** werden
     - Wenn die Nachhaltigkeitsnachweise als reguläre Bauinformationen verwaltet werden, müssen sie
       **eindeutige Bauinformationsbezeichnungen** erhalten
       - Dies könnte über ein spezielles **Bezeichnungsschema** erfolgen, z.B.
         "Nachweis > Nachhaltigkeit > >Produktgruppe< > >Herstellerbezeichnung< > >Bauteilbezeichnung<
         - Die >Produkgruppe< könnte dabei nach dem obigen mehrstufigen Schema gemäß den Spalten A bis E aufgebaut sein
         - Die >Herstellerbezeichnung< würde den Hersteller des Bauteils benennen
         - Die >Bauteilbezeichnung< würde das Bauteil benennen
       - Dabei könnte ein Vorschlag für eine solche Bezeichnungen vom System aus dem Kontext heraus erzeugt werden
         (alle dabei verwendeten Teilbezeichnungen sind als Baueigenschaften vorhanden und können mit dem genannten 
         Baueigenschaftsprofilformular eingegeben werden)
---

603. ==**[TODO]**== (Prio 3) **Bauelemente** zur Definition und Verwendung von wiederverwendbaren Bauteilen als Baueinheiten in Bauvorhaben - siehe folgender Abschnitt "Internes Design"
604. ==**[TODO]**== (Prio 3) **Erweiterung der Wertetypen um IFC simple property 'bounded value'** - siehe folgender Abschnitt "Internes Design"
605. ==**[WORK]**== (Prio 3) **(vertikale/horizontale) Reihenfolgebeziehungen in den Baumstrukturen** - siehe folgender Abschnitt "Internes Design" - wird teilweise gebraucht für Schichtaufbauten in #501
606. ==**[TODO]**== (Prio 3) Erweiterung der **Benutzerrollen** um **externe Partner** etc.
- Dies hängt mit dem Business Plan für interne Nutzung und potentielle externe Vermarktung zusammen
- ==**Stufe 0 - "BIM.click intern":** Lösung für K&F-interne Nutzung==
  - Architekten (downstream im übergreifenden Planungs-Workflow, Empfänger z.B. für aus BIM.click erzeugte Bauteilkataloge)
  - ==**Ausbaustufe:** Optional **geöffnet für externe Partner** = Andere Planer ohne eigenes Fachmodell==
    - Vermessungsingenieure (paralleler Fachplaner im übergreifenden Planungs-Workflow, bringt z.B. Gebäudeniveau ein als "externer Partner")
    - Geologen (paralleler Fachplaner im übergreifenden Planungs-Workflow, bringt z.B. Grundwasserstand ein als "externer Partner")
    - Brandschutzingenieure (paralleler Fachplaner im übergreifenden Planungs-Workflow, bringt z.B. bestimmte Brandschutzanforderungen ein als "externer Partner")
    - Nachhaltigkeits-Auditoren (könnenn z.B. Ökobilanzen und andere Audits nach DGNB/BNB auf Basis der in BIM.click geplanten Daten erstellen)
  - Andere Beteiligte, die auf jeden Fall eigene Fachmodelle haben:
    - Statiker (BIM.click-Modell beinhaltet nur einzelne Attribute daraus)
    - HLK-Planer
    - Küchenplaner
  - Hinweis: BIM.click enthält bisher nach DIN 276 nur Attribute der Baukostengruppe 300 (Bauwerk - Baukonstruktionen), nicht 400 (Bauwerk - Technische Anlagen)
    - https://de.wikipedia.org/wiki/Baukosten 
- ==**Stufe 1 - "BIM.click für Mandanten":** "Externe Nutzung, bei der andere Bauphysik-Büros als "Mandanten" BIM.click einsetzen==
  - Selbe Rollen wie oben
  - Allerdings stellt sich die Frage, welche Daten in der geöffneten Lösung stests gemeinsam wären, und welche spezifisch für einen Mandanten (z.B. Baustoffe, Bauinformationen)
- ==**Stufe 2- "BIM.click für andere Zielgruppen:"** "Weitere externe Nutzung, bei der andere Zielgruppen als Bauphysik-Büros als "Mandanten" BIM.click einsetzen==
  - Solche Zielgruppen könnten sein:
    - Nachhaltigkeits-Auditoren
    - Nachhaltigkeitsinstitutionen: DGNB/BNB
      - DGNB: Als "Bauteilkatalog"? Kontakt: Edit Varga/Dr. Anna Braune/Rene Traunspurger
    - Öffentliche Verwaltung
      - Behörde in Bayern: Erstellen ebenfalls "Raumprogramme" (Beispiel: LBD Ebern, Amt: Staatliches Bauamt Schweinfurt, Kontakt: Edit Varga, Herr Peters, IWB - Informationsstelle Wirtschaftliches Bauen)
      - Liegenschaftsverwaltungen: Verwalten Liegenschaftskataster
      - Stuttgart: Schadstofferfassung
607. ==**[TODO]**== (Prio 3) Erweiterung der **Bauinformationen** um Feld für **Lizenztyp** (Aufzählungswert - Optionen z.B. "public Domain", "durch K&F lizensiert", 
     "personenbezogen", etc.), eventuell dabei auch Einschränkung der Zugriffsrechte auf die Bauinformation in Abhängigkeit vom Lizenztyp
608. ==**[TODO]**== (Prio 3) Tracking und Anzeige der **Änderungshistorie** von BIM.click Objekten/MongoDB Dokumenten, d.h. welcher Autor welches Objekt zuletzt geändert hat (Nutzung von MongoDB-Funktionalitäten)
- Mongoose Timestamps: https://stackoverflow.com/questions/12669615/add-created-at-and-updated-at-fields-to-mongoose-schemas - bereits in benutzer.model.js implementiert
- Mongoose History Plugin: https://www.npmjs.com/package/mongoose-history-plugin 
609. **[DONE]** (Prio 3) Vorschlag: Umbenennung von "Schutzkategorien" in "Module" (Kommentar: Muss im Gesamtkontext der Terminologie entschieden werden, keine Schnellschüsse). Update 31.12.2020: Wurde am UI in "fachliche Rubriken" umbenannt, intern immer noch Schutzkategorien.
610. **[DONE]** (Prio 3) Vorschlag: Schutzkategorie "Sonstiges" in "Global" umbenennen (Kommentar: Muss im Gesamtkontext der Terminologie entschieden werden, keine 
  Schnellschüsse). Update 31.12.2020: Es wurden weitere Schutzkategorien/fachliche Rubriken angelegt, so dass "Sonstiges" nur noch selten benötigt wird. 
  "Sonstiges" hat aber nicht die Bedeutung "global", da alle Rubriken global gültig sind.
611. ==**[TODO]**== (Prio 3) **Filter für große q-selects** (z.B. Gemeinden) einbauen in Profilformularen
612. ==**[TODO]**== (Prio 3) **Validierungsprüfung, ob alle Felder ausgefüllt sind** (z.B. über mögliches 'Ohne Angabe'-Feld)  

613. ==**[WORK]**== (Prio 2) **Performance beim Speichern** - dies dauert z.B. im Profilformular "Standort" ca. 14 Sekunden. Der ca.
halbe Anteil
dabei ist der Refresh des Trees. Den Refresh eventuell selektiver machen (nur den aktuell bearbeiteten Zweig refreshen, früher geöffnete Zweige
schließen und nicht refreshen) - muss evaluiert werden. Wird mittlerweile als Issue #307 getrackt.
614. ==**[TODO]**== (Prio 3) **Neuer Wertetyp** für Baueigenschaften, in dessen Wertefeld (vermutlich SchemaType "mixed") ein beliebiges JSON-Objekt gespeichert werden kann.
  Als Workaround kann heute ein Bezeichnungswert (SchemaType String) dienen, in den ein JSON-Objekt per stringify gecasted wird.
  Mongoose erwartet Strings in bezeichnungswWert1 und bezeichnungsWert2, sonst gibt es Mongoose cast-Fehler beim Speichern!
  Das heutige Feld aufzaehlungsWert ist übrigens ein Array of Strings - interessant zu untersuchen, ob das optimal ist. 
  Quasar Radio Buttons erfordern z.B. einen einfachen String im Model, keinen Array - dies wird durch speziellen Code
  in allen Baueigenschaftsprofilformularen beim Laden und beim Zurückspeichern hin- und herkonvertiert.
  Außerdem gibt es noch speziellen Code für "steuernde" Aufzählungswerte im Profilformular "Standort", Funktion
  selectModelChangedAufzaehlungsWert(), sowie in anderen Profilformularen (wird nicht überall auch verwendet!).
615. ==**[TODO]**== (Prio 3) **Multi-Select** an Tabellen für Baueigenschaften, Baueigenschaftsprofilen, Bauinformationen, Bauinformationsprofilen, für Löschen und Aktivieren/Deaktivieren

==**Hinweis**==: Weitere, mehr generelle Design-Items und Themen sind in Form von sogenannten **Epics** nachfolgend in diesem Abschnitt "Internes Design" zu finden.

---
## <!-- Internes Design für BIM.click -->
#### Hinweise zur internen Design-Dokumentation für BIM.click

- ==**Alle Informationen in diesem Abschnitt der Dokumentation sind vertraulich zu behandeln!**==
- Dateiformat: **Markdown** (.md)
- Siehe https://quasarframework.github.io/quasar-ui-qmarkdown/examples
- Siehe https://shd101wyy.github.io/markdown-preview-enhanced/#/markdown-basics
- Zur Preview des Markdowns in Visual Studio Code: **VS Code Extension _Markdown Preview Enhanced_** installieren per Extensions: Marketplace
- ==Es folgen Beschreibungen (Epics) für ausstehende BIM.click User Stories/Line Items==

---

#### **[Epic 1]** **[DONE]** (Prio 2) Verschieben/Kopieren in den Bäumen

- Ist implementiert (verbleibende TODOs - siehe Projekt-Backlog)
- High Level Design
  - Frontend
    - Den zu verschiebenden/kopierenden Zweig im Baum bestimmen (z.B. per Kontextmenü "Zweig markieren für Verschieben/Kopieren")
    - Den Zielknoten bestimmen (z.B. per Kontextmenü "Markierten Zweig hierhe verschieben/kopieren")
    - Backendmethode aufrufen (z.B. per Put-API /baueinheiten/:id/Zweig)
  - Backend
    - Den Zweig rekursiv traversieren
      - Jeden Elternknoten saven mit Referenz auf parent (an der Wurzel des Quellunterbaums ist dies der neue Elternknoten)
      - Jeden Kindknoten saven mit Referenz auf parent
      - Attribute (Baueigenschaften etc.) dabei mit kopieren
      - Orignalen Zweig löschen, falls "Verschieben"
    - **[DONE]** Anschließend **Aktivierung und Wertevererbung für Baueigenschaften** durchführen (analog zum weiter unten beschriebenen Design für das Einfügen
      von Vorlagen für Baueinheiten)
  - Frontend
    - Den Baum neu aufbauen aus der Datenbank
    - Dafür 2 Alternativen implementiert für den Refresh des Baums nach dem Bewegen eines Zweigs:
    - ==[Aktuell enabled]== Alternative 1: refreshTreeBaueinheiten/Baustoffe()
      - Traversiert die bereits bisher lazy geladenen Knoten im bisherigen Baum und lädt diese rekursiv neu per readKindKnotenBaueinheit/Baustoff()
        (d.h. ohne Verwendung von lazyLoadHandlingTreeBaueinheiten/Baustoffe())
      - Baut so den verschachtelten Array nodesTreeBaueinheiten/Baustoffe rekursiv neu auf aus den Kindern, inklusive des für die Expansion wichtigen
        Flags lazy an jedem Knoten
      - Danach selektive Expansion von bestimmten Knoten per API setExpanded()
      - Siehe Testmatrix unten für diese Alternative 1
    - [Aktuell disabled] Alternative 2: loadRootNodeTreeBaueinheiten/Baustoffe()
      - Verwendet loadRootNodeTreeBaueinheiten/Baustoffe() zum Neuladen des Baums
      - Anschließende Expansion aller bisher expandierten Knoten per APIs getNodeByKey() und setExpanded()
      - Achtung: Diese Alternative 2 hat Timing Probleme - funktioniert nur mit Workarounds (Sleeps)

```
/*
Testmatrix für Alternative 1 (refreshTreeBaueinheiten())

Kopieren/   Bewegter Zweig     Neuer
Verschieben                    Elternknoten
            Expandiert/        Expandiert/         Expandiert impliziert, das er lazy loaded ist!
            Nicht expandiert   Nicht Expandiert    Wenn nicht vorher expandiert, ist er nicht lazy loaded!
            Blatt              Blatt
K/B         E/N/B              E/N/B               Resultat
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
K           E                  E                   Kopieren OK, neuer Elternknoten bleibt expandiert, kopierte Wurzel darunter nicht expandiert, Expandieren ok
K           E                  N                   Kopieren OK, neuer Elternknoten wird expandiert, kopierte Wurzel darunter nicht expandierbar! Refresh notwendig! ■■■■■■ FEHLER FIXED A ■■■■■■
K           E                  B                   Kopieren OK, neuer Elternknoten wird expandierte Verzweigung, kopierte Wurzel darunter nicht expandiert, Expandieren ok
K           N                  E                   Kopieren OK, neuer Elternknoten expandiert, kopierte Wurzel darunter nicht expandierbar! Refresh notwendig! ■■■■■■ FEHLER FIXED B ■■■■■■
K           N                  N                   Kopieren OK, neuer Elternknoten expandiert, kopierte Wurzel darunter nicht expandiert, Exapndieren ok
K           N                  B                   Kopieren OK, neuer Elternknoten wird expandierte Verzweigung, kopierte Wurzel darunter nicht expandiert, Expandieren ok
K           B                  E                   Kopieren OK, neuer Elternknoten bleibt expandiert, kopiertes Blatt darunter
K           B                  N                   Kopieren OK, neuer Elternknoten wird expandiert, kopiertes Blatt darunter
K           B                  B                   Kopieren OK, neuer Elternknoten wird expandierte Verzweigung, kopiertes Blatt darunter
V           E                  E                   Verschieben OK, neuer Elterknoten bleibt expandiert, verschobene Wurzel darunter nicht
                                                   expandierbar - Refresh notwendig, alter Elternknoten wird ggf. Blatt ■■■■■■ FEHLER FIXED B ■■■■■■
V           E                  N                   Verschieben OK, neuer Elternknoten wird expandiert, verschobene Wurzel nicht expandiert, Expandieren ok
                                                   Aber Meldung "Fehler in Antwort von Server" - Log zeigt ==Status 404== bei get Kinder für Wurzel zu bewegender
                                                   Zweig! Offenbar versucht der Code, die gelöschten Kinder zu lesen (per lazy Loading?) ■■■■■■ FEHLER FIXED C ■■■■■■
V           E                  B                   Verschieben OK, neuer Elternknoten wird Verzweigung und expandiert, verschobene Wurzel nicht expandiert, Expandieren OK
V           N                  E                   Verschieben OK, neuer Elternknoten bleibt expandiert, verschobene Wurzel darunter nicht expandierbar! Refresh notwendig! ■■■■■■ FEHLER FIXED B ■■■■■■
V           N                  N                   Verschieben OK, neuer Elternknoten wird expandiert, verschobene Wurzel darunter nicht expandiert, Expandieren OK
V           N                  B                   Verschieben OK, neuer Elternknoten wird expandierte Verzweigung, verschobene Wurzel darunter nicht expandiert, Expandieren OK
V           B                  E                   Verschieben OK, neuer Elternknoten bleibt expandierte Verzweigung, verschobenes Blatt darunter, nicht expandierbar - OK
V           B                  N                   Verschieben OK, neuer Elternknoten wird expandiert, verschobenes Blatt darunter, nicht expandierbar - OK
V           B                  B                   Verschieben OK, neuer Elternknoten wird expandierte Verzweigung, verschobenes Blatt darunter, nicht expandierbar - OK
                                                   Aber Meldung "Fehler in Antwort von Server" - Log zeigt ==Status 404== bei get Kinder für Wurzel zu bewegender
                                                   Zweig! Offenbar versucht der Code, die gelöschten Kinder zu lesen (per lazy Loading?) ■■■■■■ FEHLER FIXED C ■■■■■■
*/
```

- Fazit: Es treten in dieser Testmatrix zwei verschiedene Arten von Fehlern auf:
  1. Fehlerart 1 (4-mal): Der neue Wurzelknoten (egal ob kopiert oder verschoben) ist im Baum nicht expandierbar (d.h. er hat kein Dreieck für "Expandieren") - wahrscheinlich,
     weil er noch gar nicht in den Array nodesTreeBaueinheiten geladen ist - dieser muss also geladen werden. Im Debug-Output sieht man in den Fehlerfällen, dass an dem neuen,
     nicht expandierbaren Wurzelknoten das Feld lazy nicht vorhanden ist (z.B. da der bisherige Code diesen neu erzeugten Knoten noch gar nicht kennt). Der Node hat auch keine
     children, wie man im Debug-Output sieht.
  2. Fehlerart 2 (2-mal): Es wird nach dem Verschieben versucht, die Kinder der (alten) Wurzel des verschobenen Zweigs zu lesen - diese führt zu einem (nicht katastrophalen) 404
     Fehler - dies muss unterbunden werden. Stefan: Der try/catch-Block mit catch ohne throw einer neuen Exception sorgt dafür, dass in diesem Fall weitergemacht wird.
- Status der Fixes für diese Fehler:
  - Fehlerart 1:
    - In refreshTreeBaueinheiten() das Setzen des lazy-Flags ganz am Anfang von "false" auf "true" geändert - das bisherige Setzen auf "false" dort war laut Stefan schon immer
      ein Fehler!
    - Dies fixed den ersten Fall der ersten Fehlerart oben. Testfälle ohne Fehler durchgeführt, wo ein expandierter Zweig unter einen nicht expandierten Knoten
      kopiert wird - diesen gefixten Fall oben markiert mit ■■■■■■ FEHLER FIXED A ■■■■■■
    - Die übrigen Fehlerfälle von Fehlerart 1, z.B. wenn ein nicht expandierter Zweig unter einen expandierten Knoten kopiert oder verschoben wird, blieben einstweilen bestehen!
    - Die Fehlerart 1 liegt laut Stefan ansonsten daran, dass der Code den neu erzeugten Wurzelknoten des bewegten Zweig noch gar nicht kennt
    - Temporären Fix mit Sonderbehandlung des neuen Wurzelknotens des bewegten Zweig eingefügt in refreshTreeBaueinheiten() - ==lazy Flag dafür setzen - funktioniert - fixed die
      weiteren 3 Fehlerfälle von Fehlerart 1 - oben markiert mit ■■■■■■ FEHLER FIXED B ■■■■■■
  - Fehlerart 2:
    - Weiteren Fix eingebaut in refreshTreeBaueinheiten() - dieser unterdrückt die Rekursion für den alten, mittlerweile gelöschten Wurzelknoten eines verschobenen Zweigs -
      fixed die 2 Fälle von Fehlerart 2 - oben markiert mit ■■■■■■ FEHLER FIXED C ■■■■■■
    - Allerdings lösen die nach refreshTreeBaueinheiten() eingefügten setExpanded() für den neuen Elternknoten und den neuen Wurzelknoten des bewegten Zweigs, die nur mit
      Sleeps funktionieren, einen neuen Fehler für den Fall V/E/N oben aus - der neue Elternknoten des verschobenen Zweigs ist dann nicht expandierbar, Refresh notwendig!
      Dies wird wiederum verursacht, weil bei nicht ausreichender Sleep Time die setExpanded() schon ausgeführt werden, bevor refreshTreeBaueinheiten() vollständig beendet ist.
      ==Vorsichtshalber die Sleep Time für diese Calls auf 2000 ms gesetzt und den zweiten der beiden Calls einstweilen disabled! Damit verschwindet dieser neue
      Fehler dann, allerdings ist bei langsamen System diese Sleep Time immer noch nicht ausreichend, daher später auch den ersten der beiden Calls
      sicherheitshalber disabled.==
- Hinweise:

  - Es gab noch einen weiteren, unabhängigen ■■■■■■ FEHLER FIXED D ■■■■■■ in refreshTreeBaueinheiten(): Beim Löschen des letzten Kindknoten unter einem Elternknoten wurde der neue
    Baumknotentyp "Blatt" nach dem Aktualisieren nicht korrekt angezeigt - Refresh notwendig! Dies ist gefixed in Backlog Item #112.
  - In bewegeZweig() wurde, wie oben erwähnt, zusätzlich zum setExpanded() für den neuen Elternknoten des bewegten Zweigs auch ein setExpanded() für den neuen Wurzelknoten
    durchgeführt - dieser blieb allerdings in den ersten Codeständen noch ohne Effekt, wahrscheinlich ebenfalls weil dieser neue Knoten noch nicht bekannt waren ohne die weiteren
    mittlerweile vollzogenen Änderungen in refreshTreeBaueinheiten(). Im neuerem Code
    funktionierte dies auch nur manchmal, abhängig von der Sleep Time vor dem setExpanded(), daher den zweiten der beiden setExpanded() (für den neuen Wurzelknoten) einstweilen
    disabled, später auch den ersten einstweilen sicherheitshalber disabled.
  - Es kann auch zunächst ein Zweig **markiert** werden, aber dann dessen Pfad im Baum **kollabiert** werden, so dass die Markierung temporär nicht mehr sichtbar ist - die Markierung
    bleibt aber bestehen und auch das Kopieren/Verschieben ist möglich!

- Aktualisierte Testmatrix von Stefan für die Vererbung beim Kopieren/Verschieben in den Bäumen:
  - [Testmatrix für Vererbung beim Bewegen in den Bäumen](https://bimclickserver.herokuapp.com/xls/bim-click-testmatrix-fuer-vererbung-beim-bewegen-in-baeumen.xlsx "Testmatrix für die Vererbung beim Kopieren/Verschieben in den Bäumen")

```
/*
Testmatrix für die Vererbung beim Kopieren/Verschieben in den Bäumen
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Legende:
 A    = Aktiviert
¬A    = Deaktiviert
D1/D2 = Definiert mit Wert 1/2 (dann immer aktiviert)
¬D    = Undefiniert
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Settings:
Variante a): Zu bewegender Zweig setzt sich durch bei Vererbung (localStore.state.einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig === true, unterer Radio Button in Einstellungen)
Variante b): Elternpfad setzt sich durch bei Vererbung (localStore.state.einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig === false - das ist der Default, oberer Radio Button)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                         Ausgangszustand                                            Zielzustand
     Neuer Elternpfad        Zu bewegender Zweig
Großeltern-  Elternknoten  Wurzelknoten  Kindknoten       Großeltern-  Elternknoten  Wurzelknoten  Kindknoten    Kommentare                                                                                               Teststatus
  knoten                                                    knoten
(kann auch                               (kann auch
weiter oben im Pfad sein!)         weiter unten im Pfad sein!)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1.  A/¬D           A/¬D         A/¬D          A/¬D          A/¬D           A/¬D           A/¬D          A/¬D     Bleibt
2.  A/¬D           A/¬D         A/¬D          A/D2          A/¬D           A/¬D           A/¬D          A/D2     Bleibt                                                                                        24.07.20 a) [TEST OK]
                                                                                                                                                                                                               28.07.20 b) [TEST OK]
3.  A/¬D           A/¬D         A/¬D         ¬A/¬D          A/¬D           A/¬D           A/¬D         ¬A/¬D     Bleibt
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
4.  A/¬D           A/¬D         A/D2          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
5.  A/¬D           A/¬D         A/D2          A/D2          A/¬D           A/¬D           A/D2          A/D2     Bleibt
6.  A/¬D           A/¬D         A/D2         ¬A/¬D      a)  A/¬D           A/¬D           A/D2         ¬A/¬D     Bleibt                                                                                        24.07.20 a) [TEST OK]
                                                        b)  A/¬D           A/¬D           A/D2         ¬A/¬D     Bleibt (kein Konflikt, Werte im zu bewegenden Zweig können beibehalten werden)                24.07.20 b) [TEST OK]
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
7.  A/¬D           A/¬D        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
8.  A/¬D           A/¬D        ¬A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
9.  A/¬D           A/¬D        ¬A/¬D         ¬A/¬D          A/¬D           A/¬D          ¬A/¬D         ¬A/¬D     Bleibt
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
10. A/¬D           A/D1         A/¬D          A/¬D      a)  A/¬D           A/¬D           A/¬D          A/¬D     Elterknoten wird undefiniert                                                                  24.07.20 a) [TEST OK]
                                                        b)  A/¬D           A/D1           A/D1          A/D1     Zu bewegender Zweig wird definiert mit Wert am Elternknoten                                   24.07.20 b) [TEST OK]
11. A/¬D           A/D1         A/¬D          A/D2      a)  A/¬D           A/¬D           A/¬D          A/D2     Elterknoten wird undefiniert                                                                  24.07.20 a) [TEST OK]
                                                        b)  A/¬D           A/D1           A/D1          A/D1     Zu bewegender Zweig wird definiert mit Wert am Elternknoten                                   24.07.20 b) [TEST OK]
12. A/¬D           A/D1         A/¬D         ¬A/¬D      a)  A/¬D           A/¬D           A/¬D         ¬A/¬D     Elterknoten wird undefiniert                                                                  24.07.20 a) [TEST OK]
                                              FALSCH:   b)  A/¬D           A/D1           A/D1          A/D1     Zu bewegender Zweig wird definiert mit Wert am Elternknoten
                                              RICHTIG:  b)  A/¬D           A/D1           A/D1         ¬A/¬D     Zu bewegender Zweig wird definiert mit Wert am Elternknoten (nur an aktivierten Knoten)       24.07.20 b) [TEST OK]
                                                                                                                                                                                                 (Bauvorhaben) 31.07.20 a) [TEST OK]
                                                                                                                                                                                                   (Baustoffe) 31.07.20 a) [TEST OK]
                                                                                                                                                                                                 (Bauvorhaben) 31.07.20 a) [TEST OK]
                                                                                                                 Resultat FALSCH: A/¬D           A/¬D           A/¬D         ¬A/¬D                 (Baustoffe) 31.07.20 b) [TEST FAIL]
                                                                                                                 (Resultat von Fall b) ist Fall a) !!!)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
13. A/¬D           A/D1         A/D2          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
14. A/¬D           A/D1         A/D2          A/D2      a)  A/¬D           A/¬D           A/D2          A/D2     Elternknoten wird undefiniert                                                                 24.07.20 a) [TEST OK]
                                                        b)  A/¬D           A/D1           A/D1          A/D1     Zu bewegender Zweig wird definiert mit Wert am Elternknoten                                   24.07.20 b) [TEST OK]
15. A/¬D           A/D1         A/D2         ¬A/¬D      a)  A/¬D           A/¬D           A/D2         ¬A/¬D     Elternknoten wird undefiniert                                                                 24.07.20 a) [TEST OK]
                                                        b)  A/¬D           A/D1           A/D1         ¬A/¬D     Zu bewegender Zweig wird definiert mit Wert am Elternknoten                                   24.07.20 b) [TEST OK]
                                                                                                                                                                                                 (Bauvorhaben) 31.07.20 a) [TEST OK]
                                                                                                                                                                                                   (Baustoffe) 31.07.20 a) [TEST OK]
                                                                                                                                                                                                 (Bauvorhaben) 31.07.20 b) [TEST OK]
                                                                                                                 Resultat FALSCH: A/¬D           A/¬D           A/D2         ¬A¬D                  (Baustoffe) 31.07.20 b) [TEST FAIL]
                                                                                                                 (Resultat von Fall b) ist Fall a) !!!)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
16. A/¬D           A/D1        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
17. A/¬D           A/D1        ¬A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
18. A/¬D           A/D1        ¬A/¬D         ¬A/¬D          A/¬D           A/D1          ¬A/¬D         ¬A/¬D     Bleibt                                                                                        24.07.20 a) [TEST OK]
                                                                                                                                                                                                               24.07.20 b) [TEST OK]
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
19. A/¬D          ¬A/¬D         A/¬D          A/¬D          A/¬D           A/¬D           A/¬D          A/¬D     Elternknoten wird aktiviert
20. A/¬D          ¬A/¬D         A/¬D          A/D2          A/¬D           A/¬D           A/¬D          A/D2     Elternknoten wird aktiviert                                                                            a) [TEST OK]
                                                                                                                 Test Fail: Resultat ist A/¬D  ¬A/¬D  ¬A/¬D  ¬A/¬D                                             28.07.20 b) [TEST OK]
21. A/¬D          ¬A/¬D         A/¬D         ¬A/¬D          A/¬D           A/¬D           A/¬D         ¬A/¬D     Elternknoten wird aktiviert
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
22. A/¬D          ¬A/¬D         A/D2          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
23. A/¬D          ¬A/¬D         A/D2          A/D2          A/¬D           A/¬D           A/D2          A/D2     Elternknoten wird aktiviert                                                                   28.07.20 a) [TEST OK]
24. A/¬D          ¬A/¬D         A/D2         ¬A/¬D          A/¬D           A/¬D           A/D2         ¬A/¬D     Elternknoten wird aktiviert                                                                            a) [TEST OK]
                                                                                                                                                                                                               24.07.20 a) [TEST OK]
                                                                                                                 Test Fail: Resultat ist A/¬D  ¬A/¬D  ¬A/¬D  ¬A/¬D                                             28.07.20 b) [TEST OK]
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
25. A/¬D          ¬A/¬D        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
26. A/¬D          ¬A/¬D        ¬A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
27. A/¬D          ¬A/¬D        ¬A/¬D         ¬A/¬D          A/¬D          ¬A/¬D          ¬A/¬D         ¬A/¬D     Bleibt                                                                                        24.07.20 a) [TEST OK]
                                                                                                                                                                                                               24.07.20 b) [TEST OK]
=====================================================================================================================================================================================================================================
28. A/D1           A/¬D         A/¬D          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
29. A/D1           A/¬D         A/¬D          A/D2          Nicht erlaubt (Wertevererbungsregel)!
30. A/D1           A/¬D         A/¬D         ¬A/¬D          Nicht erlaubt (Wertevererbungsregel)!
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
31. A/D1           A/¬D         A/D2          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
32. A/D1           A/¬D         A/D2          A/D2          Nicht erlaubt (Wertevererbungsregel)!
33. A/D1           A/¬D         A/D2         ¬A/¬D          Nicht erlaubt (Wertevererbungsregel)!
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
34. A/D1           A/¬D        ¬A/¬D          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
35. A/D1           A/¬D        ¬A/¬D          A/D2          Nicht erlaubt (Wertevererbungsregel)!
36. A/D1           A/¬D        ¬A/¬D         ¬A/¬D          Nicht erlaubt (Wertevererbungsregel)!
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
37. A/D1           A/D1         A/¬D          A/¬D      a)  A/¬D           A/¬D           A/¬D          A/¬D     Elternpfad wird undefiniert                                                                   24.07.20 b) [TEST OK]
                                                        b)  A/D1           A/D1           A/D1          A/D1     Zu bewegender Zweig wird definiert mit Wert am Elternknoten                                   24.07.20 b) [TEST OK]
38. A/D1           A/D1         A/¬D          A/D2      a)  A/¬D           A/¬D           A/¬D          A/D2     Elterknoten wird undefiniert                                                                           a) [TEST OK]
                                                        b)  A/D1           A/D1           A/D1          A/D1     Zu bewegender Zweig wird definiert mit Wert am Elternknoten                                   24.07.20 b) [TEST OK]
39. A/D1           A/D1         A/¬D         ¬A/¬D      a)  A/¬D           A/¬D           A/¬D         ¬A/¬D     Elternpfad wird undefiniert                                                                            a) [TEST OK]
                                              FALSCH:   b)  A/D1           A/D1           A/D1          A/D1     Zu bewegender Zweig wird definiert mit Wert am Elternknoten
                                              RICHTIG:  b)  A/D1           A/D1           A/D1         ¬A/¬D     Zu bewegender Zweig wird definiert mit Wert am Elternknoten (nur an aktivierten Knoten)       24.07.20 b) [TEST OK]
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
40. A/D1           A/D1         A/D2          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
41. A/D1           A/D1         A/D2          A/D2      a)  A/¬D           A/¬D           A/D2          A/D2     Elternknoten wird undefiniert                                                                          a) [TEST OK]
                                                        b)  A/D1           A/D1           A/D1          A/D1     Zu bewegender Zweig wird definiert mit Wert am Elternknoten                                   24.07.20 b) [TEST OK]
42. A/D1           A/D1         A/D2         ¬A/¬D      a)  A/¬D           A/¬D           A/D2         ¬A/¬D     Elternknoten wird undefiniert                                                                 24.07.20 a) [TEST OK]
                                                        b)  A/D1           A/D1           A/D1         ¬A/¬D     Zu bewegender Zweig wird definiert mit Wert am Elternknoten                                   24.07.20 b) [TEST OK]
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
43. A/D1           A/D1         ¬A/¬D          A/¬D         Nicht erlaubt (Aktivierungsregel)!
44. A/D1           A/D1         ¬A/¬D          A/D2         Nicht erlaubt (Aktivierungsregel)!
45. A/D1           A/D1         ¬A/¬D         ¬A/¬D         A/D1           A/D1          ¬A/¬D         ¬A/¬D     Bleibt
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
46. A/D1          ¬A/¬D          A/¬D          A/¬D     a)  A/¬D           A/¬D           A/¬D          A/¬D     Am Elternpfad: Undefiniertmachen, falls definiert; aktivieren, wenn deaktiviert               24.07.20 a) [TEST OK]
                                                        b)  A/D1           A/D1           A/D1          A/D1     Alle Knoten im Pfad mit Wert aus definiertem Großelternknoten definieren
                                                                                                                 Test Fail: Resultat ist A/D1  ¬A/¬D  ¬A/¬D  ¬A/¬D b)                                          28.07.20 b) [TEST OK]
47. A/D1          ¬A/¬D          A/¬D          A/D2     a)  A/¬D           A/¬D           A/¬D          A/D2     Alle Knoten im Pfad bis zum definierten Kindknoten auf undefiniert setzen, aktivieren, wenn deaktiviert
                                                                                                                                                                                                               24.07.20 a) [TEST OK]
                                                        b)  A/D1           A/D1           A/D1          A/D1     Alle Knoten im Pfad mit Wert aus definiertem Großelternknoten definieren
                                                                                                                 Test Fail: Resultat ist A/D1  ¬A/¬D  ¬A/¬D  ¬A/¬D                                             28.07.20 b) [TEST OK]
48. A/D1          ¬A/¬D          A/¬D         ¬A/¬D     a)  A/¬D           A/¬D           A/¬D         ¬A/¬D     Alle Knoten im Pfad bis zum deaktivierten Kindknoten auf undefiniert setzen; aktivieren, wenn deaktiviert
                                                                                                                 Test Fail: Großelternknoten ist noch A/D1 statt A/¬D, Elternknoten ist noch ¬A/¬D statt A/¬D  14.07.20 a) [TEST FAIL]
                                                                                                                 Test Fail: Großelternknoten ist OK (A/¬D), Elterknoten ist A/D1 statt A/¬D!                   15.07.20 a) [TEST FAIL]
                                                                                                                                                                                                               21.07.20 a) [TEST OK]
                                                                                                                                                                                                               24.07.20 a) [TEST OK]
                                                        b)  A/D1           A/D1           A/D1         ¬A/¬D     Alle Knoten im Pfad mit Wert aus definiertem Großelternknoten definieren bis zum deaktivierten Kindknoten
                                                                                                                 im bewegten Zweig; im Pfad darüber aktivieren, wenn deaktiviert
                                                                                                                 Test Fail: Resultat ist A/D1  ¬A/¬D  ¬A/¬D  ¬A/¬D                                             28.07.20 b) [TEST OK]

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
49. A/D1          ¬A/¬D          A/D2          A/¬D         Nicht erlaubt (Wertevererbungsregel)!
50. A/D1          ¬A/¬D          A/D2          A/D2     a)  A/¬D           A/¬D           A/D2          A/D2     Alle Knoten im Pfad über dem definierten Wurzelknoten des bewegten Zweigs auf undefiniert
                                                                                                                 setzen; aktivieren, wenn deaktiviert                                                          24.07.20 a) [TEST OK]
                                                                                                                 Test Fail: Resultat ist A/D1  ¬A/¬D  ¬A/¬D  ¬A/¬D                                             28.07.20 b) [TEST OK]
                                                        b)  A/D1           A/D1           A/D1          A/D1     Alle Knoten im Pfad mit Wert aus definiertem Großelternknoten definieren
51. A/D1          ¬A/¬D          A/D2         ¬A/¬D     a)  A/¬D           A/¬D           A/D2         ¬A/¬D     Alle Knoten im Pfad über dem definierten Wurzelknoten des bewegten Zweigs auf undefiniert setzen;
                                                                                                                 aktivieren, wenn deaktiviert                                                                  24.07.20 a) [TEST OK]
                                                        b)  A/D1           A/D1           A/D1         ¬A/¬D     Alle Knoten im Pfad mit Wert aus definiertem Großelternknoten definieren bis zum deaktivierten Kindknoten
                                                                                                                 im bewegten Zweig; im Pfad darüber aktivieren, wenn deaktiviert
                                                                                                                 Test Fail: Resultat ist A/D1  ¬A/¬D  ¬A/¬D  ¬A/¬D                                             28.07.20 b) [TEST OK]

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
52. A/D1          ¬A/¬D         ¬A/¬D          A/¬D         Nicht erlaubt (Aktivierungsregel)!
53. A/D1          ¬A/¬D         ¬A/¬D          A/D2         Nicht erlaubt (Aktivierungsregel)!
54. A/D1          ¬A/¬D         ¬A/¬D         ¬A/¬D         A/D1          ¬A/¬D          ¬A/¬D         ¬A/¬D     Bleibt
======================================================================================================================================================================================================================================
55.¬A/¬D           A/¬D          A/¬D          A/¬D         Nicht erlaubt (Aktivierungsregel)!
56.¬A/¬D           A/¬D          A/¬D          A/D2         Nicht erlaubt (Aktivierungsregel)!
57.¬A/¬D           A/¬D          A/¬D         ¬A/¬D         Nicht erlaubt (Aktivierungsregel)!
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
58.¬A/¬D           A/¬D          A/D2          A/¬D         Nicht erlaubt (Aktivierungsregel)!
59.¬A/¬D           A/¬D          A/D2          A/D2         Nicht erlaubt (Aktivierungsregel)!
60.¬A/¬D           A/¬D          A/D2         ¬A/¬D         Nicht erlaubt (Aktivierungsregel)!
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
61.¬A/¬D           A/¬D         ¬A/¬D          A/¬D         Nicht erlaubt (Aktivierungsregel)!
62.¬A/¬D           A/¬D         ¬A/¬D          A/D2         Nicht erlaubt (Aktivierungsregel)!
63.¬A/¬D           A/¬D         ¬A/¬D         ¬A/¬D         Nicht erlaubt (Aktivierungsregel)!
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
64.¬A/¬D           A/D1          A/¬D          A/¬D         Nicht erlaubt (Aktivierungsregel)!
65.¬A/¬D           A/D1          A/¬D          A/D2         Nicht erlaubt (Aktivierungsregel)!
66.¬A/¬D           A/D1          A/¬D         ¬A/¬D         Nicht erlaubt (Aktivierungsregel)!
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
67.¬A/¬D           A/D1          A/D2          A/¬D         Nicht erlaubt (Aktivierungsregel)!
68.¬A/¬D           A/D1          A/D2          A/D2         Nicht erlaubt (Aktivierungsregel)!
69.¬A/¬D           A/D1          A/D2         ¬A/¬D         Nicht erlaubt (Aktivierungsregel)!
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
70.¬A/¬D           A/D1         ¬A/¬D          A/¬D         Nicht erlaubt (Aktivierungsregel)!
71.¬A/¬D           A/D1         ¬A/¬D          A/D2         Nicht erlaubt (Aktivierungsregel)!
72.¬A/¬D           A/D1         ¬A/¬D         ¬A/¬D         Nicht erlaubt (Aktivierungsregel)!
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
73.¬A/¬D          ¬A/¬D          A/¬D          A/¬D         A/¬D           A/¬D          A/¬D          A/¬D      Am Elternpfad: Aktivieren, wenn deaktiviert                                                     24.07.20 a) [TEST OK]
74.¬A/¬D          ¬A/¬D          A/¬D          A/D2         A/¬D           A/¬D          A/¬D          A/D2      Alle Knoten im Pfad aktivieren, wenn deaktiviert                                                24.07.20 a) [TEST OK]
                                                                                                                 Test Fail: Resultat ist ¬A/¬D  ¬A/¬D  ¬A/¬D  ¬A/¬D                                              28.07.20 b) [TEST OK]
75.¬A/¬D          ¬A/¬D          A/¬D         ¬A/¬D         A/¬D           A/¬D          A/¬D         ¬A/¬D      Alle Knoten im Pfad aktivieren bis zum deaktivierten Kindknoten, wenn deaktiviert               28.07.20 a) [TEST OK]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
76.¬A/¬D          ¬A/¬D          A/D2          A/¬D         Nicht erlaubt (Aktivierungsregel)!
77.¬A/¬D          ¬A/¬D          A/D2          A/D2         A/¬D           A/¬D          A/D2          A/D2      Alle Knoten im Pfad aktivieren, zu bewegender Zweig bleibt                                      24.07.20 a) [TEST OK]
                                                                                                                 Test Fail: Resultat ist ¬A/¬D  ¬A/¬D  ¬A/¬D  ¬A/¬D                                              28.07.20 b) [TEST OK]
78.¬A/¬D          ¬A/¬D          A/D2         ¬A/¬D         A/¬D           A/¬D          A/D2         ¬A/¬D      Alle Knoten im Pfad aktivieren, zu bewegender Zweig bleibt                                      24.07.20 a) [TEST OK]

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
79.¬A/¬D          ¬A/¬D         ¬A/¬D          A/¬D         Nicht erlaubt (Aktivierungsregel)!
80.¬A/¬D          ¬A/¬D         ¬A/¬D          A/D2         Nicht erlaubt (Aktivierungsregel)!
81.¬A/¬D          ¬A/¬D         ¬A/¬D         ¬A/¬D        ¬A/¬D          ¬A/¬D         ¬A/¬D         ¬A/¬D      Bleibt
*/
```

---

#### **[Epic 2]** **[DONE]** (Prio 2) Vorgabewerte für Baueigenschaften

- Baueigenschaften, die in Baueigenschaftsprofilen verwendet werden, bringen **Vorgabewerte** mit
- Diese werden nach Aktivierung einer solchen Baueigenschaft an einer Baueinheit wie normale Werte weitervererbt
- Weiteres dazu unter **"Baueigenschaftsprofile"** im Epic 3

---

#### **[Epic 3]** **[DONE]** (Prio 1) Baueigenschaftsprofile bzw. Nutzungsprofile

- **Baueigenschaftsprofile** sind "Eigenschaftsleisten", d.h. Mengen/Gruppen von Baueigenschaften, die z.B. zur gemeinsamen Zuweisung eines ganzen Satzes von Baueigenschaften (Attributen) auf Basis einer Norm (z.B. ein Raumprogramme nach DIN
  18599. an eine Baueinheit als **"Nutzungsprofil"** verwendet werden können.
- Man kann dasselbe Konzept auch zur gemeinsamen Zuweisung eines Satzes von Baueigenschaften an Baustoffe verwenden
- **[DONE]** Baueigenschaften werden mit der Einführung solcher Baueigenschaftsprofile zu First Class Citizens mit einem eigenen Q-Route-Tab **"Baueigenschaften"** im Hauptmenü erhoben. Dieses hat als Untertabs:
  - (Default-Tab) Erstes Unter-Tab **"Übersicht aller Baueigenschaften** (im System)
    - Dieses ist weitgehend identisch zum heutigen Tab "Übersicht aller Baueigenschaften" unter "Baueigenschaften" in Baustoffen und Baueinheiten
    - Es zeigt eine Tabelle aller im System definierten Baueigenschaften an
    - Allerdings fehlt die Spalte "Aktivierungszustand", da Baueigenschaften nur an ausgewählten Baustoffen oder Baueinheiten aktiviert werden können
    - Die wertebezogenen Spalten können ebenfalls weggelassen werden
    - Genau genommen könnte man stattdessen eine Liste der Baustoffe/Baueinheiten anzeigen, an denen eine Baueigenschaft aktiviert ist
    - (Alternativ - siehe unten: Per Multi-Select von Baueigenschaften in dieser Tabelle in Verbindung mit einem Button "Neues Baueigenschaftsprofil
      anlegen" könnte man Baueigenschaften eine neuen
      Baueigenschaftsprofil zuordnen)
  - Zweites Unter-Tab **'Beschreibung für ausgewählte Baueigenschaft'**
    - Dort selbe Funktionalität wie schon unter Baueigenschaften in Baustoffen/Baueinheiten
  - Drittes Unter-Tab **'Details zur ausgewählten Baueigenschaft'**
    - Weitgehend selbe Funktionalität wie schon unter Baueigenschaften in Baustoffen/Baueinheiten
    - Dort dürfen allerdings _nur die typbezogenen Felder_ einer ausgewählten Baueigenschaft bearbeitet werden können (keine Wertebearbeitung)!
    - Vorgabewerte für eine ausgewählte Bueigenschaft sollten dort ebenfalls nicht verwaltet werden, da diese (siehe unten) spezifisch für eine Baueigenschaft in einem Baueigenschaftsprofil sein sollten!
  - Viertes Unter-Tab **'Neuanlage einer Baueigenschaft'**
    - Weitgehend selbe Funktionalität wie schon unter Baueigenschaften in Baustoffen/Baueinheiten
    - Dort dürfen allerdings _nur die typbezogenen Felder_ einer ausgewählten Baueigenschaft bearbeitet werden können (keine Wertebearbeitung)
    - Vorgabewerte für eine neue Bueigenschaft sollten dort ebenfalls nicht verwaltet werden, da diese (siehe unten) spezifisch für eine
      Baueigenschaft in einem Baueigenschaftsprofil sein sollten!
- **[DONE]** **'Baueigenschaftsprofile'** bekommen ebenfalls ein eigenes QRouteTab im Hauptmenü (falls sie unter Baueigenschaften eingeordnet würden, wird die
  Tab-Tiefe insgesamt zu hoch). Unter diesem Tab "Baueigenschaftsprofile" gibt es dann folgende Unter-Tabs:
  - (Default-Tab) Erstes Unter-Tab **"Übersicht aller Baueigenschaftsprofile'** (im System)
    - Dort die Tabelle aller Baueigenschaftsprofile anzeigen
    - Auswahlspalte zur Auswahl eines Baueigenschaftsprofil
    - Unter der Tabelle Buttons für Erzeugen/Bearbeiten/Löschen/Neu anlegen von Baueigenschaftsprofilen
  - NEU: Nach neuem Design von Stefan folgen 2 weitere Unter-Tabs:
  - Zweites Unter-Tab **"Bearbeitung des ausgewählten Baueigenschaftsprofils**
  - Drittes Unter-Tab **"Neuanlage eines Baueigenschaftsprofils**
    - Zur Erzeugung eines neuen Baueigenschaftsprofils
    - (Prio 3 - **[DEFER]**) Alternative Erzeugung eines neuen Baueigenschaftsprofils als Erweiterung in der Übersicht der heutigen Baueigenschaften
      - Multi-Select erlauben in der Tabelle der Baueigenschaften
      - Button "Baueigenschaftsprofil erzeugen" (für die selektierten Baueigenschaften)
      - Button erlaubt die Eingabe einer Bezeichnung für das Baueigenschaftsprofil
  - Diese haben wiederum folgende gemeinsame Unter-Unter-Tabs, die sowohl für ein ausgewähltes als auch für ein neues Baueigenschaftsprofil verwendet werden:
    - Erstes Unter-Unter-Tab **"Details für Baueigenschaftsprofil"**
      - Zur Bearbeitung eines im Tab "Übersicht" ausgewählten Baueigenschaftsprofils bzw. eines neuen Baueigenschaftsprofils, per QForm
      - Bezeichnungsfeld - die Bezeichnung für ein Baueigenschaftsprofil muss eindeutig im System sein (so wie bei den Baueigenschaften)
      - Bemerkungsfeld
      - Zugeordnete Bauinformation (QSelect-Feld)
      - Buttons "Speichern"/"Zurücksetzen"
    - Zweites Unter-Unter-Tab **"Beschreibung für Baueigenschaftsprofil**
      - Dort Funktionalität zum Editieren einer Markdown-Beschreibung für die im ersten Unter-Tab ausgewählte Baueigenschaftsprofil
    - Drittes Unter-Unter-Tab **"Zugeordnete Baueigenschaften am Baueigenschaftsprofil** (des im Tab "Übersicht aller Baueigenschaftsprofile" ausgewählten
      Baueigenschaftsprofils)
      - ==**[Selektiert]**== <u>Variante 1:</u> Tabelle aller für das ausgewählte Baueigenschaftsprofil zugeordneten (ausgewählten) Baueigenschaften
        - Hinweis: In dieser Tabelle werden dann nicht alle Baueigenschaften angezeigt, sondern nur die zugeordneten, die zu dem ausgewählten  
          Baueigenschaftsprofil gehören
        - Unter der Tabelle ein QSelect zur Auswahl/Abwahl von zugeordneten Baueigenschaften, analog wie bisher im Tab "Zugeordnete Bauinformationen"
          für Baustoffe/Baueinheiten
        - Hinweis: Zunächst diese Variante 1 implementieren!
      - ==**[Deselektiert]**== <u>Variante 2:</u> Alternativ könnte man hier auch eine Tabelle _aller_ Baueigenschaften anzeigen und per Multi-Select diejenigen auswählen, die
        dem ausgewählten Baueigenschaftsprofilzugeordnet sind
        - Dies könnte per Checkbox in einer dedizierten Spalte erfolgen, die ähnlich zu der Spalte "Aktiviert" in der Tabelle der Baueigenschaften in
          Baustoffe/Baueinheiten) funktioniert, nur dass sie Multi-Select unterstützen muss, d.h. per An-/Abwahl die Bestimmung der Baueigenschaften,
          die dem ausgewählten Baueigenschaftsprofil zugeordnet sind. Ein Button "Zugeordnete Baueigenschaften speichern" würde die jeweils in dieser
          Spalte angekreuzten Baueigenschaften als zugeordnet für das ausgewählte Baueigenschaftsprofil speichern.
        - In dieser Variante 2 könnte das QSelect unter der Tabelle entfallen
      - Hinweis: Die Auswahl zugeordneter Bauinformationen für eine Baustoff/Baueinheit könnte ebenfalls auf die Variante 2 umgestellt werden
        - Allerdings ist es aus Konsistenzgründen sinnvoll, erst einmal alle solchen Tabs mit Variante 1 zu realisieren
    - Viertes Unter-Unter-Tab **"Vorgabewerte für ausgewählte Baueigenschaft am Baueigenschaftsprofil"**
      - ==**Zusatzanforderung**==: Es sollten sogenannte **"Vorgabewerte"** als Default-Werte festlegbar sein für eine zugeordnete Baueigenschaft in
        einem Baueigenschaftsprofil
      - Hinweis: Werte sind bisher nur unterstützt für Baueigenschaften an Baustoffen oder Baueinheiten. nicht an Baueigenschaften an
        Baueigenschaftsprofilen
      - Diese in Baueigenschaftsprofilen definierten Vorgabewerte einer im obigen Unter-Unter-Tab "Zugeordnete Baueigenschaften am
        Baueigenschaftsprofil" ausgewählten Baueigenschaft müssen spezifisch für ein Baueigenschaftsprofil sein!
      - Deshalb müssen sie in Feldern, die auf der Relation zwischen einem Baueigenschaftsprofil und einer Baueigenschaft definiert sind, verwaltet
        werden!
      - Es sind dann wie bei den wertbezogenen Angaben einer Baueigenschaft an einer Baueinheit Felder, die erweiterte wertbezogene Angaben/
        Felder der Baueigenschaft an einem Baueigenschaftsprofil sind!!!
      - Dieses weitere Unter-Unter-Tab zur Definition dieser Vorgabewerte muss dann ähnlich arbeiten wie das Tab "Ausgewählte Baueigenschaft bearbeiten"
        an einer Baueinheit oder an einem Baustoff
      - Es muss erlauben, die Vorgabewerte für eine zugeordnete/ausgewählte Baueigenschaft in einem Baueigenschaftsprofil zu bearbeiten
      - Bei Auswahl einer zugeordneten Baueigenschaft im Tab **"Übersicht der zugeordneten Baueigenschaften"** muss dieses Unter-Unter-Tab
        es dann erlauben, die Vorgabewerte zu setzen für
        die Baueigenschaft in dem Baueigenschaftsprofil, die ähnlich/gleich wie wertbezogene Angaben in Baueigenschaften an Baustoffen/Baueinheiten an
        der Baueigenschaft im Baueigenschaftsprofil abgespeichert werden
      - Es kann daher optisch sehr ähnlich aufgebaut werden wie das Tab "Details zur ausgewählten Baueigenschaft" - es könnte links auch erlauben, die
        typbezogenen Angaben zur Baueigensschaft zu editieren, rechts die Vorgabewerte

---

#### **[Epic 4]** **[DONE]** (Prio 2) [Backlog Item #134] Aktivieren/Deaktivieren von Baueigenschaftsprofilen an Baueinheiten bzw. Baustoffen

- Dabei werden, ausgelöst durch ein Kontextmenü bzw. einen Button auf der/dem ausgewählten Beinheit bzw. Baustoff alle diesem Baueigenschaftsprofil zugeordneten Baueigenschaften gemeinsam aktiviert, gemäß den unten beschriebenen Regeln
- Terminologie dafür:
  - ==**Aktivieren/Deaktivieren** eines Baueigenschaftsprofils an einer Baueinheit/einem Baustoff== (selektiert, analog zur Terminologie für Baueigenschaften)
  - **(Koppeln/Entkoppeln** eines Baueigenschaftsprofils mit/von einer Baueinheit/einem Baustoff) (deselektiert)
- Neues Unter-Tab **"Baueigenschaftsprofile"** unter **"Baueinheiten"** und unter **"Baustoffen"**
  - ==**[Selektiert]**== Dieses zeigt per Default entweder die Tabelle **aller** Baueigenschaftsprofile an, wobei die am ausgewählten Knoten **aktivierten** Profile eine
    Checkbox-Spalte "aktiviert" (analog zu den Tabellen in "Übersicht aller Baueigenschaften") haben.
    - Das **Aktivieren/Deaktivieren** eines Profils kann dann durch (Selection "single" auf der Tabelle) Auswahl eines Profils (Standard-Checkbox
      in der ersten Spalte) sowie Buttons für "Aktivieren" bzw. "Deaktivieren" bzw. ein Kontextmenü an der Zeile für ein Profil erfolgen
    - Das Default-Unter-Tab dafür sollte in dieser Variante ==**"Übersicht aller Baueigenschaftsprofile"**== heißen
    - Es können dann die bereits vorhandenen Tabs unter dem Hauptmenü "Baueigenschaftsprofile" ("Übersicht aller Baueigenschaftsprofile"/"Details zum ausgewählten
      Baueigenschaftsprofil"/"Neuanlage eines Baueigenschaftsprofils") aus der Komponente baueigenschaftsprofile.vuenochmals unter diesem Tab "Baueigenschaftsprofile" platziert werden, mit nur
      geringfügigen Erweiterungen im Tab "Übersicht" (Spalte für den Aktivierungszustand des Profils, Kontextmenüs/Buttons für Aktivieren/Deaktivieren eines ausgewählten Profils am ausgewählten
      Baustoff bzw. der ausgewählten Baueinheit)
    - Wenn das Tab "Details zum ausgewählten Baueigenschaftsprofil" ausgewählt wird, muss eine weitere (in diesem Fall dritte) Unter-Tab-Leiste angezeigt werden
      ("Details"/"Beschreibung"/"Zugeordnete Baueigenschaften"/"Vorgabewerte") wie schon in baueigenschaftsprofile.vue
    - ==**Hinweis**==: In "Baueinheiten" haben Benutzer mit Benutzerrolle "Mitarbeiter" keine Berechtigung, Änderungen an Baueigenschaftsprofilen durchzuführen - diese dürfen sie nur
      anzeigen, nicht ändern! Es handelt sich dabei um dieselben :disables für Benutzerberechtigungen, die schon im Hauptmenü "Baueigenschaftsprofile" implementiert sind
  - ==**[Deselektiert]**== Alternativ zeigt es (analog zu "Zugeordnete Bauinformationen") eine Tabelle aller für die ausgewählte Baueinheit/den ausgewählten Baustoff **aktivierten** Baueigenschaftsprofile an
    - n:m-Beziehung zwischen Baueinheiten/Baustoffen und Baueigenschaftsprofilen
    - Verwaltung analog zu zugeordneten Bauinformationen an Baueinheiten/Baustoffen
    - Allerdings ist die Unterscheidung zwischen "zugeordneten" und "aktivierten" Baueigenschaftsprofilen schwer verständlich und eigentlich auch nicht notwendig
    - Das Tab müsste in dieser Variante also eigentlich besser **"Aktivierte Baueigenschaftsprofile"** heißen
    - Dabei entweder Auswahl von zu aktivierenden/zu deaktivierenden Baueigenschaftsprofilen über ein QSelect mit q-chips (wie bei "Zugeordnete
      Bauinformationen") unter der Tabelle
      - Da bei Aktivierung/Deaktivierung eines Profils komplexe Aktionen (siehe unten) ablaufen, muss wahrscheinlich
        die Anwahl/Abwahl von zusätzlichen Profilen beschränkt werden auf ein einzelnes Profil - QSelect mit Q-Chips erlaubt es dagegen, beliebig
        viele Profile zu entfernen und hinzuzufügen
    - Deshalb müsste in diesem Fall das Hinzufügen bzw. Abwählen besser über ein **Q-Select mit Dropdown-Menü** erfolgen, das (zum Hinzufügen)
      alle nicht bereits ausgewählten Profile zeigt, bzw. (zum Entfernen) alle bereits ausgewählten, und das nur die Auswahl genau eines Profils
      erlaubt (Selection "single")
- **[DONE]** ==**Aktionen** auf Baueigenschaftsprofilen==
  - **[DONE]** (Prio 2) Bei **Aktivierung** eines Baueigenschaftsprofils an einer Baueinheit oder einem Baustoff
    - Dies müsste in einer ersten Implementierungsstufe ein Button "Baueigenschaftsprofil aktivieren" im obigen Tab **"Baueigenschaftsprofile"** unter **"Baueinheiten"** und unter **"Baustoffen"** werden
      (bzw. ein Kontextmenü), welcher es erlaubt, eine ausgewähltes Baueigenschaftsprofil zu aktivieren am ausgewählten Baustoff/der ausgewählten Baueinheit
    - Dabei **alle dem Baueigenschaftsprofil zugehörigen Baueigenschaften aktivieren** an der Baueinheit bzw. dem Baustoff ==(nur dort, nicht an direkten und indirekten Kindknoten - selbe Logik wie beim
      Aktivieren von einzelnen Baueigenschaften)==
    - Die an der Relation zwischen Baueigenschaft und Baueigenschaftsprofil eventuell definierten **Vorgabewerte** der Baueigenschaft als Werte
      eintragen und ggf. weitervererben ==an bereits aktivierte, aber undefinierte== Kinder und Kindeskinder
    - Verhalten, wenn im Profil enthaltene Baueigenschaften bereits am betreffenden Knoten oder weiter oben im Pfad zwischen Wurzelknoten und dem
      betreffenden Knoten **aktiviert** sind:
      - Wenn an allen Knoten im Pfad die Baueigenschaft **undefinierte** Werte hat: Die Knoten im Pfad belassen, am betreffenden Knoten die **Vorgabewerte übernehmen** aus dem Baueigenschaftsprofil
        - In diesem Fall muss zusätzlich eine **Vererbung der Vorgabewerte an eventuell bereits ==aktivierte== direkte und indirekte Kindknoten** durchgeführt werden
          - Diese können ebenfalls undefiniert sein (Zeile 1 in der Testmatrix unten mit "A/¬D" in der Spalte "Kindknoten")
          - Sie können aber auch bereits vorhandene definierte Werte aufweisen können (Zeile 2 in der Testmatrix unten mit "A/D2" in der Spalte "Kindknoten")
      - Andernfalls, wenn im Pfad zwischen Wurzelknoten und dem Knoten, an dem das Baueigenschaftsprofil aktiviert wird, bereits
        **Werte definiert** im Pfad aufwärts zwischen dem Zielknoten, d.h. dem Knoten, an dem das Baueigenschaftsprofil aktiviert werden soll, und dem Wurzelknoten:
        - ==**[Implementiert] (Prio 2) [Grundstufe]**==
          - Es wurde von Stefan ein Algorithmus implementiert, der bei Konflikten ggf. vorhandene definierte Werte zwischen dem Zielknoten und dem Wurzelknoten
            **undefiniert** macht, und ab dem Zielknoten abwärts die **Vorgabewerte durchsetzt**
          - ==**Achtung**==: Dies galt mit Ausnahme der Fälle 5 und 6 in der Testmatrix, die gefixed werden mussten (TODO #134)
          - Eventuell vorher definierte Werte im Pfad aufwärts zwischen dem Zielknoten und dem Wurzelknoten werden dabei undefiniert gemacht, um die
            Vererbungsregel einzuhalten
          - Dieser Algorithmus hat den Vorteil, dass er bei der geplanten Aktivierung von Baueigenchaften aus z.B. vom Anwender per QSelect anwählbaren
            Baueigenschaftsprofilen in Baueigenschaftsprofilformularen es ermöglicht, dass neue Vorgabewerte eventuell bereits definierte Vorgabewerte überschreiben
          - Die genaue Logik ist in der Testmatrix unten dokumentiert
        - ==**[Deselektiert] (Prio 2) [Grundstufe]**==
          - ==**Hinweis**==: Diese Variante ist im Backend in baueigenschafts-profile-aktivierungslogik.js durch einen Schalter bereits unterstützt,
            (vorgabewerteUeberschreibenVorhandeneWerte === false, Default ist true, was obigem Fall entspricht), sonst aber noch nicht exposed!
          - Die Baueigenschaft an allen Knoten im Pfad aufwärts ab dem zu aktivierenden Knoten bis zu dem untersten aktivierten und definierten Knoten in diesem Pfad
            **aktivieren und ihr die Werte zuweisen (vererben) des untersten aktivierten und definierten Elternknoten im Pfad**
          - Hinweis 1: Geschwisterknoten im Pfad aufwärts ab dem zu aktivierenden Knoten bis einschließlich dem untersten aktivierten und definierten Knoten in diesem Pfad können dabei unberücksichtigt bleiben:
            - Entweder sind diese aktiviert, dann müssen sie wegen der Wertevererbungsregel bereits mit denselben Werten definiert sein wie ihr Elternknoten, und können so verbleiben (Zeilen 14, 15, 41, 42 in Testmatrix unten)
            - Oder sie sind deaktiviert, dann können sie auch so verbleiben
          - Hinweis 2: Kindknoten unterhalb des Knotens, an dem die Baueigenschaft aktiviert wird, können in diesem Fall ebenfalls unberücksichttigt bleiben:
            - Entweder sind diese bereits vorher aktiviert, dann müssen sie wegen der Wertebererbungsregel bereits mit denselben Werten definiert sein wie der betreffende Elternknoten weiter oben im Pfad, und es können
              dann alle Knoten im Pfad so verbleiben (Zeilen 14, 41 in Testmatrix unten)
            - Oder sie sind deaktiviert, dann können sie so verbleiben (Zeilen 9, 18, 45, 54 in Testmatrix unten)
          - Hinweis 3: Wenn der betreffende (Ziel-)Knoten selbst bereits aktiviert und definiert ist, soll er unverändert bleiben (Zeilen 5, 6, 14, 15, 41, 42 in Testmatrix unten)
          - ==**[DEFER]**== (Prio 3) abei auch eine **Benutzernachricht** anzeigen, dass statt Vorgabewerten zu übernehmen vorhandene Werte aus einem Elternknoten vererbt wurden, mit Angabe der betroffenen Baueigenschaft (erfordert allerdings mehrere Nachrichten pro Profilaktivierung!)
        - ==**[DEFER] (Prio 3) [Ausbaustufe]**==
          - Eventuell über eine Option **Vorhandene Werte überschreiben mit Vorgabewerten aus Baueigenschaftsprofil**, am Besten per Toggle-Schalter im QForm für die
            Aktivierung eines Baueigenschaftsprofils durch den Benutzer **steuerbar** machen, dass vorhandene Werte im Pfad mit den Vorgabewerten aus dem Baueigenschaftsprofil überschrieben werden
          - Allerdings kann es dabei, wenn dieser Toggle auf "true" steht, zu umfangreichen Änderungen von existierenden definierten Werten kommen, so dass das in vielen Fällen vermutlich unerwünscht sein dürfte
            - In diesem Fall kann es nämlich vorkommen, dass schon weiter oben im Pfad an Elternknoten Werte definiert wurden, die dann
              normalerweise auch an aktivierte Geschwisterknoten im Pfad weitervererbt wurden (an solchen Geschwisterpfaden kann die Baueigenschaft jedoch auch deaaktiviert sein)
            - **[Deselektiert]** Bei einer solchen Übernahme von Vorgabewerten müsste dann eine weitreichende Überschreibung der bisher vererbten Werte mit diesen Vorgabewerten
              an allen direkten und indirekten Kindknoten des untersten Knotens im Pfad, an dem bereits Werte definiert waren, durchgeführt werden (auch für aktivierte Kind- und Kindeskindknoten in Geschwisterpfaden!)
            - **[Selektiert]** Vermutlich wäre es im Sinne einer weniger invasiven Logik in einem solchen Fall besser, wenn die
              Baueigenschaft an dem bestimmten Elternknoten, an dem Werte definiert sind,
              auf ==**undefiniert**== gesetzt wird (bzw. bei deaktivierten Knoten in Geschwisterpfaden diese deaktiviert bleibt),
              wie auch an sämtlichen direkten und indirekten Kindknoten dieses Knotens, an denen sie aktiviert ist bzw. aktiviert wird, und danach die
              Baueigenschaft ==nur an dem Knoten, an dem sie aktiviert wurde, mit dem Vorgabewert definiert wird== - an dessen direkten und
              indirekten Kindknoten sollte sie deaktiviert bleiben (selbe Logik wie beim Aktivieren von einzelnen Baueigenschaften), es sei denn,
              sie ist dor bereits aktiviert - in diesem Fall müssen die betreffenden Kind- oder Kindeskindknoten mit den Vorgabewerten definiert werden
          - Wenn obiger Toggle auf "false" steht: Dann muss, wie oben bereits unter **[Grundstufe]** beschrieben, an allen Knoten im Pfad zwischen dem oben
            genannten untersten aktivierten Elternknoten im Pfad mit definierten Werten und dem Knoten, an dem die Baueigenschaft aktiviert wird, die
            Baueigenschaft aktiviert werden und definiert werden mit den Werten aus diesem Elternknoten
            - Hinweis: Da wegen der Aktivierungsregel unter einem Elternknoten, an dem eine Baueigenschaft deaktiviert ist, keine Kind- und Kindeskindknoten existieren können, an denen diese
              Baueigenschaft aktiviert ist, muss hier keine weitere Vererbung der definierten Werte aus dem Elternknoten an Geschwisterkindknoten von deaktivierten Knoten im Pfad durchgeführt werden - diese
              bleiben deaktiviert und damit undefiniert
    - Verhalten, wenn die Baueigenschaft an allen Knoten im Pfad aufwärts **deaktiviert** ist:
      - Diese an allen Knoten im Pfad **aktivieren** und sie (nur) am Zielknoten mit den **Vorgabewerten definieren**
    - ==Zusätzlich (siehe unten):== Das Baueigenschaftsprofil auch an allen Elternknoten als **aktiviert** eintragen in der Übersicht aller Baueigenschaftsprofile am Elternknoten
  - **[DONE]** Bei **Deaktivierung** eines Baueigenschaftsprofils an einer Baueinheit bzw. einem Baustoff
    - Dabei **alle dem Baueigenschaftsprofil zugehörigen Baueigenschaften deaktivieren** an dem Baustoff bzw. der Baueinheit
    - Die Logik dafür ist dieselbe wie beim normalen Deaktivieren von Baueigenschaften
    - Ggf. die Baueigenschaft auch in Kindern und Kindeskindern deaktivieren
    - ==Zusätzlich (siehe unten):== Das Baueigenschaftsprofil auch an allen direkten und indirekten Kindknoten, an denen es ggf. als aktiviert eingetragen war, als **deaktiviert** eintragen in der Übersicht aller
      Baueigenschaftsprofile am Kindknoten
  - **[DONE]** ==(Prio 2) Automatische Aktivierung/Deaktivierung eines Baueigenschaftsprofils auch an Elternknoten bzw. Kindknoten (konsistent mit der Logik und den Regeln bei Baueigenschaften)==
    - Bei **Aktivierung eines Baueigenschaftsprofils** dieses auch an allen Elternknoten als **aktiviert** eintragen in der Übersicht aller Baueigenschaftsprofile am Elternknoten
    - Auswirkungen:
      - Oben im Baum sind dann alle weiter unten aktivierten Baueigenschaftsprofile aktiviert (konsistent mit der Logik und den Regeln bei aktivierten Baueigenschaften, bereits oben eingearbeitet)
      - Es kann dann an diesen Elternknoten allerdings nur noch **deaktiviert** werden
      - Es muss aber an einem Elternknonten (an dem die Baueigenschaften des Baueigenschaftsprofils nach dessen Aktivierung immer aktiviert sind, d.h. den Zustand A/¬D oder A/D1 haben müssen) auch gar nicht mehr aktiviert
        werden, es sei denn man wollte dort ebenfalls die Vorgabewerte aus dem Baueigenschaftsprofil eintragen lassen
        - Dies kann damit erreicht/umgangen werden, indem das Baueigenschaftsprofils an dem Elternknoten zunächst deaktiviert wird, und dann wieder aktiviert wird
      - Eine Deaktivierung eines Baueigenschaftsprofils, das direkte oder indirekte Kindknoten hat, an denen es ebenfalls aktiviert ist, ist identisch zur oben
        beschriebenen Deaktivierung. Zusätzlich muss das
        Baueigenschaftsprofils auch an allen direkten und indirekten Kindknoten, an denen es ggf. als aktiviert eingetragen war, als **deaktiviert** eingetragen
        werden.
    - Bei **Deaktivierung eines Baueigenschaftsprofils** dieses auch an allen direkten und indirekten Kindknoten, an denen es ggf. als aktiviert eingetragen war,
      als **deaktiviert** eintragen in der Übersicht aller
      Baueigenschaftsprofile
    - ==**Hinweis**==: Diese auotmatische Aktivierung eines Baueigenschaftsprofils auch an Elternknoten und Deaktivierung auch an Kindknoten wurde
      wie beschrieben von Stefan so implementiert - validiert per Kurztest durch Michael in der lokalen Version von BIM.click
- ==**[DEFER]**== (Prio 3) Weitere Ausbaumöglichkeiten für Aktionen auf Baueigenschaftsprofilen
  - In der ersten Implementierungsstufe könnten durch Profile aktivierte Baueigenschaften einen Lifecycle unabhängig vom Profil haben, d.h. sind
    solche Baueigenschaften einmal aktiviert, und das Profil ändert sich, werden keine Änderungen in den betroffenen Baueigenschaften durchgeführt
  - In einer Ausbaustufe könnten die Profile intelligenter werden, d.h.
    - Folgeaktionen, wenn das Baueigenschaftsprofil geändert wird, d.h. wenn z.B. Baueigenschaften darin gelöscht werden oder hinzugefügt
      werden => Aktualisierung der Baueinheiten/Baustoffe, für die das Baueigenschaftsprofil als zugeordnet eingetragen ist
    - Folgeaktionen, wenn Baueigenschaften im Baueigenschaftsprofil geändert werden (z.B. Vorgabewerte)
      - Dann muss ggf. eine Neu-Aktivierung in allen Baueinheiten bzw. Baustoffen, für die dieses Profil als zugeordnet eingetragen ist, ausgelöst werden
- **[DONE]** Die folgende Testmatrix für die Aktivierung von Baueigenschaften in Baueigenschaftsprofilen getestet am 26.09.2020 ff. - siehe
  letzte Spalte in der Tabelle
  - **Testergebnisse**:
    - Es wurde vs. obigem internen Design ein Algorithmus implementiert, der bei Konflikten meist die ggf. vorhandenen Werte so anpasst, dass die Vorgabewerte
      durchgesetzt werden
    - Dabei werden bei Konflikten vorhandene Werte an Elternknoten und ggf. auch am Zielkonten selbst (Zeile 5 und 6 in der Testmatrix) auf undefiniert gesetzt
    - Bei den Fällen 5 und 6 werden im Ergebnis weder die vorhandenen noch die Vorgabewerte übernnommen, sondern es werden die betroffenen Werte am Zielknoten
      selbst undefiniert (im Sinne möglichst weniger Eingriffe in die vorhandenen Werte)
    - ==**Achtung**==: Dieser Algorithmus ist auch relevant bei Profilaktivierungen aus Baueigenschaftsprofilformularen (z.B. ausgelöst durch Aufzählungswerte in  
      Baueigenschaftsprofilformularen), wo abhängig vom gewählten Aufzählungswert Profile mit **gemeinsamen** Baueigenschaften, die allerdings unterschiedliche
      Vorgabewerte pro Profil haben,
      deaktiviert bzw. aktiviert werden müssen - für diesen Use Case ist es wichtig und richtig, dass sich ggf. die Vorgabewerte durchsetzen und somit bereits
      eingetragene, vorhandene (Vorgabe-)Werte durch neue Vorgabewerte ersetzt werden.
    - Fall 5 und 6 in der ersten Implementierung würden allerdings genau das verhindern, weil die alten Vorgabewerte in diesen Fällen undefiniert werden, ohne dass
      neue Vorgabewerte eingetragen werden! Diese Fälle mussten also gefixed werden - im Fall 5 muss z.B. statt A/¬D A/¬D A/¬D A/D2 das Ergebnis A/¬D A/¬D A/V1 A/
      V1 sein - analog im Fall 6. Beide Fälle wurden von Stefan gefixed und von Michael verifiziert.
    - Es werden bisher keine Warnungen bzw. Meldungen ausgegeben - diese müssten ggf. für alle betroffenen Baueigenschaften ausgegeben werden (d.h. es wäre mehr
      als eine Meldung pro Profilaktivierung erforderlich und die Baueigenschaftsbezeichnung müsste per Variable in der Meldung mit aufgenommen werden)

```

==**Achtung**==: Der Fall, dass die Vorgabewerte undefiniert sind, ist hier vermutlich nicht berücksichtigt!
/*
Testmatrix für die Aktivierung/Deaktivierung von Baueigenschaften in Baueigenschaftsprofilen
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Legende:
 A    = Aktiviert
¬A    = Deaktiviert
D1/D2 = Definiert mit Wert 1/2 (dann immer aktiviert)
V1    = Definiert mit Vorgabewert 1 (dann immer aktiviert)
¬D    = Undefiniert
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                 Ausgangszustand                                            Zielzustand
Großeltern-  Elternknoten     Zielknoten   Kindknoten      Großeltern-  Elternknoten  Zielknoten     Kindknoten                                                                                                           Teststatus
  knoten                                                    knoten
Hinweis 1: Der Zielknoten ist der Knoten, an dem die Baueigenschaft aus dem Baueigenschaftsprofil aktiviert werden soll
Hinweis 2: Der Elterknoten kann (mit demselben Zustand) auch mehrfach vorkommen im Pfad unter dem Großelternknoten, es handelt sich dann jeweils um den UNTERSTEN Knoten im Pfad mit dem angegebenen Zustand
Hinweis 3: Wenn der Zielknoten MEHRERE Kindknoten hat, gilt für JEDEN dieser Kindknoten die entsprechende Zeile in dieser Testmatrix
Hinweis 4: Nicht erlaubte Kombinationen sollten ebenfalls stichprobenartig daraufhin überprüft werden, ob sie nicht doch vorkommen!
WICHTIG: Der Zielzustand in dieser Tabelle reflektiert jeweils das ALTE Design, bei dem die bisherigen Werte erhalten blieben - das neue Design überschreibt sie mit den Vorgabewerten und setzt definierte Werte in Elternknoten ggf. auf undefiniert!!!
WICHTIG: [OK] in der letzten Spalte bedeutet: Der Testfall ist erfolgreich nach dem NEUEN Design!
Hinweis: Fall a) Vorgabewerte überschreiben vorhandene Werte
         Fall b) Vorhandene Werte setzen sich durch
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
1a).  A/¬D           A/¬D         A/¬D          A/¬D          A/¬D           A/¬D           A/V1          A/V1     Zielknoten aktivieren und definieren mit Vorgabewerten,
                                                                                                                 Werte an aktivierten (Kindes)kindern müssen mit Vorgabewerten überschrieben werden wegen Vererbungsregel [26.09.20 OK] [1.3.21 OK]
1b).  A/¬D           A/¬D         A/¬D          A/¬D          A/¬D           A/¬D           A/V1          A/V1     Zielknoten aktivieren und definieren mit Vorgabewerten,
                                                                                                                 Werte an aktivierten (Kindes)kindern müssen mit Vorgabewerten überschrieben werden wegen Vererbungsregel [26.09.20 OK] [1.3.21 OK]
2.  A/¬D           A/¬D         A/¬D          A/D2          A/¬D           A/¬D           A/V1          A/V1     Zielknoten aktivieren und definieren mit Vorgabewerten,
                                                                                                                 Werte an aktivierten (Kindes)kindern müssen mit Vorgabewerten überschrieben werden wegen Vererbungsregel [26.09.20 OK] [1.3.21 OK]
3.  A/¬D           A/¬D         A/¬D         ¬A/¬D          A/¬D           A/¬D           A/V1         ¬A/¬D     Zielknoten aktivieren und definieren mit Vorgabewerten, Kindknoten bleibt deaktiviert                    [26.09.20 OK]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
4.  A/¬D           A/¬D         A/D2          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
5.  A/¬D           A/¬D         A/D2          A/D2          A/¬D           A/¬D           A/D2          A/D2     Bleibt (mit Warnung, dass Vorgabewerte unberücksichtigt bleiben zugunsten von Werten aus Elternknoten)   [26.09.20 FAIL]
                                              Testergebnis: A/¬D           A/¬D           A/¬D          A/D2     Vorhandene Werte werden undefiniert, Vorgabewerte bleiben unberücksichtigt, weder vorhandene noch Vorgabewerte werden
                                                                                                                 genommen, keine Warnung
                                                                                                                                                                                                                          [28.09.20 OK per neuem Design]
                                              Testergebnis: A/¬D           A/¬D           A/V1          A/V1     Korrekter Zielzustsand per neuem Design! [15.3.21 OK (im Fall vorgabewerteUeberschreibenVorhandeneWert = true)] [15.3.21 OK (nach Fix)]
6.  A/¬D           A/¬D         A/D2         ¬A/¬D          A/¬D           A/¬D           A/D2         ¬A/¬D     Bleibt (mit Warnung, dass Vorgabewerte unberücksichtigt bleiben zugunsten von Werten aus Elternknoten)   [26.09.20 FAIL]
                                              Testergebnis: A/¬D           A/¬D           A/¬D         ¬A/¬D     Vorhandene Werte werden undefiniert, Vorgabewerte bleiben unberücksichtigt, weder vorhandene noch Vorgabewerte werden
                                                                                                                 genommen, keine Warnung                                                                                  [28.09.20 OK per neuem Design]
                                              Testergebnis: A/¬D           A/¬D           A/V1         ¬A/¬D     Korrekter Zielzustand per neuem Design! [15.3.21 OK (im Fall vorgabewerteUeberschreibenVorhandeneWert = false)] [15.3.21 OK (nach Fix) ]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
7.  A/¬D           A/¬D        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
8.  A/¬D           A/¬D        ¬A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
9.  A/¬D           A/¬D        ¬A/¬D         ¬A/¬D          A/¬D           A/¬D           A/V1         ¬A/¬D     Zielknoten aktivieren und definieren mit Vorgabewerten                                                   [26.09.20 OK per neuem Design][15.3.21 OK (bei definiertem und undefiniertem Vorgabewert)]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
10. A/¬D           A/D1         A/¬D          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
11. A/¬D           A/D1         A/¬D          A/D2          Nicht erlaubt (Wertevererbungsregel)!
12. A/¬D           A/D1         A/¬D         ¬A/¬D          Nicht erlaubt (Wertevererbungsregel)!
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
13. A/¬D           A/D1         A/D1          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
14. A/¬D           A/D1         A/D1          A/D1          A/¬D           A/D1           A/D1          A/D1     Bleibt (mit Warnung, dass Vorgabewerte unberücksichtigt bleiben zugunsten von Werten aus Elternknoten)   [26.09.20 OK per neuem Design] [1.3.21 OK (im Fall vorgabewerteUeberschreibenVorhandeneWert = false)]
                                              Testergebnis: A/¬D           A/¬D           A/V1          A/V1     Vorhandene Werte am Elternknoten werden undefiniert, Vorgabewerte werden eingetragen am Ziel- und Kindknoten, keine Warnung [1.3.21 OK (im Fall vorgabewerteUeberschreibenVorhandeneWert = true)]
15. A/¬D           A/D1         A/D1         ¬A/¬D          A/¬D           A/D1           A/D1         ¬A/¬D     Bleibt (mit Warnung, dass Vorgabewerte unberücksichtigt bleiben zugunsten von Werten aus Elternknoten)   [26.09.20 OK per neuem Design]
                                              Testergebnis: A/¬D           A/¬D           A/V1         ¬A/¬D     Vorhandene Werte am Elternknoten werden undefiniert, Vorgabewerte werden eingetragen am Zieknoten, keine Warnung  [1.3.21 OK]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
16. A/¬D           A/D1        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
17. A/¬D           A/D1        ¬A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
18. A/¬D           A/D1        ¬A/¬D         ¬A/¬D          A/¬D           A/D1           A/D1         ¬A/¬D     Zielknoten aktivieren und definieren mit Werten aus Elternwerten (mit Warnung dass Vorgabewerte
                                                                                                                 unberücksichtigt bleiben zugunsten von Werten aus Elternknoten)                                          [26.09.20 OK per neuem Design]
                                              Testergebnis: A/¬D           A/¬D           A/V1         ¬A/¬D     Vorhandene Werte am Elternknoten werden undefiniert, Vorgabewerte werden eingetragen am Zieknoten, keine Warnung  [1.3.21 OK]
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
19. A/¬D          ¬A/¬D         A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
20. A/¬D          ¬A/¬D         A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
21. A/¬D          ¬A/¬D         A/¬D         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
22. A/¬D          ¬A/¬D         A/D1          A/¬D          Nicht erlaubt (Aktivierungsregel)!
23. A/¬D          ¬A/¬D         A/D1          A/D1          Nicht erlaubt (Aktivierungsregel)!
24. A/¬D          ¬A/¬D         A/D1         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
25. A/¬D          ¬A/¬D        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
26. A/¬D          ¬A/¬D        ¬A/¬D          A/D1          Nicht erlaubt (Aktivierungsregel)!
27. A/¬D          ¬A/¬D        ¬A/¬D         ¬A/¬D          A/¬D          A/¬D            A/V1         ¬A/¬D     Im Pfad aktivieren und am Zielknoten definieren mit Vorgabewerten, Kindknoten bleibt deaktiviert          [26.09.20 OK per neuem Design] [1.3.21 OK]
=============================================================================================================================================================================================================================================
28. A/D1           A/¬D         A/¬D          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
29. A/D1           A/¬D         A/¬D          A/D2          Nicht erlaubt (Wertevererbungsregel)!
30. A/D1           A/¬D         A/¬D         ¬A/¬D          Nicht erlaubt (Wertevererbungsregel)!
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
31. A/D1           A/¬D         A/D2          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
32. A/D1           A/¬D         A/D2          A/D2          Nicht erlaubt (Wertevererbungsregel)!
33. A/D1           A/¬D         A/D2         ¬A/¬D          Nicht erlaubt (Wertevererbungsregel)!
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
34. A/D1           A/¬D        ¬A/¬D          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
35. A/D1           A/¬D        ¬A/¬D          A/D2          Nicht erlaubt (Wertevererbungsregel)!
36. A/D1           A/¬D        ¬A/¬D         ¬A/¬D          Nicht erlaubt (Wertevererbungsregel)!
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
37. A/D1           A/D1         A/¬D          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
38. A/D1           A/D1         A/¬D          A/D2          Nicht erlaubt (Wertevererbungsregel)!
39. A/D1           A/D1         A/¬D         ¬A/¬D          Nicht erlaubt (Wertevererbungsregel)!
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
40. A/D1           A/D1         A/D1          A/¬D          Nicht erlaubt (Wertevererbungsregel)!
41. A/D1           A/D1         A/D1          A/D1          A/D1           A/D1           A/D1          A/D1      Bleibt (mit Warnung, dass Vorgabewerte unberücksichtigt bleiben zugunsten von Werten aus Elternknoten)   [26.09.20 OK per neuem Design]
                                              Testergebnis: A/¬D           A/¬D           A/V1          A/V1      Vorhandene Werte am Elternknoten werden undefiniert, Vorgabewerte werden eingetragen am Ziel- und Kindknoten, keine Warnung
                                                                                                                  Regression Sniff Test:                                                                                   [28.09.20 OK per neuem Design]
42. A/D1           A/D1         A/D1         ¬A/¬D          A/D1           A/D1           A/D1         ¬A/¬D      Bleibt (mit Warnung, dass Vorgabewerte unberücksichtigt bleiben zugunsten von Werten aus Elternknoten)   [26.09.20 OK per neuem Design]
                                              Testergebnis: A/¬D           A/¬D           A/V1         ¬A/¬D      Vorhandene Werte am Elternknoten werden undefiniert, Vorgabewerte werden eingetragen am Zielknoten, keine Warnung
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
43. A/D1           A/D1        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
44. A/D1           A/D1        ¬A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
45. A/D1           A/D1        ¬A/¬D         ¬A/¬D          A/D1           A/D1           A/D1         ¬A/¬D      Zielknoten aktivieren/definieren mit Werten aus Elternwerten (mit Warnung, dass Vorgabewerte
                                                                                                                  unberücksichtigt bleiben zugunsten von Werten aus Elternknoten)                                          [26.09.20 OK per neuem Design]
                                              Testergebnis: A/¬D           A/¬D           A/V1         ¬A/¬D      Vorhandene Werte am Eltern- und Großelternknoten werden undefiniert, Vorgabewerte werden eingetragen am Zielknoten, keine Warnung
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
46. A/D1          ¬A/¬D         A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
47. A/D1          ¬A/¬D         A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
48. A/D1          ¬A/¬D         A/¬D         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
49. A/D1          ¬A/¬D         A/D2          A/¬D          Nicht erlaubt (Aktivierungsregel)!
50. A/D1          ¬A/¬D         A/D2          A/D2          Nicht erlaubt (Aktivierungsregel)!
51. A/D1          ¬A/¬D         A/D2         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
52. A/D1          ¬A/¬D        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
53. A/D1          ¬A/¬D        ¬A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
54. A/D1          ¬A/¬D        ¬A/¬D         ¬A/¬D          A/D1           A/D1           A/D1         ¬A/¬D      Im Pfad aktivieren/definieren mit Werten aus Elternwerten (mit Warnung, dass Vorgabewerte unberücksichtigt
                                                                                                                  bleiben zugunsten von Werten aus Elternknoten)                                                            [26.09.20 OK per neuem Design]
                                              Testergebnis: A/¬D           A/¬D           A/V1         ¬A/¬D      Vorhandene Werte am Eltern- und Großelternknoten werden undefiniert, Vorgabewerte werden eingetragen am Zielknoten, keine Warnung
==============================================================================================================================================================================================================================================
55.¬A/¬D           A/¬D         A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
56.¬A/¬D           A/¬D         A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
57.¬A/¬D           A/¬D         A/¬D         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
58.¬A/¬D           A/¬D         A/D2          A/¬D          Nicht erlaubt (Aktivierungsregel)!
59.¬A/¬D           A/¬D         A/D2          A/D2          Nicht erlaubt (Aktivierungsregel)!
60.¬A/¬D           A/¬D         A/D2         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
61.¬A/¬D           A/¬D        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
62.¬A/¬D           A/¬D        ¬A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
63.¬A/¬D           A/¬D        ¬A/¬D         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
64.¬A/¬D           A/D1         A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
65.¬A/¬D           A/D1         A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
66.¬A/¬D           A/D1         A/¬D         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
67.¬A/¬D           A/D1         A/D2          A/¬D          Nicht erlaubt (Aktivierungsregel)!
68.¬A/¬D           A/D1         A/D2          A/D2          Nicht erlaubt (Aktivierungsregel)!
69.¬A/¬D           A/D1         A/D2         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
70.¬A/¬D           A/D1        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
71.¬A/¬D           A/D1        ¬A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
72.¬A/¬D           A/D1        ¬A/¬D         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
73.¬A/¬D          ¬A/¬D         A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
74.¬A/¬D          ¬A/¬D         A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
75.¬A/¬D          ¬A/¬D         A/¬D         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
76.¬A/¬D          ¬A/¬D         A/D2          A/¬D          Nicht erlaubt (Aktivierungsregel)!
77.¬A/¬D          ¬A/¬D         A/D2          A/D2          Nicht erlaubt (Aktivierungsregel)!
78.¬A/¬D          ¬A/¬D         A/D2         ¬A/¬D          Nicht erlaubt (Aktivierungsregel)!
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
79.¬A/¬D          ¬A/¬D        ¬A/¬D          A/¬D          Nicht erlaubt (Aktivierungsregel)!
80.¬A/¬D          ¬A/¬D        ¬A/¬D          A/D2          Nicht erlaubt (Aktivierungsregel)!
81.¬A/¬D          ¬A/¬D        ¬A/¬D         ¬A/¬D          A/¬D          A/¬D          A/V1        ¬A/¬D     Im Pfad aktivieren/am Zielknoten definieren mit Vorgabewerten, Kindknoten bleibt deaktiviert                 [26.09.20 OK per neuem Design]
*/
```

---

#### **[Epic 5]** ==**[WORK]**== (Prio 2) Baueigenschaftsprofilformulare

::: warning Achtung
Im Backend müssen in den Read-Methoden, welche Baueigenschaften an Baueinheiten/Baustoffen per API zurückgeben, die Baueigenschaften an
der Baueinheit/dem Baustoff immer einheitlich sortiert werden, in allen solchen Read-Requests für Baueinheiten!!!
Grund: Am Frontend, im Code für sämtliche Baueigenschaftsprofilformulare, werden nur jeweils beim ersten Mal in mounted() die
Indexes in den Array profilModelAusgewaehlterKnoten in den jeweiligen Array layoutStandortProfilFormular (Beispiel)
eingetragen und bleiben dann bei Refreshes dort stehen! Würde sich dann die Reihenfolge der Baueigenschaften im Array
profilModelAusgewaehlterKnoten nach dem Refresh ändern, stimmen diese Indexes nicht mehr, was zu merkwürdigen
Fehlern beim Rendern des Template ("Nicht unterstützter Wertetyp") bei Feldern führt, bei denen der Index falsch ist!
:::

- Für bereits im System vordefinierte Baueigenschaftsprofile (diese müssen als obligatorisch/systemdefiniert verwaltet werden) muss es eine
  Möglichkeit geben, zusätzlich ein optionales, spezifisches ==**Baueigenschaftsprofilformular**== (implementiert als QTab mit QForm)
  zu verwalten, das es erlaubt, die Werte der in dem Baueigenschaftsprofil definierten Baueigenschaften zu editieren. Durch die Zuordnung eines
  solchen Tabs zu dem Baueigenschaftsprofils weiß BIM.click dann,
  welches Tab es anzeigen muss zum Editieren der Werte der Baueigenschaften in dem Baueigenschaftsprofil, wenn das Profil an einer Baueinheit
  aktiviert ist - dieses Tab sollte dann dynamisch oder statisch (mit geeignetem Enaling/Disabling?) in die Tableiste aufgenommmen werden
  in die Liste der angezeigten Tabs in der oberen Tab-Leiste bei Auswahl einer Baueinheit in einem Bauvorhaben im Bauvorhabenbaum, ähnlich wie
  das Tab bzw. erste prototypische Baueigenschaftsprofilformular "Bauvorhaben (Preview)" heute angezeigt wird bei Auswahl eines
  Bauvorhabens bzw. einer Baueinheit mit aktivierten Baueigenschaften im Baueigenschaftsprofil "Baueinheit > Bauvorhaben" im Bauvorhabenbaum
  - Hinweis: Es müssen hier mehrere solche Tabs mit Baueigenschaftsprofilformularen
    angezeigt werden, falls mehrere Profile an einer Baueinheit aktiviert sind
  - Hinweis: Es könnte zusätzlich auch Baueigenschaftsprofilformulare geben, die
    Baueigenschaften zusammenfassen, die an <u>unterschiedlichen</u> Baueinheiten
    aktiviert sind. Dies wäre je nach Design eventuell notwendig für Schichtaufbauten aus mehreren
    Baueinheiten. Allerdings muss dann geklärt werden, ob diese dann auch
    mehreren Baueigenschaftsprofilen zugeordnet werden müssen, die jeweils an
    unterschiedlichen Baueinheiten aktiviert sein können, um dieses weitere
    Konstrukt zu unterstützen. Eventuell könnte dies alternativ auch über
    eine Erweiterung der Vorlagen für Baueinheiten abgebildet werden, oder über ein dediziertes neues
    Konstrukt, welches dieselbe Baueigenschaft an verschiedenen Baueinheiten
    zu einer Art computed Property ("berechnete Baueigenschaft") zusammenfasst,
    oder ein spezielles Map-Konstrukt für Baueigenschaften (das eventuell erst einmal
    unabhängig von den bisherigen Wertetypen für Baueigenschaften implementiert werden
    könnte, ohne dynamische Erstellbarkeit), welches Baueigenschaften bestimmten
    Baueinheiten zuordnet.
- Dies könnte oben in einem weiteren QSelect-Feld verwaltet werden im Tab **"Details für
  ausgewähltes Baueigenschaftsprofil"**, in Verbindung mit
  einer eigenen Collection und Tabelle für diese Baueigenschaftsprofilformulare
- In einer ersten Stufe könnte man diese Baueigenschaftsprofilformulare auch einfach gleich benennen wie die Bezeichnung des Baueigenschaftsprofils (slugified
  Name) und so eine zusätzliche komplexe Verwaltung dafür zunächst vermeiden
  - Diese Baueigenschaftsprofilformulare würden dann definiert und gebaut werden müssen als Teil des BIM.click Entwicklungs- und Build-Prozesses, und würden die
    entsprechenden slugified Names "ihres" Baueigenschaftsprofils tragen
    - Hinweis: Diese Baueigenschaftsprofilformulare müsste man natürlich
      neu erzeugen, falls ein solches Profil umbenannt würde. Da diese Baueigenschaftsprofilformulare zunächst nur für im System obligatorische/systemdefinierte
      Baueigenschaftsprofile angelegt würden, wäre das kein großes Problem.
  - Wenn das Profil an einer Baueinheit aktiviert wäre, würde, falls vorhanden und namensgleich zu einem Baueigenschaftsprofil, ein solches
    Baueigenschaftsprofilformular für das Baueigenschaftsprofil dann wie oben beschrieben automatisch in einem Tab in der oberen Tab-Leiste angezeigt werden bei
    Auswahl der Baueinheit am Bauvorhaben
  - ==**Achtung**==: Bezüglich der Anzeige solcher Baueigenschaftsprofilformulare für ein Baueigenschaftsprofil ist Folgendes zu beachten:
    - Wenn ein Baueigenschaftsprofil an einem Knoten aktiviert wird, wird es auch an allen Elternknoten im Pfad aktiviert.
      - Es ist deshalb zu überlegen, **ob das zugehörige Baueigenschaftsprofilformular ebenfalls an allen diesen Knoten angezeigt wird,**
        **oder nur an den jeweils untersten Knoten in solchen Pfaden** (dies könnte über eine computed-Funktion gesteuert werden).
      - Wenn an Knoten weiter oben
        in solchen Pfaden per Formular eine Editiermöglichkeit für die Werte der dem Profil zugeordneten Baueigenschaften angeboten wird, muss
        **bei Werteänderungen eine automatische Vererbung** der geänderten Werte an ggf. aktivierte Kindknoten durchgeführt werden.
      - Es ist außerdem immer (auch wenn weiter oben im Pfad an Knoten, an denen das Profil aktiviert ist, kein Formular angezeigt wird) für
        jede Baueigenschaft im Profil zu prüfen,
        ob nicht **weiter oben im Pfad Werte definiert** sind für die Baueigenschaft, die dann weitervererbt würden - falls ja, muss die
        betreffende Baueigenschaft im Baueigenschaftsformular auf read-only gesetzt werden!
    - Wenn ein Baueigenschaftsprofil an einem Knoten aktiviert wurde,
      **bedeutet das nicht automatisch, dass auch alle dem Profil zugeordneten Baueigenschaften aktiviert sein müssen,** da diese auch manuell deaktiviert werden können (sofern das für systemdefinierte
      Baueigenschaften nicht verhindert wird). Daher muss in jedem Fall vor dem Anzeigen eines Baueigenschaftsprofilformulars eine
      Prüfung durchgeführt werden, **ob tatsächliche alle Baueigenschaften im Profil aktiviert sind** am betreffenden Knoten.
- Eine weitere Möglichkeit ist, dass es eine ==**generische Vue-Komponente für die Anzeige und das Editing von allen "Baueigenschaftsprofilformularen"**== gibt,
  der ein Baueigenschaftsprofil per Property übergeben wird, bzw. in der per QSelect das zu rendernde Baueigenschaftsprofil ausgewählt werden kann, und die dann
  dynamisch (-if-Steuerung) die passenden QInput/QSelect/QToggle Felder rendered zum Editiren sämtlicher in dem Profil enthaltenen Baueigenschaften.
  - Allerdings muss dann überlegt werden, in welcher Reihenfolge die Felder dann im QForm angezeigt werden (z.B. dedizierte Spalten für jeden
    Wertetyp, alphabetische Reihenfolge in den Spalten - diese in der ersten Implementierung realisiert).
  - Dieses generische Vue-Komponente würde dann beim Aktivieren eines Profils angezeigt in den Tabs der Baueinheit.
  - Sie könnte auch über neue, zusätzliche Angaben pro Baueigenschaft im Baueigenschaftsprofil gesteuert werden, z.B.:
    - Baueigenschaft im Baueigenschaftsprofilformular anzeigen: ja/nein
    - Bemerkung und/oder Beschreibung dazu anzeigen: ja/nein
    - Anzeigen in Spalte 1/2/3 (bei mehrspaltigem Layout)
    - Anzeigen in Zeile n
    - ==**[TODO]**== Ausbaustufe bei Aufzählungswerten:
      - Beim Speichern das zu einer bestimmten Option des Aufzählungswerts gehörende Baueigenschaftsprofil aktivieren (ja/nein)
      - Beim Speichern zu einer bestimmten Option des Aufzählungswerts gehörende Bauinformationen zuordnen (ja/nein)
  - Allerdings benötigt man für spezielle Anforderungen trotzdem bestimmte ==**spezifische Baueigenschaftsprofilformulare**==, die nachfolgend beschrieben werden:
    1. Baueigenschaftsprofilformular für **Bauvorhaben**
       - Dieses Formular benötigt zusätzlichen Code, z.B. für Buttons zum Anzeigen von Geo-Informationen etc.
       - Eine vorläufige Implementierung dafür ist bereits vorhanden - diese arbeitet aber bisher nicht auf einem Profil, sondern direkt auf einer vordefinierten  
         Menge von Baueigenschaften (die mittlerweile aber zu einem schon definierten Profil "Baueinheit > Bauvorhaben" gehören)
    2. Baueigenschaftsprofilformular für **Bodenaufbau**
       - Dieses Formular benötigt zusätzlichen Code zur Visualisierung der enthaltenen Schichten - es
         handelt sich dabei (siehe unten Variante A) ohnehin um ein spezielles
         Baueigenschaftsprofilformular, das auf die Kindbaueinheiten zugreift und auf
         Baueigenschaften aus dort aktivierten Baueigenschaftsprofilen
    3. Baueigenschaftsprofilformular für eine einzelne **Schicht** in einem Bodenaufbau
    4. [Prio 3] Wandaufbau und Schicht in eineme Wandbaufbau (abgeleitet aus Bodenaufbau)
    5. [Prio 3] Weitere spezielle Baueigenschaftsprofilformulare (z.B. für **Standort**, **Gebäude**, etc.)
  - ==**Staging**==: Zunächst den Code für diese **"speziellen" Baueigenschaftsprofilformulare** implementieren, parallel auch den Code für das obige
    **"generische" Baueigenschaftsprofilformular**
  - ==**Logik**==: Wenn eine Komponente für ein spezielles Baueigenschaftsprofilformular vorhanden ist (z.B. per Check des Component Name aus der slugfied Bezeichnung des Baueigenschaftsprofils zu ermitteln),
    bei Profilaktivierung dieses in den Tabs der Baueinheit anzeigen, andernfalls das generische Baueigenschaftsprofilformular anzeigen

---

#### **[Epic 5]** ==**[WORK]**== ==**Allgemeine Implementierungshinweise für Baueigenschaftsprofilformulare:**==

- Im Code für das Formular "Bauvorhaben (Preview)" in baueinheiten.vue existiert in der Methode loadBauvorhabenAusgewaehlteBaueinheit() bereits Code, der
  über einen für dieses Form spezifischen Array bauvorhabenAusgewaehlteBaueinheit gesteuert, diejenigen Baueigenschaften aus dem Array selectedNodeTreeBaueinheiten.baueigenschaften lädt, die zu diesem Formular gehören.
- Statt über den Array bauvorhabenAusgewaehlteBaueinheit zu iterieren, müsste der generische Code für Baueigenschaftsprofilformulare
  zunächst über den
  per neuer API-Methode ans Frontend gesendeten Array zugeordneteBaueigenschaften des betreffenden
  Baueigenschaftsprofilformulars iterieren, der die Baueigenschaften (und bei Bedarf auch deren Vorgabewerte) für ein Baueigenschaftsprofilformular enthält, und daraus einen generischen Array aufbauen.
- Dabei können die tatsächlichen Instanzen der dem Profil zugeordneten Baueigenschaften an der Baueinheit entweder aus
  selectedNodeTreeBaueinheiten.baueigenschaften extrahiert werden - das ist die gewählte Lösung, denn im Frontend wurden sie dorthin ja bereits aus dem Backend gelade, dies ist
  performance-optimiert und besser bzgl. Integrität der Daten (so macht es auch die vorhandene Implementierung von "Bauvorhaben (Preview)"). Alternativ müssten nochmals aus dem Backend geladen werden per neuer API-Methode.
- Analog gibt es eine Methode updateBauvorhabenAusgewaehlteBaueinheit(), welches den Array bauvorhabenAusgewaehlteBaueinheit an eine korrespondierende Backend-API-Methode updateBauvorhabenBaueinheit() sendet
  zum Update der Datenbank (in baueinheiten.controller.js)
- Ziel sollte es sein, dass möglichst viel generischer Code für diese Formulare verwendet werden kann und möglichst wenig Code, der spezifisch ist für ein bestimmtes Formular.
- Im Frontend Code muss das Form (Template-Teil) für das betreffende Formular allerdings spezifisch sein für das Formular - eventuell könnte allerdings dieser Teil generiert werden aus den
  im Baueigenschaftsprofilformular enthaltenen Baueigenschaften und deren Wertetypen.
- Eventuell sollte sogar angestrebt werden, dass auch der Backend-Code möglichst generisch ist, d.h. gesteuert über den Namen des Baueigenschaftsprofilformulars und die daraus abgeleitete Information,
  welche Baueigenschaften im Profil enthalten sind, könnte eine gemeinsame Backend-API-Methode genau diese updaten (mit den Werten aus einem Array of Objects mit den betreffenden Baueigenschaften und deren geänderten Werten, der dem Backend im Body übergeben wird) an einer Baueinheit (deren Id ist Request Parameter der Methode).
- Der **Pseudocode für ein Baueigenschaftsprofilformular** könnte dann so aussehen:
  - Beim Mounten einen Extrakt des zugehörigen Profils per API holen (die Vorgabewerte werden dabei nicht benötigt, allerdings werden
    die Felder BaueigenschaftsBemerkung und BaueigenschaftsBeschreibung benötigt, da diese in bestimmten Fällen mit im Formular
    bzw. in der fachlichen Hilfe im rechten Auszug angezeigt werden müssen - sicherheitshalber sollte auch die Bauinformation mit enthalten sein!)
  - Dann die im Profil enthaltenen Baueigenschaften aus dem Array selectedNodeTreeBaueinheiten.baueigenschaften extrahieren und in einen
    dedizierten "Zwischen-Array" (z.B. "profilModelAusgewaehlteBaueinheit") für das Formular laden (analog zu bauvorhabenAusgewaehlteBaueinheit, allerdings ggf. mit zusätzlichen Feldern z.B. für aktiviert/nicht aktiviert, ererbt etc.), der auch das Template bedient
    zum Editieren der Werte der Felder im Profil
  - ==Dabei prüfen, ob auch alle Baueigenschaften im Profil an der Baueinheit aktiviert sind - deaktivierte Eigenschaften müssten  
    im Template eventuell auf read-only gesetzt
    werden (in einer Ausbaustufe könnte es eine Aktivierungsmöglichkeit dafür geben), ebenso solche, die ihren Wert vom Elternknoten
    geerbt haben (dafür sind computed-Funktionen notwendig)==
  - Das Template arbeitet auf dem oben beschriebenen profilModelAusgewaehlteBaueinheit
  - Bei "Zurücksetzen" den Zwischen-Array neu laden aus selectedNodeTreeBaueinheiten.baueigenschaften
  - Bei "Speichern" den Array per API an das Backend senden zur Speicherung in der Datenbank und Wertevererbung an Kindknoten
  - Danach selectedNodeTreeBaueinheiten.baueigenschaften bzw. den Baum updaten
- **Strukturierung der Baueigenschaftsprofile und ihrer zugehörigen Baueigenschaftsprofilformulare**
  - Aus Flexibilitätsgründen ist es zu empfehlen, für unabhängige "Themenbereiche" jeweils eigen Profile mit zugehörigen Formularen zu definieren:
    - ==Die gebäudebezogenen Felder sollten in ein **separates Profil "Baueinheit > Gebäude" mit zugehörigem Formular "Gebäude"** ausgelagert werden (da
      Projekte auch aus mehreren Gebäuden bestehen können).==
    - Dieses Profil kann dann an den Baueinheiten für einzelne Gebäude aktiviert werden (ggf. kann ein Projekt ja aus mehreren Gebäuden bestehen)
    - ==Dasselbe gilt für das **Profil "Baueinheit > Standort" mit zugehörigem Formular "Standort"**, wo standortbezogene Angaben, z.B. Flurstück-Nummer,
      etc. verwaltet werden müssen.==
      - Dieses Profil kann dann in einfachen Projekten direkt an der Baueinheit für ein Projekt aktiviert werden, oder
        in komplexeren Projekten können (ggf. sogar mehreren) dedizierte Kindknoten "Standort" unter einem Projekt
        aktiviert werden (welche dann jeweils als Kindknoten auch mehrere "Gebäude" haben könnten)h
- Für spezielle weitere Themen(z.B. "Nachweise und Dokumente", Kapitel 10 im Word-Dokument) sollte man die bereits vorhandene Funktionalität für
  **Bauinformationen** an einer Baueinheit nutzen oder ggf. eigene Funktionen in einem Unter-Tab des Formulars "Bauvorhaben" schaffen, die es erlauben, bestimmte Bauinformationen in
  Abhängigkeit von vom Benutzer ausgewählten konkreten Optionen der obigen Aufzählungswerten zuzuordnen (z.B. die für eine bestimmte Auswahl gültigen Normen)
- Bei Auswahl und Speicherung einer konkreten **Option** der obigen **Aufzählungswerte** in Nutzungsprofilen im
  Baueigenschaftsprofilformular für "Baueinheit > Gebäude" und anderen Formularen muss ein zugehöriges
  ==**Baueigenschaftsprofil aktiviert**== werden an der Baueinheit für das jeweilige Bauprojekt, zusätzlich zum bereits aktivierten
  Profil für "Baueinheit > Bauvorhaben" (dies betrifft normalerweise mehrere/viele Profile!)
  - Beispiel: Bei Auswahl von "Hotelgebäude" für den Aufzählungswert in der Unterrubrik "Nutzungsprofile für Neubauten" von "Nutzungsprofile DGNB" muss ein
    bestimmtes Baueigenschaftsprofil für diese Auswahl aktiviert werden - bei Auswahl einer anderen
    Option muss ein anderes Profil aktiviert werden
  - ==**Achtung**==: Diese Baueigenschafsprofile sind im Allgemeinen noch nicht designed!
  - Teilweise sind erste Ansätze dafür im Word-Dokument von Erik für den Bauvorhabenbaum dokumentiert
  - In einer ersten Ausbaustufe wird die Zuordnung von Ausprägungen (d.h. Optionen) dieser
    Aufzählungswerte von Baueigenschaften im Profil für ein Bauvorhaben zu
    Baueigenschaftsprofilen hart codiert sein - siehe die Überlegungen dazu weiter unten in diesem Abschnitt
  - In einer weiteren Ausbaustufe könnte man eine durch Administratoren verwaltbare
    Zuordnung implementieren, die es erlaubt, diese Zuordnung z.B. tabellengesteuert
    zu verwalten - siehe die Überlegungen dazu weiter unten in diesem Abschnitt
    - ==**Hinweis**==: Diesen Ausbau könnte man als Teil der geplanten Erweiterungen für
      die **Automatisierung von Regelwerken und Expertenwissen** im Rahmen der angestrebten
      nächsten Förderung von BIM.click umsetzen
  - Bei Abwahl/Änderung einer solchen Option muss das ==**zugehörige Baueigenschaftsprofil
    deaktiviert**== werden
  - **[Ausbaustufe]** Zusätzlich sollte es auch möglich sein, in Abhängigkeit von der Auswahl einer konkreten Option eines bestimmten,
    systemdefinierten Aufzählungswerts in einem solchen Baueigenschaftsformular an einer Baueinheit, bestimmte ==**Bauinformationen** an der betreffenden
    Baueinheit zuzuordnen== (z.B. die für ein bestimmmtes Bundesland oder eine bestimmte Kommmune gültigen Gesetze und Verordnungen) bzw. diese
    bei Abwahl der Option diese Zuordnungen zu entfernen
  - Der Code für diese Profilaktivierung/-deaktivierung könnte folgendermaßen arbeiten:
    - Für alle relevanten Aufzählungswerte des Baueigenschaftsprofilformulars, die ein zugeordnetes Profil haben (zunächst, wie oben
      beschrieben, hart codiert!):
      - Ermitteln, ob sich der Wert des Aufzählungswerts geändert hat:
        - Wenn ja:
          - Wenn der bisherige Wert nicht undefiniert war (dies sollte eine valide Option sein im QSelect für diese Aufzählungswerte!), das
            diesem bisherigen Wert zugeordnete Profil deaktivieren
          - Den neuen Wert abspeichern
          - Wenn der neue Wert nicht undefiniert ist (dies sollte eine valide Option sein im QSelect für diese Aufzählungswerte!), das dem
            neuen Wert zugeordnete Profil aktivieren und ggf. bestimmte Bauinformationen zuordnen
        - Wenn nein:
          - Nichts zu tun bzgl. Profilaktivierung/-deaktivierung und Speicherung für diesen Wert
    - ==**Hinweis**==: Es gibt eine Diskussion, ob
      1. dabei mehrere Profile statt nur einem aktiviert werden müssen (bisher nicht entschieden)
      2. dass die Aktivierung nicht nur an der ausgewählten Baueinheit erfolgen muss, sondern
         - entweder an allen Kindern und Kindeskindern (einfachste Lösung)
         - oder an selektiv an bestimmten Kindbaueinheiten (komplexe Lösung, die weiteren Verwaltungsaufwand generieren würde)
      - 2. ist erforderlich, weil bestimmmte Sollwerte auch an Kindknoten verwendet werden müssen (z.B. in Soll-/Istwertvergleichen oder -berechnungen) und daher
           dort aktiviert sein **müssen**
    - Man könnte eventuell diese Profilaktivierung/-deaktivierung durch einen Schalter oder Button durch den Benutzer steuerbar machen -  
      allerdings ist dann nicht mehr garantiert, dass das zugehörige Profil für einen bestimmten Aufzählungswert auch
      gemäß diesem Wert auch tatsächlich aktiviert ist, weshalb dies vermutlich nicht realisiert werden sollte!
- Überlegungen zur **Zuordnung von Aufzählungswerten von Baueigenschaften zu Baueigenschaftsprofilen** (die in Abhängigkeit vom jeweiligen
  Aufzählungwert wie oben beschrieben aktiviert bzw. deaktiviert werden müssen)
  - Diese könnte anfangs "hartcodiert" erfolgen (aus der Konkatenation der Baueigenschaftsbezeichnung und dem jeweiligen Aufzählungswert wird dann
    z.B. die Bezeichnung des zugehörigen Profils generiert - diese muss dann per Konvention genau so in der Datenbank angelegt werden)
  - Dieser Code sollte in einer Backend-Funktion gekapselt werden, der dann im Endausbau ersetzt
    wird durch Code, der auf die Datenbank-Repräsentation für die unten skizzierte Zuordnungstabelle, welche die Zuordnung von Aufzählungswerten zu Profilen verwaltet, zugreift
  - Im Endausbau muss eine **flexiblere Zuordnung** vorgesehen werden, die es erlaubt, die Zuordnung am Frontend zu verwalten und im Backend zu speichern:
  - Dazu ist am Frontend z.B. eine **Tabelle** vorzusehen, die mindestens folgende Spalten enthält:
    - Die **Baueigenschaftsbezeichnung** (hier sollten nur Baueigenschaften vom Wertetyp "Aufzählungswert" angezeigt werden)
    - Die **Optionen** für den Auzählungswert für eine bestimmte Baueigenschaft (d.h. mehrere Zeilen mit den Optionen pro Aufzählungswert)
    - Das für diese Zeile zugeordnete **Baueigenschaftsprofil** (z.B. direkt per QSelect mit Dropdown-Menü in dieser Tabellenspalte - dort müssen dann alle Profile im Dropdown
      angezeigt werden - eines davon kann dann als zugeordnetes Profil ausgewählt werden)
    - **[Ausbaustufe]** Die dieser Zeile zugeordneten **Bauinformationen** (z.B. per Mehrfachauswahl aus der Menge aller Bauinformationen,
      oder über ein neues Konstrukt **"Bauinformationsprofil"**, das es erlaubt, zusammengehörige Bauinformationen (analog
      zu Baueigenschaftsprofilen für Baueigenschaften) gemeinsam zu verwalten
      - Dazu müssen passende Aktivierungs-/Deaktivierungsmethoden implementiert werden (APIs):
      - Wenn z.B. ein Bauinformationsprofil für eine bestimmte Nachhaltigkeitskategorie (steuernder Aufzählungswert) aktiviert werden soll:
        - Die zugehörigen Bauinformationen an den Bauinformationsprofilen für alle übrigen Nachhaltigkeitskategorien alle aus dem Array der
          zugeordneten Bauinformationen an der Baueinheit entfernen (Pull)
        - Die zugehörigen Bauinformationen an den Bauinformationsprofilen für die ausgewählte Nachhaltigkeitskategorie dem Array der
          zugeordneten Bauinformationen an der Baueinheit hinzufügen (Push)
  - ==**Hinweis**==: Den Ausbau der hier beschriebenen Funktionaliäten könnte man als Teil der geplanten Erweiterungen für
    die **Automatisierung von Regelwerken und Expertenwissen** im Rahmen der angestrebten
    nächsten Förderung von BIM.click umsetzen

---

#### **[Epic 6]** ==**[WORK]**== **Design-Überlegungen zum automatischen Enablen/Disablen von Baueigenschaftsprofilformularen und verwandten Themen**

- Dies betrifft die Backlog Items **#501** bis **#506**
- Es ist wünschenswert, dass bei Auswahl einer Baueinheit oder eines Baustoffs in den Bäumen in den Tableisten für die Profilformulare jeweils die
  zu dem ausgewählten Knoten "passenden" Profilformulare enabled und die nicht passenden disabled werden
- Diese zukünftige Steuerung erfordert bestimmte Erweiterungen, die im Folgenden disktutiert werden
- ==Ursprünglich war angedacht, dass bei im Pfad aktivierten Baueigenschaftsprofilen das zugehörige Baueigenschaftsprofilformular per Default nur
  am jeweils **untersten** Knoten in einem solchen Pfad angezeigt wird.== Das Ziel dabei ist, den normalen Benutzer nicht mit zu vielen Auswahlmöglichkeiten in der Tableiste zu überfordern,
  und ihm dabei Formulare anzuzeigen, bei denen bei Eingabe von Werten in Eingabefeldern wegen der Vererbungsregel auch die Werte in den
  Kindbaueinheiten (sofern dort aktiviert) eventuell unbeabsichtigt überschrieben werden
  (eventuell in Einstellungen > Expert Mode benutzerspezifisch einstellbar bzw. für Administratoren anderes eingestellt?)
- Dies könnte jedoch daurch invalidiert, wenn wegen der Notwendigkeit, auf Werte, insbesondere Sollwerte aus übergeordneten Baueinheiten im
  Bauvorhabenbaum zuzugreifen, die meisten Profile auch an allen Kindknoten aktiviert werden müssen (aktuell bekannte Ausnahme: "Baueinheit > Bauvorhaben")
  - Dies wäre bei **Alternative 2** in Backlog Item **#506** notwendig
  - ==Aktuell wird jedoch **Alternative 1** (gemeinsame Baueigenschaften zwischen Profilen) bevorzugt, bei der keine implizite Profilaktivierung auch an Kindknoten notwendig ist==
- Dazu folgende Überlegungen:
  1. Zu jedem (systemdefinierten) Profil gibt es ein eindeutig zugeordnetes **Profilformular**, das bisher auch identisch benannt ist wie das Profil
     - Beispiel: Profil „Standort“ – Profilformular „Standort“
     - Das kann in der ersten Stufe so bleiben
     - Manche Profile haben zusätzlich, gesteuert durch bestimmte Aufzählungswerte, **„Profilvarianten“**, um selektiv bestimmte Vorgabewerte in
       Abhängigkeit von Optionen dieser Aufzählngswerte eintragen zu können (**#502**)
  2. Jedes Profil kann, Stand heute, überall im Baustoff- oder Bauvorhabenbaum **per Benutzeraktion aktiviert** werden
     - Auch das kann in der ersten Stufe so bleiben
     - Später wollen wir aus Komfortgründen das Anlegen einer Kindbaueinheit und das Aktivieren eines bestimmten Profils
       zu einer **gemeinsamen Aktion** verbinden (Kontextmenü an Baueinheit im Bauvorhabenbaum), z.B. „Neue Kindbaueinheitfür Standort anlegen" (**#504**))
     - In einer noch späteren Stufe wollen wir das bisher völlig „freie“ Anlegen von Baueinheiten und davon unabhängige Aktivieren von Profilen
       eventuell einschränken auf eine mehr **präskriptives**, d.h. mehr **opinionated** geartetes Gebäudemodell
     - ==Das erfordert ein eigenes Konzept und Konstrukt für **„Typen“ von Baueinheiten**, von denen mannche obligatorisch in einem Modell sind,
       manche eventuell weggelassen bzw. mit Elternknoten zusammengelegt werden können, und eine Festlegung, welche Typen unter welchen Typen von Elternknoten hängen dürfen - das muss in einer Tabelle erst festgelegt werden==
       - Die Ausgangshierarchie ist dabei "Bauvorhaben" > "Standort" > "Gebäude" > "Gebäudeteil" > "Geschoss" > "Raum" > "Boden" / "Wand" > "Schicht""
       - Dazu kommen allerdings besondere "parallele" Strukturen, die nicht in das obige Baumschema passen, z.B. für Außenwände, Fassaden, etc.
         (diese sind noch nicht designed)
       - Es ist zusätzlich zu berücksichtigen, dass es auf vielen Ebenen die Anforderung nach **Gruppen** geben wird
         (Gebäudegruppen für z.B. "3 Doppelhäuser", Geschossgruppen für z.B. "1.-3. Obergeschoss", Raumzonen für z.B. für "Büroräume 1. Etage")
       - Diese Gruppen haben vermutlich in erster Näherung dieselben Profile wie ihre Kindbaueinheiten, eventuell noch mit einem Aufzählungswert zur
         Unterscheidung der Baueinheit in einer Gruppe
       - Sie können zur Vererbung identischer Werte an ihre Kindbaueinheiten verwendet werden
  3. Wenn ein Profil **an einer Baueinheit aktiviert** wird, wird es, aus Konsistenzgründen mit den Baueigenschaften, auch
     **an allen Elternknoten im Pfad** aktiviert:
     - Das sollte so bleiben
     - Das Profil wird dann auch an allen Elternbaueinheiten in deren Array „zugeordneteBaueigenschaftsProfile“ aufgenommen
  4. Weil wir manche Eigenschaften und deren Werte weiter unten im Baum an Kindbaueinheiten benötigen (z.B. als Sollwerte), müssten wir bei Alternative 2
     im Backlog Item **#506** die an einer Baueinheit aktivierten Profile ebenfalls **an allen Kindbaueinheiten aktivieren**:
     a) bei der Profilaktivierung an den vorhandenen Kindbaueinheiten
     b) bei der Neuanlage von Kindbaueinheiten
  5. Deshalb müssten wir uns bei Alterative 2 merken, welche Profile an einer Baueinheit aktiviert wurden – dies tun wir heute schon in dem Array
     „zugeordneteBaueigenschaftsProfile“ an jeder Baueinheit.
  6. Um ein **selektives Enabling/Disabling** des zu einem Baueigenschaftsprofil gehörenden **Baueigenschaftsprofilformulars** zu
     steuern, müssten wir bei Alternative 2 und je
     nach Ausbaustufe von **#505** auch bei Alternative 1 ein zusätzliches **Flag** einführen, welches anzeigt, dass ein Profil **durch Benutzeraktion** an einer bestimmten
     Baueinheit **aktiviert** wurde, und eben nicht durch die damit vom System durchgeführte obige, automatische „Aktivierung im Pfad“ (#3.) und
     künftige „Aktivierung der Kinder“ (#4.).
     - Damit dieses Flag einfach verwendet werden kann (computed-Abfrage zum Enabling/Disabling der passenden Baueigenschaftsproiflformulare)
       sollte es mit im **Array zugeordneteBaueigenschaftsProfile** an der Baueinheit gespeichert werden. Dieser ist dann kein Array mehr von ObjectIds, sondern von Objekten, die jeweils
       ein Feld mit der Id zum zugeordneten Profil, der Profilbezeichnung, und einem String, der die Aktion, die zum Aktivieren geführt hat, enthalten.
     - Davon betroffen sind:
       - baueigenschafts-profile-model.js
         - Bisher nur das Feld baueigenschaftsProfilBezeichnung **ohne** Model-Änderung hinzugefügt. ==**[TODO]**== Das weitere Flag erfordert
           dann eine Model-Änderung in dieser File.
       - baueinheiten.controller.js
         - Update 25.12.2020: Dort bereits das Feld baueigenschaftsProfilBezeichnung per populate hinzugefügt, noch ohne Model-Änderung!
           Mit diesem Feld kann im Frontend geprüft werden, ob ein Profil aktiviert ist, mit dessen Bezeichnung. Implementiert in
           Methode bauvorhabenBaueigenschaftsProfilIstAktiviertAnNodeTreeBaueinheiten(node) in baueinheiten.vue
       - baueigenschafts-profile-aktivierungslogik.js (keine Änderungen, solange es nur über populate implementiert wird)
       - baueigenschafts-profile-tab-tab-baustoffe-und-baueinheiten.vue (prüft mittels des Arrays, ob das Profil aktiviert ist)
         - Update 25.12.2020: Dort bereits das Feld baueigenschaftsProfilBezeichnung per populate hinzugefügt, noch ohne Model-Änderung! Prüfung, ob
           ein Profil im Array zugeordneteBaueigenschaftsProfile enthalten ist, entsprechend angepasst.
       - baueinheit-bodenaufbau-baueigenschafts-profil-formular.vue (prüft mittels des Arrays, ob das Profil aktiviert ist)
         - Update 25.12.2020: Dort bereits das Feld baueigenschaftsProfilBezeichnung per populate hinzugefügt, noch ohne Model-Änderung! Prüfung, ob
           ein Profil im Array zugeordneteBaueigenschaftsProfile enthalten ist, entsprechend angepasst.
       - bodenaufbau-development-versiom-12-20.vue (prüft mittels des Arrays, ob das Profil aktiviert ist)
         - Update 25.12.2020: Dort bereits das Feld baueigenschaftsProfilBezeichnung per populate hinzugefügt, noch ohne Model-Änderung! Prüfung, ob
           ein Profil im Array zugeordneteBaueigenschaftsProfile enthalten ist, entsprechend angepasst.
       - bodenaufbau-gesamt-development-12-20.vue (prüft mittels des Arrays, ob das Profil aktiviert ist)
         - Update 25.12.2020: Dort bereits das Feld baueigenschaftsProfilBezeichnung per populate hinzugefügt, noch ohne Model-Änderung! Prüfung, ob
           ein Profil im Array zugeordneteBaueigenschaftsProfile enthalten ist, entsprechend angepasst.
  7. Mit Hilfe dieses Flags (unter der Annahme, dass im Normalfall nur ein Profil pro Baueinheit vom Benutzer aktiviert würde), würde bei Alternative 2 und je
     nach Ausbaustufe von **#505** auch bei Alternative 1 "by Default" für
     **reguläre Benutzer** an einer Baueinheit das passende Formular in der Tableiste enabled werden, wenn
     dieses Flag gesetzt ist - es könnte eventuell sogar automatisch als Erstes angezeigt werden bei Anwahl des Knotens im Baum
     - Hinweis: Bei Mehrfachaktivierung von Profilen (z.B. Profile "Baueinheit > Bauvorhaben", "Baueinheit > Standort" und "Baueinheit > Gebäude"
       gleichzeitig aktiviert an einer Baueinheit) kann natürlich nicht automatisch ein bestimmtes Profil angezeigt werden, es sei denn,
       man priorisiert diese nach einem bestimmten Schema - diese "Mehrfachaktivierung" ist heute möglich und eventuell sogar gewünscht,
       wenn es um einfache Projekte geht (1 Bauvorhaben/1 Standort/1 Gebäude zu einer Baueinheit zusammengefasst)
  8. ==Bei Alternative 1 **(gemeinsame Baueigenschaften zwischen Profilen)** wird dieses Flag für Backlog Item **#505** je nach dessen Ausbaustufe ebenfalls erforderlich.==
     - Wenn für #505 das entsprechende
       Baueigenschaftsprofilformular selektiv am **jeweils untersten Knoten im Pfad,** an dem das zugehörige Baueigenschaftsprofil aktiviert ist, enabled werden soll,
       muss dies über dieses Flag gesteuert werden (ohne dieses Flag müsste man erst die Kindknoten laden, um festzustellen, ob an denen ebenfalls das
       betreffende Baueigenschaftsprofil aktiviert ist, d.h. der unterste Knoten wäre dann "weiter unten").
     - An Kindbaueinheiten weiter unten im Baum wäre bei Alternative 1 das zugehörige Profil allerdings dann nicht implizit aktiviert.
       Das Baueigenschaftsprofilformular könnte an diesen Knoten auch ohne das Flag disabled bleiben (d.h. dieses ist wirklich nur erforderlich für
       das noch selektivere Enablen nur des jeweils untersten Knotens im Pfad, an dem das zugehörige Baueigenschaftsprofil aktiviert ist).
     - ==Variante:== Man könnte stattdessen auch am Backend in die Kindknoten schauen beim Laden eines Knotens, welche Profile dort aktiviert sind,
       und so das Flag dynamisch berechnen, statt es bei der Profilaktivierung zu setzen - diese Variante performed aber schlechter.
  9. Für **fortgeschrittene Benutzer** könnte man auch Formulare auf höheren oder tieferen Levels im Baum freischalten
     - Auf höheren Levels kann der fortgeschrittene Benutzer dann bewusst Werte setzen, die Werte in den Kindbaueinheiten ggf. überschreiben
       Auf tieferen Levels tritt eventuell das Phänomen auf, dass ein Eingabefeld deaktiviert ist, weil weiter oben definiert und deshalb ererbt
       - Dort käme eventuell der Button zum Einsatz, der in **#516** im Backlog beschrieben ist

---

#### **[Epic 7]** ==**[WORK]**== ==Design für die **Baueigenschaftsprofilformulare für Schichtaufbauten und Schichten** (d.h. Bodenaufbauten und Wandaufbauten aus einzelnen Schichten)==

- ==**[Selektiert]**== ==**Variante A:** **Schichtaufbau aus mehreren Baueinheiten**==
  - ==**Hinweis:**== Diese Variante A, bei der Schichtaufbauten aus **mehreren Kindbaueinheiten** unter einer Elternbaueinheit zusammengesetzt würden, hat Vor- und Nachteile:
  - [-] Variante A kann nicht über ein einzelnes Baueigenschaftsprofilformular an einer einzelnen Baueinheit realisiert werden, sondern erfordert baueinheitsübergreifende Baueigenschaftsprofilformulare, die
    komplexer zu verwalten sind - man bräuchte sowohl ein (gemeinsames oder individuelles?) Formular für jede Schicht (d.h. jeder Kindbaueinheit), als auch ein Formular für den Schichtaufbau (d.h. der Elternbaueinheit), die aber miteinander verzahnt werden müssen. Auch die beteiligten Baueigenschaften sind dann über mehrere Baueinheiten verteilt.
  - [-] Sie erfordert die Einführung einer Reihenfolgebeziehung unter den Kindbaueinheiten einer Baueinheit (die allerdings eventuell sowieso später gebraucht wird)
  - [+] Sie könnte vorhandene Funktionen nutzen, wie z.B. Referenzen an einer Baueinheit (= Schicht) auf Baustoffe oder Bauinformationen, ohne dass dafür neue Felder in Baueigenschaften (siehe Variante B
    unten) nötig sind
  - [+] Sie fügt sich konsistent in das Informationsmodell für Baueinheiten ein, während Variante B eher ein Workaround ist, bei dem Schichten (ähnlich wie in Revit) keine first Class Citizens (d.h.
    reguläre Baueinheiten) sind
  - Diese Variante A würde grob skizziert so funktionieren:
    - Es gibt ein (möglichst gemeinsames, eventuell aber auch individuelles) Baueigenschaftsprofil für jede **einzelne Schicht** (z.B. "Bodenaufbau: Schicht"), das an jeder Kindbaueinheit unter der Elternbaueinheit für den Schichtaufbau aktiviert wird
    - Damit gekoppelt ist ein dazu passendes Baueigenschaftsprofilformular für das eine **einzelne Schicht** im Schichtaufbau
      - Dort entsprechende Felder für alle Baueigenschaften, die zur Schicht gehören
      - Zur Bestimmmung, welche Baueigenschaften das sind, siehe Variante B unten - die Bezeichnungsfelder für die Schichten würden in Variante A allerdings durch die Baueinheitsbezeichnung ersetzt werden!
      - Dieses Formular könnte in einer ersten Stufe eventuell für alle Arten von Schichten gleich sein, um die Implementierung zu vereinfachen
    - Es gibt zusätzlich ein Baueigenschaftsprofil und ein zugehöriges Baueigenschaftsprofilformular für den **Schichtaufbau als Ganzes**
      - Dort in einem ersten Tab (z.B: Schichtaufbau: Eigenschaften") entsprechende Felder für alle die Baueigenschaften, die zum Schichtaufbau als Ganzes gehören
        - Zur Bestimmmung, welche Baueigenschaften das sind, siehe Variante B unten - das Bezeichnungsfeld würde in Variante A allerdings durch die Baueinheitsbezeichnung ersetzt werden!
      - Dieses enthält dann unter anderem auch ein computed-Feld zur Berechnung der Gesamtschichtdicke aus den Schichtdicken der einzelnen Schichten
      - Dazu müssen für solche besonderen Baueigenschaftsprofilformulare zur korrekten Funktion bestimmte **Annahmen/Assertions** eingehalten werden:
        - Die Kindbaueinheiten der Baueinheit, an der dieses Baueigenschaftsformular aktiviert ist, müssen alle das Baueigenschaftsprofilformular für eine Schicht aktiviert haben
        - Dann haben sie das notwendige Feld für die Dicke der Schicht aktiviert, aus dem dann das computed-Feld für die Gesamtschichtdicke im Code für das Baueigenschaftsprofilformular des
          Schichtaufbaus als Ganzes berechnet werden kann
        - [DEFER} In einer Ausbaustufe könnte dies eventuell über eine neue Eltern-/Kindbeziehung in den Baueigenschaftsprofilen unterstützt werden
          - Dass Baueigenschaftsprofil für eine Schicht wäre dann ein Kindprofil des Elternprofils für den Schichtaufbau als Ganzes
          - Wenn das Elternprofil aktivert würde, würde das System automatisch das Kindprofil an allen Kindbaueinheiten mit aktivieren
          - Dies müsste allerdings auch beim Neu-Einfügen von Kindern erfolgen!
      - Die **Manipulation der Schichten (Hinzufügen/Entfernen/eventuell Verschieben)** müsste über ein zweites, dediziertes Tab im Baueigenschaftsprofilformular für den Schichtaufbau als Ganzes erfolgen
        - Dieses könnte im Aufbau an das heute schon vorhandenen Formular "Bodenaufbau" angelehnt werden
        - Mit diesem Formular müsste die Reihenfolge der Kindbaueinheiten (Schichten) editiert werden
      - Für die Unterstützung einer **Reihenfolge in den Kindbaueinheiten** für die einzelnen Schichten unter der Elternbaueinheit für den gesamten Schichtgaufbau müsste das Backend und Frontend erweitert
        werden:
        - Dies kann über ein Flag an der Elternbaueinheit gesteuert werden
        - Dieses ist im Model auch bereits vorgesehen: Verzweigungstypen AGGREGATION_VERTIKAL_ANGEORDNET (für Böden) und AGGREGATION_HORIZONTAL_ANGEORDNET (für Wände) - wenn diese gesetzt sind, gilt eine
          Reihenfolge unter den Kindbaueinheiten
        - Das Einfügen und Entfernen von Kindbaueinheiten (d.h. Schichten) unter solchen speziellen Elternknoten mit diesen Verzweigungstypen müsste die Reihenfolge unterstützen
        - Eventuell könnte dies in einer ersten Stufe zunächst nur über das obige spezielle Formular für den gesamten Schichtaufbau unterstützt werden, nicht durch das reguläre Markieren und Kopieren/
          Verschieben von Zweigen im Baum (welches an Baueinheiten für Schichtaufbauten, die an obigen Verzweigungstypen erkennbar sind, disabled werden könnte, um Konflikte zu vermeiden)
    - ==**Achtung:**== Bei Variante A müsste man in der ersten Ausbaustufe manuell vom Formular für
      den Schichtaufbau als Ganzes zu den Formularen für die einzelnen Schichten navigieren, indem man im Bauvorhabenbaum die Schicht anwählt - dies könnte in einer Komfortstufe noch
      verbessert werden, indem zusätzlicher spezieller Navigations-Code in das Baueigenschaftsprofilformular für den Schichtaufbau als Ganzes eingebaut wird, der es erlaubt, direkt (ohne
      Umweg über den Bauvorahabenbaum) aus diesem Formular zu den Formularen für die Schichten zu navigieren (und eventuell auch wieder zurück), oder indem das Formular für den Schichtaufbau
      als Ganzes gleich das Formular zum Editing der einzelnen Schichten mit integriert (wie bei Variante B)
- ==**[Deselektiert]**== ==**Variante B:** **Schichtaufbau als Baueigenschaftsprofilformular an nur einer Baueinheit**==
  - Man könnte einen Schichtaufbau (z.B. für einen Fußboden) auch als **Baueigenschaftsprofilformular an nur einer Baueinheit** (z.B. verknüpft mit einem Baueigenschaftsprofil "Baueinheit > Bodenaufbau") implementieren
  - Dann wären die Schichten für diesen Bodenaufbau keine eigenen Baueinheiten (sonst müsste es wie in Varainte A komplexere Baueigenschaftsprofilformulare geben, die mehrere Baueinheiten "überspannen")
  - Sobald man das Baueigenschaftsprofil für "Bodenaufbau" an einer Baueinheit aktiviert, wird dann dieses zugehörige Baueigenschaftsprofilformular für den "Bodenaufbau" angezeigt in den Tabs für diese Baueinheit (analog zum bereits vorhandenen vorläufigen Formular für "Bauvorhaben (Preview)")
  - Das Baueigenschaftsprofil für "Bodenaufbau" enthält dann bestimmte Baueigenschaften für den Schichtaufbau, die in diesem Baueigenschaftsprofilformular editiert werden können, und die im Folgenden beschrieben werden
  - **Für den Schichtaufbau als Ganzes relevante Baueigenschaften** (erstes Tab im Baueigenschaftsformular für den "Bodenaufbau"):
    - ==**Hinweis**==: Die Baueigenschaften in diesem Abschnitt sind an das Bauteildatenblatt aus BTKBuilder "BDF_20180815_113900.xlsx" angelehnt
    - Schichtaufbaubezeichnung (nur bei Variante B, in Variante A wird dies in der Baueinheitsbezeichnung verwaltet)
    - (Gesamt-)Schichtdicke (Kennwert) - computed Property aus den Schichtdicken der einzelnen Schichten im Schichtaufbau
    - Aktuelle Anzahl der Schichten im Schichtaufbau
      - ==**Hinweise:**==
        - Es muss überlegt werden, wieviele Schichten maximal erlaubt sind (siehe unten)
        - Diese Zahl muss dynamisch änderbar sein durch Löschen bzw. Einfügen von Schichten
        - Welche Schichten in einem konkreten Schichtaufbau ausgewählt bzw. abgewählt sind, könnte auch über einen Aufzählungswert am Schichtaufbau oder über Boolean-Felder an der jeweiligen Schicht gesteuert
          werden
        - Es muss überlegt werden, wie z.B. mit Fliese/Fugenmörtel umgegangen wird (2 Materialien in einer Schicht, eventuell per Mehrfachauswahl von Baustoffen an dieser Schicht - siehe unten)
          - Dies wird vorläufig dadurch gelöst, indem für eine solche Schicht 2 verschiedene Baustoffe zugeordnet werden (Fliese und Fugenmörtel), ansonsten wird
            es wie eine normale Schicht behandelt
    - Nutzlasten
      - Gleichmäßig verteilte Nutzlast
      - Einzellast
    - Wärmedurchgangskoeffizient nach DIN EN ISO 6946
    - Bewertetes Schalldämmmaß
    - Bewerteter Norm-Trittschallpegel, horizontale Übertragung
    - Bewerteter Norm-Trittschallpegel, vertikale Übertragung nach oben
    - Bewerteter Norm-Trittschallpegel, vertikale Übertragung nach unten
  - **Für eine Schicht im Schichtaufbau spezifische Baueigenschaften** (zweites Tab im Baueigenschaftsformular für den "Bodenaufbau", der Inhalt sollte wechseln je nach Auswahl einer Schicht im Schichtaufbau
    links im Tab)
    - **An allen Schichten vorhandene Baueigenschaften:**
      - Schichtbezeichnung
        - Nur bei Variante B, in Variante A wird dies in der Baueinheitsbezeichnung verwaltet
        - In Variante B könnte diese eventuell auch fix, d.h. nicht änderbar durch den Benutzer sein, gemäß den unten vorgeschlagenen Schichten
        - Beispiel:
          - Bezeichnung der Baueigenschaft: "Bodenbelag: Schichtbezeichnung"
          - Wertetyp der Baueigenschaft: Bezeichnungswert
          - Wert der Baueigenschaft: "Bodenbelag" (fix?) - diese bezeichnet dann quasi den "Schichttyp" innerhalb der n unterstützten Schichten (n kann nach derzeitigem Stand der Erkenntnis maximal 14 sein -
            siehe unten)
      - Schichtdicke (Kennwert)
      - Schichtindex (Kennwert für den aktuellen Wert des Indexes für diese Schicht im geordneten Array für den Schichtaufbau, der im
        Baueigenschaftsprofilformular visuell angezeigt wird, mit Möglichkeit zum
        Verschieben/Löschen/Einfügen von Schichten)
        - ==**Hinweis:** Eventuell sollte dieses Feld besser als neues Feld indexInAggregation in das Model der Baueinheit mit aufgenommen werden, falls die
          Elternbaueinheit einen enstprechenden Verzweigungstypen AGGREGATION_VERTIKAL_ANGEORDNET oder AGGREGATION_HORIZONTAL_ANGEORDNET hat!==
      - Klassifizierung nach Norm (BTKBuilder) - dies entspricht einer zugeordneten Bauinformation in BIM.click!
        - ==**Achtung:**==
          - Dies müsste in Variante B realisiert werden über eine Erweiterung der wertbezogenen Felder bzw. Wertetypen für Baueigenschaften, über ein zusätzliches ==**wertbezogenes**== Feld "zugeordnete  
            Bauinformation", welches es per QSelect erlaubt, der wertbezogenen Baueigenschaft eine Bauinformation zuzordnen (so wie es typbezogen bereits möglich ist). Dafür könnte dann eines der obigen
            Felder benutzt werden, oder man reserviert dafür eine schichtspezifische dedizierte Baueigenschaft (z.B. "Fußbodenaufbau Bodenbelag: Zugeordnete Norm"), deren Typ z.B.
            "Bezeichnungswert" sein könnte, und an der die jeweilige Bauinformation als Referenz eingetragen werden kann über ein
            QSelect-Feld im Baueigenschaftsprofilformular - der eigentliche Bezeichnungswert dieses Felds könnte dann eventuell sogar leer bleiben!
          - Die Verwendung der vorhandenen Referenz auf eine Bauinformation in den typbezogenen Feldern einer Baueigenschaft ist dafür niciht geeignet, da man für dieselbe Schicht in
            verschiedenen Baueinheiten unterschiedliche Bauinformationen eintragen können möchte!
      - Produktbeispiel (BTKBuilder) - diese entspricht einem zugeordneten Baustoff in BIM.click!
        - ==**Achtung:**==
          - Dies ist in Variante B heute ebenfalls noch nicht unterstützt, da nur Baueinheiten (mehrere) zugeordnete Baustoffe haben können. Hier könnte man eventuell ein zusätzliches ==**wertbezogenes**==
            Feld "zugeordnete(r) Baustoff(e)"
            an Baueigenschaften einführen, welches es per QSelect erlaubt, einen einzelnen oder mehrere (z.B. Fliesen und Kleber) Baustoff(e) zuzuordnen, analog zum Feld "zugeordnete Bauinformation". Dies müsste zur Auswahl von Baustoffen jedoch ein
            nested QSelect sein - siehe https://codepen.io/mickey58/pen/oNjaQQR. Allerdings hat das Nesting im Baustoffbaum eine dynamische Tiefe - die aktuellen Stammdaten haben bis zu 8 Ebenen von Baustoffen
            - so dass man hier ein Nesting der QExpansion Items/QItems per v-fors für eine Tiefe > 8 im Template für das nested QSelect implementieren müsste, wahrscheinlich analog zum Template für das
              Dokumentations-Inhaltsverzeichnis in myLayout.vue - die vorhandene Controller-Methode readExtraktBaustoffe liefert bereits die für ein solches nested QSelect benötigten Daten als verschachtelte
              Baumstruktur mit children-Feldern zurück!
          - Dann könnte man dafür ebenfalls eine eigene
            Baueigenschaft anlegen (z.B. "Fußbodenaufbau Schicht 1: Zugeordneter Baustoff"), deren Typ z.B. "Bezeichnungswert" sein könnte, und an der der/die jeweiligen Baustoff als Referenz in ein neues Feld
            baustoff im Model für die Baueigenschaften eingetragen werden kann über ein nested QSelect-Feld (bei Mehrfachauswahl mit QChips) im Baueigenschaftsprofilformular - der eigentliche Bezeichnungswert könnte dabei eventuell sogar leer
            bleiben!
      - ==**Achtung:**==
        - Da jede Schicht individuelle solche/obige Felder haben muss, müssten die Bezeichnungen dieser an allen Schichten vorhandenen Baueigenschaften mit einem individuellen Präfix zu Identifizierung der
          Schicht unterschieden werden (z.B. "Schicht n: Schichtbezeichnung" oder "Bodenbelag: Schichtbezeichnung")
        - Wenn bestimmte Schichten allerdings aus dem Schichtaufbau entfernt oder im Schichtaufbau verschoben würden, würden diese Eigenschaften ihre Bezeichnung behalten, daher erscheint es sinnvoller,
          keine Schichtnummerierung als Präfix zu wählen, sondern einen passenden Begriff
        - Die tatsächliche Zuordnung der Schicht im Schichtaufbau müsste über obiges Feld Schichtindex im Code für das Baueigenschaftsformular erfolgen
    - **Weitere schichtspezifische Baueigenschaften**
      - Siehe dafür die Excel-Ausgaben von BTKBuilder(z.B. BDF_20180815_113900.xlsx)
      - (Schicht 1) **Bodenbelag**
        - ==**Achtung:**== In der obersten Schicht (Belag) müssen verschiedene Bodenbeläge (z.B. Fliesen, Parkett, ...) unterstützt werden!
        - Daher muss hier ein Feld (Aufzählungswert mit Mehrfachauswahl?) vorgesehen werden, mit dem unterschieden werden kann, welche Art von Belag verbaut werden soll (Fliesen, Parkett, ...)
        - ==**Achtung:**== Es gibt außerdem den Sonderfall, dass in dieser Schicht 2 Materialien (z.B. Fliesen und Fugenmörtel) verbaut werden können! Ist eventuell Priorität 3?
      - (Schicht 2) **Kleber**
        - TBD
        - Ist optional (z.B. ist diese Schicht nicht vorhanden bei einem schwimmenden Belag)
      - (Schichten 3 -7) **TBD**
        - TBD
        - Ist optional
        - ==**Achtung:**==
          - Bei schwimmmend verlegten Belägen sind hier auch **Trittschalldämmungen** (z.B. aus Kork) möglich, sowie eventuell darunter eine zusätzliche PE-Folie als **Dampfbremse**!
            - Wenn diese separate Schichten werden, muss deren Bezeichnung unterschieden werden von der weiter unten vorkommenden Trittschalldämmung bzw. Sperrschicht
            - Z.B.: "Trittschalldämmung unter Belag" vs. "Trittschalldämmung unter Estrich", "Sperrschicht unter Belag" vs. "Sperrschicht unter Estricih
          - Daneben gibt es bei Renovierungen hier auch **Bodenausgleichsmassen** zur Nivellierung und (unter diesen) **Grundierungen**!
          - Wenn der Estrich Risse hat, müssen diese (auch bei Anwendung von Bodenausgleichsmassen) zunächst mit einer **rissüberbrückenden Dichtschlämme** geschlossen werden!
          - ==Es müssen statt einer Schicht 3 hier also ==**sogar maximal 5 Schichten 3 - 7**== vorgesehen werden!==
      - (Schicht 8) **Estrich**
        - Estrich-Biegezugfestigkeitsklasse (Aufzählungswert)
        - Heizestrich-Bauart (Aufzählungswert)
        - Dicke der Heizrohre (Kennwert)
        - Sonstige Eigenschaften: TBD (Schwimmender Estrich S, Heizestrich H, CAlciumsulfat-Fließestrich)
      - (Schicht 9) **Trennschicht/Trennlage**
        - z.B. PE-Folie
        - TBD
      - (Schicht 10) **Trittschalldämmung**
        - Wärmeleitfähigkeit Bemessungswert (Kennwert)
        - Dynamische Steifigkeit (Kennwert)
        - Zulässige Flächenlast (Kennwert)
        - Zusammendrückbarkeit (Kennwert)
      - (Schicht 11) **Wärmedämmung (mit Platz für Rohre)**
        - Wärmeleitfähigkeit Bemessungswert (Kennwert)
        - Druckspannung bei 10% Stauchung
      - (Schicht 12) **Sperrschicht**
        - TBD
        - Ist optional
      - (Schicht 13) **Rohdecke**
        - z.B. Stahlbetondecke
        - Rohdichte (Kennwert)
        - Bemessungswärmeleitfähigkeit (Kennwert)
      - (Schicht 14) **Unterdecke**
        - TBD
        - Ist optional
  - ==**Achtung:**== Es muss überlegt werden, wie flexibel oder starr obiges Schichtmodell sein soll:
    - Einfügen eines "Schichttyps" an einer bestimmten Stelle im Schichtaufbau (bis zum Maximum erlaubter Schichten)?
      - Wegen der oben beschriebenen "starren" Benennung der Baueigenschaften für jede Schicht in Variante B ist es nicht ohne Weiteres möglich, z.B. einen weiteren Belag einzufügen, wenn dieser schon vorhanden ist!
      - "Belag" und die meisten anderen Schichten sollte allerdings im Schichtaufbau sinnvollerweise auch nur einmal vorkommen!
      - Lediglich gewisse Sperrschichten könnten mehrfach vorkommen, allerdings können diese begrifflich unterschieden werden
      - Insofern könnte in einem internen **Aufzählungsfeld am gesamten Schichtaufbau** gespeichert werden, welche Schichten aus den maximal möglichen ausgewählt sind und welche nicht!
      - Nur solche Schichten könnten dann eingefügt werden, welche noch nicht vorhanden sind in diesem Aufzählungsfeld!
      - Alternativ könnte man dies auch durch **Baueigenschaften vom Wertetyp "Wahrheitswert"** an jeder Schicht steuern, die anzeigen, ob die betreffende Schicht im Schichtaufbau ausgewählt ist oder nicht
    - Beliebige Reihenfolge aller Schichten (durch Verschieben einzelner Schichten bzw. durch Einfügen/Löschen von Schichten im Schichtaufbau)
      - Dies könnte in einer ersten Implementierungsstufe beliebig erlaubt sein, d.h. dem Benutzer überlassen werden
      - Alternativ könnte man auch einen festen Aufbau (bzgl. der Reihenfolge) vorsehen und nur erlauben, dass bestimmte Schichten darin ab- oder ausgewählt werden können
- ==**Bewertung der beiden Varianten**==
  - ==**Variante A** ist die tragfähigere, von uns gewählte Lösung==
- ==**Implementierungsplan für Variante A**==
  - **[DONE]** (Prio 1) Ein Baueigenschaftsprofil für einen Schichtaufbau als Ganzes anlegen in back-end-server.js (mit Baueigenschaften laut obigem Design): "Profil für Schichtaufbau" - bisher nur in lokaler Version
  - **[DONE]** (Prio 1) Ein (gemeinsames) Baueigenschaftsprofil für eine (einzelne) Schicht anlegen in back-end-server.js (mit Baueigenschaften laut obigem
    Design): "Profil für Schicht" - bisher nur in lokaler Version
  - **[DONE]** (Prio 1) Jeweils einen Test-Schichtaufbau anlegen in back-end-server-js, in Vorlagen für Baueinheiten/Musteretage/Musterraum 1/Bodenaufbau und in
    Einstein-Schule/Obergeschoss/Klassenraum 1/Bodenaufbau, Verzweigungstyp dieser Baueinheiten: "AGGREGATION_VERTIKAL_ANGEORDNET", mit aktiviertem obigen Baueigenschaftsprofil für den Schichtaufbau an diesen Baueinheiten für den Bodenaufbau
  - **[DONE]** (Prio 1) 7-14 (aktuell 9) einzelne Testschichten als Baueinheiten anlegen in back-end-server-js, unter Vorlagen für Baueinheiten und in Einstein-Schule, jeweils
    unter obigem Test-Schichtaufbau, jeweils mit obigem Baueigenschaftsprofil für eine Schicht aktiviert an jeder einzelnen Schicht
  - ==**[DONE]**== (Prio 1) Neues Feld im Model für Baueinheiten: indexInAggregation für die Verwaltung der Position der Baueinheit im Array bei Ordnung
  - ==**[DONE]**== (Prio 2) In baueinheiten.controller.js: Methoden für die Verwaltung der Anordnung/Reihenfolge der Kindbaueinheiten, falls Verzweigungstyp
    "AGGREGATION_VERTIKAL_ANGEORDNET" - werden per API aufgerufen aus einem Tab im Form für den Schichtaufbau als Ganzes, das an das heutige Form "Bodenaufbau"
    in baueinheiten.vue angelehnt werden kann
    - Read von allen Kindern: Kinder in Reihenfolge aus Datenbank liefern
    - Update für alle Children: Kinder mit Reihenfolge abspeichern in Datenbank
    - Delete, Insert von Kindern - dafür sind zusätzliche Buttons in dem heutigen prototypischen Form für den Bodenaufbau notwendig!
    - ==**Hinweis:**== Das Manipulieren der Reihenfolge und Einfügen/Löschen von Kindbaueinheiten bei Verzweigungstyp "AGGREGATION\_\*" darf nur über dieses
      Form erlaubt sein, nicht über das reguläre Einfügen von markierten Zweigen
      - ==**[TODO]**== (Prio 3) Dieses Einfügen und Löschen von Kindbaueinheiten sowie das Einfügen von markierten Zweigen muss bei diesem Verzweigunstyp entsprechend
        disabled werden
  - ==**[DONE]**== (Prio 2) Methoden, die CRUD-Methoden an Frontend und Backend zur Verfügung stellen für die Eigenschaften in einem Baueigenschaftsprofilformular
    - Diese könnten ähnlich arbeiten wie der heutige Code in baueinheiten.vue zur Verwaltung des Formulars **"Bauvorhaben (Preview)"**
      - Dort werden alle Felder, die zu diesem Formular gehören, in einem Array gehalten, der mit den Werten der Baueigenschaften aus dem Backend geladen wird, dann am Frontend per UI aktualisiert wird, und dann zum Speichern an das Backend gesendet wird
      - ==Dazu in baueinheiten.vue suchen nach "bauvorhabenAusgewaehlteBaueinheit"==
    - ==**Hinweis:**== Diese Methoden könnten eventuell auch generisch auf einem beliebigen Baueigenschaftsprofilformular arbeiten und dann gemeinsam verwendet werden
      für alle Arten von Baueigenschaftsprofilformularen (Schichtaufbau, Schichten, Bauvorhaben, etc., generisches Baueigenschaftsprofilformular)
  - ==**[DONE]**== (Prio 3) Individuelles Baueigenschaftsprofilformular für einzelne Schicht
    - Tab: Form für Editing der einzelnen Baueigenschaften für eine Schicht, aus dem obigen Baueigenschaftsprofilformular für eine einzelne Schicht
    - Dabei soll mit einem Aufzählungswert, der die Art der Schicht spezifiziert, unterschieden werden, welche der Felder enabled sind
      - Im Testprofil für eine Schicht heißt dieses Feld "Schicht: Schichttyp im Bodenaufbau"
      - Welche Felder bei welchem Schichttyp angezeigt werden, geht oben aus den Details zu "Variante B" hervor - dies kann z.B. per v-if
        gesteuert werden
  - ==**[DONE]**== (Prio 3) Individuelles Baueigenschaftsprofilformular für Schichtaufbau als Ganzes
    - Tab 1: Form für Editing der Baueigenschaften für den Schichtaufbau als Ganzes, aus dem obigen Baueigenschaftsprofilformular für den
      Schichtaufbau als Ganzes
      - Darin auch ein computed-Feld für Schichtdicke, computed aus Schichtdicken der Kindbaueinheiten (Schichten)
    - Tab 2: Form zur Verwaltung des Schichtaufbaus mit Reihenfolge der Schichten etc. (Vorlage: Aktuelles Formular für Bodenaufbau)
  - ==**Achtung**== - der Code für eine Baueigenschaftsformular muss folgende ==**Prüfungen**== enthalten **für jede Baueigenschaft im
    Baueigenschaftsprofil**:
    - Ob die Baueigenschaft auch **aktiviert** ist - dies muss für alle Baueigenschaften im Profil einzeln
      geprüft werden, da diese trotz Aktivierung des Profils auch einzeln deaktiviert werden können!
    - Ob nicht **weiter oben im Pfad Werte definiert** sind für die Baueigenschaft, die dann weitervererbt würden - falls ja, muss die
      betreffende Baueigenschaft im Baueigenschaftsformular auf read-only gesetzt werden!
  - ==**Hinweis:**== ==Die Baueigenschaften in den Profilen für Schichtaufbauten und Schichten können aus drei verschiedenen Quellen stammen:==
    - **Ererbte** Eigenschaften vom Geschoss oder Gebäude: Z.B. Sollschichtdicke des Schichtaufbaus, bestimmte Schall- und Wärmeschutzanforderungen (=> Erik)
    - **Berechnte** Eigenschaften: Z.B. Istschichtdicke, vom System zu computen aus den Istschichtdicken der im Schichtaufbau enthaltenn Einzelschichten,  
      bestimmte Schall- und Wärmeschutzistwerte (=> Erik)
    - Vom Benutzer **einzugebende** Eigenschaften: Z.B. Istschichdicken an den im Schichtaufbau enthaltenn Einzelschichten

---

#### **[Epic 8]** **[DONE]** ==Design für das **Baueigenschaftsprofilformular für Standort**==

- Dieses Formular muss umfangreiche Eigenschaften verwalten, die im Word-Dokument "BAUVORHABENSBAUM" bzw. aus dem daraus
  generierten Excel-Dokument "BIM.click Stammdaten für Baustoff- und Bauvorhabenbaum" spezifiziert sind im Kapitel 2.
- Diese müssen auf mehrere Unter-Tabs aufgeteilt werden, z.B.:
  - **[DONE]** Tab **"Lageangaben":** Felder aus den Abschnitten 2.1 (Adresse) und 2.2 (Verortung und georeferenzierte Lage)
    - Felder aus den Abschnitten 2.1 (Adresse) und 2.2 (Verortung und georeferenzierte Lage)
    - Postleitzahl: Bezeichnungsfeld
      - Kann mit "0" beginnen, daher kein Kennwertfeld
    - Straße: Bezeichnungsfeld
    - Hausnummer: Bezeichnungsfeld
    - Gemeinde: Bezeichnungsfeld
    - Gemarkung: Bezeichnungsfeld
      - Beispiel: "Friedrichsthal"
      - Ist nur eindeutig innerhalb einer Gemeinde!
      - Siehe https://immoeinfach.de/immobilienlexikon/gemarkung/
    - Flur: Kennwert
      - Beispiel: 3
      - In ifcSite laut Word-Dokument ifcInteger
    - Flurstücke: Kennwertepaare
      - Info: http://webhilfe.sirisweb.de/Flurstueck_suchen.htm
        - Ein Flurstück in einer Gemeinde ist eindeutig definiert durch Gemarkung, Flurstückszähler und -nenner
        - Da häufig identische Gemarkungsnamen in unterschiedlichen Gemeinden vorkommen, wird
          bei der Flurstückssuche zudem der Gemeindename abgefragt
      - Beispiel: 205/10 (Zähler/Nenner)
      - Es sollten bis zu 10 solche Felder vorgesehen werden, da ein Bauvorhaben auf mehrere Flurstücke gebaut werden kann
      - In ifcSite laut Word-Dokument allerdings ifcInteger (d.h. nicht paarig!)
    - Geografische Breite (Latitude)
      - In IFC ohne Angabe des Bezugssystems (dann WGS84) oder mit Bezugssystem möglich - ersteres sollte mit Priorität in BIM.click unterstützt werden
      - WGS84: https://de.wikipedia.org/wiki/World_Geodetic_System_1984#:~:text=Das%20World%20Geodetic%20System%201984,Erde%20und%20im%20erdnahen%20Weltraum.
        - Beispiel - Dezimalgrad: 50,008542° / 8,019861° - auch negativ! - kann als Kennwertepaar abgebildet werden
        - Beispiel - Grad Minuten Sekunden: 0° 0′ 30,75″ N / 8° 1′ 11,5″ E ()
      - Umrechner: https://www.koordinaten-umrechner.de/decimal/51.000000,10.000000?karte=OpenStreetMap&zoom=8 (Link in fachlicher Hilfe!)
    - Geografische Länge (Longitude)
      - Wie Breite - Kennwertepaar
    - ==**[DEFER]**== (Prio 3) Der "geografische Breitengrad" bzw. "Längengrad" im Kapitel 2.2.3 bzw. 2.2.4 im Word-Dokument für die Berechnung der
      Beleuchtungsstärke nach DIN EN 17037
      sollte demselben Schema wie oben folgen, könnte allerdings andere Werte als die des Grundstücks oben haben - potentielle Erweiterung.
    - ==**[TODO]**== (Prio 3) Grundstücksgrenzen, Baufenster, Karte, Umgebungsinformationen könnten als Bauinformationen bzw. interne oder externe Links
      verwaltet werden!
    - ==**[TODO]**== Buttons für Aufruf von Google Maps etc. mit Geokoordinaten, wie im prototypischen Formular für "Bauvorhaben (Preview)"
  - **[DONE]** Tab **"Geopolitische Angaben":** Felder aus dem Abschnitt 2.3
    - Hierbei handelt es sich um die Zuordnung des Standorts zu geopolitischen Strukturen (Land, Bundesland, Kommune, etc.)
    - Die Baueigenschaften (Aufzählungswerte) dafür wurden bereits definiert im Baueigenschaftsprofil "Baueinheit > Standort"!
    - Im Formular gibt es dabei Abhängigkeiten zwischen den Feldern, die im Frontend gesteuert werden müssen, z.B. die
      Anzeige der Optionen für die zugehörigen Kommunen eines Bundeslands im Feld "Kommunen" in Abhängigkeit von der Auswahl eines
      Bundeslands im Feld "Bundesländer", und andere ähnliche Abhängigkeiten
      - ==**Hinweis**==: Dabei könnte man auch mit **nested QSelects** arbeiten, die als Model für die Options allerdings dann auch einen
        nested Array benötigen, der erst aus den einzelnen Arrays für die auswählbaren Optionen die einzelnen Aufzählungswerte aufgebaut
        werden müsste. Code Sample: https://codepen.io/mickey58/pen/oNjaQQR
    - In Abhängigkeit von den getroffenen Auswahlen dieser Felder müssen beim Speichern:
      1. Bestimmte Baueigenschaftsprofile für die getroffene Auswahl aktiviert werden
      2. Bestimmte Mengen von Bauinformationen für die getroffene Auswahl der Baueinheit zugeordnet werden
    - ==**[TODO]**==: Für das Zuordnen und das Rückgängigmachen der Zuordnung von zugeordneten Bauinformationen werden
      **Bauinformationsprofile** benötigt, analog zu Baueigenschaftsprofilen! Das Zuordnen könnte vorläufig auch durch Attribute
      der Bauinformationen erfolgen (da diese z.B. bestimmte Geo-Informationen als Felder mit enthalten)
    - **[DONE]** (Prio 2) (Land-)Kreis als zusätzliche Rubrik mit Aufzählungswerten
  - **[DONE]** ab **"Bauordnungsrechtliche Angaben":** Felder aus dem Abschnitt 2.4
    - **[DONE]** (Prio 2) Rubrik 'Verkehrsanbindung' im Formular 'Baueinheit > Standort' ist falsch
  - **[DONE]** Tab **"Umweltbezogene Angaben":** Felder aus dem Abschnitt 2.5
    - Viele davon können aus Karten und Tabellen ermittelt werden - dafür kann die **Baueigenschaftsbeschreibung** mit im Formular angezeigt werden.
      Alternativ könnte sie auch in der fachlichen Hilfe im rechten Drawer angesteuert werden.
      Dazu muss sie per globalStore.setBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaftBaueinheit() entsprechend gesetzt werden,
      und dann die fachliche Hilfe aktiviert werden per showfachlicheHilfeEvent mit Event-Parameter zur Steuerung,
      analog zu showBedienungsHilfeEvent in my-layout.vue und baueinheiten.vue/baustoffe.vue -
      siehe auch die Hinweise in Zeile 1355 ff. in my-layout.vue dazu
      Dazu sollte dynamisch auch die Breite des rechten Drawers vergrößert werden - dies ist möglich über width-Property am QDrawer.
      Diese kann mittlerweile mit einem über der fachlichen Hilfe platzierten q-slider, der die width-Property verstellt, in der Breite vom Benutzer variiert werden.
    - **[DONE]** Aufruf Klimadiagramm aus Geokoordinaten: http://www.mappedplanet.com/klima/index.php?lat=48.8324&lon=9.31641 (implementiert per Button)
    - **[DONE]** https://www.dwd.de/DE/leistungen/klimadatendeutschland/klimadatendeutschland.html - Deutscher Wetterdienst
      - z.B. Klimadaten von 76 Messstationen, Solarstrahlung
      - z.B. https://www.dwd.de/DE/leistungen/solarenergie/lstrahlungskarten_su.html - Solarstrahlung
      - z.B. Zeitreihen und Trends: https://www.dwd.de/DE/leistungen/zeitreihen/zeitreihen.html (Temperatur, Sonnenscheindauer, Niederschlag, Frosttage, etc.,
        pro Region)
    - **[DONE]** https://www.umweltbundesamt.de/daten/luft/luftdaten/karten/eJxrXZScv9BwUXEykEhJXGVkYGSga2iga2SwqCQTJF7OAADyiwzl - Luftqualität, Umweltbundesamt
    - **[DONE]** https://www.imis.bfs.de/geoportal/ - Bundesamt für Strahlenschutz
      - Z.B. Radon-Konzentration, Luftstaub, etc.
      - Es sind Permalinks erzeugbar, die normalen Links funktionieren nicht!
      - Beispiel für Permalink: https://www.imis.bfs.de/geoportal/#map/1234075/6706481/8.400684110850941|layers/%7B%222f30477a-ca0a-43cb-a34b-fcee53e6bce7%22%3A%7B%22isVisible%22%3A1%2C%22opacity%22%3A0.65%2C%22filters%22%3A%5B%5D%7D%7D - ==Permalink funktioniert aber nicht richtig, Karte mit Radonwerten wird nicht angezeigt!==
    - **[DONE]** https://www.dlubal.com/de/loesungen/online-dienste/schnee-wind-erdbeben-lastzonen - ==nicht mehr kostenlos nutzbar, 500 Aurufe kosten 50 €==
    - **[DONE]** Schlagregenzonen: 3 Beanspruchunsgruppen, Aufzählungswert, nach Karte, https://www.baunetzwissen.de/bauphysik/fachwissen/feuchteschutz/
      regenschutz-im-hochbau-nach-din-4108-3-4385057
    - ==**[DEFER]**== Klimazonen (Aufzählungswert) - https://klassewasser.de/content/language1/downloads/Karte%20Klimazonen.pdf - Prio 3
    - ==**[DEFER]**== Gradtagstabelle - https://de.wikipedia.org/wiki/DIN_4713 - Prio 3
    - Weitere Todos dafür aus dem Meeting vom 22.10.2020:
    - **[DONE]** Klima-Attribute\_
      - Prio 1: Schnee, Wind, Schlagregenklasse ()==**[TODO]**== Abo bei Dlubal erforderlich)
      - Prio 2: Luftqualität
      - Prio 3: Sonnenschein
    - **[DONE]** Attribut für Radonkonzentration in Bodenluft ("Baueinheit > Standort > Umwelt > Radon > Bodenluft > Konzentration")
    - **[DONE]** Attribut für Atmosphärentyp (nach DIN EN ISO 12944 Teil 1 - siehe https://www.eot-gmbh.de/fileadmin/pdfs/Korrosionsschutzklassen.pdf,
      Korrosionsschutz, "Baueinheit > Standort > Umwelt > Luft > Korrosivität"
    - **[DONE]** Attribut für besondere klimatische Standortbedinungen (GUI-Element: Checkbox) mit Werten: Staub, Feinstaub, Waldbrandrisiko,
      Algenrisiko, etc.
    - - **[DONE]** Altlasten im Boden, Geothermische Tiefenstufe, Thermalwasservorkommen, Bodenschätze gehören in das Tab "Hydrogeologische Angaben"
  - **[DONE]** Tab **"Hydrogeologische Angaben":** Felder aus dem Abschnitt 2.6
    - Quellen:
      - **[DONE]** https://www.geoportal-bw.de/startseite - Geo-Portal Baden-Württemberg - enthält Karten zu vielen Themen, u.a. Bebauungspläne (diese sind
        aber unvollständig und schwer bedienbar)
      - **[DONE]** https://udo.lubw.baden-wuerttemberg.de/public/pages/home/welcome.xhtml - Daten- und Kartendienst der Landesanstalt für Umwelt
        Baden-Württemberg (LUBW), u.a. zu Abfall, Boden und Geologie, erneuerbaren Energien, Lärm, Luft, Natur- und Landschaftsschutz, Radioaktivität, Stickstoff, Wasser (Grundwasser, Hochwasser, Oberflächengewässern, Stauanlagen, Quellen- und Wasserschutzgebieten)
      - **[DONE]** https://isong.lgrb-bw.de/ - Informationssystem Oberflächennahe Geothermie für Baden-Württemberg (ISONG), mit Karten, z.B. links im Menü
        "ISONG: Geothermische Effizienz" auswählen. Legende per erstem Icon oben rechts, blau - geringer effizient, rot - höher effizient, die
        Tiefenstufe kann dort allerdings nicht direkt angezeigt werden
      - Tiefenstufe: Karten-Download für Bayern auf https://geoportal.bayern.de/geoportalbayern/suche/suche?3&q=tiefenstufe&f=true, auch über Standortsuche
        für konkreten Standort
    - Attribute (Anforderungen dafür aus dem Meeting vom 22.10.2020):
      - **Standort: Boden (Risiken)**
        - Aus dem Abschnitt davor im Word-Dokument hierher verschoben
        - Aufzählungswert
        - Optionen: Altlasten im Boden, Bodenschätze, Thermalwasservorkommen, Archäologische Funde
        - **[DONE]** Eventuell "Trinkwasserschutzgebiet" hierher verschieben aus "Bauordnungsrechtliche Angaben"?
      - **Standort: Boden (Geothermische Tiefenstufe)**
        - https://de.wikipedia.org/wiki/Geothermische_Tiefenstufe - in m/K (Kehrwert des Temperaturgradienten)
      - **Standort: Boden (Bodenklasse)** (Aufzählungswert oder auch mehrere Aufzählungswerte)
        - Siehe Tabelle in https://www.ib-baugrund-jacobi.de/artikel-news/homogenbereich-din-18300-baugrund-erfurt-jena
          - **Standort: Boden (Bodenklasse)** nach DIN 18196 und DIN 1054
            - Grobe Einteilung: nichtbindige Böden .. organische Böden, plus Zusatzklassen
            - Feine Unterteilung: GE .. F (ist abhängig von grober Unterteilung)
            - Streng genommen bräuchte man dafür ein Aufzählungwertepaar! Allerdings müssten dafür die validen Kombinatonen irgendwie spezifiziert werden
            - Daher am einfachsten als einen Aufzählungwert codieren, der alle Werte auf einmal als Optionen spezifiziert
              - Siehe https://de.wikipedia.org/wiki/DIN_18196
              - z.B. "GU - gemischtkörnige Böden - ..."
          - **Standort: Boden (Bodenklasse für Erdarbeiten)** nach DIN 18300
            - Bk.3, 4, ...
          - **Standort: Boden (Bodenklasse für Bohrarbeiten)** nach DIN 18301
            - Tabelle aus https://izw.baw.de/publikationen/kolloquien/0/01-SchgeinerAktuelle%20%C3%84nderungen.pdf
            - BN 1, 2, ...
          - **Standort: Boden (Bodenklasse für Nassbaggerarbeiten)** nach DIN 18311
            - https://izw.baw.de/publikationen/kolloquien/0/Heeling.pdf
            - NB1 1, 2, ...
          - **Standort: Boden (Bodenklasse für Rohrvortriebsarbeiten)** nach DIN 18319
            - LNE 1, 2, ..., LNW 1, 2, ..., etc.
            - https://felsbohrung.de/bodenklassen-bohrungen/
      - Wasserstände:
        - **Standort: Wasser (Höchster Grundwasserstand, HGW 100)** (in Metern über NN)
        - **Standort: Wasser (Höchster Hochwasserstand, HHW 100)** (in Metern über NN)
        - **Standort: Wasser (Maximum aus HGW 100 und HHW 100)** (in Metern über NN, computed)
        - **Standort: Wasser (Bemessungswasserstand)** (in Metern über NN)
          - Berechnung über Grundwasser- und Hochwasserstand, Tabelle in Projekt 8800
          - https://www.bauwion.de/begriffe/bemessungswasserstand - wird durch Baugrundgutachten festgelegt, im einfachsten Fall das Maximum aus HGW und HHW, eventuell mit Sicherheitszuschlag, z.B. von 30 cm
          - https://www.deutscher-bauzeiger.de/bauen/baubeginn/bemessungswasserstand/bemessungswasserstand-din-18195-7/
    - **[DONE]** Attribute für 2.6.8 bis 2.6.10 in Word-Dokument
      - **Standort: Boden (Wasserdurchlässigkeit)** (Aufzählungswert, siehe Word-Dokument)
        - Hohe Durchlässigkeit, k<sub>f</sub> > 10<sup>-4</sup>
        - Geringe Durchlässigkeit, k<sub>f</sub> < 1010<sup>-4</sup>
        - https://www.ifmu.de/baugrund/bestimmung-der-wasserdurchlaessigkeit-von-boden/ - DIN 183130, Teil 1 hat 5 Durchlässigkeitsbereiche in Abhängigkeit
          vom Durchlässigkeitsbeiwert: k<sub>f</sub> [m/s]
      - Grundwasser (4 Attribute, siehe Word-Dokument, kommen i.a. aus Baugrundgutachten):
        - **Standort: Wasser (Grundwasserfließgeschwindigkeit)**
          - https://de.wikipedia.org/wiki/Darcy-Gesetz
          - Kennwert in m/s
        - **Standort: Wasser (Grundwasserfließrichtung)**
          - https://www.spektrum.de/lexikon/geowissenschaften/grundwasserfliessrichtung/6460 - wird durch Pfeile in Karte angezeigt
          - Vorläufig: Aufzählungsswert, angenähert an Himmelsrichtungen
        - **Standort: Wasser (Grundwasserschwankungsbreite)** bzw. besser **Wwasser (Grundwasserschwankungsbereich)** saisonal (Wärmeentzug)
          - Müsste in Metern oder Prozent erfasst werden, ist abhängig von Jahreszeit etc.
          - Könnte als Kennwertepaar abgebildet werden (niedrigster Grundwasserstand/höchster Grundwasserstand, jeweils in Metern über NN)
        - **Standort: Wasser (Grundwassertemperatur)**
          - Kennwert in °C
      - **Standort: Wasser (Grundwasserexpositionsklasse/-betonaggressivität)** nach DIN 4030
        - Aufzählungswert, Optionen: XA0 .. XA3, XC1 .. XC4, etc., siehe Tabelle am Ende des Abschnitts
        - Für Grundwasser trifft nur XA0, XA1 .. XA3 zu
        - Siehe auch https://de.wikipedia.org/wiki/Betonaggressivit%C3%A4t und https://de.wikipedia.org/wiki/Expositionsklasse
        - ==**[TODO]**== Dieses Attribut in 2.6.10.1 (Expositionsklasse) ist ein Beispiel für die Anwendung einer einfachen, automatisierbaren Regel
          - Siehe die Tabelle F.1 dort am Ende des Abschnitts (DIN EN 206 - Empfohlene Grenzwerte für die Zusammensetzung und Eigenschaften von Beton)
          - Bestimmung der Eigenschaften des passenden Betons
          - Input-Parameter: Expositionsklasse (siehe oben)
          - Output-Parameter: Eigenschaften (d.h. Anforderungen) des Betons (siehe Zeilen in der Tabelle, z.B. "Mindestzementgehalt", etc.)
          - Die computed-Funktion dafür könnte einfach abhängig vom Wert des Aufzählungswerts "Expositionsklasse" die Aktivierung eines Baueigenschaftsprofil
            "Beton" mit den jeweils passenden Vorgabewerten auslösen!
          - Diese computed-Funktion müsste allerdings an der Baueinheit für eine erdberührte Wand hängen, wenn es darum geht, den richtigen
            Beton (Baustoff) für diese Wand (Baueinheit) zu bestimmen - die Baueinheit könnte dabei den tatsächlichen Wert der Expositionsklasse von der Elternbaueinheit für den Standort erben
    - **Standort: Wasser (Grundwasserherkunft)**
    - ==Exkurs zu neuem **Schema für Baueigenschaftsbezeichnungen**==
      - ==Gewählt: Neue Syntax mit ">" als Trennzeichen: **Standort > Hydrogeologie > Wasser > Grundwasser > Herkunft**==
      - **[DONE]** Für Baueigenschaften für Baueigenschaftsprofil "Baueinheit > Standort" implementiert - übrige folgen noch dem alten Schema
      - (Alternative mit ":" als letztem Trennzeichen - verworfen: **Standort > Wasser: Grundwasserherkunft**)
      - (Alternative mit gröberer Hierarchie: **Standort > Wasser > Höchster Grundwasserstand (HGW 100)**)
      - (Alternative mit feinerer Hierachie: **Standort > Hydrogeologie > Wasser > Grundwasserherkunft**)
      - ==Gewählt - Zerlegung in möglichst kurze Substantive: **Standort > Hydrogeologie > Wasser > Grundwasser > Herkunft**==
      - ==**Achtung**==: Die Ordnung ist so klarer, aber die Wiedererkennung der eigentlichen Bezeichnung des einzelnen Attributs ist so etwas
        geringer!
      - Beispiel: **Standort > Hydrogeologie > Wasser > Grundwasser > Höchster Stand (HGW 100)**
      - Beispiel: **Standort > Hydrogeologie > Wasser > Hochwasser > Höchster Stand (HHW 100)**
      - Beispiel: **Standort > Hydrogeologie > Wasser > Maximum aus HGW 100 und HHW 100**
      - Beispiel: **Standort > Hydrogeologie > Boden > Klasse > Rohrvortriebsarbeiten**
      - Beispiel: **Standort > Hydrogeologie > Boden > Bodenklasse für Rohrvortriebsarbeiten**
      - Beispiel: **Standort > Hydrogeologie > Boden > Rohrvortriebsarbeiten > Klasse**
      - Beispiel: **Standort > Hydrogeologie > Boden > Rohrvortriebsarbeiten > Zusatzklasse BS bei Steinen und Blöcken**
      - Beispiel: **Standort > Hydrogeologie > Wasser > Grundwasser > Exposition/Betonaggressivität**
      - Beispiel: **Standort > Hydrogeologie > Wasser > Grundwasser > Fließgeschwindigkeit**
      - Beispiel: **Standort > Lage > Grundstück > Flur**
      - Beispiel: **Standort > Geopolitik > Land > Mittelamerika**
      - Beispiel: **Standort > Geopolitik > Bundesland > Deutschland**
      - Beispiel: **Standort > Erschließung > Energie > Versorger**
      - Beispiel: **Standort > Erschließung > Verkehr > Zugang**
      - Beispiel: **Standort > Erschließung > Strom > Anschluss > Typ**
      - Beispiel: **Standort > Umwelt > Luft > Korrosivität**
      - Beispiel: **Standort > Umwelt > Risiko**
      - Beispiel: **Standort > Umwelt > Biologie > Exposition**
      - Beispiel: **Standort > Recht > Gebietscharakter > Grundstück**
      - Beispiel: **Standort > Recht > Gebietscharakter > Nachbargrundstück (01)**
    - Attribut 2.6.10.2 als Aufzählungswert mit Checkbox, Abwässer ignorieren
      - Optionen: Meerwasser, Gebirgs- und Quellwasser, Moorwasser, Bodenwasser, Verunreinigtes Bodenwasser, Flusswasser
    - **Standort: Baugrube (Art)**
      - Attribute 2.6.11
      - Vereinfachte Repräsentation in einzelnes Attribut (Aufzählungswert)
      - Optionen: 'Freie Böschung mit Arbeitsraum' (dies ist der Normalfall), 'Mit Verbau ohne Arbeitsraum', 'Mit Verbau mit Arbeitsraum', 'Unter Nachbargebäude'
      - ==**[TBD]**==: Gehört es in ein eigenes Profil 'Erdberührte Wände'?
        - Grund: Es wird auch "weiter unten" im Gebäudemodell innerhalb des Bauvorhabenbaums gebraucht, nämlich an Kellerwänden
        - Es kann aber auch weiter unten aktiviert werden und erbt dann ggf. die Werte von oben!
        - Es könnnte auch eines der Attribute sein, die in mehreren Baueigenschaftsprofilen vorkommen (hier im Profil für den Standort und im Profil
          für erdberührte Wände)
        - Ferner könnte man z.B. in computed-Funktionen das Attribut auch von weiter oben im Bauvorhabenbaum (z.B. vom Standort) auslesen
      - ==**[TBD]**==: Eventuell mehrere Abschnitte von Baugruben vorsehen, ähnlich wie bei Nachbargrundstücken in "Lageangaben"?
      - ==**Hinweis**==: Dies sollte besser so gelöst werden, indem es bei mehreren Gebäuden auf dem Standort erst auf der Baueinheitenebene der Gebäude
        mit Werten definiert wird!
    - 2.6.12 weglassen
    - **Standort: Baugrund (Feuchteempfindlichkeit)**
      - Attribut 2.6.13 als Checkbox
      - Optionen: Setzungsempfindlicher Untergrund, Unterschiedlich setzungsempfindlicher Untergrund, Hebungsempfindlicher Untergrund (z.B. Lias Epsilon oder
        Anhydrit), Frostempfindlicher Untergrund, Permafrostgebiet
    - 2.6.14 weglassen
    - **(Standort: Baugrund (Gründungsart))**
      - Attribut 2.6.15
      - Aufzählungswert (Checkbox)
      - Wichtig!
      - Es sollte besser in ein eigenes Profil 'Bodenplatte' oder 'Fundament' verschoben werden!
        - Grund: Es gehört zum Gebäude bzw. sogar an eine eigene Baueinheit "Bodenplatte" bzw. "Fundament" unterhalb des Gebäudes im
          Bauvorhabenbaum, welches dann ein dediziertes Profil für Bodenplatten bzw. Fundamente haben sollte!
        - Es wäre dann zwar am Standort und am Gebäude aktiviert, aber dort undefiniert
      - D.h. es sollte eventuell **Bodenplatte: Gründungsart** oder **Bodenplatte: Fundamentart** heißen
      - Gewählte Bezeichnung: ==**Fundament: Gründungsart**== (alternativ: **Fundament: Fundamentart**)
      - Optionen:
        - Plattengründung ohne Höhenversätze
          - Lastabtragende Dämmung flächig möglich
          - Lastabtragende Dämmung Randstreifen möglich
          - Lastabtragende Dämmung unmöglich
        - Plattengründung mit Höhenversätzen
          - Lastabtragende Dämmung flächig möglich
          - Lastabtragende Dämmung Randstreifen möglich
          - Lastabtragende Dämmung unmöglich
        - Streifenfundamente, Bodenplatte freitragend auf Fundamenten
        - Streifenfundamente, Bodenplatte auf Baugrubensohle aufliegend
        - Köcherfundamente und Streifenfundamente, Bodenplatte freitragend auf Fundamenten
        - Köcherfundamente und Platte, Bodenplatte auf Baugrubensohle aufliegend
        - Bohrpfähle zur Auftriebssicherung (zugbelastet)
        - Bohrpfähle mit Pfahlkopfriegeln
    - **Erdberührte Wand: Erddruckaufnahme**
      - Attribut 2.6.16
      - In Profil für Wände aufnehmen?
      - Wahrheitswert oder Aufzählungswert mit 2 Optionen
        - Müssen Erddruck aufnehmen (Biegesteife Verbindung Bodenplatte, AWER erforderlich)
        - Müssen keinen maßgeblichen Erddruck aufnehmen (kommt ggf. ohne Bodenplatte aus)
  - **[DONE]** Tab **"Verwendungsverbote/-gebote":**
    - **Standort: Baustoffe (Verwendungsverbot/-gebot)**
      - Attribut für 2.7/2.8 (zusammengefasst)
      - Aufzählungswert (Checkboxes)
      - Optionen: Verbot für CKW/FCKW/HFCKW, Verbot für PVC, Begrenzung für TOC-Gehalt (Beton, Zement), Begrenzung für Chromatgehalt (Beton, Zement),  
        Gebot für Recylingbaustoffe, Gebot für regionale Baustoffe
        - TOC = Total Organic Carbon (Organisch gebundener Kohlenstoffgehalt), Gegenteil ist TIC, siehe http://mediatum.ub.tum.de/doc/1346355/113749472362.pdf
          und https://www.hamburg.de/contentblob/4630390/14bd18df0a463ab9f6b02656a9881830/data/d-toc-merkblatt-bue.pdf
  - ==**[DEFER]**== (Prio 3) Tab **"Grundstücksgeometrie":**
    - 2.9 - ist Platzhalter für BIM-basiertess Baugesuch (erstmal verschoben)
  - **[DONE]** Tab **"Anforderungen aus dem Standort":**
    - **Standort: Städtebauliche Kennzahlen**==
    - 2.10.2 Attribute aus der Tabelle dort
      - **Standort: Städtebauliche Kennzahl (zulässige Brutto-Grundfläche BGF)**
        - Bezeichnung im neuen Schema: "Baueinheit > Standort > Recht > Städtebau > Zulässige Brutto-Grundfläche (BGF)"
        - Nach DIN 277 - https://de.wikipedia.org/wiki/DIN_277
        - Ist laut https://de.wikipedia.org/wiki/Grundfl%C3%A4che_(Architektur) geschossweise zu ermitteln und wird dann aufaddiert
        - Setzt sich zusammen aus KGF und NGF/NRF - KGF ist Konstruktions-Grundfläche, d.h. enthält insbesondere die nicht nutzbaren Standflächen der Wände
        - Gute Erkärung hier: https://www.dabonline.de/2016/05/03/flaechenberechnung-neue-norm-fuer-grund-und-boden/
      - **Standort: Städtebauliche Kennzahl (zulässige Netto-Grundfläche NGF)** - ==Achtung: Heißt seit 2016 **NRF**!==
        - Daher "Baueinheit > Standort > Recht > Städtebau > Zulässige Netto-Raumfläche (NRF)"
        - Setzt sich zusammen aus NUF (Nutzungsfläche), TF (Technikfläche), VF (Verkehrsfläche)
      - **Standort: Städtebauliche Kennzahl (zulässiger Brutto-Rauminhalt BRI)**
        - Einheit m<sup>3</sup>
        - gesamt (Achtung: Gilt für alle Gebäude am Standort!)
        - geschossweise
          - ==**[TBD]**==: Es müssten dafür dann eventuell mehrere Felder vorgehalten werden, ähnlich wie bei Nachbargrundstücken?
          - ==**Hinweis**==: Dies sollte besser so gelöst werden, indem es bei mehreren Gebäuden auf dem Standort erst auf der
            Baueinheitenebene der Gebäude mit Werten definiert wird!
          - Allerdings ist das vermutlich so zu verstehen, dass die Istwerte dafür gebäude- und geschossweise ermittelt werden und
            aufsummiert werden
          - Daher einstweilen im Baueigenschaftsprofil für den Standort bisher ein Feld dafür vorgesehen
      - **Standort: Städtebauliche Kennzahl (zulässige Grundflächenzahl GRZ)** - laut https://de.wikipedia.org/wiki/Ma%C3%9F_der_baulichen_Nutzung eine dimensionslose Zahl mit bis zu 2 Dezimalstellen, beschränkt die überbaubare Grundstücksfläche
      - **Standort: Städtebauliche Kennzahl (zulässige Geschossflächenzahl GFZ)** - laut https://de.wikipedia.org/wiki/Ma%C3%9F_der_baulichen_Nutzung eine dimensionslose Zahl mit bis zu 2 Dezimalstellen, beschränkt die bebaubare Fläche insgesamt (es werden dabei alle Geschosse berücksichtigt)
      - **Standort: Städtebauliche Kennzahl (zulässige Anzahl der Vollgeschosse)**
      - Abkürzung: VG
      - Ist in Bebauungsplan üblicherweise eine römische Ziffer, z.B. II. Wenn mit Kreis umrandet, bedeutet dies, dasss man z.B. 2 Vollgeschosse bauen muss.
      - Ob dabei ein Dachgeschoss als Vollgeschoss zählt, ist genau festgelegt in den Bauordnungen der Länder.
      - **Standort: Städtebauliche Kennzahl (erforderliche Anzahl der Stellplätze)**
    - ==**Achtung**==: Dabei gilt:
      - Der Standort/Grundstück spezifiziert **Sollwerte,** einzelne Gebäude und deren Untereinheiten (Geschosse) am Standort liefern **Istwerte** dafür
      - An solchen müssen ggf. korrespondierende Baueigenschaften für die Istwerte definiert werden
      - Computed-Funktionen können diese ggf. aufsummieren und sie gegen die Sollwerte vergleichen
      - ==**Hinweise**==:
        - Die Idee, dass die korrespondierenden Baueigenschaften in solchen Soll-/Istwertepaaren gleich heißen und nur durch ein **wertbezogenes** Flag ("Sollwert/
          Istwert") unterschieden werden, wäre theoretisch möglich, ist aber in der Praxis schlecht umsetzbar, da die Bezeichnungen der Sollwerte
          (siehe z.B. oben "zulässige Netto-Grundfläche") oft "spezialisiert" sind und sich somit von den Istwerten unterscheiden
          (in diesem Beispiel "tatsächliche Netto-Grundfläche"). Daneben könnte wegen der Wertevererbung der Fall, dass der Istwert weiter unten im Baum
          einen anderen Wert als der Sollwert hat, gar nicht umgesetzt werden! Daher scheidet diese Idee aus!
        - Im Abscnitt zu Sollwerten/Istwerten weiter unten im Design wird eine
          Lösung diskutiert, ob die korrespondierenden Baueigenschaften eventuell dasselbe Präfix in der Bezeichnung haben sollten.
          Im obigen Beispiel würde allerdings auch das nicht funktionieren!
    - **[DONE]** Restliche Felder im Tab "Anforderungen aus dem Standort":
      - Informationen zu Erdbeben
        - Dies gehört eigentlich in das Tab "Hydrogeologische Angaben"!
        - **[DONE]** **Erdbebenzone** nach DIN 4149 (4 Zonen)
          - Standort > Hydrogeologie > Boden > Erdbebenzone
          - Link zu Dlubal
      - Baugrundklasse
        - Diese gehört eigentlich in das Tab "Hydrogeologische Angaben"!
        - Laut https://de.wikipedia.org/wiki/Erdbebenzone wird unterschieden:
          - **[DONE]** **Baugrundklasse**
            - A: unverwitterter Fels, B: mäßig verwittert, C: Lockergestein
            - Standort > Hydrogeologie > Boden > Baugrund > Klasse
            - Bereits vorhanden: Standort > Hydrogeologie > Boden > Baugrund > Feuchteempfindlichkeit
          - **[DONE]** **Untergrundklasse**
            - R: felsartig, S: tief-sedimentär, T: Übergangsgebiete
            - Standort > Hydrogeologie > Boden > Untergrund > Klasse
      - **[DONE]** Anforderungen an die Gebäudehülle
        - **Korrosionsschutzklasse** für Beton nach DIN EN 1992 und DIN EN 206
          - Angelegt als "Baueinheit > Standort > Umwelt > Beton > Expositionsklasse"
          - 2 Tabellen im Word-Dokument - dies ist eine Obermenge der Werte für obige Grundwasserexpositionsklasse/-betonaggressivität
            in "Baueinheit > Standort > Umwelt > Wasser > Grundwasser > Expositionsklasse/Betonaggressivität
          - Zusätzlich gibt es bereits "Baueinheit > Standort > Umwelt > Luft > Korrosivität" mit eigenen Klassen im Tab "Umweltbezogene Angaben"
          - Mit aufgenommen in die Rubrik "Luftqualität am Standort" im Tab "Umweltbezogene Angaben"
  - ==**Hinweise**==:
    - **[DONE]** **Risiken** neu gruppieren - allerdings sind wegen deren Menge Rubriken bzw. dedizierte, gruppierte Baueigenschaften trotzdem sinnvoll.
      Man könnte auch alle in ein dediziertes Tab "Risikobewertung" auslagern - allerdings wird dann eine spezifische Bewertung als Schlußfolgerung aus
      den Eingaben der jeweiligen andern Tabs eher schwierig. Daher macht es Sinn, eine dedizierte Rubrik für die spezifischen Risiken unten am einzelnen Tab zu belassen!
      - **[DONE]** **Umweltrisiken, Klimarisiken und biologische Exposition**
        - Spalte **Umweltrisiken** (vorhandenes Attribut "Baueinheit > Standort > Umwelt > Risiko")
          - Industrieatmosphäre (Korrosivität)
          - Elektrische Felder (Bahntrassen, Hochspannungsleitungen, Erdleitungen)
          - Erhöhte Radonkonzentration
          - Flugbewegungen
          - Fluglärmzone
          - +Abgase
          - Feinstaub
          - +Lärm (Straßenverkehr, Schienenverkehr, Flugverkehr, Industrie und Gewerbe, Sport- und Freizeitanlagen, Fluglärmzone bereits oben enthalten)
        - Spalte **Klimarisiken** (neues Attribut "Baueinheit > Standort > Umwelt > Klima > Risiko")
          - Meeresatmosphäre (Korrosivität)
          - Staub
          - Flugsand
          - Wanderdünen
          - Waldbrand
          - +Wind
          - +Sturm
          - +Starkregen/Schlagregen
          - +Hagel
          - +Nebel
          - +Frost
          - +Schnee
        - Spalte **Biologische Exposition** (vorhandenes Attribut "Baueinheit > Standort > Umwelt > Biologie > Exposition)
          - Geschützte Arten
          - Vogelschutz
          - Tauben (Vergällung)
          - Algen
          - Flechten
          - Moose
          - Moderfäule
          - Nager
          - Insekten
          - Termiten
      - **[DONE]** **Hydrogelogische Risken** - Rubrik unter dem Tab "Hydrogeologische Angaben"
        - Spalte **Risiken des Bodens** (vorhandenes Attribut "Baueinheit > Standort > Hydrogeologie > Boden > Risiko")
          - Altlasten im Boden
          - Archäologische Funde
          - Bodenschätze
          - +Kampfmittel
          - +Erdbeben
          - +Vulkanismus
        - Spalte **Risiken durch Wasser** (vorhandenes Attribut "Baueinheit > Standort > Hydrogeologie > Wasser > Risiko")
          - Hochwasser
          - Grundwasser
          - Thermalwasservorkommen (eher zu Wasser, da damit Wasser am/im Boden gemeint ist)
      - **[DONE]** **Auflagen und Verwendungsverbote/-gebote** - Rubrik unter dem Tab "Bauordnungsrechtliche Angaben"
        - Spalte **Bauordnungsrechtliche Auflagen** (von "Immissionen und Restriktionen" umzubenennendes Attribut "Baueinheit > Standort > Recht > Auflage")
          - Beschränkungen für Radarreflexion
          - Beschränkungen für Blendschutz
          - Trinkwasserschutzgebiet
          - +Landschaftsschutzgebiet
          - +Naturschutzgebiet
        - ==**Achtung**==: Hierzu kommen noch folgende hinzu:
          - Bohrverbote auf Grund von Dolinenschutzprogrammen
          - Grabungsverbote auf Grund von archäologischen Restriktionen
          - Grabungsverbote auf Grund von Trassen
          - Kampfmittelverdacht (sollte zu "Risiken des Bodens" oben!)
          - Einschränkungen auf Grund von Baulasten
          - Abstandsgebote
        - Spalte **Verwendungsverbote/-gebote** (umzubenenndes Attribut "Baueinheit > Standort > Recht > Verwendungsverbot/-gebot" -
          bezieht sich mit der +-Erweiterung nicht nur auf Baustoffe!)
          - Verbot für CKW/FCKW/HFCKW
          - Verbot für PVC
          - Begrenzung für TOC-Gehalt (Beton, Zement)
          - Begrenzung für Chromatgehalt (Beton, Zement)
          - Gebot für Recylingbaustoffe
          - Gebot für regionale Baustoffe
          - +Gebot für standortgerechte heimische Pflanzen

---

#### **[Epic 9]** ==**[WORK]**== ==Design für das **Baueigenschaftsprofilformular für Gebäude**==

- Dieses enthält ein Tab/Form für "Gebäudebezogene Angaben" gemäß den Angaben
  im Unterzweig "Vorlagen für Baueinheiten"/"Vorlage für Bauprojekt"/"Gebäude" des Bauvorhabenbaums auf Heroku:
  - Unterrubrik "Bauweise":
    - "Einordnung gemäß BIM-Bauantrag": TBD
    - "Bauweise im bauaufsichtlichen Sinn (Deutschland)": Aufzählungswert (Optionen: siehe Zweig "Vorlagen für Baueinheiten" im
      Bauvorhabenbaum auf Heroku)
  - "Einordnung des Gebäudetyps nach DIN 4109, Schallschutz im Hochbau (Deutschland)": Aufzählungswert (Optionen: siehe Zweig "Vorlagen für
    Baueinheiten" im Bauvorhabenbaum auf Heroku)
  - "Einordnung des Gebäudetyps nach EnEV/GEG (Deutschland)": Aufzählungswert (Optionen: siehe Zweig "Vorlagen für Baueinheiten" im
    Bauvorhabenbaum auf Heroku)
  - Unterrubrik "Einordnung des Nutzungsprofils zu Nachhaltigkeits–Kriterien (global)":
    - "Nutzungsprofile DGNB (Deutschland und andere)": Aufzählungswert (Optionen: siehe Zweig "Vorlagen für Baueinheiten" im Bauvorhabenbaum
      auf Heroku, enthält mehrere Unterrubriken)
    - "Nutzungsprofil im BNB-System": Aufzählungswert (Optionen: siehe Zweig "Vorlagen für Baueinheiten" im Bauvorhabenbaum auf Heroku)
    - (Prio 2) "Nutzungsprofil im NBBV-System"
    - (Prio 2) "Nutzungsprofil im LEED-System"
    - (Prio 2) "Nutzungsprofil im BREEAM-System (UK und andere)"
    - (Prio 2) "Nutzungsprofil im WELL-System": Aufzählungswert (Optionen: siehe Zweig "Vorlagen für Baueinheiten" im Bauvorhabenbaum auf
      Heroku - dieser hat nur 2 Optionen "WELL V1" und "WELL V2", "WELL V1" enthält mehrere in "Features" gruppierte "Parts",
      "WELL V2" ist dort noch nicht näher detailliert)
    - (Prio 2) "Nutzungsprofil im RELM-System": Aufzählungswert
    - (Prio 2) "Hotelklassifizierung im DEHOGA-System": Aufzählungswert
  - Unterrubrik (Prio 2) "Einordnung, brandschutztechnisch, des Bauwerks (europäisch und länderbezogen)"
  - Unterrubrik (Prio 2) "Einordnung, erdbebentechnisch, des Bauwerks (europäisch und national)"
  - Unterrubrik (Prio 2) "Einordnung nach Expositionsklassen für Gebäudehülle oder deren Teile"
  - Unterrubrik (Prio 2) "Anforderungen an den Objektschutz (Einbruchhemmung, Durchschusshemmung)"
  - Unterrubrik (Prio 2) "Einordnung in die europäischen Gebäudetypologien (Bestandsbauten)"
  - Unterrubrik "Art des Gebäudes und Gebäudenutzung":
    - "Einordnung der Honorarzone gemäß HOAI Objektliste Gebäude": Aufzählungswert (Optionen: siehe Zweig "Vorlagen für
      Baueinheiten" im Bauvorhabenbaum auf Heroku)
    - "Gebäudenutzung nach BWZ-Schema (soweit sinnvoll, die Hauptnutzung)": Aufzählungswert (Optionen: siehe Zweig "Vorlagen für
      Baueinheiten" im Bauvorhabenbaum auf Heroku, weitgehend identisch mit der bereits vorhandenen Baueigenschaft "Vorlagen für
      Bauvorhaben: Auswahl Bauwerkszuordnungen" (allerdings ist diese eine "flache" Liste, die Untergruppen sind in der Liste mit enthalten)
- ==**Hinweis**==: Für die Nutzungsprofile DGNB und BNB sollten wir pro Profil einen **"Nachhaltigkeitssteckbrief"** als Dokument von Edit
  erhalten, das dann als Bauinformation der entsprechenden Baueinheit zugeordnet werden kann als Teil eines Bauinformationsprofils.
- ==**Achtung**==:
  - Die restlichen Knoten in obigem Zweig des Bauvorlagenunterbaums beziehen sich vorwiegend auf
    die **Gebäudestruktur** und werden
    in konkreten Bauvorhaben z.B. durch eine durch Stockwerke und Räume strukturierte Baueinheitenstruktur des jeweiligen Gebäudes
    modelliert
  - Eine genauere Analyse der weiteren Kapitel "Raumprogramm" und "Bauteilbezogene Eigenschaften bzw. Anforderungen" (inklusive "Dächer") im
    Word-Dokument steht noch aus
  - Das Kapitel "Zeitangaben" könnte man in zusätzliche Felder (mit entsprechenden Baueigenschaften des Wertetyps "Datumswertepaar")
    im Baueigenschaftsprofilformular "Bauvorhaben" unterbringen

---

#### **[Epic 10]** ==**[WORK]**== ==Design für das **Baueigenschaftsprofilformular für Projekt/Bauvorhaben**==

- Dieses Formular muss umfangreiche Eigenschaften verwalten, die im Word-Dokument "BAUVORHABENSBAUM" bzw. aus dem daraus
  generierten Excel-Dokument "BIM.click Stammdaten für Baustoff- und Bauvorhabenbaum" spezifiziert sind im Kapitel 1.
- Einige davon wurden vorläufig bereits im Formular für das erste prototypische Baueigenschaftsprofilformular "Bauvorhaben (Preview)" implementiert
- Das Kapitel "Nachweise und Dokumente" kann durch zugeordnete Bauinformationen an der Baueinheit für das Bauvorhaben implementiert werden
- Felder im Einzelnen:
  - **Projektbezeichnung**: =="Baueinheit > Bauvorhaben > Projekt > Bezeichnung"== - Bezeichnungswertepaar (Kurzbezeichnung, Langbezeichnung)
  - **Projektnummer**: =="Baueinheit > Bauvorhaben > Projekt > Nummer" - Bezeichnungswert"== - eventuell mit Maske #####
  - **Name des Projektleiters**: =="Baueinheit > Bauvorhaben > Projekt > Leiter > Name"== - Bezeichnungswertepaar (Vorname, Name)
  - **Benutzerkennung des Projektleiters**: =="Baueinheit > Bauvorhaben > Projekt > Leiter > Benutzerkennung"== - Bezeichnungswert (E-Mail-Adresse/Benutzerkennung des
    Projektleiters)
  - **Art der Baumaßnahme** gemäß Bauantrag:
    - =="Baueinheit > Bauvorhaben > Baumaßnahme > Art"== - Aufzählungswert
    - Optionen: "Errichtung, Änderung", "Nutzungsänderung ohne bauliche Änderung", "Nutzungsänderung mit baulicher Änderung", "Beseitigung"
  - Die folgenden 3 potentiellen weiteren Baueigenschaften
    - sind teilweise in Kapitel 8 im Word-Dokument enthalten
    - werden teilweise in UStrich verwaltet (=> Prio 3)
    - sind mit Datumsangaben gekoppelt
    - ==**[TBD]**== **Projektstatus**
      - Eventuell: =="Baueinheit > Bauvorhaben > Projekt > Status"== - Aufzählungswert mit Einfachauswahl
      - Optionen: Z.B. "Angelegt", "Angebot abgegeben", "Auftrag erhalten", "In Umsetzung", "In Wartezustand", "Storniert", "Abgeschlossen"
    - ==**[TBD]**== **Leistungsphase** nach HOAI
      - https://de.wikipedia.org/wiki/Leistungsphasen_nach_HOAI
    - ==**[TBD]**== Durchzuführende bauphysikalische **Leistungen/Tätigkeiten/Arbeiten/Ergebnisse**
      - Z.B. Planungsgutachten, Mängelgutachten, Wärmeschutznachweis, Schallschutznachweis, EnEV-Nachweis, Gutachten für Schallimmissionsschutz etc.
      - Eventuell: "Baueinheit > Bauvorhaben > Projekt > Tätigkeiten" - Aufzählungswert mit Mehrfachauswahl
  - **Projektbeteiligte** (Master-Daten dafür in UStrich CRM-System!)
    - Für jeden Projektbeteiligten zu verwalten:
      - Firma (Name, Rechtsform, eventuell Anschrift, was aber mindestens 2 weitere Baueigenschaften erfordert)
      - 1 bis n Ansprechpartner mit Vorname, Name, eventuell minimale Kontakdaten (Telefonnummern, E-Mail-Adresse, Titel, was aber weitere Baueigenschaften erfordert)
    - Liste der Projektbeteiligten aus dem Word-Dokument:
      - Architekt (allgemein)
      - Architekt (Leistungsphase 1-3)
      - Architekt (Leistungsphase 4-5)
      - Architekt (Leistungsphase 6-8)
      - Bauherr
      - Bauleiter (allgmein)
      - Bauphysiker (allgemein)
      - Bauphysiker (Energiekonzept)
      - Bauphysiker (Thermische Bauphysik)
      - Bauphysiker (Energiesparnachweis)
      - Bauphysiker (Thermische Gebäudesimulation)
      - Bauphysiker (Abdichtungsplanung)
      - Bauphysiker (Radon-Abdichtungsplanung)
      - Bauphysiker (Schallschutz)
      - Bauphysiker (Schallimmissionsschutz)
      - Bauphysiker (Raumakustik)
      - Bauträger
      - Bauunternehmer (allgemein)
      - Behördenvertreter (allgemein)
      - BIM-Koordinator
      - Fachbauleiter (allgemein)
      - Fachbauleiter (Systemtrennwände)
      - Fachplaner (allgemein)
      - Fachplaner (Schallschutz)
      - Fachplaner (Schallimmissionsschutz)
      - Fachplaner (Raumakustik)
      - Fachplaner (Elektroakustisk)
      - Fachplaner (Elektro)
      - Fachplaner (Gebäudetechnik)
      - Fachplaner (Blitzschutz)
      - Fachplaner (Tragwerke)
      - Fachplaner (Heizung, Klima und Lüftung)
      - Fachplaner (Sanitär)
      - Fachplaner (Bäder)
      - Fachplaner (Küchen)
      - Fachplaner (Aufzüge)
      - Fachplaner (Rolltreppen)
      - Fachplaner (Fördertechnik)
      - Fachplaner (Logistik - externe/ übergeordnete und interne Personen- und Güterströme)
      - Fachplaner (Baulogistik - interne Baulogistik und Verkehrssicherung)
      - Fachplaner (Verkehr - Zufahrtsstraßen)
      - Fachplaner (Fabriken)
      - Fachplaner (Krankenhäuser)
      - Fachplaner (Alarmierung)
      - Fachplaner (Bühnen- und Veranstaltugnstechnik)
      - Fachplaner (Landschaftsplanung)
      - Fördermittelgeber (allgemein)
      - Fördermittelgeber (KfW)
      - Fördermittelgeber (L-Bank)
      - Fördermittelgeber (Hausbank)
      - Generalunternehmer (allgemein)
      - Gutachter (allgemein)
      - Gutachter (Hydrogeologie)
      - Gutachter (Altlasten)
      - Gutachter (Kampfmittelbeseitigung)
      - Gutachter (Schadstoffe - Aushub)
      - Gutachter (Schadstoffe - Bestandsuntersuchung)
      - Handwerker (allgemein)
      - Nutzer
      - Projektleiter (allgemein)
      - Sachverständiger (allgemein)
      - Sachverständiger (luftfahrtrechtliche Betriebsgenehmigung der Landeplattform)
      - Sicherheits- und Gesundheitsschutzkoordinator (SiGeKo)
      - Strahlenschutz-Sachverständiger (Medizin)
      - Tragwerksplaner (Statiker)
      - Vermessungsingenieur
    - Die Vielfalt spricht dafür, die Verwaltung dynamisch per Aufzählungsfeld "Rolle" zu halten!
    - Allerdings kann die Rolle sowohl an der Firma als auch am Ansprechpartner festgemacht werden!
    - Insofern wäre es am flexibelsten, z.B die Felder unten in einer Tabelle zu halten, wo man beliebig viele Firmen
      Firmen mit beliebig vielen Ansprechpartnern und deren Rollen anlegen kann
    - Felder dafür (ca. 50, um alle obigen Fälle abzudecken!):
      - =="Baueinheit > Bauvorhaben > Projekt > Beteiligter > Firma (001)"== - Bezeichnungswertepaar (Firmenname, Rechtsform)
      - =="Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner > Name (001)"== - Bezeichnungswertepaar (Vorname, Name)
      - =="Baueinheit > Bauvorhaben > Projekt > Beteiligter > Ansprechpartner > Kontaktdaten (001)"== - Bezeichnungswertepaar (Telefonnummer, E-Mail-Adresse)
      - =="Baueinheit > Bauvorhaben > Projekt > Beteiligter > Rolle (001)"== - Aufzählungswert mit Optionen aus obiger Liste
    - ==**[TODO]**== Vor deren Implementierung sollte dies mit den Feldern und Formaten in UStrich abgeglichen werden!
    - Weitere Felder aus Abschnitt 1.4 "Art des Projekts: Neubau, Erweiterung, Bestandsumbau oder Denkmalsanierung"
      - **Kombination Neubau/Sanierung**: =="Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau/Neubau > Kombination"== - Aufzählungswert (Einfachauswahl)
      - Davon abhängig weitere Felder: Kennwert (Baujahr Bestandsbau), Förderungsfähigkeit - diese ist allerdings komplex und sollte Prio 3 sein!
      - Eventuell verschachtelter Aufzählungswert? Allerdings sind die Verfeinerungen dann Eigenschaft an den Gebäuden!
      - Optionen:
        - "Reiner Neubau"
        - Unterscheidung der **Nutzung als Wohngebäude/Nichtwohngebäude** für den Neubau
        - =="Baueinheit > Bauvorhaben > Baumaßnahme > Neubau > Nutzung > Wohn-/Nichtwohngebäude?"== (Wahrheitswert)
        - Davon abhgängig: **Förderfähigkeit für Wohngebäude** (Prio 3)
          - =="Baueinheit > Bauvorhaben > Baumaßnahme > Neubau > Nutzung > Wohngebäude > Förderung"== (Aufzählungswert)
            - Optionen TBD - zahlreiche Programme, https://www.baufoerderer.de/finanzieren-foerdermittel/foerdermittelsuche
        - "Neubau als Anbau an unsaniertem Bestandsbau"
          - Davon abhängig:
            - **Baujahr Bestandsbau**: =="Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau > Baujahr"== (Bezeichnungs- oder Datumswert, siehe oben)
            - **Heizungsart Bestandsbau**: =="Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau/Neubau > Heizung"== (Aufzählungswert)
              - Optionen:
                - "Heizung im Neubau ist unabhängig von bestehender Heizung im Bestandsbau",
                - "Heizung im Bestandsbau versorgt Neubau",
                - "Heizung im Neubau versorgt Bestandsbau",
                - "Heizung im Neubau versorgt weitere Gebäude"
        - "Neubau als Anbau mit Sanierung Bestandsbau"
          - Davon abhängig:
            - **Baujahr Bestandsbau** (Bezeichnungs- oder Datumswert, siehe oben)
            - **Denkmalschutzanforderung Bestandsbau**: =="Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau > Denkmal > Schutz"== (Aufzählungswert)
              - Optionen:
                - "Bestandsbau ohne Denkmalanforderung",
                - "Bestandsbau ist Kulturdenkmal",
                - "Bestandsbau ist Kulturdenkmal mit besonderer Bedeutung nach § 12 Denkmalschutzgesetz"
            - ==Es gilt dann eigentlich auch die Förderungsmöglichkeiten für Wohngebäude am Neubau und Altbau!==
        - "Sanierung Bestandsbau ohne Neubau"
          - Davon abhängig:
            - **Baujahr Bestandsbau** (Bezeichnungs- oder Datumswert, siehe oben)
            - Unterscheidung der **Nutzung als Wohngebäude/Nichtwohngebäude** für den Bestandsbau
              - =="Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau > Nutzung > Wohn-/Nichtwohngebäude?"== (Wahrheitswert)
              - Davon abhgängig: **Förderfähigkeit für Wohngebäude** (Prio 3)
                - =="Baueinheit > Bauvorhaben > Baumaßnahme > Bestandsbau > Nutzung > Wohngebäude > Förderung"== (Aufzählungswert)
                  - Optionen TBD - zahlreiche Programme, https://www.baufoerderer.de/finanzieren-foerdermittel/foerdermittelsuche

---

#### **[Epic 11]** ==**[WORK]**== ==Design für das **Baueigenschaftsprofilformular für Räume**==

- Dieses Formular muss umfangreiche Eigenschaften verwalten für Räume
- Es sollte **ein Formular** für alle Raumtypen geben (aus dem Excel-Sheet für die erweiterte DIN 18599), für die es jeweils ein eigenes
  Baueigenschaftsprofil geben muss (zur Verwaltung unterschiedlicher Vorgabewerte) - insofern handelt es sich um einen Zwitter aus einem
  generischen und einem spezifischen Baueigenschaftsprofilformular
- Man kann über ein Diskriminator-Feld (Aufzählungswert "Raumtyp (nach DIN 18599)" oder "Nutzungart (nach DIN 18599)", Baueigenschaft an allen Räumen) steuern, welches Profil ggf. aktiviert werden soll und welche Vorgabewerte dabei
  eingetragen werden sollen durch die Aktivierung des Profils an einer Baueinheit
- Ist ein solches Baueigenschaftsprofil aktiviert, kann obiges Baueigenschaftsprofilformular dafür verwendet werden, um die Werte der dem Profil
  zugeordneten Baueigenschaften zu editieren
- Analoges gilt für die Gebäudetypen (nach DGNB, BNB, etc.)

---

#### **[Epic 12]** **[DONE]** (Prio 3) Einstellungen/Verwaltung

- Das jetzige Tab "Verwaltung" aufteilen in 2 Tabs:
  - Tab "Einstellungen": Für alle Benutzer sichtbar
  - Tab "Verwaltung": Nur für Administratoren sichtbar
- Einstellungen: Dort konfigurierbare Einstellungen für den einzelnen Benutzer
  - Z.B. Anzahl der Zeilen in den Tabellen
  - Dort Änderung des Vornamens, Namens
  - Dort Änderung des Kennworts
    - Zur Kennwortänderung mit Passport local Mongoose: Siehe Vorlage in https://stackoverflow.com/questions/17828663/passport-local-mongoose-change-password
      - Es muss 2 Varianten dafür geben:
        - Kennwortänderung - mit bekanntem bisherigen Kennwort mit der changePassword()-Methode von passport-local-mongoose, Funktion im Tab "Einstellungen" > "Benutzerkonto"
        - Kennwort vergessen - dann muss ein Link auf eine Seite verschickt werden an die E-Mail-Adresse áus der Benutzerkennung, mit dem ohne altes Kennwort ein neues gesetzt werden
          kann - die Seite kann ähnlich aufgebaut sein wie die Seite zur Kontobestätigung (konto-bestaetigung.vue). Die Änderung erfolgt dann mit setPassword()-Methode von passport-local-mongoose.
- Verwaltung
  - Dort z.B. Tab mit Übersicht aller Benutzer
  - Details-Tab für Benutzer mit allen Feldern
    - Dort Verwaltung der Benutzerrolle und -gruppe

---

#### **[Epic 13.a]** Security: Authentification/Authentifizierung von Benutzern

- ==**Hinweis**==: Dieses Epic würde übernommen aus Evernote-Notiz "BIM.click Next Level 1/3"
- Update 13.03.2020: Für vorläufige Registrierung/Anmeldung/Abmeldung von Benutzern - Test User michael.scheible@bimlive.de, bl..... - Test User bim.click@kurz-fischer.de, bi.b.m - Funktionieren auf Heroku - Funktionieren lokal - Fazit bzgl. der dafür verwendeten Pakete: - Die beste Kombination ist - Passport - damit können später zusätzliche Authentication Strategies und Authentication Provider (per OAuth) eingebunden werden - JWT - erscheint der Alternative Session Cookies überlegen - Local Mongoose Strategy für Passport: Damit können Credentials (Userid, Password) am Server direkt in Mongoose verwaltet werden - Für diese Kombination am Besten geeignete Tutorials sind unten mit XXXXXX markiert: - Passport, JWT, local Mongoose Strategy, ohne Frontend/Vue: - https://codebrains.io/add-jwt-authentication-to-an-express-api-with-passport-and-es6/ - DRY-Prinzip (Don't Repeat Yourself) - Mit Vue Frontend, JWT, Passport, reguläre local Strategy (allerdings nicht Mongoose local Strategy): - https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport - Mongoose local Strategy, allerdings mit Session Cookies statt JWT (diesen Teil dabei ignorieren): - https://chunkbytes.com/2019/02/user-authentication-with-passport-express/ - Zu evaluieren: - Passport für Authentication - Z.B. zunächst mit local Strategy, d.h. eigenen User Ids, die in Datenbank zusammen mit Password Hash gespeichert werden - Kommt meistens zusammen mit JWT, um API Calls secure zu machen - Alternative: Session Cookies - Vergleich: https://wp-rocket.me/blog/difference-json-web-tokens-vs-session-cookies/ - Local Strategy Tutorials: - https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport - ohne Frontend, nur mit secured REST APIs, JWT - https://www.signet.hr/learn-how-to-handle-authentication-with-node-using-passport-js/ - ohne Frontend, mit REST APIs und Mongoose Backend, mit JWT, erzeugt zusätzliche Routes am Backend, z.B., um User zurückzugeben - XXXXXX https://chunkbytes.com/2019/02/user-authentication-with-passport-express/ - dort nur den Teil verwenden, der die local Mongoose Strategy betrifft, nicht Session Cookies (stattdessen besser JWT verwenden!) - Passport mit Express-Session, d.h. Session Cookies statt JWT - https://github.com/expressjs/session - https://www.npmjs.com/package/express-session - Hinweis. Session Cookies werden vom Browser automatisch gespeichert - Hinweis: Der voreingestellte Session Store am Server ist für Development - erfordert anderen Sesssion Store für Production! - Spezielles Tutorial für Express Sessions mit Passport: - https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d - Allgemeine Security Best Practices für Node/Express: https://expressjs.com/de/advanced/best-practice-security.html - Benutzt spezielle local Mongoose Strategy (Mongoose Plugin), ohne Frontend, ohne JWT (Session + Cookie) - Erspart z.b. das Hashen des Passworts - Bringt zusätzliche Methoden mit - https://github.com/saintedlama/passport-local-mongoose#plugin-passport-local-mongoose - Tutorial dafür: https://mherman.org/blog/user-authentication-with-passport-dot-js/ - NPM Package: https://www.npmjs.com/package/passport-local-mongoose - Installation: npm install passport passport-local mongoose passport-local-mongoose - https://stackoverflow.com/questions/36465196/passport-local-mongoose-authenticate-user-right-after-registration/36498612 - Hinweis: App.js in obigem Tutorial mit Session Cookies entspricht back-end-server.js bei BIM.click - In diesem Tutorial mit Session Cookies ist nicht enthalten, wie "normale" Routes außer /register, /login, /logout guarded, d.h. secured werden bei Verwendung von Session Cookies: - Siehe dazu das weitere Tutorial unten: https://blog.jscrambler.com/vue-js-authentication-system-with-node-js-backend/ - Dies wird hier genauer erklärt: https://stackoverflow.com/questions/57487107/how-to-implement-session-cookie-based-authentication-in-vue-js - Mit JWT geht auf Server Seite in den Controllern das Handling von "normalen" Routes wie in https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport:
  `javascript router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) { var token = getToken(req.headers); if (token) { Book.find(function (err, books) { if (err) return next(err); res.json(books); }); } else { return res.status(403).send({success: false, msg: 'Unauthorized.'}); } });` - Wie man mit JWT die Tokens auf Client-Seite mit Axios und local Storage verwendet, wird in diesem Tutorial gecovered (Modify Book List Component): - https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport - Ähnlich wie oben dort der Code auf Server-Seite in den Route Controllern für die normalen Routes (getToken) - Axios Kann im übrigen Session Cookies mitgeben per { withCredentials }: - https://stackoverflow.com/questions/52549079/does-axios-support-set-cookie-is-it-possible-to-authenticate-through-axios-http - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials - Tendenziell erscheint JWT gängiger und skalierbarer als Session Cookies - Daher ist eine bessere Kombination: - JWT - Passport - local Mongoose Strategy - XXXXXX - kurzes Tutorial dafür, mit Guarding der "normalen" Routes, in diesem Fall die für die User-Verwaltung: https://codebrains.io/add-jwt-authentication-to-an-express-api-with-passport-and-es6/ - Covered nur Register und Login - Change password mit local Mongoose Strategy: https://stackoverflow.com/questions/17828663/passport-local-mongoose-change-password - Logout: http://www.passportjs.org/docs/logout/ - einfach per req.logout(); - Detailprobleme beim Logout: https://stackoverflow.com/questions/13758207/why-is-passportjs-in-node-not-removing-session-on-logout - https://www.sitepoint.com/local-authentication-using-passport-node-js/ - Passport mit local Strategy, Mongoose, HTML Frontend - sehr simples/basic Tutorial - Im zweiten Schritt über OAuth Provider Strategy - OAuth - A delegated authentication strategy - Ist eine Option für Passport, die Credentials durch externe Identity Provider verwalten zu lassen (Google, GitHub, Microsoft, Twitter, etc.) - https://github.com/jaredhanson/passport-oauth2 - Oauth2 Strategy für Passport, Support für sehr viele OAuth Provider - http://www.passportjs.org/docs/oauth/ - https://www.youtube.com/watch?v=CHodPpqLqG8 - Auch für Authorization - Tutorials - https://www.jokecamp.com/tutorial-passportjs-authentication-in-nodejs/ - Passport, OAuth mit Passport-Github Strategy - Auth0 - Authorization Service - Ist eine gemanagete Alternative zu Passport - Vergleich: https://www.reddit.com/r/node/comments/6abtuh/auth0_or_passport/ - https://github.com/auth0-samples/auth0-javascript-samples/tree/master/01-Login - Kann klassische Userids in Datenbank verwalten - Kann alternativ wie OAuth externe Identity Provider unterstützen - Tutorial: https://auth0.com/docs/quickstart/spa/vanillajs - Tutorial mit Vue App: https://auth0.com/blog/vuejs2-authentication-tutorial/ - Passport Tutorials speziell für Vue Apps: - XXXXXX https://www.djamware.com/post/5ac8338780aca714d19d5b9e/securing-mevn-stack-vuejs-2-web-application-using-passport - Vue App mit Mongoose Backend, Passport mit local Strategy und JWT - User Ids/hashed Passwörter werden in Mongoose gespeichert - => Wahrscheinlich am besten geeignet als Starter Vorlage, um BIM.click statt der Vue App im Tutorial damit anzureichern! - => Modifizieren mit obiger local Mongoose Strategy statt einfacher local Strategy - => Eventuell später erweitern mit E-Mail-Verifikation gemäß erstem Tutorial in der entsprechenden Liste unten - https://blog.jscrambler.com/vue-js-authentication-system-with-node-js-backend/ - Vue App mit Backend, Passport mit local Strategy, ohne JWT, dafür Cookies - https://medium.com/@nohkachi/express-4-x-oauth-and-local-authentication-with-passport-js-pt-1-9165ad509a53 - Komplexer, mit local und OAuth Strategies, unterscheidet Dev/Prod - Teil 2: https://medium.com/@nohkachi/express-4-x-oauth-and-local-authentication-with-passport-js-pt-2-23466afc89a - https://jasonwatmore.com/post/2018/07/14/vue-vuex-user-registration-and-login-tutorial-example - mit Vuex - https://jasonwatmore.com/post/2018/07/06/vue-vuex-jwt-authentication-tutorial-example - mit JWT und Vuex - https://jasonwatmore.com/post/2019/03/08/vuejs-role-based-authorization-tutorial-with-example - ohne Passport (stattdessen eigener Authentication Service) mit JWT, ohne Vuex - User Abspeicherung am Backend ist gefaked - Verwendet RxJS, um den currentUser als observable Object zwischen allen Vue Komponenten zu sharen - RxJS is used in the authentication service to expose the currentUser as an observable object, which is subscribed to in the app component so it can reactively show and hide when the user logs in and out. - In a nutshell RxJS is used to communicate between components, for more info on using Vue with RxJS see Vue.js + RxJS - Communicating Between Components with Observable & Subject. - There are other options for communicating between components in Vue and reactively updating the UI like in the example, one option is using Vuex to store the currentUser object that is accessible by any component. Or a basic approach would be to use a Vue instance as an event bus that components can use to publish and subscribe to events. You'll be able to find lots of examples for these approaches online. - Tutorials mit zusätzlicher E-Mail-Verification des Users - https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb - die E-Mail-Verifikation hier ist nur eine Erweiterung für existierendes Login/Logout, ohne Passport, mit Token based Authentication, kann angepasst werden mit Passport - https://stackoverflow.com/questions/28847491/verification-email-with-token-in-passport-js - ohne Passport - https://github.com/sahat/hackathon-starter - umfangreichere Boilerplate, die u.a. auch Authorization mit e-Mail Verification enthält, basierend auf Passport - https://github.com/sahat/hackathon-starter/blob/master/controllers/user.js - Controller Methoden für User Management inklusive Mail-Versand mit Verification Token - Mongoose 'User Model: https://github.com/sahat/hackathon-starter/blob/master/models/User.js - Benutzt HTML 5 mit Pug Templating Engine für das Frontend, nicht Vue oder Quasar - Authentication mit Quasar: - https://alinex.gitlab.io/framework/quasar/#quasar-framework - mit JWT, aber ohne Passport! - Quasar App Extension für token based Authentication: - https://www.npmjs.com/package/quasar-app-extension-auth-token-based - benutzt Vuex Store - Kommt ohne Passport- als Vorlage nehmen? - Test zeigt, dass die Integration der App Extension komplex ist: - Standalone Installation durch Download des GitHub Repos: Test App Ist nicht zum Laufen zu bekommen - Installation in die existierende BIM.click Frontend App mit quasar ext add auth-token-based - Prompted diverse Settings, z.B. die zu securenden Backend APIs: Dort http://127.0.0.1 eingegeben - Problem 1: Viele rote Vetur Warnungen in VS Code für den .vue Code in der App Extension - Überschreibt axios.js Boot File, diese vorher gesaved - Sicherheitshalber auch Vuex installiert mittels npm install vuex --save (wird benutzt) - Vorher schon yarn und bash installiert per NPM - Bash scheint aber nicht zu funktionieren, braucht laut Google separates Enabling auf Windows 10? - Zu Yarn siehe auch https://classic.yarnpkg.com/en/docs/install#windows-stable - Diese nicht weiter verfolgt, da die App Extension Installation funktionierte - Securing der Backend APIs: - Es kam mit der App Extension nun ERR_CONNECTION_REFUSED, z.B. wenn man http://127.0.0.1:8080/baustoffe/rohstoffe/extrakt eingibt - Dies lag jedoch daran, dass das BIM.click Backend nicht gestartet war, nicht an der App Extension - Diese müsste sich erst in einem modifizierten routes.js in alle Routes einklinken und den JWT Token abprüfen, - MyLayout.vue kam erst hoch nach Eingriff in routes.js (dort den Pfad "" durch "/" ersetzt) - Dort dann testweise eine Route /login eingebaut, um die Login Kompente der App Extension anzuzeigen, es kommt jedoch (Problem 2) ein undefined-Fehler bei deren Rendern - Die Komponente müsste wohl erst initialisiert werden mit Code wie in der Test App für die App Extension (dort: AuthMenu.vue) - Siehe https://forum.quasar-framework.org/topic/5281/trying-to-run-quasar-app-extension-auth-token-based/5 - Alternativen: https://www.reddit.com/r/node/comments/5bhsya/what_do_you_use_for_user_management/ - Weitere Packages: - https://github.com/braitsch/node-login - Mit Demo auf Heroku, https://nodejs-login.herokuapp.com/ - benutzt Pug als Templating Engine für das Sample UI - https://www.npmjs.com/package/express-user-management - https://www.npmjs.com/package/mongoose-user-management - Eventuelle Probleme mit QUploader in Umgebungen, die Authentication brauchen: - https://forum.quasar-framework.org/topic/3729/uploader-with-axios - Axios benutzt direkte XHR Requests - https://gomakethings.com/why-i-still-use-xhr-instead-of-the-fetch-api/ - Interessante Alternative: - AWS Amplify Cognito Authentication Service - Serverless Authentication: https://www.youtube.com/watch?v=fVT4D5REUos - Getting started with Quasar framework: https://www.youtube.com/watch?v=BK66mQTSl7U - Adding aws amplify support to Quasar framework: https://www.youtube.com/watch?v=1F0SfYmrSbA&list=PLAl8os33KyOVpzfYznpguV_5euzKJ626V - Tutorial mit Quasar und Cogito: - Teil 3 mit Cogito: https://medium.com/quasar-framework/creating-a-quasar-framework-application-with-aws-amplify-services-part-3-4-6cf349d29903 - Teil 1: https://medium.com/quasar-framework/creating-a-quasar-framework-application-with-aws-amplify-services-part-1-4-9a795f38e16d

---

#### **[Epic 13.b]** **[DONE]** (Prio 2) Benutzerverwaltung mit Zugriffskontrolle und Benutzerberechtigungen (in "Verwaltung" und anderen Teilen)

::: warning Hinweis
Auch Administratoren und Redakteure können **nicht** durch Kopieren/Bewegen von Zweigen aus Baueinheiten, an denen bestimmte Autoren zugeordnet sind, unter
Zweige, denen andere Autoren zugeordnet sind, die **Vererbungsregel für Autoren** verletzen, nach der die Autoren am Kindknoten stets eine Untermenge
der Autoren am Elternknoten sind. Dies wird dadurch vom System sichergestellt, dass bei vorhandenen Autoren am Zielelternknoten stets diese vererbt
werden an die Knoten im verschobenen/kopierten Zweig (im Backend in copyZweig()). Auch bei Operationen von Mitarbeitern im Baum ist dies sichergestellt.
:::

- Konzept für **Rollen** von Benutzern (die Begriffe sind angelehnt an https://wordpress.com/de/support/benutzerrollen/)
  - **Administratoren** sind zu allem berechtigte Benutzer - diese dürfen alles im System, so z.B. auch andere Benutzer löschen, neue Benutzer anlegen, etc.. Sie können auch
    alle inhaltlichen Änderungen im System sehen, so z.B. Baustoffe im Status "Entwurf" (siehe unten)
  - **Redakteure** sind besonders berechtigte Benutzer - diese dürfen alle inhaltlichen Änderungen im System durchführen an Baustoffen, Bauvorhaben, Bauinformationen und
    Baueigenschaften
  - **Mitarbeiter** sind reguläre/normale Benutzer - diese dürfen einzelne Bauvorhaben erstellen/ändern - in den übrigen Inhalten im System haben sie nur beschränkte Berechtigungen
- Damit verbunden sind bestimmte **Berechtigungen** für diese Rollen für Aktionen auf bestimmten Objekten (Erstellen, Lesen, Ändern, Löschen, Umbenennen)
- Das Konzept dafür ist noch weiter zu erarbeiten und zu vervollständigen
- Stufe 1 - Grobkonzept für Berechtigungen (nach Konstrukten und Rollen) (Prio 2)
  - In **Baustoffen**
    - **[DONE]** Grundfunktionen
      - **Redakteure** können Baustoffe im Baustoffbaum erstellen, lesen, ändern, und löschen
      - **Mitarbeiter** können Baustoffe nur lesen
      - Mitarbeiter können lesend den Baustoffbaum inspizieren
      - Mitarbeiter können Referenzen darauf in Baueinheiten erzeugen
      - Hinweise für Implementierung am Frontend:
        - Für Mitarbeiter muss man dafür in Baustoffen folgende Buttons/Kontextmenüoptionen/Tabs/Felder **disablen**:
          - Die Kontextmenüs im Baustoffbaum für Neuanlegen, Umbenennen, Löschen - "Bearbeiten" wird bei Benutzerrolle "Mitarbeiter" "Anzeigen"
          - Sämtliche QInputs/QToggles/QSelects und die Buttons "Speichern" und "Zurücksetzen" in den Tabs der oberen Tableiste unter "Baustoffe"
            - Im Tab "Zugeordnete Rohstoffe":
              - Dort müssen die Checkboxes für das Ticking disabled werden für Mitarbeiter
              - Außerdem müssen die Popup-Menüs zur Eingabe der Angaben zum Rohstoff im Baustoff disabled werden für Mitarbeiter
              - ==**Hinweis**: Das Ticking für die Nodes im Rohstoffbaum konnte bisher nicht disabled werden, ist aber einstweilen okay so, da
                das Speichern disabled ist==
            - Im Tab "Zugeordnete Bauinformationen":
              - Dort muss das QSelect disabled werden für Mitarbeiter
          - In der unteren Tableiste für "Baueigenschaften":
            - Im Tab "Übersicht":
              - Die Kontextmenüoptionen für das Aktivieren/Deaktivieren, Löschen und Neuanlegen einer Baueigenschaft müssen disabled werden für Mitarbeiter
              - "Bearbeiten" könnte bleiben, aber ohne "Speichern" (sollte dann "Anzeigen" heißen in Abhängigkeit von der Benutzerrolle)
            - Im Tab "Beschreibung für ausgewählte Baueigenschaft":
              - Die Eingabefelder müssen disabled werden für Mitarbeiter
              - Ebenso die Buttons das "Speichern" und "Zurücksetzen" der Beschreibung
            - Im Tab "Details für ausgwählte Baueigenschaft":
              - Die Eingabefelder müssen disabled werden für Mitarbeiter
              - Ebenso die Buttons für das "Speichern" und "Zurücksetzen" der Baueigenschaft
            - Das Tab "Neuanlage einer Baueigenschaft"
        - Redakteure hätten wie bisher Zugang zu allen diesen Funktionen
    - ==**[DEFER]** Ausbaustufe (Prio 3): **"Redaktions-Workflow"**==
      - Mitarbeiter können dann ebenfalls neue Baustoffe erstellen
      - Diese erhalten zunächst einen Status **"Entwurf"** und sind dann nur für den jeweils **erstellenden Mitarbeiter** sichtbar - der Status "Entwurf" ist also jeweils gekoppelt
        mit einem zugehörigen erstellenden Mitarbeiter
        - ==**Hinweis**==: Das Design, um solche Baustoffe im Status "Entwurf" für andere Mitarbeiter auszublenden, ist zu entscheiden
        - Entwurf einer Lösung am Frontend:
          - Dort ist dafür ein Eingriff in den Code für die Baustoffbaumverwaltung nötig - nach dem Lazy Loading aller Knoten
            aus dem Backend dürfen nur die für den jeweiligen Benutzer sichtbaren Baustoffe in den verschachtelten Array nodesTreeBaustoffe geladen werden, und
            nicht die im Status "Entwurf" befindlichen Baustoffe anderer Benutzer (außer für Administratoren, die stets alle Baustoffe im System sehen sollten)
          - Beim Speichern und bei Änderungen in den Baumstrukturen durch Redakteure könnte es allerdings komplex werden, da dann sichergestellt werden muss, dass parallel
            erstellte neue Baustoffe im Status "Entwurf" nicht überschrieben werden, und dass "normale" Baustoffe nicht als Zweige in im Status "Entwurf" befindliche
            Baustoffe kopiert oder verschoben werden, wodurch "hybride" Strukturen entstehen würden
        - Eine Lösung am Backend, die dort bereits nicht sichtbare Knoten für einen Benutzer "ausblendet", ist ebenfalls denkbar, erscheint aber komplexer, da sie
          wahrscheinlich Eingriffe in den Code am Backend und am Frontend erfordert
      - In diesem Status "Entwurf" darf der erstellende Mitarbeiter den betreffenden Baustoff auch bearbeiten, umbenennen und löschen, sowie ebenfalls im Status "Entwurf"
        befindliche Baustoffe unter dem betreffenden Baustoff anlegen
      - Zweige, die im Status "Entwurf" sind, unterliegen auch den Aktionen "Kopieren"/"Verschieben" und "Löschen"
      - Der erstellende Mitarbeiter kann den betreffenden Baustoff anschließend in den Status **"Überprüfung"** (genauer: "Überprüfung angefordert") überführen
      - In diesem Status wird der betreffende Baustoff für **Redakteure** sichtbar und änderbar
        - Dafür sind wieder oben bereits beschriebene Änderungen im Code für die Baustoffbaumverwaltung nötig, um die Sichtbarkeit für Redakteure herzustellen
        - Redakteure sollten Benachrichtigungen für die zu überprüfenden Baustoffe erhalten, z.B. per E-Mail
      - Erst wenn der Redakteur den betreffenden Baustoff **freigibt** und damit in den Status **"Freigabe"** (genauer: "Freigabe erteilt") überführt, wird dieser für **alle** Benutzer sichtbar
      - Alternativ sollte ein Redakteur den betreffenden Baustoff im Status "Überprüfung" auch **zurückweisen** können - dadurch wird dieser wieder in den obigen Status **"Entwurf"** zurückversetzt und ist nur für seinen erstellenden Mitarbeiter sichtbar
  - ==**[WORK]**== In **Baueinheiten**
    :::
    ==**Aktueller Stand der Implementierung der Benutzerberechtigungen für Baueinheiten**==
    - Im Bauvorhabenbaum:
      - **[DONE]** Button für "Löschen": Selektiv disabled nach den Regeln unten im Design
      - **[DONE]** Button für "Neu anlegen"
        - **[DONE]** Selektiv disabled nach den Regeln unten im Design
        - ==**Hinweis**==: Mitarbeiter dürfen damit z.B. keine Baueinheiten mehr
          anlegen unter Baueinheiten, die sie nicht selbst angelegt haben (oder für die sie als Autoren eingetragen sind)! Sie können
          jedoch immer noch unter Baueinheiten mit leerem Array-Feld benutzerKennungenAutoren, so z.B. unter
          der Baueinheit "Bauprojekte" in der aktuellen Heroku-Datenbank, neue Bauvorhaben/Baueinheiten anlegen (verifziert nach
          Deployment auf Heroku)
        - **[DONE]** Es fehlt noch die **Weitervererbung der Autoren** nach einer Neuanlage aus dem Elternknoten an den neuen Kindknoten!
          - In baueinheiten.vue, Methode createChildBaueinheit() sowie in baueinheiten.controller.js,
            Methode createKindKnotenBaueinheit():
            - Fügt, wenn angemeldeter Benutzer Mitarbeiter ist und nicht schon als Autor im Array-Feld
              benutzerKennungenAutoren
              des Elternknotens enthalten ist, diesen als zusätzlichen Autor am Kindknoten hinzu
            - ==**Achtung**==: Es wird bei Redakteuren und Administratoren dem Array-Feld
              benutzerKennungenAutoren ==**nicht**== die benutzerKennung des angemeldeten Benutzers hinzugefügt!
              Dies erlaubt die Hinzufügung von Kindknoten mit leerem Array-Feld durch Redakteure und
              Administratoren.
              Das können Strukturierungsknoten oben im Baum sein oder Knoten im Bauvorlagenunterbaum.
              Fügt ein Redakteur oder Administrator in einem Bauvorhaben mit nicht leerem Array-Feld einen
              Kindknoten ein, so wird mit obiger Logik dessen ArrayFeld benutzerKennungenAutoren vom
              Elternknoten unverändert übernommen.
        - ==**[DEFER]**== (Prio 3) Es fehlt noch (für Mitarbeiter) ein zusätzliches Disabling der Neuanlage bzw. des Bewegens unter einen Knoten
          mit leeren Array-Feld benutzerKennungenAutoren, der **nicht der unterste** solche Knoten mit leerem Array-Feld im Pfad aufwärts ist
          (siehe dazu die Kommentare unten)
      - **[DONE]** Kontextmenü für "Löschen": Selektiv disabled nach den Regeln unten im Design
      - **[DONE]** Kontextmenü für "Umbenennen": Selektiv disabled nach den Regeln unten im Design (verwendet selbe Funktion wie für "Löschen")
      - **[DONE]** Kontextmenü für "Neu anlegen":
        - **[DONE]** Selektiv disabled nach den Regeln unten im Design
        - Die analoge Methode benutzerDarfNeuanlegenKindKnotenUnterNodeTreeBaueinheiten(node) zur computed-Funktion
          benutzerDarfNeuanlegenKindKnotenUnterSelectedNodeTreeBaueinheiten ist in methods:
        - Die bereits vorhandene Methode benutzerDarfBearbeitenImBauvorlagenunterbaumSelectedNodeTreeBaueinheiten(node) wurde
          auch für das Kontextmenü zur Neuanlage verwendet (wird schon verwendet für Kontextmenüs zum
          Löschen/Umbenennen)
        - **[DONE]** **Weitervererbung der Autoren** aus dem Elternknoten an den neuen Kindknoten
          - Siehe oben (für Button)
      - **[DONE]** Kontextmenü für "Markierung setzen": Selektiv disabled nach den Regeln unten im Design
        - **[DONE]** ==In diesem Fall wird aktuell nichts disabled!== D.h. auch Mitarbeiter dürfen Zweige überall im Baum
          markieren zum Verschieben oder Kopieren - allerdings ist das Verschieben beschränkt durch Disabling des
          Kontextmenüs dafür (siehe nächstes Bullet)
      - **[DONE]** Kontextmenü für "Markierten Zweig hierher verschieben": Selektiv disablen
        - **[DONE]** Disabled, wenn Mitarbeiter kein Autor an der Wurzel des markierten Zweigs ist
        - **[DONE]** Disabled, wenn Mitarbeiter in den Bauvorlagenunterbaum verschieben will
        - **[DONE]** Selbe Regeln am neuen **Elternknoten** des zu verschiebenden Zweigs enforcen wie bei Neuanlage (siehe oben)
        - **[DONE]** **Weitervererbung der Autoren** aus dem Elternknoten an die Knoten im verschobenen Zweig
          - Musste in baueinheiten.vue, Methode bewegeZweig() sowie in baueinheiten-controller.js, Methode
            bewegeZweigBaueinheit() eingebaut werden
            - Dort zusätzliche Body-Felder eMailBenutzer und benutzerRolle für das API /baueinheiten/:id/zweig
            - Am API Handler bewegeZweigBaueinheit() im Backend (wie in createKindKnotenBaueinheit() Weitervererbung
              von benutzerKennungenAutoren
            - Diese rekursiv in alle Knoten im Zweig eintragen - betrifft Methode copyZweig()
      - **[DONE]** Kontextmenü für "Markierten Zweig hierher kopieren": Selektiv disablen
        - **[DONE]** Disabled, wenn Mitarbeiter in den Bauvorlagenunterbaum kopieren will
        - **[DONE]** Selbe Regeln am neuen **Elternknoten** des zu kopierenden Zweigs enforcen wie bei Neuanlage (siehe oben)
        - **[DONE]** Auch die **Weitervererbung der Autoren** aus dem Elternknoten an die Knoten im kopierten Zweig wurde implementiert
    - **[DONE]** In den verschiedenen QTabs im QSplitter rechts vom QTree für den Bauvorhabenbaum:
      - Disabling der Tabs/Form Components/Buttons/Kontextmenüs wie unten beschrieben
    - **[DONE]**: Vor Deployment dieses Codes nach Heroku musste in allen (aktuell 2801) Dokumenten in der BaueinheitenCollection in der
      Datenbank auf MongoDB Cloud Atlas das neue Array-Feld benutzerKennungenAutoren hinzugefügt werden - Diese können danach vorläufig per Compass testweise mit Benutzerkennungen zum Testen versehen werden - Z.B. könnte man für jeden Mitarbeiter ein Testbauvorhaben anlegen, in dem benutzerKennungAutoren für den betreffenden  
       Mitarbeiter gesetzt ist und diesen zum Editieren darin berechtigt - Wegen der vielen Knoten in Vorlagen für Baueinheiten könnte bauvorhaben.json um dieses Feld erweitert werden und dann neu importiert werden - Alternativ kann mit der **MongoDB Shell** das Feld zu allen Dokumenten in der BaueinheitenCollection hinzugefügt werden - Instruktionen auf https://cloud.mongodb.com/v2/5e54e923b4e2d2704c5f06f8#clusters/commandLineTools/Cluster0 - @ms - MongoDB Shell bereits heruntergeladen auf ThinkPad X1 Yoga und extrahiert nach
      C:\Users\BIMIive\Downloads\MongoDB\mongodb-shell-win32-x86_64-2012plus-4.2.8\mongodb-win32-x86_64-2012plus-4.2.8\bin - Dieser Pfad-String musste lokal, per Windows Systemeigenschaften/Umgebungsvariablen, zum lokalen Windows Path hinzugefügt werden,
      um MongoDB Shell dann starten zu können aus Windows Command Window oder Node.js Command Shell - In Node.js Command Shell: - Siehe https://docs.mongodb.com/manual/mongo/
      `mongo` - Dieser Befehl startet MongoDB Shell defaultmäßig gegen lokale MongoDB - Alternativ gegen die Cloud-Datenbank namens "test" auf MongoDB Atlas connecten:
      `mongo "mongodb+srv://cluster0-ft9dn.mongodb.net/test" --username dbUser` - Es kommt dann ein Prompt für das Passwort: Dieses pasten z.B. aus Evernote, direkte Eingabe schlägt, warum auch immer, fehl - Besser das Passwort direkt mit angeben (siehe Evernote-Dokument von MS):
      `mongo "mongodb+srv://cluster0-ft9dn.mongodb.net/test" --username dbUser --password >>password<<` - Gegen die neue Cloud-Datenbank mit geändertem Namen "bimclickdb" auf neu angelegtem MongoDB Cluster 1 connecten:
      `mongo "mongodb+srv://cluster1.ft9dn.mongodb.net/bimclickdb" --username dbUser --password >>password<<` - In MongoDB Compass: - Neue TestCollection in vorhandener Datenbank test angelegt - Neues Dokument darin erzeugt mit ADD DATA, dieses dann dupliziert mit Copy/Paste-Funktionen - Diese Dokumente dienten als Testdokumente, um nun mit MongoDB Shell neues Feld hinzuzufügen an allen Dokumenten - In MongoDB Shell
      `javascript use bimclick-test // (lokal) bzw. use test oder use bimclickdb (Heroku) db.TestCollection.updateMany( { }, { $set: { benutzerKennungenAutoren: [] }} ) db.BaueinheitenCollection.updateMany( { }, { $set: { zugeordneteBauinformationsProfile: [] }} ) db.BaustoffeCollection.updateMany( { }, { $set: { zugeordneteBauinformationsProfile: [] }} )` - Dies fügt neues, leeres Array-Feld "benutzerKennungenAutoren" bzw. "zugeordneteBauinformationsProfile" an allen Dokumenten der jeweiligen Collection hinzu - Vorlage: https://stackoverflow.com/questions/59038008/is-it-possible-to-add-a-field-to-every-document-in-a-collection-in-mongodb-compa
      `javascript db.BaueigenschaftenCollection.updateMany( { }, { $set: { systemdefiniertNichtBenutzerdefiniert: true, sollwertNichtIstwert: false }} ) db.BaueigenschaftenCollection.updateMany( { }, { $set: { baueigenschaftsAnzeigeText: null }} )` - Dies fügt neues String-Feld "baueigenschaftsAnzeigeText" allen Dokumenten hinzu - Hinweise: { } ist Filter, leerer Filter meint alle  
       `javascript db.BaueigenschaftenCollection.updateMany( { }, { $set: { recht: false, geografie: false, infrastruktur: false, geoPolitik: false, projektManagement: false, umweltUndKlima: false, hydroGeologie: false, geometrie: false, konstruktion: false, nutzungsUndBetriebsZeiten: false, beleuchtung: false, raumKlima: false, lastAnnahmen: false, materialEigenschaften: false, baueigenschaftsProfile: false, bauinformationsProfile: false }} )` - Weiteres Beispiel für komplexeren Update (Hinzufügen eines Felds "operator" mit Wert null in allen Elemente eines Arrays für eine Subcollection):
      `javascript db.TestCollection.updateMany( { }, { $set : {"baueigenschaften.$[el].operator": null }}, {multi: 1, arrayFilters: [{ "el.typbezogeneBaueigenschaft": {$ne: null}}] } )` - arrayFilters wählt hier alle Dokumente aus (denn alle haben das Feld typbezogeneBaueigenschaft !== null) - Vorlage: https://stackoverflow.com/questions/49204538/updating-multiple-subdocument-arrays-in-mongodb?answertab=votes#tab-top - Sicherheitshalber in Compass die Collection "dupliziert": - Export aller Dokumente in JSON-File (ohne id und \_v-Felder, Download File) - Dann Import dieser JSON-File in neu erstellte TestCollection (2801 Dokumente) - Dann obiges Command zum Hinzufügen des neuen Felds erst einmal auf der TestCollection getestet - Dann mit obigem Command erfolgreich die existierende BaueinheitenCollection auf MongoDB Cloud Atlas um das neue Array-Feld erweitert! - Weiteres Beispiel für Renaming eines Felds: - Vorlage: https://stackoverflow.com/questions/9254351/how-can-i-rename-a-field-for-all-documents-in-mongodb
      `javascript db.BaueigenschaftenCollection.updateMany( { }, { $rename: { "anzeigeText": "baueigenschaftsAnzeigeText" }} )` - Weiteres Beispiele für Renaming von Feldern: - Vorlage: https://stackoverflow.com/questions/9254351/how-can-i-rename-a-field-for-all-documents-in-mongodb
      `javascript db.BaueinheitenCollection.updateMany( { }, { $rename: { "zugeordneteProfile": "zugeordneteBaueigenschaftsProfile" }} ) db.BaustoffeCollection.updateMany( { }, { $rename: { "zugeordneteProfile": "zugeordneteBaueigenschaftsProfile" }} ) db.BaueinheitenCollection.updateMany( { }, { $rename: { "relevanteBaustoffe": "zugeordneteBaustoffe" }} ) db.BaustoffeCollection.updateMany( { }, { $rename: { "relevanteRohstoffe": "zugeordneteRohstoffe" }} ) db.BaueinheitenCollection.updateMany( { }, { $rename: { "relevanteBauinformationen": "zugeordneteBauinformationen" }} ) db.BaustoffeCollection.updateMany( { }, { $rename: { "relevanteBauinformationen": "zugeordneteBauinformationen" }} )` - Weiteres Beispiel für Hinzufügen eines Felds:
      `javascript db.BauinformationenCollection.updateMany( { }, { $set: { bauinformationsAnzeigeText: null }} )` - Dies fügt neues String-Feld "bauinformationenAnzeigeText" allen Dokumenten hinzu - Hinweise: { } ist Filter, leerer Filter meint alle  
       - Man könnte die Prüfung der Benutzerberechtigungen auch über eine Environment-Variable abschaltbar machen, oder
      diese unter "Verwaltung" aktivieren/deaktivieren (durch Administratoren)
      :::
    - Redakteure und Administratoren können **alle Baueinheiten** im Bauvorhabenbaum erstellen, lesen, ändern, und löschen
    - Mitarbeiter können **Vorlagen für Baueinheiten** im Bauvorhabenbaum lesen und Baueinheiten daraus in ihre Bauvorhaben bzw. die Baueinheiten darin
      kopieren
    - Nur Redakteure und Administratoren dürfen Baueinheiten in **Vorlagen für Baueinheiten** erstellen und Baueinheiten dorthin kopieren oder
      verschieben
    - Mitarbeiter können neue **Bauvorhaben** und Baueinheiten darin im Bauvorhabenbaum erstellen
    - ==**Bevorzugt**==: Mitarbeiter können alle Bauvorhaben und Baueinheiten darin lesen, aber nur selbst erstellte oder solche, denen sie
      als **Autor zugeordnet** sind, verändern oder löschen
    - In der Verwaltung des Bauvorhabenbaums sollten dafür der folgende neue Baumknotentyp eingeführt werden:
      - **[DONE]** **Bauvorlagenunterbaumwurzelknoten** zur Kennzeichnung des Wurzelknotens des dedizierten Unterbaums für die Vorlagen für Baueinheiten
        - Dieser sollte auch durch Redakteure und Administratoren nicht löschbar sein (dies gilt auch für den Rohstoffunterbaum!)
        - Darunter: Normale Knoten
          - "Blatt"/"Verzweigung"
          - Diese könnten in einer Ausbaustufe eventuell noch weiter spezialisiert werden bzgl. "Bauvorlage", "Baueinheit", etc.
    - Alle sonstigen Knoten unter dem Wurzelknoten des Bauvorhabenbaums sind normale Baueinheiten, die beliebig
      verschachtelt werden können, und zur Modellierung von Gruppen von Bauvorhaben, Bauvorhaben, und Baueinheiten in Bauvorhaben dienen
      - Auf diesen Knoten sollten **Autoren** wie oben skizziert verwaltbar sein
    - ==**Grobkonzept** dafür:==
      - Es sollte dafür wie schon in bauinformationen.vue einen Array "benutzerKennungenAutoren" auf Baueinheiten geben, mit dem verwaltet
        wird, welche Anwender **Autoren** für Baueinheiten in einem Bauvorhaben sind und diese verändern dürfen
      - Dieser kann in Baueinheiten im Unterbaum für die **Vorlagen für Baueinheiten**, die sowieso von Redakteuren verwaltet werden, leer bleiben, da für diese
        globale Berechtigungsprüfungen gemacht werden können, abhängig davon, ob die Baueinheit im Bauvorlagenunterbaum ist
        - Dazu kann eine zur Funktion selectedKeyTreeBaustoffeIstImRohstoffunterbaum() äquivalente Funktion
          selectedKeyTreeBaueinheitenIstImBauvorlagenunterbaum() dienen
      - Als **Ersteller** einer **neuen Baueinheit in der Ebene direkt unter dem Wurzelknoten** (außer im Bauvorlagenunterbaum) wird dabei der
        aktuell angemeldete Benutzer als **erster
        Autor** (d.h. dessen Benutzerkennung (E-Mail-Adresse)) vom System beim Speichern in den Array benutzerKennungenAutoren eingetragen
      - Ob der aktuelle Benutzer Autor für eine Baueinheit ist, kann im Code abgefragt werden mit:
        - ausgewaehlteBaueinheit.benutzerKennungenAutoren.includes(localStore.state.anmeldeDatenBenutzer.eMailBenutzer)
      - Bei der **Neuanlage von Kindbaueinheiten** sollte dann folgende Logik angewendet werden, an allen Baueinheiten auf allen Ebenen (außer im
        Bauvorlagenunterbaum), für Mitarbeiter (Redakteure und Administratoren sind dagegegen ggf. berechtigt):
        - Wenn am **Elternknoten** eine <u>nicht leere</u> Menge von Autoren zugeordnet ist:
          - Die Neuanlage von Kindbaueinheiten sollte nur enabled werden, wenn der aktuell angemeldete Benutzer in dieser Menge von zugeordneten
            Autoren am Elternknoten enthalten ist
          - Es sollte dann die **Autoren am Elternknoten** auch der Kindbaueinheit als Autoren zugeordnet werden **(Weitervererbung für Autoren)**
            - Dies bietet den wichtigen Komfort, dass nicht explizit auf allen Ebenen ein weiter oben bereits berechtigter Autor hinzugefügt
              werden
              muss an Kindbaueinheiten nach deren Neuanlage (d.h. Benutzeraufwand im good Case ist null)
            - Andererseits kann ein Autor, der oben bereits berechtigt ist, auf einer Ebene weiter unten explizit entfernt werden als Autor (d.h.
              Benutzeraufwand bleibt auf den bad Case beschränkt)
        - Wenn die Autoren am Elternknoten die <u>leere</u> Menge sind (z.B. am Wurzelknoten), sollte nur der **angemeldete Benutzer** der
          neuen Kindbaueinheit als Autor zugeordnet werden
        - Dies erlaubt ggf. Baueinheiten zur **Gruppierung von Bauvorhaben** in Ebenen unter dem Wurzelknoten, denen dann mehrere Autoren
          zugeordnet werden können - diese Menge von Autoren kann dann eingeschränkt werden auf tieferen Ebenen - ggf. kann die Menge der Autoren
          an solchen Baueinheiten zur Gruppierung auch leer sein
      - **[DONE]** Werden später die **Autoren für eine Baueinheit hinzugefügt** oder **entfernt**, muss diese Änderung an alle
        Kindbaueinheiten im
        betroffenen Zweig geeignet geeignet **weitervererbt** werden
        - Beim **Entfernen eines Autors** sollte man ihn auch an allen Kind- und Kindeskindbaueinheiten entfernen
        - Beim **Hinzufügen eines Autors** sollte man ihn auch an allen Kind- und Kindeskindbaueinheiten hinzufügen
        - ==**Achtung**==: Es ist noch zu definieren, was "Hinzufügen" bzw. "Entfernen" von Autoren in einem Unterbaum genau bedeutet:
          - ==**[Abgewählt] "Selektives Hinzufügen/Entfernen"**==:
            - Dabei würde ein Autor an jedem Knoten zur vorhandenen Menge von Autoren hinzugefügt werden
              bzw. aus dieser entfernt werden, sofern darin enthalten. Beim "Entfernen" ist dann zu beachten, dass dabei leere Autorenfelder
              tiefer im Pfad entstehen könnten, was die nachfolgend beschriebene Vererbungsregel für Autoren verletzen würde!
          - ==**[Ausgewählt] "Propagieren"**==:
            - Dabei werden an alle Knoten im Unterbaum die Belegung der Autoren am Wurzelknoten weitergereicht (deep Copy). Dabei werden
              die bisherigen Belegungen dann überschrieben.
            - Die Wertevererbungsregel kann dabei nur eingehalten werden, wenn die Belegung der Autoren am Wurzelknoten des Zweigs, an dem die
              Autoren geändert wurden, eine **Untermenge der Autoren am Elternknoten** ist
              - ==Dies muss also in jedem Fall geprüft und sichergestellt werden!==
              - ==Im QSelect dürfen dann als Options nur die Autoren des Elternknotens zur Anwahl/Abwahl angeboten werden, nicht alle
                Benutzer!==
            - Wenn die leere Menge propagiert wird, handelt es sich um den unten beschriebenen Sonderfall 1
        - Dabei sollte man folgende ==**Vererbungsregel für Autoren**== im Baum etablieren:
          - ==Das Hinzufügen von Autoren im Baum sollte nur dann erlaubt sein, wenn auch am Elternknoten im Pfad der Autor bereits zugeordnet
            ist, es sei denn, am Elternknoten sind die Autoren die leere Menge (was normalerweise für den Wurzelknoten des Bauvorhabenbaums
            gilt)==
          - Damit muss eine Autor stets auf der Ebene unter dem Wurzelknoten im Bauvorhabenbaum hinzugefügt werden bzw. auf der Ebene unter
            den ggf. vorhandenen Ebenen, auf denen keine Autoren zugeordnet sind (diese Knoten ohne Autoren können nur von Redakteuren oder
            Administratoren angelegt werden, da Mitarbeiter nur Kindbaueinheiten neu anlegen dürfen, wenn sie am Elternknoten bereits Autor
            sind oder dieser keine Autoren hat - siehe oben)
          - Er wird dann Autor für den gesamten Teilbaum, an dessen Wurzelknoten er hinzugefügt wird
          - Will man nicht, dass er auch Autor für Zweige in diesem Teilbaum wird, muss man ihn an deren Wurzelknoten im Teilbaum jeweils
            manuell entfernen
          - ==Damit bleibt die Menge der Autoren in Kindbaueinheiten stets eine Untermenge der Autoren an den Elternknoten weiter oben im
            Pfad, wobei "keine Autoren" bzw. die leere Menge am Elternknoten "alle Benutzer" bedeutet==
        - ==**Achtung**==: Beim Hinzufügen/Entfernen von Autoren üer QSelect muss die Weitervererbung dann für **Mengen aus mehreren Autoren**
          konzipiert werden:
          - Durch unbeschränktes, mehrfaches Hinzufügen/Entfernen von Autoren aus der Menge der Benutzer insgesamt per QSelect könnte die
            Resultatmenge ja auch völlig disjunkt sein mit der
            Ausgangsmenge (inklusive des Sonderfalls unten, dass der angemeldete Benutzer selbst aus der Resultatmenge entfernt wurde)
          - Deshalb ist die beste Lösung zur Einhaltung der Vererbungsregel diese:
          - ==Es wird vom System sichergestellt, dass die Resultatmenge stets eine Untermenge der Menge der Autoren am Elternknoten ist,
            es sei denn, die Autoren am Elternknoten sind leer==.
          - Dies kann folgendermaßen erreicht werden:
            - **[DONE]** In ersterem Fall: Model - Laden mit bisherigen Autoren, Options - Laden mit **Autoren am Elternknoten** (Obermenge)
            - **[DONE]** In letzerem Fall: Model - Laden mit bisherigen Autoren, Options - Laden mit allen **Benutzern** (Obermenge)
              - ==**[DEFER]**== ==Alternativ hier das Model mit nur allen **Mitarbeitern** statt **Benutzern** laden (ebenfalls Obermenge)==
            - Dafür neue computed Properties benutzerKennungenAutorenAmElternKnoten und elternKnotenHatZugeordneteAutoren in baueinheiten.vue definiert
          - **[DONE]** ==Die Resultatmenge wird stets als Ganzes **propagiert** an alle direkten und indirekten Kindknoten==
            - ==Dies wurde folgendermaßen implementiert als Erweiterung der Methode updateBaueinheit() in baueinheiten.controller.js:==
              - Analog zum Code in baueinheiten.controller.js, Methode bewegeZweigBaueinheit() für den betreffenden Knoten (an dem das Array-Feld
                benutzerKennungenAutoren geändert wurde und vererbt werden soll an alle direkten und indireken Kindknoten) zunächst
                MPath-Methode knoten.getAllChildren() aufrufen wie im Code ab ca. Zeile 715, dann die Menge children aller ids der Kinder aus dem
                Resultatobjekt extrahieren, dann updateMany für diese children aufrufen mit Update des Felds benutzerKennungenAutoren:
                - baueinheitenModel.updateMany( { \_id: { $in: children }}, { $set: { benutzerKennungenAutoren: benutzerKennungenAutorenImWurzelKnoten }} )
                - Alternativ Chaining-Syntax verwenden wie in Zeilen 1583 ff.
                - Achtung: Für korrekte Funktion der MPath-Methode getAllChildren muss im vorausgehenden Mongoose-Call unbedingt das Feld path im .select angegeben
                  werden!
              - Hinweis: In createChildBaueinheit() ist die Vererbung der zugeordneten Autoren aus dem Elternknoten bereits implementiert.
                Eine Weitervererbung ist dort nicht notwendig.
          - ==**[DEFER]**== In einer Ausbaustufe könnte man auch einen **komplexeren Algorithnums für das Propagieren der Autoren**
            implementieren, der für Knoten, an denen
            die Autoren bereits eingeschränkt (d.h. eine echte Untermenge der Autoren am Elternknoten) sind, dies Einschränkung beibehält.
            Allerdings muss man dann bei potentiell durch Entfernen eines Autors entstehenden leeren Knoten die Autoren des Elternknotens
            übernehmen (d.h. eine unechte Untermenge der Autoren am Elternknoten), um die Vererbungsregel einzuhalten
        - ==**Achtung**==: Beim Hinzufügen/Entfernen von Autoren müssen zusätzlich bestimmte **Sonderfälle** abgefangen werden:
          1. Das **Entfernen des letzten zugeordneten Autors** per QSelect (d.h. leere Resultatmenge) sollte für alle Benutzerrollen, um obige
             Vererbungsregel für Autoren zu gewährleisten, **nur erlaubt** sein, ==wenn der **Elternknoten** des betreffenden Knotens im Pfad
             ebenfalls **keine zugeordneten Autoren** hat==
             - **[DONE]** Dies kann durch eine computed Property elternKnotenHatZugeordnetenAutoren abgeprüft werden, die abhängig ist von
               benutzerKennungenAutoren am Elternknoten. Diese sollte als Teil einer Validation am QSelect,
               falls dessen <u>neues</u> v-model ein leerer Array ist, zusätzlich als Bedingung abgeprüft werden, und bei Resultat "true"
               der &&-Verknüpfung beider Bedingungen eine Fehlermeldung usgeben, sowie das weitere Speichern verbieten.
             - Insgesamt wurde es mit einer externen Quasar Validation und einer weiteren computed Property isValidAutorenAusgewaehlteBaueinheit
               gelöst in baueinheiten.vue
             - Am Wurzelknoten kann die obige computed Property elternKnotenHatZugeordnetenAutoren "false" sein - allerdings wird
               bereits anderweitig (siehe unten) gewährleistet, dass diesem keine
               Autoren zugeordnet sind, insofern dürfte dort dieser Fall nicht auftreten
             - Hinweis: Wegen 2. unten muss das QSelect sowieso zusätzlich eine disable-Prüfung haben für die Einhaltung der Regel 2.
             - Alle direkten und indirekten Kindknoten müssen bei positiver Validation beim Speichern am Backend per **Weitervererbung**
               ebenfalls in Knoten ohne zugeordnete Autoren umgewandelt werden, das heißt, die leere Menge wird dann an alle ==**propagiert**==
             - Sie werden dadurch (eventuell temporär) allen Benutzern zugänglich gemacht
             - Durch **Hinzufügen von Autoren** an einen solchen "leeren" Knoten durch einen Administrator (siehe unten)
               können sie wieder in "normale" Bauprojekte umgewandelt werden können mit Berechtigungsbeschränkungen
             - Wenn obiger Fall 1 nicht ausgeschlossen wäre, könnten Lücken und
               Inkonsistenzen bezüglich der Autoren in einem Pfad entstehen: Wenn andernfalls benutzerKennungenAutoren unter einem
               Knoten mit zugeordneten Autoren geleert würde (inklusive
               aller direkten und indirekten Kindknoten), würde schon dies die Vererbungsregel für Autoren verletzen, gemäß der in jedem Pfad
               von der Wurzel des Bauvorhabenbaums abwärts zunächst ein Teilpfad ohne zugeordnete Autoren existiert (Strukturierungsknoten),
               gefolgt von einem Teilpfad mit zugeordneten Autoren, in dem die Autoren jeweils eine Untermenge der Autoren am Elternknoten sein
               müssen. Außerdem hätte es zur Folge, dass jeder Mitarbeiter in dem betreffenden Zweig eine neue Baueinheit anlegen dürfte: Dann
               gäbe es im Pfad von der Wurzel abwärts einen Teilpfad ohne zugeordnete Autoren (Strukturierungsknoten), dann einen Teilpfad mit
               zugeordneten Autoren, dann einen Teilpfad ohne zugeordnete Autoren, und unten nochmals einen Teilpfad mit zugeordneten Autoren, d.
               h. die Vererbungsregel wäre sogar mehrfach verletzt.
          2. Demzufolge sollte das manuelle **Hinzufügen von Autoren an einen bisher "leeren" Knoten ohne zugeordnete Autoren** ==nur für
             **Administratoren**== erlaubt werden - **[DONE]** Für den **Wurzelknoten** und für **Knoten im Bauvorlagenunterbaum** sollte dies generell ausgeschlossen werden - Für diese sollte man das QSelect für das Hinzufügen/Entfernen von Autoren generell disablen - **[DONE]** Die so manuell hinzugefügten Autoren müssen an alle direkten und indirekten Kindknoten ==**weitervererbt**, d.h. in diesem Fall  
              als Array ==**propagiert**== werden, nicht nur den vorhandenen Arrays hinzugefügt werden==. Andernfalls könnte es zu Verletzungen
             der Vererbungsregel für Autoren kommen! - **[DONE]** Die Bedingung unter 2. oben kann erreicht werden, indem das QSelect zum Hinzufügen/Entfernen von Autoren zusätzlich disabled wird, wenn das
             Array-Feld benutzerKennungenAutoren am ausgewählten Knoten leer ist (length === 0) <u>und</u> die Benutzerrolle des angemeldeten Benutzers nicht "Administrator" ist - ==**Hinweis**==: Dies ist zu unterscheiden von der **Neuanlage** eines neuen Kindknotens unter einem bisher "leeren" Knoten ohne
             zugeordnete Autoren, welche per Button oder Kontextmenü für Mitarbeiter erlaubt ist (derjenige wird dann als Autor zugeordnet)
             3.Das **Entfernen des aktuell angemeldeten Autors** durch einen Mitarbeiter könnte erlaubt sein (solange, wegen obiger Regel 1,
             noch ein anderer Autor zugeordnet ist) - **[DONE]** Es sollte dann schon bei der Abwahl im QSelect oder vor dem Speichern eine Warnung erfolgen - Danach müsste, weil die Benutzerberechtigungen reaktiv per :disable Property sind, er keine Änderungen mehr machen dürfen an
             der betreffenden Baueinheit (er darf diese Aktion dann auch nicht rückgängig machen, deshalb sollte vorher eine
             Warnung angezeigt werden) - Dies wurde ebenfalls in isValidAutorenAusgewaehlteBaueinheit eingebaut. - ==**[TODO]**== Die Logik dafür ist allerdings sehr komplex und muss noch weiter getestet werden.
          3. **[DONE]** Das **Hinzufügen/Entfernen von Autoren** kann wie schon beschrieben per QSelect mit Button "Speichern" erfolgen. Dazu muss das Tab
             "Strukturierungsangaben" angepasst werden. Es könnte künftig allgemeiner "Angaben zur Baueinheit" heißen,
             und 3 vertikale Spalten haben:
             - Strukturierungsangaben (zur Baueinheit) (die bisherigen Felder oberen 3 Felder)
             - Bemerkung (zur Baueinheit)
             - Zugeordnete Autoren (der Baueinheit, QSelect)
               Außerdem müssen beim Speichern (API Handler für Put-Route \bauenheiten\:id) die neuen Autoren an die direkten und indirekten
               Kindknoten **weitervererbt** werden
      - **[DONE]** [Implementiert in baueinheiten.controller.js, bewegeZweig()] Beim **Kopieren/Verschieben** von Zweigen unter eine Baueinheit (z.B. aus Vorlagen oder aus anderen Bauvorhaben):
        - Da Mitarbeiter alle Vorlagen für Baueinheiten und Bauvorhaben lesen dürfen, muss am **Ausgangsknoten** nur geprüft werden, ob der betreffende
          Mitarbeiter zugeordneter Autor am Wurzelknoten des markierten Zweigs ist - wenn ja, muss Verschieben und Kopieren des markierten Zweigs
          erlaubt werden, wenn nein, darf nur Kopieren erlaubt werden
          - Da an den Knoten im Bauvorlagenunterbaum keine Autoren definiert sind, kann ein Mitarbeiter damit auch nichts aus diesem
            Unterbaum heraus verschieben (nur kopieren)
          - Administratoren und Redakteure sollten einstweilen immer von überall nach überall verschieben und kopieren dürfen
          - In einer Ausbaustufe könnte man diesen z.B. auch verbieten, etwas aus dem Bauvorlagenunterbaum heraus zu verschieben (nach
            außerhalb - innerhalb sollte auch Verschieben erlaubt sein)
        - Am neuen **Elternknoten** des kopierten/verschobenen Zweigs:
          - Es gelten dieselben Regeln wie oben für die Neuanlage von Kindbaueinheiten für die Zuordnung der Autoren am Elternknoten des
            kopierten/verschobenen Zweigs
          - Zusätzlich muss eine ==**Weitervererbung**== der so definierten Autoren aus dem neuen Elternknoten des kopierten/verschobenen Zweigs an sämtliche
            Baueinheiten im kopierten/verschobenen Zweig durchgeführt werden
    - ==**[DEFER]**== In den Zweigen des Bauvorhabenbaums, die nicht zum Bauvorlagenunterbaum gehören (welche Bauvorhaben/Gruppen von Bauvorhaben, bestehend aus
      Baueinheiten, repräsentieren):
      - Spezielle **weitere Baumknotentypen** sind dafür vorerst <u>nicht</u> geplant, wie z.B.:
        - **Bauvorhabengruppe** (für Knoten zur Strukturierung)
          - Wäre nur erlaubt unter dem Bauvorhabenbaumwurzelknoten oder unter ggf. vorhandenen Bauvorhabengruppenknoten, nicht unter
            ggf. vorhandenen Bauvorhabenknoten
          - Ordnet den erstellenden Benutzer als ersten Autor zu, falls nicht schon weiter oben im Pfad Autoren definiert sind
        - **Bauvorhaben** (für ein Bauvorhaben im engeren Sinn - dieses könnte auch als **Bauprojekt** bezeichnet werden)
          - Wäre nur erlaubt unter dem Bauvorhabenbaumwurzelknoten oder unter vorhandenen ggf. Bauvorhabengruppenknoten, nicht unter
            ggf. vorhandenen Bauvorhabenknoten
          - Könnte eventuell auch eine automatische Profilaktivierung wie oben beschrieben machen
          - Ordnet den erstellenden Benutzer als ersten Autor zu, falls nicht schon weiter oben im Pfad Autoren definiert sind
      - **[DONE]** Wird eine besondere <u>Unterstrukturierung</u> der Bauvorhaben unter dem Bauvorhabenbaumwurzelknoten gewünscht, kann eine solche
        bei Bedarf aus normalen Knoten (Baueinheiten) angelegt werden, wobei für diese die oben beschriebenen Autoren gesetzt bzw. vererbt werden
        können:
        - z.B. Baueinheiten für Gruppen von Bauvorhaben nach Kalenderjahren
        - z.B. Baueinheiten für Gruppen von Bauvorhaben nach Typ des Bauvorhabens
        - z.B. Baueinheiten für Gruppen von Bauvorhaben nach Teams von Benutzern (die dann bereits entsprechende Autoren zugeordnet haben können, welche
          dann weitervererbt werden bei Neuanlage von Kindbaueinheiten oder Kopieren/Verschieben von Zweigen unter die Baueinheit für das Team)
      - ==**[TODO]**== Für Baueinheiten im **Bauvorhabenbaum** muss es außerdem (am Besten auch im Unterbaum für die Vorlagen für Baueinheiten)
        möglich sein, spezielle **Tabs mit Baueigenschaftsprofilformularen** freizuschalten,
        wie z.B. aktuell das prototypisch implementierte Tab/Formular **"Bauvorhaben (Preview)"**
        - Die derzeitige, vorläufige Implementierung von "Bauvorhaben (Preview)" prüft, ob sämtliche dafür notwendigen
          Baueigenschaften aktiviert sind und enabled dann das entsprechende Tab dafür
        - Für die endgültige Implementierung sollten diese zu einem speziellen, vordefinierten **Baueigenschaftsprofil** zusammengefasst
          werden
        - An einem einzelnen Bauvorhaben kann dann mit der sowieso geplanten Aktion **"Benutzerprofil aktivieren"** dieses Profil aktiviert
          werden - es werden dadurch die speziellen Baueigenschaften für ein Bauvorhaben aktiviert, sowie ggf. das/die für das Profil definierte Tab(s)
          mit **Baueigenschaftsprofilformularen** (so auch eines für die **"Bauvorhaben (Preview)"**) angezeigt
        - Vorteile:
          - Dasselbe Prinzip kann auch auf andere spezielle Baueinheiten (z.B. einen Bodenaufbau) angewendet werden
          - Eine besondere Aktion "Bauvorhaben anlegen", welches dann dieses spezielle, vordefinierte
            Profil aktiviert und das zugehörige Tab freischaltet, ist dann nicht unbedingt notwendig
          - Dadurch kann vermieden werden, dass es zu viele verschiedene Aktionen im Baum gibt, was den Benutzer eventuell überfordern würden
          - Allerdings werden für wichtige Aktionen (Neuanlage Bauvorhaben, Fußboden, Wand, ...) doch Kontextmenüs gewünscht
      - Weitere Überlegung:
        - Abhängig vom Autoren-Feld könnte man im Frontend beim Lazy Loading (neben den Vorlagen) auch nur die Bauvorhaben laden und im
          Baum anzeigen, die vom jeweiligen Benutzer erstellt wurden - damit könnten Mitarbeitern nur die Projekte lesen und bearbeiten,
          denen sie als Autor zugeordnet sind
        - In der ersten Implementierung wird man die Sichtbarkeit jedoch bei allen Baueinheiten belassen und nur die Änderbarkeit und
          Löschbarkeit auf die Baueinheiten beschränken, denen ein Mitarbeiter als Autor zugeordnet ist
    - **[DONE]** Weitere Hinweise für Implementierung der Berechtigungen am Frontend:
      - Bei der Auswahl von Knoten im Bauvorhabenbaum:
        - Falls es sich um eine Baueinheit im Bauvorlagenunterbaum handelt, müssen die Kontextmenüs für Neuanlage/Löschen/Umbenennen von
          Baueinheiten stets disabled werden für Mitarbeiter (nicht für Redakteure und Administratoren)
          - Hinweis: Im Bauvorlagenunterbaumwurzelknoten dürfen auch **keine** Autoren eingetragen werden, da diese beim Markieren von Zweigen
            sonst mit kopiert werden!
        - Falls es sich um eine Baueinheit in den übrigen Zweigen im Bauvorhabenbaum handelt (also den eigentlichen Bauvorhaben), gilt:
          - Wenn der Benutzer Mitarbeiter ist:
            - Disablen/Enablen von **"Neuanlage Kindknoten"** unter einem Knoten:
              - Hinweis: Implementiert in computed-Funktion benutzerDarfNeuanlegenKindKnotenUnterSelectedNodeTreeBaueinheiten für Buttons
                bzw. benutzerDarfNeuanlegenKindKnotenUnterNodeTreeBaueinheiten(node) für Kontextmenüs
              - Wenn der Knoten, unter dem der neue Kindknoten angelegt werden soll, der **Wurzelknoten** ist:
                - Dies muss aus Konsistenzgründen abhängig gemacht werden von Autoren, die ggf. auch schon am Wurzelknoten zugeordnet werden
                  könnten (z.B. alle Benutzer oder alle Mitarbeiter)
                - Normalerweise sollten allerdings am Wurzelknoten keine Autoren definiert sein, sondern erst an den Knoten darunter (außer im
                  Bauvorlagenunterbaum, wo keine Autoren definiert sein sollten)
                - Es kann dafür dann dieselbe Logik wie unten verwendet werden!
              - Wenn am Knoten, unter dem der neue Kindknoten angelegt werden soll (dies kann auch der Wurzelknoten sein) **keine Autoren**
                definiert sind (d.h. die leere Menge, hier gleichbedeutend mit "keine Einschränkungen"):
                - Die Neuanlage eines Kindknotens unter diesem Elternknoten sollte dann enabled werden (per Kontextmenü oder Button)
                - **[DEFER]**: **Idee**: Dies sollte besser nur unter dem **untersten** Knoten in einem Pfad aus lauter leeren Autoren enabled werden!==
                - Andernfalls wäre es möglich, dass ein Mitarbeiter auch neue Bauvorhaben unter Bauvorhabengruppen "weiter oben" anlegt, falls es
                  mehrere Ebenen von Bauvorhabengruppen mit leeren Autoren gibt
                - Dies könnte ermittelt werden durch eine computed-Funktion, die jeweils den untersten Knoten im "leeren" Teilpfad ermittelt, vom
                  betreffenden Knoten aufwärts zum Wurzelknoten (dabei können Elternknoten und Wurzelknoten zusammenfallen)
                - Allerdings stellte sich heraus, dass dies nicht ohne Backend-Calls geht, die ggf. sogar tiefer die Kinder inspizieren müssten,
                  als Kinder im Frontend lazy loaded sind!!!
                - Deshalb diese Idee vorläufig verworfen - Mitarbeiter darf also aktuell unter jedem Knoten mit leerem Array-Feld
                  benutzerKennungenAutoren eigene Kindknoten anlegen oder (selbe Logik) markierte Zweige dorthin bewegen
                - ==**[TODO]**==: (Prio 3) Dies sollte später noch verbessert werden! Eventuell muss dafür allerdings der Baum geladen werden
                  bis zum
                  jeweils ersten Kindknoten im Pfad mit nicht leeren Autoren, um unnötige Backend Calls zu vermeiden.
              - Andernfalls (wenn also am Knoten, unter dem der neue Kindknoten angelegt werden soll, **Autoren zugeordnet** sind):
                - Wenn der Mitarbeiter **zu diesen Autoren gehört**:
                  - Er darf dann einen neuen Kindknoten unter dem Elternknoten anlegen
                - Andernfalls: Neuanlage disablen
              - ==**Hinweis**==: Dies erlaubt auch, dass ggf. am Wurzelknoten bereits Autoren eingetragen werden (z.B. alle Benutzer oder alle
                Mitarbeiter)
            - Disablen/Enablen von **"Löschen"** bzw. **"Umbenennen" eines Knotens**:
              - Hinweis: Implementiert in computed-Funktion benutzerDarfBearbeitenSelectedNodeTreeBaueinheiten für Buttons
                bzw. Methode benutzerDarfBearbeitenNodeTreeBaueinheiten(node) für Kontextmenüs
              - Wenn der zu löschende oder umzubennende Knoten der **Wurzelknoten** ist: Dieser darf nicht gelöscht
                oder umbenannt werden, also disablen
              - Andernfalls:
                - Wenn am betreffenden Knoten **keine Autoren** definiert sind (d.h. die leere Menge):
                  - Der Mitarbeiter darf dann den Knoten nicht löschen oder umbenennen (per Kontextmenü oder Button)
              - Andernfalls (wenn also **Autoren zugeordnet** sind):
                - Wenn der Mitarbeiter **zu diesen Autoren gehört**:
                  - Der Mitarbeiter darf den Knoten löschen oder umbenennen (per Kontextmenü oder Button)
                  - ==**Achtung**: Dies erlaubt auch das Löschen oder Umbenennen von Knoten für Bauvorhabengruppen mit zugeordneten Autoren, zu
                    denen der Mitarbeiter gehört==
                    - Diese können ohne besondere Auszeichnung von Bauvorhabengruppen als zusätzlichen Baumknotentyp nicht unterschieden
                      werden von Bauvorhaben, an denen der Mitarbeiter als Autor zugeordnet ist
                    - Es ist aber konsequent, denn wenn ein Mitarbeiter Autor an einem Knoten ist, sollte er diesen auch löschen oder
                      umbenennen dürfen
                - Andernfalls: Löschen und Umbenennen disablen
          - Andernfalls (Benutzer ist Redakteur oder Administrator)
            - Alle Aktionen enablen
      - Für Mitarbeiter muss man dafür bei Auswahl von Baueinheiten im Bauvorhabenbaum, an denen sie nicht als Autor zugeordnet sind
        (inklusive leerem Array-Feld benutzerKennungenAutoren), oder an Baueinheiten im Bauvorlagenunterbaum (wo Änderungen durch Mitarbeiter generell
        disabled werden sollten), folgende Komponenten **disablen**:
        - **[DONE]** Dies kann geprüft werden mit diesen bereits vorhandenen computed Properties:
          - :disable = "!benutzerDarfBearbeitenSelectedNodeTreeBaueinheiten ||
            !benutzerDarfBearbeitenImBauvorlagenunterbaumSelectedNodeTreeBaueinheiten"
          - Diese wurden zusammengefasst zu einer gemeinsamen computed Property benutzerDarfBearbeitenInklusiveBauvorlagenunterbaumSelectedNodeTreeBaueinheiten
            - Diese prüft beide obige computed Properties mittels &&-Operator
        - **[DONE]** Die entsprechenden QInputs/QToggles/QSelects/QUploaders/QPopupEdits in den QForms, sowie die folgenden Buttons/Kontextmenüoptionen/Tabs:
          - Sämtliche Buttons "Speichern" und "Zurücksetzen" in den Tabs der oberen Tableiste unter "Bauvorhaben"
            - ==**[TODO]**==: Im Tab "Zugeordnete Baustoffe" ist ein Disablen der Checkboxes für das Ticking von Knoten im dortigen Baustoffbaum
              nicht über eine disable-Prop möglich. Ob Knoten tickable sind, kann gesteuert werden über eine optionale Property am Node (disabled: true).
              Diese müsste allerdings an allen Knoten im Baum gesetzt werden. Da der Button für das Speichern in diesem Tab sowieso disabled ist,
              werden eventuell geänderte ticked Nodes dort sowieos nicht abgespeichert, daher hat dies Priorität 3.
          - In der unteren Tableiste für "Baueigenschaften":
            - Im Tab "Übersicht":
              - Die Buttons für das "Speichern" und "Zurücksetzen" einer Baueigenschaft
              - Die Kontextemenüoptionen für das Aktivieren/Deaktivieren und Löschen einer Baueigenschaft (Bearbeiten könnte bleiben, aber
                ohne Speichern)
            - Im Tab "Beschreibung für ausgewählte Baueigenschaft" die Buttons das "Speichern" und "Zurücksetzen" der Beschreibung
            - Im Tab "Details zur ausgewählten Baueigenschaft" die Buttons für das "Speichern" und "Zurücksetzen" der Baueigenschaft
            - Das gesamte Tab "Neuanlage einer Baueigenschaft"
        - **[DONE]** Das Markieren von Zweigen im Bauvorhabenbaum kann weiter erlaubt werden sowohl für Zweige, die in den Vorlagen für Baueinheiten liegen, als auch
          für Zweige in Bauvorhaben (da ein Mitarbeiter auch diese lesen darf)
        - **[DONE]** Das anschließende Kopieren von Zweigen darf nur nach Knoten enabled werden, für die der betreffende Mitarbeiter Autor ist
        - **[DONE]** Das anschließende Verschieben von Zweigen darf nur erlaubt werden, wenn der betreffende Mitarbeiter auch Autor am Wurzelknoten des zu
          verschiebenden Zweigs ist
      - Redakteure und Administratoren haben Zugang zu allen diesen Funktionen
  - **[DONE]** In **Baueigenschaften**
    - Redakteure können (typbezogene) Baueigenschaften erstellen, lesen, ändern und löschen, ebenso wertbezogene Baueigenschaften
    - ==Zu entscheiden:==
      - <u>Alternative 1:</u> Auch Mitarbeiter dürfen neue typbezogene Baueigenschaften anlegen
        - Dies ist ja eine vorhandene Funktion im Tab "Baueigenschaften", die für vom Mitarbeiter erstellte Baueinheiten zur Verfügung steht (sofern nicht disabled für Baueinheiten, an denen der Mitarbeiter nicht als Autor zugeordnet ist)
        - Vorteile:
          - Am großzügigsten, jeder Benutzer kommt in den Genuß der flexiblen Hinzufügung neuer Attribute
          - Kein Implementierungsaufwand - es ist dafür nichts zu disablen!
        - Nachteile:
          - Solche neu erstellten typbezogenen Baueigenschaften werden dann sofort im ganzen System sichtbar, eventuell "Wildwuchs" von
            Attributen
          - Vermutlich wird dafür als Ausbaustufe bald ein Freigabekonzept benötigt, ähnlich wie wenn Mitarbeiter neue Baustoffe anlegen
            können sollen
      - ==<u>Alternative 2:</u> [ausgewählt und implementiert]== Nur Administratoren und Redakteure dürfen neue typbezogene Baueigenschaften anlegen, Mitarbeiter dürfen diese nur lesend verwenden
        - Vorteile:
          - Kein Wildwuchs von Attributen
          - **[DONE]** Begrenzter Implementierungsaufwand (zunächst beschränkt auf baueinheiten.vue, TBD für baueigenschaften.vue):
            - ==**Hinweis**==: Die zusätzlichen Prüfungen hierfür wurden abhängig gemacht von einem globalen Flag
              mitarbeiterDuerfenBarbeitenTypbezogeneBaueigenschaften in global-store.js
              - Wenn dieses Flag false ist (das aktuelle Setting), gilt Alternative 2
              - Wenn dieses Flag auf true gesetzt würde, gilt Alternative 1
              - Anmerkung: Diese hat keine Auswirkung auf baustoffe.vue, da Mitarbeiter sowieso nicht zum Bearbeiten von Baustoffen
                berechtigt sind
            - **[DONE]** Es müssen dafür für die Benutzerrolle "Mitarbeiter" in Abhängigkeit von obigem Flag zusätzlich disabled werden
              zusätzlich zu der vorhandenen Prüfung, ob der Benutzer den ausgewählten Knoten im Bauvorhabenbaum bearbeiten darf (z.B.
              dürfen Mitarbeiter keine Knoten im Bauvorlagenunterbaum bearbeiten):
              - **[DONE]** Die Buttons und Kontextmenüs und Tabs für die Neuanlage einer Baueigenschaft
              - **[DONE]** Die Buttons und Kontextmenüs für das Löschen einer Baueigenschaft
              - **[DONE]** Im Tab "Beschreibung" die Buttons, das Input-Feld und der Uploader für die Benutzerrolle "Mitarbeiter"
              - **[DONE]** Im Tab zur Bearbeitung von Baueigenschaften die typbezogenen Eingabefelder
            - Es können dafür enabled bleiben bzw. es kann dort die bereits vorhandene Prüfung belassen werden, ob der Benutzer den
              ausgewählten Knoten im Bauvorhabenbaum bearbeiten darf (z.B. dürfen Mitarbeiter keine Knoten im Bauvorlagenunterbaum
              bearbeiten):
              - **[DONE]** Im Tab "Übersicht aller Baueigenschaften" die Kontextmenüs zum Aktivieren/Deaktivieren und Anzeigen/Bearbeiten
              - **[DONE]** Im Tab zur Bearbeitung von Baueigenschaften die wertbezogenen Eingabefelder
              - **[DONE]** Im Tab zur Bearbeitung von Baueigenschaften die Radio-Buttons zum Aktivieren/Deaktivieren
          - **[DONE]** In baueigenschaften.vue und dessen Unterkomponenten muss dies analog implementiert werden
            - **[DONE]** Die dafür notwendige computed-Funktion musste in den betreffenden Vue-Komponenten dupliziert werden:
              - Computed Property benutzerDarfBearbeitenTypbezogeneBaueigenschaften dafür eingefügt in baueigenschaften.vue,
                uebersicht-tab-baueigenschaften.vue, beschreibung-tab-baueigenschaften.vue, details-tab-baueigenschaften.vue
        - Nachteil: Restriktiver - Mitarbeiter sind auf die vorhandenen Baueigenschaften beschränkt. Sie müssen bei Bedarf Redakteure
          bitten, neue hinzuzufügen (eine Chat-Funktion wäre dafür nützlich)
      - <u>Alternative 3:</u> Mitarbeiter können alle (typbezogenen) Baueigenschaften lesen, aber nur selbst erstellte verändern oder löschen
        - Nachteil: Komplex, es könnte verwirrend sein, wenn nach wie vor alle Baueigenschaften unabhängig vom Ersteller in den Tabellen für die Baueigenschaften angezeigt werden
        - Nachteil: Es werden dann zusätzliche Anzeige-, Filter- und Sortierfunktionen nach Erstellern in diesen Tabellen gebraucht
        - Als Ausbaustufe benötigt man dann auch für Baueigenschaften ein Autoren-Konzept
    - Mitarbeiter können wertbezogene Baueigenschaften in Baueigenschaften von Baueinheiten im Bauvorhabenbaum ändern (z.B. dort Werte eintragen), wenn sie die Autoren-Berechtigung für die Baueinheit besitzen
  - **[DONE]** In **Baueigenschaftsprofilen**
    - ==Diese werden aktuell gleich behandelt wie Baueigenschaften oben (d.h. Alternative 2 wurde implementiert)==
    - ==**Hinweis**==: Hierzu wird ein äquivalentes Flag, nämlich mitarbeiterDuerfenBearbeitenBaueigenschaftsprofile,
      herangezogen zur Entscheidung, ob Mitarbeiter Baueigenschaftsprofile neu anlegen/bearbeiten/löschen dürfen!
    - **[DONE]**Computed Property benutzerDarfBearbeitenBaueigenschaftsprofile dafür eingefügt in baueigenschafts-profile.vue,
      uebersicht-tab-baueigenschafts-profile.vue, beschreibung-tab-baueigenschafts-profil.vue, details-tab-baueigenschafts-profil.vue
    - **[DONE]**Im Tab "Übersicht" müssen die Buttons und Kontextmenüs für das Anlegen und Löschen von Baueigenschaftsprofilen
      für die Benutzerrolle "Mitarbeiter" disabled werden
    - **[DONE]** Das Tab "Neuanlage" muss für die Benutzerrolle "Mitarbeiter"
      disabled werden
    - **[DONE]** Im Tab "Details" müssen die Input/Select-Felder und die Buttons für die Benutzerrolle "Mitarbeiter"
      disabled werden
    - **[DONE]** Im Tab "Beschreibung" müssen Input-Feld/Uploader/Buttons für die Benutzerrolle "Mitarbeiter"
      disabled werden
    - **[DONE]** Im Tab "Zugeordnete Baueigenschaften" muss das QSelect und der Button für die Benutzerrolle "Mitarbeiter"
      disabled werden
    - **[DONE]** Im Tab "Vorgabewerte" müssen die Input-Felder rechts sowie die beiden Buttons für die Benutzerrolle "Mitarbeiter"
      disabled werden
  - **[DONE]** In **Bauinformationen**
    - Redakteure (und Administratoren) können Bauinformationen erstellen, ändern, und löschen
    - Mitarbeiter können Bauinformationen erstellen - ändern und löschen sollten sie nur die, die sie selbst erstellt haben
    - Mitarbeiter können Bauinformationen lesen und Referenzen darauf erzeugen (in Baueinheiten - Redakteure auch in Baustoffen)
    - ==Zu entscheiden:==
      - <u>Alternative 1:</u> Mitarbeiter können (zusätzlich zu den von Redakteuren erstellten) alle Bauinformationen lesen, auch die von anderen erstellten Bauinformationen
        - Nachteil: Kein "Need to Know" auf Bauinformationen
      - <u>Alternative 2:</u> Mitarbeiter können nur die von Redakteuren erstellten Bauinformationen und
        die von ihnen selbst erstellten Bauinformationen lesen, nicht die von anderen erstellten Bauinformationen
        - Nachteil: Nicht berechtigte Bauinformationen müssten dann eigentlich in der Tabelle für die Baueigenschaften ausgeblendet werden, was keine reine Frontend-Implementierung mehr wäre!
        - Nachteil: Wegen der Eindeutigkeit der Bezeichnung müssten beim Neuerstellen und Ändern trotzdem Bezeichnungskollisionen mit allen vorhandenen Bauinformationen geprüft
          werden!
      - ==<u>Alternative 3 [ausgewählt und implementiert]:</u>== Mitarbeiter können stets alle Bauinformationen lesen, unabhängig davon ob diese von Redakteuren, von ihnen, oder von anderen erstellt wurden,
        aber nur die von ihnen selbst erstellten Bauinformationen ändern oder löschen
        - Vorteil: Kompromiss
        - Müsste einfach zu implementieren sein, in dem die Buttons "Speichern" und "Zurücksetzen" für von anderen
          Mitarbeitern erstellten Bauinformationen disabled werden, aber stets alle Bauinformationen angezeigt werden
      - ==Die erste Implementierung von Alternative 3 funktioniert wie folgt:==
        - [Einfache Variante - nicht implementiert] Beim Neuanlegen von Bauinformationen wird zunächst ein Feld "benutzerKennungErsteller" mit der Benutzerkennung des aktuell  
          angemeldeten Benutzers an der Bauinformation befüllt
        - Der Default für bereits vorhandene Bauinformationen könnte dabei die Benutzerkennung eines Default-Administrators sein
          (Hinweis: Benutzerkennungen sind bislang immer E-Mail-Adressen)
        - Die Disable-Funktion für das Ändern und Löschen würde dann so aussehen:
          - :disable = "localStore.state.anmeldeDatenBenutzer.benutzerRolle === "Mitarbeiter" // Mitarbeiter dürfen nicht speichern und löschen
            && localStore.state.anmeldeDatenBenutzer.eMailBenutzer !== ausgewaehlteBauinformation.benutzerKennungErsteller" // Ersteller darf speichern und löschen
      - **[DONE]** ==[Bessere Variante - implementiert] Besser ist es, wenn wie bei Baueinheiten gleich ein Array
        "benutzerKennungenAutoren" mit Autoren für eine Bauinformation vorgehalten wird:==
        - Das Disabling erfolgt dann per :disable = "!ausgewaehlteBauinformation.benutzerKennungenAutoren.includes
          (localStore.state.anmeldeDatenBenutzer.eMailBenutzer)"
        - **[DONE]** Der Ersteller (d.h. der aktuell angemeldete Benutzer) wird bei der Neuanlage einer Bauinformation vom
          System in diesen Array eingetragen.
        - **[DONE]** Schon vor der Einführung von benutzerKennungenAutoren angelegte Bauinformationen in der Datenbank
          bekommen per Compass dieses zusätzliche Feld mit <u>leerem</u> Array hinzugefügt. In diesem Fall passiert nichts, der Frontend Code kann damit umgehen - der :disable-Code unten returned dann false und
          damit werden die entsprechenden Felder in diesem Fall disabled!
        - **[DONE]** Die Autoren müssen dann auch in der QTable für alle Bauinformationen mit angezeigt werden, damit ein
          Benutzer die von ihm selbst erstellten identifizieren bzw. herausfiltern kann. Dies erfolgt aktuell noch durch ein
          QInput-Feld in der QTable.
        - **[DONE]** Es kann alternativ auch über ein QSelect-Feld statt des QInput-Felds in der QTable angezeigt werden - dies muss
          allerdings disabled werden, und zeigt dann beim Mouseover ein entsprechendes rotes Zeichen an
        - **[DONE]** Über ein neues QSelect im Tab "Details" für eine Bauinformation können
          weitere Autoren hinzugefügt werden vom Ersteller oder einem Administrator. Die Optionen dafür sind die Benutzerkennungen aller
          Benutzer (neue API-Methode dafür in benutzer.controller.js)
        - **[DONE]** Die Visibilität der zugehörigen QTable-Spalte für die Autoren ist noch nicht per Toggle zuschaltbar! Done:
          Gleichzeitig die Toggles rearrangiert und neu gruppiert über der QTable in Bauinformationen
  - **[DONE]** In **Datenaustausch**
    - Nur Administratoren dürfen importieren
    - Alle Benutzerrollen dürfen exportieren
- ==**[DEFER]**== Stage/Ausbaustufe 2 für Berechtigungen (Prio 3) - Fortgeschrittene Funktionen für die Übertragung von Berechtigungen - z.B. lesender Zugriff auf Projekte - Fortgeschrittene Funktionen für Erstellung, Prüfung und Freigabe von Objekten mit Status (Lifecycle und Workflows - siehe dazu obige Überlegungenen für einen "Redaktions-Workflow" für Baustoffe
  - Damit könnten z.B. auch Mitarbeiter Baueigenschaften und Baustoffe erzeugen, die dann durch Redakteure freigegeben werden können

---

#### **[Epic 14.a]** ==**[WORK]**== (Prio 3) State Management im Frontend mit global Store und/oder Vuex Store, Notifications bei Aktualisierungen von Daten vom Backend an das Frontend

- Vue Store Pattern als Alternative bzw. Vorstufe zu Vuex wird in BIM.click verwendet per selbst implementiertem global Store:
  - https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch
  - Daten, die zwischen Komponenten geshared werden, kommen in eine zentrale Variable State mit Set- und Clear-Methoden
  - Ein Versuch (siehe unten), dies in einem separaten .js File, das mit require in den verschiedenen Komponenten angezogen wird, zu implementieren, funktioniert und ist reaktiv - wenn man die richtigen Deklarationen macht - siehe unten
  - Beispiel-Code für dieses Vue Store Pattern:
    - https://medium.com/fullstackio/managing-state-in-vue-js-23a0352b1c87
      - Eine Komponente displayed reaktive Daten aus dem Store
      - Die andere ändert (mutated) sie mit Set-Methode addNumber
      - Mit gemeinsamem JS Module als "simple global Store", das als Import-Datei von mehreren Komponenten konsumiert wird - diesen Code als Vorlage erfolgreich getestet mit daten-austauschvue, MyLayout.vue und GlobalStore.js als dem "simple global Store" für BIM.click
      - In der die Änderung der globalen Daten "produzierenden" Komponente daten-austausch.vue und in der die geänderten globalen Daten "konsumierenden" Komponente MyLayout.vue kann jeweils einfach auf die Objekte zugegriffen werden mit globalStore.state.object bzw. die Set/Mutator und GetMethoden dort können per globalStore.method aufgerufen werden
      - Allerdings werden in der "konsumierenden Komponente" (z.B. MyLayout.vue) die reaktiven Änderungen nur mit den richtigen Vorkehrungen reflektiert:
        - Template Section: {{localStore.state.object}} - dort kann nicht direkt auf den globalStore.state zugegriffen werden, sondern nur auf dessen lokales Pendant localStore.state!
        - Script Section: localStore: globalStore - dabei ist entscheidend, dass das ganze Objekt inklusive der dort mit deklarierten Mutator-Methoden deklariert und sichtbar ist, sonst funktioniert die Reaktivität von Objekten im localStore zu ihren Pendants im globalStore nicht!
        - Siehe auch: https://vuejs.org/v2/guide/reactivity.html
      - Es handelt sich bei diesem simple global Store Pattern um eine Vorstufe von Vuex als global Store!
- Weitere Artikel dazu:
  - https://stackoverflow.com/questions/52840563/where-to-store-global-object-in-quasar-framework - dort ebenfalls wird gemeinsames JS Module vorgeschlagen, das globale Daten als Variablen definiert mit zugehörigen Methoden, um diese zu manipulieren
  - https://about.gitlab.com/blog/2017/11/09/gitlab-vue-one-year-later/
  - https://hackernoon.com/vue-state-management-from-the-ground-up-a31eb87c668d
  - https://code.tutsplus.com/tutorials/design-patterns-for-communication-between-vuejs-component--cms-32354 (nicht Store Pattern, nur Vuex und Dependency Injection)
- Artikel zur Vue Cross Component Kommunikation:
  - https://code.tutsplus.com/tutorials/design-patterns-for-communication-between-vuejs-component--cms-32354
- Alternativen, um aus einer Kindkomponente (z.B. Baustoffe.vu) eine Elternkomponente (z.B. myLayout.vue mit Footer und Drawers zur Anzeige von Error Messages und Hilfeinformation) zu "benachrichtigen"
  - Asynchron: Kindkomponente schickt Event mit optionalem Parameter an die Elternkomponente
    - Mit this.$emit() - empfohlen wird globaler Event Bus mit: this.$root.\$emit("eventXYZ", parameter);
    - Elternkomponente listened auf diesen Event mit this.\$on ("eventXYY", (parameter) => ... ) in created:
    - So z.B. einstweilen die BIM.click Kontexthilfe implementiert - Baustoff.vue emittiert Event, MyLayout listend darauf, setzt denrichtige Hilfekontext aus dem Event Paraemter, und steuert damit die Anzeige im rechten Drawer per v-if
  - Synchron: Kindkomponente ruft Methode aus Elternkomponente auf
    - Siehe https://stackoverflow.com/questions/46208610/call-parent-method-with-component - direkter Aufruf geht wohl mit nativen, direkten Eltern-/Kind-Vue-Komopnenten, allerdings, wie sich unten zeigt, nciht so einfach mit komplexen, verschachtelten Quasar Komponenten
    - Siehe https://stackoverflow.com/questions/36764151/vue-js-inheritance-call-parent-method/36765534#36765534, dort 3 Varianten:
      - Pass Methods as Properties to Child Components (same as passing data props) - macht die Bindung explizit
      - Declare global Methods as Mixins
        - Die Komponenten müssen dann z.B. mit Vue.extend definiert werden, unklar ob/wie das mit Quasar Komponenten geht
        - Siehe auch https://stackoverflow.com/questions/42613061/vue-js-making-helper-functions-globally-available-to-single-file-components?noredirect=1&lq=1
        - Quasar Mixins: https://forum.quasar-framework.org/topic/696/how-to-building-components-with-quasar
        - https://forum.quasar-framework.org/topic/3099/custom-component-mixins-avoid-repeating-props
          - Zugriff auf Props geht mittels \$attr!!!
      - Direkter Call einer Parent Methods aus Child Komponente - ist discouraged und funktioniert nicht so einfach mit Quasar!!!
        - this.$parent.$options.methods.someFunction(...);
        - Dies geht eventuell auch mit \$root???
        - Wird discouraged, weil damit die Kindkomponente abhängig ist von der Elternkomponente!
        - Diverse Varianten davon getestet mit Aufruf von Methode openLeftDrawer in MyLayout.vue aus daten-austausch.vue - funktionieren alle nicht, was auch ein Append in obigem Stackoverflow Artikel bestätigt!!!
        - Der Grund ist, dass MyLayout.vue gar nicht die direkte Elternkomponente von daten-austausch.vue ist (die ist vermutlich q-page-container, und auch nicht die Root Komponente (die ist vermutlich die Quasar Vue App).
- Vuex Strategien für die Synchronisation des Vuex Stores mit dem Backend:
  - https://stackoverflow.com/questions/43572532/recommended-strategy-to-sync-vuex-state-with-server
    - Dort wird als Option B selbst mit Vuex für "Admin Type Changes" vorgeschlagen, Änderungen erst im Backend zu speichern und danach den Store upzudaten
    - Alternativ gehen als Option A die geänderten Daten erst (optimistisch) in den Store und von dort wird eine Action ausgelöst, die die Datenbank ändert - wenn diese schief geht, muss der Store allerdings wieder geändert werden - komplexe Logik dafür ist als Pseudocode angegeben unten in der Antwort auf SO
  - https://forum.vuejs.org/t/vuejs-vuex-data-synchronization-with-server-backend/16340
  - https://laracasts.com/discuss/channels/vue/syncing-vuex-with-the-backend
  - https://zendev.com/2018/05/21/vuex-perfect-interface-frontend-backend.html
  - https://entwickler.de/online/javascript/vuex-einfuehrung-579905327.html
  - https://dev.to/ratracegrad/how-to-greatly-simplify-your-vuex-store-1fkl
  - https://ypereirareis.github.io/blog/2017/04/25/vuejs-two-way-data-binding-state-management-vuex-strict-mode/
  - https://www.reddit.com/r/vuejs/comments/b27zcs/vuex_state_update_frequency/
    - The Vuex state is not meant to hold a carbon copy of your entire backend data state. As you mentioned in your post, the data will quickly be out of date if other users are interacting with it, and secondly you end up having to build a whole lot of unnecessary duplicate API's that mirror what your back end is already doing.
    - Think about what you are really needing your Vuex state for -- for example if you're displaying a page for a user to edit their list of favourite foods, you don't need to have the complete list of every single other user and all of their favourite foods in the Vuex state at that time. You can ajax call that data if and when you need it. The state should be for managing global data that is relevant to the specific user of your app, like say their login credentials, or maybe a list of all foods they can pick from when modifying their list of favourites. In fact, a lot of people (including myself) tend to probably use Vuex for convenience for a lot of data that is actually better managed through that component its most relevant to.
    - Lastly your state should not be a heavily nested object that you have to traverse... it makes it a huge pain for doing mutations, which shouldn't be traversing anyway. The data in your Vuex store should be normalized.
- **Vuex** könnte zusätzlich zu oder statt dem aktuellen "homegrown" global Store eingeführt werden als State Manager am Frontend
- ==**Bedingung:**== Es muss damit das Refresh-Verhalten für Änderungen zwischen den Komponenten für die Pages verbessert werden können - das müsste zuerst mit einem Prototyp verifiziert
  werden.
- ==**Hinweis:**== Ohne Vuex müssen wahrscheinlich Refresh-Benachrichtigungs-Events auf dem globalen Event Bus ($root) eingeführt werden, mit denen eine Komponente bei Änderungen in ihren 
  Daten per $emit notifizieren kann, damit die benachrichtige Komponente einen Refresh durchführt:
  ```
  this.$root.$emit("refreshEvent", eventPayload);
  ```
- Dies gilt z.B. für baustoffe.vue beim Hinzufügen, Löschen, Ändern von Baustoffen oder für bauinformationen.vue beim Hinzufügen, Löschen, Ändern von Bauinformationen. Diese Komponenten
  sollten so die betroffenen Nachbarkomponenten (z.B. baueinheiten.vue) benachrichtigen.
- Die Nachbarkomponenten müssen dann in mounted: oder created: einen Event Handler für dieses Event per \$on registrieren:
  ```
  this.$root.$on("refreshEvent", eventPayload => {
    console.log("In... Received refreshEvent");
    // Call refresh function...
  };
  ```
- ==Diese Events funktionieren dann aber nur für den jeweiligen Benutzer, nicht für alle Benutzer!==
- Eine weitere Möglichkeit, State Changes zu behandeln, besteht daher darin, ==**Notifications**== vom Server zum Client/Browser zu senden, wenn am
  Server Daten (Baustoffe, Baueigenschaften, Bauinformationen, eventuell auch Bauvorhaben/Baueinheiten) aktualisiert wurden - in diesen kann der
  Benutzer aufgefordert werden, z.B. einen Browser Refresh zu machen
  - Dabei müssen **Push Notifications** und **Browser Notifications** unterschieden werden
    - https://www.reddit.com/r/vuejs/comments/80i6o7/push_desktop_notifications_with_vuejs/
    - For anyone reading this in the future, this was the shortest video I found that could quickly explain push notifications to me. Push
      notifications ARE NOT the same as browser notifications. Push notifications use the Push API and the Notifications API. Browser
      notifications only use Notifications API. Using only the Notifications API makes notifications appear only when your website is open. Push
      notifications
      mean that you can show your user notifications even when their browser is closed.
      - https://www.youtube.com/watch?v=ggUY0Q4f5ok
  - **Push Notifications**:
    - **Tutorial für Web Push Notifications**: https://dzone.com/articles/how-to-add-real-web-push-notifications-to-your-web
      - Verwendet Node Package **web-push** - https://www.npmjs.com/package/web-push
      - Verwendet sogenannten **Service Worker** - das ist Event Handler Code am Client/im Browser, der bei einem Push Notification Event ausgeführt wird
      - Der Server Part im Tutorial ist relativ straightforward, benötigt API Keys in Environment Variablen, muss in BIM.click back-end-server.js integriert werden
      - Zum Client Part:
        - Der Code in client.js für die Service Worker Regstrierung kann in die created-Sektion von my-layout.vue eingefügt werden - allerdings funktioniert es
          nur mit https, daher den Code für die Service Worker Registrierung einstweilen konditional für Heroku gemacht (kann nur dort getestet werden)
        - Alternativ könnte man auch lokal einen Production Build mittels quasar build machen, wie in front-end-server.js beschrieben, allerdings
          müsste dann lokal auch https enabled werden (siehe quasar.conf.js)
        - Der Code für den Service Worker liegt dabei in einer dedizierten Datei worker.js - diese muss in die Quasar-spezifische Source Struktur
          eingepasst werden
          - Kann es z.B. im \bim-click-front-end Root Directory liegen oder muss es in das \dist oder \dist\spa Directory, das
            während des Heroku Builds angelegt wird?
          - ==Nach dem Post unten sollte es in \statics liegen!==
          - Dies erfolgreich getestet, mit der service-worker.js File in /statics und entsprechendem Service Worker Registration Code in my-layout.vue
    - Weiteres Tutorial für Web Push Notifications: https://thecodebarbarian.com/sending-web-push-notifications-from-node-js.html
    - Related Topic **"Service Workers"**:
      - https://developers.google.com/web/fundamentals/codelabs/offline - Service Workers werden auch für offline Apps (PWAs) verwendet
      - https://quasar.dev/quasar-cli/developing-pwa/handling-service-worker#Interacting-with-Service-Worker - Quasar Support für Service Workers
        - nur für PWAs, nicht SPAs?
      - Eventuell hilfreich: https://github.com/yyx990803/register-service-worker - Package, um die Service Worker Registration zu erleichtern,
        wird auch von obigem Quasar Service Worker Support (für PWAs?) verwendet
      - https://forum.quasar-framework.org/topic/2560/solved-pwa-force-refresh-when-new-version-released
      - https://github.com/quasarframework/quasar/issues/6935
        - ==Hier wird empfohlen, das File für den Service Worker in \statics abzulegen, damit es gefunden wird!==
    - https://medium.com/conectric-networks/a-look-at-server-sent-events-54a77f8d6ff7 - Notifications mit **nativen http Events**
    - https://github.com/invokemedia/vue-push-notification-example - Push Notifications mit **Firebase**
    - https://github.com/motia/quasar-app-extension-onesignal - verwendet **OneSignal** zusammen mit Quasar
      - https://documentation.onesignal.com/docs
      - https://hashnode.com/post/how-to-implement-push-notification-in-a-vuejs-web-app-cjtcwoid500160js1oc8wv4aw - dort wird auch OneSignal
        empfohlen
      - https://forum.quasar-framework.org/topic/3608/how-to-use-onesignal-for-push-notification-with-quasar-pwa/4
  - **Browser Notifications**:
    - https://tutorialzine.com/2017/01/the-easiest-way-to-show-browser-notifications - hat nur Client Code!
    - https://github.com/quasarframework/quasar/issues/78 - Diskussion, ob Quasar einen Wrapper für das Browser Notification API providen sollte
    - https://caniuse.com/#search=notification
      - Web Notifications: Method of alerting the user outside of a web page by displaying notifications (that do not require interaction by the
        user)
  - **Diskussion der Alternativen**: https://forum.quasar-framework.org/topic/6357/how-to-notify-users-about-content-change-in-a-quasar-spa-app
  - ==**[WORK]**== Update 13.07.2020
    - Prototyp für **Web Push Notifications**
      - In my-layout.vue, back-end-servers.js und web-push-notifications.js am Backend
      - Erfordert Package web-push nur am Backend
      - Komplex
      - Noch kein Standard, als experimentell eingestuft
      - Chrome, Edge und Firefox verwenden unterschiedliche Endpoints und Keys für Web Push
      - Quasar-Integration schwierig: Es kann nicht ohne weiterers eine Quasar Funktion (QNotify) im Service Worker aufgerufen werden
      - Funktioniert nur mit https (daher bisher nur auf Heroku enabled/getestet)
      - Erfordert individuelle Registrierung beim Client Start (Keys kommen zurück)
      - Erfordert Speicherung jedes einzelnen Benutzers/Clients mit dessen Keys in der Datenbank, um einen Broadcast an alle User zu machen (iterate through users)
    - Prototyp für **Sockets**
      - ==**Achtung**: Unsere Implementierung beruht auf **socket.io** - dies ist unterschiedlich zu **WebSockets** in Browsern, baut aber darauf auf!!!==
      - https://forum.quasar-framework.org/topic/3267/how-to-use-socket-io-in-quasar-building-an-electron-app/17
        - Socket.IO is NOT a WebSocket implementation. Although Socket.IO indeed uses WebSocket as a transport when possible, it adds some metadata to 
          each packet: the packet type, the namespace and the ack id when a message acknowledgement is needed. That is why a WebSocket client will not 
          be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a WebSocket server either.
      - Siehe auch https://dzone.com/articles/socketio-the-good-the-bad-and-the-ugly
      - https://socket.io/docs/v4/client-api/
      - https://socket.io/docs/v4/server-api/
      - ==Erfordert NPM Packages socket.io am Backend und socket.io-client am Frontend==
        - In my-layout.vue, global-store.js und socket.js am Frontend, in back-end-servers.js und testweise in bauinformationen.controller.js am Backend
        - Erfordert Quasar Boot File socket.js, um im Frontend Code Socket.io per this.\$socket benutzen zu können, gemäß Vorlage auf https://forum.quasar-framework.org/topic/3267/how-to-use-socket-io-in-quasar-building-an-electron-app/15
        - Temporär weiteres Boot File am Frontend angelegt: router.js - um für Refresh Aktion Vue-Router (.push) ansprechen zu können aus js-Modul 
          global-store.js - wird aber nicht mehr gebraucht, da einfach ein Browser Refresh stattdessen gemacht wird als Refresh-Aktion
        - Upgrade von socket.io V2 auf V4 ist beschrieben in baueinheiten.bewegeZweigMitAgendaJob(), hatte einige Glitches
      - Erfordert Initialisierung eines "Channels" am Backend Server, die Clients horchen auf diesem (simpel)
      - Quasar Integration ist einfach: Es kann einfach QNotify aufgerufen werden mit Refresh-Aktion bei Empfang einer Notification am Client (Code in my-layout.vue mit
        Helper-Funktion in global-store.js)
      - Einziger kleiner Caveat ist der sogenannte Broadcast: Der Client, der eine Änderung am Server veranlasst hat, kann auch per Socket.io "Broadcast" nicht einfach
        ausgenommen werden von der Notification (getestet), da offenbar der Server der Client ist, der den Broadcast verschickt
        - ==Hinweis:== Dies kann am Client abgefangen werden, indem der Client Messages für Content, den er selber erzeugt hat, temporär nicht empfängt (z.B. mit Rooms - siehe unten)
      - Hinweis: Die Verwendung der Sockets in den Backend Controllern (bisher nur bauinformationen.vue) beruhte ursprünglich noch auf einem Hack (global für io-Objekt
        definiert in my-layout.vue - siehe Kommentare dort und in bauinformationen.controller.js, wo bereits die richtige Lösung, die Erweiterung von back-end-server-routes.js und - bisher nur - bauinformationen.controller.js
        um den Parameter io für Sockets implementiert wurde - damit können Socket API Calls in den Controllern gemacht werden)
    - ==Sockets sind ingesamt die besssere Lösung als obige Web Push Notifications==
    - ==Weitere Design-Überlegungen für die Socket Lösung==
      - Behandlung des Falls, dass der Benutzer, der Änderungen speichert (z.B. in Baustoffen, Bauinformationen, Baueigenschaften, Vorlagen für Baueinheiten, Baueigenschaftsprofilen) eventuell nicht unbedingt selbst benachrichtigt werden sollte:
        - Dies kann mit Socket.io über die sogenannten **Rooms** gesteuert werden, indem für jede dieser Kategorien ein separater Room angelegt wird, die Clients joinen und leaven können (bereits im Prototype Code enthalten)
        - Anfangs joined ein Client alle Rooms (in my-layout.vue, created())
        - Bevor er in einer dieser Kategorien einen Save macht, macht er einen Leave für den entsprechenden Room - dann empfängt er nicht die im Server erzeugte Aktualisierungsmeldung für seinen eigenen Save
        - Dies wurde vorläufig so implementiert, dass in back-end-server.js nach dem Leave Room ein Timeout gesetzt wird (aktuell 3 Minuten bei 2 Minuten Pausenzeit für Aktualisierungsnachrichten in den Controller-Methoden
          sendSocketAktualisierungsNachrichtMitPause()) und nach Ablauf dieses Timeouts der betreffende Client dem Room wieder beitritt (Re-Join Room)
        - Dies war allerdings zunächst insofern nicht optimal, als dass nach dem ersten Timeout für Re-Join Room einstweilen eintreffende neue Leave Requests dann frühzeitig invalidiert wurden durch die per Timeout ausgelösten früheren Re-Join Requests.
        - Dies gelöst, indem bei neu eintreffenden Leave Requests ein pending Timeout für Re-Join zunächst gecleared wird, und dann der
          neue Re-Join Timeout gesetzt wird. Das Clearing erfolgt mit der JS-Methode clearTimeout - siehe https://www.w3schools.com/Jsref/met_win_cleartimeout.asp.
        - Siehe Kommentare dazu in back-end-server.js, io.sockets.on("connection", function (socket) {}
        - ==**Hinweis**==: Andererseits ist es eventuell sogar sinnvoll, diesen Benutzer darauf hinzuweisen, dass er seinen eigenen Browser refreshen sollte, um seine eigenen Änderungen ggf. in anderen Pages/Komponenten benutzen zu können
          (Referenzen)
        - Ein einzelnes Refreshen aller dieser Pages ist eigentlich nicht sinnvoll (es handelt sich ja um viele, und jede müsste dann z.B. ein eigenes internes Refresh-Event auf dem globalen Event Bus verarbeiten, oder es muss ein
          gemeinsamer Vuex-Store dafür eingesetzt werden)
        - Dieser Hinweis zum Refreshen könnte dann mit etwas anderem Wording als die Socket-Aktualisierungsnachricht vom Server nach erfolgreichem Save vom Client einfach selbst am Browser angezeigt werden per QNotify
        - Oder man formuliert die Aktualiserungsnachricht, die vom Server an diese Rooms emitted wird, so, dass sie für jeden Fall (lokal für den Client, der die Änderungen gemacht hat und global für alle übrigen Clients) zutreffend ist
        - Zunächst lautet diese z.B.: "Es sind aktualisierte Bauinformationen verfügbar. Um diese zu verwenden, drücken Sie bitte die Schaltfläche "Neu Laden".
        - Aktuell lautet sie z.B.: Die Bauinformationen wurden aktualisiert. Wenn Sie die aktuellsten Bauinformationen verwenden möchten, drücken Sie auf die Schaltfläche 'Neu laden'. Wenn Sie vorher einen anderen Vorgang abschließen möchten, drücken Sie auf die Schaltfläche 'Ignorieren'. Sie können dann auch noch später im Browser mittels 'Diese Seite neu laden' die aktuellsten Daten laden."
        - Diese Nachricht ist auch geeignet für eine Anzeige an dem Client, an dem die Bauinformationen geändert wuren (falls das Leave
          Room disabled werden sollte).
      - Am Server wurde zusätzlich ein **Timer-gesteuertes Throttling** eingebaut, damit insgesamt nur höchstens eine Aktualisierungsmeldung in 10-15 Minuten verschickt wird (dies gilt unabhängig von den Rooms und den bisher 6 Arten von Aktualisierungsmeldungen in den Controllern)
        - ==**Hinweis**==: Zu Testzwecken ist diese Pausenzeit aktuell auf 2 Minuten eingestellt, in timing.js
        - Sonst kämen bei Massen-Updates zu viele
          solche Meldungen. Dazu müsste global oder in jedem Controller in einer Variablen recorded werden, wann die letzte solche Message gesendet wurde. Wenn dies eine Zeit her ist, die weniger als als 10-15 Minuten ist,
          könnte die neue Message erst nach einer Pause von z.B. 10-x Minuten timergesteuert verschickt werden. Wenn eine solche verzögerte Message wartet und zwischenzeitlich neue Aktualisierungen passieren, könnten diese bis zum Versenden der
          verzögerten Message ganz unterdrückt werden.
        - Dies in bauinformationen.controller.js bereits testweise implementiert mittels einer Funktion sendSocketAktualisierungsNachrichtMitPause()
        - Später die Timer-Steuerung aus dieser Funktion ausgelagert in ein zentrales Backend-Modul timing.js, damit sie von allen Controllern am Backend verwendet werden kann
        - Die Timer-Steuerung muss initialisiert werden in back-end-server.js mittels Funktion timing.initValuesSocketAktualisierungsNachricht()
        - Damit können künftig alle Controllers, sofern sie parametrisiert sind mit dem Objekt io, eine solche Funktion sendSocketAktualisierungsNachrichtMitPause() implementieren, die ihrerseits timing.js required,
          wo die Timer-Steuerung zentral stattfindet. Diese Funktion muss dann in den Controller-Create/Update und Delete API-Methoden bei erfolgreichen Datenbank-Updates unmittelbar vor dem Senden der Response an den
          Client aufgerufen werden.
        - **[DONE]** Bisher ist dies nur in bauinfomationen.controller.js implementiert
        - ==**[TODO]**== Die Controller müssen ebenfalls mit dem Parameter io parametrisiert werden nach der Vorlage in bauinformationen.controller.js, und es muss diese
          Funktion sendSocketAktualisierungsNachrichtMitPause() implementiert und aufgerufen werden in allen Controllern. Der Parameter io erfordert auch Eingriffe in back-end-server-routes.js, und
          eventuell in weiteren Controllern, falls diese auf bestimmte Controller-Methoden aus einem anderen Controller zugreifen. Im Frontend muss zusätzlich in den entsprechenden Komponenten per \$socket
          ein Leave Room implementiert werden (siehe Kommentare oben).
          - **[DONE]** Für Baueigenschaften ebenfalls schon implementiert im Backend und Frontend
          - **[DONE]** Für Baueigenschaftsprofile ebenfalls schon implementiert im Backend und Frontend
          - **[DONE]** Für Baustoffe ebenfalls schon implementiert im Backend und Frontend
          - **[DONE]** Für Vorlagen für Baueinheiten in Baueinheiten ebenfalls schon implementiert im Backend und im Frontend
          - **[DONE]** Auch implementiert bei Bewegen von Zweigen im Baustoffbaum und im Bauvorlagenunterbaum des Bauvorhabenbaums!
          - ==**[TODO]**== Eventuell auch für Benutzer?
          - ==**[TODO]**== Die Timer-Werte für die Pause zwischen den Aktualisierungsnachrichten in timing.js und das Re-Join in back-end-server.js müssen noch kalibiert werden (aktuell 2 bzw. 3 Minuten,
            in Produktion z.B. 10 bzw. 11 Minuten)
          - ==**Hinweis**==: In den Import-Methoden werden bisher keine Aktualisierungsnachrichten verschickt - diese sollten bisher nur ausgeführt werden, wenn die Anwendung auf Heroku temporär offline
            genommen wird per Heroku Dashboard/Settings, Maintenance Mode

#### **[Epic 14.b]** ==**[WORK]**== Web/Local/Session Storage

- Damit können Daten für einen User bzw. eine Session gespeichert werden - besser als mit Cookies
- https://quasar.dev/quasar-plugins/web-storage
- Basiert auf https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

---

#### **[Epic 15]** **[DONE]** (Prio 3) E-Mail Verifizierung in Benutzerregistrierung

- Tutorials mit zusätzlicher E-Mail-Verification des Users
  - https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb - die E-Mail-Verifikation hier ist nur eine Erweiterung für
    existierendes Login/Logout, ohne Passport, mit Token based Authentication, kann angepasst werden mit
    - Zum Versenden von Mails wird Nodemailer verwendet: https://www.npmjs.com/package/nodemailer
  - https://stackoverflow.com/questions/28847491/verification-email-with-token-in-passport-js - ohne Passport
  - https://github.com/sahat/hackathon-starter - umfangreichere Boilerplate, die u.a. auch Authorization mit e-Mail Verification enthält, basierend auf Passport
    - https://github.com/sahat/hackathon-starter/blob/master/controllers/user.js - Controller Methoden für User Management inklusive Mail-Versand mit Verification Token
    - Mongoose 'User Model: https://github.com/sahat/hackathon-starter/blob/master/models/User.js
    - Benutzt HTML 5 mit Pug Templating Engine für das Frontend, nicht Vue oder Quasar

---

#### **[Epic 16]** ==**[WORK]**== (Prio 3) Test Automation

- Vue Testing
  - Articles
    - https://vuejs.org/v2/guide/unit-testing.html
    - https://vue-test-utils.vuejs.org/
    - https://madewithvuejs.com/testing
  - Tutorials
    - https://medium.com/clockwork-nl/mastering-testing-with-vue-js-by-testing-a-real-application-and-setting-up-ci-cd-e4e989c12912
    - https://lmiller1990.github.io/vue-testing-handbook/
    - ==Gutes E2E Tutorial (UI und API Level Testing):== https://www.cypress.io/blog/2017/11/28/testing-vue-web-application-with-vuex-data-store-and-rest-backend/#Store-to-UI-and-server-API
- Quasar Testing
  - ==https://github.com/quasarframework/quasar-testing#readme==
    - Empfiehlt Jest für Unit Testing
    - Empfiehlt Cypress für E2E Testing (für SPA)
    - Quasar CLI Extension (Beta): https://www.npmjs.com/package/@quasar/quasar-app-extension-testing-e2e-cypress
- Test Automation Tools
  - Populäre Tools
    - Jest, Mocha, Selenium, Cypress, NightwatchJS, ...
  - Overviews
    - https://www.netguru.com/codestories/which-javascript-ui-testing-framework-to-use-in-2020 - Cypresss ist der rising Star
- ==**[WORK]**== ==**Cypress**==
  - Cypress Docs
    - https://www.cypress.io/
    - https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements
    - https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Add-a-test-file
    - https://docs.cypress.io/guides/getting-started/testing-your-app.html#Step-1-Start-your-server
  - Cypress Recorder
    - Zum Aufzeichnen von Benutzerinteraktionen im Chrome Browser
    - Chrome Extension
      - https://chrome.google.com/webstore/detail/cypress-recorder/glcapdcacdfkokcmicllhcjigeodacab/related
    - https://medium.com/@gxcadr/cypress-recorder-write-cypress-tests-much-easier-and-faster-6ed70b712bff
    - https://github.com/KabaLabs/Cypress-Recorder
  - Cypress und Quasar
    - https://forum.quasar-framework.org/topic/5660/e2e-testing-with-cypress - dort wird empfohlen, Cypress ==**global**== zu installieren (heavyweight)
    - ==Zusätzliche Tags an q-inputs im Format **data-cy="field"** notwendig,== da Quasar künstliche, wechselnde DOM Ids für diese Felder erzeugt!
    - Diese im Cypress Test Skript referenzieren mit cy.get('[data-cy=field]')
  - Cypress Installation
    ```
    ...\bim-click-front-end> npm install cypress --save-dev
    ```
    - Installiert Cypress ==**lokal**== - siehe dazu den Hinweis unten!
  - Cypress Start
    ```
    ...\bim-click-front-end> ./node_modules/.bin/cypress open
    ```
  - Cypress Test Skripts
    - Erstes Skript angelegt: bim-click-front-end\cypress\integration\examples\bim-click_spec.js
    - Teilweise recorded mit Cypress Recorder
    - Auswahl von Kontextmenü in QTable für Baueigenschaften mit rightclick() funktionierte nicht, daher Button geklickt
    - Beispiel auf https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-your-first-test

---

#### **[Epic 17]** ==**[WORK]**== (Prio 3) Cloud Deployment

- Alternativen für Cloud Deployment Plattformen
  - Surge als Cloud Deployment Plattform
    - https://surge.sh
    - Deployment für statische Sites (d.h. für das BIM.click Frontend)
    - Angeblich super easy!
    - Siehe https://quasar.dev/quasar-cli/developing-spa/deploying#Deploying-with-Surge
  - AWS (Amazon Web Services Cloud Plattform)
    - Neu: AWS Amplify - siehe Tutorial für Quasar Apps: https://www.youtube.com/watch?v=1F0SfYmrSbA
    - CD Pipeline: https://www.youtube.com/watch?v=eBKCyxOipGI
    - https://dev.to/sunilmore690/complete-setup-for-deploying-nodejs-app-with-mongodb-database-on-amazon-ec2-3plj - Node und MongoDB
    - https://jasonwatmore.com/post/2019/12/14/vuejs-nodejs-on-aws-how-to-deploy-a-mevn-stack-app-to-amazon-ec2 - Voller MEVN Stack! Allerdings NGINX als Web Server
    - NGINX: https://stackoverflow.com/questions/9967887/node-js-itself-or-nginx-frontend-for-serving-static-files - schneller als Express, in C geschrieben
    - https://dev.to/wmccoubrey/deploying-vuejs-app-to-s3-using-gitlab-ci-1kek
    - https://dev.to/sunilmore690/complete-setup-for-deploying-nodejs-app-with-mongodb-database-on-amazon-ec2-3plj - Node, MongoDB, NGINX
    - https://www.freecodecamp.org/news/how-to-deploy-a-node-js-app-to-the-aws-elastic-beanstalk-f150899ed977/ - Node, MongoDB on mLab, AWS, Elastic Beanstalk (EB)
    - https://www.freecodecamp.org/news/deploying-a-production-node-express-mongo-app-to-aws-a-reflection-8982894289c6/ - allgemeine, interessante Reflektionen
  - Google Cloud Platform
    - https://medium.com/@nendhruv/deploying-your-node-js-mongodb-app-on-google-cloud-for-free-33547d2f6397
    - https://medium.com/google-cloud/a-clearer-vue-in-google-cloud-2370a4b048cd - Vue, Node, Docker, GCP
    - https://medium.com/@brian.young.pro/how-to-deploy-vue-js-app-to-google-cloud-with-cloud-build-ad104bb1cf60 - Vue, GitHub, Google App Engine for Node.js
    - https://www.mongodb.com/cloud/atlas/mongodb-google-cloud?lang=de-de - MongoDB Atlas unterstützt Google Cloud Platform
    - https://www.mongodb.com/blog/post/new-to-mongodb-atlas-availability-across-all-google-cloud-platform-regions - MongoDB Atlas auf GCP
    - https://cloud.google.com/community/tutorials/mongodb-atlas-appengineflex-nodejs-app - Tutorial für die Verbindung von MongoDB Atlas mit Node App auf GCP (in einer Debian Linux VM, alternativ unterstützt GCP auch Windows Server VMs)
  - GitHub Pages
    - https://quasar.dev/quasar-cli/developing-spa/deploying#Deploying-on-GitHub-Pages
  - GitLab
    - GitLab ist keine Cloud Umgebung wie die obigen Cloud Plattformen, sondern eine Continuous Integration/Delivery Platform/DevOps Toolbox (#1 bei Forrester)
    - https://about.gitlab.com/product/continuous-integration/
    - Verwendet Vue intern
      - https://about.gitlab.com/blog/2016/10/20/why-we-chose-vue/
      - https://about.gitlab.com/blog/2017/02/06/vue-big-plan/
      - https://docs.gitlab.com/ee/development/fe_guide/vue.html
    - https://about.gitlab.com/blog/2017/09/12/vuejs-app-gitlab/ - Vue Build mit GitLab (Continuous Integration, Build, sobald Code in Repo gepushed wird)
- ==**Heroku Cloud Deployment**== - Heroku Cloud erscheint am Besten geeignet, denn - Heroku ist PaaS vs. IaaS, d.h. höherwertige Cloud Services, Abschirmung von der Infrastruktur - Sehr guter Support für Node.js Apps - Sehr viele Tutorials für Deployment von Node und speziell auch MEVN Apps - US- und deutsche Server (Frankfurt) - Großer Anbieter (Salesforce), daher geringe Gefahr, dass es „ausstirbt“ - Heroku wird gehosted auf AWS (Amazon Web Services) als Infrastruktur (größter Cloud Anbieter weltweit) - Wettbewerbsanalyse - https://www.guru99.com/heroku-vs-aws.html - https://medium.com/@GoRadialspark/heroku-alternatives-aws-azure-and-google-cloud-platform-870ae316527e - sehr guter Vergleich der Cloud Plattformen - Wichtigstes Takeaway: Heroku schirmt einen ab von der IaaS Infrastruktur, die wie beim ersten Test von GCP festgestellt, ziemlich mühevoll zu administrieren ist! - Übersicht von Cloud Plattformen für Node.js: https://github.com/nodejs/node-v0.x-archive/wiki/Node-Hosting - Heroku Account - Heroku Account erzeugt auf https://signup.heroku.com/dc - michael.scheible@bimlive.de - (Leere) Test App erzeugt: heroku-test-bim-click - https://dashboard.heroku.com/apps/heroku-test-bim-click - Best Practices für Node Apps auf Heroku - Heroku Apps müssen 12-Factor-Apps Guidelines befolgen - https://12factor.net/ - https://blog.heroku.com/twelve-factor-apps - https://devcenter.heroku.com/articles/node-best-practices - Z.B. werden lower Case File Names empfohlen, da Linux myclass.js und MyClass.js als zwei verschiedene File Namen interpretiert, empfohlen wird deshalb my-class.js
  - Technische Detailfragen bzgl. Heroku Deployment von MEVN Apps:
    - https://stackoverflow.com/questions/52730867/heroku-deployment-mevn-stack
    - https://stackoverflow.com/questions/53966321/deploying-mongodb-express-based-back-end-api-to-heroku-dosent-work
    - https://stackoverflow.com/questions/49317490/error-with-ports-vue-jsnode-js-project-in-heroku - Vue auf Heroku
    - https://stackoverflow.com/questions/48271106/vuejs-frontend-served-by-express-and-backend-api-in-node-security-practice
    - https://stackoverflow.com/questions/44760783/heroku-wont-run-mongolab-app - MLab MongoDB und Heroku
  - Tutorials und Anleitungen für Cloud Deployment von MEVN Apps:
    - GitHub und Heroku
      - https://devcenter.heroku.com/articles/github-integration
      - Deployment einer Node App von GitHub auf Heroku;
        - https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/
          - Build auf Heroku per Node Buildpack
    - Node.js Deployment auf Heroku
      - https://devcenter.heroku.com/articles/deploying-nodejs
      - https://devcenter.heroku.com/articles/getting-started-with-nodejs - Tutorial
        - https://github.com/heroku/node-js-getting-started - Node.js Code auf GitHub dafür
      - https://elements.heroku.com/buttons/heroku/node-js-getting-started
      - https://appdividend.com/2018/04/14/how-to-deploy-nodejs-app-to-heroku/
      - https://codeburst.io/node-js-on-heroku-a-more-complete-tutorial-part-1-9e80cb071498
    - Vue/Node.js Deployment auf Heroku
      - Vue Deployment Guidelines: https://cli.vuejs.org/guide/deployment.html#general-guidelines
        - CORS, static Apps
        - Heroku: https://cli.vuejs.org/guide/deployment.html#heroku
      - https://medium.com/netscape/deploying-a-vue-js-2-x-app-to-heroku-in-5-steps-tutorial-a69845ace489
      - https://www.codementor.io/@ravianand1988/easily-4-steps-to-continuous-delivery-auto-deploy-vue-js-app-on-heroku-xljk977pq
      - Lokaler Build mit Push des lokalen dist Folders nach Heroku: https://codeburst.io/quick-n-clean-way-to-deploy-vue-webpack-apps-on-heroku-b522d3904bc8
        - Tipp dazu bzgl. Quasar: https://forum.quasar-framework.org/topic/332/easily-deploy-to-heroku/3
      - Andere Lösung - Inclusion des dist Folders in Git Repository und Push von dort nach Heroku: https://dev.to/jmbejar/how-to-quickly-deploy-a-vuejs-app-to-heroku-5b0f
      - Empfohlen: Build auf dem Heroku Server: https://medium.com/binarcode/deploying-vue-apps-to-heroku-the-right-way-26b11c1ae5cd
        - Code dafür auf GitHub: https://github.com/cristijora/vue-heroku-the-right-way
      - Gutes Video, wie man eine Vue App auf Heroku deployed:
        - https://www.youtube.com/watch?v=W-b9KGwVECs - dort wird der übliche static Folder am Client auf public Folder am Server redirected, mit Git Integration, benutzt mLab für MongoDB in der Cloud
        - Dritter Teil einer Serie:
          - Erster Teil: https://www.youtube.com/watch?v=j55fHUJqtyw
          - Zweiter Teil: https://www.youtube.com/watch?v=X-JZ-QPApUs&t=1187s
          - Code: https://github.com/bradtraversy/microposts_fullstack_vue
    - Quasar Deployment auf Heroku
      - (Quasar/GitLab/Heroku: https://dev.to/navicsteinr/deploying-an-app-from-gitlab-to-heroku-using-the-quasar-framework-and-sailsjs-3d00)
      - https://forum.quasar-framework.org/topic/2337/deploy-a-pwa-how-to/2 - dort package.json und server.js für Quasar Build auf Heroku
      - https://forum.quasar-framework.org/topic/1606/deploy-on-heroku-with-express-server/4
      - Hinweis auf https://quasar.dev/quasar-cli/developing-ssr/deploying#Introduction:
        - When deploying as a SPA or PWA, the distributables folder that gets generated by Quasar CLI can be served by a static webserver. However, this not the case with a SSR (Server-side Render) build. Your distributables, in this case, contain your production webserver too – which can be tweaked from /src-ssr.
        - Auf BIM.click trifft zunächst SPA zu! (Hinweis: Später SPA nach PWA geändert!)
      - Instruktionen für Quasar Deployment für SPA App hier: https://quasar.dev/quasar-cli/developing-spa/deploying#Deploying-with-Heroku
        - Mit Express als Web Server (für static Sites im Falle einer SPA)
      - Das folgende Snippet für package.json müsste passen:
        "scripts": {  
         "build": "quasar build",
        "start": "node server.js",
        "heroku-postbuild": "npm install --only=dev --no-shrinkwrap && npm run build",
        }
      - Siehe https://www.wyeworks.com/blog/2018/01/08/how-to-quickly-deploy-a-vuejs-app-to-heroku/ zur Erläuterung von heroku-postbuild
    - MongoDB Deployment für Heroku Apps
      - MongoDB Environment Variables on Heroku: https://stackoverflow.com/questions/56809974/cant-read-mongo-database-after-deployment-on-heroku-returns-503-error-but-it
      - https://www.reddit.com/r/vuejs/comments/ah9ffr/hosting_a_vue_frontend_node_backend_mongodb/
        - You can host your database on https://mlab.com or alternatively in https://www.mongodb.com/cloud/atlas (since MongoDB acquired mLab). For the back-end, I suggest Heroku. It's fast, efficient, and dead easy to deploy. I don't know why you had a bad experience with it, but trust me, their free tier is a really good way to test all of this.
      - https://www.reddit.com/r/mongodb/comments/6mvww1/comparing_cloud_mongodb_services_mongodb_atlas_vs/
      - https://www.reddit.com/r/node/comments/9mzmpg/mlab_is_becoming_a_part_of_mongodb_inc/ -mLab wird discontinued zugunsten von Cloud Atlas
      - Migration Guidelines: https://docs.mlab.com/mlab-to-atlas/
        - Achtung: Cloud Atlas hat noch kein Heroku Add-on!
        - Dieses dient allerdings in erster Linie für das Billing über Heroku statt mLab
        - Stattdessen wird dort empfohlen, direkt von Heroku zu Atlas zu connecten:
          - Ensure that your Heroku app is hosted in the same AWS region as your database. For convenience our docs at Heroku include a mapping of Heroku’s region names to AWS regions.
            - https://devcenter.heroku.com/articles/mongolab#where-will-be-my-database-be-hosted
          - Manage your own Heroku config var with the MongoDB connection string instead of depending on the one that automatically populates as part of mLab’s add-on on Heroku.
            - https://devcenter.heroku.com/articles/config-vars
      - Es gibt also diese zwei verschiedenen MongoDB Cloud Versionen:
        - Veraltet/deprecated: mLab = MongoLab mit Add-on für Heroku (mLab wurde mittlerweile von MongoDB akquiriert)
          - https://elements.heroku.com/addons/mongolab
          - Allerdings basieren diese Tutorials auf mLab:
            - https://www.freecodecamp.org/forum/t/how-to-deploy-your-mongodb-app-to-heroku/19347
              - Tipp dafür: https://stackoverflow.com/questions/44760783/heroku-wont-run-mongolab-app
            - Angular/Node/Mongoose/MongoDB auf Heroku
              - https://scotch.io/tutorials/use-mongodb-with-a-node-application-on-heroku
                - Älter, der Link dort zu MongoLab funktioniert nicht mehr
            - Node/MongoDB auf Heroku Tutorial ür eine API-basierende App, die Users authentifiziert In einer MongoDB für Users - wahlweise mit Vue Frontend
              - https://jasonwatmore.com/post/2018/12/06/deploy-to-heroku-node-mongo-api-for-authentication-registration-and-user-management
              - Benutzt mLab MongoDB Add-on für Verbindung mit Cloud based MongoDB Service
          - Erster Heroku Sniff Test mit MLab basierter Node.js App:
            - 18.01.2020
            - MLab Test App hello-mongoose
              - https://elements.heroku.com/buttons/mongolab/hello-mongoose
              - Von dort deployed in meinen Heroku Test-Account
              - Name: mlab-test-app
              - Zugriff auf die App per https://mlab-test-app.herokuapp.com/
              - Doku dafür: https://devcenter.heroku.com/articles/nodejs-mongoose
              - Code dafür auf GitHub: https://github.com/mongolab/hello-mongoose
            - Dazu mussten Visa Kreditkartendaten dem Heroku Account hinzugefügt werden!!!
            - Ferner dabei meinen GitHub Account berechtigt, dass Heroku zugreifen darf!
        - Aktueller: MongoDB (Cloud) Atlas:
          - Atlas Free Tier auf AWS ist auch in Europa verfügbar:
            - https://docs.atlas.mongodb.com/reference/amazon-aws/#amazon-aws
            - Free Tier ist beschränkt auf 512 MB Datenbankgröße
          - https://www.mongodb.com/cloud/atlas
          - Secure Integration zwischen Cloud Atlas auf einem AWS Cluster und Heroku:
            - https://www.mongodb.com/blog/post/integrating-mongodb-atlas-with-heroku-private-spaces
          - https://levelup.gitconnected.com/part-2-deploy-and-secure-mongodb-on-atlas-4820d539a1dc
          - Cloud Atlas erfordert ein Whitelisting bestimmter IP Adressen auf Heroku (siehe unten)
            - https://stackoverflow.com/questions/42159175/connecting-heroku-app-to-atlas-mongodb-cloud-service
            - https://www.youtube.com/watch?v=leNNivaQbDY
          - https://stackoverflow.com/questions/55068371/heroku-not-connecting-to-mongo-atlas-db
          - MongoDB Atlas ist bisher verfügbar auf AWS, GCP und Azure, noch nicht auf Heroku direkt (siehe oben)
          - https://www.youtube.com/watch?v=1RsHCHj-T6g - Heroku und Atlas - Hebrew
          - https://www.youtube.com/watch?v=imR9LlbG3pU
    - 25.02.2020: Erstes Deployment des BIM.click Backends auf Heroku Cloud mit Datenbank auf MongoDB Cloud Atlas
      - Vorlage: https://dev.to/cpclark360/how-to-host-a-restful-node-js-server-with-mongodb-atlas-database-on-heroku-1opl
      - Dort wird erklärt wie eine RESTful Heroku Backend App mit Node, Express und Mongoose auf eine Datenbank in MongodB Cloud Atlas zugreift
      - Dazu zunächst free Account erzeugt auf MongoDB Atlas
        - https://www.mongodb.com/cloud/atlas/lp/general/try?utm_source=google&utm_campaign=gs_emea_germany_search_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&gclid=Cj0KCQiAqNPyBRCjARIsAKA-WFyCz5EhlAH-Egz_RN_5qKdhOareLbm1Y8PbiZ9SECJygJNEaA63ZHYaAo8_EALw_wcB
        - michael.scheible@bimlive.de
        - Dann Cluster erzeugt am 25.02.2020
          - AWS als Cloud Provider
          - Europe/Frankfurt (eu-central-1) als Region
          - Cluster Tier: Default (MO Sandbox (Shared RAM, 512 MB Storage)
          - Additonal Settings: MongoDB 4.2, No Backup
          - Cluster Name: Cluster0 (kann nicht geändert werden nach Erzeugung)
        - Nach Erzeugung des Clusters in MongoDB Atlas:
          - Sandbox/Connect (Button)
            - Setup Connection Security
            - Dort: Whitelist a connection IP address
              - Add your Current IP address
                - 46.91.143.250
              - Später gemäß Anweisung in Tutorial geändert:
                - Add a different IP address
                  - Whitelist a connection IP address
                    - IP Address: 0.0.0.0/0
                    - Description: (Optional): leer
                  - Add IP address
            - Create a MongoDB User
              - Username: dbUser (ist Admin für die Datenbank)
              - Passwort: Siehe verschlüsseltes Dokument
                - MongoDB Atlas Credentials/Passwort/Password
          - Choose a connection method
            - Connect Your Application (Get a connection string and view driver connection examples)
              - Choose your driver version
              - Driver: Node.js
              - Version: 3.0 or later
              - Add your connection string into your application code
                - mongodb+srv://dbUser:>>password<<@cluster0-ft9dn.mongodb.net/test?retryWrites=true&w=majority
          - Diesen Connection String anschließend auf https://dashboard.heroku.com/apps/heroku-test-bim-click/settings als Config Var für die Heroku Test app heroku-test-bim-click mit Key MONGODB_URL abgelegt
      - Code für BIM.click (Frontend und Backend) gecloned in GitHub in neues Repo bimclick des Users mickey58github
        - Dies war notwendig, da einstweilen nur App des GitHub Users mickey58github nach Heroku deployed werden können, nicht die von stjefan! (TODO)
      - Anschließend unter https://dashboard.heroku.com/apps/heroku-test-bim-click/deploy/heroku-git BIMClick von GitHub nach Heroku deployed:
        - Ziel dort ist neu angelegte App bimclickbackend
        - https://dashboard.heroku.com/apps/bimclickbackend/deploy/github
        - Gewählte Deployment method: GitHub
        - Der Bau des Backends mittels Automatic deploy oder manual deploy (Button) funktioniert so aber noch nicht!
      - Heroku Buildpack für Node.js hinzugefügt unter Heroku "Settings"
        - Bau funktioniert immer noch nicht
      - Nach https://www.freecodecamp.org/news/how-to-deploy-a-nodejs-app-to-heroku-from-github-without-installing-heroku-on-your-machine-433bec770efe/:
        - package.json für das BIM.click Backend geändert, "start": "node server.js" eingefügt
      - Zusätzlich Heroku CLI installiert von https://devcenter.heroku.com/articles/heroku-cli#download-and-install
        - Anschließend können in Windows Command Fenster und nach Restart von Code VS auch dort in der Console Heroku Commands eingegeben werden
      - Ursache des Problems, warum es zunächst nicht baute:
        - Das: BIMClick Backend ist in einem Subdirectory - dies kann Heroku nicht bauen mit dem normalen Buildpack für Node.js
      - Lösung (siehe oben) mit speziellem Buildpack für Heroku Deployment von Apps aus Subdirectory von https://medium.com/@timanovsky/heroku-buildpack-to-support-deployment-from-subdirectory-e743c2c838dd - dieses kann Apps aus Subdirectory bauen!!! Auch für Frontend interessant!!!
        - heroku login // Öffnet Browser Fenster für Heroku Login
        - heroku apps // Zeigt die Heroku Apps des Benutzers
        - heroku info bimclickbackend // Zeigt App Info für die App bimclick
        - heroku buildpacks:clear --app bimclickbackend // Cleared die Buildpacks für die App
        - heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack --app bimclickbackend // Fügt spezielles Buildpack hinzu, siehe unten
        - heroku buildpacks:add heroku/nodejs --app bimclickbackend // Fügt normales Node.js Buildpack dazu
        - heroku config --app bimclickbackend -// Zeigt die aktuellen Env Vars, inklusive MONGODB_URL
        - heroku config:set PROJECT_PATH=BIMclickBackend --app bimclickbackend
          // Setzt das Root Directory für obiges spezielles Buildpack, um nur das Backend daraus zu bauen
        - (Viele der obigen Settings können auch im Dashboard unter https://dashboard.heroku.com/apps/bimclick/settings gesetzt werden!)
        - Build gelingt damit
        - Log dafür hier
          - heroku logs --tail --app bimclickbackend
      - Zusätzlich: Linux Bash Shell mit
        - heroku run bash --app bimclick
        - Dort Linux Commands verfügbar (ls, mv zum Rename von Files, etc.)
        - exit beendet Bash Shell
        - ACHTUNG: Heroku Commands in der Bash Shell werden manchmal nur dann erkannt,, wenn man die Bash Shell aus dem Directory \Familie Scheible\ startet!
      - Verbleibendes Problem mit Pfaden führte dann zu Fehlern beim Start der App nach dem Build:
        - Startup von server.js (gemäß obigem Eintrag in package.json) funktionierte schon mal
        - Aber: requires für models mit relativen Pfaden (./, ../, etc.) sind nicht auflösbar
        - Daher alle Backend Module umgestellt auf absolute Pfade plus appRoot (NPM Paket) zur dynamischen Emittlung des Root Pfades der deployten App
          - appRoot bei lokalem Deployment ist aktuell: C:\Users\Familie Scheible\GitHub\BIMclick\bimclickbackend
          - appRoot bei Deployment auf Heroku Cloud ist: \app
          - Erfordert Installation des Pakets am Frontend (später auch am Backend) mit: npm i -S app-root-path
        - Mögliche Alternative (TODO) - NODE_PATH Environment Variable:
          - https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/
        - Siehe Node Doku dazu auf https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders:
          - If the NODE_PATH environment variable is set to a colon-delimited list of absolute paths, then Node.js will search those paths for modules if they are not found elsewhere.
          - On Windows, NODE_PATH is delimited by semicolons (;) instead of colons.
          - NODE_PATH was originally created to support loading modules from varying paths before the current module resolution algorithm was defined. variable is set to a colon-delimited list of absolute paths, then Node.js will search those paths for modules if they are not found elsewhere.
        - Einer der ersten Build Fehler war darauf zurückzuführen, dass Datei BauEigenschaften.model.js auf GitHub falsch bezeichnet war (auf Windows, Case insensitiv war das egal, nicht aber beim Heroku Deployment anach Heroku) - umbenannt in GitHub nach baueigenschaften.model.js
      - Schließlich baute und lief dann die BIM.click Backend App auf Heroku (asus GitHub)
      - Mittels https://bimclickbackend.herokuapp.com/Baustoffe/Wurzel kann dann auf das API des Backends zugegriffen werden!!!
      - Infos zur Heroku Ordnerstruktur: Siehe https://stackoverflow.com/questions/38924458/how-to-see-files-and-file-structure-on-a-deployed-heroku-app
    - 26./27.02.2020: BIM.click Frontend Deployment auf Heroku:
      - Nach demselben Muster wie oben für das Backend nun App für das Frontend erzerugt und konfiguriert
      - App Name: bimclick
      - Selbe GitHub Connection (zieht geclonten BIM.click Frontend und Backend Code an)
      - Selbe Buildpacks wie bimclickbackend
      - App URL: http://bimclick.herokuapp.com
      - Config Vars:
        - Key: PROJECT_PATH
        - Value: BIMclickFrontend (für obiges spezielles Subdir Heroku Buildpack)
      - Am Frontend server.js hinzugefügt mit obigen script Statements
      - Pakete dafür installiert am Frontend:
        - https://www.npmjs.com/package/express
        - https://www.npmjs.com/package/serve-static
        - https://www.npmjs.com/package/connect-history-api-fallback
      - Um eslint Fehler zu eliminieren " error Unexpected console statement no-console":
        - Unklar ob diese nur bei quasar build oder auch bei quasar dev kommen
        - Siehe https://stackoverflow.com/questions/34215526/eslint-how-to-disable-unexpected-console-statement-in-node-js
        - In .eslintrc.js entsprechende Änderung gemacht: "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
      - Lokaler quasar build emittiert am Schluss Files in das neue Verzeichnis /bimclickfrontend/dist/spa
      - Das Frontend kann dann (wie das Backend) mit nodemon serve geserved werden (startet den Web Server, und die App funktioniert damit auf localhost:4200)
      - Damit lässt sich Deploy auf Heroku zwar starten, aber es kommen Fehler im Build in requires in routes.js
        - Es stellte sich dabei heraus, dass diese Build Fehler nicht durch die relativen Pfade (./, ../) in den imports bzw. requires verursacht war, sondern durch versehentlich groß geschriebene Filenamen für Baustoffe.vu, Dokumentation.vue, Einstellungen.vue, etc. - dies ist bei lokalem Build auf Windows egal, aber ist ein Problem bei Heroku Build auf Linux (Linux ist case-sensitiv bzgl. Filennamen!)
      - Nach Korrektur dieser Filenamen auf Kleinschreibung läuft der Heroku Build durch und die App wird deployed
      - Die Frontend App deployed und läuft dann unter http://bimclick.herokuapp.com
        - https funktioniert noch nicht, das die Backend Calls http sind!
        - Verbleibender Fehler: CORS Fehler beim Zugrif auf das Backend API per Axios: CORS Header ist "localhost://4200" - anders als Request Origin ("http://bimclick.herokuapp.com")
          - Mit Workaround gelöst: Oben rechts im Browser die Chrome Extension Allow CORS Access-Control-Request-Origin einschalten - dann gehen die Requests an das Backend durch und die ganze BIM.click App läuft damit in der Cloud:
          - Später neue Chrome Extension CORS Unblock für CORS installiert - siehe unten
      - URLs:
        - Frontend inklusive Build auf Heroku (auf AWS Cluster Frankfurt)
          - http://bimclick.herokuapp.com
          - Hinweis: Die URL des Backends wird in quasar.conf.js festgelegt:
            - Lokal: localhost://4200
            - Heroku: http://bimclickackend.herokuapp.com
        - Backend inklusive Build auf Heroku (auf AWS Cluster Frankfurt)
          - http://bimclickbackend.herokuapp.com/Baustoffe/Wurzel (nur API Requests)
        - Datenbank auf MongoDB Atlas (auf AWS Cluster Frankfurt (EU-Central-1)
          - https://cloud.mongodb.com/v2/5e54e923b4e2d2704c5f06f8?csrfTime=1582802531804&csrfToken=dd7d6a4fb4959d06878e8ff1da35ff6a6a2aa79d&currentOrgId=5e54e923b4e2d2704c5f06f3&email=michael.scheible%40bimlive.de&needsMfa=false&uId=5e54e923b4e2d2704c5f06f2#clusters
    - Weitere Arbeiten für Heroku Deployment:
      - **[DONE]** Weitere Domain für bimclick.herokuapp.com hinzugefügt: bim.click (auf Kurz & Fischer bei Franken Webhosting registriert)
        - Dafür erhalten: DNS Target primal-honeysuckle-7vpcxyfc8l271rji5hzsvvtz.herokudns.com
        - Damit muss beim Hoster eine Umleitung eingerichtet werden (CNAME/ALIAS)
      - **[DONE]** baustoffe.controller.js: Greift auf Datei im BIM.click Frontend zu, Zeile 481
      - **[DONE]** baueigenschaften.controller.js: Greift auf Datei im BIM.click Frontend zu, Zeile 456
      - **[DONE]** daten-austausch.vue verwendet localhost:4200 hard coded an 2 Stellen
      - **[DONE]** Edge Cases testen auf Heroku
      - **[DONE]** Datenaustausch funktioniert nicht - greift z.B. beim Export auf Frontend File System zu!
      - **[DONE]** File Upload funktioniert nicht - braucht bisher file-uploader.js als Backend Server auf Heroku
        - Neuer Update: Gefixed durch größere Umstrukturierung:
          - file-uploader umbenannt in back-end-file-sever.js, eigene App neben back-end-server.js
          - Uploader Code geändert, dort führte ein vorzeitiges res.send zum Request-Abbruch (Error Status 503)
          - CORS Fehler gefixed
          - Abspeichern der Files nach Upload nach tmp/upload wegen emphermeral File System auf Heroku in MongoDB
          - Vor Download nach tmp/download Lesen aus der MongoDB
          - Backend File Server machst statisches Express Serven von tmp/download - damit ist Anzeige der Files möglich per
            - Https://bimclickbackendfileserver.herokuapp.com/parkplatz.gif
        - ==**Achtung**==: back-end-file-server.js wurde mittlerweile gemerged in back-end-server.js, siehe Kommentare dazu dort
      - File Uploader Änderungen:
        - Musste temporär in das Frontend verschoben werden, da er Files in dessen Dateisystem hochlädt (damit sie später von dort angezeigt werden können)!!!
          - Erfordert NPM Pakete formidable und express-throttle-bandwidth am Frontend!
        - Diverse andere Anpassungen bzgl. port (siehe Code von file-uploader.js am Frontend)
        - In package.json "scripts" am Frontend:
          - "start": "node server.js && node file-uploader.js"
          - Siehe https://www.freecodecamp.org/news/introduction-to-npm-scripts-1dbb2ae01633/
      - Anpassungen in quasar.conf.js bzgl. Vorhalten der URLs für File Uploader API (/upload) und der eigenen URL für den lokalen und den Heroku Fall
        - uploadAPI und ownURL dort definiert jeweils für die beiden Fälle
        - uploadAPI dann per computed Prop verwendet in den q-uploaders in bauinformationen.vue und baustofffe.vue
      - Anpassungen in bauinformationen.vue bzgl. Anzeige von internen Links
      - Funktioniert nicht:
        - file-uploader.js wird nicht gestartet
        - Potentieller Hack, um mehrere Server in einem Dyno zu starten hier:
          - https://medium.com/@nadayar/heroku-fu-multiple-servers-on-one-dyno-6fc68d57b373
        - Eigener Workaround:
          - bash in Command Line starten
            - heroku run bash --app bimclick
          - Dann in der Bash Shell den File Uploader manuell starten per:
            - node file-uploader.js
        - Aber Probleme mit dem port - dieser wird nicht richtig erkannt!!!
          - Environment Variable dafür definiert im Frontend: process.env.UPLOAD_URL
          - Diese wird in file-uploader.js mit dem aktuellen von Heroku zugewiesenen Port initialisiert
          - Problem: Beim Lesen der Variable in bauinformationen.vue ist diese undefined!!!
          - Offenbar hat jeder Prozess seine eigenen Environment Variablen
          - Weitergabe durch manuelles Ablesen des Ports von obigem manuell gestartetem file-uploaer.js in eine Env. Variable UPLOAD_URL in den Dashboard Settings der Frontend App bimclick funktioniert leider auch nicht! process.env.UPLOAD_URL ist in bauinformationen.vue trotzdem undefined!!!
          - Müsste evtl. weitergegeben werden zwischen den beiden Prozessen über Environment File, NPM Package dotenv, oder global Store
          - Nicht weiter verfolgt wegen folgendem weiteren Problem
          - Es stellte sich heraus, dass für Heroku URLs keine Ports mitgegeben werden müssen!
      - Aber Achtung: Alle Files, die hochgeladen werden, werden beim Heroku Dyno Restart gelöscht!!!
        - Heroku hat ephemeral File System
        - https://help.heroku.com/K1PPS2WM/why-are-my-file-uploads-missing-deleted
        - https://stackoverflow.com/questions/36996737/how-to-download-some-files-from-heroku
      - Infos zum File Download
        - https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express?rq=1
        - https://stackoverflow.com/questions/43663005/how-to-implement-download-file-from-heroku-server-in-nodejs
      - Alternativen für File Upload:
        - Files auf Amazon S3 speichern
          - https://www.codementor.io/@samueljames/a-workaround-heroku-s-ephemeral-file-system-e6w341zqa
          - https://devcenter.heroku.com/articles/s3
          - Quasar q-uploader Mechanik wäre dafür anzupassen
          - Neu: https://github.com/oarepo/quasar-uploader - Quasar App Extension für Upload nach S3, bisher nicht getestet
        - Files auf Cloudinary speichern
          - Macht einen sehr guten Eindruck, besser als S3!
          - https://cloudinary.com/documentation/how_to_integrate_cloudinary
        - Files in der MongoDB speichern (bisher implementiert)
          - Erfordert größere Änderungen im Code, passt aber einigermaßen in das heutige Design
          - MongoDB bleibt dabei der einzige Platz, wo State persistiert wird, nicht zwei wie mit MongoDB plus S3!
          - Löst auch gleich das bisher vorhandene Problem, falls Dateien mit demselben Namen mehrfach hochgeladen werden
          - Dieses Pattern kann auch für Datei-Upload für Markup und für Import/Export verwendet werden, wo dasselbe Problem besteht für File Upload/Download
          - Nur bis 16 MB, darüber ist GridFS nötig - diese Grenze dürfte aber in 95% der Fälle ausreichen
            - Zu **GridFS** siehe Epic 48 "Tipps zu MongoDB"
          - Vorlagen:
            - https://stackoverflow.com/questions/13907509/how-do-i-save-a-file-to-mongodb/13923749
            - https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
            - https://stackoverflow.com/questions/27167336/store-files-in-mongodb-using-mongoose
            - Gut: https://stackoverflow.com/questions/44869479/what-data-type-should-i-use-to-store-an-image-with-mongodb - benutzt Buffer als Datentyp
          - Upload mit Quasar q-uploader:
            - file-uploader.js muss in separatem Dyno laufen, eigenes Dateisystem, eigene URL, z.B. https://bimclickfiles.herokuapp.com
            - file-upload wie gehabt, temporäre Ablage in public Folder oder anderem unzugänglichen Folder auf diesem Dyno
            - Von dort anschließend Mongoose Save in MongoDB als BSON Objekt (Typ buffer)
            - Rückgabe der Id des in Mongo gesaveten Files per res - Abspeichern z.B. in der Bauinformation
          - Download
            - Statt den heutigen href Links in Bauinformationen
            - get Call mit der gespeicherten Id an das Backend
            - Response mit File an Client
            - Speichern des Files in public Folder am Frontend
            - Dort Öffnen mit href?
            - https://stackoverflow.com/questions/34634632/downloading-a-file-from-mongodb-to-local-filesystem
          - Multer Package?
            - https://www.npmjs.com/package/multer
        - Simple One-Off File Transfer Utility nach/von Heroku
          - https://joey.io/how-to-securely-move-or-transfer-files-to-heroku/
        - Anderer Cloud Provider statt Heroku für das Frontend, z.B. Digital Ocean - ist allerdings mehr IaaS (Ubuntu Server) als PaaS im Vergleich zu Heroku!
          - https://medium.com/@Web_Bailey/deploy-a-vuejs-app-with-digitalocean-fd6e7af07e40
          - https://dev.to/nothingismagick/setup-and-serve-quasar-ssr-in-a-droplet-in-30-minutes-and-in-3-quick-and-easy-steps-49kp (Achtung: Quasar SSR, nicht SPA)
          - https://kenyaappexperts.com/blog/deploy-vue-js-with-pm2-and-nginx/
          - http://rlynjb.github.io/wandrr/Mapping-it-out
          - https://github.com/Mary-Tyler-Moore/venues-production
          - https://medium.com/@jwdobken/run-your-quasar-application-from-an-ubuntu-machine-simple-4c591917ac55
      - **[DONE]** Von http auf https umstellen
        - Dazu siehe z.B. https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
        - Zusätzlich einige Artikel zu https auf Heroku geclipped nach Evernote
        - Erkenntnis:
          - https://devcenter.heroku.com/articles/ssl-endpoint:
            - SSL Endpoint is only useful for custom domains. All default appname.herokuapp.com domains are already SSL-enabled and can be accessed by using https, for example, https://appname.herokuapp.com.
          - Für generierte Heroku Default Domains der Art appname.herokuapp.com, z.B. bimclick.herokuapp.com, sorgt Heroku impllizit für https-Enablement, indem es über seine Load Balancer https transparent davorschaltet und innerhalb der Heroku Firewall dann die jeweilige App per http called
          - Zusätzlich muss allerdings die Frontend App in seinen API Calls das Backend explizti per https aufrufen
        - 01.03.2020:
          - Im BIM.click Frontend Code in quasar.conf.js für die Aufrufe des Backends https statt http enabled
            - (Ohne das, mit http für Backend Aufrufe, kam Error im Browser Log:
              - Mixed Content: The page at 'https://bimclick.herokuapp.com/' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://bimclickbackend.herokuapp.com/Baustoffe/Wurzel'. This request has been blocked; the content must be served over HTTPS.
      - **[DONE]** Benutzerauthorisierung/-verwaltung
        - Frontend Routes mit Navigation Guards sichern (diese prüfen, ob der aktuelle Benutzer angemeldet ist)
          - Siehe Protecting Vue Routes with Navigation Guards | CSS-Tricks
          - Siehe Yes, this is how vue-router guards work & when to use them
        - Die aktuellen Benutzerdaten des angemeldeten Benutzers werden dabei im global Store gespeichert, damit er aus myLayout.vue und allen Komponenten zugreifbar ist
        - Dafür neue Methoden anmeldungBenutzer und abmeldungBenutzer im global Store eingeführt - diese mutaten ein neues globales Objekt anmeldeDatenBenutzer, welches ein Boolean-Feld istAbgemeldetBenutzer und nach Anmeldung die eMail-Adressse des angemeldeten Benutzers und dessen JWT-Token enthält (letzterer wird zusätzlich in localStorage gespeichert!)
        - Diese werden aufgerufen von den jeweiligen Methoden, die rechts oben in myLayout.vue die Anmeldung/Abmeldung erledigen
        - Dann testweise in myLayout.vue das q-route-tab für "Bauvorhaben" disabled, wenn localStore.anmeldeDatenBenutzer.istAbgemeldetBenutzer true ist!
        - Funktioniert!
      - **[DONE]** Obigen CORS Workaround mit Chrome Extension durch richtige Lösung ersetzen:
        - Siehe nach Evernote geclipte Aritkel zu CORS
        - Weitere CORS-Hinweise:
          - https://scotch.io/courses/build-an-online-shop-with-vue/enabling-cors (am Backend)
          - CORS Code Samples auf https://www.npmjs.com/package/cors (am Backend)
        - Zunächst im Backend in server.js eingefügt:
          - // NEU: CORS aufsetzen, siehe https://forum.quasar-framework.org/topic/817/cors-problem-in-production-mode
          - app.options("\*", cors());
          - app.use(cors());
        - Baut und läuft lokal ok
        - Damit aber immer noch dieselben CORS Fehler unter Heroku!!! Der Grund war, dass weiter oben in server.js CORS bereits anders konfiguriert wurde (mit localhost:4200)
        - Daher nochmals umcodiert mit obigen Options ("\*") - damit funktionierte dann die Heroku BIM.click App mit diesem CORS-enableten Backend problemlose ohne CORS-Fehler und ohne Zuhilfenahme einer CORS Chrome Extension!
        - **[DONE]** "\*" ersetzen durch die endgültigen Frontend-URLs für http und https!!!
        - (Auch im Frontend in quasar.conf.js unter devServer eingefügt:
          - // NEU - CORS Support: Siehe https://github.com/quasarframework/quasar-cli/issues/203
          - // Erfordert Package cors von NPM: npm -install cors im Bimclick Frontend
          - before(app) {
          - const cors = require("cors");
          - app.use(cors());
        - Zweifelhaft, ob das hilft, weil auf Heroku kein devserver verwendet wird für das Backend!
        - Und tatsächlich: Damit auch noch derselbe CORS Fehler:
          - Access to XMLHttpRequest at 'http://bimclickbackend.herokuapp.com/Baustoffe/Wurzel' from origin 'http://bimclick.herokuapp.com' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:4200' that is not equal to the supplied origin.)
        - Später stellte sich heraus, dass tatsächlich das obige CORS-Enablement am Backend ausreicht - keine CORS-Änderungen im Frontend nötig
        - Leider funktioniert die bisherige obige Chrome Extension für CORS auch nicht mehr
        - Diese neu installiert von https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=de , funktioniert trotzdem nicht!
          - Whitelist settings bisher: localhost.4200*, localhost:8080*, _.//_, _.//_/\*
            - Syntax dafür: https://developer.chrome.com/extensions/match_patterns
        - Daher neue Chrome Extension CORS Unblock installiert von https://add0n.com/access-control.html?version=0.1.3&type=install - mit dieser (per Click auf das Icon dafür rechts oben im Browser enabled) funktioniert die Heroku BIMclick App wieder
    - Mögliche Alternativlösung zum Heroku BIM.click Frontend Deployment:
      - Lokaler Build mit anschließendem Push des dist Folders (siehe unten)
      - Zwischenzeitlich auch falsche Lösungen für obigen Frontend Build Fehler auf Heroku ausprobiert:
        - Per appRoot:
          - appRoot für Axios-Calls, analog zum Backend (siehe oben) ausprobiert, aber appRoot am Frontend ist merkwürdigerweise per console.log lediglich ".", nicht wie am Backend der korrekte volle Pfad der App!!!
          - Damit funktioniert lokaler Build nicht mehr (quasar dev)
          - Außerdem kann appRoot in manchen includes, die im Frontend verwendet werden, nicht einfach wie in den requires mit "appRoot + ..." hinzugefügt werden (VS Code zeigt Fehler an)
          - appRoot im Frontend wieder entfernt, andere Lösung nötig
    - Potentielle Alternative zum Frontend Build auf Heroku ausprobiert, die aber bisher an einem anderen Problem (siehe unten) scheitert: Lokaler Build, dist Folder mit git subtree Command nach Heroku pushen
      - https://codeburst.io/quick-n-clean-way-to-deploy-vue-webpack-apps-on-heroku-b522d3904bc8
      - https://stackoverflow.com/questions/7539382/how-can-i-deploy-push-only-a-subdirectory-of-my-git-repo-to-heroku?noredirect=1&lq=1
      - Lokaler Build erfolgreich mit quasar build, erzeugt dist/spa Folder
      - Neue package.json erstellt dafür
        {
        "name": "bimclick",
        "version": "1.0.0",
        "description": "BIM.click Frontend",
        "author": "BIM.live UG",
        "private": true,
        "scripts": {
        "postinstall": "npm install express"
        }
        }
      - Evtl. müssen evtl. der neue server.js (minimaler Express Server) und package.json noch manuell nach dist kopiert werden!
      - 2 gitignore Files liegen im Frontend - dort darf nicht der dist Folder enthalten sein!
      - Lokales Deploy aus dem dist Folder: node server.js
      - Dieser Server Läuft lokal ok mit kleinen localhost Fehlern bei Zugriff auf Images etc., mit aus dem dist Folder
      - Push nach GitHub
      - Bimclick (Frontend) neu geforked von Stefans Git Repo
      - Push dist folder to Heroku
        - BIMclick> git subtree push --prefix bimclickfrontend/dist heroku master
        - Problem: Kommt nicht auf Heroku an!
        - heroku run bash --app bimclick
        - \$ ls => Resultat ist leer, keine Files und Folders dort!
        - \$ ls -lA => Resultat ist 0 - keine Files und Folders dort!
        - Unklar, ob der git Befehl auf Stefans oder meinem Repo arbeitet
      - Lösung dafür hier:
        - https://stackoverflow.com/questions/44087837/heroku-push-subtrees-to-different-apps
        - git remote add bimclick https://git.heroku.com/bimclick.git
          - Damit wird Heroku App Endpoint bimclick zur remote für git gemacht
        - git subtree push --prefix bimclickfrontend/dist bimclick master
        - Es kommt aber auch nichts an im Filesystem der App bimclick!
      - Potentiell andere Syntax für git remote add auf https://stackoverflow.com/questions/32815483/heroku-how-do-you-push-to-specific-app-if-you-have-multiple-apps-in-heroku:
        - git remote rm bimclick // removed die obige remote
        - git remote add bimclick git@heroku.com:bimclick.git
        - Funktioniert auch nicht!
        - Diese Syntax git@... ist wohl veraltet - per https://dashboard.heroku.com/apps/bimclickbackend/settings ist die korrekte Heroku git URL die oben im ersten git subtree push verwendete - https://git.heroku.com/bimclickbackend.git
      - Frage zu dem Problem gestellt auf https://stackoverflow.com/questions/60423947/heroku-push-git-subtree-to-a-remote-heroku-app - Lösung ist offen
        - Könnte eventuell daran liegen, dass Heroku auf einem geforkten Repoository des ursprünglichen GitHub Repositories von Stefan arbeitet
        - Bisher keine Lösung
        - Nicht weiter verfolgt, da obige Lösung mit Build auf Heroku besser ist und funktioniert
    - Heroku Dyno Restarts (wichtig für BIM.click Beta)
      - devcenter.heroku.com/articles/dynos#automatic-dyno-restarts
      - Dynos are also restarted (cycled) at least once per day to help maintain the health of applications running on Heroku. Any changes to the local filesystem will be deleted. The cycling happens once every 24 hours (plus up to 216 random minutes, to prevent every dyno for an application from restarting at the same time). Manual restarts (heroku ps:restart) and releases (deploys or changing config vars) will reset this 24 hour period. Cycling happens for all dynos, including one-off dynos, so dynos will run for a maximum of 24 hours + 216 minutes. If you have multiple dynos, they should cycle at different times based on the random 0 to 216 minutes difference. If you continually make changes to your application without a 24 hour gap, you won’t see cycling at all. When a dyno cycles, you will see a log entry similar to this:
      - Wichtig: Da der BIM.click Backend Server momentan die meisten MongoDB Collections löscht und dann neu Testdaten erzeugt, werden angelegte Daten alle 24 Stunden gelöscht (außer Benutzer mit Passwörtern)
- Die **Topologie des Cloud Deployments von BIM.click** besteht nun final aus 3 Servern:
  - **BIM.click Frontend Server**: Gehosted auf Heroku, App Name **bimclick**, bisher free Dyno, URL bimclick.herokuapp.com, statischer Web Server für Quasar/Vue
    - Bei Franken Webhosting registrierte Domain bim.click wird umgeleitet auf diese URL
  - **BIM.click Backend Server**: Gehosted auf Heroku, App Name **bimclickserver**, bisher free Dyno, URL bimclickserver.herokuapp.com, Node Server
  - **BIM.click Datenbank**: Gehosted auf MongoDB Cloud Atlas, bisher kostenpflichtiger shared Tier M2, Upgrade auf dedizierten Tier M5 ist
    geplant und müsste eine Performance-Verbesserung, u.a. wegen der schnelleren Netzwerkanbindung, mit sich bringen
  - Auf der Infrastruktur-Ebene wurden jeweils AWS-Server in Frankfurt ausgewählt
- Diese bilden eine Instanz von BIM.click in der Cloud
- Theoretisch könnte man mehrere solche Instanzen hosten:
  - Z.B. eine für Tests, eine für Produktion
  - Z.B. unterschiedliche für unterschiedliche Firmen (Tenants)
  - Dabei sind unterschiedliche Topologien denkbar - jeweils dedizierte obige 3 Server (z.B. für Test und Produktion) oder nur
    unterschiedliche Datenbank-Server (z.B. bei unterschiedlichen Produktionsumgebungen für unterschiedliche Firmen)
- **[DONE]** Beim Start des Backend Servers auf Heroku müssen im Markdown verwendete Bilder aus der MongoDB nach tmp/download/img heruntergeladen werden - dies erfolgt in Step 9 in backend-server.js
  - Hinweis: dateien.model.js unterscheidet durch ein Tag am Dokument, ob es ein Markdown Link oder ein interner Link aus Bauinformationen ist
- Security Checklisten
  - **[DONE]** Ausgabe von sicherheitsrelevanten Informationen in console.log (Token, Passwort): Bereits unterdrückt
  - **[DONE]** Console Logging am Frontend in Production disabled aus Sicherheits- und Performance-Gründen
    - uglifyOptions in quasar.conf.js - hatte ursprünglich einen Fehler (console.logs in computed-Funktion selectedNodeTreeBaueinheiten bzw.
      selectedNodeTreeBaustoffe maskierten einen Timing-Fehler dort, den wir
      durch Einbau einer Helper-Funktion jedoch eliminert haben
    - Potentielle Alternativen für Dropping von Console Logs in quasar.conf.js
    - Siehe https://forum.quasar-framework.org/topic/2655/how-to-drop-console-statements-in-production/12
  - ==**[TODO]**== Console Logging am Backend ebenfalls auf Heroku disablen
  - ==**[TODO]**== JWT Token Verwendung überprüfen - aktuell wird trotz Server Restart (lokal getestet) ein bisheriger JWT Token weiter akzeptiert - dieser verfällt
    also aktuell nur, weil am Client die Tokens nach 12 Stunden weggeworfen werden
  - ==**[TODO]**== Lockout von Accounts bei falscher Passworteingabe: Müsste von Passport local Mongoose automatisch erledigt werden!
    Es gibt dabei ein inkrementell wachsendes Lockout Intervall - dies ist Security-mäßig besser als ein komplettes Blocking von Accounts, da damit Hacker auch ganze Konten einer Firma blocken können durch Eingabe falscher Kennwörter!
    - Siehe https://www.npmjs.com/package/passport-local-mongoose - Main Options:
      - interval: specifies the interval in milliseconds between login attempts, which increases exponentially based on the number of
        failed attempts, up to maxInterval. Default: 100
      - maxInterval: specifies the maximum amount of time an account can be locked. Default 30000 (5 minutes)
      - limitAttempts: specifies whether login attempts should be limited and login failures should be penalized. Default: false.
      - maxAttempts: specifies the maximum number of failed attempts allowed before preventing login. Default: Infinity.
    - Dies allerdings bisher nicht getestet. Müsste man mit falschen Passworten testen!
- Rerouting der bei Franken Webhosting registrierten Domain bim.click nach bimclick.herokuapp.com - Dafür im Heroku Web UI in den Settings for die App bimclick bereits diese weitere Domain bim.click zu bimclick.herokuapp.com hinzugefügt
  - Dafür erhalten: DNS Target primal-honeysuckle-7vpcxyfc8l271rji5hzsvvtz.herokudns.com
  - Damit muss durch den Hoster eine Umleitung eingerichtet werden (CNAME/ALIAS)
  - Da Franken Webhosting aber offenbar keine Umleitung von Root Domains wie bim.click unterstützt, eine Domain-Umleitung per "301
    Redirect" eingerichtet - siehe unten (Alternative 2)
  - Siehe auch https://devcenter.heroku.com/articles/custom-domain
- Zusammenfassung:
  1. Alternative 1 – Domain-Umleitung per DNS Record
     - Franken Webhosting kann per DNS Record nur Subdomains umleiten, aber nicht die ganze Domain bim.click
     - Subdomain „www“, d.h. www.bim.click nach Heroku umzuleiten, funktioniert erst recht nicht (Franken Webhosting zeigt da by Default
       einen leeren Webserver an, hängt wahrscheinlich damit zusammen, dass das ihr Basis-Offering ist, Domain hat Web Server)
     - Andere Subdomain „cloud“, d.h. cloud.bim.click nach Heroku umzuleiten, habe ich hingekriegt, aber damit kommt ein neues Problem, das
       nicht an Franken Webhosting liegt, sondern wohl an diesem Umleitungs-Setup insgesamt – man kann dann BIM.click unter cloud.bim.click
       zwar sehen, aber nur mit unsicherer http-Verbindung, nicht mit https-Verbindung
     - Für https müsste man damit bei Heroku in einen paid Plan wechseln, dann bekommt man SSL-Zertifkate, um https dann manuell einzurichten
     - Alternative 1 ist somit nur mit 2 grundsätzlichen Änderungen gangbar, die unten beschrieben werden
  2. Alternative 2- Domain-Umleitung per „301 Redirect“
     - Zusätzlich noch als Alternative zu 1. probiert, die ganze Domain per sogenanntem „301 Redirect“ nach Heroku umzuleiten
     - Der generelle Nachteil dieser Alternative 2 ist, dass dabei, selbst wenn die Umleitung damit richtig funktioniert, nach der Umleitung
       oben im Browser die Heroku-URL angezeigt wird, nicht die umgeleitete Domain
     - Es ist somit nur eine „unperfekte“ Lösung, sozusagen eine alternative „Einstiegs-URL“ für den Benutzer zu unterstützen, nach der
       Umleitung arbeitet er aber mit den Heroku URLs
     - Diese Alternative 2 zuerst auf Strato mit ein paar der dortigen Domains erfolgreich gestestet
     - Z.B. wird man, wenn man jetzt im Browser eingibt: bimclick.info (das ist eine meiner Domains, neben bimclick.net und bimclick.org)
       erfolgreich von Strato umgeleitet nach bimclick.herokuapp.com,
     - https funktioniert dabei automatisch auch ohne Zertifikate, insofern schon mal ein Fortschritt
     - Hier kann man live diese Umleitung sehen: Man gibt im Browser bimclick.info ein
     - Auf Franken Webhosting das dann mit den Domain bim.click und bimclick.de dann auch versucht:
     - Es gibt auch einen Menüpunkt dafür in der Domain-Verwaltung
     - Aber diese Umleitung funktionierte bei Franken Webhosting leider erst mal nicht
     - Franken Webhosting leitete stattdessen bim.click immer auf die Website http://kurz-fischer.de um, und das auch noch ohne https –
       warum ist unklar
     - Es funktionierte dann aber, nach einem Löschen des Browser Caches!
  - Fazit also insgesamt:
    - Die Alternative 2 funktioniert aktuell
    - Gibt man nun im Browser bim.click oder bimclick.de in die Adresszeile ein, wird man automatisch nach Heroku umgeleitet (sieht aber dann die Heroku URLs in der Adresszeile, das ist der Schönheitsfehler bei Alternative 2)
    - Immerhin haben wir damit nun einen abgekürzten Einstiegspunkt
    - Wenn jemand nach BIM.click fragt, sagst man dem künftig einfach, gib „bim Punkt click“ im Browser ein - und schon kann er sich
      registrieren oder anmelden
    - Für die „perfekte Lösung“ (d.h. Alternative 1.) müssten wir aber gleich 2 Sachen ändern:
      - Um die ganze Domain per DNS Record umzuleiten, müsste man wohl die Domain von Franken Webhosting zu einem anderen Provider umziehen
        der ganze Domains umleiten kann. Heroku listet dafür vorwiegend in USA beheimatete Provider, die aber normalerweise alle global
        agieren. Was dann dafür die besten Provider wären, muss erst erforscht werden. Heroku selbst bietet keine Custom Domains an,
        sondern nur die bisher genutzten Subdomains auf herokuapp.com, in unserem Fall bimclick.herokuapp.com (Frontend) bzw.
        bimclickserver.herokuapp.com (Backend).
      - Um https in einem solchen Setup zu unterstützen, müssten wir dann gleichzeitig bei Heroku vom free Plan in einen paid Plan
        wechseln, für beide Apps, die wir dort laufen haben (BIM.click Frontend und Backend – das würde dann im nächsten Plan („Hobby“
        Plan) 2 mal 7 USD pro Monat kosten. Dabei würde auch die „Schlafzeit“ entfallen, die im aktuellen „Free“ Plan immer nach 30 Minuten
        auftritt. Dann kann man SSL-Zertifikate erstellen und https enablen. (Im aktuellen „free“ Plan funktioniert https automatisch für
        die Heroku Subdomains in 1., aber nicht mit Custom Domains).
  - Umstellung von free Heroku Dynos auf bezahlte Dynos

---

#### **[Epic 18]** ==**[WORK]**== (Prio 3) Verschiedenes

- **[DONE]** Sonderzeichen-Editor/Selektor zur Eingabe von Sonderzeichen und mathematischen Operatoren - siehe Prototyp auf https://codepen.io/mickey58/pen/MWaPzEE -
  Sonderzeichen-Selektor eingebaut in die Forms zur Bearbeitung und Neuanlage von Baueigenschaften für Verwendung in den Feldern symbol, einheit, operator und
  (neu hinzugefügt) Formel

::: tip Beispiele für Formeln mit dieser Syntax

Verwendet werden:

- **HTML <Sub>Sub</Sub>** und **<Sup>Sup</Sup> Tags**
- **Markdown Markierungen ~Tilde~/^Circumflex^** für Sub-/Superscripting

Hinweise:

- Vor QMarkdown V1.0.26 musste ">"-Zeichen escaped werden, da es zum Öffnen von Blockquotes im Markdown diente
- Seit QMarkdown V1.0.26 gibt es eine Property "no-blockquote"="true", damit können ">"-Zeichen als normale Vergleichsoperatoren im Markdown, z.B. im Input-Feld "Operator" verwendet werden
- Workaround: "\\" -(einfacher Backslash gefolgt vom zu escapenden Zeichen) ist **Escape-Symbol** im Markdown, also "\\>"

Formeln:

- K~ij~= <span style='text-decoration:overline'>(D</span>~v,ij~<span style='text-decoration:overline'>)</span> + 10 lg(l~ij~ /√<span style='text-decoration:overline'>a~i~a~j~</span>
- L~W´~ = 10 lg(P´/10^-12^Wm^-1^)
- L~W´´~ = 10 lg(P´´/10^-12^Wm^-2^)
- D~n,e~ = L~1~ - L~2~ + 10 lg(A~0~/A); D~n,e~ = L~1~ - L~2~ + 10 lg(nA~0~/A)
- Dn,e =L1-L2+10lg(A0/A); Dn,e =L1-L2+10lg(nA0/A)
- L´~nT~ = L~1~ + 10 lg(T/T~0~)
- L’~i,Fmax,V,T~ = L~i,F,max~ + 10 lgV/V~0~ -10 lg[1-C~0~^-1^/1-C^-1^(C^(1-C)\^-1^ - C^-(1-C)\^-1^ / C~0~^(1-C0)\^-1^-C~0~^-(1-C0\^-1)\^-1^)]
- D~TF,av~ = 10 lg(∑^K^~k=1~ 10^DTF,k/10^/K)
- L~v~ = 10 lg(1/T~m~∫^Tm0^ v²(t)dt/v²~0~)
- <span style='text-decoration:overline'>(𝐷</span>~𝑣,𝑖𝑗~<span style='text-decoration:overline'>)</span> = 1/2(D~v,ij~ + D~v,ji~)
- a~j~ = 2,2 π² S~j~/T~s,jC0√(f/fref)~
- a~j~ = 2,2 π^²^S~j~/T~s,jC0√(f/fref)~
- R~s~ = L~1~ - L~2~ + (10 lg(S~0~* l/A*l~0~))
- L~eq~ = 10 lg(1/T ∫~0~^T^ x(t)²/x~0~² dt); L~eq~
  = 10 lg(1/T ∫~0~^T^ y(t)²/y~0~² dt ); L~eq~
  = 10 lg(∫~0~^T^10^0,1L(t)/dB^ dt); L~pASeq~
  = 10 lg[1/T ∫~0~^T^10^0,1LpAS(t)/dB^ dt = 10 lg(1/T∫~0~^T^pAS(t)²/p~0~²dt)dB
- KB~T~(t) = √(1/T∫^t^~ᶓ=0~e^-t-ᶓ/T^\*KB²(ᶓ)dᶓ
- KB~FTm~ = √(1/N ∑^N^~i=1~ KB²~FTm~)
- L~RF~ = L~p~ - L~v~; L~RF~
  = 1/M ∑~m=1~^M^(L~RF~)m; L~RF~
  = 1/MN ∑~m=1~^NM^∑~n=1~^N^(L~RF~)mn; (L~RF~)mn
  = 10 lg(∫~0~^Tint^p²~mn~(t)dt/∫~0~^Tint^ v²~mn~(t)dt) - 86dB
  L’~i,Fmax,V,T~ = L~i,F,max~ + 10 lgV/V~0~ -10 lg[1-C~0~^-1^/1-C^-1^(C^(1-C)h-1^ - C^-(1-C)h-1^ / C~0~^(1-C0)h-1^-C~0~^-(1-C0h-1)h-1^)]
  :::

- Nested QSelects, z.B. zur Auswahl vorgefilterter Baustoffe/Vorlagen für Baueinheiten/Bauelemente in Baueinheiten, siehe https://codepen.io/mickey58/pen/oNjaQQR

- Den bisher rudimentären Editor für Schichtaufbauten weiterentwickeln
- Die Page Layouts bzgl. Height und Width optimieren, insbesondere für Scroll Areas, sowie die Pagination der Tables
  - Dabei vom Benutzer veränderbare Settings unter Verwaltung/Einstellungen als benutzerspezifischen Präferenzen speichern
  - Siehe auch https://forum.quasar-framework.org/topic/3756/best-practice-setting-up-q-scroll-area/5
  - Siehe https://forum.quasar-framework.org/topic/2033/qscrollarea-max-height/5 - Scroll Area to be wrapped in <div> with max height
  - Siehe https://forum.quasar-framework.org/topic/3044/integrating-qlayout-qtabs-qscrollarea/5 - Scroll Area mit computed Height
- Regelmäßige Quasar Upgrades: quasar upgrade -i aus bim-click-front-end>
- Interessante Quasar Extensions: https://github.com/donotebase/quasar-tiptap (LaTex, Diagramme, Editor, ...)
- HTTPS auch auf localhost: https://quasar.dev/quasar-cli/developing-pwa/handling-service-worker#SSL-certificate
  - In quasar.conf.js: devServer > https: true
  - Bereits getestet, siehe die Kommentare dazu in quasar.conf.js

---

#### **[Epic 19]** ==**[WORK]**== (Prio 3) Obligatorische/systemdefinierte Baueigenschaften

- ==**Hinweis 1:**== Die Terminologie dafür (**obligatorisch** oder **systemdefiniert**) muss noch entschieden werden - **systemdefiniert** ist verständlicher als
  **obligatorisch**
- ==**Hinweis 2:**== **Systemdefiniert** an einer Baueigenschaft bedeutet hierbei systemdefiniert an der
  **typbezogenen**, nicht der **wertbezogenen** Baueigenschaft (an der es schon jetzt ein Merkmal/Toggle systemdefiniertNichtBenutzerdefiniert gibt, dass am UI als
  "Werte sind vom System vorgegeben" angezeigt wird)
- Ein(e) **obligatorische** bzw. **systemdefinierte** Baueigenschaft/Baueigenschaftsprofil/Baueinheit/Baustoff ist kritisch für das System, ist bereits
  in den Stammdaten enthalten, und darf deshalb nur von einem Administrator gelöscht werden
- Ein Merkmal/Toggle obligatorischNichtOptional oder systemdefiniertNichtBenutzerdefiniert muss dazu als weiteres Feld in den typbezogenen Feldern der Baueigenschaft hinzugefügt werden
  - Hinweis: Das bisherige Feld "obligatorischNichtOptional" wurde früher anders verwendet, ist aber aktuell im Code disabled
    - Es war an der wertbezogenen Baueigenschaft definiert (wertbezogene-baueigenschaften.model.js)!
    - Das hier besprochene Merkmal muss an der typbezogenen Baueigenschaft definiert werden!
- Auch der Wertetyp einer obligatorischen Baueigenschaft darf nicht verändert werden, wenn Code für UI (z.B. Baueigenschaftsprofilformulare, wie unter "Baueigenschaftsprofile" bechrieben) oder computed-Funktionen direkt darauf basieren sollen!
- Für nicht obligatorische Baueigenschaften könnte man eventuell irgendwann eine Wertetypänderung zulassen - allerdings wird dies eine komplexe Operation in allen Knoten in allen Bäumen
- Dies muss in ein künftiges Konzept eingebunden werden für den Status (im Entwurf, in Überprüfung, veröffentlicht) und die Berechtigungen für Objekte und Zweige in den Bäumen (Anlegen, Sehen/Lesen, Ändern, Löschen) für
  Benutzer und Redakteure
  - Dabei gibt es Unterschiede zwischen Baustoffen und Bauvorhaben - Baueigenschaften werden von beiden verwendet, sollten nach Veröffentlichung für alle sichtbar sein, aber vermutlich nicht änderbar durch Mitarbeiter,
    sondern nur durch Redakteure
- ==**Update 14.02.2021**==: Das Flag systemDefiniertNichtBenutzerdefiniert wurde als typbezogenes Merkmal eingeführt, es wird jedoch noch nicht überall gesetzt und aktualisiert

---

#### **[Epic 20]** ==**[TODO]**== (Prio 3) An Kindknoten vererbte vs. nicht weitervererbte Baueigenschaften

- Die heutigen Baueigenschaften werden im Rahmen der Aktivierungs- und Wertevererbungsregeln weiterverbt an direkte und indirekte Kindknoten
- Für ein bestimmtes Bauvorhaben zwar relevante, aber nur auf der Ebene des gesamten Bauvorhabens erforderliche allgemeine Baueigenschaften (z.B. die Bezeichnung des Architekten, die Adressfelder des Bauvorhabens, etc.)
  müssen allerdings nicht unbedingt an Kindknoten weitervererbt werden und könnten einfacher als **nicht weitervererbte** Baueigenschaften angelegt und verwaltet werden (neues, zusätzliches typbezogenes Merkmal einer
  Baueigenschaft - die bisherigen Baueigenschaften haben dann dieses Merkmal auf "false" und werden an direkte und indirekte Kindknoten weitervererbt)
- Dieses ist dann eine **systemweit gültige** Ausprägung des vorhandenen wertbezogenen Merkmals "Werte werden vererbt an direkte und indirekte Kindknoten", welches vom Benutzer an einer bestimmten Baueinheit zusätzlich
  gesetzt werden kann (sofern das neue, systemweit gültige typbegzoene Merkmal "nicht weitervererbt" auf "false" steht)

---

#### **[Epic 21]** ==**[WORK]**== (Prio 3) Sollwerte vs. Istwerte

- Dieselbe Baueigenschaft kann über das Merkmal sollwertNichtIstwert einen Sollwert (z.B an einer Baueinheit) oder einen Istwert (z.B. an einem Baustoff) repräsentieren
- Anforderung aus Beispiel aus E-Mail von Erik (März 2020), wo ein (berechneter) Schallschutz-Istwert gegen mehrere mögliche Schallschutz-Sollwerte verglichen wird
- Es gibt dafür mit dem heutigen Datenmodell folgenden Lösungsansatz:
  - Man legt dafür **mehrere Baueigenschaften** an, die **denselben Wertetyp** (z.B. „Kennwert“) haben
  - Im Beispiel von Erik wären es 6 Baueigenschaften
    - Eine wäre für den Istwert, mit der Baueigenschaftsbezeichnung „Schallschutz-Istwert“ (diese muss eindeutig sein im System!)
      - Dieses bekommt zusätzlich noch per Schiebeschalter das Merkmal „Ist Sollwert“ auf „false“
      - Wo der Schiebeschalter dann am UI genau aufscheint, müssen wir separat überlegen
    - 5 wären für die Sollwerte, jeweils mit unterschiedlichen Baueigenschaftsbezeichnungen aus Eriks Beispiel - Diese bekommen zusätzlich noch per Schiebeschalter das Merkmal „Ist Sollwert“ auf „true“
    - Die computed-Funktion kann nun den Ist-Wert berechnen und vergleichen gegen die verschiedenen Sollwerte und zum Beispiel in einem Report melden, ob sie erfüllt sind oder nicht, oder diese Auswertung in weiteren
      Attributen (Wertetyp „Wahrheitswert“, ähnlich wie „Hat Ökolabel Blauer Engel“, in diesem Fall „Erfüllt Schallschutzstufe II nach VDI 4100“) ablegen an dem jeweiligen Bauteil
- Vorteil dieser Lösung:
  - Man muss nicht viel ändern, das Meiste ist machbar im heutigen Datenmodell
  - ==Die einzige potentielle Änderung ist in der Verwaltung des oben erwähnten Merkmals/Toggles **„sollwertNichtIstwert“**==
    - ==Heute gehört dieser zu den **wertbezogenen** Merkmalen einer Baueigenschaft - mit hier beschriebenen Ansatz sollte er in die **typbezogenen** Merkmale der Baueigenschaften verschoben werden und dort zusammen mit dem oben beschriebenen Merkmal/Toggle **obligatorisch/systemdefiniert** verwaltet werden!==
    - ==Diese Verschiebung (nur von „sollwertNichtIstwert“) in die typbezogenen Merkmale ist bereits vollzogen in baueigenschaften.model.js==
    - ==Dies ist auch aus dem ganz unten beschriebenen Grund (Wertevererbung) sinnvoll!==
    - ==Ein wertbezogenes solches Flag kann eigentlich nur
      sinnvoll verwendet werden, wenn man eine Baueigenschaft z.B. anfangs als Sollwert, und später als Istwert verwenden möchte, was aber für Auswertungen bzw.
      computed-Berechnungen eher hinderlich ist, da man dann ja den anfänglichen Wert des Sollwerts "vergisst".==
- Herausforderung dabei:
  - Man muss schon vorausdenken, wie sich das Ganze auf die künftigen computed-Funktionen auswirkt
  - Die computed-Funktion muss, um obigen Soll-/Ist-Vergleich machen zu können, natürlich die beteiligten Attribute identifizieren und referenzieren können
- Dafür gibt es wieder mehrere mögliche Ansätze:
  - Man akzeptiert erst einmal, dass man das auf jeden Fall in den Code der computed-Funktion hineinprogrammieren muss, und man dann für jede solche Soll-/Ist-Wert-Vergleichssituation eine eigene computed-Funktion  
    braucht. Die jeweilige computed-Funktion funktioniert dann halt nur genau wie oben beschrieben mit den 6 beteiligten Attributen. Sobald sich an denen etwas ändert (jemand kommt z.B. auf die Idee, eines davon zu  
    löschen oder eine der Bezeichnungen zu ändern) funktioniert die computed-Funktion nicht mehr bzw. muss sie geändert werden.
    - Als mögliche Verbesserung dafür könnte man die computed-Funktion auch auf den internen Ids der beteiligten Baueigenschaften definieren, dann kann man die Bezeichnungen ändern, ohne dass die computed-Funktion
      geändert werden muss - NB: Wie diese computed-Funktionen in ferner Zukunft verwaltet werden, ist ja noch gar nicht entschieden. Ziel dabei wäre ja, dass auch der normale Anwender, nicht nur der Software-Entwickler eine
      computed-Funktion definieren und ändern kann (Stichwort: computed-Funktion soll wie eine „Business Rule“ arbeiten)
  - Man versucht irgendwie, die beteiligten Baueigenschaften, z.B. über die Namensgebung ihrer Bezeichnungen zu identifizieren und „zusammenzuhalten“. Das wäre dann ein Ansatz, dass man die computed-Funktion relativ
    generisch halten könnte. Ziel wäre ja, EINE computed-Funktion für „Soll/Ist-Wert-Vergleich“ im System zu haben, der man als Argument mitgibt, für welche Baueigenschaft sie einen generischen Soll-/Ist-Wertvergleich machen soll.
    - Dafür könnte man dann eventuell sagen, dass alle 6 in dem Beispiel beteiligten Baueigenschaften das gleiche Präfix in der Bezeichnung haben müssen (z.B.
      in Eriks Beispiel könnte dieses Präfix dann „Schallschutz“ sein, d.h. dann, die erste Baueigenschaft hieße z.B. „Schallschutz Istwert“, der erste Sollwert dann z.B. „Schallschutz Schallschutzstufe I nach DIN 4109, ein weiterer dann „Schallschutz Schallschutzstufe II
      nach VDI 4100“, usw.). Die generische computed-Funktion bekommt dann als Argument dieses Präfix und macht darauf den Vergleich: - Anhand des Schiebeschalters an jedem Attribut weiß die computed-Funktion dann in jedem Einzelfall, welche der über Präfix/Namensgebung identifizierten beteiligten Baueigenschaften Sollwerte und welche Istwerte sind - Solche Lösungen über spezielle Naming-Konventionen sind aber meistens „wacklig“ – wenn man sich in einer der Bezeichnungen vertippt, funktionieren sie
      nicht, und wenn ein Anwender in Unkenntnis solcher Zusammenhänge Bezeichnungen in den Baueigenschaften ändert, auch nicht mehr. - Die anspruchsvollste Lösung wäre, das Datenmodell zu erweitern, in dem man obige Beziehungen (eine Gruppe von Baueigenschaften bildet zusammen eine
      dedizierte **„Soll-/Istwertegruppe"** verwaltbar macht. Dies bedeutet aber Programmieraufwand und erhöht die Komplexität des Gesamtsystems, daher erst mal nicht empfohlen.
  - Eine bessere Variante ist es, die betreffenden Baueigenschaften zu einem **Baueigenschaftsprofil** zusammenzufassen und die computed-Funktion damit zu
    informieren, dass sie eine Soll-/Istwertegruppe bilden. Dies müsste als eventuell neue Property von Baueigenschaftsprofilen verwaltbar sein.
  - Die einfachste Form eines solchen speziellen Baueigenschaftsprofils wäre dann, zwei Baueigenschaften, die verschieden sein müssen, und daher auch
    unterschiedlich bezeichnet sein müssen, einem solchen Profil zuzuordnen und dabe eine per **typgebundenem** Flag als "Sollwert" zu kennzeichenn
    (andernfalls muss die computed-Version hard coded aus den Bezeichnungen die Sollwerte identifizieren, was aber auch kein großer Schaden wäre,
    da sie sowieso die Bezeichnungen der beteiligten Baueigenschaften kennen muss, es sei denn man würde, wie oben skizziert, tatsächlich aus
    den Bezeichnungen z.B. per Präfix erkennen können, welche Sollwerte und welche Istwerte bezeichnen.
  - Die Idee, dass die korrespondierenden Baueigenschaften in solchen Soll-/Istwertepaare gleich heißen und nur durch ein **wertbezogenes** Flag ("Sollwert/
    Istwert") unterschieden werden, wäre theoretisch möglich, ist aber in der Praxis schlecht umsetzbar, da die Bezeichnungen der Sollwerte
    (siehe z.B. oben "zulässige Netto-Grundfläche") oft "spezialisiert" sind und sich somit von den Istwerten unterscheiden
    (in diesem Beispiel "tatsächliche Netto-Grundfläche"). Daneben könnte wegen der Wertevererbung der Fall, dass der Istwert weiter unten im Baum
    einen anderen Wert als der Sollwert hat, gar nicht umgesetzt werden! Daher scheidet diese Idee aus!
  - Komplexere Fälle hätten dann in einem solchen Profil eventuell mehrere Sollwerte (z.B. für einen Vergleich, welche Schallschutzklassen erfüllt sind
    und welche nicht) und mehrere Istwerte (die z.B. aufsummiert werden könnten)
  - Außerdem könnte man noch **Wertepaare** als Soll-/Istwerte "missbrauchen", allerdings funktioniert dies nur für die bisher definierten paarigen
    Werte (bzw. man müsste auch für Wahrheitswerte und Aufzählungswerte Wertepaare vorsehen), und durch die Wertevererbungsregel kann dabei
    ein Sollwert zwar an eine Baueinheit "weiter unten" im Bauvorhabenbaum vererbt werden, allerdings kann dieser nicht ohne Verletzung/Ausschaltung der Wertevererbunsgregel mit einem Istwert an der Baueinheit "weiter unten" belegt werden,. Daher scheidet diese Idee wohl auch aus.

---

#### **[Epic 22]** ==**[WORK]**== (#514, Prio 2) Aktualisierung und Zusammenfassung: Soll-/Istwerte und Soll-/Istwertegruppen als spezielle Baueigenschaftsprofile mit Vergleichsoperatoren (13.11.2020)

- **[DONE]** Das Merkmal **"Sollwert"\*** (sollWertNichtIstWert) soll verschoben werden von den wertbezogenen zu den typbezogenen Merkmalen einer Baueigenschaft
  - Sollwerte können so identifiziert und unterschieden werden von Istwerten (d.h. nicht nur durch eine Konvention über die Baueigenschaftsbezeichnung)
  - Wenn Soll- und Istwert für eine Eigenschaft benötigt werden, sollten 2 verschieden Baueigenschaften dafür angelegt werden ("Dicke Sollwert" und "Dicke
    Istwert" - an der ersten sollte das Flag "Sollwert" auf "true" stehen)
- **[DONE]** Das Merkmal **"systemverwaltet"** sollte bei dieser Gelegnheit gleich mit dorthin verschoben werden, umd Eigenschaften, die vordefiniert sind und auf denen
  Baueigenschaftsprofile aufgebaut sind, zu unterscheiden von anderen
- **[DONE]** Bei dieser Umstrukturierung der Baueigenschaften sollte auch gleich das neue typbezogene Feld für den **Display-Namen** pro Baueigenschaft mit
  unterstützt werden (#513).
- ==**[TODO]**== **"Operator"** sollte dagegen von den typbezogenen zu den wertbezogenen Angaben verschoben werden, nur für Kennwerte (und Kennwertepaare?), eventuell auch für
  Bezeichnungs- und Aufzählungswerte
  - Sie können dann (Anforderung!) unterschiedlich sein an unterschiedlichen Baueinheiten
  - Operator ">" bedeutet, dass der wahre Wert größer als der als Wert eingetragene Wert ist
  - Das kann so für Soll- und Istwerte verwendet werden
  - Für Sollwerte sollte besser nur "=" zugelassen werden, sonst entstehen uneindeutige Vergleichssituationen
  - Der Operator sollte dabei vom Markdown-Feld in ein Enum-Feld umgewandelt werden ["<", "<=", "=", ">=", ">"] - dabei die Unicode-Zeichen einsetzen
- ==**[DEFER]**== **"Soll-/Istwertegruppen"** sollten als **spezielle Baueigenschaftsprofile** verwaltet weden
  - Damit können Gruppen von Soll- und Istwerten verwaltet werden, die gegeneinander verglichen werden können in Baueigenschaftsprofilformularen und
    computed-Funktionen
  - Es kann so auch die Anforderung erfüllt werden, mehrere Sollwerte gegen einen Istwert zu vergleichen
  - Die Sollwerte in einer solchen Gruppe werden über obiges Flag "Sollwert" identifiziert
  - Der Code für ein Baueigenschaftsprofil kann so die beteiligten Eigenschaften identifizieren und dies z.B. zu Vergleichen gruppieren
  - Ein zusätzlicher Vergleichsoperator sollte mit aufgenommen werden als Merkmal einer solchen Gruppe (Eigenschaft am Baueigenschaftsprofil)
  - Dabei sollte auch "Minimum" oder "Maximum" möglich sein (Anforderung) bei mehreren Sollwerten
    Baueigenschaftsprofile aufgebaut sind, zu unterscheiden von anderen
- ==**[WORK]**== ==Stattdessen verfahren wir zunächst nach folgendem Ansatz, der jeweils das **Layout File** nutzt für das Baueigenschaftsprofil, das Soll-/Istwerte vergleicht, anzeigt und Istwerte ggf. aus Sollwerten initialisiert, statt ein separates Profil für die Soll-/Istwertegruppe anzulegen==
  - Validierung dieses Ansatzes sollte anhand des Profilformularss für den Bodenaufbau erfolgen
  - Die Soll-/Istwertegruppen werden im **Layout File** für das spezifische Formular und dem Code für das spezifische Formular reflektiert
  - Im einfachsten Fall sind es einfache **Soll-/Istwertpaare** (1:1-Beziehung zwischen Sollwert und Istwert), die im Layout File spezifiziert werden (spaltenweise angeordnet)
  - Der Code für das Profilformular traversiert das Layout File und zeigt die Paare (Sollwert/Istwert) zeilenweise an
  - ==Für einfache Soll-/Istwertepaar wird, unabhängig von obiger Änderung am Merkmal "Sollwert" in jeder Baueigenschaft, dann zunächst **im Layout File** über ein zusätzliches Verweis-Feld baueigenschaftsBezeichnungSollwert in den Einträgen für eine (Istwert-)Baueigenschaft die zugehörige Sollwert-Baueigenschaft identifiziert.== Zusätzlich wird dort in einem Feld indexSollwertInProfilModelAusgewaehlterKnoten der Index für diesen Sollwert im Array
    profilModelAusgewaehlterKnoten festgehalten (der tatsächliche Index-Wertwird in mounted() für die jeweilige Baueigenschaftsprofilformular-Komponente dort eingetragen).
  - Später könnte diese Information auch aus obigem, neuen **typbezogenen Merkmal "Sollwert"** aus der Datenbank kommen
  - Das Layout File sollte zusätzlich den **Operator für den Sollwert-Istwert-Vergleich** enthalten als zusätzliches Feld, z.B. am Sollwert
  - Später sollen diese Layout Files dann auch in der **Datenbank als Mongoose-Strukturen** verwaltet werden
  - ==**Update 14.02.2021**== Dies wurde im Layout File für den Bodenaufbau schon so realisiert
  - ==**Update 09.03.2021**== Zusätzlich wurde im Profilformular "Raum" und "Gebäude" folgende Initialisierungslogik für Istwerte aus Sollwerten eingebaut:
    - In mounted(), reset() und watch() (= refresh) werden alle Istwerte traversiert und, ==nur falls sie null sind,== mit ihren "paarigen" Sollwerten initialisiert (offiziell, z.b. in der Dokumentation, Hilfe und in Benutzernachrichten, heißt das "vorbelegt")
    - Sie können dann ggf. baueinheitsspezifisch angepasst, d.h. geändert werden
    - ==**Achtung**==: Die vorbelegten oder angepassten Werte werden erst nach einmaligem Speichern wirksam, d.h. an Kindbaueinheiten weitervererbt.
      Dazu eine Warnung als Benutzernachricht eingebaut, sowie eine eigene farbliche Kennzeichung der Eingabefelder für die betroffenen Istwerte (im Profilformular "Raum").
    - Dies geht nicht anders bzw. wäre nur lösbar, wenn man diese Initialisierung schon am Backend durchführen würde, was aber andere Komplikationen
      mit sich brächte (würde vermutlich obige Steuerung über offizielle Soll-/Istwertegruppen erfordern, da die Layout Files zur Steuerung dieser Logik
      am Backend nicht vorhanden sind)
- ==**[DEFER]**== Übrig bleibt noch die Spezial-Anforderung, den potentiell **„schärfsten“ Wert als Vorgabewert für einen Sollwert** zu aktivieren, wenn
  derselbe Sollwert in mehreren Profilen enthalten ist, mit jeweils unterschiedlichen Vorgabewerten (ein Beispiel dafür war in einer E-Mail)
  - Nach heutigem Stand werden, wenn tatsächlich dasselbe (d.h. identisch bezeichnete) Attribut als Sollwert in mehreren Profilen verwendet wird, die
    Vorgabewerte des zeitlich zuletzt aktivierten Profils eingetragen, was bei Sollwerten nicht so sein sollte!
  - Das können wir zunächst auf „später“ verschieben bzw. diese Situation per Workaround umgehen, indem man die davon betroffenen Sollwerte
    zunächst als unterschiedliche Baueigenschaften definiert
    - Diese würden im obigen Sinn als Sollwerte gekennzeichnet werden, und könnten eventuell sogar auch wieder als eine Soll-/Istwertegruppe in einem
      speziellen Profil als „zusammengehörig“ verwaltet werden - hier in dem Sinne, dass sie eigentlich dasselbe Attribut betreffen, das eben aus den genannten
      Gründen unterschiedlich benannt ist
  - Oder, wenn wir es gleich adressieren wollen, müssen wir im **Aktivierungscode für Baueigenschaftsprofile** folgende neue Logik einbauen:
    1. Unter allen im Profil enthaltenen Baueigenschaften, per Flag aus a) diejenigen identifizieren, die Sollwerte sind
    2. Unter den in Schritt 1 gefundenen die in der Datenbank suchen, die zu mehreren Profilen gehören
    3. Unter den in Schritt 2 eingegrenzten den „schärfsten“ Vorgabewert heraussuchen
    4. Diesen „schärfsten“ Vorgabewert aktivieren statt des Vorgabewerts aus dem aktuell zu aktivierenden Profil
  - Das wäre überschaubarer Aufwand, braucht aber abgestimmten Code im Backend und im Frontend

---

#### **[Epic 23]** ==**[TODO]**== (Prio 3) Reihenfolgebeziehungen in den Baumstrukturen

- Dies ist strukturell bereits vorbereitet durch das verzweigungsTyp-Feld im Modell für die Baustoffe und Baueinheiten aber bisher nicht implementiert
- Unterschieden wird bisher ungeordnete sowie horizontal oder vertikal angeordnete Aggregation unter einem Elternknoten
- Mit diesen Feldern könnte z.B. die Reihenfolge von Schichten unter einem Elternknoten "Schichtaufbau" verwaltet werden
- Für Geschosse, die (Stichwort "Split Level") auch komplexer als Schichten arrangiert sein können, ist angedacht, stattdessen eine Sortierung
  nach Niveauwerten (OKFFB) anzubieten, die einfacher zu realisieren sein dürfte! ==**Update**==: Ist bereits implementiert in #324.

---

#### **[Epic 24]** ==**[WORK]**== (Prio 2) Vervollständigung der Stammdaten

- Für Baueigenschaften
  - Siehe dazu das Excel-Dokument BIM.click Baueigenschaften V1.0.xlsx als Vorlage für den Import
  - ==**Update 16.05.2020**==: Erster Test-Import von 178 Baueigenschaften für die Bauakustik, basierend auf Excel-Input in
    Datei BIM.click Baueigenschaften V1.1 und Generierung von JSON daraus nach schall-baueigenschaften.json (dieses dann
    importiert in lokale Version von BIM.click)
  - ==**Update Juni 2020**==: Von Joachim Zander wurde die Excel-Datei "12751 Attribute Bauphysik 2020-03-26.xls" erstellt, die als weitere Quelle für wichtige Attribute dienen kann
  - Im Word-Dokument "BAUSTOFFBAUM+" für die Baustoff-Stammdaten sind bereits Attribute für viele Rohstoffe/Baustoffe als Verweise auf HTML-/XML-Seiten enthalten ==(mit Werten)==
  - Diese sollten als Nächstes zumindest testweise nach Excel überführt werden!
    - Beispiel: Blähtonlehm 1
      - https://www.masea-ensan.com/cgi-bin/viewmaterial?xml=Bl_htonlehm_1.xml
    - Beispiel: Dispersionsfarbe
      - https://www.masea-ensan.com/cgi-bin/viewmaterial?xml=Dispersionsfarbe_.xml
      - Entält auch 2 Attribute, die als Funktionen mit Diagrammen hinterlegt sind!
    - Allerdings sind die Symbole und Einheiten dort Verweise auf PNG-Images!!!
  - Nach Diskussion am 08.06.2020 liegt die Priorität auf den Kategorien Schallschutz, Wärmeschutz, Brandschutz und Standsicherheit
    - Innerhalb dieser Kategorien liegt die Priorität auf den öffentlich-rechtlichen Vorgaben (vs. den privatrechtlichen)
  - Hinweis: Eventuell müssen die **Schutzkategorien** für Baueigenschaften im System nochmals erweitert werden
    - Gebrauchstauglichkeit, Standsicherheit, Umweltverträglichkeit sind z.B. bisher nicht explizit enthalten
    - Standsicherheit umfasst z.B. auch Widerstandsfähigkeit gegen Windlast und gegen Schnee- und Dauerlast bei Wänden, Fenstern und Dächern
    - Es fehlen nach Durchsicht der Präsentationen von Erik, der LBO und dem Excel-Sheet mit Attributen von Joachim Zander noch folgende Kategorien:
      - Energieeinsparung
      - Gebrauchstauglichkeit
      - Standsicherheit
      - Verkehrssicherheit
      - Barrierefreiheit
      - Gesundheit und Hygiene (überlappt mit Schadstoffschutz und anderen Kategorien)
      - Umweltverträglichkeit (überlappt mit Ökobilanz und Nachhaltigkeit)
      - Sonstiges (z.B. für betriebswirtschaftliche oder geografische Attribute)
    - **[DONE]** Diese zusätzlichen Schutzkategorien hinzugefügt in Backend Code (Models und Controllers), Baueigenschaftsprofile, Baueigenschaften, Baueinheiten,
      Baustoffe
  - ==**[TODO]**== Es sollten auch noch Baueigenschaften angelegt werden für Länder, Bundesländer, Orte, etc. (d.h. **Aufzählungswerte** mit vordefinierten Optionen - Implementierung könnte analog zu bauwerks-zuordnungen.js sein)
- Für Baustoffe, Bauinformationen, Vorlagen für Baueinheiten, Baueigenschaftsprofile

---

#### **[Epic 25]** ==**[TODO]**== (Prio 3) Erweiterungen in allen Objekten/Collections im BIM.click MongoDB/Mongoose Schema

- Weitere Felder für **Revision/Tracking/Auditing** von Änderungen an Objekten - Diese müssen eventuell an allen First Class Objekten (Baustoffen/Baueinheiten/Bauinformationen, etc.) definiert werden, nicht nur an Baueigenschaften!
  - Datumsfeld für die Ersterstellung bzw. Änderung (kann leicht z.B. mit Mongoose Feld createdAt erreicht werden, bereits vorhanden in TokensModel.js)
  - Id des Erstellers/Autors, wer die Ersterstellung oder Änderung erstellt hat
  - Datumsfeld für die Prüfung der Ersterstellung oder Änderung
  - Damit könnte man auch eine Prüffunktion haben, die nach der Ersterstellung ausgelöst wird in einer Art Workflow, d.h. ein Prüfer bekommt eine Task, dass er die Ersterstellung prüfen und freigeben soll
  - Id des Prüfers, wer die Prüfung gemacht hat
  - Da man beliebig viele Änderungen machen kann, und man die nachverfolgen können will, muss man dann wahrscheinlich einen dynamischen Array verwalten, wo man beliebig viele der obigen Quadrupel speichern kann - Das System muss diese Felder bei Änderungen möglichst automatisch aktualisieren - Dies muss zusammenspielen mit einem Konzept für den **Status** von und die Berechtigungen auf Objekten (siehe unten)

---

#### **[Epic 26]** ==**[TODO]**== (Prio 3) Matching-Algorithmus für die Zuweisung von Baustoffen als zugeordnete Baustoffe in Baueinheiten ("Hochzeit" von Baueinheiten und Baustoffen)

- Hier können zwei Grundstufen bzw. Ebenen unterschieden werden:
  - Auf Baueinheitsebene sollten dem Benutzer die auf eine ausgewählte Baueinheit "passenden" Baustoffe zur Auswahl angeboten werden
  - Ein zusätzliches, feineres Matching auf Baueigenschaftsebene kann sinvoll nur designed werden, nachdem erste
    Baueigenschaftsprofile (Attributleisten) von Baustoffen definiert sind. Diese sind je nach Baustoffkategorie höchst unterschiedlich (Beispiel:
    Türen vs. Estriche) und müssen schon im Hinblick auf die Vergleichbarkeit mit bestimmten "Partner-Baueinheiten" definiert werden!
- Ausbaustufe (siehe unten): Zusätzliche Steuerung des Matchings per Wizard mit Filterung, ob die passenden Baustoffe bestimmmte Kriterien erfüllen
- Die erste Stufe oben könnte z.B. über **Matching- bzw. Mapping-Tabellen** gesteuert werden, in denen die passenden/möglichen Paarungen von
  Baueinheiten und Baustoffen hinterlegt sind
  - Die müssten allerdings von einem Redakteur verwaltet werden, um flexibel zu sein gegenüber Änderungen in der Struktur des Baustoffbaums bzw.
    Bauvorhabenbaums (z.B. um neue Typen von Baueinheiten verwalten zu können)
  - Ein Konzept dafür (Masken, Algorithmus) ist zu entwickeln
  - Für Baueinheiten muss dafür ein **Baueinheitstyp** für die Knoten im Bauvorhabenbaum verwaltet werden
    - ==**Achtung**==:
      - Dieser Baueinheitstyp entspricht in etwa bestimmten Baueigenschaftsprofilen - es ist zu überlegen, ob statt des Typs die
        Aktivierung bestimmter Profile herangezogen wird, wie es aktuell auch bei Baueigenschaftsprofilformularen der Fall ist
      - Es ist Mehrfachauswahl möglich (Beispiel: Einstein-Schule kann gleichzeitig "Bauvorhaben", "Standort", und "Gebäude" sein)
  - Dieser Baueinheitstyp bzw. die Auswahl eines bestimmten Baueigenschaftsprofils muss gemapped werden auf bestimmte Knoten bzw. genauer Zweige im
    Baustoffbaum
  - ==Allerdings macht es für die meisten, nur zur Strukturierung im Bauvorhaben vorhandenen **Strukturknoten** im Bauvorhabenbaum keinen Sinn,
    diesen Baustoffe zuzuordnen!==
    - Bauvorhaben, Standort, Gebäude, Etage, Raum, Dach, Bodenaufbau, Wandaufbau, Dachaufbau, ...
  - ==Dagegen sollten **Blattknoten** im Bauvorhabenbaum Baustoffe bzw. Baustoffkategorien zugeordnet werden können (das vorhandene Konzept des
    "Tickings" von Knoten im Baustoffbaum kann weiter verwendet werden (Multi-Select))==
    - Schichten (in Abhängigkeit vom Schichttyp, in Böden, Wänden, Dächern - hierunter fällt z.B. auch "erdberührte Wand") bzw. "Außenwand oberhalb
      Erdreich", "Bodenplatte")
      - ==**TBD**==: Hier ist noch zu entscheiden, ob diese mit separaten Baueigenschaftsprofilen verwaltet werden - bisher haben sie dasselbe Profil "Baueinheit > Schicht" und werden
        lediglich über ein Attribut "Schichttyp" (Aufzählungswert) unterschieden
  - ==**TBD**==: Fenster, Türen, Treppen, ... - deren Struktur ist noch zu designen
  - ==**Hinweis**==:Wenn solchen Baueinheitstypen (Blattknoten) nur bestimmte Zweige im Baustoffbaum zur Zurdnung angeboten werden, kann
    wahrscheinlich auch das heutige Performance-Problem verbessert werden, das dadurch mit verursacht ist, dass stets (ein Extrakt) des gesamten
    Baustoffbaums geladen wird in "Zugeordnete Baustoffe"
    - Hinweis: Dieses Performance-Problem wird aktuell mit einem Object.freeze mitigiert in baueinheiten.vue!
  - Mapping zwischen bestimmten Baustoffkategorien und solchen Baueinheitstypen (nur Beispiele)
    - Baustoffkategorie "Dämmstoffe" <=> Wärme- und Schalldämmungen (Schichttypen in Wand- und Bodenaufbauten)
    - Baustoffkategorie "Abdichtungen, Folien und Bahnen" <=> Trennschichten (Schichttyp in Wand- und Bodenaufbauten)
    - Baustoffkategorie "Bauplatten" <=> Bestimmte Schichttypen in Wandaufbauten
    - Baustoffkategorie "Putze" <=> Außenschichten in Wandaufbauten
    - Baustoffkategorie "Bekleidungsbaustoffe" <=> Au0enschichten in Wandaufbauten
  - Das genaue Mapping der ersten Stufe muss noch designed werden
  - Dabei ist zu berücksichtigen, dass die Bezeichnungen von Baustoffen im Baustoffbaum nicht eindeutig
    sein müssen. Beim initialen Laden des Baustoffbaums wurde allerdings für jeden Baustoff eine
    eindeutige, interne
    gliederunsNummer vergeben, die aber bisher bei Einfügungen, Löschungen und Verschiebungen nicht aktualisiert wird.
  - Die bei obigem Mapping beteiligten Baustoffe müssen allerdings eindeutig auffindbar sein, am
    Besten über eine eindeutige Identifikation wie die gliederungsNummer (diese vorsorglich auch
    lokal in back-end-server.js erzeugt), die sich für einen einmal erzeugten Baustoff
    (der in solchen Mapping Tabellen verwendet wird, und der deshalb sowieso nicht gelöscht werden darf,
    d.h. der damit "systemdefiniert" wird!) nie ändert. Da an dem
    Mapping vermutlich nur bestimmte, "grobe" Baustoffkategorien beteiligt sind, die sich selten
    ändern, könnte man zunächst mit der als fix angenommenen, eindeutigen gliederungsNummer arbeiten,
    und erst später volle Flexibilität enablen, wo man dann das Mapping von Baustoffen zu Baueinheiten
    per Admin-Funktion verwalten kann.
  - UUIDs (siehe Abschnitt weiter unten) sind dafür potentiell ebenfalls geeignet, wenn man sie für alle
    Baustoffe auf Heroku einmal beim ersten Erzeugen des Baustoffbaums generieren würde, und sie dann in den Mapping-Tabellen verwenden würde - im Grunde sind sie dann aber den Gliederungsnummern vermutlich
    nicht überlegen, und auf https://stackoverflow.com/questions/28895067/using-uuids-instead-of-objectids-in-mongodb wird bemerkt, dass man stattdessen ohne große Nachteile
    auch die MongoDB ObjectIds verwenden kann, die besser performen.
- **Ausbaustufen**:
  - **Baustoff-Validierungs-Report**: Es sollte in "Auswertungen" eine Validierung erfolgen, ob die per Checkmark in einem solchen Zweig des
    Baustoffbaums ausgewählten Baustoffe bestimmte Kriterien
    erfüllen. Das Ergebnis könnte ein Report sein mit einer Liste von Abweichungen, oder zusätzliche Markierungen in diesem Zweig des Baustoffbaums,
    mit denen die abweichenden Baustoffe visuell markiert sind
  - **Baustoff-Selektierungs-Wizard**: Abhängig von bestimmten Kriterien (Beispiel: Sollwert für "Rutschfestigkeitsklasse" des Fußbodens) sollte ein
    gefilterter Zweig des Baustoffbaums (Beispiel: "Beläge") ermittelt werden, an dem nur solche Baustoffe selektierbar sind per Checkmark, die per ihren spezifischen Eigenschaften (Beispiel: Istwert "Rutschfestigkeitsklasse") diese Kriterien erfüllen - siehe dazu den nächsten Abschnitt

---

#### **[Epic 27]** ==**[TODO]**== (Prio 3) Design für weitere geplante Erweiterungen zur Zuordnung von Baustoffen an Baueinheiten ("Hochzeit" von Baueinheiten und Baustoffen, "Baustoff-Selektierungs-Wizard")

- Das Tab "Zugeordnete Baustoffe" soll wie folgt geändert werden
- Das bisherige Tab wird per QSplitter aufgeteilt in 2 Bereiche:
  - Links im QSplitter: Anzeige des Baustoffbaums zur Zuordnung von Baustoffen (wie bisher schon)
    - Verbesserung dort: Gemäß dem oben bereits beschriebenen Mapping sollen je nach relevantem Baueigenschaftsprofil
      des links im Bauvorhabenbaum ausgewählten Baueinheit nur bestimmte Zweige des Baustoffbaums zur Zuordnung angeboten werden
    - Zusätzlich zum aktivierten Profil könnten noch Unterkriterien, wie z.B. bei Schichten der Schichttyp, herangezogen werden
    - Beispiel: Wenn links eine Schicht (Profil "Baueinheit > Schicht") ausgewählt ist, sollten, je nach Schichttyp die Zweige "Beläge, Abdichtungen, Folien und Bahnen"
      oder "Dämmstoffe" als Einstiegspunkte angezeigt werden (es wird dann jeweils die nächste Kindebene unter diesen Einstiegsknoten angezeigt)
    - Das Mapping sollte über eine JS- oder JSON-Datenstruktur verwaltet werden
    - Wie bisher sollen initial in diesem speziellen Baustoffbaum nur die getickten Knoten expandiert werden (das sind die,
      die der links im Bauvorhabenbaum ausgewählten Baueinheit zugeordnet sind)
  - Rechts im QSplitter: Anzeige unterschiedlicher Untertabs, je nach Auswahl im Baustoffbaum links davon
    - Erstes Unter-Tab **"Details zum ausgewählten Baustoff"**
      - Anzeige eines Profilformulars für den im Baustoffbaum ausgewählten Baustoff
        - Anfangs können wir ein gemeinsames, generisches Profilformular für alle Baustoffe verwenden, z.B.
          "Baustoffdatenblatt", das alle Baueigenschaften anzeigt, die zu einem initialen Profil "Baustoff" gehören
        - Später kann es mehrere, spezialisierte Profile für Baustoffe gehören
          - Je nach aktiviertem Profil des ausgewählten Baustoffs können dann unterschiedliche Formulare angezeigt werden
        - Hinweis: Diese Profilformulare sollten auch im Haupt-Tab "Baustoffe" angezeigt werden, wenn dort links ein
          Baustoff ausgewählt wird im regulären Baustoffbaum
        - **[DONE]** Dafür ein neues Profilformular read-only-generisches-baueigenschafts-profil-formular.vue aus
          dem bisherigen generischen Profilformular implementiert. Dieses hat als Prop selectedKey und holt in mounted() und watch()
          mit diesem Key den Knoten vom Backend. Eine Prop zum Zugriff auf den vollen Baum ist nicht nötig.
    - Zweites Unter-Tab **"Baustoffe filtern"**
      - Filtermaske zur Filterung der Baustoffe im Baustoffbaum
      - Die Filtermaske kann gleich aufgebaut sein wie obiges Profilformular für Baustoffe (d.h. Eingabefelder mit allen
        Baustoffeigenschaften) bzw. sie zeigt ein Profilformular an für das bzw. ein an diesem Baustoff aktiviertes Profil (bzw. bei mehreren aktivierten
        Profilen ähnlich wie im Bauvorhabenbaum das jeweils "relevanteste" Profil, nach einer vordefinierrten Reihenfolge)
      - ==**Hinweis**:== Das Profil-Model für dieses Tab "Filtern" kann initial aus dem
        Baustoffprofil aufgebaut werden, so wie
        in read-only-generisches-baueigenschafts-profil-formular.vue. Die Filter-Felder
        dort können zunächst auch transient gehalten werden, ohne Speichermöglichkeit. Es müssen keine Werte an dem
        aktuell im Baustoffbaum ausgewählten Baustoff in diese Felder geladen werden (wie es z.B. aktuell
        in read-only-generisches-baueigenschafts-profil-formular.vue erfolgt). Erst per
        Button "Sollwerte aus Baueinheit laden" können über ein Mapping
        Sollwerte aus der im Bauvorhabenbaum ausgewählten Baueinheit (z.B. "Schicht")
        in Felder für korrespondierende Eigenschaften in der Filtermaske geladen werden - auf diese kann über eine Prop
        selectedNodeTreeBaueinheiten zugegriffen werden. Eine Prop nodes
        zum Zugriff auf Elternbaueinheiten ist nicht nötig.
      - In diesen Eingabefeldern für Baueigenschaften sollen Werte eingegeben werden zur Filterung, z.B.
        - Rutschfestigkeitsklasse "R10" (QSelect-Feld)
        - Flächenlast (QInput-Feld)
      - Zusätzlich sollten **Vergleichsoperatoren** auswählbar sein
        - Diese müssen mit dem entsprechenden Wertetyp konsistent sein
        - Gleichheit, Ungleichheit, Größer, Kleiner: Mappen auf **$eq, $ne, $gt, $gte, $lt, $lte** in MongoDB Queries am Backend
        - Eventuell bei Aufzählungswerten: Operatoren, die auf **\$in** bzw. **\$nin** in Mongoose mappen in MongoDB Queries am Backend
          - https://www.geeksforgeeks.org/mongodb-in-operator/
            - Im ersten Beispiel wird ein **String-Feld** in der MongoDB mit **\$in** gegen einem Array of Strings als Suchargumenten durchsucht (diese werden als
              Oder-Bedingungen für die Suche verwendet)
            - Im zweiten Beispiel wird ein **Array-of-Strings-Feld** in der MongoDB mit **\$in** gegen einen Array of Strings als Suchargumenten durchsucht - diese werden
              als **Oder-Bedingungen** für die Suche verwendet
          - https://stackoverflow.com/questions/44561030/how-to-compare-a-string-with-a-string-array-in-mongodb-query-condition
          - ==**Achtung**==: Aufzählungswerte in BIM.click werden per Model als **Arrays of Strings** abgelegt! Dies wird auch bestätigt
            durch Inspektion von Beispiel-Dokumenten in Compass
          - https://stackoverflow.com/questions/18148166/find-document-with-array-that-contains-a-specific-value
            - favouriteFoods: ["sushi", "sashimi"] // Array of Strings
            - Solche Array of String Felder können direkt queried werden: { favouriteFoods: "sushi" } // favouriteFoods contains "sushi"
            - **\$all** für Suche mit Und-Bedingungen nach mehr als einen Wert: { favouriteFoods: { \$all: ["sushi", "sashimi"] } } // favouriteFoods contains "sushi" und "sashimi"
            - ==**Hinweis**:== ==**$gt, $lt, $gte, $lte** arbeiten auch auf Arrays of String!==
            - Dies wurde durch eigene Tests bestätigt (readfilteredExtraktBaustoffe() mit blattFilter4)
            - Alternativ kann man, um alle Werte gößer als "F2" zu finden, diese auch umständlich mit \$in: [ "F3", "F4", "F5", ...] suchen (siehe blattFilter4-Variante)
              - Dazu ist eine Hilfsfunktion notwendig, die einen Array mit allen Werte über einem Wert im alphabetisch vorsortierten Array der Optionen eines
                Aufzählungswerts zurückliefert, welcher dann als Argument für \$in dient
            - $gt, $lt arbeiten natürlich auch mit Strings alleine: https://stackoverflow.com/questions/18039358/mongodb-gt-lt-operators-with-prices-stored-as-strings
            - Dort auch Beispiele, um Strings in Numbers zu verwandeln (**\$convert**) - allerdings kann per Test das dafür nötige **\$expr** per MongoDB-Fehlermeldung
              nicht mit Arrays verwendet werden!
            - **\$in** mit regular Expression geht auch: https://docs.mongodb.com/manual/reference/operator/query/in/ - letztes Beispiel auf der Seite
              - Aber: https://stackoverflow.com/questions/31541854/regular-expression-for-number-x-greater-than-number-y - nicht für greater than/less than
            - Alternative: Umwandlung von String nach Float mit Funktion - kann aber keinen Index benutzen: https://stackoverflow.com/questions/34206396/mongodb-array-string-element-query
          - **distinct**-Operator: https://stackoverflow.com/questions/58594891/how-to-match-a-string-in-array-of-elements-in-mongodb
          - https://www.infoworld.com/article/2074099/working-with-arrays-as-values-in-mongodb.html
          - Wenn nach mehreren Werten mit "Oder"-Bedingung gesucht werden soll, kann zusätzlich auch **\$or** zum Einsatz kommen, vor allem bei
            Suche in unterschiedlichen Feldern (anders als im Beispiel oben):
            - https://stackoverflow.com/questions/21417711/search-multiple-fields-for-multiple-values-in-mongodb
            - {\$or: [ { favouriteFoods: "sushi" }, { lessFavouriteFoods: "sashimi" } ] } // favouriteFoods contains "sushi", or lessFavouriteFoods contains "sashimi"
        - Eventuell bei Wahrheitswerten: Operatoren, die auf **\$not** mappen in MongoDB Queries am Backend
        - Andere interessante Query Operatoren hier: https://docs.mongodb.com/manual/reference/operator/query/ (z.b. **\$text** für Text Search)
        - **\$and**: https://stackoverflow.com/questions/23272682/combining-two-elemmatch-queries-with-and-boolean-operator-in-mongodb - verknüpft 2 \$elemMatches
      - Am API müssen die Filter-Parameter in eine Array-Datenstruktur im Request verpackt werden. Da es sich
        um einen Get-API-Request handelt, müssen diese allerdings in ein ==geeignetes Objekt im Query String== verpackt werden, siehe
        https://stackoverflow.com/questions/514892/how-to-make-an-http-get-request-with-parameters:
        - [ { baueigenschaftsBezeichnung: "Allgemein > Test > Wertetypen > Dynamische Steifigkeit", operator: "$eq", kennWert1: 35 },
          { baueigenschaftsBezeichnung: "Allgemein > Test > Wertetypen > Herstellerkurzbezeichnung", operator: "$ne", bezeichnungsWert1: "Knauf" },
          ... ]
        - Frage: Query-Parameter können keine Blanks enthalten, daher sollten Ids übergeben werden?
        - Antwort: Stimmt so nicht, mittels encodeURICompoment können im per JSON.stringify in einen JSON-String umgewandelten JS-Array
          die Blanks durch %20 ersetzt werden, sowie andere Sonderzeichen ebenfalls mit bestimmten encoded werden gemäß dieser Tabelle:
          https://www.w3schools.com/tags/ref_urlencode.ASP
        - Dieser Array wird dann als Query String bereits übergeben in der Testmethode
        - Die API Route dafür ist :apiRoute/Baustoffe/:id/Baueigenschaften/Filter?filter=:array - letzterer ist der im
          Beispiel angegebene Array als URI encoded JSON-String
        - Zusätzlich wird die Id des Baustoffs, in dessen Unterzweig gefiltert werden soll, als Request Parameter übergeben werden - dies
          ist bereits implementiert in der Testmethode (req.params.id)
      - Darunter soll es entsprechende Buttons geben:
        - ==**[WORK]**== **Baustoffe filtern**: Filtert die Baustoffe im Baustoffbaum links gemäß den eingegebenen Filterbedingungen
          - Die zum Filter passenden Baustoffe können z.B. farbig angezeigt werden
            - Es ist zu überlegen, ob/wie diese dann auch expandiert werden können, sonst ist diese Variante wahrscheinlich
              nicht sinnvoll
          - Oder man tickt diese im Baustoffbaum (allerdings muss der Benutzer die nicht gewünschten manuell unticken)
          - Dazu ist ein neues Backend API notwendig, das gefilterte Baustoffe zurückgibt
            - Macht Mongoose find() in Baustoffen mit einer Und-Kombination von Werten verschiedenener Baueigenschaften
            - Basis: Testcode in verwaltung.vue, Tab "Test Area 3", Baustoffe-Controller-Testmethode readFilteredExtraktBaustoffe()
              - Verwendet .\$elemMatches für Suche nach Werten **zweier** (bzw. allgemein mehrerer) Baueigenschaften
              - ==**Achtung**==: Die bei dieser Testmethode zurückgegebenen Baueigenschaften sind beschränkt auf
                die, die zur Filterung benutzt wurden (sonst Mengenprobleme!) - man könnte aber auch zunächst nur Ids zurücksenden,
                und sich darauf verlasssen, dass, wenn der Benutzer einen der gefundenen Baustoffe "inspizieren" will, er
                ihn wie bei der manuellen Suche im Baum, in dem die gefilterten Baustoffe getickt oder anderweitig angezeigt
                werden müssen, einfach anklickt, wodurch rechts im ersten Unter-Tab ein passendes
                Profilformular dafür angezeigt wird.
              - ==**Achtung**==: Die Testmethode filtert aktuell ab der ersten Kindebene im Baustoffbaum (d.h. in der Ebene
                unter dem Wurzelknoten) - sie könnte aber per Parameter unter einem beliebigen, tieferen Knoten filtern,
                vorzugsweise dem Knoten, der wie oben beschrieben, der "Einstiegsknoten" für die betreffende
                Baueinheit im Baustoffbaum ist
            - ==**Update 05.10.2021**==: Implementiert in filter-generisches-baueigenschafts-profil-formular.filtereBaustoffe() im
              Zusammenspiel mit baustoffe.controller.readFilteredExtraktBaustoffe().
              - Dabei wird aktuell der Startknoten des Zweigs als ausgewählter Knoten im Baustoffbaum per API an das Backend mitgegeben zur Filterung.
              - ==Dadurch sind aktuell keine Mappings zwischen zu filternden Profilen und Startknoten im Baustoffbaum erforderlich!==
              - Der Filter-Query-String werden am Frontend aufbereitet aus den Filter-Eingabefeldern, wenn deren Werte nicht null sind
              - Dabei werden auch Vergleichsoperatoren unterstützt.
              - Am Backend wird der Filter-Query-String in ein entsprechendes Mongoose Query-Argument umgewandelt (siehe Kommentare in readFilteredExtraktBaustoffe())
              - Verbleibende ==**[TODOs]**==
                - Aktuell werden nur Blattknoten herausgefiltert - diese Logik könnte man am Backend ändern
                - Es werden die gefilterten Baueigenschaften am Backend im Array baueigenschaften herausgesucht und mit zurückgegeben, obwohl sie am Frontend aktuell
                  nicht benötigt werden. Dies könnte man aus Performance-Gründen (Memory!) einsparen/disablen in readFilteredExtraktBaustoffe()
                  - Allerdings scheiterte ein Versuch, die baueigenschaften erst gar nicht aus Mongo zu holen, wohl, weil sie von den \$elemMatches benötigt werden
                  - Deshalb könnte man in der Nachbereitung höchstens noch alle aus den Arrays entfernen, statt nur die gefilterten, was
                    aber vermutlich Speicher kostet.
                  - ==Eventuell könnte man sie in einer den §elemeMatches nachgelagerten Aggregation Stage entfernen schon durch Mongo!==
                - Die Logik und Performance, mit welchen Startknoten bestimmte Zweige gefiltert werden, muss weiter beobachtet werden
                - Das Ticking und Expansion Verhalten beim Refresh des Baustoffbaums nach dem Filtern muss weiter beobachtet werden, siehe Kommentare dazu
                  in filtereBaustoffe()
        - **Eingaben zurücksetzen**: Macht Reset aller Eingabefelder (eventuell auch der angezeigten Baustoffe zugunsten aller Baustoffe
          unter dem jeweils passenden Einstiegsknoten -aktuell nicht implementiert)
        - ==**[WORK]**== **Sollwerte aus ausgewählter Baueinheit laden**: Lädt bestimmte Sollwerte aus der Baueinheit in die Eingabefelder, die dann für die Filterung verwendet werden können
          - Beispiele:
            - Soll-Rutschfestigkeitsklasse der ausgewählten Baueinheit (wenn diese eine Schicht vom Typ "Bodenbelag"
              ist - die genauen Regeln dafür müssen noch designed werden)
            - Soll-Einzellast des Bodenaufbaus
            - Soll-Estricheigenschaften
          - Mit diesem Konzept wäre die Suche nach Sollwert-Baueigenschaften einer Baueinheit (z.B. einer Schicht vom Schichttyp "Estrich")
            eine Erweiterung der manuellen Suche durch diesen Button - die jeweils zuweinander passenden Baueigenschaften
            (Sollwerte aus der Baueinheit und Istwerte des Baustoffs) könnten über das Layout File der Baueinheit (z.B. der
            Schicht) verwaltet werden, oder über ein allgemeines Mapping File für korrespondierende Baueigenschaften zwischen Baustoffen und Baueinheiten.
          - ==**Achtung**==: Die Eingabefelder für die zu suchenden Sollwert-Baustoffeigenschaften müssen reguläre Baueigenschaften sein,
            damit die Wertetypen und z.B. die Optionen bei Aufzählungswerten passen - allerdings dürfen
            sie wertemäßig keinesfalls am im Baustoffbaum ausgewählten Baustoff hängen.
            Sie sind eher baueinheitsspezifische Werte für das Filtern in Baustoffen! Hier wird es etwas kompliziert, denn dafür
            müsste dann in diesem Tab "Filtern" eventuell direkt ein passender Teil eines Profilformulars für die ausgewählte Baueinheit
            angezeigt werden (z.B. bei Schichten mit Schichttyp "Estrich" die dort dafür definierten
            Estrich-Baueigenschaften). Diese Einbettung müsste noch designed werden. Sie hinge eng mit
            dem künftigen Design des Profilformulars für "Schicht" zusammen, das dafür
            eventuell aus Unterkomponenten zusammengesetzt werden müsste (komplex).
          - ==**Bessere Alternative**==: Diese Felder für die Suche gar nicht in der Datenbank abspeichern, sondern
            nur deren typbezogene Baueigenschaften aus der Datenbank holen, und die temporäre Eintragung von
            Sollwerten aus der Baueinheit per Button lösen!
          - **Hinweis**: Man könnte eventuell diese Filterung alternativ auch "andersherum" angehen, ausgehend von einem Formular
            für die Sollwert-Baueigenschaften an der Baueinheit (z.B. Schicht). Dort könnte man die zu suchenden
            Werte direkt in diese Baueigenschaften eintragen. Dann müssten diese per Button und Layout File oder sonstiges Mapping in die
            zugehörigen zu suchenden Baueigenschaften in den Baustoffen übertragen werden, und dann nach diesen gesucht und
            gefiltert werden. Allerdings müsste bei diesem Ansatz dieses Formular (z.B. aus dem Baueigenschaftsprofilformular
            für "Schicht") eingebettet werden in "Zugeordnete Baustoffe", da nur dort eine Ergebnisdarstellung (Baustoffbaum)
            möglich ist (diese kann umgekehrt nur schwer in den Bodenaufbau-/Schichteditor) eingebettet werden.
          - Daher erscheint die oben als "bessere Alternative" bezeichnete Variante vorteilhafter. Bei beiden Konzepten finden
            die Sollwerteingabe und die Suche in getrennten Masken statt, die nur per Buttons verknüpft sind.
          - Die zur Filterung heranzuziehenden Eingabfelder sollten entweder jeweils per Checkmark neben dem Eingabefeld
            spezifiziert werden können, oder man behandelt leere Eingabefelder als "nicht zur Filterung heranzuziehen".
          - **[WORK]** Es erscheint insgesamt sinnvoll, für das Filtern ein Derivat von
            read-only-generisches-baueigenschafts-profil-formular zu nutzen (filter-generisches-baueigenschafts-profil-formular), wie
            weiter oben beschrieben. Es filtert in der Basisversion auf den
            Eigenschaften in einem manuell ausgewählten Profil. Später könnten in diese
            Sollwerte aus der ausgewählten Baueinheit per Mapping eingetragen werden.
          - ==**Update 05.10.2021**==: Aktuell werden mit einem Mapping File korrespondierende-baueigenschaften.js bestimmte
            Baueigenschaften an Baueinheiten und Baustoffen gemapped. Testweise werden dort bereits Sollwerte aus dem Baustoffprofil
            "Baustoff > Estrich" bestimmten künftigen Istwerten aus dem Profil "Baueinheit > Schicht" zugeordnet. Die Methode
            filter-generisches-baueigenschafts-profil-formular.ladeSollwerteAusAusgewaehlterBaueinheit() lädt testweise
            bestimmte Werte aus Testbaueigenschaften in Felder am Baustoff.
            - ==**[TODO]**== Diese Methode muss noch finalisiert werden.
          - ==**Update 05.10.2021**==: In read-only-generisches-baueigenschafts-profil-formular.uebertrageWerteAusBaustoffInAusgewaehlteBaueinheit() gibt es
            eine Schwestermethode, welche Werte aus dem Baustoff in die ausgewählte Baueinheit (z.B. eine Schicht) überträgt.
            Diese verwendet dasselbe Mapping File korrespondierende-baueigenschaften.js.
            - ==**[TODO]**== Diese Methode muss noch finalisiert werden.

---

#### **[Epic 28]** ==**[WORK]**== (Prio 2) Vorlagen für Baueinheiten im Bauvorhabenbaum

- Siehe dazu die BIM.click Projektkonzeption und den Anhang des BIM.click Kurzüberblicks
- ==**Hinweise:**==
  - ==Durch das bereits implementierte **Kopieren von Zweigen im Bauvorhabenbaum** aus dem Unterzweig "Vorlagen für Baueinheiten" in Projekte kann bereits ein großer Teil der hier
    für Vorlagen für Baueinheiten beschriebenen Funktionalität erreicht werden, ohne dass neuer Code geschrieben werden muss!==
  - Aus dem Zweig "Vorlagen für Baueinheiten" (d.h. dem Bauvorlagenunterbaum) ist bereits ==**nur Kopieren, nicht Verschieben**== von Zweigen in Projekte erlaubt
- **Vorlagen für Baueinheiten** sind vordefinierte Baumstrukturen im Bauvorhabenbaum, die an beliebiger Stelle in einem Bauvorhaben im Bauvorhabenbaum eingefügt werden können
- ==**Hinweis**==: Die Terminologie dafür war zu entscheiden: **“Baumodule“/“Musteraufbauten“/“Aufbauvorlagen“/“Bauvorlagen“/"Vorlagen für
  Baueinheiten"** - es wurde dabei der ursprünglich verwendete Begriff **"Bauvorlagen"** durch **"Vorlagen für Baueinheiten""** ersetzt,
  da **"Bauvorlagen"** im Bauwesen eine andere Bedeutung haben.
- ==**Hinweis**==: Am User Interface wurde deshalb der früher verwendete Begriff **"Bauvorlagen"** durch **"Vorlagen für Baueinheiten"**
  ersetzt. Im Code wird allerdings weiterhin die Bezeichnung "Bauvorlagenunterbaum" für
  den Teil des Bauvorhabenbaums verwendet, in dem die Vorlagen für Baueinheiten abgelegt und angezeigt werden (der erste Kindknoten auf
  der zweiten Ebene unter dem Wurzelknoten des Bauvorhabenbaums).
- **Vorlagen für Baueinheiten** sind eine Obermenge von normalen, zu Projekten gehörenden Baumstrukturen im Bauvorhabenbaum:
  - sie müssen bzgl. Zugriffsverwaltung von allen Benutzern einsehbar/lesbar sein
  - sie können nur von Redakteuren geändert werden
  - sie verhalten sich bzgl. Operationen (Anlegen, Löschen, Kopieren, Verschieben von Knoten und Teilbäumen) strukturell gleich wie die
    zu Projekten gehörenden Teilbäume im Bauvorhabenbaum
  - sie können/sollten Baueigenschaften aktiviert haben, die gemäß Wertevererbungsregeln Werte definiert haben können
  - sie haben potentiell einige zusätzliche Charakteristika
- Sie werden bereits zentral als **Bauvorlagenunterbaum** (mit Label "Vorlagen für Baueinheiten") unter dem Bauvorhabenbaumwurzelknoten verwaltet
- Jede Vorlage für Baueinheiten besteht dabei aus:
  - Vorlage-Elternknoten für die Vorlage für Baueinheiten
  - Direkten und indirekten Vorlage-Kindknoten (diese sind ihrerseits Vorlagen für Baueinheiten)
  - Zu entscheiden: Vorlage-Kindknoten unter einem Vorlage-Elternknoten können dabei jeweils
    - entweder **selektierbar** sein (d.h. durch den Benutzer ausgewählt werden, Mehrfachauswahl sollte möglich sein)
    - oder **aggregiert** werden (diese werden immer angelegt beim Einfügen, keine Auswahl durch den Benutzer)
    - Hinweis: Die **Anordnung (vertikal** oder **horizontal)** der Kindknoten unter einem Elternknoten sollte davon unabhängig festlegbar sein!
  - ==**[DEFER]**== Zu entscheiden: Jeder Bauvorlage-Knoten bringt dabei ein vordefiniertes **Baueigenschaftsprofil** mit (aktuell ist dies nicht der Fall,
    sondern es können beliebige Baueigenschaftsprofile aktiviert werden im Bauvorlagenunterbaum - wie im gesamten Bauvorhabenbaum)
- **Einfügen** einer Vorlage für Baueinheiten unter einem Elternknoten im Bauvorhabenbaum
  - Bisher können Zweige aus dem Bauvorlagenunterbaum beliebig unter Elternknoten in Bauprojekten/Baueinheiten eingefügt (kopiert) werden
  - ==**[DEFER]**== In Zukunft könnte dies auch noch erweitert werden, per dediziertem neuen **Kontextmenü „Vorlage für Baueinheit einfügen“** an einem Elternknoten
  - Welche Vorlagen für Baueinheiten unter einem Elternknoten nach dem Anklicken des Kontextmenüs auf der ersten Ebene zum Einfügen angeboten werden, muss noch entschieden werden:
    - In einer ersten Stufe könnten zunächst **alle im System angelegten Vorlagen für Baueinheiten der obersten Ebene** angeboten werden
    - Alternativ könnten auch **alle im System angelegten Vorlagen für Baueinheiten auf allen Ebenen** angezeigt werden (d.h. auch Kindknoten in den vordefinierten Vorlagen für Baueinheiten, die in diesem Fall als
      Wurzelknoten für das Einfügen verwendet werden)
    - In einer Ausbaustufe könnten auch, abhängig davon, ob der betreffende Elternknoten bereits aus einem Vorlage für Baueinheiten stammt, **nur die jeweils passenden Kindknoten dieser Vorlage für Baueinheiten**
      angeboten werden (es muss dann an jedem Knoten gespeichert werden, aus welcher Vorlage für Baueinheiten ein Knoten stammt)
      - So könnten z.B. in einen Fußbodenaufbau nur Schichten angeboten werden, nicht andere Vorlagen für Baueinheiten
  - Es muss dabei ein **Dialog** erscheinen, in dem alle selektierbaren Kindknoten in der Vorlage für Baueinheiten vom Benutzer ausgewählt werden können
    - Z.B. per Checkbox-Auswahl – aggregierte Unterknoten haben dabei eine angewählte Checkbox, die nicht abgewählt werden kann, selektierbare Unterknoten haben eine Checkbox, die vom
      Benutzer an- oder abgewählt werden kann
      - Dieser Dialog kann kaskadierend/dynamisch beliebig viele Unterdialoge auslösen für die Kindeskinder (ähnlich wie im BTKBuilder die verschachtelten Dropdown-Menüs)
    - Alternativ könnte auch eine Auswahl über die rekursive Anzeige und Auswahl der **Baumstruktur** für die Vorlage für Baueinheiten erfolgen:
      - In der ersten Ebene wird zunächst nur der Baum mit den expandierten direkten Kindknoten unter dem Wurzelknoten einer Vorlage für Baueinheiten angezeigt
      - Per Checkmark an jedem selektierbaren Kindknoten kann der Benutzer dann auswählen, welche der selektierbaren Kindknoten auf der Kindebene er selektiert oder deselektiert (Default)
      - Aggregierte Kindknoten werden dabei automatisch selektiert und rekursiv expandiert
      - Wenn der Benutzer einen selektierbaren Kindknoten selektiert, wird rekursiv dieselbe Anzeige und Auswahl für dessen Kindknoten initiiert, usw.
  - Beim **Einfügen** der so bestimmten Vorlage für Baueinheiten unter eine Baueinheit
    muss für alle in der Vorlage für Baueinheiten aktivierten Baueigenschaften eine ähnliche **Aktivierung** und **Wertevererbung** durchgeführt werden wie beim
    **Aktivieren eines Baueigenschaftsprofils**
    - Siehe oben - die Logik ist dieselbe, allerdings sind beim Aktivieren
      eines Baueigenschaftsprofils Vorgabewerte der Baueigenschaften am Profil zu berücksichtigen,
      während beim Einfügen eines Zweigs (evtl. eine Bauvorlage!) die Werte der Baueigenschaften an der Wurzelbaueinheit des  
      eingefügten Zweigs zu berücksichtigen sind!
    - Dann für alle am Wurzelknoten der einzufügenden Vorlage für Baueinheiten aktivierten Baueigenschaften
      folgendes durchführen:
      - Für Baueigenschaften, die **nicht aktiviert** sind an der Baueinheit, unter der der Zweig (evtl. eine
        Bauvorlage) neu eingefügt wird:
        - Diese **aktivieren** an allen Knoten im Pfad
          zwischen Wurzel des Bauvorhabenbaums und der Baueinheit, unter der Zweig (evtl. eine Bauvorlage) neu eingefügt wird
        - Ansonsten können in diesem Fall diese Baueigenschaften in allen Knoten der eingefügten
          Vorlage für Baueinheiten **unverändert aus der Vorlage übernommen** werden bzgl. ihres Aktivierungszustands
          (aktiviert) und ihrer Wertedefinition
      - Verhalten, wenn im Profil enthaltene Baueigenschaften bereits **aktiviert** sind am
        betreffenden Knoten, unter dem der Zweig (evtl. eine Bauvorlage) neu eingefügt wird, oder auch
        weiter oben im Pfad zwischen dem Wurzelknoten des Bauvorhabenbaums und dem
        Knoten, unter dem der Zweig (evtl. eine Bauvorlage) neu eingefügt wird:
        - Wenn in allen Knoten im Pfad die Baueigenschaft **undefinierte** Werte hat: Nichts zu tun
        - Andernfalls, wenn die Baueigenschaft ab einem Knoten im Pfad **vorhandene, definierte**
          Werte hat:
          - Hier würde eventuell die Wertevererbungsregel verletzt werden, falls im Baum zwischen
            Wurzelknoten der Vorlage für Baueinheiten und seinen Kind- und Kindeskindknoten irgendwo andere Werte definiert sind
            (dies kann in dem durch den neu eingefügten Zweig (evtl. eine Bauvorlage) definierten Unterbaum mehrfach der Fall sein!)
          - Wenn überall im Bauvorhabenbaum die Wertevererbungsregel gelten soll (Hinweis: Dies könnte in einer späteren Ausbaustufe
            eventuell optional über weitere Schalter global oder für  
            Teilbäume auch abschaltbar sein) muss, abhängig von einem globalen bzw. für den jeweiligen Einfüge-Vorgang einstellbaren Schalter
            **"'Vorhandene definierte Werte von Baueigenschaften überschreiben mit Werten aus neu eingefügtem Zweig"**, folgendermaßen verfahren werden für jede im Profil enthaltene Baueigenschaft, die
            bereits aktiviert ist im Pfad und dort irgendwo vorhandene, definierte Werte hat im oben genauer beschriebenen Sinn:
            - Falls dieser Schalter **"Vorhandene definierte Werte von Baueigenschaften überschreiben mit Werten aus neu eingefügtem Zweig"** auf **"false"** steht, muss eine
              **Vererbung der vorhandenen, definierten Werte** aus dem Elternknoten (im Bauvorhaben) des neu eingefügten Zweigs an alle Knoten im neu
              eingefügten Zweig (evtl. aus einer Bauvorlage) durchgeführt werden (eventuell im neu eingefügten Zweig vorhandenen Werte
              werden dann überschrieben)
            - Falls dieser Schalter **"Vorhandene definierte Werte von Baueigenschaften überschreiben mit Werten aus neu eingefügtem Zweig"**
              auf **"true** steht, müssen alle Werte in den Pfaden zwischen dem
              Knoten, an dem der **vorhandene Wert definiert** ist, und den Knoten
              im neu eingefügten Zweig, an denen Werte für die
              betreffende Baueigenschaft definiert sind, auf **undefiniert** gesetzt werden
          - Terminologie für diesen Schalter:
            - Wertevererbung für Baueigenschaften in den Bäumen beim Einfügen (d.h. Kopieren oder Verschieben) von markierten Zweigen unter einen Zielelternknoten
            - **"true"**: **"Vorhandene [definierte] Werte [von Baueigenschaften][im pfad über dem zielelternknoten eines neu eingefügten zweigs] ggf. überschreiben mit mitgebrachten Werten aus neu eingefügtem Zweig"**
            - **"false" (Default im Model)**: **"Vorhandene [definierte] Werte [von Baueigenschaften][im pfad über dem zielelternknoten eines neu eingefügten zweigs] ggf. übernehmen in neu eingefügten Zweig"** bzw. besser
              **"Mitgebrachte [definierte] Werte [von Baueigenschaften] im neu eingefügten Zweig ggf. überschreiben mit vorhandenen Werten aus dem Zielelternknoten des neu eingefügten Zweigs"**
            - ==Der **Default-Wert** sollte **"false"** sein==
            - Der Schalter heißt treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig in benutzer.model.js, er wird geladen nach
              localStore.state.einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig

---

#### **[Epic 29]** ==**[TODO]**== (Prio 3) Bauelemente/Bauteilfamilien/Katalogbauteile

- Siehe dazu auch die BIM.click Projektkonzeption und den Anhang des BIM.click Kurzüberblicks
- ==**Hinweis:**==
  - Die Terminologie für Bauelemente ist noch nicht fixiert - als Arbeitstitel wird hier "Bauelemente" verwendet
  - In Revit ist das Bauelementen entsprechende Konstrukt **"Bauteilfamilien"**
- **Bauelemente** dienen zur Definition und Verwendung von wiederverwendbaren Bauteilen als Baueinheiten in Bauvorhaben
- Bauelemente sind strukturell ähnlich wie **Vorlagen für Baueinheiten**, allerdings müssen sie als Referenzen verwaltet werden
  - Wenn das vordefinierte Bauelement geändert wird, müssen sich die verwendeten Instanzen ebenfalls ändern (Reuse "by Reference" statt
    "by Copy")
  - Es ist sinnvoll, zunächst ein Original-Bauelement in einem Bauprojekt dafür zu definieren (eventuell als Kopie einer Baueinheit in
    den Vorlagen für Baueinheiten), und dann die "Kopien" mit Referenzen auf dieses Original-Bauelement
- Ideen zur Unterstützung von Bauelementen per Mail Thread vom 20.04.2021:

  - Arbeitshypothese: Bauelemente (Arbeitstitel) sind bestimmte Typen von „bauteilartigen“ Baueinheiten im BIM.click (z.B. Bodenaufbauten,
    Wandaufbauten, Fenster, Fassaden, etc.), deren Baueigenschaften im Gegensatz zu den bisher bekannten „regulären“ Baueinheiten
    (Bauvorhaben, Standort, Gebäude, Geschoss, Raum, etc.) nicht ausschließlich individuelle Werte an der Baueinheit annehmen sollten,
    sondern für die ein Teil (oder im Extremfall alle) Werte auf einer bestimmten Ebene (im System, Bauvorhaben, Gebäude,
    Geschoss, etc.) nur
    einmal zentral - vermutlich allerdings nicht zentral im ganzen System, sondern "semi-zentral" auf einer höheren Ebene in einem
    konkreten Modell verwaltet - werden sollen. Ändert man dann diese „zentralen“ Werte, soll die Änderung in
    allen betreffenden Bauelementen vollzogen werden, so dass man also die Werte nur einmal zentral ändern muss.
  - Die Unterstützung solcher zentral verwalteter Baueigenschaften erfordert keine Erweiterung des BIM.click Gebäudemodells, sondern
    könnte wie folgt auch mit bereits vorhandenen Konzepten und Mitteln (gemeinsame Baueigenschaften in mehreren Profilen,
    Wertevererbung) modelliert werden:

    - a. Man legt dafür bestimmte Baueigenschaftsprofile an, die diese „zentralen“ Baueigenschaften enthalten – die könnte man z.B.
      „zentrale Bauelementprofile“ oder **"Familienprofile"** bzw. **Bauteilfamilienprofile** nennen. Es sind eigentlich ganz normale
      Profile, z.B. eines für Bodenaufbauten, eines für Wandaufbauten, etc.)
    - b. Man definiert auch möglichst Vorgabewerte für alle diese Baueigenschaften (muss aber nicht sein), die bei Aktivierung eines
      solchen zentralen Profils eingetragen werden
    - c. Man ordnet diese Baueigenschaften als sogenannte gemeinsame Baueigenschaften auch dem jeweiligen individuellen Profil
      **("Individualprofil"** bzw. **"Bauteilindividualprofil")** für das Bauelement zu – dieses Profil kann darüber hinaus auch
      individuelle, weitere Baueigenschaften enthalten. Dadurch werden alle „zentralen“ Werte an diese Baueinheiten weitervererbt, und
      können dort im Gegensatz zu den individuellen auch nicht individuell verstellt werden – wie gewünscht
    - d. Man kann diese gemeinsamen Baueigenschaften (hat sich schon mehrfach bewährt) auch als sogenannte Soll-/Istwert-Paare
      definieren: Dann wird der Vorgabewert als Sollwert festgehalten, der Istwert wird mit dem Sollwert (d.h. dem Vorgabewert)
      initialisiert, kann aber auch geändert werden – wohlgemerkt dann als zentrale Baueigenschaft, die aber als gemeinsame
      Baueigenschaft weitervererbt wird an alle Baueinheiten, an denen das individuelle Profil für das jeweilige Bauelement aktiviert
      wird (eben z.B. Bodenaufbauten unter Räumen). Dort kann sie aber nicht „verstellt“ werden, da ja bereits ein Wert weiter oben im
      Baum dafür festgelegt wurde (Vererbungsregel).
    - e. Auf welcher Ebene man das zentrale Bauelementprofil dann jeweils aktiviert (für ein Bauvorhaben, für ein Geschoss, …) kann man
      nach Bedarf entscheiden – je weiter oben in der Baumhierarchie, desto „zentraler“ eben
    - f. Zusätzlich brauchen wir dann neben den normalen Baueigenschaftsprofilformulare für die „bauteilartigen“ Baueinheiten noch  
      Profilformulare, mit denen man die
      gemeinsamen Eigenschaften in diesen „zentralen Bauelementprofile“ zentral (d.h. genau auf der Ebene, wo diese aktiviert sind)
      editieren und verwalten kann. Das ist aber kein riesiger Zusatzaufwand, da das ja keine anderen Baueigenschaften sind, als die,
      die wir sowieso am Bodenaufbau/Wandaufbau/etc. haben wollen.
    - g. Speziell für potentiell "zentrale" Baueigenschaften von Schichten ergibt sich dabei folgendes Problem: Schichten werden
      bisher über einen Aufzählungswert (z.B. Schichttyp im Bodenaufbau) unterschieden, haben aber ansonsten alle dieselben, dem
      bisher einzigen, gemeinsamen Baueigenschaftsprofil "Baueinheit > Schicht" zugeordnete Baueigenschaften. Wenn man nun eine diesem Profil
      zugeordnete Baueigenschaft "Schichtdicke" zentral
      verwalten will, kann deren Wert nicht ohne Weiteres individuell für jeden Schichttyp belegt werden, da diese Baueigenschaft
      ja nur einmal
      für alle Schichttypen existiert. Zur Lösung müssen entweder individuelle Profile für jeden Schichttyp definiert werden, die
      dann auch individuelle Eigenschaften haben können, oder es muss die Verwaltung der zentralen Baueigenschaft so gestaltet
      werden, dass für jeden Schichttyp eine spezifische Baueigenschaft "Schichtdicke für Schichttyp ..." definiert wird,
      die dann zentral mit Werten belegt werden kann (z.B. am Gebäude oder am Geschoss). Diese müssen dann als Sollwerte
      an die Schichten vererbt werden, deren jeweilige Dicken müssen dann als Istwerte (wenn undefiniert/null) beim Laden des
      Profilformulars für Schichten, abhängig vom ggf. gesetzten Schichttyp mit dem entsprechenden Sollwert initialisiert werden.
      Sie können dann vom Benutzer bei Bedarf auch mit individuellen Werten überschrieben werden.
    - h. Ähnliches gilt für Boden-/Wandaufbauten. Input für zentral zu verwaltenden Baueigenschaften dort: Geeignet sind dafür alle
      Prüfwerte und physikalischen Baueigenschaften eines Aufbaus, die sich von Instanz zu Instanz nicht verändern, z.B.
      Direktschalldämmmaß Rw, U-Wert, Brandschutzklasse, flächenbezogene Masse, Kürzel zur Identifikation, alles was auch für die
      einzelnen Schichten konstant und für den Wandaufbau relevant ist (z.B. Oberfläche: Schallabsorptionsgrad, Oberflächengüte).
      - Hinweis zu Rw (Direktschalldämmmaß): Dies könnte ggf. der sogenannte Prüfwert für einen vordefinierten Bodenaufbau sein, der zu
        unterscheiden ist vom ggf. von BIM.click aus den Schichtdicken und Rohdichten der Schichten berechneten Istwert.
    - i. Weitere Überlegungen dazu: diese „zentralen“ Baueigenschaften an einem solchen „Familienbauteil“ müssen ja auf einem bestimmten
      Level in einem konkreten Gebäudemodell dann auch zentral editierbar sein (ob das auf Bauvorhaben-, Gebäude- oder Geschossebene
      sein soll, muss dabei auch noch entschieden werden – wahrscheinlich gesichert ist dabei bisher nur, dass es nicht
      auf der Ebene von BIM.click insgesamt sein kann, sonst würde ein „kleiner“ Eingriff dort ja alle Projekte ändern). Zusätzlich will
      man dabei ja nicht nur einen einzigen Boden- oder Wandaufbau mit zentralen Werten haben, sondern eben unterschiedliche „Aufbautypen" von Boden- oder Wandaufbauten. Wenn man dabei beliebig viele solche „Aufbautypen“ unterstützt haben möchte („große“
      Lösung), erfordert das zwangsläufig eine aufwändige Erweiterung des Metamodells (die verschiedenen Aufbauten mit ihren Aufbautypen müssten dann von einem Administrator angelegt werden, mit allen nötigen weiteren Operationen darauf bzgl.
      Ändern/Löschen/Aktualisieren aller betroffenen Modelle, etc. - das wäre nur sehr langfristig umsetzbar. Was wir als potentielle
      „kleinere“ Lösung dafür aber noch evaluieren sollten, ist, ob wir dabei erst mal mit einem fixen, statisch vordefinierten Satz von „Aufbautypen“ auskommen können (z.B. „3-schichtiger Bodenaufbau“ als ein Beispiel für einen einzelnen solchen „Aufbautyp“, einfach mal erfunden). Dann könnten wir pro Aufbautyp jeweils einen statisch definierten Satz (von allerdings von Aufbautyp zu Aufbautyp in ihren Werten unterschiedlichen) Baueigenschaften festlegen, und diesen dann in einem Formular (Unter-Tab, entweder am Bauvorhaben oder am Gebäude oder am Geschoss) zentral editierbar zur Verfügung stellen. Diese Werte würden dann mit den vorhandenen Mitteln von BIM.click weitervererbt an die Bodenaufbauten des jeweiligen Aufbautyps (der Aufbautyp wäre ein neuer Aufzählungswert im Profil „Bodenaufbau“, künftig auch im Wandaufbau), analog zum Aufzählungswert „Schichttyp“ im Profil „Schicht“.

      Frage: Was wären hierfür die wichtigsten solchen „Aufbautypen“?

      Nebenbemerkung dabei: Im Zweig „Vorlagen“ könnten solche zentralen Aufbauten auch schon bestimmte zentrale Werte (pro „Aufbautyp“)
      von einem Administrator vordefiniert haben. Diese sollten dann beim Kopieren der Vorlage in ein konkretes Modell übernommen
      werden. Allerdings muss dabei berücksichtigt werden, dass die „Zentralität“ im Zweig „Vorlagen“ auf derselben Ebene sein sollte
      wie im Zielmodell, in das die Vorlage kopiert wird, verwaltet wird, sonst kommt es zu Inkonsistenzen.

  - ==**[TODO]**==: Es sollten jeweils die "zentralen" und die "individuellen" Baueigenschaften identifiziert werden, für
    Bodenaufbauten und Wandaufbauten
  - Hinweis: Zusätzlich sollte auch die Struktur der beteiligten Baueinheiten in einem solchen Bauelement berücksichtigt werden. Diese
    Strukturen ebenfalls zentral zu verwalten (d.h. "by Reference" statt "by Copy") wäre wesentlich komplexer. Beispiel: Ein
    5-schichtiger Bodenaufbau soll zentral in einen 6-schichtigen Bodenaufbau umgewandelt werden. Dazu müssten tatsächlich alle
    Referenzen, wo das Bauelement verwendet wird, verwaltet werden, und alle betroffenen Verwendungen strukturell aktualisiert werden im
    Bauvorhabenbaum.
  - Hinweis: Vorgabewerte (in Verbindung mit unterschiedlichen "Unter"-Profilen z.B. für verschiedene Aufbautypen) eignen sich
    nicht zur Verwaltung zentraler
    Eigenschaften, da sie bei Aktivierung eines Profils in einem konkreten Gebäudemodell zwar eingetragen werden,
    aber diese Werte in den betroffenen Instanzen bei zentraler Änderung des Vorgabewerts am Profil nicht aktualisiert werden.
    Selbst wenn solche Vorgabewerte bei Änderung in den Instanzen aktualisiert würden, wäre dies potentiell nicht gewünscht,
    da Vorgabewerte systemweit definiert sind, d.h. es würden ohne weitere Vorkehrungen alle Projekte aktualisiert werden.
  - Hinweis: Wenn man "echte" wiederverwendbare Bauelemente als first Class Citizens einführen würde, müsste man für die
    dort enthaltenen Baueigenschaften designen, wo die zentrale Verwaltung vs. der Vererbung aus den Elternbaueinheiten
    zum Tragen kommt - ggf. müsste die Vererbung für bestimmte, zentral verwaltete Baueigenschaften aus dem Elternpfad dann ggf.
    abgeschaltet werden zugunsten einer Werteübernahme aus der zentralen Vorlage (die dann z.B. im Zweig "Vorlagen für
    Baueinheiten" erfolgen würde). Will man allerdings eine "semi-zentrale" Verwaltung auf einem bestimmten Level innerhalb eines
    Modells (d.h. nicht systemweit), entspricht dies bei Definition als gemeinsame Baueigenschaften zwischen mehreren Profilen
    doch wieder einer Vererbung, wie oben beschrieben.
  - ==**Update 25.11.2021**==: Mögliche Varianten obiger Anforderung diskutiert:
    - **Zentrale Aktualisierung von Werten von Baueigenschaften an allen Baueinheiten mit bestimmtem aktiviertem Profil**:
      - Beispiel: **"Türlisten"**
      - Neue Filterfunktion, mit der z.B. sämtliche Türen (oder andere Baueinheiten, profilgesteuert) in einem Bauvorhaben, Gebäude oder Geschoss angezeigt
        werden können
      - Auswahlfunktion (Checkboxes), die es erlaubt, bestimmte Baueinheiten aus dieser Filterliste auszuwählen
      - Aktualisierungsmaske, die es erlaubt, bestimmte Baueigenschaften an diesen ausgewählten Baueinheiten zentral zu aktualisieren
      - Button "An allen Baueinheiten aktualisieren", welcher den oder die Werte an allen Baueinheiten speichert
    - Variante davon: **Zentrale Aktualisierung der zugeordneten Baustoffe an allen Baueinheiten mit bestimmtem aktiviertem Profil**
      - Beispiele:
        - Zuordnung eines Baustoffs "Teppichboden" an Schichten in allen Bodenaufbauten (eingegrenzt auf Schichttyp "Bodenbelag")
        - Zuordnung eines Baustoffs "Wandfarbe" an Schichten in allen Wandaufbauten (eingegrenzt auf Schichttyp "Wandbelag")

---

#### **[Epic 29.a]** ==**[TODO]**== (Prio 3) Verwaltung von Raum-Nachbarschaftsbeziehungen und Akustik-Konfliktsituationen ohne Geometriemodell

- Das hängt zusammen mit Epic 29 und insbesondere mit der Art, wie wir künftig die „bauteilartigen“ Baueinheiten
  (Wände, Böden/Decken, Fenster, Türen) im Modell verwenden (insbesondere auf welchen Hierarchieebenen im Bauvorhabenbaum). Wenn wir, wie in Epic 29 beschrieben, zentrale Bauelemente auf unserer Roadmap haben, sollten wir als Modellierungskonvention davon ausgehen, dass bei der Modellierung von Räumen jeweils raumindividuelle Bodenaufbauten bzw. auch mehrere individuelle Wandaufbauten als Kindbaueinheiten unter jedem Raum angelegt werden sollten. Wenn diese dann gemeinsame/identische Werte von Eigenschaften haben sollen, könnte dies zukünftig durch das in Epic 29 beschriebene Konzept abgedeckt werden.

- Diese Art der Modellierung, in dem Sinne, dass auch hier das BIM.click-„Baummodell“ gilt, hat den großen Vorzug, dass wir die sonstigen Vorteile, die aus der Vererbung aller übergeordneten Werte aus den Eltern (insbesondere Sollwerte aus Standort, Geschoss, Raum, etc.) ziehen, behalten und voll nutzen können.

- Als Modellierungskonvention könnten wir noch sagen, dass z.B. gemeinsame Zwischenwände zwischen Räumen nur einmal modelliert werden, nicht zweimal – eben als Wandaufbau unter einem der beiden beteiligten Räume. Weitere solche Konventionen betreffen z.B.
  an welchem Raum in potentiellen Nachbarschaftspaaren Zwischenwände modelliert werden (z.B. nach Nutzungsart an Wohnräumen vs. an Fluren, oder bei selbem Nutzungsprofil alphabetisch nach Raumbezeichnungen, z.B. an Raum 1" vs. an "Raum 2").

- Ein weiterer wichtiger Faktor dabei ist, ob Trennwände an Raumnachbarschaftsgrenzen enden ("gesplittete"/"segmentierte" Trennwände)
  oder ob diese durchlaufend sind. Durchlaufende Wände sind mit dem BIM.click-Baummodell, wo jede Wand eindeutig einem Raum als
  Elternbaueinheit zugeordnet werden muss, nicht gut vereinbar. Dies kam insbesondere in der Diskussion mit abstractBIM als
  möglichen "Lieferanten" für die Raumnachbarchaften per JSON-Datenaustausch hoch.

- Betrachtet man den Modellierungsaufwand, der dadurch entsteht, dass man einen Bodenaufbau unter jedem Raum anlegen soll, gibt es dafür zwei Aspekte:

  - Dies ist nicht zwingend immer erforderlich – vor allem in einer frühen Planung kann man ja auch unvollständige Modelle haben
  - Man kann mit den vorhandenen Kopierfunktionen vorhandene Bodenaufbauten und zukünftig auch Wandaufbauten sehr einfach duplizieren und unter neue Räume kopieren, so dass der Arbeitsaufwand reduziert wird

- Für Nachbarschaftsbeziehungen (bzw. Raumakustik-Konfliktsituationen als Spezialfall davon) brauchen wir tatsächlich eine Erweiterung in dem Sinne einer Tabelle (als Schema-/Metamodellerweiterung am Gebäude), die es erlaubt, Räume als Nachbarräume von anderen Räumen festzulegen, in einer ersten Ausbaustufe manuell über Tabellen und Dropdown-Menüs. Ob man das nur für bestimmte, evtl. exemplarische Konfliktsituationen, oder erst mal nur die einfacheren Fälle innerhalb eines Geschosses, oder gleich im gesamten Gebäude erfasst, ist zu überlegen. Im letzteren Fall kommt man wohl nicht umhin, bei der Auswahl auch wieder die Geschossstruktur mit anzuzeigen bzw. mit in die Tabelle aufzunehmen (Räume haben zwar alle eine eindeutige Id, aber ihre Bezeichnung („Besenkammer“) ist absichtlich nur eindeutig innerhalb eines Geschosses, und die Bezeichnung ist das, was wir üblicherweise zuerst anzeigen).

- Unabhängig davon, welche Ausbaustufe man dafür implementiert - wenn man zwei Räume als benachbart einträgt, muss man dabei auch angeben können, welches „Trennbauteil“ in dieser Nachbarschaft relevant ist (präziser ausgedrückt, müssen das Kindbaueinheiten von einem der beteiligten benachbarten Baueinheiten, z.B. (Zwischen-)Wände sein). Und man kann noch weitere Informationen an dieser Beziehung verwalten (z.B. gemeinsame Kantenlänge u.ä.). Optional könnten auch mehr als ein Trennbauteil für ein Raumnachbarschaftspaar verwaltet
  werden (Flankenbauteile).

- Diese „Raumnachbarschaftsverwaltung“ (Arbeitstitel) über Tabellen mit Verweisen auf Räume und Trennbauteile wäre eine Erweiterung unseres Schemas/Metamodells.

- ==**Weitere Hinweise**==:
  - Als Teil der Masterarbeit von Kay Bodenschlägel wird hierfür im Mai 2021 ein revidiertes Design verfolgt,
    bei dem für einen Raum als Einstiegsstufe der Implementierung lediglich ein "fiktiver" bzw. "exemplarischer" Sende-Nachbarraum
    modelliert wird, dessen akustische Eigenschaften
    (z.B. dessen Nutzungsprofil) zusammen mit dem Trennbauteil zwischen dem ausgewählten Empfangsraum und diesem fiktiven
    Nachbbarraum erfasst werden. Auch hierfür ist zu entscheiden, ob diese in regulären Baueigenschaften modelliert werden, oder als
    Schemaerweiterung von Baueinheiten (die dann eventuell bei Baueinheiten mit aktiviertem Profil "Baueinheit > Raum" befüllt werden könnte).
    Wenn man pro Raum eine variable, beliebig lange Liste von solchen fiktiven Nachbarschaften verwalten will, spricht dies eher dafür,
    eine Schemaerweiterung ähnlich wie die oben beschriebene Schemaerweiterung für alle Raum-Nachbarschaftsbeziehungen in einem Gebäude
    vorzusehen. Im Hinblick auf eine spätere Erweiterbarkeit wäre es wahrscheinlich sinnvoll, dies doch ebenfalls am Gebäude
    als Schemaerweiterung vorzusehen. Statt eines anderen Nachbarraums würde dann lediglich ein fiktives Raumprofil ausgewählt werden,
    allerdings könnte dies Probleme machen, wenn das Trennbauteil zu einem echten anderen Raum gehört, aber nicht ausgewählt werden kann.
  - ==Alternativ könnte man Attribute zur "fiktiven" Nachbarschaft auch am neu angedachten Konstrukt **"Trennbauteil"** unterbringen - dies hätte den
    Vorteil, dass, da ein Raum mehrere Trennbauteile haben kann, man flexibler ist bezüglich der Verwaltung der Attribute für
    mehrere Nachbarschaften - allerdings spielt hier dann die Basisannahme herein, dass ein Trennbauteil an Raumgrenzen endet, und
    somit immer eindeutig zwei Nachbarräume trennt - dies wurde in der Diskussion mit abstractBIM ja schon diskutiert und postuliert
    (abstractBIM will diese "gesplitteten" Trennbauteile auch liefern können).==
    - Dies wäre dann eine Verwaltung einer oder mehrerer anderer "zugeordneter Baueinheiten" (nämlich Nachbarräume) für eine Baueinheit
      (nämlich ein Trennbauteil)
    - Man könnte ähnlich wie "zugeordnete Baustoffe" bzw. "zugeordnete Bauinformationen" dort Referenzen auf Baueinheiten für Nachbarräume eintragen
    - Das Model für die Baueinheiten müsste entsprechend erweitert werden, inklusive der notwendigen pre-Middleware beim Löschen von Räumen
    - Die UI-mäßige Verwaltung wäre ähnlich wie in "zugeordnete Bauinformationen", bei den zugeordneten Baueinheiten eingeschränkt auf Kombinationen von
      Geschosse´und Räumen, d.h. Nachbarräumen (eventuell auch nur ein Nachbarraum zuzuordnen, ähnlich wie "zugeordnete Bauinformation" an Baueigenschaften,
      und nur freigeschaltet an Baueinheiten für "Trennbauteile", d.h. Wände/Böden
    - Bei nur einem zuordenbaren Nachbarraum wäre das neue Feld im Model:
      - nachbarRaum: { type: Schema.Types.ObjectId, ref: "BaueinheitenModel" }, // Verweis auf eine Baueinheit im Schema für Baueinheiten, die einen Nachbarraum
        darstellt (innerhalb eines Bauvorhabens eindeutig identifiziert durch die baueinheitsBezeichnungen eines Geschosses und eines Raums in dem Geschoss)
    - Der Nachbarraum eines Trennbauteils (Boden oder Wand) könnte so per QSelect zugewiesen werden (angezeigt zur Auswahl würden Geschoss-/Raum-Paare, emit-value wäre die Raum-Id des Geschoss-/Raum-Paares)
    - Die Speicherung würde allerdings so nicht im Profil-Model erfolgen, sondern an der Baueinheit (Knoten) für das Trennbauteil
    - Man könnte auch die Baueigenschaften eventuell um einen Typ ObjectId erweitern, oder man speichert die ObjectId des Nachbarraums
      als String in einem Bezeichnungswert und casted diesen auf eine ObjectId
    - ==Diese Alternative einer **Referenz zum Nachbarraum am Trennbauteil** ist insgesamt die beste in Abwägung von Nutzen und Aufwand!==
  - Noch aufwändiger und komplexer wäre die obige allgemeine Verwaltung der Nachbarschaftsbeziehungen  - allerdings
    würde diese
    vom Benutzer wohl nur für bestimmte, exemplarische Nachbarschaftssituationen ausgefüllt werden, nicht für alle Nachbarschaftsraumpaare in
    einem Gebäude.
  - Verwendung von Paket **Vue Excel Editor,** https://www.npmjs.com/package/vue-excel-editor zum Editing solcher Nachbarschaftstabellen,
    statt Quasar
    QTable? Kann auch Dropdown-Felder,
    werden dort "Select-Felder" genannt. Getestet in "Verwaltung" > "Test Area 8". Allerdings können Select-Felder dort nur für eine ganze
    Spalte einheitlich gesetzt werden
    bzw. ihrer Options (wie in Excel). Es können nicht zeilenabhängig, dynamisch uneterschiedliche Options bestimmt werden, wie es zum
    Beispiel für die Räume in einem
    Geschoss oder die Wände in einem Raum notwendig ist.
  - Daher muss die finale Implementierung wohl doch mit einer Quasar QTable erfolgen
    (ähnlich wie existierende Tables, z.B. für Baueigenschaftsprofile). Testweise wurde in baueinheiten.controller.js auch bereits eine
    API-Methode readRaumKindKnotenGeschossBaueinheit() implementiert, die alle Räume in einem Geschoss zurückliefert. Mit derselben
    Logik könnte man auch alle Wände/Böden eines Raums am API ermitteln.
  - Potentielle Alternativen:
    - https://forum.quasar-framework.org/topic/5571/q-table-with-edit-functionality-similar-to-excel/3
    - https://codesandbox.io/s/distracted-fire-d02zk
    - https://github.com/vuejs/awesome-vue#table
    - https://github.com/handsontable/handsontable/tree/master/wrappers/vue
  - ==Weitere Hinweise zur Implementierung: Siehe Tab "Verwaltung" > "Test Area 8"==

---

#### **[Epic 30]** ==**[TODO]**== (Prio 2) Erweiterter Datenaustausch (Import/Export von/nach Revit, IFC, Excel, etc.)

- Siehe auch die Evernote-Notizen von Michael:
  - ==zu **Revit**: https://www.evernote.com/l/AKS0mheZFgpPhrlN2ytmGlNDeX5R_m4WDOc/==
  - ==zu **IFC**: https://www.evernote.com/l/AKSkM9cA2btA6JEsl5visIMZnH6L2_9MrG8/==
  - In Evernote noch viele weitere Artikel zu IFC und IFC Tools!
- **Attributierung in Revit**:
  - Step 1: Definition von shared Parametern und „Bekanntmachen“ dieser shared Parameter in einem konkreten Revit-Projekt
    - Dies erfolgt mit den Parameter-Text-Files, die auch bei Bosch verwendet werden
    - Bschreibung in der Revit Doku: https://knowledge.autodesk.com/de/support/revit-products/learn-explore/caas/CloudHelp/cloudhelp/2018/DEU/Revit-Model/files/GUID-94EA2B8E-2C00-4D29-8D5A-C7C6664DE9CE-htm.html
  - Step 2: Hinzufügen von (in 1. definierten) shared Parametern zu einer konkreten Revit Family bzw. einem Objekt in einer Family in einem konkreten
    Revit-Projekt
  - Step 3: Setzen von Werten für den so hinzugefügten und einem Objekt bzw. einer Familie zugeordneten Parameter
    - Schritt 2. und 3. sind am Revit User Interface zusammen in einem Schritt manuell möglich
    - Beschreibung in der Revit Doku: https://knowledge.autodesk.com/de/support/revit-products/learn-explore/caas/CloudHelp/cloudhelp/2018/DEU/Revit-Model/files/GUID-B70B059A-66B1-4E35-A143-F9C1DB8FBA55-htm.html
    - Es können bei diesem Schritt (per Revit UI) auch Werte für den Parameter vom Benutzer gesetzt werden, ohne zusätzliche Tools
      - Geben Sie einen Wert für den gemeinsam genutzten Parameter ein, oder erstellen Sie eine Formel, durch die sein Wert definiert wird.
      - Diese kommen jedoch nicht aus obigem Text-File oder anderen Dateien, sondern müssen am User Interface vom Benutzer eingegeben werden, im
        jeweiligen konkreten Kontext im Revit-Projekt
- **Revit Downloads**
  - https://www.autodesk.de/products/revit/free-trial?plc=RVT&term=1-YEAR&support=ADVANCED&quantity=1
- **Revit Add-On Tools für Parameter-/Wertedefinition**:
  - **Auxalia**
  - **Rushforth**
  - **Tables Duo**
  - **Dynamo JSONDataPackage**:
    - https://forum.dynamobim.com/t/jsondata-package/19026
    - https://github.com/alvpickmans/JsonData/wiki - Dynamo 2.0 Dictionaries bieten ähnliche Funktionen?
    - https://github.com/alvpickmans/JsonData/wiki/Package-Content
  - **pyRevit** RAD Tool
    - Rapid Application Prototyping Environment für Revit
    - Wird wohl von Firma Gruner verwendet
    - https://www.notion.so/pyRevit-bd907d6292ed4ce997c46e84b6ef67a0
    - https://www.notion.so/Create-Your-First-Command-2509b43e28bd498fba937f5c1be7f485
    - https://www.youtube.com/watch?v=UjfwCj1yS44 - Tutorial Video, um Parameter upzudaten
    - https://forum.dynamobim.com/t/setting-shared-parameter-on-sheet-with-python/43851/3
    - https://stackoverflow.com/questions/47400255/revit-python-shell-change-parameter-group
    - https://thebuildingcoder.typepad.com/blog/2014/09/modifying-saving-and-reloading-families.html
    - https://forums.autodesk.com/t5/revit-api-forum/how-to-get-family-parameter-and-set-value/td-p/8306011
- **IFC Tools**:
  - **usBIM.viewer+**
    - https://www.accasoftware.com/de/ifc-viewer.
    - Es nennt sich zwar Viewer, ist aber ein IFC-Editor, der angeblich jedes IFC-File bearbeiten kann.
    - Tutorial, um damit Properties bzw. Custom Properties zu einem IFC—Modell hinzuzufügen: http://biblus.accasoftware.com/en/ifcpropertyset-ifc-object-properties/
    - Sniff Test durch Michael
  - **IFCOpenShell** (Python Shell für IFC)
  - Darauf aufbauend **ifcJSON**
    - https://github.com/buildingSMART/ifcJSON/tree/master/file_converters
    - Sniff Test durch Michael - ist nicht stabil
    - Beschreibung in Evernote:
      - https://www.evernote.com/shard/s164/sh/a433d700-d9bb-40e8-912c-979be2b08319/9c7e8bdbff4cac6f959fdccf5e27e2a1
      - ==Achtung: public Link!==
      - Dort sind noch weitere IFC-Informationen und IFC Tools (auch zum usBIM.viewer) beschrieben
  - ==**IFC.js**==
    - ==BIM/IFC Tookit für Javascript==
    - ==Neu, vielversprechend, für uns das Richtige!==
    - Noch in Entwicklung
    - https://ifcjs.github.io/info/
    - https://discord.com/channels/799990228336115742/799990228336115745
  - **BIMData.io**
    - Besteht aus IFC Viewer und API
    - Modelle werden auf Cloud Server gehosted
    - https://developers.bimdata.io/
    - Vue Integration: https://www.npmjs.com/package/@bimdata/viewer
  - **XEOKit BIM Viewer**
    - Viewer für IFC Models im Browser
    - https://www.npmjs.com/package/@xeokit/xeokit-bim-viewer
    - Teil von https://www.openproject.org/openproject-bim-10-4/
    - IFC Modelle werden mit OSS Command Line Tools zuerst pre-converted/komprimiert in das XEOKit native XKT Format!
      - https://www.notion.so/Viewing-an-IFC-Model-with-xeokit-c373e48bc4094ff5b6e5c5700ff580ee
  - Weitere IFC Tools unter folgenden Links:
    - https://www.evernote.com/l/AKSkM9cA2btA6JEsl5visIMZnH6L2_9MrG8/
    - https://www.ifcwiki.org/index.php/Freeware
- Erzeugung von bereits in BTKBuilder erzeugten **Excel-Dokumenten** (Bauteilkataloge etc.)
  - Siehe dazu die von Stefan aus BTKBuilder extrahierten Excel-Vorlagen
  - Bereits begonnen mit NPM Paket ExcelJS, z.B. in baueinheiten.controller.js: exportBaueigenschaftsProfilFormulareAnBaueinheit()
- Konvertierung von **XML** nach **JS bzw. JSON**
  - Z.B. für XBAU-XML-Format, welches im digitalen Bauantrag verwendet wird
    - https://bim-bauantrag.blogs.ruhr-uni-bochum.de/projektergebnisse/
    - Dort "Beispiel Bauantrag" Containerdatei mit .xbau-Datei
  - Beliebter NPM Converter für XML nach JS
    - https://www.npmjs.com/package/xml2js
    - Das JS-Result kann mit JSON.stringify(result) nach JSON verwandelt werden
    - Test-Modul dafür in bim-click-back-end\app\modules\convert-xml-to-json.js
  - Übersicht über solche Converter
    - https://stackoverflow.com/questions/1773550/convert-xml-to-json-and-back-using-javascript

---

#### **[Epic 31]** ==**[TODO]**== (Prio 3) Verbesserte Validation am User Interface und Backend

- Für Tageszeiten
  - In der DIN 18599 kommen auch Tageszeiten vor! (Time of Day, z.B. 08:00)
  - Im Schallschutz wird häufig mit Tageszeiten operiert
  - Dies erfordert eine Erweiterung der von BIM.click unterstützten Datentypen
  - TBD, ob diese auch mit Mongoose Typ Date (=UTC, wird für Datumswerte verwendet) gespeichert werden sollen, es müsste dann daraus wie bei den Dates der Uhrzeit-Teil extrahiert werden
  - Das Datenmodell müsste dafür auf jeden Fall erweitert werden (tagesZeittWert1, tagesZeitWert2)
  - Alternativ könnte man auch mit Quasar Mitteln am Client einfach HH:mm abfragen z.B. mit Mask und diesen Wert als String abspeichern!
  - Mongoose-seitige Speicherung dieser TIme of Day:
    1. Unter Verwendung des Mongoose Datentyps Date (wie für die Datumswerte)
       - Getestet - In einem JS oder JSON Objekt zur Speicherung (in server.js getestet) kann man damit nicht einfach "08:00" angeben, sondern muss ein fiktives Jahr voranstellen, z.B. tagesZeitWert1: "0001-01-01 08:00"
       - Ein so in JS mit tagesZeitWert1: "0001-01-01 08:00" definiertes Feld wird dabei, wie Compass zeigt, in MongoDB angelegt als: 2001-01-01T07:00:00.000+00:00 - d.h. das fiktive Jahr wird, warum auch immer, auf 2001 konvertiert, und die Zeit wird in UTC (07:00 statt 08:00) umgerechnet - wenn man Berechnungen damit machen will, muss man es also meistens erst einmal wieder in die normale Zeit zurückverwandeln
       - Noch merkwürdiger: Ein JS Objekt mit tagesZeitWert1: "1200-01-01 08:00" wird in MongoDB angelegt als 1200-01-01T07:06:32.000+00:00 - warum auch immer, erscheint wie ein Bug!
       - Der Datentyp Date errscheint also ziemlich unbrauchbar für Tageszeiten wegen des erforderlichen Jahrs in JS bzw. JSON Objekten beim Import/Export,, wegen der Notwendigkeit zur Umrechnung der Zeitzone, und wegen des Bugs
    2. Besser: Speicherung als String im 24-Stunden-Format ("1800")
       - Wird hier empfohlen als Option 2: https://stackoverflow.com/questions/20473765/best-way-to-store-time-of-day-in-mongoose?noredirect=1&lq=1
       - Option 1 wäre Speicherung in Sekunden nach Mitternacht
       - Beides kann leicht ineinander umgerechnet werden
       - Sample Code für die Umrechnung: https://stackoverflow.com/questions/15780415/how-can-i-store-time-of-day-in-mongodb-as-a-string-give-arbitrary-year-month-d
       - Siehe auch https://stackoverflow.com/questions/7357734/how-do-i-get-the-time-of-day-in-javascript-node-js
       - Wird hier ebenfalls empfohlen: https://stackoverflow.com/questions/50233544/how-to-store-user-defineddynamic-date-time-in-mongodb-using-mongoose
       - Diese Option am Backend eingebaut mit Format "18:00"
- TBD: Benutzung von Validation Packages, z.B. Vuelidate?
  - https://jasonwatmore.com/post/2019/02/27/vuejs-vuelidate-form-validation-example
  - https://jasonwatmore.com/post/2018/08/01/vuejs-veevalidate-form-validation-example
- Alternativ zu den obigen Vue Validation Packages hat Quasar auch schon"internen" Validation Support
  - https://quasar.dev/vue-components/input#Validation - QInput Rules Prop
    - Z.B. :rules="[val => !!val || 'Field is required']"
    - Z.B. :rules="[ val => val !== null && val !== '' || 'Please type your age', val => val > 0 && val < 100 || 'Please type a real age' ]"
  - Dabei insbesondere interessant: Form Validation
    - Siehe Beispiel auf https://quasar.dev/vue-components/input#Validation - dort allerdings mit HTML <form>
      - Dort Prevent Stop Methode im Skript-Teil, die den Submit Button erst freigibt, wenn alle Felder validiert sind!
      - Diese arbeitet auf den Input-Feldern, die per \$refs im Template identifiziert werden
    - Mit QForm: https://quasar.dev/vue-components/form#Usage
      - Dort mit Submit-Button
        ```html
        <q-btn type="submit"> <q-form @submit="onSubmit"> </q-form></q-btn>
        ```
        mit Methode onSubmit, die offenbar erst gerufen wird, wenn alle Validierungen erfolgreich sind!!!
      - Damit wird gesteuert, dass erst nach erfolgreicher Validierung aller Felder die weiteren Aktionen im Submit ausgeführt werden!
      - Es ist auch ein manueller Aufruf der Validation aus einer Methode möglich über ein ref am QForm:
        - ```html
          <q-form ref="myForm"></q-form>
          ```
        - In Methode: this.\$refs.myForm.validate.then(sucess => {} if (success) {} else {}
        - Man kann auch this.\$refs.vModelFieldName.hasError abfragen, sieh Forum Link unten
        - Das könnte man z.B. in der Methode an einem manuellen Submit-Button (wie in BIM.click Dialogen) aufrufen, siehe letzter Post in dem Forum-Beitrag unten!
      - ACHTUNG: Erste Tests deuten darauf hin, dass auf jeden Fall ein QForm benötigt wird, an einem QDialog funktionierte es erst mal nicht!!!
    - Siehe auch https://forum.quasar-framework.org/topic/4026/solved-validate-whole-form-with-one-function/2
  - Viel einfacher als Vuelidate: https://forum.quasar-framework.org/topic/3438/form-validation/3
  - Zusätzlich gibt es am QInput die Mask Prop:
    - https://quasar.dev/vue-components/input#Mask
    - ==**Achtung**==: Nicht für Kennwerte geeignet, nur für Bezeichnungswerte!
  - Zusätzlich gibt es format mit Quasar Date Utils:
    - https://quasar.dev/quasar-utils/date-utils
    - import { date } from ‘quasar’
    - format: val => date.formatDate(val, ‘DD-MM-YYYY’) (\*)
    - format: val => parseFloat(val).toLocaleString(‘pt-br’, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    - Für die Uhrzeit müsste dieses funktionieren: format: val => date.formatDate(val, ‘HH:mm) (\*)
    - Kann für Output-Felder (z.B. in QTables) nützlich sein! Bereits eingebaut in Baustoffe und Bauinformationen!
- Speziell ist in BIM.click Validation für die Datumsfelder notwendig
  - Dafür kann auch Quasar Date Picker (QDate) genommen werden
    - https://quasar.dev/vue-components/date,
    - v-model ist String!
    - QDate Einsatz zusammen mit QInput: https://quasar.dev/vue-components/date#Example--QDate-and-QTime-with-QInput
    - Dort ist aktuell mask="YYYY-MM-DD" am q-date bzw. mask=####-##-##" am q-input notwendig, da das Date im Mongoose Format aus der Datenbank kommt und dann am Client mit formatDate in dieses Format umgewandelt wird
    - Mongoose Format (nach Cast von BSON auf JS Date): "2000-01-01T00:00:00.000Z" - siehe https://stackoverflow.com/questions/30499502/mongoose-how-to-set-date-format-in-model
    - (Das Abspeichern von Datumsfeldern funktionert aber aktuell auch bei normaler Texteingabe in die entsprechenden QInput-Felder nicht - es werden leere Strings abgespeichert, wie man im Server Log sieht!
      - Aktuell wird in Baustoffe.vue in der Funktion updateBaustoffEigenschaft1219 aufgerufen:
        - http://localhost:8080/API/Baustoffe/UpdateMaterialEigenschaft - diese ruft per routes updateMaterialEigenschaft1219 im Controller auf
        - Das ist die neue Funktion - diese läuft bis "Wertänderung" - dann keine Log Messages mehr, ob Update erfolgreich ist
      - Diesen Fehler wurde von Stefan gefixed am 27.12.2019)
    - https://stackoverflow.com/questions/53932266/how-to-convert-date-format-in-nodejs-using-mongoose
      - Empfiehlt Moment.js zur Date-Formatierung am Server und im Client
      - moment(new Date(date)).format('YYYY-MM-DD');
      - Kann eventuell in Mongoose schema.post für "find" eingebaut werden
      - Sonst müsste es in allen Mongoose Find-Aufrufen eingebaut werden
    - Laut https://quasar.dev/quasar-utils/date-utils erfordert Moment.js anscheinend viel Speicher!!!
      - Am Backend wird gemäß package.json Moment.js schon verwendet!
      - Am Frontend eventuell Moment.js vermeiden zugunsten Quasar Date Utils!!!
    - Man könnte dann auch das Date im originalen Mongoose Format an den Client schicken und dieses auch in den Input Feldern für Datumswerte mit den Quasar Date Utils in das richtige Format umwandeln - dies wurde unten implementiert
      - Vor Speicherung müsste es wahrscheinlich zurückverwandelt werden in das von Mongoose erwartete UTC-Format - dies stellte sich unten als überflüssig heraus, da Mongoose Strings im Format "YYYY-MM-DD" akzeptiert und in UTC umwandelt!!
      - Dies geht eventuell mit dem JavaScript Date Constructor:
        - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
        - Z.B.: const date2 = new Date('1995-12-17T03:24:00');
      - Eine potentielle "Rückverwandlung" eines mit Quasar Date Utils für die Anzeige im Frontend nach TT.MM.JJJ formatierten Mongoose Dates (mit Funktion formatDate in Baustoffe.vue) in das für Mongoose notwendige UTC-Format (ohne den Time-Teil am Ende) könnte dann so funktionieren:
        - const quasarDateDDMMYYY = "01.12.2020" // Format DD.MM.YYYY, wird am Frontend verwendet, wird mit Funktion formatDate aus Mongoose UTC-Date erzeugt
        - const quasarDateYYYYMMDD = date.formatDate (quasarDateDDMMYYYY, "YYYY-MM-DD") // Reformatting in Mongoose Format mit Quasar Date Utils
        - Eventuell muss danach noch obiger JS Date Constructor aufgerufen werden:
          - const dateUTCForMongoose = new Date(quasarDateYYYYMMDD); // JS Date Constructor, siehe obiger Link
      - Dieses könnte z.B. in den Axios-Methoden erfolgen, die dann für Mongoose geeignete Date Strings an das Backend zurückgeben
  - Alternative zu QDate: Neuerdings gibt es für Quasar q-input Felder einen type="date"
    - Dieser zieht einen Date Picker aus dem Browser an (getestet nur für Chrome)
    - Dazu Quasar Upgrade durchgeführt mit quasar upgrade -i
      - @quasar/extras: 1.3.2 → 1.3.3
      - quasar: 1.1.7 → 1.5.11
      - @quasar/app: 1.1.4 → 1.4.3
    - Es stellte sich heraus, dass Quasar für q-input-Felder mit type="date" einfache String-Werte im Format "YYYY-MM-DD" erwartet - diese im Code von Baustoffe.vue in ausgewaehlterBaueigenschaft.datumsWert1/2 bzw. neueBaueigenschaft.datumsWert1/2 aus den UTC-Werten von Mongoose mittels Quasar Date Util erzeugt beim ersten Laden und beim Neu-Laden nach Update aus der Datenbank
    - Im originalen Array mit diesen Werten für die QTable der Materialeigenschaften bleiben diese Datumswerte also nach wie vor im Mongoose UTC-Format und werden mit einer Funktion formatDate unter Nutzung von Quasar Date Utils in das Anzeigeformat in der QTable "DD.MM.YYYY" umformatiert!
    - Vor dem Speichern ist keine Rückverwandlung notwendig, da Mongoose Strings im Format "YYYY-MM-DD" akzeptiert und in UTC umwandelt!!
    - Damit funktionierte es dann!
    - Date Picker QDate von Quasar bisher nur testweise verwendet in Baustoffe.vue
- Quasar q-input Property type="number" benutzt für Kennwerte

---

#### **[Epic 32]** ==**[WORK]**== (Prio 3) Auswertungen/Berichte (Reports)

- Es sollen **Bauteilkataloge** (primär im Excel-Format) und **Planungsgutachten** (primär im Word-Format) aus den in BIM.click
  angelegten Projekten erzeugt werden
  - In diese gehen sowohl projektbezogene Planungsinformationen aus dem Bauvorhabenbaum als auch baustoffbezogene fachliche Daten
    aus dem Baustoffbaum ein (z.B. durch in Baueinheiten zugeordneten Baustoffen)
- Historischer Hinweis: Suche dazu das Stichwort "computed" in der BIM.click Projektkonzeption (Word-Dokument auf OneDrive)
- NPM Paket excelJs zur Generierung von Excel-Formaten
  - https://www.npmjs.com/package/exceljs
  - Tutorial für Excel File Creation und Download per API: https://bezkoder.com/node-js-download-excel-file/
  - https://stackoverflow.com/questions/38189089/how-to-download-created-excel-file-in-node-js-using-exceljs
  - https://stackoverflow.com/questions/59470609/export-excel-file-using-exceljs-to-client
  - Beispiel für Bauteildatenblätter (Excel) von BTKBuilder in file:///C:\Users\BIMIive\Documents\Themen\BIM.live\Kurz%20&%20Fischer%20-%20BIM.click\BTKBuilder\Beispielausgabe%20BTKBuilder\Test_20180816_Fassade\Dokumente\BDF_20180815_113900 (Schichtaufbau)
  - Sample Code für Cloning eines Worksheets (Tabs) als Template für ein neues Worksheet:
    ```javascript
    let sheetToClone = workbook.getWorksheet("ID TO CLONE");
    let cloneSheet = workbook.addWorksheet("Sheet");
    cloneSheet.model = sheetToClone.model;
    cloneSheet.name = "THE REAL ID/NAME YOU WANT FOR THIS SHEET";
    //DO STUFF HERE
    return workbook.xlsx.writeFile("your_file");
    ```
  - Man kann dann auch ganze Excel-Vorlagen als Dateien (Workbooks) am Server vorhalten (in tmp/download/)
  - Diese können dann vorausgefüllte Worksheets enthalten
  - Statt dann im Code nur ein neues Workbook anzulegen, muss man im Code anschließend dieses Template File in das Workbook einlesen:
    - D.h. wie bisher: let workbook = new excelJS.Workbook(); // Neues Workbook mit ExcelJS erzeugen
    - Danach folgende Zeile einfügen: await workbook.xlsx.readFile(filename); // Template File einlesen in das Workbook
    - Siehe https://www.npmjs.com/package/exceljs#reading-xlsx
  - Im Template File können dann bestimmte Felder und Formatierungen schon voreingestellt werden und müssten so nicht einzeln per
    ExcelJS-Code erzeugt werden
  - Nach der Bearbeitung mit ExcelJS kann man das Workbook unter einem anderem File-Namen abspeichern (writeFile, selber Code wie bisher)
  - Dieses Pattern bereits testweise implementiert in baueinheiten.controller, exportBauteilKatalogAnBaueinheit()
  - Eventuell könnte man mit ExcelJS auch Excel-Felder befüllen, die dann per Formel aus anderen Feldern benutzt werden
  - So kann man auch alle Baueigenschaften mit ihren Werten in ein Tab ausgeben und auf diese z.B. von anderen Tabs
    aus per Excel-Verweisen zugreifen - prototypisch implementiert in exportBauteilKatalogAnBaueinheit()
  - Tutorial, wie JS Array of Objects per ExcelJS nach Excel "gedumped" wird:
    https://www.brcline.com/blog/how-to-write-an-excel-file-in-nodejs
  - ExcelJS benutzt für Color Codes teilweise das Android Format (color: {argb: "#FFFFFFFF"}), welches 8 Hex Characters hat.
    - Die ersten 2 Stellen geben die Opacity an
    - Siehe https://stackoverflow.com/questions/36861595/colors-code-in-android-are-different
    - Ansonsten: https://htmlcolorcodes.com/
    - Siehe auch: https://quasar.dev/quasar-utils/color-utils
    - Ausgabe des Hex Color Codes für Quasar Colors: https://quasar.dev/quasar-utils/color-utils#helper-getpalettecolor
  - ==**Update 25.11.2021**==
    - Für gewisse Reports, speziell für Druckausgaben (die allerdings auch über Excel erfolgen sollen) werden von Administratoren oder Benutzern konfigurierbare **Ausgabetexte** an Baueinheiten oder Feldern benötigt, die in die Reports eingebettet werden sollten
    - An Baueinheiten können dazu die vorhandenen Felder "Bemerkung für die Baueinheit" und "Beschreibung für die Baueinheit" (Markdown) verwendet werden. Zusätzlich gibt es das Feld "anzeigeText", das allerdings für die Bildschirmausgabe konzipiert ist.
    - An Baustoffen gibt es ebenfalls diese Felder, allerdings gab es ursprünglich keinen Anzeigetext. Hier ist zu überlegen, ob man zusätzlich ein Feld
      "baustoffAusgabeText" für Druckausgaben benötigt, ebenso dessen Format (Text, Markdown, Rich Text?). Dieses eingebaut im Rahmen
      von #381, zunächst als normales String-Feld.
    - An bestimmten noch zu definierenden Baueigenschaften, insbesondere an Kennwerten, könnte dazu die vorhandenen Felder "bezeichnung1" und "bezeichnung2" genutzt werden
      - Diese müssten in den passenden Masken als zusätzliche Eingabefelder exposed werden
      - Allerdings könnte dies auch für Aufzählungswerte erforderlich werden, wo es dann allerdings individuelle Werte pro Option geben sollte
      - Beispiel: Art des Denkmalschutzes an einem Gebäude
      - Dies könnte man natürlich auch hart kodieren in der Druckausgabe-Funktion
  - ==**Update 20.01.2022**==
    - Links zu NPM basierter **Report Generation**:
      - ==Interessanter Artikel zu **PDF Generierung auf Node**:== https://buttercms.com/blog/generating-pdfs-with-node
      - **fluentReports**: https://www.npmjs.com/package/fluentreports - PDF Reports aus JSON oder per GUI
        - Completely Data Driven. You pass in the data; you tell it easily how to print the data, and it generates the PDF report
        - https://fluentreports.com/ - Demo und Dokumentation
        - https://fluentreports.com/docs.html - Es können Header pro Dokument, Seite und für beliebige Gruppen von Objekten eingefügt werden, allerdings gibt es keine Header-Hierarchie wie bei Word
        - Da PDF erzeugt wird, ist eine Nachbearbeitung ohne PDF Editor unmöglich
        - Es können auch existierende PDFs eingebettet werden, allerdings kein Template Support, womit Daten in Platzhalter im
          Template eingefügt werden können
      - https://javascript.plainenglish.io/lets-generate-a-pdf-from-a-markdown-file-using-nodejs-and-javascript-224478b30d6b - Markdown nach PDF
      - ==**docxTemplater**==: https://www.npmjs.com/package/docxtemplater - Generiert docx/pptx aus Template Files mit Platzhaltern
        - Die Template Files enthalten per Moustache Tags ("{...}") gekennzeichnete Placeholder, die mit Werten aus Javascript-Objekten befüllt werden während des Renderns:
          - {last_name} {first_name}
          - doc.render({first_name: "John",last_name: "Doe"});
        - Ohne das HTML Module sehr mühsame Textformatierung mit inline raw XML:
          - https://docxtemplater.com/demo/#word-run - "r@" vor dem eigentlichen Feldnamen (d.h. z.B. "{r@description1}") für solche Formatierung, benötigt paid Word-Run Module!
        - Paid Modules für Erweiterungen
          - https://docxtemplater.com/pricing/
          - z.B. Einbettung von HTML, etc.
          - https://docxtemplater.com/modules/html/ - HTML Module, unterstützt HTML Tags wie z.B.
            ```html
            <b
              >,
              <p>,</p>
              <h1>
                ,
                <h2>, ...</h2>
              </h1></b
            >
            ```
          - z.B. Styling per Tags: https://docxtemplater.com/modules/styling/
        - Customized Headings: https://docxtemplater.com/modules/html/#customize-docx-styles-with-classes - nur mit paid HTML Module
        - https://docxtemplater.com/docs/faq/#convert-to-pdf - PDF Generierung muss außerhalb stattfinden
        - Vermutlich muss ein Inhaltsverzeichnis nachgelagert in Word erzeugt werden!
      - Office Document Generator basierend auf **Open XML** Format (docx, pptx, xlsx, ...)
        - https://github.com/Ziv-Barber/officegen/blob/87dd5501968501555ea3bee60043affc9f67c1fa/manual/docx/README.md - Doku für Word
          - Kann vermutlich keine Dokumente bzw. Templates öffnen, nur neue von Scratch schreiben

---

#### **[Epic 33]** ==**[TODO]**== (Prio 3) Vervollständigung Hilfe und Dokumentation

- Siehe Inhaltsverzeichnis Dokumentation (Icon links oben)
- Die fehlenden und unvollständigen Abschnitte füllen mit Inhalten (Markdown-Format)

---

#### **[Epic 34]** ==**[TODO]**== (Prio 3) Undo/Redo von Benutzeraktionen

- Vuex Package dafür: https://www.npmjs.com/package/vuex-history
- Siehe Beispiele dort - erfordert wohl, alle Daten in Vuex zu halten
- https://stackoverflow.com/questions/42878329/going-back-to-states-like-undo-redo-on-vue-js-vuex
- State darf dabei nicht zu groß sein, vor allem wenn Snapshots (Zwischenstände) für Undo/Redo saved werden sollen
  - Der gesamte Baustoffbaum ist eventuell zu groß? - Siehe oben (State Management) - Wie verträgt sich das mit Lazy Loading? - Dieses müsste wahrscheinlich in den Store erfolgen! D.h. die Quasar onLazy Methode müsste zuerst vom Backend in den Store laden, und dann von dort in den Tree - Bei Updates würde zunächst der Store updated, und später von dort das Backend - Änderungen müssten entsprechend markiert werden oder der gesamte bisher lazy geloadete Teil des Baum würde gesaved werden - Speichern würde eventuell verzögert erfolgen, nicht sofort bei Änderungen
- https://stackoverflow.com/questions/52815876/how-to-deep-clone-the-state-and-roll-back-in-vuex?noredirect=1&lq=1
- https://vuejsdevelopers.com/2017/11/13/vue-js-vuex-undo-redo/
- Siehe folgende Patterns: - https://refactoring.guru/design-patterns/command - https://refactoring.guru/design-patterns/memento

---

#### **[Epic 35]** ==**[TODO]**== (Prio 3) Potentielle Erweiterungen für den Wertetyp von Baueigenschaften im Hinblick auf den Datenaustausch per IFC

- In Anlehnung an die von IFC Release 2x unterstützten sogenannten **Properties:**
  - https://en.wikipedia.org/wiki/Industry_Foundation_Classes
  - https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcsimpleproperty.htm - wurde in IFC 2x umbenannt nach IfcPropertySingleValue
  - https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcpropertysinglevalue.htm
- **IFC Property Definitions**
  - ==**Hinweis**==: Eine gute Einführung in IFC Properties findet sich im Whitepaper von Acca Software:
    - https://biblus.accasoftware.com/en/ifc-file-all-you-need-to-know/?utm_source=14096&utm_medium=ifc-white-paper&utm_campaign=mail-acca-en
    - https://s3-eu-west-1.amazonaws.com/acca.biblus.downloads/International/IFC/IFC-file_Whitepaper_ENG.pdf
  - **ifcPropertyDefinition** captures dynamically extensible ==**property sets**==. A property set contains one or more **properties**
  - **Properties**
    - A **simple property (IFCSimpleProperty)** may be
      - a **single value** (e.g. string, number, unit measurement) **(IfcPropertySingleValue)** - ==ist direkt unterstützt in BIM.click durch die Wertetypen
        Kennwerte, Bezeichnungswerte, Datumswerte, Tageszeitwerte, Wahrheitswerte in BIM.click==
        - https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcpropertysinglevalue.htm
      - a **bounded value** (having minimum and maximum) **(IfcPropertyBoundedValue)** - ==dies erfordert eventuell eine Erweiterung der bisherigen Kennwertepaare in BIM.click auf dreiwertige Kennwerte, bzw. die Verlagerung der Boundaries in die typbezogenen Angaben und die Aufnahme des tatsächlichen Werts in die wertbezogenen Angaben==
        - https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcpropertyboundedvalue.htm
      - an **enumeration** **(IfcPropertyEnumeratedValue)** - ==ist direkt unterstützt durch Aufzählungswerte in BIM.click==
        - https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcpropertyenumeratedvalue.htm
      - a **list of values** **(IfcPropertyListValue)** - "aggregierter" Datentyp, bisher nicht unterstützt
        - https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcpropertylistvalue.htm
      - a **table of values** **(IfcPropertyTableValue)** - "aggregierter" Datentyp, bisher nicht unterstützt
        - https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcpropertytablevalue.htm
      - or a **data structure** **(IfcPropertyReferenceValue)** - "aggregierter" Datentyp, bisher nicht unterstützt
        - https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcpropertyreferencevalue.htm
    - A **complex property (IFCComplexProperty)** is used to define complex properties to be handled completely within a property set. The included list may be a
      mixed or consistent collection of IfcProperty subtypes. This enables the definition of a list of properties to be included as a single 'property' entry in a
      property set. The definition of such a list can be reused in many different property sets, but the instantiation of such a complex property shall only be used
      within a single property set.
- ==**Hinweise**==
  - Da IFC vor allem für den ==**Export**== von BIM.click in andere Tools (z.B. Revit) in Frage kommt, ist es unproblematisch, dass die in BIM.click aktuell
    implementierten Wertetypen für Baueigenschaften eine ==**Untermenge**== der von IFC unterstützten Properties sind
  - Die nicht direkt in BIM.click unterstützten, oben als "aggregiert" bezeichneten Datentypen müssen nicht unbedingt in einer ersten Ausbaustufe intern in
    BIM.click unterstützt werden. Sie können  
    auch erst beim Export bzw. Import erzeugt bzw. konvertiert werden, aus dem jeweiligen Kontext heraus (d.h. dem betreffenden Zweig mit Baueinheiten im
    Bauvorhabenbaum)
    - Beispiel:
      - Baueigenschaft (z.B. "Dicke" oder beliebige andere Baueigenschaft), jeweils definiert an n Baueinheiten (z.B. "Schicht 1", "Schicht 2", ..., "Schicht n"
        an einer Baueinheit (z.B. "Decke")
      - Beim IFC-Export aus BIM.click erzeugt BIM.click daraus dynamisch einen aggregierten IFC-Property-Typ, der die n einzelnen Baueigenschaften zu einem
        passenden Datentyp (z.B. IfcPropertyListValue) aggregiert
    - Es wäre auch möglich, beim Export aus BIM.click alle Baueigenschaften eines bestimmten **Baueigenschaftsprofils** zu exportieren, und für diese beim Export
      einen "aggregierten" IFC-Property-Typ zu erzeugen, der genau die dem Baueigenschaftsprofil zugeordneten Baueigenschaften (mit Werten) enthält
  - Alternativ können auch die **IFC Property Sets** selbst andere (einfache, aggregierte, oder komplexe (?) Properties ==**referenzieren**== (siehe dazu das Beispiel unten)
- While IFC defines several hundred property sets for specific types, **custom property sets** may be defined by application vendors or end users
  - **IfcPropertySet** represents a set of properties attached to an object occurrence or object type
  - **IfcPropertySetTemplate** [IFC2x4] captures definitions of properties and their data types
  - Definition von **ifcPropertySet**: https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifckernel/lexical/ifcpropertyset.htm
    - The IfcPropertySet defines all dynamically extensible properties. The property set is a container class that holds properties within a property tree. These
      properties are interpreted according to their name attribute.
    - The naming convention ==**"Pset_Xxx"**== applies to those property sets and shall be used as the value to the Name attribute.
- Beispiel für ein **ifcPropertySet**
  - Aus KIT-Simple-Road-Test.ifc Sample
    - http://www.ifcwiki.org/index.php?title=KIT_IFC_Examples
  - **IfcPropertySet**, referenziert 2 andere Entitäten vom Typ **IfcPropertySingleValue**
    - Siehe https://standards.buildingsmart.org/IFC/RELEASE/IFC2x3/TC1/HTML/ifcpropertyresource/lexical/ifcpropertysinglevalue.htm
    - #323 = IFCPROPERTYSET('0ypZyhqfn0Z9HaToPRzJW4', #2, 'SU_InstanceSet', \$, (#324, #325));
      - '0ypZyhqfn0Z9HaToPRzJW4' - globalID
      - #2 - OwnerHistory
      - 'SU_InstanceSet' - Name der Entität - spezifiziert den Typ der Property Set Definition - es können dann in einer IFC-Datei mehrere solche IFCPROPERTYSETs
        von diesem Property Set Typ vorkommen, mit unterschiedlichen globalIDs!
      - \$ - Description (leer)
      - (#324, #325) - HasProperties - Verweise auf Entitäten vom Typ IFCPROPERTYSINGLEVALUE unten
    - #324 = IFCPROPERTYSINGLEVALUE('Owner', $, IFCLABEL(''), $);
      - 'Owner' - Name der Entität
      - \$ - Nominal Value (leer)
      - IFCLABEL("') - Type
      - \$ - Unit (leer)
    - #325 = IFCPROPERTYSINGLEVALUE('Status', $, IFCLABEL(''), $);
      - 'Status' - Name der Entität
      - \$ - Nominal Value (leer)
      - IFCLABEL("') - Type
      - \$ - Unit (leer)
- Hinweise zu den ==**GlobalIds**==
  - Siehe https://blenderbim.org/ifcglobalid.html
  - https://knowledge.safe.com/questions/86724/generate-ifcglobaluniqueid.html
    - An IFC global id is just a UUID which has been base64 encoded, with the following modifications:
      - There are no padding characters at the end. A UUID will always have two padding characters when base64 encoded, so they must be removed
      - The base64 encoding uses non-standard characters for the 62nd and 63rd characters: "\_\$" instead of "+/"
    - This is quite easy to do using python:
      ```
      import base64
      import uuid
      def processFeature(feature):
          id = base64.b64encode(uuid.uuid4().bytes,b"_$").decode("utf-8")[:-2]
          feature.setAttribute("global_id",id)
      ```
  - NPM Package für UUID Generierung in Javascript: https://www.npmjs.com/package/uuid
- In obigem Beispiel ist noch unklar, wie genau das Property Set an ein bestimmtes Zielobjekt/-element im Modell gebunden/attached wird
  - Gemäß https://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/HTML/schema/ifckernel/lexical/ifcpropertyset.htm gibt es Referenzen in den Objekten auf die Property
    Sets
    - Those property set definitions are references in the semantic definition section of the individal subtypes of IfcObjectDefinition.
  - Siehe auch http://docs.buildingsmartalliance.org/IFC4x2_Bridge/schema/ifckernel/lexical/ifcobject.htm
    - isDefinedBy: Set of relationships to property set definitions attached to this object. Those statically or dynamically defined properties contain alphanumeric information content that further defines the object.
  - Google Suche nach "IFC attach property set" ergibt viele Treffer, die meist spezifisch sind für das jeweilige Zielwerkzeug (z.B. Revit)
- ==**Hinweis**==: Zusätzliche, neue Wertetypen für BIM.click Baueigenschaften könnten auch unter Nutzung des Mongoose Schema Types
  "Mixed" definiert werden! Dieser erlaubt die Speicherung beliebiger JS-Strukturen (Arrays, Objekte). Allerdings muss man
  beim model.save() vorher ein model.markModified() aufrufen, siehe https://stackoverflow.com/questions/31154258/how-to-update-mixed-type-field-in-mongoose-without-overwriting-the-current-data. In "Einstellungen" > "Testfunktionen" auch
  Test-Code implementiert, welcher ein JSON-Objekt per JSON.stringify in einem String-Feld speichert und dies per JSON.parse ausliest - damit könnten hilfsweise auch JSON-Objekte in Bezeichnungswerten abgespeichert werden, solange es keinen Wertetyp "mixed" gibt.

---

#### **[Epic 36]** ==**[WORK]**== ==**Digitalisierungsplan für die Automatisierung von Regelwerken im Bauwesen (Ideensammlung für die Förderung im "Digital jetzt"-Antrag an das BMWi)**==

**Hinweise**:

- Dies strukturiert das komplexe Thema in klar definierte 5 Stufen, formuliert das Ziel pro Stufe,
  und enthält in jeder Stufe (noch zu validierende) exemplarische fachliche Beispiele, was dort konkret implementiert werden
  soll.
- Realistisch können wir im Zeitraum von ca. 12 Monaten Teile der Stufen 1, 2, 3 und 4 umsetzen, bei 5 wird es dann sehr
  anspruchsvoll.
- Für Stufe 1, 2, 3 und 4 haben wir die technischen Voraussetzungen in BIM.click bereits heute geschaffen und haben in den
  meisten Fällen schon diskutiert, wie wir es umsetzen wollen.
- Eventuell könnte man auch die Stufe 3 und 4 zu einer Stufe zusammenfassen, da sie inhaltlich und technisch überlappen.

::: info Digitalisierungsstufenplan für die Automatisierung von Regelwerken im Bauwesen

- **Stufe 1 - "Rule Filtering"**
  - Hinweis: Als „Rule“ wird hier ein Regelwerk bezeichnet
  - Ziel: Automatisierte Bestimmung der anwendbaren/gültigen Regelwerke (Gesetze, Verordnungen, Normen) in Abhängigkeit von Standort-, Gebäude- und weiteren
    Bauwerksinformationen
  - Beispiel: Zuordnung der regional gültigen Regelwerke (z.B. LBO, Bebauungspläne, etc.) zur digitalen Repräsentation eines Gebäudes auf Grund von Standortinformationen
  - Beispiel: Auswahl eines Nachhaltigkeitsprofils für einen bestimmten Gebäudetyp durch den Anwender, dabei Zuordnung eines Nachhaltigkeitssteckbriefes zur
    digitalen Repräsentation des Gebäudes
  - Beispiel: Ermittlung der geltenden Umweltauflagen (z.B. PVC-Verbot) in Abhängigkeit von Standortinformationen
  - Hinweis: In dieser Stufe werden Regelwerke noch als "black Boxes", d.h. als digitale Dokumente verarbeitet und nicht weiter unterstrukturiert
  - ==**Stand April 2021**==: Bei Auswahl eines Nachhaltigkeitsprofils im Tab "Gebäude" > "Nutzung" könnte man jeweils ine
    nachhaltigkeitsprofilspezifisches Bauinformationsprofil aktivieren - dann werden dem Gebäude die jeweils passenden
    Dokumente mit Anforderungen dieses Nachhaltigkeitsprofils dem Gebäude als Bauinformationen zugeordnet. Die dem Gebäude zugeordneten
    Bauinformationen werden im Tab "Zugeordnete Bauinformationen" angezeigt und können dort ggf. einzeln eingesehen werden. Entsprechende Bauinformationsprofile und
    sind in den Stammdaten noch anzulegen und die passenden Dokumente nach Heroku hochzuladen und den Profilen zuzuordnen. Die Funktionen dafür sind alle vorhanden.
- **Stufe 2 - "Rule Based Properties"**
  - Ziel: Automatisierte Bestimmung der detaillierten technischen Anforderungen für eine Baueinheit (z.B. einen Raum) mit Vorgabewerten auf Grund der Auswahl eines Nutzungsanforderungsprofils, welches die nächste Stufe der Digitalisierung eines Regelwerks darstellt
  - Beispiel: Aktivierung der Attribute für ein Raumprofil für Büro- oder andere Räume auf Basis der erweiterten DIN 18599
  - Hinweis: In dieser Stufe werden Regelwerke bereits digital strukturiert, d.h. ihre einzelnen technischen Kenngrößen werden im System digital verarbeitet
  - ==**Stand April 2021**==: Auswahl und Aktivierung eines raumspezifischen Nutzungsprofils im Tab "Raum" > "Nutzung",
    dabei Eintragung von Vorgabewerten aus dem raumspezifischen Nutzungsprofil in Baueigenschaften des Raums. Entsprechende raumspezifische Baueigenschaftsprofile
    sind in den Stammdaten noch anzulegen und die passenden Vorgabewerte den Baueigenschaften in diesen Profilen zuzuordnen. Die Funktionen dafür sind alle vorhanden.
- **Stufe 3 - "Virtual Assistants"**
  - Ziel: Automatisierte Selektion der bestimmte technische Anforderungen erfüllenden Baustoffe oder Baukonstruktionen auf Grund von Anforderungen aus dem Bauwerkskontext
  - Beispiel: Assistent zur Auswahl der passenden Betone auf Grund der Betonaggressivität des Grundwassers
  - Beispiel: Assistent zur Auswahl von Estrichen mit passender Estrichfestigkeitsklasse/Bindemittel/Estrichdicke, die eine Zielvorgabe für die Belastbarkeit an
    einen Boden erfüllen
  - Prosatext von Erik dazu:
    - Im einfachsten Fall ist dies z. B. die Abfrage nach der Erfüllung bestimmter Bedingungen: Der „virtual Assistant“ schlägt z. B. für bestimmte
      baukonstruktive Situationen die passenden Baustoffe oder Bauarten vor und prüft dabei die Konformität mit den im jeweiligen Kontext anwendbaren
      technischen Regeln ab. So muss beispielsweise eine Trittschalldämmung neben Anforderungen an deren dynamische Steifigkeit ggf. auch Anforderungen aus
      anderen Fachgebieten, z. B. an die statische Belastbarkeit, das Brandverhalten, die Wärmedämmung, den Schadstoffgehalt oder den Primärenergieinhalt
      erfüllen. Die dafür notwendigen Informationen müssen in allen Projektebenen jederzeit abfragbar sein. Der Mehrwert besteht in der Schnelligkeit und
      Zuverlässigkeit der bereitgestellten Entscheidungsgrundlagen.
  - ==**Stand April 2021**==:
    - Prototypischer Code zum Filtern von Baustoffen in "Verwaltung" > "Test Area 3".
      Dies ruft in baustoffe.controller.js eine Test-Methode readFilteredBaustoffe() auf, welche
      die Baustoffe findet, deren aktivierte Baueigenschaften bestimmte Werte (Filterbedingungen) erfüllen. Die
      Mongoose Query dafür benutzt gechainte elemMatches.
    - Außerdem kann das Tab "Raum" > "Feuchte" als erster "virtual Assistant" eingesetzt werden, da es standort- und raumspezifische Informationen verknüpft und
      gemäß unterschiedlichen Regelwerken Berechnungen für die Luftfeuchte im Raum nach unterschiedlicher Kriterien (Schimmel, Tauwasser, Korrosion, etc.) erlaubt.
  - ==**Stand November 2021**==:
    - Filtern in Baustoffen nach Benutzervorgaben (implementiert für Estriche - die passenden Estriche können nach Benutzervorgaben für eine Estrich-Schicht im
      Bodenaufbau aus der Baustoffdatenbank herausgefiltert und ausgewählt werden (nach Estrichbauart, Estrichbindemittelart, Estricheinbauart, Estrichbiegezugfestigkeitsklasse,
      Estrichhärteklasse, Estrichdruckfestigkeitsklasse, Estrichoberflächenhärteklasse)
- **Stufe 4 - "Computed Properties"**
  - Ziel: Automatisierte Bestimmung wichtiger bauphysikalischer Kenngrößen in Abhängigkeit von technischen Anforderungen und Eigenschaften aus dem Bauwerkskontext
  - Hinweis: Die Komplexität solcher Berechnungen reicht von einfachen bis zu sehr komplexen Szenarien
  - Hinweis: Existierende fachspezifischen Softwarelösungen für bestimmte Szenarien sollen eingebunden, nicht ersetzt werden
  - **[TODO]**: Die folgenden Beispiele sind noch fachlich zu verifizieren:
  - Wärmeschutz:
    - Beispiel: Berechnung des Wärmedurchgangskoeffizients (U-Werts) einer Wand in Abhängigkeit von den verbauten Einzelteilen (Schichtaufbau)
    - Beispiel: Bestimmung länderspezifischer Wärmeleitfähigkeitssicherheitszuschläge in Abhängigkeit vom Standort
    - Beispiel: Ermittlung der Heizlast für Räume
  - Feuchteschutz:
    - Beispiel: Ermittlung der Schlageregenbeanspruchungsklasse in Abhängigkeit von der Gebäudehöhe
    - Beispiel: Nachweis der Abdichtung gegen Grundwasser
  - Schallschutz:
  - Beispiel: Berechnung eines ein Gesamt-Verbesserungsmaßes für den Trittschallpegel (L’nw) aus der Masse der Rohdecke, der Masse des Estrichs, sowie der
    dynamischen Steifigkeit der Dämmung – diese ist frequenzabhängig und muss aus 16 Einzelfrequenzen berechnet werden
    - **Hinweis**: Überlappt mit obigem Beispiel von Erik in der Stufe 2
  - ==**Stand April 2021**==: Berechnung von Niveaus im Tab "Raum" > "Boden/Decke", Berechnung von Feuchte-Attributen
    im Tab "Raum" > "Feuchte"
  - ==**Stand November 2021**==: Berechnung des R-Werts und U-Werts eines Bodenaufbaus aus den Eigenschaften der beteiligten Schichten
- **Stufe 5 - "Smart Construction Wizards"**
  - Ziel: Intelligente Algorithmen, die für bestimmte bauliche Situationen regelkonforme und auf die Anforderungen optimierte Konstruktionen vorschlagen
  - Beispiel: Wizard zur Auswahl von Estrichen mit passender Estrichfestigkeitsklasse/Bindemittel/Estrichdicke, die eine Zielvorgabe für die Belastbarkeit
    (z.B. 5 kN oder 5 kN/m2) an einen Boden erfüllen
  - Beispiel: Wizard für optimierte Dachkonstruktionen mit Unterkonstruktionen und Belüftungen in Abhängigkeit von Dachneigung, Standortdaten,
    Witterungsbedingungen und anderen Parametern
  - Prosatext von Erik dazu:
    - In komplexeren Szenarien sind die Bedingungen an einen Bewertungsalgorithmus geknüpft: Das können z.B. Entscheidungshilfen auf Basis zu digitalisierender,
      ggf. mehrdimensionaler Tabellenstrukturen oder Abfragefolgen sein („Smart Wizard“). Dieser schlägt für bestimmte konstruktive Situationen in einem
      Bauvorhaben eine passende, auf die Anforderungen optimierte Konstruktion vor, z.B. passende Dachkonstruktionen mit Unterkonstruktionen und Belüftungen in
      Abhängigkeit von Dachneigung, Standortdaten, Witterungsbedingungen, Nutzung, Sicherheitsniveau, Schallschutzanforderungen und beliebigen anderen
      Parametern. Der Mehrwert besteht darin, dass bisher in Prosa verfasste Regelwerke damit in digitale Entscheidungsstrukturen umgewandelt werden können.
  - ==**Stand Mai 2021**==: Design für Schallschutz im Rahmen einer Masterarbeit begonnen - in diesem Rahmen werden solche Wizards erstmals konzeptionell exploriert.
:::

---

#### **[Epic 37]** ==**[WORK]**== (Prio 3) Verbesserte Responsiveness des User Interfaces (automatische Anpassung an unterschiedliche Screen Sizes/Real Estate für Desktop-Bildschirme, Laptops, Tablets und Smartphones)

- QTabs: Seitliche, vertikale Tab-Leiste statt horizontaler Haupt-Tab-Leiste oben
  - Property "vertical" nutzen an q-tabs!
  - Damit könnte man die heutige obere Tab-Leiste relativ unverändert auch im linken QDrawer anzeigen
  - Mit QDrawer Bordmitteln kann man auf kleinen Bildschirmen den linken QDrawer hiden, wenn nicht gebraucht
  - https://codepen.io/metalsadman/pen/KKKNPoB
    . Der Drawer hat einen "Mini Mode": https://next.quasar.dev/layout/drawer#Mini-mode
    - Dieser reagiert auf Mouseover - minimiert den Drawer automatisch
    - https://next.quasar.dev/layout/drawer#Mouseover%2Fmouseout-trigger
  - Zusätzlich:
    - Es sind dann statt der heutigen horizontalen, grauen Unter-Tabs zusätzliche nested Menus bzw. vertikale Unter-Tabs notwendig
      - Eventuell interessant: Dropdown Menü mit q-popover
        - https://forum.quasar-framework.org/topic/856/solved-q-toolbar-dropdown-menu-possible/3
        - QPopover wurde ersetzt durch QMenu
    - Es muss überlegt werden, ob der QSplitter in baueinheiten.vue/baustoffe.vue so bleiben kann
    - Es muss überlegt werden, wie die Forms auf kleinen Bildschirmen sich eher vertikal als horizontal rendern
- Seitliches Menu Bar, ohne QTabs, im linken QDrawer:
  - https://forum.quasar-framework.org/topic/4520/how-to-add-opacity-to-the-drawer-background-please
  - Benutzt einfache q-list mit clickable Items im linken q-drawer
- https://www.youtube.com/watch?v=fN2-1V2YARQ - Benutzung der CSS Classes für Window Width (xs, sm, md, lg, xl) - mit diesen kann man
  steuern, was wann angezeigt wird - z.B. mit "class='gt-sm'", damit kann z.B. ein Menu Bar links im Drawer angezeigt werden
  - https://quasar.dev/style/visibility
- https://www.youtube.com/watch?v=QTd8UIwp0CY - Responsive Header Banner
- https://www.youtube.com/watch?v=poG7d1r34QE - Responsive UI mit Quasar, 3-spaltig auf Desktop, 1-spaltig auf Mobile
  - **Slicing** des UI Designs = Breakdown der Page in Rows und Columns
- https://www.youtube.com/watch?v=hA2BbildK80 - Nächster Schritt
  - Desktop: 1 Row mit 3 Columns - die QCard Sections in der Row benutzen "col-12 col-md" - "col-md" sorgt für Responsiveness!
  - Mobile: 1 Column mit 3 Rows
- Responsive CSS Classes in Quasar: https://quasar.dev/layout/grid/row#Responsive-classes
  - Wir benutzen bisher nur die erste Variante (numbered col-x Classes)
  - Responsive sind aber die 4 weiteren Varianten
    - Diese benutzen "col-x col-md-y" ("md" steht dabei für die Column auf medium Devices)
    - Beispiel (innerhalb einer Row): "col-12 col-md-4"
    - Die jeweils ersten Werte "col-x" sind für mobile Devices
      - Die dortigen Werte x werden addiert und nach dem Erreichen von 12 geschieht Wrapping in die nächste Row
      - Wenn dort "col-12" steht, wird die folgende Column auf mobilen Devices automatisch in die nächste Row gewrapped
      - Wenn dort nur "col" steht, bedeutet das vermutlich "full Width", d.h. diese Column nimmt auf mobile Devices immer die volle Row-Breite ein
    - Die jeweils zweiten col-md-y Werte (für Desktop) addieren innerhalb einer Row üblicherweise auf 12 (wie gewohnt bei bisherigem Design)
- Bei der Umstellung von Forms mit vielen Eingabefeldern ist zu beachten:
  - 4 QInputs in einer Row können nach folgendem Muster umgestellt werden:
    - Bisher: "col-3" (4 Spalten auf Desktop, wird responsive zu "col-md-3")
    - Responsive: "col-md-3 col-12" (d.h. auf mobile Devices wird jedes der QInputs in einer neuen Zeile gewrapped)
    - Diese Art der Implementierung in den neueren Profilformularen für "Baueinheit > Geschoss" und "Baueinheit > Raum" zeigt, dass es prinzipiell so geht!
    - Achtung: Die früher erstellten Profilformulare für "Baueinheit > Standort" und "Baueinheit > Gebäude" verwendeten
      ursprünglich noch nicht dieses responsive mussten nachträglich auf dieses umgestellt werden!
    - Dasselbe gilt für das generische Baueigenschaftsprofilformular.
  - Separate Label-Texte über QInput- oder anderen Eingabefeldern, wie häufig verwendet, machen aber dabei Kummer, weil sie bisher eine separate Zeile bilden,
    die bei obiger Umstellung separat gewrapped wird
    - Diese müssen entweder eliminiert werden (zeigen sowieso oft dasselbe an wie das in das QInput-Feld integrierte Label)
    - Oder sie müssen zusammen mit ihrem jeweiligen Eingabefeld Feld als eine Einheit per div spezifiziert werden ("row" mit
      zwei "col-12" innen, vielleicht genügt per Quasar Samples aber auch ein einfaches div mit HTML-Labeltext, welches das
      Eingabefeld wrapped!
      - Siehe z.B. Script-Teil von https://quasar.dev/vue-components/option-group#Native-form-submit
    - Wenn sie über Option Groups (mit Radios oder Checkboxes) stehen, müssen sie allerdings bleiben, denn diese haben
      nur Option Labels, kein Label für die ganze Option Group (dieses wird per BIM.click Code als Label-Text aus dem
      Layout File über der Option Group angezeigt, und müsste auf mobile Devices mit dieser zusammen in einer Spalte mit
      col-12 (d.h. volle Screen Width) angegzeigt werden.
  - Die QButtons müssen ebenfalls nach diesem Muster umgestellt werden
- ==**Achtung**==:
  - Bevor man in solche Umstellungsarbeit investiert, ist gut zu überlegen, ob es Sinn macht, unsere zum Teil
    "busy" aufgebauten Tabs mit 20
    oder mehr Input-Feldern vertikal gewrapped auf mobile Devices anzuzeigen - es erfordert viel vertikales Scrolling
  - Auch die Markdown-Masken für die Eingabe von Beschreibungen, die nebeneinander das Eingabefeld und die formatierte Ausgabe
    anzeigen, können nicht einfach nach obigem Muster umgestellt werden
  - Es macht aber Sinn, obiges Muster für ein responsive Design bei neuen Masken auszuprobieren, und damit Erfahrung zu sammeln
- ==**Update (17.11.2021)**==: Mittlerweile fast alle Masken responsive gemacht im obigen Sinn (class="col-md-x col-12").
- ==**Update (18.11.2021)**==: Auch Admin-Masken (z.B. Details/Neuanlage von Baueigenschaften, Bauinformationen, Profilen, etc.)
  sowie die Masken, die QTables enthalten, weitestgehend responsive gemacht. Die QTables selbst lassen sich nicht ohne
  Scrollbalken darstellen auf kleinen Bildschirmen. Zusätzlich auch die Schriftgröße der Tab-Überschriften (auf großen
  Bildschirmen class="text-h6" mit v-if="\$q.screen.gt.sm") verkleinert bei kleinen Bildschirmen auf class="text-subtitle1".
- Generelle Diskussion: https://forum.quasar-framework.org/topic/6056/desktop-template-mobile-template-both-in-the-same-page
- Weitere Links zu Flexbox:
  - https://quasar.dev/layout/grid/introduction-to-flexbox - Flexbox Intro mit Quasar
  - https://quasar.dev/layout/grid/flexbox-patterns - Flexbox Patterns mit Quasar
  - https://quasar.dev/layout/grid/row#Responsive-classes - Responsive Flexboxes mit Quasar
  - https://css-tricks.com/snippets/css/a-guide-to-flexbox/ - Flexbox Guide
  - https://tobiasahlin.com/blog/common-flexbox-patterns/ - Flexbox Examples

---

==**Hinweis:**== Die folgenden Epics behandeln generelle Design-, Implementierungs- und Entwicklungsthemen:

---

#### **[Epic 38.a]** Anzeige von Karten mit HTML/GL/Vue/Quasar

- Mapbox
  - https://www.npmjs.com/package/mapbox-gl
  - https://www.npmjs.com/package/mapbox
  - https://codepen.io/aderaaij/pen/KvJbGj
  - https://codepen.io/alassetter/pen/zyVbwm
- Mapbox Vue
  - https://www.npmjs.com/package/vue2mapbox-gl
  - https://codepen.io/shortdiv/pen/rNxBYRZ - Demo, es kann mit anderen Center-Koordinaten auch eine deutsche Karte angezeigt werden! (z.B.: center: [9.3, 48.9],)
- Quasar-Komponente für Mapbox (QMap)
  - https://www.npmjs.com/package/@wmfs/quasar-map-mapbox
  - https://github.com/wmfs/quasar-map-mapbox
- ArcGIS
  - https://codepen.io/esri_devlabs/pen/JZeeEZ
  - https://codepen.io/mickey58/pen/GRRxXxe
- Karten für Deutschland
  - https://de.wikipedia.org/wiki/Datei:Germany_(%2Bdistricts_%2Bmunicipalities)_location_map.svg - SVG-Karte für deutsche Kreise und Gemeinden
  - https://www.npmjs.com/package/@svg-maps/germany - SVG-Karten für deutsche Bundesländer
  - https://codepen.io/marcobiedermann/pen/gRLWPx - HTML/CSS-Demo zur Anzeige einer interaktiven SVG-Deutschlandkarte mit deutschen Bundesländern mit Hover
- Karten weltweit
  - https://gadm.org/index.html (Link von Erik)
- ==Overlays über Google Maps Karten==
  - Damit könnten z.B. Schneelastzonen in Karten angezeigt werden
  - https://github.com/diegoazh/gmap-vue
  - https://github.com/diegoazh/gmap-vue/tree/master/packages/documentation/docs
  - Beispiele: https://diegoazh.github.io/gmap-vue/examples/
    - Dort Google Maps API Key aus standort-baueigenschafts-profil.vue eingeben (ohne "")
    - Bei "libraries" z.B. "places" oder "drawing" eingeben (ohne "")
    - Beispiel für Polygon-Overlay:
      - https://diegoazh.github.io/gmap-vue/examples/polygon-advanced.html#live-example
        - Mit "Add Path" kann ein neues Polygon hinzugefügt werden

---

#### **[Epic 38.b]** ==**[WORK]**== Grafische Editoren mit Vue

Diagramm-Editoren:

- https://www.npmjs.com/package/vue-diagram-editor - Prototyp in "Verwaltung" > "Test Area 9" - nur Kern-Diagrammeditor
  - https://vue-diagram-editor.js.org/
  - https://github.com/gwenaelp/vue-diagrams
  - Installiert am Frontend mit npm install vue-diagram-editor
  - ==**[TODO]**== #326 - Deinstallieren, aus package.json entfernen, sowie in verwaltung.vue disablen, wenn keine dauerhafte Nutzung!
- https://www.npmjs.com/package/vg-editor - Prototyp in "Verwaltung" > "Test Area 10" - nur Kern-Diagrammeditor
  - IInstalliert am Frontend mit npm install vg-editor@2.7.2 -S bzw. -G
  - ==**[TODO]**== +326 - Deinstallieren, aus package.json entfernen, sowie in verwaltung.vue disablen, wenn keine dauerhafte Nutzung!
- https://www.npmjs.com/package/cepreig6editor - Variante von VGEditor
- https://www.npmjs.com/package/vue-pencil.js
- https://www.npmjs.com/package/vue-gl
- https://www.npmjs.com/package/vue-graphics
- https://github.com/ghostiam/vue-blocks
- https://www.yworks.com/pages/vue-js-diagram-component
- https://www.syncfusion.com/vue-ui-components/vue-diagram
  - https://ej2.syncfusion.com/vue/demos/#/material/diagram/drawing-tool.html
  - https://ej2.syncfusion.com/vue/demos/#/material/diagram/default-functionality.html
  - https://codesandbox.io/s/vue-diagram-of12i?file=/src/components/HelloWorld.vue

Problem aller Diagrammeditoren:

- Keine echte Grafik, d.h. keine Bemaßung, keine gemeinsamen Kanten zwischen Nachbarräumen
- Nachbarschaften können damit nicht wirklich gut bestimmmt werden
- Next Neighbor-Algorithmen (siehe Epic 38c) sind vermutlich nur bedingt anwendbar (beziehen sich normalerweise auf Abstände zwischen Punkten, nicht Kanten)

CAD-Software (Extrakt)

- SketchUp
  - Im Browser verfügbar
    - https://app.sketchup.com/app#
  - Eigentlich für 3D!
  - 2D Floor Plan Tutorial
    - http://et365.pbworks.com/w/page/45163117/03%20Tumbleweed%20Tiny%20House%20Floorplan
  - Man könnte eventuell ein SketchUp File erzeugen aus BIM.click für Räume eines Geschosses
    - Dann könnte man ein 2D Floor Plan für die Nachbarschaften in SketchUp daraus modellieren
    - Dann müsste ein Skript daraus die Nachbarschaften auslesen?
    - SketchUp Scripting:
      - https://forums.sketchup.com/t/can-we-write-scripts-running-in-background-to-generate-3d-model/103495 - Ruby API, Sketchup SDK
      - https://extensions.sketchup.com/sketchup-sdk - SketchUp SDK - scheint ein C API zu sein
      - https://ruby.sketchup.com/index.html - Ruby API, moderner
- Blender
  - https://www.blender.org/download/
  - Nicht im Browser?
- FreeCAD
  - https://www.freecadweb.org/index.php
  - Nicht im Browser?
- Revit
  - Nicht im Browser
  - Code (C#), um per Revit API benachbarte Räume (room neighbors/adjacent rooms) aus einem Floor Plan Layout auszulesen:
    - https://thebuildingcoder.typepad.com/blog/2013/09/room-neighbours.html
    - "Get room at point" Algorithmus

---

#### **[Epic 38.c]** Nachbarschaft von grafischen Objekten

- https://www.npmjs.com/package/@ignatisd/nearest-neighbor
- https://www.npmjs.com/package/ml-knn
- https://www.npmjs.com/package/nearestneighbour

---

#### **[Epic 38.d]** ==**[WORK]**== Visualisierung (Viewing/Rendering) von grafischen/geometrischen Modellen im Browser

- https://www.ks-schallschutzrechner.de/ - hat 3D-Viewer für eine Raum-Nachbarschaftssituation

  - Ein wichtige Erkenntnis aus diesem KS-Rechner ist diese:
    - Die Flankenbauteile (Wände, Böden, Decken) erstrecken sich bei diesem Rechner entweder über beide Räume oder
      beziehen sich wie beim K&F-Excel-Rechner über nur einen der beiden (Steuerung per Toggle-Schalter)
      - Es werden deshalb optional für eine Nachbarschaftssituation 4 durchlaufende Flanken modelliert, nicht 8 raumbezogene wie beim K&F-Excel-Rechner
      - Bei horizontaler Nachbarschaft also:
        - 1 Trennwand
        - 4 Flanken: 2 Seitenwände (1 außen, 1 innen), 1 Boden, 1 Decke
      - Bei vertikaler Nachbarschaft also:
        - 1 Trennboden
        - 4 Flanken: 4 Seitenwände (q außen, 3 innen)
    - Daraus ist zu schließen, dass schon die Modellierung und Erfassung der Nachbarschaftssituationen keineswegs unabhängig ist vom
      späteren Berechnungsprogramm! In anderen Worten: Wenn man diese Erfassung tatsächlich in BIM.click haben möchte,
      muss man sich eigentlich bereits festlegen, auf welches Berechnungsprogramm man dieses Nachbarschaftsmodell zuschneiden will
    - Insofern passt hier das Modell des K&F-Excel-Rechners gut mit dem von BIM.click zusammen, welches die Wände und Böden
      individuell im Baum unter jedem Raum modelliert
    - In BIM.click könnte man natürlich dafür auch auf die Idee kommen, die Wände und Böden nicht „unter“ jedem Raum im Baum
      zu modellieren, sondern auf derselben Ebene wie die Räume. Dann verliert man allerdings die Vererbung der Raumanforderungen
      an diese Bauteile, und muss die Zuordnung zwischen den Räumen und diesen Bauteilen separat als Modellerweiterung verwalten

- https://www.kalksandstein.de/bv_ksi/binaries/content/86180/file_ks_manual_de.pdf
- Kann Daten übernehmen aus der Desktop-Version des Programms (proprietäre Config-Dateien mit Windows-Dateityp .ssc)
  - Beispiel-SSC-Dateien kommen mit der Windows-Desktop-Version, dort im Unterverzeichnis \Kalksandstein-Schallschutzrechner\examples (Textdateien)
  - Es handelt sich um ein undokumentiertes, proprietäres Textformat mit Keywords ("BEGIN FOLDER", "BEGIN ELEMENT", "NAME = Beispiel horizontale Raumsituation")
- Verwendet offenbar JS Package Three zum 3D Rendering der Raum-Nachbarschaftssituation (im Browser Log erkennbar)
- https://www.npmjs.com/package/three - basiert auf WebGL
- Weitere interessante WebGL Packages:
  - https://www.npmjs.com/package/phaser
  - https://www.npmjs.com/package/vtk.js (kann sogenannte VTP-Files rendern)-

---

#### **[Epic 38.e]** ==**[WORK]**== Robotic Process Automation (RPA) zur Ansteuerung von 3rd Party Software

- Idee: Statt Übergabe von exportierten Dateien (propietäre Formate, Excel, IFC) an 3rd Party Software (z.B. Berechnungs-Programme zum Schallschutz etc.) könnte man solche auch per **RPA Software** "fernsteuern", d.h. die dort notwendigen Benutzereingaben per RPA simulieren
- RPA Software
  - RPA und OSS: https://research.aimultiple.com/open-source-rpa/ - Fazit: noch keine echten OSS-Offerings für RPA
  - RPA Software **UIPath** hat Community Edition, Freemium-Modell für einzelne Entwickler und kleine Teams, bis zu 3 Robots
    - Tutorial: https://mindmajix.com/uipath-tutorial
- Zur Steuerung von Web-Anwendungen (nicht für Desktop-Anwendungen!) kommt auch **Selenium** in Frage!
  - Abwägung: https://www.quora.com/Can-Selenium-be-used-for-robotic-process-automation
  - https://www.npmjs.com/package/selenium-webdriver - **Selenium WebDriver** erlaubt Programmierung von Skripten, u.a. in Javascript
    - bim-click-frontend > npm install selenium-webdriver
  - https://chromedriver.chromium.org/downloads - **ChromeDriver**, muss für Chrome als Ziel-Browser lokal installiert werden
    - Aufnahme in Windows Umgebungsvariable Path (Systemvariable) erforderlich, wie im Tutorial beschrieben!
    - C:\Users\BIMIive\Downloads\ChromeDriver (Selenium)\chromedriver_win32
  - Tutorial: https://blog.testproject.io/2020/06/17/selenium-javascript-automation-testing-tutorial-for-beginners/
    - Selenium ChromeDriver muss in path aufgenommen werden
    - Erfolgreicher Sniff Test mit elenium-test.js (Standalone Node Modul unter /bim-click-frontend) sowie in verwaltung.vue, Test Area 10 (letzteres wieder disabled, da Selenium wegen Security nicht aus Browser launchbar ist)
  - Weitere Selenium Tutorials: https://www.guru99.com/selenium-tutorial.html (Java!)
  - (Optionaler) WebDriver Manager zur Installation des richtigen ChromeDrivers: https://www.toolsqa.com/selenium-webdriver/webdrivermanager/
- Mögliche Alternativen zu Selenium:
  - Überblick 2021: https://medium.com/welldone-software/an-overview-of-javascript-testing-7ce7298b9870
  - WebdriverIO - https://medium.com/@specktackle/selenium-and-webdriverio-a-historical-overview-6f8fbf94b418
  - Cypress - https://dev.to/muntasir101/selenium-vs-webdriverio-vs-cypress-3p0f (bereits angetestet mit BIM.click!)
  - Nightwatch - https://nightwatchjs.org/ und https://www.npmjs.com/package/nightwatch - JS only, sieht
    einfacher aus als Selenium!
    - Benutzt ChromeDriver, hat eigene Selenium Implementierung, Testcase Syntax sieht vielversprechend aus (Alternative zu Cypress?
    - Cypress hat allerdings wesentlich mehr Popularität: https://www.npmtrends.com/cypress-vs-nightwatch
  - TestCafe
  - Perfecto Scriptless (formerly TestCraft, "scriptless Selenium", Produkt, nicht OSS)
- Mögliche Erweiterung von Selenium mit Test Frameworks (nicht für RPA, sondern für Testing, siehe auch Epic 16 dazu)
  - Mocha - https://www.npmjs.com/package/mocha
  - Chai - https://www.npmjs.com/package/chai
  - Sauce - https://saucelabs.com/
    - sowie https://wiki.saucelabs.com/display/DOCS/Getting+Started+with+Selenium+for+Automated+Website+Testing - dort gute Hints
  - Applitools für Regression Testing - https://applitools.com/blog/javascript-selenium-applitools/

---

#### **[Epic 38.f]** ==**[WORK]**== Screen/Video Recording

- https://www.npmjs.com/package/screen-capture-recorder - Wrapper für VLC Desktop Screen Recording - getestet, funktioniert nicht, selbst mit lokaler Windows Installation von VLC nicht
- https://www.npmjs.com/package/multicorder - als Vue Komponente
- https://www.npmjs.com/package/videojs-record - Recorder Plugin für video.js Player
- Aktuell installiert: Chrome Extension RecordRTC - erlaubt es aus dem Chrome Browser Videos zu recorden, sogar Fullscreen
- Erstes BIM.click Intro/Demo Video damit erstellt
  - Im Fullscreen Modus mit Mikrofon
  - Erzeugt Video-Datei mit Audio im .webm-Format im Browser Cache, diese kann heruntergeladen werden
  - Achtung: Das Video hat auf Widescreen-Bildschirm das Format 3840 x 2160
  - Es musste deshalb als Teil der Konvertierung nach mp4 umgerechnet werden auf 192ß x 1090 (full HD)
- In Zukunft besser gleich auf Full-HD-Laptop-Bildschirm aufzeichnen!
- Das webm-Video auf OneDrive hochgeladen und shareable Link erzeugt
  - OneDrive kann allerdings offenbar webm-Videos nicht direkt abspielen im Browser
  - Siehe https://answers.microsoft.com/en-us/msoffice/forum/all/onedrive-open-in-browser/ce43966c-4fda-4725-9cfe-a482373495f0 - angeblich kann es nur OneDrive for Business
  - Daher das Video konvertiert nach mp4
  - Das konvertierte mp4-Video nach OneDrive hochgeladen
  - Es kann dann direkt von OneDrive gestreamt werden im Browser
- Für die Konvertierung von Heise **XMedia Recode** 64 Bit heruntergeladen und lokal installiert auf Windows
- Anleitung: https://www.xmedia-recode.de/hilfe/convert/video_to_mp4.php
- Button mit Link zum Video auf OneDrive in Online Doku, öffnet Link in Browser Tab
- Das Video könnte auch auf bimclickserver im Download-Verzeichnis gespeichert werden
- Es hat ca. 53 MB

---

#### **[Epic 38.g]** ==**[WORK]**== Performance-Optimierungen für das Refreshen des Bauvorhabenbaums und das Speichern von Baueigenschaftsprofilformularen

- Optimierter **Refresh-Algorithmus** von Stefan:
  - ALT: Rekursiv alle jemals lazy geloadeten oder aufgeklappten Knoten lesen im gesamten Baum, beginnend beim Wurzelknoten - dabei  
    einzelne Backend Calls für jeden betroffenen Knoten (deshalb "Flackern" am User Interface)
  - NEU:
    - a) Nur noch die Knoten im **Elternpfad des ausgewählten Knotens** (von oben nach unten) mit **einem** speziellen neuen
      API-Call laden, d.h. **ein** Call mit mehr Daten für alle betroffenen Knoten/Ebenen im Elternpfad, statt mehreren Calls
      (dadurch Performance-Verbesserung)
    - b) **Geschwisterknoten** auf allen betroffenen Ebenen im Elternpfad dabei **nicht** neu laden (diese werden bisher neu geladen,
      dadurch zusätzliche Performance-Verbesserung!)
      - Frage: Dadurch potentielle schädliche Nebenwirkungen?
      - Antwort: Nein - Vererbungsregel müsste weiter eingehalten sein und die Baueigenschaften an allen Knoten sind weiter
        valide
      - Begründung: Änderungen einer Baueigenschaft im ausgewählten Knoten dürfen "höchstens" Baueigenschaften an Knoten weiter oben
        im Elternpfad
        - entweder 1. ändern (wenn ein Wert einer bereits definierten Baueigenschaft geändert wird
          - Unterfall 1: Falls im Elternpfad die Baueigenschaft bereits definiert ist, wird dies im Frontend
            in den Baueigenschaftsprofilformularen und im Admin UI per disable verhindert, d.h. der Fall tritt nicht auf.
            Träte er doch auf, so wird vom Backend im Elternpfad die Baueigenschaft auf undefiniert gesetzt, dann
            würden sich Baueigenschaften im Elternpfad ändern
          - Unterfall 2: Die Baueigenschaft ist im Elternpfad undefiniert, dann ändert sich nur der Wert am ausgewählten
            Knoten, die Werte im Elternpfad bleiben undefiniert
        - oder 2. definiert machen (wenn der bisher undefinierte Wert einer Baueigenschaft definiert wird - dieser muss im
          Elternpfad ebenfalls undefiniert gewesen sein - er wird dann am ausgewählten Knoten und allen seinen aktivirten
          Kindknoten mit diesem Wert auf definiert gesetzt - die Knoten im Elternpfad und die dort betroffenen Geschwisterknoten
          bleiben undefiniert.
        - oder 3. undefiniert machen
          - Unterfall 1: Falls im Elternpfad die Baueigenschaft bereits definiert ist, wird dies im Frontend
            in den Baueigenschaftsprofilformularen und im Admin UI per disable verhindert, d.h. der Fall tritt nicht auf.
            Träte er doch auf, so wird vom Backend im Elternpfad die Baueigenschaft auf undefiniert gesetzt, dann
            würden sich Baueigenschaften im Elternpfad ändern
          - Unterfall 2: Die Baueigenschaft ist im Elternpfad undefiniert, dann ändert sich nur der Wert am ausgewählten
            Knoten, die Werte im Elternpfad bleiben undefiniert
        - Dies hat in keinem Fall Auswirkungen auf die Geschwisterknoten (deren Baueigenschaften durch obige Optimierung künftig
          nicht mehr neu geladen werden, sondern im bisherigen Zustand stehen bleiben)
        - Felder, deren Werte weiter oben im Elternpfad bereits definiert sind, werden dabei in Baueigenschaftsprofilformularen
          durch disable-Funktionen und in den Admin-Formularen für Baueigenschaften disabled und können nicht geändert werden
      - Die aufgeführten 3 Fälle und Unterfälle sind dennoch zu testen!
    - c) DONE: Auch die aufgeklappten direkten und indirekten **Kindknoten** unter dem ausgewählten Knoten neu laden (sonst erben
      diese nicht
      korrekt die ggf. geänderten Werte des ausgewählten Knotens
    - d) NICHT: Auch die aufgeklappten **Geschwisterkindknoten** unter dem Elternknoten des neu geladenen Knotens neu laden (wie
      oben b))
  - FEHLER: Wenn ein ausgewählter Knoten neu geladen wird mit dem bisherigen Testcode für den neuen Algorithmus, und dieser hat
    Kinder, funktioniert es noch nicht (while-Schleife prüfen)
  - ACHTUNG: Den Algorithmus und die Tests fokussieren auf das kritischste Szenario "Baueigenschaftsprofil an Knoten speichern"
  - ==**UPDATE 27.05.2021**==:
    - Dieser bisherige Algorithmus bringt noch nicht die gewünschten Verbesserungen.
    - Im Gegenteil, bei Tests auf Heroku ist er, aus unbekannten Gründen tendenziell sogar langsamer als der bisherige Refresh!
    - Daher wurde der Optimierungs-Algorithums von Stefan nochmals verändert - der optimierte Refresh
      - lädt alle Knoten im Elternpfad des ausgewählten Knotens neu
      - lädt dabei jedoch nicht mehr auch ggf. geladene Geschwisterknoten auf allen Ebenen im Elternpfad
      - lädt alle geladenen Kind- und Kindeskindknoten des ausgewählten Knotens neu (diese müssen ggf. früher einmal aufgeklappt worden
        sein, sonst wären sie nicht geladen worden - sie können jedoch wieder zugeklappt worden sein)
      - bringt eine deutliche Verkürzung der Refresh-Zeiten bei ersten Tests (per Test Button "Baum neu laden (optimiert)")
    - Dieser neue Algorithmus wird nun zunächst beim Refresh nach Speichern von Profilformularen verwendet, d.h. er ersetzt
      den alten Algorithmus - dadurch konnte eine Verbesserung der Gesamt-Ladezeit beim Speichern von 40-50% erzielt werden
    - Später könnte er auch beim Bewegen von Zweigen verwendet werden
    - Insgesamt setzt sich die Wartezeit beim Speichern von Profilformularen zusammen aus:
      a) der Zeit zum Speichern der Werte aller Baueigenschaften im Profilformular (diese Zeit ist direkt proportional zur Anzahl der
      zugehörigen Baueigenschaften im Profil)
      b) der Zeit für den Refresh des Bauvorhabenbaums, welcher im Rahmen von Epic 38.g von Stefan optimmiert wird
- Mögliche Ausbaustufen dieser Optimierung:
  - e) Früher aufgeklappte Knoten, die nicht im Elternpfad liegen, nicht neu laden: Ist bereits oben enthalten in b)!
  - f) Ggf. aufgeklappte Kinder des ausgewählten Knotens zuklappen, statt c)
    - Das wäre allerdings potentiell produktivitätshemmend, da diese im aktuellen Projekt liegen, was möglichst nicht verändert
      werden sollte
    - Daher sollte, falls f) implementiert wird, dies über eine Benutzereinstellung optional konfigurierbar sein
- Weitere Performance-Optimierungen, nachdem das Refreshen des Bauvorhabenbaums optimiert wurde:
  - In baueigenschafts-profile-aktivierungslogik.js, Methode schreibeInhalteAusProfilFormular() die ersten zwei Schritte optimiert
    disabled:
    - [DONE] 1. Schritt: Aktiviere alle Baueigenschaften im Profil im Elternpfad (ist entbehrlich, das diese bereits aktiviert sein müssen)
    - [DONE] 2. Schritt: Undefiniert-Machen der Baueigenschaften im Profil im Elternpfad - ist <it>nicht</it> entbehrlich per Tests, dort allerdings
      leichte Verbeserung durch await Promise.all statt einzelnen awaits in Schleife
  - Weitere Tests, um das weitere Optimierungspotential zu analysieren:
    - Dump der MongoDB Cloud Atlas Datenbank durchgeführt
      - https://docs.mongodb.com/database-tools/mongodump/
    - Dazu Powershell auf lokalem MongoDB-Verzeichnis starten: C:\Program Files\MongoDB\Server\4.2\bin> - dort folgende 2 Commands ausführen
    - Dump der Cloud Atlas Datenbank erzeugen (dauert einige Minuten), speichert die Dateien in einen neuen lokalen Ordner /dump
      - ./mongodump --uri mongodb+srv://dbUser:>>password<<>@cluster0-ft9dn.mongodb.net/testmongodump
    - Mongo Restore ohne Argument, holt die Dateien aus dem eben erzeugten Ordner /dump, erzeugt eine neue lokale MongoDB namens test (in Compass einsehbar):
      - ./mongorestore
    - Dann zum lokalen Testen dieser Kopie der Cloud-Datenbank:
      - mongodb.config.js ändern: url: "mongodb://127.0.0.1:27017/test" statt ".../bimclick-test"
    - Im back-end-server.js das Refreshen der Datenbank auskommentiert (wichtig, sonst wird die neu restaurierte Datenbank beim Server Restart gelöscht - dies kann alternativ
      durch lokale Environment Variable REFRESH_DATABASE = "on"/"off"
      gesteuert werden)
    - Dieser Test ergibt, dass das Speichern vom lokalen Server mit einem lokalen MongoDB Server mit der restaurierten MongoDB von Cloud
      Atlas deutlich schneller ist als das Speichern auf Heroku gegen die MongoDB Cloud Atlas Datenbank
    - Dies spricht dafür, dass der Bottleneck bei MongoDB Cloud Atlas liegt, speziell an deren im aktuellen Tier M2 explizit langsamen
      Netzwerkgeschwindigkeit
    - Hinweis: Diese Folgerung muss nicht unbedint richtig sein, denn auch die lokalen vs. die Heroku Server sind in den beiden
      verglichenen Fällen unterschiedlich!
    - Hinweis: Beim Vergleich der lokalen Testdatenbank und der Datenbank auf Cloud Atlas fällt auf, dass
      in der Cloud Datenbank die baueinheitenCollection wegen vieler Knoten im Zweig "Vorlagen" erheblich größer ist
    - Die Verbindung zwischen Heroku (Backend Server) und dem lokalen Backend Server scheint gleich langsam zu sein und muss deshalb
      von Cloud Atlas begrenzt sein
    - Deshalb erscheint ein Upgrade von MongoDB Cloud Atlas vom bisherigen Tier M2 auf einen dedicatd Cluster (M10), welcher eine
      schnellere Netzwerkverbindung offeriert, als die richtige nächste Aktion
    - Hinweis zum potentiellen Downgrade eines Heroku Clusters:
      - https://developer.mongodb.com/community/forums/t/downgrade-from-m5-to-m2-cluster/7199
      - You can’t use the UI to downgrade clusters lower than M10 (Including). What you can do, considering that your M2 cluster will be
        compatible with your current M5 to its collection/size limitation, is to obtain a recent backup or use mongodump to get your
        database copy and restore it to a new M2 cluster.
    - Weitere potentielle Optimierung im Backend Server Code:
      - Bei der Suche nach Baueinheiten per path: Statt regulärer Ausdrücke die indizierten Felder verwenden (id, parent)
        - Die Indexes kann man anzeigen in Compass für eine Collection, Tab "Indexes"
      - Ursprünglich angedachte Variante:
        - Änderungen von Baueigenschaften nur am ausgewählten Knoten und an dessen Kind- und Kindeskindknoten
        - Wäre theoretisch möglich, weil Felder von gemeinsame Baueigenschaften im Profilformular stets disabled sind (auch im generischen Formular)
        - Ist aber im Code nicht ohne Weiteres abbildbar - daher verworfen
  - Alternativ: Test mit lokalem Server gegen MongoDB Cloud Atlas:
    - Kann enabled werden durch Definition von Umgebungsvariablen unter Windows:
      - MONGODB_URL: Dort Connection String für MongoDB Cloud Atlas eintragen
      - REFRESH_DATABASE: "off"
    - Danach Shells und VS Code restarten!
  - ==Update September 2021==: Neues **Backlog Item 354** identifiziert (gravierendes Performance Problem beim Bewegen in den Bäumen)
  - ==Update Oktober 2021==: Optimierter Refresh ist von Stefan dokumentiert in src/markdown/reload-tree.md

---

#### **[Epic 38.h]** ==**[WORK]**== Domain-Verwaltung für die BIM.click-Anwendung im Internet

- Alternative 1: Domain-Umleitung per **DNS-Record**
  - Die Domains bim.click und bimclick.de sind für die Anwendung von Kurz & Fischer bei Franken Webhosting registriert (sogenannter Domain Registrar)
  - Um sie auf die bei Heroku benutzte Domain umzuleiten, auf Heroku unter https://dashboard.heroku.com/apps/bimclick/settings
    zunächst ein DNS Target eingerichet: primal-honeysuckle-7vpcxyfc8l271rji5hzsvvtz.herokudns.com
  - Heroku Docs für Umleitung: https://devcenter.heroku.com/articles/custom-domains
    - Dort https://devcenter.heroku.com/articles/custom-domains
  - Viele Domain Provider unterstützen keine Umleitung ganzer Domains, die normalerweise gemacht wird per CNAME Eintrag (mit ALIAS
    als Angabe der Domain, auf die umgeleitet wird), sondern nur für Subdomains - dazu gehört offenbar auch Franken Webhosting!
  - Ein ANAME Eintrag genügt dafür nicht!
  - Beispiele für Provider, die CNAME-Umleitung anbieten, unter obigem Heroku Doku Link
    - CNAME/ALIAS at DNSimple
      - https://support.dnsimple.com/articles/alias-record/
    - (ANAME at DNS Made Easy)
    - (ANAME at easyDNS)
    - CNAME/ALIAS at PointDNS
      - https://devcenter.heroku.com/articles/pointdns
    - CNAME/ALIAS at CloudFlare. Also see the CloudFlare guide on SSL on Heroku.
      - https://support.cloudflare.com/hc/en-us/articles/360020348832-Understanding-a-CNAME-Setup
    - CNAME/ALIAS at namecheap
      - https://www.namecheap.com/support/knowledgebase/article.aspx/10128/2237/how-to-create-an-alias-record/
  - Franken Webhosting kann wohl nur CNAME-Umleitung für Subdomains, nicht Domains!
    - Siehe deren Doku auf https://www.webhosting-franken.de/dns-eintrag-ihrer-domain-aendern/
    - Testhalber "wwww" als Subdomain ausprobiert - die Umleitung funktioniert damit nicht!
      - DNS Target für Domain www.bim.click auf Heroku wieder gelöscht
    - Testhalber temporär "cloud" als Subdomain ausprobiert
      - Umleitung funktioniert damit, ==allerdings nur mit http, nicht mit https!==
      - DNS Target für Domain cloud.bim.click auf Heroku: objective-viper-26uizdvrtmoma2x2p9du79yr.herokudns.com
      - SSL/https enablen für Custom Domains auf Heroku:
        - https://stackoverflow.com/questions/39678404/ssl-on-custom-domain-for-heroku-app
        - Wohl nur mit paid Plan - dann können SSL-Zertifikate dafür generiert werden mit Heroku
        - https://stackoverflow.com/questions/41088924/custom-domain-which-heroku-forwarded-to-in-not-secure-node-js
        - Heroku Pricing: https://www.heroku.com/pricing
  - Andere Provider, die eventuell Umleitung per CNAME Records unterstützen:
    - https://www.checkdomain.de/hosting/lexikon/cname/
    - Strato:
      - https://www.strato.de/faq/domains/so-aendern-sie-den-cname-eintrag-fuer-ihre-subdomain/ - geht wohl auch nur für Subdomains!
      - https://www.strato.de/faq/domains/alles-zur-domainumleitung/ (Alternative, siehe unten)
  - Fazit: Für die „perfekte Lösung“ müssten wir aber gleich 2 Sachen ändern:
    - Um die ganze Domain per DNS Record umzuleiten, müsste man wohl die Domain von Franken Webhosting zu einem anderen Provider
      umziehen der ganze Domains umleiten kann. Heroku listet dafür vorwiegend in USA beheimatete Provider, die aber normalerweise alle
      global agieren. Was dann dafür die besten Provider wären, muss ich erst erforschen. Heroku selbst bietet keine Custom Domains an,
      sondern halt nur die bisher genutzten Subdomains auf herokuapp.com, in unserem Fall bimclick.herokuapp.com (Frontend) bzw.
      bimclickserver.herokuapp.com (Backend).
    - Um https: in einem solchen Setup zu unterstützen, müssten wir dann gleichzeitig bei Heroku vom free Plan in einen paid Plan  
      wechseln, für beide Apps, die wir dort laufen haben (BIM.click Frontend und Backend – das würde dann im nächsten Plan („Hobby“
      Plan) 2 mal 7 USD pro Monat kosten. Dabei würde auch die „Schlafzeit“ entfallen, die im aktuellen „Free“ Plan immer nach 30
      Minuten auftritt. Dann kann man SSL-Zertifikate erstellen und https enablen. (Im aktuellen „free“ Plan funktioniert https
      automatisch für die Heroku Subdomains in 1., aber nicht mit Custom Domains)
  - Weitere Links zum Thema:
    - https://stackoverflow.com/questions/43121513/is-there-an-equivalent-to-alias-aname
      - A simple solution to that would be to use another DNS host. For example, I use CloudFlare (the free plan is more than enough
        and offers great features) which uses what is called CName flattening that works with Heroku like having an ALIAS (they use
        this by default - you don't have to do anything else than configuring your nameservers and adding DNS records. You can check
        both Heroku and CloudFlare for tutorials - it's pretty easy).
    - https://freeyourfamily.net/2018/06/strato-cloudflare-serverumzug/
- Alternative 2: Domain-Umleitung per **permanenter Weiterleitung (301 Redirect)**
  - Dazu zunächst testweise auf Strato die dort registrierten Domains bimclick.info, bimclick.net und bimclick.org per 301-Umleitung  
    umgeleitet auf https://bimclick.herokuapp.com
  - Es muss unter Einstellungen (Domain) als externes Umleitungsziel eingegeben werden: https://bimclick.herokuapp.com
    (http://bimclick.herokuapp.com funktioniert auch, Heroku schaltet dann automatisch auf https)
  - Funktioniert! https wird dabei automatisch von Heroku verwendet.
  - ==Nachteil dieser Lösung: Im Browser erscheint nach der Umleitung die URL von Heroku (https://bimclick.herokuapp.com), nicht
    die URL der umgeleiteten Domain, z.B. https://bimclick.info==
  - Dasselbe auf Webhosting Franken mit bim.click enabled: Die URL für die Umleitung kann jeweils eingetragen werden für die
    dortigen Domains bim.click und bimclick.de, aber es erfolgt stattdessen
    eine Weiterleitung nach http://www.kurz-fischer.de
  - Erst nach Leeren des Chrome Browser Caches funktioniert es!
  - ==Damit kann diese Alternative aktuell (eventuell als temporärer Workaround) verwendet werden==

---

#### **[Epic 38.i]** ==**[WORK]**== Baustoffe und deren Verwaltung

- Die bisherige Baustoffverwaltung im Hauptmenü "Baustoffe" in BIM.click ist nur rudimentär implementiert
- Klassifikation der verwalteten Baustoffe
  - Der unter "Baustoffe" in BIM.click angelegte Baustoffbaum ist die Grundlage für die Strukturierung der dort verwalteten
    Baustoffe
  - Die Anlage des Baustoffbaums auf Heroku/MongoDB Cloud Atlas erfolgte bisher nach einem
    von Erik stammenden Word-Dokument, das mit Hilfe des Word-Inhaltsverzeichnisses und
    Clipboard-Übertragung nach Excel übetragen wurde (Baustoffbaum 2020-04-14-fi-ms-nachkorrigiert.xlsx) und von dort per
    Exel-Formeln in JSON (baustoffe-importiert-nach-heroku.json)
    umgewandelt wurde und per BIM.click-Import (Datenaustausch/Import/Baustoffe) importiert wurde
  - In der Dokumentation gibt es einen Abschnitt, der das dort verwendete Gliederungsschema erklärt
- Erfassung von baustoffbezogenen Attributen/Baustoffeigenschaften
  - Konzeptionell können und sollen die Konzepte für Baueigenschaftsprofile und Baueigenschaftsprofilformulare,
    wie sie im Bauvorhabenbaum für Baueinheiten verwendet weden, auch auf Baustoffe im Baustoffbaum
    angewendet werden
  - Allerdings gibt es bisher noch keine spezifischen Baueigenschaftsprofile für Baustoffe (z.B. "Materialeigenschaften") und
    keine entsprechenden Profilformulare
  - Diese müssen in Anlehnung an die Datenblätter bestimmter Baustoffarten erst entworfen und dann
    implementiert werden
- Befüllung/Versorgung mit baustoffbezogenen Stammdaten:
  - Als zukünftige Optionen zur Befüllung oder alternativen Versorung von BIM.click mit
    Baustoff-Stammdaten kommen externe Baustoffdatenbanken
    in Frage, insbesondere solche, deren Inhalte per API auslesbar sind
  - Beispiele für solche Baustoff-Datenbanken/-Plattformen (ohne systematische Analyse und Bewertung von deren Technologie,
    Content und Eignung für eine Integration mit BIM.click):
    - **freebim**
      - Österreichische Initiative
      - Bauteilserver (https://freebim.at) - Server zur Verwaltung von Bauteilen
      - Merkmalserver zur Verwaltung von Baustoffeigenschaften, mit Schnittstellen für
        IFC und bSDD (buildingSmart Data Dictionary)
      - Klassifikationssystem für Baustoffe (https://www.freeclass.eu/)
      - Gastzugang: https://db.freebim.at/#/login
    - **BIMeta**
      - Plattform zur Verwaltung von Klassen und Merkmalen für den offenen BIM-Datenaustausch
      - https://www.bimeta.de/
      - Initiative des Bundesverbands für technische Gebäudeausrüstung (BTGA) mit Beteiligung anderer Verbände
        und der Baustoffindustrie (z.B. Geberit)
      - BIMeta stellt BIM-Profile für Objekte bereit, z.B. für eine Brandschutzklappe. Diese Vorlagen
        beschreiben die Klassifikation und Merkmale des Bauteils. Darauf können u.a. Planer, Hersteller und TGA-Betriebe
        zurückgreifen, um sich bereits in der Ausschreibung auf eine gemeinsame Sprache und Parameter zu verständigen.
      - Die Templates werden u.a. bereitgestellt als:
        - IFC-Dateien (\*.ifcZIP)
        - Excel
        - Verbreitete Planungssoftware: Graphisoft ARCHICAD oder Autodesk Revit
        - Oder via API
      - BIMeta unterstützt auch ein Mapping zwischen verschiedenen Datenelementen (per "Metadatenverzeichnis nach DIN 23386"),
        damit Hersteller ihre Daten auf andere Standards mappen können
      - https://github.com/BIMeta-Steuerkreis/Anwenderhilfe - der BIMeta Ansatz ist softwareseitig noch sehr rudimentär!
      - BIMeta scheint generell ein interessanter Ansatz zu sein, indem man offenbar weniger auf Standardisierung setzt (d.h. eine
        einheitliche Repräsentation aller Daten in einem gemeinsamen/zentralen Schema bzw. digitalen Standard, der so nicht
        existiert), als vielmehr auf ein Mapping zwischen verschiedenen BIM-Daten-Repräsentationen
      - Um ein Bild zu verwenden: Statt die verschiedenen Repräsentationen in ein gemeinsames Esperanto (ein weiterentwickeltes  
        IFC?) zu übersetzen, das alle lernen und irgendwann sprechen, hilft es quasi bei der paarweisen Übersetzung (= "Mapping")
        der verschiedenen Sprachen in andere
      - Allerdings ist aus Informatik-Sicht ein solcher Mapping-Ansatz ohne zentralen digitalen Standard inhärent komplex und mit  
        diversen Skalierungsproblemen behaftet:
        - Mangels zentraler Standards erstellt z.B. im Baustoffbereich jeder Hersteller eigene/andere Property Sets aus nicht
          standardisierten Properties (Attributen)
        - Diese treffen auf ebenfalls oft nicht standardisierte Attribute von Objekten/Elementen in Gebäudemodellen
        - Bei n verschiedenen Teilnehmern (z.B Herstellern, Planern, ...) am Mapping sind ohne zentralen Standard/Broker als
          Mittler für die Übersetzung n hoch 2 Mappings schon alleine durch den Faktor "Anzahl der Teilnehmer" erforderlich
          (nicht lineare Skalierung, dazu kommen noch weitere Skalierungs-Faktoren)
        - Ein weiterer Faktor, der die Skalierung beeinflusst und erschwert, ist, dass z.B. schon ein einzelner Baustoffhersteller
          nicht nur einen Attributsatz benötigt, sondern mehrere Attributsätze (z.B. je nach Baustoffart)
        - Es kommt dabei sogar vor, dass nur für ein einziges Bauteil (Beispiel: IFC-Beispieldatei für Knauf-Metallständerwand) sogar
          mehrere Property Sets mit Ausrichtung auf verschiedene Zielsysteme (Revit, andere) durch denselben Hersteller definiert werden!
      - Für Software-Laien: Eine nicht skalierende Software-Lösung ist eine, die zwar für kleine Teilbereiche funktioniert
        und performant ist, nicht aber für die Gesamt-Domain, die sie im Visier hat
      - Inwieweit das avisierte gemeinsame Metadatenverzeichnis von BIMeta diese Probleme lösen kann, bleibt technisch mangels
        verfügbarer Doku, die über Grundkonzepte hinausgeht, unklar
      - Unabhängig von den skizzierten Skalierungsfragen (d.h. der Anzahl der erforderlichen Mappings in Abhängigkeit der genannten
        Skalierungsvariablen wie Anzahl Teilnehmer, Anzahl Objekte, etc.) ist zu klären,
        wie diese Property Sets im Einzelfall auf Property Sets anderer Hersteller/Systeme gemapped werden, und welche
        Mapping-Regeln im Einzelfall erfasst werden müssen
      - Wie einfach oder komplex dieses Mapping ist, und was die Zielgruppe ist, wer
        solche Mappings erstellen kann (Software-Entwickler, Fachanwender?), ist bisher unklar
      - Zwischenfazit:
        - Der Ansatz von BIMeta klingt vielversprechend und ist ambitioniert - inwieweit die Implementierung von BIMeta
          die Komplexität der Anforderungen und die hochgesteckten Erwartungen erfüllen kann, ist bislang noch unklar
        - Es bleibt wünschenswert und ratsam, dass für bestimmte, klar zu definierende und zu priorisierende Sub-Domains
          innerhalb des quasi unendlich großen BIM-Gesamtuniversums, dieser Mapping-Ansatz erfolgreich ist (Wärmeschutz, Nachhaltigkeit,
          .., ???)
        - Wie eine solche „Partitionierung“ des Lösungsraums aussehen könnte, ist ebenfalls zu überlegen (z.B. über fachliche
          Disziplinen, wie Wärmeschutz, Nachhaltigkeit, ..., oder über Baustoffkategorien)
        - Wenn man auf das Thema „Baustoffbaum“ fokussiert, was ja tatsächlich auch der Fokus von BIMeta ist, macht das einerseits manches potentiell
          einfacher: Zum Beispiel haben wir dort selber für BIM.click ja eigentlich noch gar keine „echten“ Attribute und (z.B. datenblattartige) Masken
          definiert, so dass Metadaten/Attribute eventuell von BIMeta übernehmen können bzw. unsere an deren ausrichten können (sofern dort nicht auch wieder
          ein kompletter Dschungel unabgestimmter Attribute entsteht).
        - Andererseits will man bei den Baustoffen neben den Metadaten (welche Attribute mit welchen Typen hat eine bestimmte Kategorie von Baustoffen)? auch
          dazu passende Instanzdaten importieren (welche Werte haben diese Attribute an realen Baustoffen/Bauprodukten aus dem Katalog vom Hersteller XY?Z),
          so dass sich die Frage stellt, wie die Metadatenverwaltung in BIMeta dann mit realen Baustoffdatenbanken (herstellerspezifisch oder
          herstellerübergreifend) harmoniert und integriert wird.
        - Wie oft ein solcher Baustoffe-Import passieren soll/kann, hängt dann stark davon ab, was die Datenmengen bzw. die Änderungsfrequenzen solcher
          Baustoffdatenbanken sind. Diese sind ja eher groß bzw. häufig, so dass da ein hoher Datenpflegeaufwand anfallen kann, wenn wir versuchen, die
          Baustoffwelt auch in BIM.click vorzuhalten. Der kann uns dann auch schnell über den Kopf wachsen, von der Programmierung her, aber auch von der
          Administration her. Dann kommt man zu dem Wunsch, dass man die Instanzdaten für Baustoffe gar nicht in BIM.click selbst verwaltet, sondern per APIs
          „durchgreift“ mit Hilfe der Baustoff-Metadaten (BIIMeta?) auf die irgendwann hoffentlich dazu passenden Produktdatenbanken.
        - BIMeta definiert dann, welche Metadaten = Attribute man aus einer Baustoffdatenbank abfragen kann, und ein API der Baustoffdatenbank erlaubt es
          dann, die Instanzdaten für diese Metadaten zu holen. Ein zweistufiger Handshake. Theoretisch möglich, aber noch ein weiter Weg, bis die BIM-Welt
          dafür bereit ist.
      - Kontakt: Clemens Schickel, BTGA, clemens.schickel@bhks.org
      - Materialien: Siehe lokaler Ordner MS zu BIMeta (u.a. PDF Intro des Konzepts - Web Anwendung auf Microsoft/Azure-Basis, REST
        API, Aut0-Authentifizierung, dort auch Mapping-Beispiel - Merkmal <> Merkmal und Klasse <> Klasse)
    - **Building Material Scout**
      - GmbH gegründet von Drees & Sommer und HOINKA
      - In Entwicklung und im Aufbau befindliche Bauproduktdatenbank mit API und Portal für Hersteller
      - https://building-material-scout.com/
      - API: https://app.building-material-scout.com/app/swagger/ui/index#/ProductTypeConfigurationsV1
      - Call per Vermittlung von Edit hat stattgefunden im Februar 2021
      - Idee: Wenn wir die entsprechenden Berechtigungen (API Key) von denen bekommen, könnten wir damit
        Baustoffe per von uns zu schreibendem Programmcode aus deren Datenbank „auslesen“ und bei uns
        verwenden. Natürlich gibt es da Hunderte von Detailfragen bzgl. der Datenstrukturen, Attribute etc., aber wenn deren Datenbank gefüllter ist als unsere, ist das für uns eine sehr gute Möglichkeit, unseren Baustoff-Content zu füllen.
      - Stand 2/2021: Ich kann mich täuschen, hab nur ein paar Minuten in das Swagger API
        reingeschaut, aber die sind noch lange nicht auf dem Level einzelner Attribute. Was sie erfassen und ausgeben in ihrer Datenbank bisher sind Listen von Produkten, Anhänge (Dokumente) für die Produkte, Öko-Labels pro Produkt, und ein paar andere Sachen. Ich habe aus diesem Sniff Check den Eindruck, dass sie noch auf den „oberen“ Levels der Baustoffverwaltung sind. Die Baustoffe selber sind bisher nicht weiter „digital zerlegt“ in technische Attrribute, sondern „black Boxes“, es sei denn, ich hab halt was übersehen.
      - Kontakte: Thomas Hoinka, Oliver Donnerhak (?)
      - API Key erhältlich von Ramona Schuster
      - Im Call am 17.02.2021 stellte sich heraus, dass das Konzept bisher sehr herstellerbezogen ist - Hersteller
        spezifizieren ihre eigenen Attribute und verwenden diese für ihre Baustoffe in ihrem Bereich der Datenbank, eine übergreifende Standadisierung ist bisher nicht erkennbar
      - Nur so vordefinierte Attribute können verwendet werden
      - Listen von Attributen sollten uns zur Verfügung gestellt werden
    - **Fraunhofer/DGNB**
      - Kontakte über Edit Ende 2020/Anfang 2021
      - Entwickler: Rafael Horn, Rene Traunspurger
      - Schwerpunkte: Ökobilanzierung, Lifecycle Assessments (LCA)
      - Web-Anwendung (Generis?) in Entwicklung
      - https://www.ibp.fraunhofer.de/de/kompetenzen/ganzheitliche-bilanzierung/methoden-ganzheitliche-bilanzierung/generis-online-software.html
      - https://www.generis-solution.eu/
      - Handbuch: https://generis-public.s3.eu-central-1.amazonaws.com/Generis_Handbuch.pdf
      - Schnittstellen (IFC, IFCXML - XSD ist noch unvollständig, JSON ebenfalls vorgesehen)
    - **BIMsystems**
      - Öffentliche Webkonferenz am 06.07.2021
      - Stuttgarter Softwarehaus (https://www.bimsystems.de)
      - Software: waya - eine Cloud-basierte Plattform, u.a. für
        Hersteller von Baustoffen, genutzt z.B. von Saint Gobain und Solarlux, mit Plugin zur
        Übertragung der Baustoffdaten nach Revit u.a. CAD-Systemen, die in deren Cloud
        gehosteten Daten sind allerdings vermutlich nicht öffentlich zugänglich

---

#### **[Epic 38.j]** Text Search in MongoDB

- Verschoben nach Epic #48

---

#### **[Epic 38.k]** **[DONE]** Algorithmus für Backlog Item #339 (Profildeaktivierung im Elternpfad, beim Löschen und Verschieben von Zweigen im Bauvorhabenbaum, sowie beim Deaktivieren von Profilen selbst)

==**Update 28.08.2021**==: Der unten entworfene Algorithmus wurde von Stefan mit einigen Modifikationen und Varianten implementiert als
Teil von #339:

- Beim Deaktivieren eines Profils in baueigenschafts-profile-aktivierungs-logik.js,
  deaktiviereBaueigenschaftsProfilAufElternPfadVersion0821(),
  mit Wrapper-Methode deaktiviereBaueigenschaftsProfilAnBaueinheitVersion0821() (ersetzt deaktiviereBaueigenschaftsProfilAnBaueinheit()),
  sowie deren Aufruf in baueinheiten-controller.updateAktivierungsZustandBaueigenschaftsProfilAnBaueinheit()
  - Dort wird der Algorithmus nur für das eine zu deaktivierende Profil ausgeführt, im Elternpfad aufwärts des Knotens, an dem dieses
    Profil deaktiviert wird
- Beim Löschen in baueinheiten.controller.js, deleteKnotenUndKindKnotenBaueinheit()
  - Dort wird der Algorithmus für alle am Wurzelknoten des zu löschenden Zweigs aktivierten Profile ausgeführt, im Elternpfad aufwärts
- Beim Verschieben von Zweigen, baueinheiten.controller.js, bezwegeZweigBaueinheit()
  - Dort selbe Logik wie beim Löschen, für den Wurzelknoten des zu bewegenden Zweigs

```javascript
// Initiales Design für den Profildeaktivierungs-Algorithmus beim Löschen eines Knotens, hier am Beispiel des Profils "Baueinheit > Raum":
//---------------------------------------------------------------------------------------------------------------------------------
//   ACHTUNG: Dieser Algorithmus musste für andere Profile als "Baueinheit > Raum" entsprechend verallgemeinert werden!
//            Dabei muss potentiell eine bestimmte Profilhierarchie vorausgesetzt werden
//   UPDATE:  Bei der Implementierung stellte sich dann heraus, dass die Profildeakivierung an Elternknoten im Elternpfad
//            doch völlig unabhängig von bestimmten Profilhierarchien implementiert werden konnte!
//            Die Profildeaktivierung im Elternpfad wurde in der finalen Implementierung für alle am betreffenden Knoten
//            aktivierten Profile (im Beispiel für einen gelöschten Raum mit Bodenaufbau also für die dort aktivierten Profile
//            "Baueinheit > Raum", "Baueinheit > Bodenaufbau" und "Baueinheit > Schicht") gleichermaßen durchgeführt! Betroffene Stellen sind markiert mit #339.
//   ACHTUNG: #339/38.k ist bisher nur implementiert in baueinheiten.controller.js, nicht in baustoffe.controller.js!
//   ACHTUNG: Varianten der Funktion müssen auch nach dem Verschieben eines Zweigs aufgerufen werden, für den Elternknoten
//            des Wurzelknotens des verschobenen Zweigs, sowie bei einer einzelnen Profildeaktivierung an einem Knoten
//---------------------------------------------------------------------------------------------------------------------------------
//   BEISPIELE FÜR DIE PROFILHIERARCHIE (in der finalen Implementierung nicht verwendet!):
//            Für "Baueinheit > Raum" ist "Elternprofil" "Baueinheit > Geschoss", für "Baueinheit > Geschoss" ist Elternprofil "Baueinheit > Gebäude", usw.
//            Für "Baueinheit > Raum" ist "Kindprofil" "Baueinheit > Bodenaufbau", für "Baueinheit > Bodenaufbau" ist Kindprofil "Baueinheit > Schicht" - künftig hier noch weitere Profile!
//            Dies sollte in einer zu entwerfenden JS-Datenstruktur verwaltet werden, aus der die möglichen Eltern-Kind-Beziehungen zwischen
//            den Profilen bestimmt werden können ("Profil-Metamodell")
//            Der Algorithmus sollte dann in eine Funktion gepackt werden, die die Profilbezeichnung (hier "Baueinheit > Raum") als Parameter
//            erhält, und mittels der genannten Datenstruktur dann die richtigen Aktionen auslöst (ein zweiter Parameter ist vermutlich
//            der Elternknoten des gelöschten Knotens). Diese Funktion würde dann nach dem Löschen eines Knotens für das oder die an dem Knoten als
//            unterste(s) aktiviertes/n Profil(e) aufgerufen werden. Alternativ könnte die Funktion auch für alle
//            am Wurzelknoten des gelöschten oder verschobenen Zweigs aktivierten Profile aufgerufen werden (d.h. mit dem dortigen
//            Array zugeordneteBaueigenschaftsProfile, der die an diesem Knoten aktivierten Profile enthält, sowie auch
//            das Flag "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" für jedes Profil). Dann müsste sie selber durch diese Profile iterieren
//            und jedes davon rekursiv ggf. im Elternknoten deaktivieren, falls es auf dessen Ebene keine
//            Geschwisterknoten gibt, an denen das iterierte Profil aktiviert ist.
//   ACHTUNG: Insbesondere auf den oberen Ebenen im Bauvorhabenbaum kann es Spezialfälle geben, da dort ggf. mehrere Profile am selben
//            Knoten aktiviert sein können ("Baueinheit > Bauvorhaben", "Baueinheit > Standort", "Baueinheit > Gebäude", evtl. auch an weiteren - bisher nicht definitiv festgelegt)
//   HINWEIS: Diese JS-Datenstruktur könnte künftig auch im Frontend verwendet werden, um dort z.B. profilspezifische Kontextmenüs zu steuern
//   AUFBAU:  Startpunkt für diese JS-Datenstruktur ist die heute implementierte Hierarchie:
//            ["Baueinheit > Bauvorhaben", "Baueinheit > Standort", "Baueinheit > Gebäude", "Baueinheit > Geschoss", "Baueinheit > Raum", "Baueinheit > Bodenaufbau", "Baueinheit > Schicht"]
//            Dieser Array zeigt an, in welcher Reihenfolge ggf. Profile aktiviert sein können
//            Die Bedeutung ist ebenfalls mit zu definieren, z.B.:
//            - Ein Standort darf an oder unter einem Bauvorhaben aktiviert werden
//            - Ein Gebäude darf an oder unter einem Standort (oder Bauvorhaben) aktiviert werden
//            - Dabei muss mit überlegt werden, ob alle Profile immer obligatorisch aktiviert werden müssen (dies wird bisher nicht enforced)
//            Unterhalb von "Baueinheit > Gebäude" soll es künftig allerdings noch weitere alternative "Kindprofile" geben ("Fassade", "Dach", etc.)
//            Unterhalb von "Baueinheit > Raum" soll es künftig ebenfalls noch weitere alternative "Kindprofile" geben ("Wandaufbau", etc.)
//            Wie könnte also eine geeignete Datenstruktur für diesese "Profil-Metamodell" aussehen?
//            Diese müsste einen Mix von Hierarchien und Alternativen repräsentieren, z.B.:
//            bauvorhabenProfilHierarchie:          ["Baueinheit > Bauvorhaben", "Baueinheit > Standort", "Baueinheit > Gebäude"],
//            Stattdessen könnte man diese Zeile auch so ausdrücken (konsistenter mit den folgenden Zeilen)
//               bauvorhabenKindProfilAlternativen: ["Baueinheit > Standort"],
//               standortKindProfilAlternativen:    ["Baueinheit > Gebäude"],
//            gebaeudeKindProfilAlternativen:       ["Baueinheit > Geschoss", "Fassade", "Dach"], // Vorläufig
//            geschossKindProfilAlternativen:       ["Baueinheit > Raum", "Treppe"],              // Vorläufig
//            raumKindProfilAlternativen:           ["Baueinheit > Bodenaufbau", "Baueinheit > Wandaufbau"],   // Vorläufig
//            bodenaufbauKindProfilAlternativen:    ["Baueinheit > Schicht"],                     // Vorläufig
//            wandaufbauKindProfilAlternativen:     ["Baueinheit > Schicht", "Baueinheit > Fenster", "Baueinheit > Tür"],   // Vorläufig
//   FRAGE:   Sollte man diese Informationen auch in eine einzige, kompaktere Datenstruktur packen?
//            Dies könnte z.B. ein 2-dimensionaler oder auch ein verschachtelter Array sein:
//            Bauvorhaben   Standort   Gebäude   Geschoss
//                                                          Raum
//                                                                      Bodenaufbau
//                                                                                      Schicht
//                                                                      Wandaufbau
//                                                                                      Schicht
//                                                                                      Fenster
//                                                                                      Tür
//                                                          Treppe
//                                               Fassade
//                                               Dach
//   FRAGE:   Sollen zusätzliche Strukturierungsknoten im Profil-Metamodell vorgesehen werden (z.B. Gebäudeteile)?
//----------------------------------------------------------------------------------------------------------------------------------------
//   HINWEIS: Man könnte folgende weitere "abgeleitete" Kindeskind-Daten vorhalten, um die darauf arbeitenden Algorithmen effizient zu implementieren:
//   const    bodenaufbauKindUndKindeskindProfile = ["Baueinheit > Schicht"];
//   const    wandaufbauKindUndKindeskindProfile: ["Baueinheit > Schicht", "Baueinheit > Fenster", "Baueinheit > Tür"];
//   const    raumKindUndKindeskindProfile: ["Baueinheit > Bodenaufbau", "Baueinheit > Wandaufbau", "Baueinheit > Schicht", "Baueinheit > Fenster", "Baueinheit > Tür"];
//   const    geschossKindUndKindeskindProfile: ["Baueinheit > Raum", "Baueinheit > Treppe", "Baueinheit > Bodenaufbau", "Baueinheit > Wandaufbau", "Baueinheit > Schicht", "Baueinheit > Fenster", "Baueinheit > Tür"];
//   const    gebaeudeKindUndKindeskindProfile: ["Baueinheit > Geschoss", "Baueinheit > Fassade", "Baueinheit > Dach", "Baueinheit > Raum",  "Baueinheit > Treppe", "Baueinheit > Bodenaufbau", "Baueinheit > Wandaufbau", "Baueinheit > Schicht", "Baueinheit > Fenster", "Baueinheit > Tür"];
//   const    standortKindUndKindeskindProfile: ["Baueinheit > Gebäude", "Baueinheit > Geschoss", "Baueinheit > Fassade", "Baueinheit > Dach", "Baueinheit > Raum",  "Baueinheit > Treppe", "Baueinheit > Bodenaufbau", "Baueinheit > Wandaufbau", "Baueinheit > Schicht", "Baueinheit > Fenster", "Baueinheit > Tür"];
//   const    bauvorhabenKindUndKindeskindProfile: ["Baueinheit > Standort", "Baueinheit > Gebäude", "Baueinheit > Geschoss", "Baueinheit > Fassade", "Baueinheit > Dach", "Baueinheit > Raum",  "Baueinheit > Treppe", "Baueinheit > Bodenaufbau", "Baueinheit > Wandaufbau", "Baueinheit > Schicht", "Baueinheit > Fenster", "Baueinheit > Tür"];
//            Dieser Array könnte in dem folgenden Algorithmus direkt verwendet werden, weitere Arrays sind dabei vermutlich gar nicht
//            erforderlich, da im Code nur das betreffende aktivierte Profil (hier "Baueinheit > Raum") und diese Kindeskindprofile benötigt werden,
//            keine Elternprofile!
//--------------------------------------------------------------------------------------------------------------------------------------
//   HINWEIS: Elegantere Deklaration der Kindeskind-Profilstrukturen per JS-Spread-Operator:
//   const    bodenaufbauKindUndKindeskindProfile: ["Baueinheit > Schicht"];
//   const    wandaufbauKindUndKindeskindProfile: ["Baueinheit > Schicht", "Baueinheit > Fenster", "Baueinheit > Tür"];
//   const    raumKindUndKindeskindProfile: ["Baueinheit > Bodenaufbau", "Baueinheit > Wandaufbau", ...wandaufbauKindUndKindeskindProfile];
//   const    geschossKindUndKindeskindProfile: ["Baueinheit > Raum", "Baueinheit > Treppe", ...raumKindUndKindeskindProfile];
//   const    gebaeudeKindUndKindeskindProfile: ["Baueinheit > Geschoss", "Baueinheit > Fassade", "Baueinheit > Dach", ...geschossKindUndKindeskindProfile];
//   const    standortKindUndKindeskindProfile: ["Baueinheit > Gebäude", ...gebaeudeKindUndKindeskindProfile];
//   const    bauvorhabenKindUndKindeskindProfile: ["Baueinheit > Standort", ...standortKindUndKindeskindProfile];
// KOMMMENTAR: Die aktivierten Kindeskindprofile wären bzw. sind auch aus dem gelöschten Knoten auslesbar. Allerdings benötigt der
//             Profildeaktivierungs-Algorithmus unten diese auch für Geschwisterknoten, so dass performance-mäßig eine Implementierung mit
//             obigen statisch festgelegten Kindeskind-Arrays besser sein müsste als eine häufige dynamische DB-Abfrage. Andererseits
//             ist eine Implementierung, die nicht auf den obigen Hierarchie-Konventionen beruht allgemeingültiger und funktioniert auch
//             auf allen, per Kontextmenü oder per Admin-Funktion aktivierten und deaktivierten Profilen gleichermaßen!
//--------------------------------------------------------------------------------------------------------------------------------
// HINWEISE zur potentiellen Deaktivierung von Baueigenschaften im Profil im Elternpfad (verworfen!)
// Es gibt auch "gemeinsame" BEgs, die zu mehreren Profilen gehören. Beispiel: BEg1 gehört zum Standort und zum Gebäude. Wenn dann ein
//           Knoten mit aktiviertem Profil "Baueinheit > Gebäude" unter einem für "Standort" mit entsprechendem Profil vorhanden ist, und man deaktiviert
//           das Profil "Baueinheit > Gebäude" an dem unteren Knoten - wenn man dann rekursiv diese BEg1 auch im Elternpfad deaktivieren würde, würde
//           das Profilformular "Standort" nicht mehr funktionieren. Schon aus diesem Grund können wir BEgs, selbst wenn wir Profile im
//           Elternpfad "deaktivieren", d.h. aus dem Array zugeordneteProfile austragen, am Elternpfad nicht deaktivieren. Das
//           ist in der heutigen Profildeaktivierungs-Funktion auch so implementiert, diese deaktiviert BEgs nur am betroffenen Knoten selbst,
//           abschaltbar über Parameter, sowie an deren Kindern und Kindeskindern.
//           Zusätzlich dürften BEgs im Elternpfad auch nur dann deaktiviert werden, wenn es keine Geschwisterkinder
//           gibt, an denen sie aktiviert sind (aufwendige Prüfung).
//           Für die Funktion hier heisst das also, dass sie auch keine BEgs im Elternpfad deaktivieren sollte.
//           Sie soll nur die Profile ggf. "austragen"aus den Arrays nach der unten beschriebenen Logik und die Flags
//           "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" aktualisieren.
//--------------------------------------------------------------------------------------------------------------------------------------
// ACHTUNG: "Baueinheit > Raum" steht hier stets auch für andere Profile, inklusive Nutzungsprofilvarianten von "Baueinheit > Raum" ("Baueinheit >> Raum > ..")!
//          Die finale Implementierung der Funktion funktioniert für alle Profile, inklusive der Varianten von
//          Raumnutzungsprofilen ("Baueinheit > Raum > ...")!
//--------------------------------------------------------------------------------------------------------------------------------------
// Algorithmus für die Funktion:
// HINWEIS 1: Die "Kind- und Kindeskindprofile" im Pseudocode unten (im Beispiel für "Baueinheit > Raum") ergeben sich aus den oben deklarierten statischen Arrays.
// Siehe aber den Kommentar dazu oben, dass die aktivierten Profile alternativ bzw. besser die am betreffenden "Startknoten"
// (d.h. der Wurzelknoten des zu löschenden oder zu verschiebenden Zweigs) entnommen werden können, und dann im
// im Elternpfad aufwärts, startend am "Startknoten" selbst auf jeder Ebene stets diese selben Profile geprüft werden, ob sie am
// Elternknoten deaktviert werden sollen (abhängig davon ob es Kindknoten auf dieser Ebene gibt, an denen dasselbe Profil aktiviert
// ist, oder nicht.
// HINWEIS 2: In der echten Implementierung entfielen die im Pseudocode enthaltene Aktualisierungen der Flags
// "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" komplett,
// denn wenn ein Profil verbleibt, weil es nicht deaktiviert werden darf (eben weil es noch Kinder gibt, an denen es aktiviert ist) kann
// es nicht schon unterster Knoten sein und auch nicht werden. Wenn andernfalls das betreffende Profil deaktiviert wird, wird es aus dem
// Array entfernt und braucht damit sowieso keine Aktualisierung seines Flags. Es brauchen also gar keine Aktualisierungen
// der ggf. verbleibenden Flags im Array zugeordneteBaueigenschaftsProfile im Elternpfad!
// PSEUDOCODE:
// Wenn nach dem Löschen oder Verschieben eines Knotens mit aktiviertem Profil "Baueinheit > Raum" keine Geschwisterknoten dieses Knotens mit demselben aktivierten Profil "Baueinheit > Raum" mehr vorhanden sind:
//   Deaktiviere dieses Profil "Baueinheit > Raum" am Elternknoten ("Geschoss")
//   Setze Flag "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" für Profil "Baueinheit > Raum" an diesem Elternknoten auf false (ist sonst "true" per Test nach dem Löschen im heutigen Code!)
//   Deaktiviere die "Kind- und Kindeskindprofile" am Elternknoten (bisher sind das für "Baueinheit > Raum" die Profile "Baueinheit > Bodenaufbau" und "Baueinheit > Schicht", künftig noch weitere)
//   Setze Flag "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" für Profile "Baueinheit > Bodenaufbau" und "Baueinheit > Schicht" an diesem Elternknoten auf false (diese sind sonst "true" per Test nach dem Löschen im heutigen Code, aber nur für Profile, die fälschlich im Elternpfad verbleiben!)
//   Iteriere über alle Knoten im Elternpfad (beginnend beim Elternknoten des gelöschten Knotens bis hoch zum Wurzelknoten des Bauvorhabenbaums)
//     Wenn keine Geschwisterknoten des Elternknotens vorhanden sind (d.h. im ersten Durchlauf keine anderen Geschosse):
//        Deaktiviere dieses Profil "Baueinheit > Raum" am Großelternknoten (d.h. im ersten Durchlauf am "Gebäude")
//        Setze Flag "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" für Profil "Baueinheit > Raum" an diesen Knoten sicherheitshalber auf false (sollte aber schon "false" sein)
//        Deaktiviere die "Kind- und Kindeskindprofile" am Großelternknoten (bisher sind das "Baueinheit > Bodenaufbau" und "Baueinheit > Schicht")
//        Setze Flag "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" für "Kind- und Kindeskindprofile" am Großelternknoten auf false (sollte aber schon "false" sein)
//     andernfalls (Geschwisterknoten des Elternknotens vorhanden)
//        Wenn an keinem dieser Geschwisterknoten (d.h. im ersten Durchlauf anderen Geschossen) das Profil "Baueinheit > Raum" aktiviert" ist
//          (d.h. es gibt im ersten Durchlauf auch kein anderes Geschoss mit Räumen mehr)
//          Deaktiviere dieses Profil "Baueinheit > Raum" am Großelternknoten (d.h. im ersten Durchlauf am "Gebäude")
//          Setze Flag "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" für Profil "Baueinheit > Raum" an diesen Knoten sicherheitshalber auf false (sollte aber schon "false" sein)
//          Deaktiviere die "Kind- und Kindeskindprofile" am Großelternknoten (bisher sind das "Baueinheit > Bodenaufbau" und "Baueinheit > Schicht")
//          Setze Flag "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" für "Kind- und Kindeskindprofile"" am Großelternknoten auf false (sollte aber schon "false" sein)
//        andernfalls nichts zu tun
// andernfalls (noch andere Geschwisterknoten mit "Nachbarräumen" in diesem Geschoss vorhanden)
//   Nichts zu tun
//   ACHTUNG: Diese können Bodenaufbauten und Schichten enthalten oder auch nicht, deren Profile bleiben im Elternpfad unberührt
//------------------------------------------------------------------------------------------------------------------------------
```

---

#### **[Epic 38.m]** ==**[WORK]**== Baustoffbaum-Design (Charakter, Struktur, Baueigenschaften, Profile, Aktivierung)

- Der Baustoffbaum hat zwar strukturell denselben Aufbau und gehorcht denselben Aktivierungs- und Vererbungsregeln wie der Bauvorhabenbaum, aber weist teilweise andere "Charaktereigenschaften" bzw. Nutzungsmuster auf:
- Kindknoten im Baustoffbaum repräsentieren strukturelle **Spezialisierungen** ihrer Elternknoten
- Wie im Bauvorhabenbaum sind die an einem Kindknoten aktivierten Baueigenschaften stets eine **Untermenge** der am Elternknoten
  aktivierten Baueigenschaften
- Beispiel: Elternknoten ist "Bodenbeläge", Kindknoten sind "Fliesen" und "Holzbeläge"
  - Die Kindknoten "Fliesen" und "Holzbeläge" sind Spezialisierungen ihres Elternknotens "Bodenbeläge"
  - Dann sind am Elternknoten alle Baueigenschaften aktiviert, die an den beiden Kindknoten aktiviert sind, d.h.
    alle Baueigenschaften für "Fliesen" und für "Holzbeläge" (dies muss gemäß BIM.click Aktivierungsregel immer so sein)
  - Am Kindknoten "Fliesen" sollten die für "Fliesen" spezifischen Baueigenschaften aktiviert sein und die für "Holzbeläge" spezifischen
    Baueigenschaften deaktiviert sein
  - Am Kindknoten "Holzbeläge" sollten die für "Holzbeläge" spezifischen Baueigenschaften aktiviert sein und die für "Fliesen"
    spezifischen Baueigenschaften deaktiviert sein
  - Dabei wird es auch für beide Kindknoten gültige und damit an beiden Kindknoten aktivierte **gemeinsame** Baueigenschaften geben
- (1) Der erste Unterschied zum Bauvorhabenbaum besteht somit darin, dass im Baustoffbaum
  **an Geschwisterknoten unterschiedliche Baueigenschaften und Baueigenschaftsprofile aktiviert sein können**
  (was im Bauvorhabenbaum gemäß der dort etablierten üblichen Profilmodellierungskonvention vom
  "Bauvorhaben" über "Standort", "Gebäude", usw., absteigend bis zu "Schichten" so normalerweise nicht vorkommt)
  - Eine Herausforderung daraus ist, dass, wenn man bei jeder Verzweigung auch unterschiedliche Baueigenschaften und Profile
    definieren würde, man eine insgesamt viel zu große Anzahl von Profilen und Profilformularen zu entwickeln und zu verwalten hätte!
  - Es wird auch design-mäßig praktisch unmöglich sein, jedem Strukturierungsknoten im Baustoffbaum individuell einen genau definierten
    Satz von darunter relevanten Baueigenschaften eindeutig zuzuordnen und ein entsprechendes Profil genau dafür zu definieren!
  - Selbst wenn man dies anstreben würde, wären dann durch die enge Verkopplung der Struktur des Baums mit den Profilen Änderungen im
    Baustoffbaum sehr komplex und würden sehr wahrscheinlich sogar die Definition neuer, passender Profile notwendig machen!
  - Es gilt also dabei also, trotz der vielen Knoten zur Strukturierung eine "vernünftige" Anzahl von Profilen zu definieren,
    vermutlich an Strukturknoten ab der zweiten oder dritten Ebene im Baustoffbaum, und diesen die jeweils passenden Baueigenschaften zuzuordnen. Diese Profile wären dann gültig für alle Unterknoten im betreffenden Zweig bis zu den Blattknoten.
- (2) Der zweite Unterschied besteht darin, dass
  **alle Baueigenschaften im Baustoffbaum im Pfad üblicherweise bis zu bestimmten Blattknoten hinunter aktiviert sein müssen**
  (weil dort Bauprodukte mit diesen Baueigenschaften definiert werden sollen), allerdings
  nur in den Unterzweigen, in denen sie im Sinne von (1) relevant sind, nicht aber in Geschwisterzweigen. Im Bauvorhabenbaum
  werden dagegen viele Baueigenschaften (z.B. im Profil "Baueinheit > Standort") an Kindbaueinheiten deaktiviert, weil sie dort nicht
  benötigt werden (außer es handelt sich um gemeinsame Baueigenschaften in mehreren Profilen).
- Insofern **unterscheiden sich die Nutzungsmuster** erheblich voneinander.
- Es sind deshalb für bestimmte im Bauvorhabenbaum bereits vorhandene Mechanismen und Funktionen spezielle
  **Anpassungen im Baustoffbaum** notwendig:
  - Zum Beispiel wäre für Baustoffe wegen (2) eine **neue Variante der Profilaktivierung**, die die dem
    Profil zugeordneten Baueigenschaften **"transitiv" auch an den Kind- und Kindeskindknoten aktiviert**, sinnvoll, eventuell auch eine
    transitive Aktivierung dieses speziellen Profils an diesen. Sonst müsste an jedem einzelnen Blattknoten manuell oder automatisch
    das passende Profil aktiviert werden, was vermutlich ein administrativer Albtraum wäre.
  - Das **Flag "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst"**, das im Bauvorhabenbaum verwaltet wird, wird im Baustoffbaum so offensichtlich
    ==**nicht gebraucht**==, weil Profilformulare auf jeden Fall stets bzw. auch an Blattknoten angezeigt werden müssen, und,
    wenn dafür Profile wie im Bauvorhabenbaum verwendet werden, diese deshalb bis zu den Blattknoten hinunter
    aktiviert werden müssen (eventuell könnte dies, wie oben erwähnt, schon ab der höheren Ebene transitiv erfolgen).
  - Es muss eventuell durch andere Flags ersetzt werden, abhängig davon, wie die Profile und die Muster für die Profilaktivierung im
    Baustoffbaum aussehen werden, und wie zugehörige Profilformulare angesteuert werden sollen.
  - Zusammen mit den unten erwähnten speziellen Baustoffprofilen wäre dafür eventuell ein quasi komplementäres Flag
    ==**""baueigenschaftsProfilIstAmKnotenTransitivAktiviert""**==
    sinnvoll, das an allen Knoten im Zweig auf "true" gesetzt wird, in dem ein solches spezielles Baustoffprofil transitiv abwärts
    aktiviert wird.
    - ==Mit diesem Flag könnte gesteuert werden, ab welcher Ebene ein spezifisches Profilformular für dieses spezielle Baustoffprofil angezeigt wird.==
      Wird dieses dann auf einer höheren Ebene als an einem Blattknoten angezeigt, könnten damit Werte für Baueigenschaften eingetragen
      werden, die gemäß Vererbungsregel dann im gesamten Zweig bis hin zu den Blattknoten gelten - diese würden, am Besten nach einer
      Warnmeldung vor dem Speichern, vorhandene Werte in Kind- und Kindeskindknoten gemäß Vererbungsregel überschreiben.
    - ==Dieses Flag würde bei der Suche im Baustoffbaum auch dazu verwendet, zu identifizieren, in welchem Zweig
      gesucht wird (z.B. würde nach Estrichen dann nur in dem Zweig gesucht werden, an dessen Wurzelknoten dieses Flag
      gesetzt ist).==
    - ==**Hinweise**== dazu:
      - Dieses Flag wäre wie erwähnt hilfreich für die Identifikation von "Startknoten" für die Suche/Filterung im Baustoffbaum, in Abhängigkeit
        von Profilen
      - Dieses Flag hätte aus Profilformular- und Kontextemenü-Sicht vermutlich keine höchste
        Priorität, da über ein generisches Profilformular, falls erforderlich, ebenfalls Werteeingaben an beliebigen
        Verzweigungsknoten im Pfad möglich wären.
      - Eventuell könnte zunächst auch ==ganz auf dieses Flag verzichtet werden==, wenn z.B. durch Kontextmenüs sichergestellt wird, das
        ab bestimmten Ebenen im Baustoffbaum abwärts in einem Zweig nur noch **ein einziges** Profil aktiviert ist (dafür müsste
        das Kontextmenü für das Aktivieren von Baustoffprofilen an Knoten, an denen bereits ein Profil aktiviert ist, disabled werden).
        Dann könnte die Logik an solchen Knoten im Baustoffbaum, an denen nur ein Profil aktiviert ist, das unten weiter detaillierte semi-generische
        Profilformular für genau dieses Profil anzeigen (mittels der Profilbezeichnung würden dann die für genau dieses Profil relevanten Tabs angesteuert, d.h. enabled werden, gemäß dessen Layout File). An Knoten weit oben im Elternpfad, an denen
        mehrere Baustoffprofile aktiviert sind, würde dasselbe semi-generische Profilformular angezeigt werden, allerdings
        wären dort je nach Implementierung alle Tabs oder die Vereinigungsmenge der zugeordneten Tabs aller dort aktivierter Profile enabled. Deshalb sollte dort vor dem Speichern eine **Warnung** erscheinen, dass
        ggf. geänderte Werte an sämtliche Kind- und Kindeskindknoten vererbt werden.
      - In einer Ausbaustufe könnte dieses semi-generische Profilformular auch sämtliche am Knoten aktivierten Profile
        aus selectedNode (Property am Profilformular) auslesen, und damit dann die
        Vereinigungsmenge der diesen Profilen zugeordneten Tabs anzeigen bzw. enablen (siehe unten).
      - In dem Fall, dass an einem Knoten weiter oben im Elternpfad bereits Werte von aktivierten Baueigenschaften eingetragen wurden,
        aber dennoch an Kind- oder Kindeskindknoten (inklusive Blattknoten) andere Werte per Profilformular eingetragen werden sollen, würde das in #516 beschriebene Feature "Wert trotz Vererbung eintragen" helfen.
  - Überlegungen bzgl. der **Profilformulare** im Baustoffbaum:
    - Generell gilt: Wenn Werte auch an
      **Strukturknoten (d.h. Verzweigungsknoten)** im Baustoffbaum definiert werden sollen (was für die Datenkonsistenz sinnvoll
      erscheint), müssen auch dort
      passende Profilformulare angezeigt werden - an Blattknoten sowieso (im Sinne von Baustoffdatenblättern).
    - Mögliche Einstiegslösung bzgl. der **Profilformulare**:
      - **An Strukturknoten auf oberen Ebenen im Baustoffbaum** zunächst nur **generische Profilformulare**
        anbieten, die eine Eingabe der dort aktivierten Baueigenschaften für Administratoren erlauben.
      - An Strukturknoten ab der zweiten ode dritten Ebene bis hin zu den Blattknoten im jeweiligen Zweig könnte es dabei
        **spezifische Profilformulare** geben, die auf reguläre Benutzer
        zugeschnitten sind, und fachlich genau die Eigenschaften anzeigen, die im betreffenden Zweig bis zu dessen Blattknoten aktiviert
        sind.
    - ==Bessere Variante bzgl. der **Profilformulare**==:
      - Zunächst nur **ein gemeinsames, generisches Profilformular** im gesamten Baustoffbaum anbieten,
        das allerdings auch mit ggf. in bestimmten Unterzweigen deaktivierten Baueigenschaften umgehen können müsste (deren Felder müssten
        disabled werden oder sogar ganz "ausgeblendet" werden - siehe das verfeinerte Design dafür weiter unten)
      - Später könnten dann auch **spezifische Profilformulare** für diese Profile implementiert werden.
  - Überlegungen bzgl. der **Profile** im Baustoffbaum:
    - Die im Baustoffbaum verwendete **Baustoffprofile** würden die an bestimmten
      Strukturknoten relevanten Baueigenschaften zusammenfassen ("Estricheigenschaften", "Betoneigenschaften"), um diese dann selektiv
      in passenden Unterzweigen **transitiv zu aktivieren** (nicht aber in Geschwisterzweigen).
    - In diesen Baustoffprofilen ist allerdings mit vielen **gemeinsamen Baueigenschaften** zu rechnen, die mehreren solchen Profilen zugeordnet
      sind. Siehe die weiteren Überlegungen dazu weiter unten in diesem Epic.
    - Diese Baustoffprofile würden wegen ihrer transitiven Aktivierungswirkung auf Baueigenschaften bezüglich ihrer
      **Verwendungsmuster** anders benutzt werden als die
      die bisher bekannten Profile für Baueinheiten. So wäre für sie eine spezielle **neue Aktion** sinnvoll
      **"Profil xyz am Baustoff und allen Kindbaustoffen (transitiv) aktivieren"** (mit entsprechendem **Kontextmenü**).
      - Bei dieser Aktion könnte auch das
        erwähnte Flag **"baueigenschaftsProfilIstAmKnotenTransitivAktiviert"** an diesem Knoten und dessen Kind- und Kindeskindknoten gesetzt werden.
      - **Exklusiv** wäre dieses neue Flag zusätzlich dann, wenn ab diesem Knoten an allen Kind- und Kindeskindknoten
        **nur jeweils ein solches Profil**
        aktiviert wäre (was von der Funktion für obige neue Aktion im Kontextmenü sichergestellt werden müsste). An Knoten im Elternpfad
        aufwärts wären dagegen implizit sowohl dieses Profil als auch potentiell weitere Profile (von Geschwisterknoten) aktiviert. Ob
        dieses Flag
        nur im Baustoffbaum oder in allen Bäumen gesetzt und verwaltet würde, ist bei der Implementierung zu entscheiden. Wegen
        der gemeinsamen Aktivierungslogik zwischen beiden Bäumen ist es wahrscheinlich sinnvoll, dieses Flag in beiden Bäumen
        zu verwalten.
      - ==**Achtung**: Dieses neue Flag müsste auch bei Operationen im Baum (Einfügen, Löschen, Bewegen)
        entsprechend aktualisiert werden, ähnlich wie es heute für das Flag "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" bereits implementiert ist.==
    - Eine weitere Aktion mit entsprechendem Kontextmenü im Baustoffbaum wäre dann **"Kindknoten anlegen mit selbem Profil"** (wie der
      Knoten, auf dem das Kontextmenü arbeitet, angenommen, dieses wäre dort exklusiv aktiviert). Damit könnten z.B. feinere Verzweigungen
      oder Blattknoten im Baustoffbaum eingefügt werden.
    - Allerdings müsste dann überprüft werden, ob es dabei weiterhin sinnvoll ist, bei einer herkömmlichen
      Profilaktivierung im Bauvorhabenbaum ein Baueinheitsprofil im gesamten Elternpfad als aktiviert in den Array der
      zugeordneten Profile einzutragen. Eventuell könnte man dann statt allgemeiner Baueigenschaftsprofile
      künftig einerseits spezielle **Baueinheitsprofile** verwalten, deren Baueigenschaften nur im Elternpfad aufwärts aktiviert sind, und
      daneben separate **Baustoffprofile**, deren Baueigenschaften (in dem Zweig, in dem diese aktiviert werden) sowohl im Elternpfad
      aufwärts aktiviert sind, als auch an allen Knoten in diesem Zweig. Wenn diese nur jeweils an einem Knoten als aktiviert
      eingetragen würden, könnten so die Flags "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" und "baueigenschaftsProfilIstAmKnotenTransitivAktiviert" eventuell sogar ganz entfallen. Allerdings
      wäre dies ein relativ invasiver Eingriff in die bisherige Implemntierung für Baueigenschaftsprofile und deshalb vermutlich nicht
      die bevorzugte Lösung.==
    - Oben wurde bereits eine Einschränkung bzgl. der **Anzahl solcher aktivierter Baustoffprofile** an einem
      Knoten angenommen ("exklusiv" = maximal eines ist aktiviert von bestimmmten Ebenen an abwärts), was die Verwaltung vereinfacht.
      Wenn man später trotzdem spezielle, "maßgeschneiderte" Profilformulare für bestimmte Knnoten haben möchte, müsste man dafür
      entsprechend weiter unten
      im Baustoffbaum zusätzliche spezielle Baustoffprofile definieren und sie dort selektiv an Knoten aktivieren. Solange
      solche Profilformulare auf einer **echten Untermenge** der Baueigenschaften arbeiten, die weiter oben durch ein schon vorhandenes
      anderes spezielles Baustoffprofil aktiviert worden sind, könnte man in einer Ausbaustufe solche speziellen Profile und Formulare
      sogar zusätzlich zu den obigen Profilen und Profilformularen anbieten! Wie diese zusätzlichen Formulare ggf. angesteuert werden,
      wäre dabei noch zu überlegen: Das Flag "baueigenschaftsProfilIstAmKnotenTransitivAktiviert" könnte vermutlich weiterhin benutzt
      werden, allerdings wären Profile dann eventuell nicht mehr exklusiv aktiviert, was die Steuerung der zweiten Aktion
      **"Kindknoten anlegen mit selbem Profil"** verkomplizieren würde.
    - Wie im Baustoffbaum dann an praktisch allen Baustoffen häufig benutzte **gemeinsame Baueigenschaften**
      (z.B. Abmessungen, Herstellerangaben, Teilenummern, etc.) modelliert werden,
      ist zusätzlich zu überlegen:
      - a) Diese könnten zu einem an allen Knoten aktivierten Profil gehören.
      - b) Alternativ könnte man sie auch **allen anderen Profilen als gemeinsame Baueigenschaften** zuordnen. Allerdings müsste dann
        in deren Profilformular(en) eine gemeinsame Steuerung oder gar Komponente für deren Anzeige und Editierung eingebaut werden, sofern es sich um viele Baueigenschaften handelt.
      - Hinweise:
        - Das weiter unten zunächst skizzierte erste Design wäre eine Implementierung von b) mit (in einer
          ersten Ausbaustufe) nur einem gemeinsamen Profilformular für alle Baustoffe.
        - Das verbesserte Design ist eine Implementierung von a) mit nur einem gemeinsamen Profilformular für alle Baustoffe.
    - Dasselbe gilt für **gemeinsame Baueigenschaften**, die an einer tieferen Verzweigung mit mehreren Kindknoten auftreten (z.B.
      im obigen Beispiel gemeinsame Baueigenschaften zwischen "Fliesen" und "Holzbelägen"). Wenn diese an
      sämtlichen Geschwisterkindknoten gemeinsam sind, müssen sie im Fall b) in allen deren Profilen aufgenommen werden, sonst nur in
      bestimmten (an anderen Geschwisterknoten wären sie dann deaktiviert). Entsprechend müssen die Profilformulare implementiert
      werden.
    - Zusätzlich ist zu überlegen, ob künftig bei der **"Hochzeit" zwischen Baueinheiten und Baustoffen** künftig bestimmten Baueinheiten
      nur Baustoffe auf der **Blattebene**
      zugeordnet werden sollen, oder auch **Verzweigungs-/Strukturknoten** im Baustoffbaum, die dann ganze Kategorien von Baustoffen umfassen - allerdings
      können die Werte von deren Baueigenschaften häufig undefiniert sein, so dass eine **Filterung** damit schwierig bis unmöglich wird.
      Eine manuelle Zuordnung passender Baustoffe in dem durch einen Verzweigungsknoten definierten Unterzweig wäre wohl möglich.
    - **Anmerkung**: Bei der Strukturierung des Baustoffbaums wäre es für die Suche und Filterung eventuell besser, weniger Information in
      die Struktur zu packen, und mehr Information in für die Suche geeignete Attribute (z.B. könnte man eine Art "Tagging" einführen, wo
      ein Attribut "Tag" die Art des Baustoffs, ggf. auch mit Mehrfachbelegungen (was im Baum nicht möglich ist), charakterisieren würde).
- **Zusammengefasstes erstes Design für die erste Ausbaustufe** ==**(Achtung: Dieses wird unten verbessert!)**==
  - Es sind somit für eine adäquate Verwaltung der Baueigenschaften ähnlich wie im Bauvorhabenbaum
    **Unterstrukturen von Profilen** notwendig,
    welches es erlauben, bestimmte **thematisch zusammengehörige Untergruppen von Baustoffeigenschaften** zu identifizieren und gemeinsam
    zu behandeln
    (z.B. anzuzeigen oder nicht anzuzeigen innerhalb eines Profilformulars). Dabei könnten sowohl gemeinsame Baueigenschaften
    ("Herstellerinformationen", "Ökobilanz", ...) zu solchen Profil-Unterstrukturen zusammengefasst werden, als auch spezielle
    Baueigenschaften, die nur in bestimmten Unterzweigen gelten ("Estricheigenschaften", "Betoneigenschaften", ...). In einer ersten
    Implementierung könnte man diese ähnlich wie
    im Bauvorhabenbaum **gesteuert über Layout-Files** zuordnen und damit gemeinsam behandeln (und so zum Beispiel in einem
    Profilformular für "Estriche" die in einer Unterstruktur "Estricheigenschaften" zusammengefassten Baueigenschaften z.B. in einem
    dedizierten Unter-Tab anzeigen und gleichzeitig die "Betoneigenschaften" dann nicht anzeigen).
  - Dies könnte insgesamt dann über ein neues **"semi-generisches" Profilformular für alle Baustoffe** implementiert werden, welches
    einerseits **an allen Knoten im Baustoffbaum angezeigt wird** (daher "generisch"), welches aber, wenn am betreffenden Knoten
    nur ein einziges Baustoffprofil aktiviert ist, **nur bestimmte Tabs** (d.h. Unter-Tabs unter "Baustoffeigenschaften", was
    dann das Äquivalent im Baustoffbaum zu "Fachliche Planung" im Bauvorhabenbaum wäre) anzeigt, die zu genau dem Profil gehören, das am
    betreffenden Knoten
    aktiviert ist (angenommen, dass ab einer bestimmten Ebene im Baustoffbaum regulär nur ein Profil aktiviert ist, daher
    "semi-generisch"). Die Steuerung dafür erfolgt über profilspezifische Layout Files (siehe unten). Für am betreffenden Knoten nicht
    aktivierte Baueigenschaften müssten die Eingabefelder in diesem semi-generischen Profilformular **disabled** werden (bzw.
    gleich das ganze Tab, in dem sie angesiedelt sind, siehe unten).
  - Diese Tabs würden wie im Bauvorhabenbaum Untergruppen von thematisch zusammengehörigen Baueigenschaften als Unterstrukturierung
    der für den Baustoffbaum definierten Profile enthalten.
  - ==Welche Tabs dabei für ein bestimmtes Profil relevant sind (und im Profilformular angezeigt bzw. enabled werden sollten),
    würde über eine neue Logik in diesem **semi-generischen Profilformular für alle Baustoffe** gesteuert werden:==
    Eine einfache Form der Implementierung wären v-ifs oder :disable-Properties an den Tabs, die abhängig vom angezeigten Profil direkt
    bestimmte Tabs einblenden/enablen oder ausblenden/disablen. Eine weitere Möglichkeit wäre, im **Layout File** eine Zuordnung zwischen
    Profil und Tabs (z.B. über einen Array an jedem Tab, welcher die Profile enthält, an denen das Tab angezeigt werden soll).
    Im Template würde dann an jedem Tab per v-if oder :disable geprüft werden, ob das am betreffenden Baustoff aktivierte Profil
    in diesem Array enthalten ist, und je nach Ergebnis das Tab angezeigt/enabled werden oder nicht. Der Unterschied zwischen beiden
    Varianten ist nicht groß - bei der ersten Variante wäre die Steuerung im Template-Teil des Profilformulars, im zweiten
    Fall wäre diese im Layout File angesiedelt (was besser wäre im Sinne der Trennung von Code und Steuerungsdaten).
- Insgesamt hätte man damit, wie aus dem Bauvorhabenbaum gewohnt, **drei Stufen der Strukturierung** im Baustoffbaum:
  - **Baustoffprofile**, deren Eigenschaften relativ weit oben im Baustoffbaum, auf der ersten oder zweiten Unterebene, aktiviert würden,
    und zwar an allen Knoten im jeweiligen Unterzweig. Diese würden als normale Baueigenschaftsprofile wie gewohnt verwaltbar und zugänglich
    sein für Admnistratoren.
  - Über ein einziges Layout File für ein semi-generisches Profilformular verwaltete **Tabs** für jedes Baustoffprofil, über das gesteuert
    würde, welche Tabs für ein bestimmtes Baustoffprofil enabled werden. Dabei kann es dann **gemeinsame Tabs** geben, die zu mehreren Profilen
    gehören. Diese wären in einem gemeinsamen Layout File für alle Baustoffe nur für Entwickler verwaltbar und zugänglich (d.h.
    vorläufig nicht externalisiert werden für Administratoren).
  - Unterhalb dieser Tabs könnten wie im Bauvorhabenbaum **Rubriken** als weitere Stufe der Strukturierung in diesem Layout File
    definiert werden, um die Anzeige innerhalb eines Tabs noch feiner steuern zu können.
  - **Hinweis 1**: Dieser Mechanismus nimmt an, dass an einem Baustoff ab einer bestimmten Ebene (ggf. direkt erkennbar am Flag
    "baueigenschaftsProfilIstAmKnotenTransitivAktiviert", welches dabei nur für ein Profil gesetzt ist) nur noch ein Baustoffprofil
    (nicht mehrere) aktiviert ist!
    Wenn dabei auch mehrere Profile aktiviert werden könnten, wäre die Bestimmung, welches Profilformular dann "by Default"
    im semi-generischen Profilformular
    angezeigt wird, komplexer (es müsste dann z.B. eine vordefinierte Hierarchie der beteiligten Profile herangezogen werden, ähnlich
    wie im Bauvorhabenbaum). Gleichzeitig müsste innerhalb des semi-generischen Profilformulars das angezeigte Profil
    aus den dort aktivierten Profilen auswählbar/änderbar sein.
  - **Hinweis 2**: Man könnte dabei auch so verfahren, dass das semi-generische Profilformular stets alle Tabs enabled, die <it>allen</it> am Knoten
    aktivierten Baustoffprofilen im Layout File zugeordnet sind. Damit wäre an Knoten auf den obersten Ebenen im Baustoffbaum
    (an denen immer mehrere bzw. alle Baustoffprofile aktiviert sind) eine Editierung sämtlicher an Unterknoten aktivierter Felder
    möglich. Allerdings sollte wegen der Gefahr der unabsichtlichen Überschreibung der Werte in Kindknoten dort eine
    Warnung vor dem Speichern eingebaut werden. Für ein bestimmtes Tab müsste der Code im semi-generischen Profilformular
    prüfen, ob der im Layout File hinterlegte Array der diesem Tab zugeordneten Profile ein Profil enthält, das im Array der
    aktivierten Profile am Knoten vorkommt - falls ja müsste dieses Tab im Profilformular enabled, andernfalls disabled werden.
    Diese Logik würde als Unterfall auch an Knoten weiter unten bis hinunter zur Blattebene im Baustoffbaum funktionieren, wo regulär dann
    nur ein Profil aktiviert wäre.
  - **Hinweis 3**: Dies wirkt sich auf das Bewegen (Kopieren oder Verschieben) aus - z.B. dürften dann Zweige, an denen ein
    bestimmtes Profil aktiviert ist, nicht mehr einfach in Zweige eingefügt werden, an denen bereits ein anderes Profil aktiviert
    ist! Ähnliche Probleme gibt es jedoch bereits im Bauvorhabenbaum (illegale Operationen im Metamodell werden dort bisher
    ebenfalls nicht verhindert, z.B. einen "Standort" unter einen "Raum" zu kopieren, oder ein "Bauvorhaben" unter ein bestehendes
    "Bauvorhaben"!).Siehe Backlog Item #348.
  - **Hinweis 4**: Dieser Mechanismus nimmt an, dass jede Baueigenschaft nur zu <it>einem</it> bestimmten Tab gehört, sonst würden mehrere
    Eingabefelder für dieselbe Baueigenschaft mehrfach im Profilformular angezeigt (d.h. Tabs müssen im Gegensatz zu Profilen stets
    **disjunkt** sein bezüglich der darin enthaltenen Baueigenschaften)
  - **Hinweis 5**: Mit diesem Mechanismus lassen sich bei Bedarf auch tiefer gestaffelte Hierarchien abbilden:
    - Profil "Estriche", aktiviert an einem Knoten unter dem Wurzelknoten des Baustoffbaums
    - Profil "Fließestriche", aktiviert an Knoten unter "Estriche"
    - Profil "Trockenestriche", aktiviert an Geschwisterknoten unter "Estriche"
    - Tab "Allgemeine Baustoffeigenschaften", beiden Profilen zugeordnet (enstpricht der Großelternebene)
    - Gemeinsames Tab "Estricheigenschaften", beiden Profilen zugeordnet (entspricht der Elternebene)
    - Spezifisches Tab "Fließestricheigenschaften", nur dem Profil "Fließestriche" zugeordnet
    - Spezifisches Tab "Trockenestricheigenschaften", nur dem Profil "Trockenestriche" zugeordnet
    - Wenn man ein Profil auf einer Ebene weiter in disjunkte Unterprofile aufbrechen möchte, muss man deren bisheriges Profil in zwei
      Unterprofile und deren bisherige spezifisches Tab in drei neue Unter-Tabs aufbrechen:
      - Beispiel: Profil "Fließestriche" soll aufgteteilt werden in Unterprofile "Dünnflüssige Fließestriche" und "Dickflüssige Fließestriche"
      - Dann muss man dessen spezifisches Tab "Fließestricheigenschaften" aufteilen in folgende neuen drei Unter-Tabs:
        - Gemeinsames Unter-Tab "Fließestricheigenschaften", welche nur die gemeinsamen Baueigenschaften enthält
        - Spezifisches Unter-Tab "Eigenschaften von dünnflüssigen Fließestrichen", welches nur diese spezifischen Eigenschaften enthält
        - Spezifisches Unter-Tab "Eigenschaften von dickflüssigen Fließestrichen", welches nur diese spezifischen Eigenschaften enthält
    - Wenn ma dies nicht möchte, muss man zwangsläufig bestimmte Eigenschaften, die in gewissen Unterzweigen irrelevant und daher
      undefiniert sein können, "mitschleppen", und diesen Fall im Code auch berücksichtigen!
    - Wenn man allerdings eine sehr tiefe Staffelung anstrebt, muss man sehr viele feingranulare Profile und zugehörige Tabs
      definieren und verwalten, was an Grenzen stoßen wird (auch bzgl. der Visualisierung, da normalerweise die hier genannten Tabs
      im semi-generischen Profilformular für "Baustoffe" wie in den Profilformularen im Bauvorhabenbaum alle auf einer Ebene
      angezeigt werden, nicht hierarchisch).
- ==**Nachteile der oben skizzierten Lösung**==:
  - Die gemeinsamen Baueigenschaften würden so nur intern per Layout File verwaltet werden, nicht als externalisierte/explizite
    Profile!
  - Dies wird sehr schnell unübersichtlich, z.B. bzgl. der Frage, ob bestimmte Baueigenschaften bereits in einem Tab
    verwendet werden oder nicht
- ==**Verbessertes Design**==
  - Dedizierte Profile für jedes obige Tab anlegen, welche transitiv auf bestimmten Ebenen, d.h. in bestimmten Zweigen aktiviert
    werden müssen, z.B.:
    - Allgemeine Baustoffeigenschaften (gemeinsam auf allen Ebenen)
    - Ökobilanzeigenschaften (gemeinsam auf allen Ebenen)
    - Estricheigenschaften (spezifisch auf einer Ebene)
    - Betoneigenschaften (spezifisch auf einer Ebene)
    - Achtung: Diese müssen **disjunkt** sein!
  - Das semi-generische Profilformular muss dann jeweils ein dem Profil eindeutig zugeordnetes Tab für ein solches Profil enablen,
    falls das Profil am Knoten aktiviert ist
  - So hätte man eine explizite Kontrolle über die gemeinsamen Baueigenschaften auf Profil-Ebene
  - Im Unterschied zum Bauvorhabenbaum entspricht dann im Baustoffbaum ein Profil genau einem Tab im semi-generischen Profilformular
    für die Baustoffe - im Bauvorhabenbaum entspricht ein Profil genau einem spezifischen Profilformular.
  - Allerdings wären damit im Gegensatz zu den ersten Überlegungen oben auch an Knoten unten im Baustoffbaum
    **mehrere Profile aktiviert**: Da normalerweise an jedem Knoten dasselbe, semi-generische Profilformular angezeigt würde,
    wäre das aber **kein Problem**!
  - **Vorteile des verbesserten Designs**:
    - **Explizite Kontrolle** über die **gemeinsamen Baueigenschaften auf jeder Ebene im Baum**, in Form von **Profilen**
    - **Entkopplung des Baustoffbaum-Aufbaus von den Profilen**: Auf jeder Ebene können die passenden Profile transitiv
      aktiviert werden, je nach Bedarf enger an die Unterstrukturen des Baustoffbaums angepasst (spezifische
      Profile auch auf tieferen Ebenen), oder auch weniger eng (spezifische Profile nur auf oberen Ebenen im Baustoffbaum)
    - **Kein konzeptioneller Unterschied zwischen Baueigenschaftsprofilen im Baustoffbaum und Bauvorhabenbaum**, außer das im
      Baustoffbaum per Convenience-Funktionen (Kontextmenüs) Baustoffprofile transitiv auch an Kind- und Kindeskindknoten aktiviert werden
    - **Kein besonderes Flag** erforderlich zur Ansteuerung des (vorläufig einzigen) Profilformulars
      im Baustoffbaum - bei Aufruf des Formulars an Verzweigungsknoten sollte allerdings vor dem Speichern die oben bereits
      genannte Warnung eingebaut werden, dass alle Werte an Kind- und Kindeskindern überschrieben werden.
      - **Hinweis**: Das oben genannte Flag **baueigenschaftsProfilIstAmKnotenTransitivAktiviert** wäre trotzdem sinnvoll,
        um bei der Suche im Baustoffbaum geeignete Startknoten von Zweigen zu identifizieren (z.B. würde der
        Startknoten für Estriche durch dieses Flag am Profil "Estriche" identifiziert)
    - **Keine Restriktionen bezüglich der Anzahl der aktivierten Profile an einem Knoten** wie oben,
      wo für die Steuerung der Anzeige auf bestimmten Ebenen nur höchstens ein Profil aktiviert sein sollte.
  - Die obige Aktion für **"Profil xyz am Baustoff und allen Kindbaustoffen aktivieren"** müsste dafür angepasst werden:
    - Es müssten alle Baustoffprofile zur Auswahl angeboten werden bzw. eine für die ausgewählte Ebene passende Untermenge, z.B.
      "Estricheigenschaften", "Betoneigenschaften"
    - Es könnten dann dabei implizit auch die aktivierten gemeinsamen "Elternprofile" transitiv aktiviert werden, z.B. "Allgemeine
      Baustoffeigenschaften"
    - D.h. die Funktion dafür müsste (wie die analogen Funktionen im Bauvorhabenbaum) die verfügbaren Profile "by Name" kennen und
      daraus die passenden, abhängig von der Ebene, anbieten bzw. aktivieren
    - In einer ersten Ausbaustufe könnte man diese Aktion auch
      **für jedes einzelne beteiligte Profil auf der entsprechenden Ebene einzeln aufrufen**,
      z.B. für "Estriche" (Knoten noch ohne spezifisches Profil, möglicherweise mit Kindknoten):
      - Aktion aufrufen für "Allgemeine Baueigenschaften" - propagiert diese transitiv weiter an Kinder und Kindeskinder
        (nur notwendig, falls diese Aktion nicht schon - transitiv - an einem Elternknoten durchgeführt wurde)
      - Aktion aufrufen für "Ökobilanzeigenschaften" - propagiert diese transitiv weiter an Kinder und Kindeskinder
        (nur notwendig, falls diese Aktion nicht schon - transitiv - an einem Elternknoten durchgeführt wurde)
      - Aktion aufrufen für "Estricheigenschaften" - propagiert diese transitiv weiter an Kinder und Kindeskinder
      - Das Profil "Betoneigenschaften" würde in diesem Zweig nicht aktiviert werden (aber im Geschwisterzweig)
    - ==Man könnte dabei zur Verbesserung der Benutzung im Kontextmenü für diese Aktion
      dann nur solche Baustoffprofile zur Auswahl ("xyz") anbieten, die am betreffenden Knoten
      nicht bereits aktiviert sind!==
  - Die Aktion **"Kindknoten anlegen mit selbem Profil"** müsste ebenfalls angepasst werden:
    - Es müssten dabei einfach alle aktivierten Profile am betreffenden Knoten transitiv aktiviert werden im neuen Kindknoten
    - Damit würde die Aktion zu **"Kindknoten anlegen mit selben Profilen"** (wie der betreffende Knoten, an dem das Kontextmenü
      arbeitet)
  - Der Code für das semi-generische Profilformular für Baustoffe würde dann abhängig davon, welche Profile am Knoten
    aktiviert sind, falls ein bestimmtes Baustoffprofil aktiviert ist, das diesem Profil eindeutig zugeordnete Tab enablen bzw.
    (falls das Profil deaktiviert ist) das zugehörige Tab disablen
  - Es gäbe dabei eine eindeutige Entsprechung von Baustoffprofilen und Tabs in diesem semi-generische Profilformular für Baustoffe
- ==**Stufenplan für die Implementierung**==
  - Ein Profil für gemeinsame/allgemeine Baustoffeigenschaften definieren mit zugehörigen Baueigenschaften (z.B. Hersteller,
    Bestellnummern, Maße, ...)
  - Zwei Zweige im Baustoffbaum identifizieren, für die spezifische Profile definiert werden sollen
    - z.B. Estriche mit estrichspezifischen Baueigenschaften
    - z.B. Betone mit betonspezifischen Baueigenschaften
    - Achtung: Die Ebene ("Betone, Estriche, Mörtel, ...") darüber könnte eventuell eigene spezifische Baueigenschaften mit
      einem entsprechendem spezifischen Profil haben - dies in der ersten Implementierung ignorieren
  - Für diese zwei Zweige spezifische Baustoffprofile definieren
  - Passende Kontextmenü-Aktionen implementieren
  - Die beteiligten Profile damit passend im Baum aktivieren (transitiv)
  - Semi-generisches Profilformular dafür implementieren, mit Tabs für das gemeinsame Profil und die spezifischen Profile,
    und entsprechener Tab-Enabling-Logik in Abhängigkeit von den am Knoten aktivierten Profilen - siehe Epic 38.o

---

#### **[Epic 38.n]** **[DONE]** Selektive Anlage von (wertbezogenen) Baueigenschaften nur im Baustoff- oder Bauvorhabenbaum

- Im aktuellen Design werden Baueigenschaften beim Import (baueigenschaften.controller.importBaueigenschaften()) zunächst angelegt
  als (typbezogene) Baueigenschaften.
- Danach werden sie mit der Methode internalCreateBaueigenschaft() sowohl im Baustoff- als auch im Bauvorhabenbaum an jedem Knoten angelegt (per Push in
  den Array der wertbezogenen Baueigenschaften).
- Über einen Parameter baumTyp an dieser Methode wird gesteuert, ob sie im jeweiligen Baum aktiviert werden - ist der Parameter undefiniert,
  werden sie in keinem der beiden Bäume aktiviert.
- **Idee:**: Bestimmte Baueigenschaften nur **selektiv an einem (oder in Sonderfällen, z.B. Testbaueigenschaften auch an beiden) der Bäume anlegen,** um die Anzahl der wertbezogenen Baueigenschaften an allen Baumknoten zu reduzieren und die Performance durch Reduktion der Array-Größen im akzeptablen
  Rahmen zu halten.
- **Implikationen:**
  - Änderung der obigen Import-Methode notwendig. Diese wurde einstweilen so implementiert, dass die bereits vorhandene Property baumTyp an einer importierten
    Eigenschaft nun so interpretiert wird, dass sie darüber entscheidet, an welchem der beiden Bäume die Baueigenschaft als wertbezogene Baueigenschaft
    an allen Knoten angelegt wird im Array der wertbezogenen Baueigenschaften am Knoten.
  - Baueigenschaften, die in beiden Bäumen angelegt werden sollen, müssen so ggf. zweimal importiert werden mit jeweils unterschiedlich gesetzter Property baumTyp.
  - Alle an einem Knoten angelegten wertbezogenen Baueigenschaften im Baustoff- oder Bauvorhabenbaum
    werden beim Anklicken eines Knotens im Baum in den Methoden loadRootNodeTreeBaustoffe(), loadRootNodeTreeBaueinheiten(), readKindKnotenBaustoff() und readKindKnotenBaueinheit() geladen. Dies funktioniert auch mit der selektiven Anlage solcher Baueigenschaften beim Import weiter!
  - Beim **Löschen von Baueigenschaften** dürfen diese nur im jeweiligen Baum aus dem Array der wertbezogenen Baueigenschaften gepulled werden. Dies
    erfolgt jedoch automatisch, dort waren keine Änderungen notwendig!
  - Das **Neuanlegen von Baueigenschaften** muss selektiv erfolgen mit der Möglichkeit zu steuern, an welchen der beiden Baumtypen die neue Baueigenschaft
    angelegt wird - siehe unten.
  - Die Neuanlage per **Import** von JSON Files mit Baueigenschaften funktioniert dagegen bereits:
    - ==Über die Property baumTyp = "Bauvorhabenbaum", "Baustoffbaum", "Allgemein" in der JSON File kann individuell gesteuert werden, an welchem Baum bzw. welchen
      Bäumen eine Baueigenschaft angelegt und am jeweiligen Wurzelknoten auch aktiviert und wenn gewünscht mit mitgebrachten Werten befüllt wird.==
    - Die bisherige baueigenschaften.js, die per back-end-server.js geladen werden kann, wurde ebenfalls entsprechend aufgeteilt in drei JS-Files für jede der 3 Kategorien.
  - Es könnte auch für jede Baueigenschaft durch ein neues permanentes Flag in den typbezogenen Properties festgehalten werden, an welchen Bäumen sie eingetragen wurde. Dies würde jedoch hohen Entwicklungs- und Pflegeaufwand erfordern.
  - In einer ersten Stufe kann man jedoch auch ohne ein solches Flag auskommen: Anhand der Baueigenschaftsbezeichnung ("Baustoff > ", Konvention) kann man
    dann erkennen, welche Baueigenschaften wo angelegt werden (solche die in beiden Bäumen angelegt werden, müssten allerdings durch eine neue Namenskonvention
    gekennzeichnet werden).
  - Das **Aktivieren und Deaktivieren von Baueigenschaften** muss dann ebenfalls selektiv erfolgen - eine Baueigenschaft
    darf an einem Knoten nur aktiviert bzw. deaktiviert werden, wenn sie an diesem Baumtyp auch angelegt ist. Die vorhandene Logik
    in baustoffe.controller.aktiviereBaueigenschaftAnBaustoff() sowie deaktiviereBaueigenschaftAnBaustoff() und
    baueinheiten.controller.aktiviereBaueigenschaftAnBaueinheit() sowie deaktiviereBaueigenschaftAnBaueinheit() erledigt dies allerdings auch
    ohne Änderungen (außer einigen Bug Fixes, die notwendig wurden, weil baustoffe.controller.js gegenüber baueinheiten.controller.js an einigen Stellen
    noch nicht aktuell war).
  - Diese Methoden für einzelne Baueigenschaften werden vom Frontend aus sowieso nur aus dem jeweiligen Baum heraus aufgerufen,
    d.h. aus der Liste der am jeweiligen Baum angelegten wertbezogenen Baueigenschaften, so dass für diese Fälle keine Prüfung notwendig war.
    D.h. die genannten baueigenschaftsbezogenen Aktivierungs- und Deaktivierungsmethoden erforderten keine explizite neue
    Prüfung, ob die betroffene Baueigenschaft am jeweiligen Baum auch als wertbezogene Baueigenschaft angelegt ist.
  - Das Aktivieren und Deaktivieren von Baueigenschaften in Baueigenschaftsprofilen muss dann allerdings ebenfalls selektiv erfolgen.
  - Eventuell benötigen Baueigenschaftsprofile dann ebenfalls ein Flag zur Steuerung, welche Arten von Baueigenschaften ihnen zugeordnet sind.
    Dies beträfe die Methode baueigenschafts-profile-aktivierungslogik.aktiviereBaueigenschaftsProfilAnBaustoff(), aktiviereBaueigenschaftsProfilAnBaueinheit(), deaktiviereBaueigenschaftsProfilAnBaustoff() und deaktiviereBaueigenschaftsProfilAnBaueinheit().
  - Alternativ konnte man aber vorläufig die aktivierungs- und deaktivierungsbezogene Steuerung **auf der Ebene der Baueigenschaften** belassen.
  - ==Allerdings läuft damit per Test die Aktivierung eines Profils, das ausschließlich Baueigenschaften enthält, welche am betreffenden Knoten bzw. Baumtyp
    gar nicht angelegt sind, ohne erkennbaren Fehler mit Status 200 und ohne dass irgendwelche Baueigenschaften an dem betreffenden Knoten aktiviert werden durch (was vorläufig akzeptabel ist).==
  - ==**TODO**==: Später sollte es in den oben genannten Funktionen eventuell robustere Prüfungen
    geben, welche z.B. beim Aktivieren oder Deaktivieren eines Profils mit Baueinheitseigenschaften an einem Knoten im Baustoffbaum,
    wenn Baueigenschaften nicht im Array der wertbezogenen Baueigenschaften gefunden werden (im aggregate() in diesen Funktionen)
    einen speziellen Status 401 o.ä. returnen, was dann eine Fehlermeldung am Frontend auslösen könnte.
  - Das Löschen von Baueigenschaften sowohl aus dem obersten Menü "Baueigenschaften" sowie aus den baustoff- bzw. bauvorhabenspezifischen Menüs für die
    Baueigenschaften an einem Knoten im Baum funktioniert ohne erkennbare Probleme weiter, per initialen Tests!
  - Auch die Profilfunktionen funktionieren per initialen Tests weiter!
  - **DONE**: In details-tab-baueigenschaften.vue muss bei der Neuanlage einer Baueigenschaft aus dem Hauptmenü "Baueigenschaften" > "Baueigenschaftsprofile"
    für den Parameter in Zeile 1599, der heute hart kodiert auf "Baustoffbaum" eingestellt ist,
    ein Dropdown-Feld oder Radio Buttons für den Benutzer eingeführt werden, welches es erlaubt, die wertbezogene Baueigenschaft am Baustoffbaum, am Bauvorhabenbaum oder an beiden anzulegen
  - **DONE**: In sämtliche Profilformulare eine Fehlervermeidung in die Funktion baueEigenschaftenVererbungsDatenstruktur() eingebaut, falls eine Baueigenschaft
    am betreffenden Baum nicht angelegt ist. Die Profilformulare rendern ansonsten korrekt, generische Formulare rendern dabei nur die Baueigenschaften, die
    am betreffenden Baum angelegt sind, die nicht angelegten werden ignoriert. Layoutgesteuerte Formulare werfen den bereits bekannten Fehle im Browser Log,
    dass eine Baueigenschaft nicht im Profil Model gefunden wurde - dafür wurde noch zusätzlich eine Fehlermeldung als Benutzernachricht eingebaut.
  - Die Neuanlage einer Baueigenschaft aus den Baueigenschaften an Baustoff oder an Baueinheit funktioniert dagegen korrekt!
  - ==**DONE**==: Auf Heroku bereits angelegte 7 baustoffspezifische Baueigenschaften für Estrich an Knoten im Bauvorhabenbaum wieder entfernt, mittels einer
    temporär angepassten Backend-Funktion baueigenschaften.controller.deleteBaueigenschaft().
  - ==**TODO**==: Die bereits angelegten bauvorhabenbaumspezifischen Baueigenschaften sollten auf Heroku im gesamten Baustoffbaum gelöscht werden! Allerdings ist ja sowieso
    geplant, den Baustoffbaum neu zu importieren. Das kann dann zusammen erledigt werden, d.h. für den neu angelegten Baustoffbaum können dann baumtypspezifische
    Baueigenschaften importiert werden und die entsprechenden Baustoffprofile auch nur im Baustoffbaum aktiviert werden.
- Testdateien zum Import für dieses Epic:
  - baueigenschaften-baueinheit-test-baumspezifische-Anlage-3-neue.json
  - baueigenschaften-baustoff-test-baumspezifische-Anlage-3-neue.json
  - baueigenschaften-allgemein-test-baumspezifische-Anlage-3-neue.json
- Neue Aufteilung der in back-end-server.js geladenen Baueigenschaften:
  - ALT: baueigenschaften.js // Alle Baueigenschaften, die sowohl im Bauvorhaben- als auch im Baustoffbaum aktiviert wurden (diese Datei)!
  - NEU: Aufteilung:
    - bauvorhaben-baum-spezifische-baueigenschaften.js // Baueigenschaften an Baueinheiten im Bauvorhabenbaum
    - baustoff-baum-spezifische-baueigenschaften.js // Baueigenschaften an Baustoffen im Baustoffbaum
    - allgemeine-baueigenschaften.js // Baueigenschaften in beiden Bäumen

---

#### **[Epic 38.o]** ==**[WORK]**== Layoutgesteuertes generisches Baueigenschaftsprofilformular (für Baustoffe und Baueinheiten)

- Es soll ein einheitliches **layoutgesteuertes generisches Profilformular** entwickelt werden, das für alle Profile verwendet werden kann
- Dieses soll einen fixen Template-Teil haben, so dass für neue Profile lediglich ein profilspezifisches Layout File erstellt werden muss, ohne
  die Notwendigkeit für eine individuelle profilspezifische Vue-Komponente mit individuellem Template für das Profil
- Wegen der großen Zahl der zur erwartenden neuen Profile im Baustoffbaum soll dieses layoutgesteuerte Profilformular vorrangig zur Anzeige und
  zum Editieren von Profilen im Baustoffbaum verwendet werden, und dort Entwicklungsaufwand für individuelle Baustoffprofilformulare sparen
- Grundsätzlich kann dieses layoutgesteuerte generische Profilformular aber auch für Profile im Bauvorhabenbaum verwendet werden
- Bei Verwendung im Baustoffbaum sollen in der zweiten grauen Tabzeile (bei Anwahl von "Baustoffe" im Hauptmenü und "Fachliche Daten" in der
  ersten grauen Tabzeile) für diesen Baustoff bestimmte zu definierende Tabs angezeigt werden,
  die eins zu eins bestimmten baustoffspezifischen Profilen entsprechen
- Je nach Aktivierung an einem Knoten im Baustoffbaum sollen dabei nur die Tabs für die jeweils an diesem Knoten aktivierten Profile enabled sein
- Für ein solches Tab soll dann dieses neue, layoutgesteuerte generische Profilformular für das entsprechende Baustoffprofil aufgerufen werden
- Es sollte als Property die Profilbezeichnung übergeben bekommen
- Im Script-Teil wird dann in mounted() ein Layout File für dieses Profil geladen, sowie daraus das Profil Model dafür geladen, und das geladene
  Layout wird mit Indexes initialisiert - als Vorlage für diesen Teil diente der vorhandene Code im generischen Profilformular
- Die Layout Files können weitgehend gleich aufgebaut sein wie die bisherigen Layout Files für Profile im Bauvorhabenbaum
- Im Template des layoutgesteuerten generischen Profilformulars erfolgt dann ein Processing, das vom Layout File gesteuert wird
  - Dafür sind diverse verschachtelte v-fors implementiert, welche auf dem geladenen Layout operieren:
    - Erstens für etwaige Unter-Tabs innerhalb des Layouts, die die dritte graue Tab-Zeile ergeben
    - Zweitens für etwaige Rubriken, welche innerhalb eines Unter-Tabs einzeln ausklappbare Rubriken (QExpansionItems) ergeben
    - Drittens für die Baueigenschaften innerhalb einer Rubrik, welche 4-spaltig (1-spaltig auf Mobilgeräten) in entsprechende Eingabefelder
      (q-input, q-select, etc.) gerendert werden
    - Anzeigetexte können als Labels innerhalb der Eingabefelder angezeigt werden (aus der Property baueigenschaftsAnzeigeText)
    - Symbole und Einheiten für Kennwerte/Kennwertepaare werden den Labels in eckigen Klammern hinten angefügt, um Platz zu sparen
    - Tooltips und fachliche Hilfetexte werden wie bisher aus den Properties baueigenschaftsBemerkung und baueigenschaftsBeschreibung entnommen
    - Wertepaare werden dabei in zwei Feldern innerhalb einer Spalte gerendert
      - Dies funktioniert im Vergleich zu anderen Lösungen für alle Anzahlen von Spalten in einer Rubrik, nicht nur col-md-x mit durch 2 teilbarem x
      - Die angezeigten Labels und Tooltips bei Wertepaaren können aus optionalen Properties aus dem Layout File entnommen werden (labelBaueigenschaft1/2,
        toolTipBaueigenschaft1/2) statt aus den typbezogenen Baueigenschaften (baueigenschaftsAnzeigeText, baueigenschaftsBemerkung)
  - Das v-for-Processing auf den unteren Ebenen erfolgt mit zwei verschachtelten v-fors:
    - Prototyp: https://codepen.io/mickey58/pen/eYGMPxa
    - Dabei muss der Array layoutProfilFormular (analog zu items im Prototyp), der die Baueigenschaften enthält, zunächst in einer computed-Funktion (analog zu itemRows im Prototyp) oder in einer Methode (wegen Parameter, der die Baueigenschaften in einer Rubrik angibt) umgeformt werden in einen Array mit den Indexes der zu prozessierenden Rows
    - Dabei muss im äußeren v-for dieser Array mit den Indexes der zu prozessierenden Rows traversiert werden (v-for="(row, i) in itemRows", i ist der
      Index der Row)
    - Im inneren v-for werden dann die entsprechenden Eingabefelder erzeugt (im Prototyp ein q-input, v-for="item in items.slice(...)" für jedes Item
      in einer Row
  - Der eigentliche Code musste noch erweitert werden um weitere Arten von Eingabefeldern (abhängig vom Wertetyp der jeweilgen Baueigenschaft) und um die
    Verarbeitung von Wertepaaren
- Als weitere Vorlage diente baueinheit-geschoss-baueigenschafts-profil-formular.vue - allerdings musste mounted() angepasst werden, dass es das zu dem als
  Property übergebenen Profil passende Layout File und Profil Model lädt (analog zu generisches-baueigenschafts-profil-formular.vue). Das Template
  wurde dann wie oben beschrieben modifiziert.
- Zusätzlich kann die (Hintergrund-)Farbe für eine Rubrik im Layout File als Property farbeRubrik spezifiziert werden
- Zusätzlich kann die Anzahl der Spalten pro Rubrik per Property spaltenRubrik im Layout File spezifiziert werden (vorher statisch in Variable anzahlBaueigenschaftenPerRow im layoutgesteuerten generischen Profilformular)
- Zusätzlich können Rubriken per Property hideRubrik ausgeblendet werden
- Wertepaare werden dabei automatisch in zwei Eingabefelder pro Spalte aufgeteilt
- Anzeigetexte/Labels und Bemerkungen/Tooltips aus dem Layout File statt den typbezogenen Baueigenschaften werden für einfache Wertetypen und für Wertepaare
  unterstützt mittels der bereits in Layout Files
  verwendeten opti**onalen Properties labelBaueigenschaft(1/1) und toolTipBaueigenschaft(1/2)
- **[DONE]** Eine **Read-only-Variante** der Komponente, in der alle Felder auf readonly geschaltet werden und die Button-Zeile unterdrückt wird, analog zu
  read-only-generisches-baueigenschafts-profil-formular.vue, wird über die Property :benutzerDarfBearbeitenSelectedNode erreicht!
- **[DONE]** Zusätzliche Property labelTab (zu ueberschriftTab) - damit wird der Tabname separat setzbar, zusätzlich zu der in einem Tab angezeigten Überschrift, die aus der Property ueberschriftTab entnommen wird. Die v-fors auf den QTabs und QTabPanels benutzen aus Kompatibilitätsgründen als Key allerdings
  weiterhin ueberschriftTab (muss damit unique sein), weil die herkömmlichen Profilformulare für Baueinheiten (Bauvorhaben, Standort, usw.)
  bisher nur die Property ueberschriftTab, nicht die neue Property labelTab enthalten!
- ==**Achtung**==: Leere Rubriken in Layout Files dürfen keine leeren Baueigenschaften enthalten d.h. **nicht** "{}" für leere Baueigenschaft)!
  Sonst rendered das layoutgesteuerte generische Profilformular nicht! Es kommt dann ein undefined-Fehler bei Zugriff auf
  typbezogene Baueigenschaft (Wertetyp) beim Aufbau des Templates per v-for. Stattdessen den Array für die Baueigenschaften in der Rubrik
  ganz leer lassen ("[]").
- ==Erweiterungen/Ausbaustufen:==
  - Unterstützung zusätzlicher Properties an Baueigenschaften im Layout File:
    - **[DONE]** **Bemerkung/Tooltip** und **Beschreibung/fachliche Hilfe** für **Tabs** im Layout
      - Bemerkung/Toolitp für Tabs ist implementiert per Property bemerkungTab
      - ==**Achtung**==: Fachliche Hilfe ist in layout-baueinheit-raum-baueigenschafts-profil-formular.js per Property
        beschreibungTab (Multiline String) bereits vorbereitet
      - Der Inhalt dieser Property wird in baueinheit-raum-baueigenschafts-profil-formular.vue testweise in die fachliche Hilfe übertragen
      - Die analoge Property für einen Tooltip wäre dann bemerkungTab
      - ==**[TODO]**== Die Beschreibung muss bei der Unter-Tab-Initialisierung noch per Methode in global-store in die fachliche Hilfe rechts übertragen werden
    - **[DONE]** **Bemerkung/Tooltip** und **Beschreibung/fachliche Hilfe** für **Rubriken** im Layout
      - Erfordert Properties bemerkungRubrik (Tooltip) und BeschreibungRubrik (fachliche Hilfe)
      - Bemerkung/Toolitp für Rubriken ist implementiert per Property bemerkungRubrik
      - ==**[TODO]**== Die Beschreibung muss bei der Rubrik-Initialisierung noch per Methode in global-store in die fachliche Hilfe rechts übertragen werden
    - **[DONE]** **Mehrfachauswahl für Aufzählungswerte**
      - Per Weitergabe einer optionalen Property multiple aus dem Layout an die entsprechende QSelect Property
    - **[DONE]** **Hint**
      - Per Weitergabe einer optionalen Property hintBaueigenschaft="Text" bzw. hintBaueigenschaft1/hintBaueigenschaft2="Text" bei Wertepaaren aus dem Layout an die entsprechende Property an den Eingabefeldern
    - **Readonly-Felder**
      - Die Property wird für von Elternknoten ererbte Werte bereits automatisch gesetzt, inklusive Farbe. Ansonsten wurde es bisher nicht benötigt. Kann bei Bedarf per neuer Prop im Layout enabled werden.
    - **Radio Buttons** und **Checkboxes** an Aufzählungswerten per QOptionGroup mit type="radio"/"checkbox" statt des regulären QSelects
      - Dafür gibt es eine Vorlage in baueinheit-standort-baueigenschafts-profil-formular.vue. Bisher noch nicht übertragen nach layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue.
    - **Dezimalein-/ausgabe für Kennwerte**
      - Dies sollte gleich das neue VueCurrencyInput benutzen, nicht VueAutoNumeric, das nicht auf Vue 3 läuft
      - Siehe "Verwaltung" > "Test Area 1" > Dezimalzahlen (VueCurrencyInput)
    - **[DONE]** Eingabe und Ausgabe für beide Unterfelder von **Wertepaaren**: Siehe oben, Aufteilung in 2 Spalten
  - Strukturelle Erweiterungen im Layout File:
    - **"Unterquadranten"**, besser gesagt **"Unterspalten"**, unter Tabs
      - Dann ergeben mehrere "Unterquadranten" bzw. "Unterspalten" (z.B. 4 oder 6) eine Zeile (d.h. mehrere q-cols in einer q-row)
      - Eine solche "Unterspalte" macht dann ein q-expansion-item für die Rubbrik auf
      - So sind flexiblere Layouts möglich - z.B. Aufteilung in 2 x 2 oder auch 3 x 2 "Quadranten"/"Segemente"
      - Dies wird teilweise in den heutigen spezifischen Profilformularen für Baueinheiten ("Geschoss > Geometrie", "Raum > Boden/Decke", "Raum > Maße", 
        "Raum > Feuchte" usw.) verwendet
      - **[DONE]** Neue optionale Property anzahlSpaltenTab dafür eingeführt - diese verteilt die Rubriken innerhalb eines Tabs horizontal auf die entsprechende Anzahl von Spalten
      - ==Eventuell muss man auch verschiedene **Layout-Typen** unterscheiden (per JSON-Schema?), je nachdem ob man einfache Layouts nur mit Rubriken 
        oder komplexere mit 
        Unterspalten hat - sonst müssten die einfachen Layouts "leere" Unterspalten im Layout definieren, wobei man dann wie im Fall hier weiter oben 
        potentiell gegen undefined-Fehlern beim Rendern kämpfen muss==
      - Ein erster neuer Layout-Typ könnte z.B. ein neues Layout für "Baueinheit > Schicht" werden, also eine Umarbeitung des jetzigen Profilformulars
        für "Baustoff > Schicht" auf eine Nutzung des layoutgesteuerten generischen Profilformulars mit diesem neuen Layout-Typ
        - ==Allerdings ist dies ein komplizierter Fall, wegen der speziellen Zusammenhänge von "Baueinheit > Schicht" mit "Baueinheit > Bodenaufbau",
          wegen der Soll-/Istwertvergleiche dort, und wegen des **Enablements/Disablements von Rubriken** dort in Abhängigkeit vom Schichttyp im Bodenaufbau!==
    - Layoutgesteuerte Einfügung von **Zwischenzeilen** mit Spaltenüberschriften - wird für "gleichartige" Spalten von Baueigenschaften benötigt
      - **[DONE]** Zeile mit Spaltenüberschriften am Anfang einer Rubrik (v-html)
      - **[DONE]** Zeile mit Hinweistext am Ende einer Rubrik (v-html)
      - **[DONE]** Prop spaltenRubrik kann sowohl **feste Spaltenbreite** innerhalb einer Rubrik (wenn Zahl, z.B. spaltenRubrik: 2 oder 3 oder 4, entspricht col-md-6, col-md-4, col-md-3)   
        vorgeben, als auch **unterschiedliche Spaltenbreiten** (wenn Array, z.B. spaltenRubrik: [ "2", "3", "2", "2", "2", "1" ], Werte entsprechen "x" in "col-x"-Werten, Summme muss 12 ergeben)
      - ==**[WORK]**== Button "Felder mit definierten Werten an Kindbaustoffen kennzeichnen" für Ermittlung, ob am ausgewählten Knoten aktivierte, aber **undefinierte** Baueigenschaften im Profilformular an Kindknoten aktiviert und **definiert** sind, um ein versehentliches Überschreiben von
        vorhandenen Werten insbesondere im Baustoffbaum zu vermeiden. Implementiert am Backend
        in baustoffe.controller.internalErmittleDefiniertheitKindKnoten() und neuem API (mit dem neuem Controller Handler in router.utils.js).
        Liefert Array mit ermittelten Baueigenschaftsbezeichnungen zurück. Damit können dann die betreffenden Eingabefelder farblich markiert werden.
        Vorläufig nur für Baustoffbaum implementiert (im Backend sowie am Frontend in layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue).
        - ==**Achtung**==: Eine Besonderheit dabei ist, dass die Farbsteuerung dabei auf einer transienten Property bgColor basiert, die dynamisch in die Objekte des Arrays profilModelAusgewaehlterKnoten
          per Vue $set eingefügt wird, erfolgt. Diese Property kann nicht im Layout sein, da sie beim Wechsel des Knotens ebenfalls wechseln muss!
          Sie wird allerdings nicht mit abgespeichert und verschwindet bei mounted(), reset() und watch() (= Refresh). Siehe ermittleDefiniertheitKindKnoten() im Frontend.
    - ==**[WORK]**== **Computed-Felder**, deren Werte aus Werten anderer Felder computed werden, mit Farbgebung
      - Vorlage: Computed-Funktionen z.B. für NHN-Niveaus in baueinheit-raum-baueigenschafts-profil-formular.vue
      - Dafür müssten Properties für die computed-Funktionen ähnlich wie in layout-baueinheit-bodenaufbau-baueigenschafts-profil-formular.vue benutzt werden
      - Diese computed Properties benötigen auf Grund der Erfahrungen Getters und Setters!
      - Sie aktualisieren im Getter das v-model per $set() mit dem berechneten NHN-Wert und returnen dann diesen
      - Im Setter passiert nichts außer ggf. Ausgabe des übergebenen (neuen) Werts.
        - Siehe https://codingexplained.com/coding/front-end/vue-js/adding-getters-setters-computed-properties 
        - ==**Hinweis**==: Wenn man v-model="computed" verwendet, braucht man Getter und Setter, bei :value nicht! (Tipp von Stefan)
      - Die computed Properties müssten möglichst im Layout-JS-File sein oder ggf. in einem anderen JS-File!
      - Sie sind spezifisch pro Feld (da sie keine Parameter haben dürfen)
      - ==Sie bzw. das gesamte Layout-JS-File müssten dann per .this = self vor dem Aufruf self inklusive des darin enthaltenen aktuellen Profil Models als Parameter bekommen und dieses per self.set updaten - dies ist zu testen!==
      - ==**Update 04.02.2022**==
        - Prototyp dafür anfangs erfolgreich getestet mit dem Layout für "Baustoff > Estrich" und dem layoutgesteuerten generischen Profilformular, im Debug Mode
        - Ein JS-Modul functions-baustoff-estrich-baueigenschafts-profil-formular.js angelegt mit einer Test-computed-Property (Test 1 dort)
        - Dieses korrespondiert zur Layout-Datei baustoff-estrich-baueigenschafts-profil-formular.js (ebenfalls ein JS-Modul)
        - Diese hat spezielle Struktur mit Übergabe von this als self an das Modul, damit in den
          dort definierten computed Properties Zugriffe z.B. auf das Profil Model oder andere
          Daten aus data() aus dem generischen layoutgesteuerten Profilformular möglich sind
        - Die computed Property zum Testen verwendet :value="myTestComputedProperty"
        - myTestComputedProperty wrapped die aus dem JS-Modul kommende tatsächliche computed Property!
        - Achtung: Wo dies importiert wird, darf die Funktion nicht mit "()" definiert werden, sonst 
          wird sie nicht definiert, sondern gleich ausgeführt!
        - Zusätzliche Prüfung auf undefined per "!= null" in myTestComputedProperty, sonst kommt es
          zu einem Fehler, weil die Auswertung offenbar schon erfolgt bevor mounted() fertig ist!
        - Der Wert in dem per im JS-Modul spezifizierter computed Property aktualisierten Feld ändert sich reaktiv!
        - Es wurde zum Testen :value statt v-model verwendet (mit v-model ist eventuell Zerlegung
          der computed Property in Getter/Setter notwendig!)
        - Die Tests mit einer computed Property sind erst einmal erfolgreich, mit Stefans Hilfe!
        - ==**Aber**==: ==Da die computed Properties mangels Parameter de facto nicht wissen, an welcher Baueigenschaft 
          sie arbeiten, sind sie nicht wirklich zu gebrauchen. Versucht man, sie mit einer Property an einer Baueigenschaft
          im Layout zu verknüpfen, müsste man für jede Baueigenschaft eine eigene Property definieren und eine
          auf diese Property zugeschnittene eigene computed Property - das wäre ein Nightmare bzgl. Maintenance!
          Man müsste dann im Template die computed Property ermitteln und dann am :value die Property
          abfragen und dann per ternary ?-Operator die darauf zugeschnittene computed Property angeben - und dies
          per Verschachtelung dieser Abfragen  für alle Baueigenschaften, die solche computed Properties haben==
      - ==**Hinweis**==: 
        - In baueinheit-raum-baueigenschafts-profil-formular wird für berechnete Felder zum Teil auch ==:value="subractNiveaus...()"== verwendet.
          Das ist ein **Methodenaufruf am :value mit Parametern** - diese sind Werte von Baueigenschaften im Profil Model. Diese Felder können dann 
          ebenfalls nicht geändert werden.
        - Diese Variante ist einfacher, zumal dieselbe Methode verwendet werden kann im Vergleich zu computed Properties, die
          mangels Parametern für jedes Feld individuell definiert werden müssen. 
        - Allerdings erfolgt hier ohne Weiteres keine automatische Aktualisierung,
          wenn die in die Berechnung eingehenden Felder geändert werden - bei computed Properties sorgt Vue dafür, dass diese reaktiv neu
          ausgewertet werden, wenn sich Werte ändern, die in deren Berechnung eingehen. Das sieht man auch in obigem Prototyp, wo das computed-Feld
          aktualisiert wird, wenn der Wert im ersten QSelect geändert wird, das in die Berechnung des computed-Felds eingeht.
        - Insofern ist diese Variante mit :value und Methodenaufruf eher für Felder geeignet, die nur einmal berechnet werden müssen, z.B. weil die 
          Berechnung nur von Werten von Baueigenschaften abhängig ist, die aus Elternknoten ererbt wurden.
        - ==**Trick**==: ==Allerdings kann auch mit dieser Variante per Vue $set trotzdem Reaktivität erzielt werden, indem das Feld, an dem dieses 
          :value = "methodenAufruf()" definiert ist, als Parameter mitgegeben wird, und dieses per Vue $set aktualisiert wird in der aufgerufenen 
          Methode!==
        - Diese Variante kann ebenfalls per JS-Modul implementiert werden - statt computed Properties dann echte Methoden
          mit Parametern im JS-Modul definiert. Auch diese benötigen wegen des Vue $set Zugriff auf this per Parameter self. 
      -  ==Diese Lösung mit Methodenaufrufen mit Parameter für die beteiligten Baueigenschaft(en) statt computed Properties
         mit diversen Testmethoden getestet (Tests 3 bis 5 in in baustoff-estrich-baueigenschafts-profil-formular.vue).==
        - ==Diese wie die computed Properties definiert in functions-baustoff-estrich-baueigenschafts-profil-formular.js==
        - ==Auch Ansteuerung aus dem Layout File über neue Prop setByFunction (z.B. ="testGenericFunction") getestet - diese
          kann im Template mittels ternary ?-Operator abgefragt werden==
      - ==**Update 16.02.2022**== 
        - In layout-gesteuertes-baueigenschafts-profil-formular.vue implementiert, zusammen mit neuen Profil "Baueinheit > Boden":
          - ==**Hinweis**==: Dabei wurden erst einmal keine profilformularspezifischen Funktionen in functions-baugeigenschafts-profil-formular.js
            benötigt, sondern alle Anforderungen wurden durch generalisierte Methoden in der allgemeinen Vue-Komponente
            layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue abgedeckt, was das Development damit einfacher macht!
          - Initialisierung/Vorbelegung von "lilafarbigen" Feldern mit Sollwerten - dies erfolgt nun doch in mounted(), watch() (2-mal), reset() per Aufruf von zentraler
            Funktion initializeIstWerteMitSollWerten(), generalisiert für alle Layouts, gesteuert über Prop initializeMitSollWert im Layout
          - Reset von Feldern über generalisierte Button-Funktion generalClickMethod() mit Prop clickAction="Reset" und weiteren Parametern per Props
          - ==**[TODO]**== Die beiden gerade genannten Funktionen müssen noch erweitert werden für andere Wertetypen außer Kennwert, 
            Aufzählungswert. Ob sie für Aufzählungswerte
            funktionieren, muss noch getestet werden (Arrays).
          - Berechnung von Feldern über generalisierte Button-Funktion generalClickMethod() mit Prop clickAction="Calculate" und weiterem Parameter per Prop
    - ==**[WORK]**== **Initialisierung von Feldern** in mounted(), watch() (= refresh(), 2-mal), reset() mit Default-Werten
      - Diese kommen meistens aus den aus Elternknoten ererbten gemeinsamen Baueigenschaften aus einem Elternprofil
      - Hier könnte man die Bezeichnung der gemeinsamen Baueigenschaft mit dem Elternprofil als Property im Layout File halten, damit die entsprechende
        Initialisierung mit dem Wert dieser Baueigenschaft durchgeführt werden kann
      - Dabei **Istwertfelder**, falls null, mit Werten aus **Sollwertfeldern** vorinitialisieren
      - Vorlage: initializeIstwerteMitSollwerten() in baueinheit-raum-baueigenschafts-profil-formular.vue
        - Wird aufgerufen in mounted(), reset(), watch() (= refresh())
        - Wandert durch das Layout und führt diese Initialisierungen durch per $set
      - Dafür müssten die Felder über Properties im Layout File verknüpft werden, ähnlich wie in layout-baueinheit-bodenaufbau-baueigenschafts-profil-formular.vue
      - Implementierbar mit Variante obiger Methoden per Methode, welche die Bezeichnung der Sollwert-Baueigenschaft und die zu aktualisierende Istwert-Baueigenschaft
        als Parameter hat, und so immer für korrekte Aktualisierung sorgt. Aufrufbar in mounted(), reset(), watch() (= refresh()) durch generische Iteration
        über das Layout und Aufruf der Funktion für alle Felder, welche neue Prop initializeMitSollwert auf "true" hat und dazu baueigenschaftsBezeichnungSollwert als weitere Prop
      - Getestet mit Test 10 in functions-baustoff-estrich-baueigenschafts-profil-formular.testGeneralInitializeMethod(), per Button statt mounted() etc.
      - **Verworfene Alternative**: In Test 11 eine Funktion sollIstWertePaarSetMethod() erprobt, welche gesteuert durch Prop setMethod="sollIstWertePaarSetMethod" und Prop
        "sollWertBaueigenschaft" per :value den Istwert, falls er null ist, mit dem Sollwert vorbelegt. Dies funktioniert aber nur an
        readonly-Feldern, an echten Eingabefeldern kommt es zu Problemen beim Speichern und mit vom Benutzer gesetzten null-Werten!
      - ==**Lösung**==: In layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue dafür eine neue generalisierte Methode
        initializeIstWerteMitSollWerten() eingeführt, welche alle im Layout mit Prop initializeMitSollWert gekennzeichneten
        Felder, ==die nicht null sind==, mit dem Wert einer per paariger Prop auszuwählenden Sollwert-Baueigenschaft initialisiert
    - ==**[WORK]**== **Steuernde Aufzählungswerte**, die beim Setzen andere Felder auf readonly setzen
      - Dies könnte auch für Baustoffe interessant sein
      - Vorlage: baueinheit-standort-baueigenschafts-profil-formular.vue
      - Verwendet computed-Funktion im v-model, Update der anderen Felder per $set
      - Zum Zugriff/Update der Werte gilt dasselbe wie für die computed-Funktionen oben
      - Zu prüfen (Test 7
        in baustoff-estrich-baueigenschafts-profil-formular.vue): :readonly-Prop am QSelect, welche rechts reaktiv einen JS-Ausdruck auswertet, der direkt aus dem Layout File kommt, z.B.
        :readonly="profilModelAusgewaehlterKnoten[findeIndexVonBaueigenschaft('Baustoff > Estrich > Bindemittelart')].aufzaehlungsWert..."
      - Achtung: Solche JS-Expressions direkt im Layout-JS-Modul funktionieren nicht (siehe Test 7)! Da sie auf Daten und Funktionen aus der Vue-Komponente zugreifen müssen,
        muss dies ebenfalls über Methoden im JS-Modul functions-baustoff-estrich-baueigenschafts-profil-formular.js gesteuert werden - siehe Test 8
        in baustoff-estrich-baueigenschafts-profil-formular.vue, Methode testSpecificReadonlyMethod() - setzt ein Feld auf null, wenn ein Aufzählungswert einer anderen Baueigenschaft einen
        bestimmten Wert hat
      - Weiterer Ausbau: Den Wert des steuernden Aufzählungswert aus Prop im Layout holen und der Methode übergeben (=> Test 9 und 10)
      - ==**Achtung**==: 
        - Kritisch dabei ist auch das richtige Zurücksetzen, wenn ein steuernder Aufzählungswert geändert oder auf null gesetzt wird. Das ist bisher nicht realisiert!
        - Kritisch sind auch die null-Prüfungen für Aufzählungswerte, diese können Arrays (durchaus auch mit Länge 0!!!) oder null sein, wahrscheinlich auch Strings, z.B. bei single Selection
    - ==**[WORK]**== Generische **Wertevergleiche** (wird wahrscheinlich nur an Baueinheiten benötigt, nicht an Baustoffen)
      - Dafür müssten die zu vergleichenden Felder über Properties im Layout File verknüpft werden, ähnlich wie in baueinheit-raum-baueigenschafts-profil-formular.vue
        oder baueinheit-schicht-baueigenschafts-profil-formular.vue
      - Hierfür kann man eine Spalte im Layout benutzen (wo normalerweise ein Feld für eine Baueigenschaft angezeigt wird), welche über eine spezielle Prop angesteuert wird (specialField: "Comparison") für die Anzeige des Vergleichsergebnisses (bisher Aufwärts- bzw. Abwärtspfeile). Realisiert für Kennwerte
      in Funktion generalComparisonFunction(linkeBaueigenschaft, rechteBaueigenschaft, mode) in layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue.
      - ==**[TODO]**== Kann noch erweitert werden mit anderen Operatoren, etc.
    - ==**[WORK]**== **Buttons** (wird wahrscheinlich nur an Baueinheiten benötigt, nicht an Baustoffen)
      - Hierfür würde man im Layout statt der Anzeige eines Eingabefelds für eine Baueigenschaft eine spezielle Logik auslösen, die einen Button anzeigt. Dabei gibt es zwei Arten von Buttons:
        - **Link-Buttons** (URL anzeigen) - dies ginge über einen Button, der einen per Prop mitgegebenen Link in einem neuen Browser-Fenster aufruft (QButton mit type="a",
          target=_"blank" und href-Property) - bereits implementiert und getestet in layout-allgemein-test-wertetypen-baueigenschafts-profil-formular.js
        - **Funktions-Buttons** (Funktion aufrufen) - dies würde einen Button anzeigen, der per @click eine per Prop identifizierte Funktion aus dem JS-Modul für die Functions für das Layout 
          aufruft, welche als Parameter weitere Props
          aus dem Layout verarbeiten würde, z.B. ein als Ergebnis der Funktion zu befüllendes Feld (per Vue $set): So könnte man z.B. eine Gesamtfläche (z.B. eines Trennbauteils) als Summe aller
          Einzelflächen von Kindbaueinheiten (z.B. der Wandaufbauten, Fenster, etc.) additiv berechnen, oder subtraktiv als Netto-Differenz einer Brutto-Gesamtfläche (z.B. eines Trennbauteils, könnte weiterer Parameter sein) minus der Summme aller Einzelflächen von Kindbaueinheiten (z.B. der Wandaufbauten, Fenster, etc.)
    -  ==**[WORK]**== **Füll- bzw. Leerfelder** - diese würden über eine Logik im Layout statt eines Eingabefelds für eine Baueigenschaft lediglich einen Text (Prop an "filler") oder eine leere Spalte anzeigen (div mit 
       class="col-md-x col-12") statt eines Eingabfeldes. Dies könnte für Hinweistexte neben Feldern oder für spezielle Formatierungen mit Leerspalten benutzt werden.
       Bereits implementiert und getestet in layout-allgemein-test-wertetypen-baueigenschafts-profil-formular.js
    - ==**Achtung**==: Wie die letzten beiden Formatierungs-Konstrukte im Layout angesteuert würden, wird im Folgenden beschrieben
      - Entweder werden sie durch ausgezeichnete Baueigenschaftsbezeichnungen (z.B. "Filler", "Button") angesteuert, oder das Layout-Schema muss dafür geändert werden mit
        unterschiedliche Typen von Unterobjekten im Array baueigenschaftenInRubrik[] (reguläre für Baueigenschaften wie bisher und spezielle für Füllfelder und Buttons)
      - Die zweite Option wurde gewählt - die Objekte dafür im Array baueigenschaftenInRubrik im Layout "unterbrechen" die bisherigen Baueigenschafts-Objekte im Layout (auch deren Indexierung im 
        Profil Model, denn in mounted() ist baueigenschaftsBezeichnung an diesen Objekten undefined!
      - Beispiel für erste Option (verworfen):
        ```javascript
        { // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
          baueigenschaftsBezeichnung: "Filler", // Ausgezeichneter Wert für Füllfeld, löst in der Template-Logik entsprechendes div aus
          indexInProfilModelAusgewaehlterKnoten: null, // Aus Kompatibilitätsgründen, bleibt null, muss beim Befüllen der Indizes in mounted() ausgesteuert werden, dort wo heute nur auf
          // baueigenschaftsBezeichung != undefined abgeprüft wird!
          fillText: "Blabla", // Wird in der Template-Logik per Moustache im div angezeigt
        },
        ```
      - Beispiel für Filler mit zweiter Option (gewählt):
        ```javascript
        { // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
          // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit speicalField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
          // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialFiled nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
          specialField: "Filler", // Neue optionale Prop für Füllfeld ("filler") oder Button ("Button), löst in der Template-Logik entsprechendes div aus
          fillText: "Blabla", // Wird in der Template-Logik per Moustache im div angezeigt, falls specialField "Filler"
        },
        ```
      - Beispiel für Link mit zweiter Option (gewählt):
        ``` javascript
        { // baueigenschaftenInRubrik[n] // Feld wird wie ein reguläres Feld mitgezählt in den Feldern der Rubrik, wichtig für darauf basierende Berechnungen z.B. der Anzahl Spalten!
          // baueigenschaftsBezeichnung: "null", // ACHTUNG: Wenn man zusammen mit speicalField diese Prop als "null" angibt, kommt Fehlermeldung, dass das Layout Baueigenschaften enthält, die nicht im Profil sind!!!
          // indexInProfilModelAusgewaehlterKnoten: null, // ACHTUNG: Bei specialFiled nicht erforderlich, der Fall wird beim Befüllen der Indizes in mounted() bereits ausgesteuert durch Prüfung auf baueigenschaftsBezeichnung !== undefined!
          specialField: "Link", // Neue optionale Prop für Füllfeld ("filler") oder Link ("Link") oder Button ("Button"), löst in der Template-Logik entsprechendes div aus
          linkButton: "https://www.spiegel.de", // Wird in der Template-Logik per q-btn mit type="a" und href angezeigt, falls specialField "Link"
          colorButton: "purple-5 text-white", // Farbe für den Button
          labelButton: "SPIEGEL Online" // Label für den Button
        },
        ```
  - ==**[WORK]**== Variante der Komponente für die **Filterung** von Baueigenschaften, analog zu filter-generisches-baueigenschafts-profil-formular.vue
    - Dafür könnte sie auf dem selben Layout arbeiten wie bisher, aber bestimmte Felder würden per **Prop** (z.B. filterField: true) für die Filterung getagged
      werden
    - Allerdings erfordert die Filterung eher ein **anderes Layout** der zu filternden Baueigenschaften, daher sollte man doch ein alternatives Layout verwenden
    - Dieses erfordert auch Eingabefelder für **Vergleichsoperatoren,** die wiederum per Prop gesteuert werden könnten, da sie abhängig vom Wertetyp der zu vergleichenden Baueigenschaft sind
    - ==**Update**==:
    - In baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue diese Filter-Variante implementiert.
    - ==Achtung: Dafür muss zum Test erst ein Filter-Baueigenschaftsprofilformular, "Baustoff > Filter > Estrich" angelegt werden!
      Wird mittlerweile in back-end-server.js mit angelegt.==
  - ==**Hinweis**== Eine **readonly-Option** für die Komponente ist bereits vorbereitet durch die Prop benutzerDarfBearbeitenSelectedNode der Komponente, über die per "false" alle
      Felder nach readonly geschaltet werden können (siehe oben)
    - Allerdings musste doch eine weitere generelle Prop readonlyAusZugeordneteBaustoffeBaueinheit (Boolean) eingeführt werden dafür, da noch andere Dinge zu steuern sind
    - In mounted(), watch() (2-mal), reset() muss dann der betreffende Baustoff per API mit allen seinen Baueigenschaften gelesen werden, denn diese sind nicht populiert im
      eingeschränkten Baustoffbaum innerhalb von baueinheiten.vue!
    - Außerdem wird die Eintragung der wertevererbenen Elternknoten erst einmal geskippt, denn dazu würden alle Werte von Baueigenschaften im gesamten Pfad bis zur Wurzel des
      Baustoffbaums benötigt - cyanfarbige Kennzeichnung entfällt dann erst einmal bei readonly-Option
  - ==**[WORK]**== (Prio 3) Möglichkeit, die ausklappbare Anleitung zur Werteeingabe abzuschalten - diese wird allerdings per Layout gesteuert, d.h. entweder bräuchte man ein zweites Layout File mit
    dieser Prop unterschiedlich, oder müsste es temporär im Profil Model festhalten, ähnlich wie bei den orangefarbigen Feldern, nur dass man es generell
    in mounted(), watch() (2-mal), reset() setzen könnte, da es immer unterdrückt werden soll, wenn Prop readonlyAusZugeordneteBaustoffeBaueinheit true ist
    Einstweilen ist es als Hack per speziellem v-if für das Rendering von hinweiseRubrik im Template Code von layout-gesteuertes-generisches-baueigenschafts-profil-formular.vue eingebaut!
  - ==**[DONE]**== Unterstützung von **QOptionGroup** mit type="checkbox" oder "radio" statt **QSelect** für Aufzählungswerte. Dafür kann als Vorlage z.B.
    baueinheit-standort-baueigenschafts-profil-formular.vue dienen, wo q-option-group z.B. im Tab "Hydrogeologie" in der untersten Rubrik verwendet wird für 2 Aufzählungswerte.
    Die Ansteuerung sollte per v-if auf einer neuen Prop "optionGroup: true" erfolgen, alternativ auch direkt durch Angabe von "options: [ {label: "abc", value: "xyz", color: "uvw"}, ..., { ... } ]". Die Differenzierung zwischen type="checkbox" und type="radio" erfolgt über die Prop "radio: true" oder "radio: false".
    ==Achtung==: Beim Rendern muss über der Option-Group noch ein **Label** für das Feld angezeigt werden (aus labelBaueigenschaft im Layout oder aus
    typbezogeneBaueigenschaft.anzeigeText im Profil Model). Außerdem funktionierte der **Tooltip** auf einer solchen OptionGroup ursprünglich nicht, der musste
    hinter die q-option-group gehängt werden, nicht in diese - überall bereits gefixt (q-option-groups wurden bisher nur in "Standort" verwendet).
    ==**Update**==: QOptionGroup als Alternative zum QSelect ist mittlerweile unterstützt, siehe layout-baustoff-estrich-baueigenschafts-profil-formular.js

---
#### **[Epic 38.p]** ==**[WORK]**== Filter (für Baustoffe und Baueinheiten)

- Es soll ein neues Konstrukt **"Filter**" als konfiguratives Konstrukt bzw. sogar im Metamodell/Schema von BIM.click eingeführt werden
- Mit diesem soll nach Werten von Baueigenschaften in Baustoffen und Baueinheiten gefiltert werden können
  - z.B. Suche nach passenden Baustoffen, abhängig von Sollwerten an Baueinheiten
  - Laut Erik spielen dabei auch Baueinheiten aus dem Elternpfad eine Rolle (z.B. Rutschfestigkeitsklasse aus dem Raum für Baustoffe an Bodenbelägen)
- Laut Erik gibt es z.B. beim Bodenbelag allein ca. 30 mögliche Filterfelder aus den Baueigenschaften des zugehörigen Profils!
  - Die Filter-Performance und Bedienbarkeit dafür ist zu bedenken!
- Es gibt einen Zusammenhang zwischen Filtern und **Baueigenschaftsprofilen**
  - Filter könnten **spezielle Profile** sein
    - Dann könnten sie auch Baueigenschaften enthalten, die ansonsten unterschiedlichen Profilen zugeordnet sind
  - Filter könnten **Untermengen von Baueigenschaften** in Profilen sein
    - Dann wäre die Auswahl eingegrenzter, zu Lasten der Flexibilität
  - Im allgemeinsten Sinn wären es Mengen von Untermengen von Profilen
- ==**Achtung**==: 
  - Man muss dann bei der Auswahl bzw. bei der Filterung beachten, dass Baueigenschaften jetzt auch an nur einem der beiden Bäume angelegt sein können, aus
    Performance-Gründen!
  - Die Definition der Filter ist daher eher eine Funktion, die jeweils spezifisch für "Baueinheiten" und "Baustoffe" wäre (wenn Baueigenschaften und
    Profile nicht ein Metamodellerweiterung erfahren, die steuert, in welchen Bäumen sie angelegt sind/werden)
  - In eine Filterung geht auch ein, welche Profile und damit Baueigenschaften in einem zu filternden Zweig oder
    an einem zu filternden Knoten überhaupt aktiviert sind - in Baueigenschaften, die nicht aktiviert sind, kann auch nicht gefiltert werden
  - Insofern wären Filter dann Untermengen von aktivierten Profilen
  - In einer Ausbaustufe (wahrscheinlich Prio 3) könnten in einem Filter auch mehrere solche Untermengen von aktivierten Profilen kombiniert werden
- Außerdem sollte ein Filter auch mit dem/den **zu durchsuchenden Unterzweig(en)** in den Bäumen (z.B. im Baustoffbaum) konfigurierbar sein!
- Aus Filtern könnten dann Suchmasken, d.h. **spezielle Filter-Profilformulare** generiert bzw. konfiguriert werden (UI und Queries)
  - Allerdings muss dabei auch die **Rückgabe von Suchergebnissen** bedacht werden
- Es ist zu entscheiden, ob das Anlegen von Filtern eine Administrator- oder Endbenutzerfunktion wird
  - Diese für den Endbenutzer zu exposen, ist nur sinnvoll, wenn auch die damit verbundene
    Generierung der Suchmasken mit einbezogen ist und somit ebenfalls konfigurativ mit gesteuert wird, damit die Endbenutzer auf "ihren" definierten Filtern dann von der Filtereingabe über die dadurch getriggerten Queries inklusive der Präsentation der Ergebnisse alles beeinflussen können
  - Das wäre dann allerdings ein deutlich großes Rad, das zu drehen wäre
- Ansonsten könnte man Filter auch (ähnlich wie Layouts) erst einmal nur **per JSON Config Files** verwalten
- Bei der Filterung können außerdem folgende **Ausbaustufen** unterschieden werden:
  1. **Manuelle Zuordnung von Baustoffen im Baustoffbaum an Baueinheiten im Bauvorhabenbaum**
     im Tab „Zugeordnete Baustoffe“ z.B. für eine Schicht im 
     Bauvorhabenbaum (z.B. einen Bodenbelag) durch manuelle Navigation im Baustoffbaum und Aussuchen eines/mehrerer passender Baustoffe – das ist dann die manuelle „Hochzeit“, die eigentlich ja heute schon funktioniert (außer dass die Baustoffe dafür noch weitgehend „leer“ sind.
     In dieser Grundstufe 1 nimmt der Anwender die Auswahl (d.h. die Checkmarks in „Zugeordnete Baustoffe“) der passenden Baustoffe allein aufgrund seines Wissens, ohne Filter und ohne Wizard vor, indem er durch den Baustoffbaum navigiert, und ggf. Datenblätter am Baustoff anschaut, und dann die passenden Baustoffe zur Zuordnung ankreuzt. In dieser Stufe soll die (manuell vom Anwender zu navigierende) Struktur des Baustoffbaums nur dazu helfen, dass er sich darin zurechtfindet.
  2. **Rechnergestütztes Suchen/Filtern nach geeigneten Baustoffen aufgrund bestimmter Anwendervorgaben**
     - in bestimmten Zweigen des Baustoffbaums (die der Anwender auswählt), **und** gleichzeitig
     - aufgrund bestimmter Kombinationen von Baueigenschaften (Vorgaben), die der Anwender manuell mit Werten befüllt (d.h. Filterfelder)
     In dieser Ausbaustufe (prototypisch bereits vorhanden für "Baustoffe > Estrich" kann der Anwender also vor der „Hochzeit“ bestimmte Baustoffe herausfiltern aus der Gesamtmasse von Baustoffen im 
     Baustoffbaum, aber er 
     muss die Filterfelder und in welchen Zweigen er filtern will (immer noch selbst manuell ausfüllen. Für 6 Estrich-Eigenschaften funktioniert
     das bereits. In dieser Ausbaustufe sollte die Struktur des Baustoffbaums mithelfen, dass die Maschine nicht immer in der gesamten Menge der 
     Estriche suchen muss, sondern nur in bestimmten Zweigen.
  3. **Wizard-gesteuertes Suchen/Filtern nach geeigneten Baustoffen**
     Hier soll „die Maschine“ auf Grund  der situativen Vorgaben (wir sind in bestimmtem Raum mit Nutzungstyp, wir sind an 
     bestimmter Schicht im Bauvorhabenbaum) die geeigneten Baustoffe vorschlagen – im Grunde kann man das als maschinengesteuerte Variante von #2 
     ansehen. Da weiß dann die Maschine, in welchen Zweigen sie nach Baustoffen suchen soll, und füllt auch die Filterfelder selber passend aus 
     (bzw. aufgrund Wizard-gesteuerter Entscheidungen des Anwenders). Vorbild: Fermacell Bodenplaner-Wizard, https://www.bodenplaner.com
  - ==**Update 21.02.2022**== zum Filter-Design (teilweise wieder verworfen, siehe nächster Update vom 22.02.2022):
    - Ein einzelner Filter enthielte dann einen **Array von wertbezogenen Baueigenschaften** mit Verweisen auf jeweils eine **typbezogene Baueigenschaft**
    - Eventuell braucht man im Model noch einige extra Properties, z.B. (siehe Operatoren unten) an jeder wertbezogenen Baueigenschaft und natürlich an jedem Filter als Ganzes
      (baueigenschaftsFilterBezeichnung, baueigenschaftsFilterBemerkung, baueigenschaftsFilterBeschreibung etc.)
    - (Verworfen) Dazu würde man ein neues **BaueigenschaftsFilterModel** am Backend definieren, mit einem Controller dafür - so könnten Filter angelegt werden, aktualisiert werden, gelöscht werden (CRUD-Methoden)
      - Sie könnten damit auch gleich Default-Werte für das Filtern mit speichern (allerdings dann für alle Benutzer!)
    - (Verworfen) Am Frontend entspräche dem dann eine Komponente baueigenschafts-filter.vue, welche die existierenden Filter (systemweit?) tabellarisch anzeigt, und es erlaubt, neue zu definieren und bisherige zu löschen
      - Die Filter könnten als Tabelle verwaltet werden (analog zu "Baueigenschaften" > "Baueigenschaftsprofile", dahinter könnte neues Unter-Tab "Filter" oder "Baueigenschaftsfilter"
        eingefügt werden
      - Für jeden Filter muss es dann ein Tab geben, in dem die zugeordneten Baueigenschaften des Filters  angezeigt werden (analog zu "Baueigenschaftsprofile" > Details zum ausgewählten 
        Baueigenschaftsprofil" > "Zugeordnete Baueigenschaften am Baueigenschaftsprofil" - diese neuen Tabs hießen dann "Baueigenschaftsfilter" > "Details zum ausgwählten
        Baueigenschaftsfilter" > "Zugeordnete Baueigenschaften am Baueigenschaftsfilter")
      - ==Der Frontend Code könnte also aus baueigenschafts-profile.vue und seinen Unterkomponenten beschreibung-tab-baueigenschafts-profil, uebersicht-tab-baueigenschafts-profil und 
        details-tab-baueigenschafts-proifl, sowie ggf. vorgabe-werte-tab-baueigenschafts-profil abgeleitet werden==
      - In details-tab-baueigenschafts-filter.vue (abgeleitet aus details-tab-baueigenschafts-profil.vue) müssten dann in die QTable noch Buttons zum Bewegen von zugeordneten
        Baueigenschaften bzgl. der anzuzeigenden Reihenfolge eingebaut werden - die Auswahl der zugeordneten Baueigenschaften im Filter würde ebenfalls über ein QSelect mit Chips
        für die Baueigenschaften erfolgen
      - Die Reihenfolge wäre dann nicht alphabetisch wie bei den zugeordneten Baueigenschaften eines Profils, sondern benutzerdefiniert. Es muss also eine Möglichkeit geben, die Reihenfolge 
        der zugeordneten Baueigenschaften im Filter zu ändern (mit Buttons ähnlich wie im Bodenaufbau-Editor)
      - Vorlage: https://codepen.io/mickey58/pen/eYYVqWv (dort bisher nur "Delete" und "Update"-Button, "Move Up"- und "Move Down"-Buttons sind analog zu Delete - vgl.
        Funktion swapSchichtPosition() in bodenaufbau-baueigenschafts-profil-formular.vue
      - Ob es zusätzlich optional ausfüllbare Vorgabewerte geben soll für jede zugeordnete Baueigenschaft, ist noch zu entscheiden
    - Es könnten so flexibel Baueigenschaften aus beliebigen Profilen zusammen in einen Filter verpackt werden, was erwünscht ist!
    - Es muss allerdings wohl sicherheitshalber sowieso schon beim Laden eines Filters geprüft werden, ob die im Filter enthaltenen Baueigenschaften am Wurzelknoten des
      mit dem Filter zu durchsuchenden Zweigs im Baum (bisher nur Baustoffbaum, zunächst unter "Baueinheiten" > "Zugeordnete Baustoffe", später eventuell für generelles
      Filtern in "Baustoffe") angelegt und aktiviert sind!
    - Ob das **Layout** für einen solchen Filter gleich mit an diesem FilterModel modelliert wird oder separat verwaltet werden soll, ist noch zu entscheiden
    - Da das Layout dafür sehr einfach sein wird (lineare Liste, allerdings muss die Reihenfolge der Felder änderbar sein) könnte es einfachheitshalber weggelassen werden
      und die (änderbare) anzuzeigende Reihenfolge der Felder durch den obigen Array der wertbezogenen Baueigenschaften verwaltet werden, ohne separates Layout - ein
      Layout File im bisherigen Sinne will man sowieso vermeiden, da die Filter ja dynamisch erzeugbar sein sollen von Benutzern oder zumindest Administratoren!
    - Es müssen allerdings auch noch **Vergleichsoperatoren** für die beteiligten Felder vorgehalten werden - wenn Vorgabewerte
      für die eigentlichen Werte gespeichert werden sollen, müsste man aus Konsistenzgründen wahrscheinlich auch Default-Werte für diese Operatoren vorhalten.
      - Dabei müssen mittelfristig auch **Vergleichsoperatoren für Wertepaare** (Kennwertepaare, Bezeichnunsgwertepaare, Datumswertepaare, Tageszeitwertepaare) unterstützt werden,
        wozu dann eine Art "included" oder "excluded in range" gehört, was auf entsprechende Filter in MongoDB abgebildet werden müsste
    - (Verworfen) Allerdings könnte man die Vorgabewerte eventuell generell eher benutzerspezifisch speichern, dann wären sie individuell anpassbar. Dazu könnte man als Model-Erweiterung 
      in einer Ausbaustufe im Model für die Baueigenschaftsprofile auch einen
      Array dieser Vorgabewerte pro Benutzer in einen gemeinsamen Array der Vorgabewerte an einer zugeordneten Baueigenschaft pushen, und so individuelle Vorgabewerte pro
      Benutzer unterstützen!
    - Besser wäre es aber, sowieso die in die Filterfelder aktuell eingegebenen Werte benutzerspezifisch abspeicherbar zu machen - dazu müsste (siehe unten) das profilModelZuFilterndeBaueigenschaften
      in der submit-Methode abspeicherbar sein und z.B. per Controller-Erweiterung im Benutzer-Model abgespeichert werden
  - ==**Update 22.02.2022**== zum Filter-Design:
    - ==Auf Grund der hohen Übereinstimmung (siehe oben) sollte für die Definition der in einem Filter verwendeten Baueigenschaften das ==bisherige Konstrukt **"Baueigenschaftsprofil"**
      auch für Filter== benutzt werden - man könnte dann auch zusätzliche **"Filterprofile"** speziell für Filter anlegen (z.B. "Baustoff > Filter > ..."), welche Baueigenschaften aus mehreren
      Profilen enthalten können (z.B. "Baustoff", "Baustoff > Estrich")==
    - (Verworfen) Das Profilformular dafür könnte eventuell über eine Prop des layoutgesteuerten generischen Profilformulars (z.B. "filterModus: true") angesteuert werden (welches als existierende Prop dann auch das Profil für den Filter übergeben bekommt)
    - ==**Conclusion:** Da es (siehe unten) jedoch auf einem eigenen, aber einzigen Layout File Format arbeiten soll, ist es vermutlich doch besser, den Code von layout-gesteuertes-generisches-baueigenschafts-profil-formular
      zu duplizieren, zumal dieses im Bauvorhabenbaum ja noch an sehr vielen anderen Stellen für Baueinheiten aufgerufen wird und auch die Logik anders ist in mounted(), watch() (= Refresh, 2-mal), reset() (nicht benötigt,
      außer man will es auf Vorgabewerte oder gespeicherte Werte zurücksetzen), submit() (nicht benötitgt, falls man die Werte in den Filterfeldern nicht speichern will, dafür wird filtereBaustoffe() 
      benötigt zum Filtern!)==
    - Bezüglich des Layouts und der Logik des Formulars ist zu entscheiden, ob
      - das Layout vollautomatisch nur aus dem Baueigenschaftsprofil erzeugt wird - das geht mindestens in dem Punkt nicht, in dem eine Reihenfolge der Felder für die Anzeige spezifiziert werden muss
      - über ein **für jedes Filterprofil individuelles Layout File** gesteuert wird, in dem u.a. die jeweilige Reihenfolge der Felder für die Anzeige (pro Filterprofil) spezifiziert wird
        - Das provisorische filter-generisches-baueigenschafts-profil-formular.vue bestimmt aktuell hard coded die Reihenfolge, nach Abfrage des Profils (nur für "Baustoff > Estrich")
      - ==über ein **für alle Filterprofile gemeinsames Layout File** gesteuert wird, in dem u.a. die jeweilige Reihenfolge der Felder für die Anzeige (pro Filterprofil) spezifiziert wird==
    - Außerdem ist über das Format für das bzw.die Layouts zum Filtern zu entscheiden:
      - Im Filtermodus werden z.B. keine Unter-Tabs und vermutlich auch keine Rubriken benötigt
      - Sollte dieses Format also identisch sein mit dem normalen Format für Layouts?
      - Oder hat dieses ein spezielles, tendenziell einfacheres Format (keine Tabs, keine Rubriken)?
      - Das reguläre Layout dafür wäre 3-spaltig: Operator, 1. Filterfeld, 2. Filterfeld (für Wertepaare) - insofern auch ein Unterschied zum regulären Layout, das variable Spaltenanzahl hat
      - ==Die spricht insgesamt dafür, für das Filter-Layout ein eigenes Layout-Format zu haben==
    - ==**Conclusion:** Da dieses spezielle Filter-Layout für alle Filter gleich oder sehr ähnlich sein wird, spricht einiges dafür, ein gemeinsames Layout File zu haben, welches ein spezielles **"Filter-Layout" für 
      jedes Filterprofil** enthält, insbesondere natürlich die Reihenfolge der Felder für die Baueigenschaften im jeweiligen Filterprofil==
      - Dabei könnte man statt eines Arrays, der pro Filterprofil ein Objekt enthält, auch eine JS **"Pseudo-Map"** verwenden (d.h. ein Objekt):
        const filterMap = { "Baustoff > Filter > Estrich": { ... }, "Baustoff > Filter > Dämmstoff": { ... }, ... }
      - So angelegt in layout-baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.js
      - Der Zugriff im Code ist dann einfacher, per filterMap["Baustoff > Filter > Estrich"] statt mit Indexsuche im Array
      - Siehe https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
      - Frage: Muss man das aus dem Layout File kommende Objekt erst mit dem Map Constructor (new Map()) zur Map machen?
        - Antwort: Nicht unbedingt! (Siehe Test 23 in verwaltung.vue)
        - Genauer: Nur wenn man eine "echte" JS-Map daraus machen will
        - Diese hat einige Vorteile (zusätzliche Funktionen, Sortierung beim Einfügen wird garantiert), aber auch Nachteile (man muss sie erst mit new Map() erzeugen, teilweise
          sind Zugriffe dann mit .get statt direkt per map["key"] erforderlich - daher vorläufig in baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil-formular.vue keine
          "echte" JS Map, sondern JS "Pseudo-Map" (= JS Objekt) verwendet!
      - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
      - https://www.digitalocean.com/community/tutorials/understanding-map-and-set-objects-in-javascript-de
      - https://stackoverflow.com/questions/36644438/how-to-convert-a-plain-object-into-an-es6-map
        - Map Constructor erwartet als Parameter **Array** of key value pairs!
        - Dann müsste im Layout File doch ein Array statt eines Objekts stehen?
          - const filterMap = [ { "Baustoff > Filter > Estrich": { ... } }, { "Baustoff > Filter > Dämmstoff": { ... } }, ... ]
          - Ansonsten müsste man Object.entries() verwenden (siehe letzen SO Post oben)!
        - Offenbar nicht! (Siehe Test 23 in verwaltung.vue)
        - Siehe dazu die Hinweise weiter oben 
    - Tab-Struktur: Unter "Baustoffe filtern" könnte statt der bisherigen manuellen Auswahl per QSelect Unter-Tabs vorsehen (statisch), die denselben Aufbau haben wie in "Baustoffe", nämlich "Baustoffe", "Schichtbaustoff", "Beton", "Estrich", ...
    - Klickt man dann im Baustoffbaum (innerhalb "Zugeordnete Baustoffe") links einen Baustoff aus, könnte rechts im jeweils passenden Unter-Tab das passende Filter-Formular angezeigt werden, welches dann mit
      dem passende Filterprofil aufgerufen wird in dem zugehörigen q-tab-panel
    - Alternativ wäre eine manuelle Anwahl eines dieser Filter-Unter-Tabs möglich - dann müsste geprüft werden bzw. wäre automatisch möglich, dass im Baustoffbaum links der dazu passende Unterknoten ausgewählt wird
    - Dann muss es für jedes dieser Unter-Tabs einen passenden Filter bzw. genauer gesagt ein passendes "Filterprofil" geben (z.B. "Baustoff > Filter > Estrich")
    - ==Das neue layout-gesteuertes-generische-filter-baueigenschafts-profil-formular.vue soll dann wie folgt implementiert werden:==
      - Generell wäre es erst einmal eine Startkopie und Evolution von layout-gesteuertes-generisches-filter-baueigenschafts-profil-formular.vue 
      - Es muss wie in filter-generisches-baueigenschafts-profil-formular.vue ein eigenes, normalerweise nicht abzuspeicherndes Profil Model aufbauen
        - profilModelZuFilterndeBaueigenschaften
      - Eine Auswahl per QSelect, welches Filterformular aus der Map der Filterformulare es anzeigen soll, wäre sinnvoll (zumindest solange nicht eine per Prop
        gesteuerte Auswahl passiert, welche abhängig sein sollte vom links im Baustoffbaum für die zugeordneten Baustoffe ausgewählten Baustoff, bzw. genauer gesagt 
        dessen "relevantestes" Profil)
      - Es sollten zuerst wie in filter-generisches-baueigenschafts-profil-formular.mounted() die benötigten Profile gelesen werden - hier sind es die in 
        layout-baueinheit-zugeordnete-baustoffe-filter-baueigenschafts-profil.js enthaltenen Filterprofile statt aller Profile - insofern ist die dortige Methode readAlleProfile()
        anzupassen auf die Filterprofile - diese können dann in einem QSelect angezeigt werden, womit dann auch ein anderes Filterprofil ausgewählt werden kann
      - Das im QSelect ausgewählte bzw. per Prop mitgegebene Profil muss dann in das Profil Model geladen werden wie in layout-gesteuertes-generisches-baueigenschafts-profil.formular.mounted()
        - Dort wird zuerst das Profil, d.h. dessen Baueigenschaften aus dem Backend geladen (optional mit Vorgabewerten - siehe oben)
        - Dort werden auch die Indizes im Layout gesetzt
          - Es wird das gemeinsame Layout zu laden sein statt eines individuellen Layouts
          - Dafür muss in der Map im Layout das durch das Filterprofil als Key zu identifizierende Objekt bestückt werden 
      - Falls dieses nicht benutzerspezifisch abspeicherbar sein soll (Ausbaustufe, Speicherung in Benutzer-Model), benötigt es zunächst keine submit-Methode zum Speichern (nur eine für
      das Filtern) und auch nur eine spezielle reset-Methode (resetEingabeFelder())
        - Es könnte dabei noch zusätzlich/optional Vorgabewerte aus dem Profil in die Filter-Felder eintragen
      - Es benötigt zusätzlich den Button und die Logik aus filter-generisches-baueigenschafts-profil-formular.vue zum Laden von Sollwerten aus der ausgewählten Baueinheit
        - Die Soll-/Istwertbeziehungen dabei müssen per File gesteuert werden
        - Die jetzige provisorische Steuerung erfolgt über eine Datei korrespondierende-baueigenschaften.js, welche auch für das Readonly-Profilformular für Baustoffe benutzt wird
        - Dies könnte man wegen dieses Sharings beibehalten
        - ==**[TODO]**== ==Der entsprechende Button zum Übertragen von Werten aus einem Baustoff in korrespondierende Felder an einer Baueinheit muss in layout-gesteuertes-generisches-profil-formular.vue in seiner
            readonly-Option als Teil der "Hochzeit" noch implementiert werden!==
      -  Im Template wäre das Rendering einfacher, im Grunde wäre es nur ein v-for über die Baueigenschaften aus dem Layout, mit obiger mehrspaltiger Anzeige, und Auffächerung nach Wertetyp
      -  Es muss auf Button-Klick wie filter-generisches-baueigenschafts-profil-formular.vue die Methode filtereBaustoffe() aufrufen und den Baum mit den zugeordneten Baustoffen dann per Refresh-Request
         aktualisieren
  - ==**Update 28.02.2022**== zur Filter-Implementierung:
    - Erste Version von baueinheit-zugeordnete-baustofffe-filter-baueigenschafts-profil-formular.vue testweise in baueinheiten.vue aufrufbar gemacht. Status:
      - **[DONE]** Button für Reset, resetEingabefelder(ausgewaehltesBaueigenschaftsProfil)
      - **[DONE]** Bereinigung der Logik für die Überschrift
      - **[DONE]** QSelect zur Auswahl eines Filters, zu initialisieren mit übergebenem Filterprofil aus Prop - bisher getestet mit einem Filterprofil "Baustoff > Filter > Estrich"
      - **[DONE]** QSelects für ersten Vergleichsoperator - getestet für einfache Fälle
      - **[DONE]** Anpassung der Methoden für **[DONE]** mounted(), **[DONE]** reset() => resetEingabeFelder(), **[DONE]** refresh = watch() => mehrere
      - **[DONE]** Button und Methode zum Filtern: filtereBaustoffe() - getestet für einfache Fälle
      - **[DONE]** Button zum Übertragen von Sollwerten aus Baueinheit: ladeSollwerteAusAusgewaehlterBaueinheit() - getestet an Schicht "Estrich"
      - ==**[DEFER]**== Funktion determineReadonly() anpassen - diese liefert vorläufig immer "false" zurück, in Zukunft könnte man abfragen, ob bei ausgewähltem Baustoff eine Baueigenschaft
        aktiviert ist, allerdings müsste man dazu erst einmal einen Backend Call machen, wenn ein Baustoff ausgewählt wird, um die Baueigenschaften zu populieren.
        Dies einstweilen auf ==**[DEFER]**== gesetzt. Als Vorlage dazu könnte die Readonly-Variante von layout-gesteuertes-generisches-profil-formular.vue dienen, bei der in mounted(), watch() (2-mal), reset() der Baustoff gelesen wird.
      - ==**[TODO]**== Support für Wertepaare und zweiten Vergleichsoperator
---
#### **[Epic 38.q]** ==**[WORK]**== "Layout Builder" - Tool bzw. API zur Generierung von Layout Files für ein Baueigenschaftsprofil

- Dies wäre sehr hilfreich als Produktivitätstool für die Entwicklung.
- Später könnten darauf auch weitere Ausbaustufen aufsetzen, z.B. die eigenständige Entwicklung von Profilformularen durch Endbenutzer
- Diese Layout Files könnten vom Entwickler/Benutzer nacheditiert werden und würden dann direkt konsumiert vom generischen layoutgesteurten Profilformlar
- Es könnten z.B. Baueigenschaften umsortiert werden und diese in Tabs und Rubriken gruppiert werden
- Eventuell könnten nachgelagert dabei auch weitere Hilfstools (JSON Editor?) zum Einsatz kommen
- Input ist ein Baueigenschaftsprofil mit zugeordneten Baueigenschaften
- [Selektierte Alternative] Dieses kann am **Backend** in der Methode baueigenschafts-profile.controller.getBaueigenschaftsProfileQuery() ausgelesen werden, mit populierten 
  typbezogenen Baueigenschaften
  - Dort eine abgewandelte Controller-Methode exportLayoutBaueigenschaftsProfil() implementiert, die zumindest alle Baueigenschaftsbezeichnungen
    aus einem Profil als Felder in ein JSON-File schreibt in der erforderlichen Layout-Struktur, die dann als zu modifizierende Vorlage für das eigentliche Layout dienen kann
  - Man kann dabei mit fs.writeFileSync("data.js", JSON.stringify(layoutVorlageBaueigenschaftsProfilFormular, null, 2)) direkt in ein JSON-File schreiben
    - Siehe https://stackoverflow.com/questions/48611671/vue-js-write-json-object-to-local-file
  - Dies erzeugt JSON File, was nach Download mit einem JSON to JS Tool (z.B. Online-Tool) nach JS verwandelt werden kann
  - Dies wurde als Buttons in "Datenaustausch" > "Export" eingebaut (daten-austausch.vue)
- Das kann noch weiter ausgebaut werden, oder man setzt einen JSON-Editor ein zum Editieren des JSON-Files
- [Deselektierte Alternative] Am **Frontend** sind die erforderlichen Daten in "Baueigenschaften" > "Baueigenschaftsprofile" > "Zugeordnete Baueigenschaften am Baueigenschaftsprofil" 
  eigentlich bereits heute verfügbar - somit könnte auch dort ein Button eingebaut werden, der das File am Frontend schreibt und zum Download anbietet
  - Auf der QTable dort könnte man aufsetzen und daraus eine JSON-File generieren zum Download
  - Laut https://stackoverflow.com/questions/48611671/vue-js-write-json-object-to-local-file ist das am Frontend aber schwierig
  - Man kann am Frontend nicht einfach fs requiren und fs.writeFileSync() aufrufen (außer in Spezialfällen wie mit Electron)
    - Siehe https://forum.quasar-framework.org/topic/424/interacting-with-local-files/7
    - Siehe https://forum.quasar-framework.org/topic/384/help-loading-local-json-file-in-either-web-or-electron-contexts/3 
  - Stattdessen müsste man
    - (Variante 1) die Daten nach localStorage schreiben, oder
    - (Variante 2) aus der JSON einen BLOB erzeugen und diesen zum Download anbieten
  - ==Alternativ gibt es für das Frontend diese Library **File Saver** genau dafür: https://github.com/eligrey/FileSaver.js==
- Beispiel für die Layout-Struktur (js-Notation):
```javascript
  const LayoutTestBaueigenschaftsProfilFormular = [
  { // layoutTestBaueigenschaftsProfilFormular[0] // Tab 0
    ueberschriftTab: "Überschrift für Tab 0",
    labelTab: "Anzeigetext für Tab 0", // Tab-Label
    rubrikenInTab: [
      { // rubrikenInTab[0] // Rubrik 0
        ueberschriftRubrik: "Überschrift für Rubrik 0",
        hideRubrik: false,
        farbeRubrik: "bg-blue-grey-2",
        spaltenRubrik: 4, // Neue Property - 1, 2, 3, 4, 6 oder 12 - Default ist 4
        baueigenschaftenInRubrik: [
          {
            // baueigenschaftenInRubrik[0]
            baueigenschaftsBezeichnung: "Allgemein > Test > Wertetypen > Dynamische Steifigkeit",
            indexInProfilModelAusgewaehlterKnoten: null, // Platzhalter für Index
            disable: false // Flag für Steuerung :disable am Feld
          }, // /Baueigenschaft
          // Platzhalter für weitere Baueigenschaften
        ], // /baueigenschaften in Rubrik
          // Hier provisorisch alle Baueigenschaften aus dem Profil eintragen
      }, // /Rubrik
      // Platzhalter für weitere Rubriken
    ]
  }, // /Tab
  // Platzhalter für weitere Tabs 
]
```
  - 

---

### **[Epic 38.r]** ==**[WORK]**== Neues Baueigenschaftsprofil "Trennbauteil" im Bauvorhabenbaum

- Dies wird gebraucht als Profil für Kindbaueinheiten, als Zwischenebene zwischen Räumen als Elternbaueinheit und weiteren Kindbaueinheiten, an denen Profile wie Bodenaufbau, Wandaufbau, Fenster, Türen ("Bauelemente", wobei dieser Begriff noch nicht fest definiert ist) etc. aktiviert sind
- Es modelliert Wände und Böden und dient der Zuordnung der untergeordneten Kindbaueinheiten zu diesen
- Vermutlich muss es durch zwei Profile (Bodentrennbauteil und Wandtrennbauteil) abgebildet werden, die aber ähnlich funktionieren
- Ohne diese Zwischenebene würden im Bauvorhabenbaum z.B. Fenster als Kindbaueiheiten unter Wandaufbauten hängen müssen (mit Schichten als Geschwistern, was den Schichteditor durcheinander brächte!)
- ==**[TODO]**== Für horizontale Bauteile entspricht es der ifcSlab (= Decke, Dachfläche und Bodenplatte), für vertikale der ifcWall
  - http://docs.buildingsmartalliance.org/IFC4x2_Bridge/schema/ifcsharedbldgelements/lexical/ifcslab.htm
  - http://docs.buildingsmartalliance.org/IFC4x2_Bridge/schema/ifcproductextension/lexical/ifcbuildingelement.htm - ifcSlab und ifcWall sind Geschwister
    unter ifcBuildingElement
- Implementierung:
  - Es muss das Profil mit seinen Baueigenschaften dafür entworfen werden (per Excel) und das Profilformular (Anzeigemasken) dafür entwickelt werden. Es handelt sich voraussichtlich um relativ wenige Eigenschaften.
  - Des weiteren müssen die vorhandenen Profile für „Bodenaufbau“ und „Schicht“ (= die Schicht im BVB) angepasst werden, dass sie diejenigen Baueigenschaften, die sie vom Standort oder Raum erben, „durchgereicht“ bekommen durch die neue Zwischenebene „Trennbauteil“.
- Außerdem müssen die heutigen Modelle im System manuell angepasst werden, dass sie dieses neue Konstrukt = Profil „Trennbauteil“ zwischen ihren Räumen und ihren Bodenaufbauten „reinziehen“, d.h. aktivieren.
- Außerdem muss die Logik angepasst werden für die Kontextmenüs, die steuert welche Arten von Profilen der Benutzer für dessen Kindknoten angeboten bekommt – dieser Teil ist relativ einfach.

---

### **[Epic 38.s]** ==**[WORK]**== Migration des BIM.click Frontends von Vue v2 nach Vue v3 und von Quasar v1 nach Quasar v2

- Vue Migration Guide:
  - https://v3-migration.vuejs.org/
- Quasar Upgrade Guide:
  - https://quasar.dev/start/upgrade-guide
- https://blog.logrocket.com/refactoring-vue-2-apps-vue-3/#migrating-vue-2-vue-3
- https://www.vuemastery.com/blog/vue-router-a-tutorial-for-vue-3/
- Lokaler Prototyp im März 2022 von Stefan
  - Änderungen sind markiert mit #VUE3 im Code
- Axios-Calls müssen im Zusammenspiel mit axios.js (Boot File) ggf. angepasst werden
  - Axios Default URL wird gesetzt in neuem Boot File axios.js
  - process.env.API kann in diesem Boot File offenbar nicht verwendet werden (offenbar wird es beim Quasar Boot erst am Schluss gesetzt)
  - quasar.conf.js kann es aber nach wie vor setzen wie in Quasar v1, und es ist auch definiert
  - Aber im Code für einen Axios Call funktioniert bisher nur ein Workaround, bei dem process.env.API, was bisher
    das richtige Axios Request URL Präfix bestimmt (lokal "http://localhost:8080", Production: https://bimclickserver.herokuapp.com) nicht mehr verwendet wird
  - Der Grund dafür ist, dass das Präfix der URL beim Aufruf von Axios warum auch immer inkorrekt gesetzt wird:
    - Ohne beim Axios create() gesetzte Default URL fügt Axios stets "http://localhost:4200" vorne an die URL beim Aufruf hinzu
    - Mit auf "http://localhost:8080" gesetzter Default URL wird immer diese vorne an die URL beim Aufruf hinzugefügt, so dass
      diese, wenn zusätzlich beim Request process.env.API vorne hinzugefügt wird, ein falsches, "doppeltes" URL Präfix entsteht
  - Damit kann noch nicht einfach lokal vs. Heroku unterschieden werden wie bisher!
  - Fehlerursache: Falsche JSON.stringifies in quasar.conf - gelöst!
- Frontend Routes funktionieren noch nicht
  - baustoffe.vue testweise fest integriert in my-layout.vue als Test
  - Fehlerursache: In my-layout.vue: <router-view> funktioniert nicht mit </router-view>, muss <router-view /> heißen
- myLayout: In created() mussten die Calls für den globalen Event Bus (Doku-/Hilfe-Steuerung) disabled werden ($root.$on)
  - Diese sind abgeschafft in Vue 3 (breaking Change)
  - https://v3-migration.vuejs.org/breaking-changes/events-api.html#events-api
  - Müssen durch Package ersetzt werden
    - https://github.com/developit/mitt
    - https://github.com/scottcorgan/tiny-emitter
- /statics muss ersetzt werden durch /public (Files dort werden alle angezogen) und /assets (Files dort werden selektiv von Webpack angezogen)
  - Siehe https://github.com/quasarframework/quasar/issues/11200
  - Viele Referenzen auf /statics ersetzt durch /public
  - Die Unterordner von /statics nach /public kopiert
- bind/.sync Modifiers müssen angepasst werden in den Templates
- Ersatz für VueAutonumeric: VueCurrencyInput
  - Siehe auch https://github.com/quasarframework/quasar/discussions/12301 
- ...

---
#### **[Epic 39]** **[DONE]** Entwicklungs-Workflow für ein spezifisches Baueigenschaftsprofilformular

1. Alle die durch das gewünschte Baueigenschaftsprofil myProfil zu verwaltenden relevanten **Baueigenschaften** einzeln definieren in baueigenschaften.js

- ==**Achtung**==: Seit Einführung der selektiven Anlage von Baueigenschaften im Baustoff- bzw. Bauvorhabenbaum müssen Baueigenschaften eingetragen werden in:
  - baustoff-baum-spezifische-baueigenschaften.js
  - bauvorhabven-baum-spezifische-baueigenschaften.js
  - allgemeine-baueigenschaften.js
  - ==baueigenschaften.js sollte eigentlich parallel alle Baueigenschaften aus diesen 3 Dateien enthalten, ist aber nicht mehr in Gebrauch!==

- Normalerweise wird die dafür notwendige JSON im neuesten XLSX-Sheet "BIM.click Baueigenschaften V1.x" generiert (letzte Spalte)
- Diese kann mittels Clipboard übertragen werden, d.h. in Excel Copy der betreffenden Zellen aus dieser Excel-Spalte für die generierte JSON, dann Paste in eine JSON-Datei in VS Code)
- Achtung: Manche Felder, z.B. "sollwertNichtIstwert" werden in der JSON-Generierung in Excel stets auf false gesetzt und müssen ggf. manuell geändert werden (Baueigenschaften, die Sollwerte repräsentieren, sollten dieses Feld auf true gesetzt haben)
- Sie kann z.B. bei Bedarf z.B. auf https://www.convertonline.io/convert/json-to-js von JSON nach JS (und zurück) umgewandelt werden bzw. mit VS Code Extensions json, JSON Tools, 
  JSON to JS Object

2. Das gewünschte **Baueigenschaftsprofil**, z.B. myProfil, definieren bzw. ein schon vorhandenes selektieren in back-end-server.js

- Dort die relevanten Baueigenschaften aus 1. hinzufügen zum Array, der die für das Profil zugehörigen Baueigenschaften in der Datenbank findet
  - var myQueryResult = await BaueigenschaftenModel.find() ...
  - Dabei stets auf Korrektheit der Baueigenschaftsbezeichnung achten, sonst gibt es Fehler!
  - In back-end-server.js await baueigenschaftsProfileController.createBaueigenschaftsProfilAtServerStart({ ... zugeordneteBaueigenschaften: [ ... ] hinten
    n-mal hinzufügen: { typbezogeneBaueigenschaft: myQueryResult[letzterIndex + x].\_id, definiertNichtUndefiniert: false, }, x von 1 bis n, wobei n die Zahl der neu in das Profil aufgenommenen Baueigenschaften ist. Dies sorgt dafür, dass alle bisherigen und die
    neuen Baueigenschaften bei Erzeugung des Profils mit aufgenommen werden

3. Nach diesen Schritten sollte zur Verifikation zunächst ein Sniff Test mit dem **generischen Baueigenschaftsprofilformular**
   durchgeführt werden (Tab "Baueinheiten" > "Fachliche Planung" > "Profile""), ob auch alle neu definierten
   Baueigenschaften im Baueigenschaftsprofil gemäß ihrem Wertetyp angezeigt werden und die Eingabe für alle Felder korrekt funktioniert.
4. Im BIM.click Frontend dann die **spezifische Vue-Komponente für das Baueigenschaftsprofilformular** für das betreffende Baueigenschaftsprofil implementieren:
   - Bezeichnung (Beispiel): my-profil-baueigenschafts-profil.vue in bim-click-fronte-end\src\components
   - Vorlagen dafür:
     - schicht-baueigenschafts-profil.vue (einfaches Layout mit einem Tab)
     - standort-baueigenchafts-profil.vue (mehrere Tabs mit verschiedenen Layout-Varianten, noch nicht alle Tabs/Forms sind reaktiv bzgl. Screen Size)
     - raum-baueigenschafts-profil.vue (viele Tabs, mit den neuesten Layouts, alle reaktiv)
   - Das **Layout** für ein Profil muss dabei spezifiziert werden in einer zusätzlichen, speziellen JS-Datei, z.B. layout-baueinheit-standort-baueigenschafts-profil-formular.js
   - Diese Datei ordnet bestimmte Baueigenschaften per ihrer Baueigenschaftsbezeichnung auf bestimmte Positionen im Layout zu
   - Das Layout wird in mounted() in einen für das Profil spezifischen Layout-Array, z.B. layoutBaueinheitStandortBaueigenschaftsProfilFormular[]
     übertragen, der für die Steuerung des Layouts zuständig ist
   - In jedem Objekt in diesem Layout-Array wird der Index für die betreffende Baueigenschaft im wichtigen "parallelen" Model-Array
     profilModelStandortBaueigenschaftsProfilFormular gehalten (dieser bleibt konstant) - dieser Model-Array wird für die VModels und
     auch zum Austausch mit dem API und Backend für das Profil benutzt - er enthält auch alle typbezogenen und wertbezogenen Felder der
     Baueigenschaft an der ausgewählten Baueinheit. Beim Drücken auf "Speichern" werden **alle** Baueigenschaften
     im Profil mit deren Werten an der ausgewählten Baueinheit aus diesem Array an das Backend geschickt.
     Beim Reset holt der Code die vorherigen Werte aus
     nodesTreeBaueinheiten (nicht vom Backend!). Dieser Model-Array ist somit eine Art Kopie der dem Profil
     zugehörigen Baueigenschaften an der ausgewählten Baueinheit. Mounted() und watch() Code macht die Initialisierungen, letzterer insbesondere beim Wechsel des Knotens im Baum.
   - Im Layout-Array, layout-my-profil-baueigenschafts-profil-formular.js, gibt es besondere Möglichkeiten, z.B. zum Rendern der jeweils geeigneten QInput/QSelect/QToggle/QOptionGroup-Felder in
     Abhängigkeit vom Wertetyp einer Baueigenschaft
   - Disable-Funktionen auf jedem Feld sorgen dafür, dass die entsprechenden Felder für eine Baueigenschaft disabled werden
     - wenn der Benutzer nicht Autor an der Baueinheit ist
     - wenn die Werte für die Baueigenschaft geerbt werden von einem Elternknoten
     - wenn die Baueigenschaft an der ausgewählten Baueinheit nicht aktiviert ist
   - Das so definierte Baueigenschaftsprofilformular muss einstweilen noch manuell in die Gesamtstruktur des UIs, z.B.
     in einem neu hinzuzufügenden Unter-Tab unter "Bauvorhaben/Baueinheitsprofilformulare" eingebunden werden - in einer
     Ausbaustufe solle es dafür bestimmte Automatismen geben
5. Darauf achten, dass neu definierte Baueigenschaften und das passende Baueigenschaftsprofil auch auf **Heroku** angelegt werden müssen:
   - Das passende Profil muss ggf. auf Heroku manuell angelegt werden (bisher ist kein Import für Profile vorhanden)
   - Die Baueigenschaften können manuell per UI auf Heroku angelegt und dem passenden Profil zugeordnet werden
   - Alternativ können sie auch importiert werden auf Heroku:
     - Dazu die neu definierten Baueigenschaften aus baueigenschaften.js extrahieren in einen Array in einer separaten Datei
     - Diesen Array nach JSON konvertiern, z.B. per https://www.convertonline.io/convert/js-to-json oder mit VS Code Tools
     - Achtung: Darauf achten, dass die JSON keine schon existierenden Baueigenschaften (Key ist die Baueigenschaftsbezeichnung)
       enthält, sonst wirft Mongoose beim Import duplicate Key Errors - der Import wird aber per Tests für die restlichen Baueigenschaften
       wohl trotzdem durchgeführt! Man kann Baueigenschaften, die man durch neue Definitionen ersetzen will, vor dem
       Import auf Heroku auch manuell per UI löschen im Tab "Baueigenschaften"
     - Den JSON-Array mit den neuen Baueigenschaften in ein JSON File, z.B.
       bim-click-back-end\tmp\upload\baueigenschaften-my-profil-import-nach-heroku-20201027.json, ablegen
       und per GitHub nach Heroku replizieren
     - Dann Build auf Heroku laufen lassen
     - Dann auf Heroku im Tab "Datenaustausch > Import > Baueigenschaften" die Bezeichnung des obigen JSON Files (ohne Pfad, mit
       File Extension .json) eingeben und dieses per Button importieren
     - Achtung: Dies ist ein asynchroner Vorgang, der lange dauern kann
     - Hinweis: Aktuell ist der Import so eingestellt, dass er keine existierenden Baueigenschaften löscht
     - Das Log für den BIM.click Backend Server zeigt das Ende aller Promises für einen solchen Import an (bei hunderten von
       Baueigenschaften kann das 10 bis 15 Minuten dauern)
   - Danach müssen sie noch dem passenden Profil hinzugefügt werden, ggf. auch einem bereits existierenden Profil!
   - Danach sollte auf Heroku stets ein ==**Refresh**== der Pages für Bauvorhaben und Baustoffe gemacht werden,
     damit dort die neuen Baueigenschaften aktualisiert werden und die Baueigenschaftsprofilformulare korrekt arbeiten!
   - Ggf. muss eine um neue Baueigenschaften erweitertes **Profil neu de-/aktiviert** werden an bestimmten Baueinheiten bzw. die
     einzelnen neu hinzugefügten Baueigenschaften können (um die Werte der existierenden Baueigenschaften nicht undefiniert
     zu machen durch eine Profildeaktivierung) auch
     **einzeln aktiviert** werden
   - Dabei genügt es, Baueigenschaften in dem Profil, welches erweitert wurde, die gemeinsam mit in der Hierarchie "höheren"
     Profilen sind, nur an den "unteren" Baueinheiten, deren Profil erweitert wurde, zu aktivieren!
   - Falls eine solche Aktivierung nicht erfolgt an einer Baueinheit, deren Profil um neue Baueigenschaften erweitert wurde,
     werden im zugehörigen Profilformular die neuen Felder disabled oder readonly sein, aufgrund obiger Disable-Funktionen!
   - Die bisherigen Profilformulare werden (ggf. nach Refresh) allerdings weiterhin angezeigt - in mounted für ein
     betroffenes Profilformular wird dann automatisch das
     neue Profil traversiert. Das aus dem bisherigen Layout File geladene Layout für dieses Profilformular wird dann mit
     den Daten aus dem neuen Profil befüllt, welches in diesem Schritt normalerweise eine echte Obermenge der im Layout verwendeten Baueigenschaften enthält.
   - In einem weiteren Schritt kann dann das Layout File erweitert werden
     um die im Profil neu hinzugefügten Baueigenschaften, dann kann der Code für das Profilformular entsprechend
     erweitert werden zur Anzeige von Ein-/Ausgabefeldern für die neu hinzugefügten Baueigenschaften.

---

#### **[Epic 40]** Selection in Quasar Tables

- https://stackoverflow.com/questions/56569707/how-do-i-identify-the-cell-selected-in-a-quasar-table
- Multiple Row Selection: https://codepen.io/anon/pen/PrNBpV
- Cell Selection: https://codepen.io/anon/pen/gNrdyL?editors=1010
- Multiple Rows Selection per Mousedown Events: https://jsfiddle.net/g8Rpe
  - Dazu verwendet: Vue System Modifier Keys - https://vuejs.org/v2/guide/events.html#System-Modifier-Keys

---

#### **[Epic 41]** UUIDs vs. ObjectIds in MongoDB

- Verschoben nach Epic #48

---

#### **[Epic 42]** Tipps zu Node.js und Umgang mit Promises in Node.js

- https://stackoverflow.com/questions/31413749/node-js-promise-all-and-foreach
  - ==Whenever you create a promise in a then, **return** it== - any promise you don't return will not be waited for outside.
- https://stackoverflow.com/questions/25751723/issue-in-returning-data-retrieved-from-db-queries-called-in-the-loop/25756564#25756564
- Promises und rekursive Funktionen:
  - https://blog.scottlogic.com/2017/09/14/asynchronous-recursion.html
  - https://www.bennadel.com/blog/3201-exploring-recursive-promises-in-javascript.htm
  - https://stackoverflow.com/questions/34711403/javascript-calling-recursive-functions-with-promises
  - https://medium.com/@hayavuk/perform-async-operations-sequentially-using-recursive-promises-in-javascript-c4e5ab921c37
- Gute Tipps hier: https://www.duringthedrive.com/2017/10/27/functional-node-js-working-with-promises/
- ==Vorschlag für verbesserte Struktur einer Node App am Backend:==
  - https://www.titanwolf.org/Network/q/5b1ce0aa-355d-467a-806f-1dd335e11359/y
  - https://stackoverflow.com/questions/41875617/building-enterprise-app-with-node-express
  - https://stackoverflow.com/questions/37876889/react-redux-and-websockets-with-socket-io/41309189#41309189
  - Struktur:
    - Router Definitionen: Dort sorgt ein controllerHandler als "Mapper" dafür, dass automatisch aus den Request-/Response-Parameter-Definitionen (Params und Body) die Parameter für
      die Wrapper-Controller-Methoden hinzugefügt werden hinter req, res: controllerWrapper(req, res, ...) - hierzu wird spread-Operator "..." benutzt
    - Die Controller-Methoden entsprechen unseren Wrapper-Methoden, sind ohne req/res - das Code Pattern dabei sorgt dafür, dass immer Promise returned wird
    - Services (können z.B. Mongoose Calls machen, können, müssen aber nicht Promises returnen)
    - Models
  - Dies soll von Stefan erprobt werden anhand der "Agendafizierung" des baustoffe.controllers auf einer neuen Route
- Alternative: **Swagger**
  - Generiert Stubs aus API Definitionen, die die Routes, Parameter und Status Codes enthalten (Swagger Files)
  - https://swagger.io/tools/swaggerhub
  - TBD: Generiert Swagger auch die Router Definitionen
- https://www.linkedin.com/pulse/today-i-learnednever-work-nodejs-onedrive-folder-sham-haque/ - ==Probleme mit Synchronisation von Node-Folders mit OneDrive (Stefan hatte solche?)==

---

#### **[Epic 43]** Wrapping von Quasar-Komponenten/Custom Komponenten

- https://medium.com/quasar-framework/component-building-with-quasar-fc101b6730ae
  - Code Sandbox dafür: https://codesandbox.io/s/wn708yo82k

---

#### **[Epic 44]** Vue Spezifika

- Verwendung von "$", z.B. in "field: val => ${val}," in Quasar QTable Column-Definitionen
- Siehe https://stackoverflow.com/questions/55569477/vue-what-does-means
  - The \$ symbol is used in Vue as a prefix for property names on the Vue instance.
    This helps to avoid Vue instance properties injected into the Vue prototype by developers from overriding present properties.
    In essence, it differentiates Vue instance properties from the ones you or other library developers might inject into the Vue instance.
- Siehe https://vuejs.org/v2/api/#Vue-observable - macht das Objekt reaktiv

---

#### **[Epic 45]** Verwendung von Vue-Kindkomponenten und deren Props im BIM.click Frontend

- ==**Hinweis:**== Es folgen Design- und Architektur-Überlegungen zum Aufbau der Vue-Komponenten im Frontend
- Siehe https://stackoverflow.com/questions/40915436/vuejs-update-parent-data-from-child-component:
  1. Two-way binding has been deprecated in Vue 2.0 in favor of using a more event-driven architecture. In general, a child should not mutate its props. Rather, it should \$emit events and let the parent respond to those
     events.
  2. In some cases, we may need “two-way binding” for a prop. Unfortunately, true two-way binding can create maintenance issues, because child components can mutate the parent without the source of that mutation being
     obvious in both the parent and the child. That’s why instead, we recommend emitting events in the pattern of update:myPropName
  3. It is also possible to pass props as Object or Array. In this case data will be two-way binded: This is noted at the end of topic
     https://vuejs.org/v2/guide/components.html#One-Way-Data-Flow: Note that objects and
     arrays in JavaScript are passed by reference, so if the prop is an array or object, mutating the object or array itself inside the child component will affect parent state.
- Der dritte Punkt erklärt, wieso die Kindkomponente baustoffe-baueigenschaft-bearbeitung die ausgewaehlteBaueigenschaft ändern kann – diese prop ist ein Objekt und unterliegt somit dem Two-Way-Binding.
- Wegen des zweiten Punkts ist das allerdings keine „best Practice“. Allerdings ist für große und komplexe Objekte (wie unsere ausgewählte Baueigenschaft) die empfohlene Practice, jede Änderung über Events an die Elternkomponente zu melden,
  auch nicht sinnvoll (höchstens für punktuelle Updates von einzelnen Daten, wie die Änderung des ausgewählten Themas links im Inhaltsverzeichnis für die Dokumentation).
- ==**Achtung:**== Wenn also Objekte oder Arrays als Props übergeben werden, wendet Vue ein 2-Way-Binding an! Das heißt, die Kindkomponente ändert, falls sie diese Prop ändert (was hier z.B. bei der Prop für die
  ausgewaehlteBaueigenschaft der Fall ist) die entsprechenden Werte in der Elternkomponente. Dies gilt auch umgekehrt, d.h. falls die Elternkomponente die Werte ändert, werden die Werte in der Kindkomponente überschrieben!
  Diese geschieht unbemerkt (was in bestimmten Fällen in Ordnung ist), es sei denn man trifft spezielle Vorkehrungen dafür:

  1. https://forum.vuejs.org/t/update-data-when-prop-changes-data-derived-from-prop/1517/20: Man kopiert die Prop in der Kindkomponente erst per Object assign um in ein lokales Pendant in data() (z.B. in mounted: oder
     created:, oder bei einfachen Daten einfach per xyzPendant: this.xyzProp in data()). Man arbeitet dann in der Kindkomponente auf dieser Kopie, auf der man auch das v-model der Kindkomponente definiert - dann ist man
     geschützt gegen Änderungen der Prop in der Elternkomponente (muss aber die Rückgabe der Daten anders organisieren). Dann setzt man zusätzlich einen Watch auf der Prop (NICHT: der Kopie in data()!!!) in der
     Kindkomponente - in diesem Watch kopiert man nach Mutation der Prop in der Elternkomponenten den geänderten Wert der Prop erneute in das lokale Pendant in data() der Kindkomponente Mutations der Kopie der Prop in der
     Kindkomponente muss man dann aber selber tracken und ggf. solche Änderungen per Event an die Elternkomponente melden Insgesamt sehr komplex!!!

  2. Eine eventuell elegantere Alternative mit computed statt watch(): Man setzt computed Setters und Getters auf der Prop: Diese arbeiten direkt auf den Props und definieren get und set Methoden dafür: Die Setters können
     dabei eine Mutation der Prop durch die Kindkomponente feststellen und loggen, und zusätzlich per Event die Elternkomponente über die Änderung benachrichtigen. Aber ==**Achtung:**== Manche Microsoft Browser erlauben
     anscheinend nicht eine Änderung der Prop! Im Vergleich zu 1. reagieren die Getters per computed auf Änderungen der Prop-Werte durch die Elternkomponente und reflektieren diese automatisch in der Kindkomponente. Das
     v-model der Kindkomponente arbeitet dann weiterhin auf der Prop, allerdings implizit über die GLEICHNAMIGEN Setters/Getters aus computed: Siehe dafür das Beispiel
     auf https://forum.vuejs.org/t/update-data-when-prop-changes-data-derived-from-prop/1517/27:

     ```html
           <template>
             <div>
               <div>
                 <h1>Child</h1>
                 <input type="text" v-model="childData">
               </div>
             </div>
           </template>
           <script>
             export default {
               props: ['value'],
               data () {
                 return {}
               },
               computed: {
                 childData: {
                   get () {
                     return this.value
                   },
                   set (newValue) {
                     this.$emit('input', newValue )
                   }
                 }
               }
     ```

  3. Eine zu untersuchende Option wäre die Rückgabe von geänderten (mutated) Werten von Kind- an die Elternkomponenten über Mutate von Objekten im global Store oder Vuex - das wäre wohl die sauberste Lösung statt 2-Way-Props oder der Rückgabe über Events wie bei 1. und 2.

  4. Im vorliegenden Fall (BaueigenschaftBearbeitung): 2-Way-Bindings
     - Alle Props sind Arrays oder Objekte, also 2-Way-Bindings
     - Die Elternkomponente Baustoffe ändert während der Arbeit der Kindkomponente BaueigenschaftBearbeitung nicht die Prop-Werte, außer per Zurücksetzen (in diesem Fall werden alle Werte in der 2-Way-Prop für die
       ausgewählte Baueigenschaft in der Elternkomponente per resetNeueOderAusgewaehlteBaueigenschaft) resetted, auch die Werte für das selectModelBauinformationen, die auf die selectOptions zurückgesetzt werden
     - Die Kindkomponente ändert (mutated) diese **zum Teil** (Felder in ausgewaehlteBaueigenschaft, selectModel, selectFilter) - per 2-Way Update Binding werden die geänderten Werte an die Elternkomponente(n)
       zurückgegeben. Nach Drücken von "Speichern" dort werden diese an das Backend übergeben
     - Daher sind in diesem Fall keine speziellen Vorkehrungen gegen gegenseitige Änderungen per watch() oder computed und Benachrichtigungen per emit notwendig!!!
     - Allerdings gibt es wegen des Mutatens von 2-Way-Props Vue Warnungen im Browser Log!

- Namenskonvention für Props: Diese sollten im Allgemeinen gleich heißen wie ihre als Parameter übrgebenen Pendants in der Elternkomponente, **ohne** spezielles Suffix, z.B. xyzProp!!
- Beispiel für Props (aus temporär definierter Kindkomponente baustoffe-baueigenschaft-bearbeitung, aka BaueigenschaftBearbeitung):

  ```javascript
  export default {props: [
    // "testProp", // Disabled - nur für Testzwecke -
                  // wird in data() kopiert in eine lokale Variable
    "ausgewaehlteBaueigenschaft", // Wird intensiv verwendet UND VERÄNDERT HIER
                                  // in der Kindkomponente, 2-Way-Binding
    // "bearbeiteteBaustoffeigenschaft", // Disabled - wird nicht mehr verwendet!
                                        // "ausgewaehlteBaueigenschaftAmElternKnoten",
                                        // Umbenannt - wird intensiv
                                        // verwendet, ABER NICHT VERÄNDERT,
                                        // inklusive Watch darauf!!!
    // "bauinformationDaten", // Disabled - wird nicht verwendet!!!
    // "disabledFieldsAusgewaehlteBaueigenschaft", // Wird verwendet im Template,
                                                  // allerdings parallel zu
                                                  // eigener
                                                  // Steuerung disableWerteFelder
    "optionsWertetypBaueigenschaft", // Objekt für die Optionswerte für den
                                    // Wertetyp der Baueigenschaft,
                                    // daher 2-Way-Binding! Wird in der
                                    // Parent-Komponente nicht verändert! Sollte
                                    // in der Kindkomponente normalerweise NICHT
                                    // VERÄNDERT werden, da nur Auswahl, keine
                                    // Änderung der Options bei Bearbeitung.
                                    // Allerdings werden über das zugehörige
                                    // Model die ausgewählten Werte für eine
                                    // Baueigenschaft des Wertetyps
                                    // "Aufzählungswert" geändert!
    "selectOptionsBauinformationenAusgewaehlteBaueigenschaft",
    // Objekt, daher 2-Way-Binding!
    // Wird in der Parent-Komponente nicht verändert!
    // Aktuell auch computed getter darauf definiert (gemäß 2. oben)
    "ergebnisAktivierungspruefung" // Wird von der Kindkomponente VERÄNDERT!

    // "selectFilterOptionsBauinformationenAusgewaehlteBaueigenschaft",
    // Objekt, daher 2-Way-Binding!
    // Wird in der Parent-Komponente nicht verändert!
    // Aktuell auch computed getter darauf definiert (gemäß 2. oben)
    // Wird von der Kindkomponente NICHT DIREKT VERÄNDERT, aber DURCHGEREICHT an
    // weitere Kindkomponente baustoffe-baueigenschaft-bauinformation-auwahl,
    // diese VERÄNDERT dynamisch (durch Filtern) den Inhalt, wie man im Debug
    // Mode sieht.
    // Daher auch Vue Warnings im Log!!!

    // "selectModelBauinformation",
    // Objekt, daher 2-Way-Binding! Wird in der
    // Parent-Komponente bei Reset verändert! Nicht computed
    // selectModelBauinformationAusgewaehlteBaueigenschaft
    // Wird von der Kindkomponente NICHT DIREKT VERÄNDERT,
    // aber DURCHGEREICHT an weitere Kindkomponente
    // baustoffe-baueigenschaft-bauinformation-auwahl, diese
    // VERÄNDERT dynamisch durch Auswahl) den Inhalt, wie man im DebugMode sieht
    // Daher auch Vue Warnings im Log!!!
  ]
  ```

  ```javascript
  watch: {
    ausgewaehlteBaueigenschaft: {
    handler: function() {
  // Watch auf der gleichnamigen Prop ausgewaehlteBaueigenschaft der Komponente
  // ACHTUNG: TODO XXXXXX - dieser watch wird aktuell NICHT ausgelöst, wenn im
  // Baustoffbaum der ausgewählte Baustoff geändert wird,
  // ohne die ausgewählte Baueigenschaft zu ändern!
  // Sobald die Prop geändert wird, wird dieser watch ausgelöst.
  // Allerdings ist es wohl zufällig, dass genau diese Prop gewatched wird, sie
  // steht exemplarisch für jede Prop, die an die Komponente übergeben wird
  // Die Meldung, dass dieser Watch aufgerufen wurde, erscheint im Log //
  // insbesondere beim erstmaligen Anzeigen einer Baueigenschaft durch diese
  // Kindkomponente oder nach einem Rerendern der Kindkomponente, z.B. nach
  // Speichern oder Reset!!!
  // AUCH beim erstmaligen Aufruf der Kindkomponente wird dieser watch augerufen,
  // wie man im Log sehen kann!!!
  // ------------------------------
  // Ursprünglich hatte der Watch noch Parameter (val, oldVal)!!! (siehe
  // disableter Code unten)
  // ACHTUNG: Am Wurzelknoten war der neue Wert val hierbei null!!!
  // Der ursprüngliche Watch war zuständig für:
  // a) das Erben von Wertefeldern vom Elternknoten, fall dieser definierte Werte
  // hat, in Abhängigkeit vom BISHERIGEN Aktivierungszustand des ausgewählten
  // Knotens
  // TODO - diese Vererbung der Werte ist in diesem Fall (die Baueigenschaft IST
  // BEREITS aktiviert) eigentlich überflüssig, denn die Werte sind hier schon von
  // früher geerbt vom Elternknoten und sind korrekt gesetzt, wie man in der Table
  // für die Baueigenschaften sieht
  // b) das Disablen der Wertefelder, wenn die Werte ererebt sind - das ist
  // richtig und notwendig!
  // c) das Enablen der Wertefelder, wenn die Werte nicht ererbt sind
  // ---------------------------------
  // Zunächst die Prop in lokales Objekt kopieren:
      console.log("Prop changed: ausgewaehlteBaueigenschaft changed");
        this.localAusgewaehlteBaueigenschaft = Object.assign(
      {},
      this.ausgewaehlteBaueigenschaft
      );
  // aktivierungsMerkmaleAusgewaehlteBaueigenschaft steuerte ursprünglich die
  // q-radios für deaktiviert/lokal aktiviert/im Pfad aktiviert
  // Dieses muss bei Änderung der Prop neu gesetzt werden, in Abhängigkeit davon,
  // ob die Eigenschaft aktiviert ist oder deaktiviert.
  // Wenn die Eigenschaft aktiviert ist in der Prop, wird
  // aktivierungsMerkmaleAusgewaehlteBaueigenschaft hier auf "lokal aktiiviert"
  // gesetzt, sonst auf "deaktiviert"
      this.aktivierungsMerkmaleAusgewaehlteBaueigenschaft = this
        .localAusgewaehlteBaueigenschaft.aktiviertNichtDeaktiviert
        ? "lokalAktiviert"
      : "deaktiviert";

  // Unklar, ob handleAktivierung hier notwendig und sinnvoll ist
  // Vorübergehend testweise disabled, weil in Tests auch Aktivierung ausgelöst
  // wurde, obwohl diese vom Benutzer gar nicht verändert wurde!!!
  // Aktuell enabled:
      this.handleAktivierung(
          this.localAusgewaehlteBaueigenschaft.aktiviertNichtDeaktiviert
      );
      },
      deep: true
  }
  ```

---

#### **[Epic 46]** Tipps zu Javascript

- https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f
- https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a

---

#### **[Epic 47.a]** Tipps zu VisualStudio Code

- Vergrößern des Scroll Back Buffers im Terminal (für Console Log)
  - Siehe https://stackoverflow.com/questions/39881395/visual-studio-code-scroll-back-buffer
  - File > Preferences > Settings
  - "terminal.integrated.scrollback": 5000, // Auf 20000 erhöht
- Einfügen von Strings am Zeilenanfang/Zeilenende
  - https://stackoverflow.com/questions/39837571/how-to-add-a-string-to-the-end-of-each-line-in-vs-code-using-regex
  - Im Find/Replace Dialog Regex einschalten (leztes Icon .\* in der oberen Zeile)
  - In der Find-Zeile findet dann
    - ^ den Zeilenanfang
    - \$ das Zeilenende
- Weitere regular Expressions in VS Code Find/Replace:
  - Finde alle mit "X" beginnenden Zeilen: X.\*
    - Siehe https://stackoverflow.com/questions/830855/what-regex-would-capture-everything-from-mark-to-the-end-of-a-line
  - Finde Leerzeilen
    - Siehe https://stackoverflow.com/questions/3012788/how-to-check-if-a-line-is-blank-using-regex
- Find/Replace only for selected text: https://stackoverflow.com/questions/44335619/find-and-replace-in-visual-studio-code
- Find next: F3
- Keyboard Shortcuts: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf
- Syntax für Windows File Names in Markdown: file:///C:\rootfolder\folder1\folder2\file.png
- Rename Symbols
  - Siehe https://stackoverflow.com/questions/47403137/refactor-local-variable-name-using-visual-studio-code
  - Siehe https://code.visualstudio.com/docs/editor/refactoring#_rename-symbol
  - Ein Symbol auswählen in einer .js-Datei, dann F2 drücken, um das Symbol zu renamen - anscheinend ändert es sämtliche Occurences im ganzen Projekt!
  - F2 wird aber z.B. nicht angeboten, auf Symbole, die auch in Properties als Strings verwendet werden, z.B. { name: "baueigenschaftsBezeichnung" } -
    dort wird F2 nicht für baueigenschaftsBezeichnung angeboten!
  - Achtung: Es scheint auch nicht in .vue-Dateien zu funktionieren, speziell nicht in deren Template-Teil!
  - Wird bestätigt auf https://github.com/vuejs/vetur/issues/610
  - Zusätzliche Erklärung unter obigem Stackoverflow Post: Note that "Change All Occurences" is different from "Rename Symbol". "Change All
    Occurences" seems to be limited to the current document, while "Rename Symbol" propagates through the project. In addition to that, "Change All
    Occurences" will also happily rename properties of different objects, if they are named the same (e.g. if you have two objects a.SomeValue:string
    and b.SomeValue:number and change the SomeValue property of a with ctrl+F2, it will also rename the property of b, even if they are different
    types. "Rename Symbol" will only rename the property of the type.
  - Es ist daher nur begrenzt brauchbar!
  - Es gibt zusätzlich noch eine **JS Refactor** Extension für JS Code, aber auch nur für JS Files
  - Diese Extension **Abracadabra** unterstützt aucht Rename Symbol in vue Files:
    - https://marketplace.visualstudio.com/items?itemName=nicoespeon.abracadabra - installiert
    - Siehe auch https://www.reddit.com/r/vuejs/comments/jx8bwu/a_vs_code_extension_to_rename_symbol_in_vue_files/
    - Damit scheint es aber auch nur für einfache Variablen, z.B. let result = {} zu funktionieren in .vue-Files!
- Für Editing und Sorting von Excel-, CSV- und JSON-Dateien VS Code Extensions installiert:
  - Excel Viewer
    - Für Excel- und CSV-Dateien
  - Sort JSON Objects
    - Sortiert innerhalb der Objekte eines JSON Array nach den Namen der Properties
  - Sort JSON Array
    - Sortiert einen JSON Array nach den Werten von auszuwählenden Properties
    - Dafür muss der zu sortierende JSON Array per Clipboard augewählt werden
    - Dann mit rechter Maustaste im Kontextmenü "Command Palette" auswählen
    - Dann in Command Palette sort eingeben
    - Dann "sort json array ascending" auswählen
    - Dann die gewünschten Property im Array, nach der der Array sortiert werden soll, auswählen
    - Die Sortierung muss dabei eindeutig sein - wenn die Werte für eine JSON Property mehrdeutig sind, entweder mehrere Properties auswählen, oder die Objekte mit mehrdeutigen Properties eliminieren (eindeutig machen oder löschen)

---

#### **[Epic 47.b]** Sonstige Tools

- Online JS to JSON Converter: https://www.convertonline.io/convert/js-to-json

---

#### **[Epic 48]** Tipps zu MongoDB

- **UUIDs vs. Object IDs in MongoDB**
  - https://stackoverflow.com/questions/28895067/using-uuids-instead-of-objectids-in-mongodb
  - https://www.mongodb.com/blog/post/generating-globally-unique-identifiers-for-use-with-mongodb
  - https://docs.mongodb.com/manual/reference/method/UUID/ - Erzeugung einer UUID mit MongoDB: Man könnte
    diese auch zusätzlich erzeugen zu den normalen MongoDB Ids beim Insert, per UUID()
  - https://dzone.com/articles/uuids-with-mongodb-and-nodejs - empfiehlt https://www.npmjs.com/package/uuid-mongodb
  - DIN BIM Cloud arbeitet mit GUIDs (dasselbe wie UUIDs)
  - https://stackoverflow.com/questions/292965/what-is-a-uuid
    - **UUID** stands for Universally Unique IDentifier. It's a 128-bit value used for a unique identification in software
      development. ==**UUID** is the same as **GUID**== (Microsoft) and is part of the Distributed Computing Environment (DCE),
      standardized by the Open Software Foundation (OSF).
- **Text Search in MongoDB Dokumenten**
  - https://stackoverflow.com/questions/44833817/mongodb-full-and-partial-text-search - geht mit gewissen Einschränkungen
  - Alternativ: Benutzung von Lucene bzw. ElasticSearch mit Connector zur MongoDB (heavyweight!)?
  - https://stackoverflow.com/questions/1863399/mongodb-is-it-possible-to-make-a-case-insensitive-query - neue Antwort unten
  - ==MongoDB unterstützt doch **Full Text Search** auf **String-Feldern**==
  - https://docs.mongodb.com/manual/core/index-text/ - dazu muss ein **Text Index** auf dem betreffenden String-Feld erzeugt werden!
  - ==MongoDB unterstützt **keinen Search** in in **binären Feldern** gespeicherten Dokumenten (z.B. per Upload hochgeladene PDFs oder Word Docs in BIM.click):
    - https://stackoverflow.com/questions/46327827/full-text-search-in-binaries-in-mongodb
    - Dies gilt offenbar auch, wenn sie mit GridFS Erweiterung (siehe unten) als Chunks gespeichert werden
  - Für advanced Search wird **ElasticSearch** empfohlen
    - https://nextbigwhat.com/elasticsearch-mongodb/ - Aufsetzen von ElasticSearch auf Heroku ist wahrscheinlich komplex!
    - Tutorial: https://www.sitepoint.com/building-recipe-search-site-angular-elasticsearch/ - sucht aber in JSON (Rezepte), nicht in Doc Inhalten
- **Speicherung von Dokumenten größer als 16 MB mit GridFS-Erweiterung von MongoDB**
  - Für Dateien > 16 MB wird statt Speicherung in MongoDB Type Binary Data die Nutzung der MongoDB-Erweiterung **GridFS** empfohlen:
  - https://stackoverflow.com/questions/54031771/how-to-save-and-retrieve-a-pdf-file-in-mongodb-in-nodejs
  - https://www.mongodb.com/community/forums/t/store-and-serve-pdf-documents/6539 - die Dateien werden aufgeteilt in 2 Collections (files für Metadaten, chunks für File Content)
  - https://docs.mongodb.com/manual/core/gridfs/?_ga=2.137248503.637889670.1643276797-180192682.1642810774
  - https://dev.to/shubhambattoo/uploading-files-to-mongodb-with-gridfs-and-multer-using-nodejs-5aed
  - https://blog.zairza.in/uploading-files-images-to-mongodb-using-gridfs-c16f4eba777
  - https://www.freecodecamp.org/news/gridfs-making-file-uploading-to-mongodb/ - Sample Code, mit Streams
  - https://simonjcarr.medium.com/mongodb-gridfs-vs-s3-storage-f5ba1ebcc490 - Performance-Vergleiche mit GridFS vs. Amazon S3
  - https://stackoverflow.com/questions/13122800/elastic-search-with-mongodb-searching-pdfs==
    - ==ElasticSearch und GridFS können zusammen benutzt werden mit River Plugin:==
    - ==Allerdings damit auch nur Suche in Metadaten, nicht Inhalten der Dokumente!==
  - https://stackoverflow.com/questions/10491348/full-text-search-on-mongodb-gridfs
    - MongoDB 2.6 now has full text search as part of its regular query operators. ==However, you can't do any kind of search inside of a gridfs file.== They are
      just binary chunks and mongo will treat them no different if they are parts of an image or chapters of a text book.
- **MongoDB $gt/$lt Operators auf Strings/Text**
  - https://stackoverflow.com/questions/18039358/mongodb-gt-lt-operators-with-prices-stored-as-strings/55591529
    - Dort leider keine Angaben zur benutzten Sortierreihenfolge, z.B. bzgl. Zahlen/Buchstaben
    - Strings werden alphabetisch sortiert/verglichen, Zahlen numerisch
  - https://technotip.com/4101/string-comparison-mongodb/
  - https://www.mongodb.com/community/forums/t/how-to-sort-by-string-on-the-base-of-alphabets-order-and-not-by-case/104760
  - https://stackoverflow.com/questions/26107722/use-gt-and-lt-with-letters-in-mongodb
  - https://stackoverflow.com/questions/24149105/mongodb-sort-by-number
  - https://stackoverflow.com/questions/36849039/sort-document-alphabetically-aka-natural-sort-order-sorting-for-humans-in-mon
  - https://blog.codinghorror.com/sorting-for-humans-natural-sort-order/
  - Eigene Tests mit Compass auf einer MongoDB Testdatenbank zu der durch MongoDB angewendeten Vergleichs-Sortierreihenfolge bei
    Strings:
    - Collection: [{ "name": "IC010" }, { "name": "ICH10" }, { "name": "IC050" }] - in dieser Reihenfolge angelegt
    - Filter { "name": { \$gte: "IC010" }} liefert: { "name": "IC010" }, { "name": "ICH10" }, { "name": "IC050" }
    - Filter { "name": { \$gte: "ICH10" }} liefert: { "name": "ICH10" }
    - Filter { "name": { \$gte: "IC050" }} liefert: { "name": "ICH10" }, { "name": "IC050" }
    - D.h. die Sortierreihenfolge der **Operatoren $gt/$lt/$gte/$lte** bei diesen Vergleichen ist:
      [{ "name": "IC010" }, { "name": "IC050" }, { "name": "ICH10" }]
  - ==**Fazit**==:
    - **Ziffern** werden beim Operator-Vergleich **vor Buchstaben** einsortiert ("0" < "a")
    - **Blanks** werden beim Operator-Vergleich **vor Ziffern und Buchstaben** einsortiert (" " < "0" < "a", "a " < "aa")
    - **Sonderzeichen** werden beim Operator-Vergleich zwischen Ziffern und Buchstaben einsortiert ("1 < "!" < "a")
    - Längere Strings mit **selbem Prefix** wie ein anderer String werden hinter diesem einsortiert ("a" < "aa", "a" < "a ")
    - ==**Achtung**==: **Kleinbuchstaben** werden **nicht** direkt hinter ihrem zugehörigen Großbuchstaben einsortiert, sondern erst
      **nach allen Großbuchstaben**! ("A" < "Z" < "a" < "z") - Quasar sortiert diese dagegen direkt hinter ihren Großbuchstaben.
      ==**Hinweis**==: Daher wird aktuell im BIM.click Backend z.B. vor der Rückgabe von Baueigenschaften oder Baueigenschaftsprofilen in den
      dortigen Controller-Methoden ein Sort mit toUpperCase() durchgeführt, damit diese Objekte in derselben Sortierreihenfolge vom
      Backend per API geliefert werden, wie auch Quasar sortiert.
    - ==**Achtung**==: **Kleine und große Umlaute** werden **nicht** direkt hinter ihrem zugehörigen Buchstaben einsortiert, sondern
      erst **nach allen Kleinbuchstaben**! ("A" < "Z" < "a" < "z" < "Ä" < "ä")
- Testablauf mit einem **Backup der BIM.click MongoDB Cloud Atlas Datenbank** und **Restore in lokaler MongoDB**:
  - Windows Powershell öffnen im Ordner C:\Program Files\MongoDB\Server\4.2\bin>
  - Mit ./mongodump die MongoDB Cloud Datenbank (aktueller DB-Name dort: bimclickdb) lokal herunterladen in einen Unterordner /dump
    - ./mongodump --uri mongodb+srv://dbUser:>>password<<@cluster0-ft9dn.mongodb.net/bimclickdb
  - Mit Compass die aktuelle lokale Mongo Datenbank "test" löschen
  - Mit ./mongorestore ----uri mongodb://127.0.0.1:27017/test die oben gedumpte Cloud Datenbank lokal restoren
  - Dann kann mit lokalem BIM.click (Frontend und Backend) gegen diese lokale Kopie der Cloud Datenbank getestet werden,
    z.B. um Fehler zu reproduzieren ohne Damaging der Produktions-Datenbank
  - Nach diesen Tests per back-end-server.js stattdessen wieder eine frische lokale Testdatenbank erzeugen

---

#### **[Epic 49]** Alternativen zur permanenten Speicherung und Verwaltung strukturierter und unstrukturierter (BIM-)Informationen und Dokumente

- **Wikis** für Node:
  - https://ourcodeworld.com/articles/read/782/top-5-best-node-js-based-open-source-self-hosted-web-wiki-knowledgebase-applications
  - ==**Wiki.js**==
    - Node.js basiert
    - Empfohlen in obigem Artikel als bestes Node.js basiertes Package für Wikis
    - Markdown Support
    - Source Code: https://github.com/Requarks/wiki
    - Achtung: Es scheint kein NPM Package dafür zu geben!
    - https://docs.requarks.io/ - Doku
      - Installation auf Windows
        - https://docs.requarks.io/install/windows
        - PostgreSQL is the recommended engine for best performance, features and future compatibility
        - Andere SQL Datenbanken werden alternativ unterstützt
      - Deployment auf Heroku
        - https://docs.requarks.io/install/heroku
        - Benötigt PostgreSQL
  - **DokuWiki**
    - https://www.dokuwiki.org/dokuwiki
  - **WikiMedia** setzt auf Vue: https://www.heise.de/developer/meldung/Renovierungsplaene-fuer-Phabricator-mit-Vue-js-4687279.html
- **Zettelkasten**
  - https://zettelkasten.de/posts/overview/
  - Referenziert Semi Lattices (Baumstrukturen mit mehreren Elternknoten) und Heterarchien
    - https://en.wikipedia.org/wiki/Heterarchy
  - Software dafür: https://zettelkasten.de/the-archive/ (Text File basiert)
- **Ontologien**
  - https://de.wikipedia.org/wiki/Web_Ontology_Languagefür
- **MongoDB als Content Management System (CMS)**
  - https://www.mongodb.com/scale/mongodb-cms
  - https://medium.com/the-node-js-collection/picking-the-right-database-and-cms-2845ed745097
- **JSON Editoren, Form Generatoren, Website/Page Builder für Vue**
  - https://forum.quasar-framework.org/topic/5976/human-readable-editor-for-json-files
  - ==https://vuejsfeed.com/blog/a-schema-aware-json-editor-developed-with-vue-js - JSON mit Baumstruktur visualisiert, Einfügen/Löschen mit Kontextmenüs==
  - https://github.com/yourtion/vue-json-ui-editor
  - https://github.com/jarvelov/vue-form-json-schema
  - https://morioh.com/p/130d79a6cc77
  - https://www.producthunt.com/posts/weweb-2-0 - kommerzielles Produkt, nicht spezifisch für Vue
  - https://geekflare.com/de/json-online-tools/ - JSON Tools
- Auch interessant: **Forest Admin** - "one internal tool for all your data"
  - https://www.forestadmin.com/
  - Web Editoren und API
- **Content Management Systeme (CMS)**
  - Man kann auch **Wordpress** per API einbinden (REST API)!
- **Headless CMS** (= API basierte Content Management Systeme)
  - Ideal, wenn auch noch mit Support für Vue.js Frontends!
  - Bei SaaS basierten CMS ("serverless") ruft man dann deren APIs aus dem Browser und die App ist damit **"serverless"** in Bezug auf den Content
  - Interessanter genereller Artikel zu serverless: https://www.duringthedrive.com/2017/05/15/serverless-a-replacement-for-servers/
  - Artikel: https://resources.fabric.inc/blog/headless-cms-cx
  - ==Vergleich: https://cms-comparison.io==
  - ==https://madewithvuejs.com/blog/best-headless-cms-for-vue-js-apps==
  - Übersicht: https://dev.to/integridsolutions/best-serverless-cms-for-2020-27jb
  - Artikel: https://www.techmagic.co/blog/headless-vs-serverless-cms/
    - Headless (flexibel für Einbindung in verschiedene Frontends) und serverless (d.h. SaaS, mit Frontend für Business User als Content Editoren) kombiniert das Beste aus zwei Welten
    - ==Falls das headless CMS auch serverless als SaaS läuft, kann einem die darunterliegende Datenbank eigentlich egal sein!==
    - ==**Storyblok**==
      - https://madewithvuejs.com/storyblok
      - SaaS, kein OSS
      - Headless mit zusätzlichen UI Komponenten, serverless
      - Optionale Hinzufügung der Storyblok JS Bridge für das Editieren von Content (als Skript im Browser/am Frontend)
      - Storyblok ist mit Vue gebaut!
      - Fokus neben Developers auf Business Users (durch den Visual Content Editor)
      - "Essential/Professional" Einstufung in obigem Vergleich
      - https://www.storyblok.com/tp/add-a-headless-CMS-to-vuejs-in-5-minutes
        - Registriert mit E-Mail-ID auf bimlive.de
        - Dashboard: https://app.storyblok.com/#!/me/spaces/143809/edit
        - Space ID: #143809
        - API Keys/Tokens
          - "public": 7bJcyxCCQSqzq4uIqbuZAwtt - wird auch auf stackblitz als Default benutzt
          - "preview": U3HaQpJftvXTxY1bxBVy7wtt - selbst erzeugt per "Create Token"
        - Probiert, dieses Getting Starting Tutorial auf stackblitz zum Laufen zu bekommen
          - https://stackblitz.com/edit/vue-5-minutes-felggp?file=src%2Fmain.js
          - Es kommt aber auf http://localhost:3000 (mit dem obigen "preview" API Key) nach npm install und npm run dev nur die erste "Hello World" Seite hoch
          - Es kommt nicht der gelobte Visual Content Editor hoch
      - https://www.storyblok.com/mp/storyblok-meets-vue3-nuxt3
      - https://github.com/storyblok/storyblok-vue
      - https://github.com/storyblok/awesome-storyblok
      - https://www.npmjs.com/package/storyblok-js-client - ==JS Client, damit müsste eine Integration in BIM.click Frontend einfach möglich sein==
      - https://www.npmjs.com/package/storyblok-vue
      - Hat offenbar den besten und den most current Vue Support (Vue 3)!
      - Ist insofern nicht nur "headless", sondern bringt Vue-UI-Komponenten zusätzlich zum API, die in ein Frontend eingebettet werden können
      - Content wird in weltweitem CDN von Amazon gespeichert und gecached (CloutFront)
        https://www.storyblok.com/docs/content-and-asset-cdn
      - GDPR Statement: https://www.storyblok.com/legal/privacy-policy
        - Aber: "You are not subject to automated individual decision-making, including profiling. We neither transfer your data to non-EU countries non international organizations unless required for the purpose of providing you the Services. We collect information globally and primarily store that information in Europe."
      - Erste Tests mit Storyblok in verwaltung.vue sind eher negativ, deutlich schlechtere DX (Developer Experience) als ButterCMS:
        - Siehe Kommentare dort
        - Visual Components sind auf Vue 3 zugeschnitten, waren nicht zum Laufen zu bekommen
        - API war nur in einem basic Use Case aufrufbar
        - Doc zum Visual Editor:
          - https://www.storyblok.com/docs/guide/essentials/visual-editor
          - The Visual Editor enables your editors to edit their content with an in context preview, including the possibility to click on Components in their website. This feature is optional and does not depend on any specific technology. It will not alter the structure of your HTML or rearrange the DOM. The visual editor will not affect your production sites ==as it can be enabled only when inside the Storyblok UI. The visual editor will not allow inline editing; changing content will always be done in the Storyblok UI and the normal form inputs and custom fields you have defined for your content types and bloks.==
    - **Directus**
      - https://madewithvuejs.com/directus
      - OSS (GPL!) mit Pricing
      - SaaS und on Premises, d.h. serverless ist optional
      - Läuft auf diversen SQL Databases
      - Ist wie Storyblok selbst mit Vue gebaut
      - JS API
      - "Essential/Professional" Einstufung in obigem Vergleich
      - Encryption in Transit und at Rest (ab 99 USD/Monat)
      - https://docs.directus.io/getting-started/quickstart/ - Tutorial
        - Erfordert lokal installierte relationale Datenbank (MySQL, MariaDB, ...)
        - Erscheint einfach in der Benutzung
      - https://www.npmjs.com/package/directus - ==2.700 Downloads/Woche==, erfordert separate Datenbank
    - ==**ButterCMS**==
      - Kein OSS - das muss aber hier kein Nachteil sein, da Content "mission critical" ist wie die Datenbank!
      - Chicago based company:
      - Nur SaaS mit Headless Content API und Dashboard zum Editing, d.h. headless und serverless
      - Can I use Butter CMS on-premise? No. We're SaaS. We maintain and host the content dashboard + API platform and you integrate your app with our Content API.
      - Nicht mit Vue.js entwickelt, aber hat Vue SDK nach obigem Artikel
        - Dieser wird hier beschrieben: https://buttercms.com/docs/api-client/vuejs#ExistingApp
        - Dies ist ein sehr gutes Tutorial!
        - Lesezugriffe auf den Content sind mit dem JS API und dem API Explorer als Hilfstool sehr einfach umzusetzen
        - Der erste Call funktionierte tatsächlich nach 5 Minuten!
        - Test Cases in verwaltung.vue, Test Area 17
        - Die Anzeige von Content im BIM.click Frontend per ButterCMS JS API in Vue/Quasar-Komponenten ist einfach!
        - Wenn man Content allerdings auch per API **ändern** will, wird es schon etwas komplizierter:
          - https://buttercms.com/docs/api/?javascript#write-api
          - The API token you use for reading from the ButterCMS API will not allow you to create content in the API. For this you will need to use a different write-enabled token. Write-enabled tokens are provided on request. Just chat or email support@buttercms.com to get yours.
          - https://buttercms.com/blog/weve-launched-a-write-api-for-buttercms
          - https://buttercms.com/blog/importing-third-party-data-into-buttercms
      - Im Grunde handelt es sich bei diesen CMSen gleichzeitig um einfache Web Site Builder
        - Educated Business Users können mit den Editoren Webseiten entlang vorgegebener Seitenstrukturen definieren z.B. für Marketing Web Sites, ähnlich wie bei Strato
        - Sie können auch gleichzeitig den Content (Texte, Bilder) editieren und publishen
      - Bei ButterCMS registriert mit GitHub Id und bimlive.de E-Mail-Adresse (musste zusätzlich eingegeben werden)
        - Free Developer Plan
          - For personal non-commercial usage and trying us out. Just add an attribution link back to us to help share your love of Butter.
          - Allerdings tickt im Dashboard rechts oben ein "30 days left in trial"!
        - Dashboard: https://buttercms.com/home/?new=true#local
        - Dort erzeugter Butter API Token: 1e0828151da85c63c370c3ddcc6b5f08ba99fb9c
      - Hat "Essential" Einstufung in obigem Vergleich
      - ==Hat laut obigem Vergleich kein GDPR Statement!==
      - Speicherung behind the Scenes für den auf Web Editor auf Heroku Servern und den Content in dort nicht näher spezifiziertem weltweitem CDN, wie auch Storyblok
        - https://buttercms.com/security/
      - https://www.fastly.com/blog/buttercms-on-building-globally-performant-reliable-api - das CDN ist Fastly, interessanter Artikel zur
        Availability!
      - Encryption nur in Transit
      - https://buttercms.com/blog/buttercms-vs-wordpress-headless-cms-vs-traditional-cms - Vergleich WordPress/ButterCMS
      - https://www.npmjs.com/package/directus - ButterCMS JS Client - ==hat 17.000 Downloads/Woche!==
      - https://github.com/ButterCMS/buttercms-vue-tutorial - 4 Jahre alt
      - https://vuejs.org/v2/cookbook/serverless-blog.html
      - https://www.webriq.com/building-a-serverless-cms-powered-by-vuejs
      - https://dane.engineering/post/buttercms-in-vue/
      - Zum Anzeigen von Posts eines Blogs oder von Dokumenten nimmmt man aber besser z.B. Quasar QCards statt Vue Komponenten!
      - https://buttercms.com/docs/api-client/vuejs#OverviewImage - Locales sind customizable
      - Image API via Filestack, Thumbnail Creation ist einfach:
        - Original URL = https://cdn.buttercms.com/3ccPHhYHTNK2zQ14gCOy
        - Thumbnail URL = https://cdn.buttercms.com/resize=width:100,height:100/3ccPHhYHTNK2zQ14gCOy
      - https://buttercms.com/blog/when-to-use-nosql - interessanter Vergleich: SQL - noSQL
      - https://buttercms.com/blog/introduction-to-flat-file-cms-deciding-whether-they-are-right-for-you - interessanter Vergleich: Flat-File CMS vs. andere
      - https://react-serverless-blog.netlify.app/ - Blog eines ButterCMS Developers
        - https://react-serverless-blog.netlify.app/post/directly-import-pdfs-into-your-blog-post - PDF Import
        - https://react-serverless-blog.netlify.app/post/how-filestack-helps-buttercms-make-content-management-a-breeze - benutzt Filestack für File Uploads
      - ==Interessanter Artikel zu **PDF Generierung auf Node**:== https://buttercms.com/blog/generating-pdfs-with-node
    - ==**Strapi**==
      - Vergleich Strapi vs. ButterCMS: https://bejamas.io/compare/strapi-vs-buttercms/
      - OSS, MIT License
      - "Essential/Professional" Einstufung in obigem Vergleich
      - Headless CMS, auch als in der Cloud (z.B. auf Heroku) self hosted Node Server mit MongoDB als Store, d.h. headless, aber nicht serverless
      - ==Glitch: Die pure SaaS Variante scheint noch nicht verfügbar zu sein!==
        - https://strapi.io/pricing-cloud
      - Auf Heroku: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/heroku.html
      - https://strapi.io/integrations/vuejs-cms?ref=madewithvuejs.com - Integration mit Vue per JS APIs (keine Components, ist aber nicht ausschlaggebend für BIM.click mit Quasar)
      - https://docs.strapi.io/developer-docs/latest/developer-resources/content-api/integrations/vue-js.html
      - ==https://www.mongodb.com/developer/how-to/strapi-headless-cms-with-atlas/ - nettes Tutorial für Strapi V3, MongoDB als Store, aber nur API Level (read only) und Content Creation über das Strapi Web Dashboard==
      - https://www.gyanblog.com/javascript/strapi-backend-api-setup-mongodb/ - ähnliches Tutorial für Strapi V3 (mittlerweile gibt es V4)
      - https://localhost101.medium.com/installing-strapi-and-using-mongodb-atlas-as-default-database-c8f563be8d8e - ähnliches Tutorial
      - ==Glitch: Allerdings ist auf https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations.html nichts von Mongo als Datenbank zu lesen - könnte insofern experimentellen Charakter haben!==
      - ==Und tatsächlich: Offizieller Support von MongoDB durch Strapi ist ab V4 wacklig!==
        - https://strapi.io/blog/mongo-db-support-in-strapi-past-present-and-future==
        - https://forum.strapi.io/t/strapi-mongodb/12974
        - https://github.com/strapi/strapi/issues/10298
        - https://www.mongodb.com/community/forums/t/setting-up-mongodb-atlas-for-strapi-cms/143375/2 - Anfrage im MongoDB Community Forum
      - ==Strapi sollte wegen obiger Affinität zu MongoDB und Heroku eventuell näher evaluiert werden!==
        - Kombination von Quasar/Vue, Strapi mit Web App und JS API lokal bzw. auf Heroku, MongoDB (zunächst lokal, später auf Cloud Atlas)
        - Hätte denselben topologischen Aufbau wie BIM.click bisher!
        - Strapi Backend basiert auf **Koa**, Backend JS Framework - könnte komplexer sein, wenn z.B. Heroku hosted, im Vergleich zu SaaS
        - Glitch: https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment/hosting-guides/heroku.html#file-uploads
          - File Uploads müssen auf Heroku über S3 erfolgen, wegen des ephemeral File Systems von Heroku!
        - Glitches: https://strapi.io/blog/the-future-of-strapi
        - Glitch ist Deployment, Development ist gut: https://dev.to/abdallahhamouda/comment/16pi4
    - ==**Contentful**==
      - SaaS based, kein OSS, headless und serverless
      - https://www.contentful.com/faq/backup-security-and-hosting
        - Contentful is a cloud-based web service that we manage. Downloading Contentful and hosting it yourself is not in our plans.
        - Contentful is hosted on Amazon’s AWS on the US East Coast. The Contentful CDN, which is used for delivering the content, has edge nodes all around the world, ensuring rapid content delivery no matter the destination.
      - https://www.contentful.com - macht einen sehr professionellen Eindruck
      - https://www.unitb.de/kompetenzen/cms/contentful/ - Berlin based
      - https://www.contentful.com/legal/privacy-at-contentful/privacy-notice/
        - Contentful GmbH, with its registered office at Max-Urich-Straße 3, 13355 Berlin, Germany.
      - https://www.businessinsider.de/gruenderszene/business/contentful-unicorn-cms-a/
      - https://www.cmswire.com/web-cms/13-headless-cmss-to-put-on-your-radar/
      - https://www.contentful.com/developers/docs/javascript/tutorials/using-js-cda-sdk/
      - https://www.contentful.com/r/knowledgebase/content-as-a-service/
      - https://dev.to/aquasar/which-headless-cms-do-you-use-for-your-blog-and-do-you-recommend-it-or-not-48jo
        - Beschreibt einige Glitches von Contentful, allerdings zusammen mit Gatsby als Frontend Framework
        - These major flaws outlined make Contentful a writing averse platform due to the extra time needed to write and publish an article.
        - Recently switched from Contentful to Butter and wow, what a difference! Everything that was a pain is now smooth sailing. Can't believe I did not switch sooner! Unfortunately still have some sites on Contentful but migrating my blog over to Butter CMS. Thanks for the suggestions everyone!
    - **Hadron**
      - Eher ein Tool für Database Backends
      - https://medium.com/quasar-framework/building-a-scalable-full-stack-cms-with-quasar-and-hadron-12078a7f3554
    - **Apostrophe**
      - Web Site Builder und CMS, Jamstack Architektur: https://demo-ckyyeyho80gcfkrxwyv0xhyio.apostrophecmsdemo.org/
      - Benutzt intern anscheinend MongoDB: https://medium.com/the-node-js-collection/picking-the-right-database-and-cms-2845ed745097
    - ==Interessante Diskussion zum Thema: https://forum.quasar-framework.org/topic/5844/would-you-use-vue-quasar-to-build-a-marketing-site/35?lang=de==
    - https://dev.to/aquasar/which-headless-cms-do-you-use-for-your-blog-and-do-you-recommend-it-or-not-48jo
  - Eventuell ein solches CMS einbinden, als Ersatz zur Verwaltung von Bauinformationen und eventuell auch für Dokumentation/Hilfe in BIM.click?
  - Gleichzeitig wären damit auch Blog-Support und andere Features nutzbar
- - **Quasar Uploader - App Extension für Amazon S3**
  - https://github.com/oarepo/quasar-uploader - noch nicht getestet, siehe Anmerkungen dazu unter "Cloud Deployment" für Heroku
- ==**Filestack**==
  - File Upload Service, wird auch von ButterCMS benutzt
  - https://www.filestack.com/docs/getting-started/how-filestack-works/ - Default Storage in Amazon S3
  - Aber auch andere Custom Stores werden unterstützt (Box, OneDrive, etc.):
    - https://www.filestack.com/docs/uploads/storage/
  - https://www.filestack.com/docs/uploads/pickers/
  - Man bekommt eine unique URL für jedes File nach dem Upload
  - JS SDK: https://github.com/filestack/filestack-js
  - JS SDK Docs: https://filestack.github.io/filestack-js/index.html
  - https://jsfiddle.net/gh/get/library/pure/filestack/filestack-js/tree/master/examples/upload - Upload Demo mit File Picker, erfordert API Key
  - File Picker im Inline Mode: https://jsfiddle.net/gh/get/library/pure/filestack/filestack-js/tree/master/examples/picker-inline
  - Signup für free Plan (1 GB Storage): https://dev.filestack.com/signup/free/
  - ==Tutorial: https://blog.filestack.com/content-cookbook/upload-files-with-node/==
  - Vue Komponente: https://www.npmjs.com/package/filestack-vue 
  - Document Viewer: https://www.filestack.com/docs/delivery/document_viewer/
  - Intelligenz, z.B.
    - Image Tagging: https://www.filestack.com/docs/transformations/intelligence/tagging/ - automatische Inhaltserkennung
    - Document Detection per OCR: https://www.filestack.com/docs/transformations/intelligence/document-detection/
    - Text Sentiment Detection: https://www.filestack.com/docs/transformations/intelligence/text-sentiment/
    - ==Damit aber offenbar kein Full Text Search in Dokumenten!==
  - Ein basic Filestack Upload Sample implementiert in Verwaltung > Test Area 3
    - bimc-click-front-end> npm install filestack-js
    - War einfach, die URL einer hochgeladenen Datei kann nach dem Upload über eine Callback-Funktion abgefragt werden
- ==Direkte Integration anderer **Cloud File Speicher**, insbesondere von **OneDrive**==
  - https://docs.microsoft.com/en-us/onedrive/developer/controls/file-pickers/js-v72/open-file?view=odsp-graph-online
  - Dies mit diesem **OneDrive File Picker** für Javascript erfolgreich getestet - siehe interne Dokumentation dazu in verwaltung.vue
  - Sowohl Upload als auch Download möglich bzw. Generierung/Abfrage von URLs von Files auf OneDrive
  - ==Sehr komfortabel nach Überwindung der Setup Probleme (im Azure Portal müssen der App BIM.click und ihren URLS die richtigen Berechtigungen gegeben werden)==
  - Bauinformationen, z.B. für Normen, können damit externe Links mit OneDrive URLs benutzen!
  - ==Dann müssen die PDFs für diese Normen nicht in einen eigenen Content Store oder in die BIM.click Datenbank hochgeladen werden und können sowohl aus BIM.click als auch
    unabhängig davon benutzt werden!==
  - ==**[DONE]**== Mittlerweile durchgehend implementiert, im Backend und im Frontend an allen Bauinformationen
  - Man könnte dann auch die vorhandene Baumstruktur auf K&F-Netzwerkplatte eins zu eins nach OneDrive spiegeln!
- ==Zusammenfassung: Mögliche Alternativen für Storage von Dokumenten/Bauinformationen in BIM.click (statt heutiger Speicherung als binäre Daten in MongoDB):==
  - **MongoDB** mit **GridFS**-Erweiterung zur Speicherung von Dateien > 16 MB
    - Ca. 100 PDFs mit Normen bei K&F (von ca. 500?) sind größer als 16 MB!
    - Optional mit **ElasticSearch** für Search, aber relativ komplex aufzusetzen (vor allem auf Heroku?), und auch nur Suche in Metadaten
  - **Content Management System**, z.B. **ButterCMS**
    - Aktuell eher Overkill, da man eigentlich nur einen Document Store benötigt, und diese sowieso meist auf Web Content Management ausgerichtet sind
  - **Filestack**
    - Offenbar auch kein Full Text Search in Inhalten von Dokumenten
    - Erscheint als möglicher Kompromiss
    - Ist allerdings auch nur ein Zwischen-Layer zwischen BIM.click und verschiedenen Cloud File Speichern (Default: Filestack internes Amazon S3 Bucket, optional OneDrive, Dropbox, Box, etc.)
  - ==**OneDrive**==
    - Bevorzugte und gewählte Option für Kurz & Fischer, da eng mit dem geplanten Office 365 verknpüft
    - Siehe oben
- Auch zu beobachten:
  - **Nuxt**
    - https://www.tarcgn.de/warum-nuxt-js-und-nicht-pures-vue-js/
    - Eine Art Next für Vue.js, Scaffolding der App für Vue Routing und sonstigen App-Strukturen per Nuxt
    - Fraglich, ob Nuxt mit Quasar zusammen Sinn macht - höchstens für SSR Apps - ansonsten ist es eher eine Frage Quasar vs. Nuxt
      - https://stackoverflow.com/questions/67604476/how-to-add-quasar-to-an-existing-nuxt-app
  - **GraphQL**
    - https://docs.mongodb.com/realm/graphql/
    - Ursprünglich von Facebook entwickelte simple DB-Abfragesprache, auch für MongoDB als Alternative Query Language verfügbar
  - **Firebase** (Google)
    - https://firebase.google.com/docs
    - Für Cloud based Backends, statt Node
    - Enthält eine "realtime Database"
    - Weniger flexibel als Node
    - Kann aber auch auf Node Server installiert werden
    - Development und Deployment
    - Wird zusammen mit Vue oder anderen Frontends als Stack verwendet
  - **Jamstack**
    - https://flanke7.de/2021/07/21/jamstack/ 
    - Im Kern sind das statisch generierte Sites, die immer wieder neu generiert werden
    - Gut geeignet für Blogs etc., deren Daten sich nicht sekündlich/minütlich ändern
    - Kommen in der reinen Form ohne Backend aus
    - Hybride Varianten benutzen Microservices und headless CMSs

---

#### **[Epic 50.a]** Eindeutigkeit (Uniqueness) von Bezeichnungen

- ==**Hinweis**==: Übernommen aus Evernote-Notiz "BIM.click Next Level (1/3)"
- Baustoffe (und auch Baueinheiten) sollten unter ihrem Parent einen unique Name haben, sonst kann man sie nicht unterscheiden beim Browsen im Baum
- Dies muss bei der Neuanlage überprüft werden:
  - Die neue Bezeichnung vergleichen mit den vorhandenen Bezeichnungen der Geschwister
  - Dazu einen findAll() für die Children machen, baustoffBezeichnung holen, dann vergleichen
    - Fall Duplikat: Ablehnen
- Dazu muss in baustoffe.controller die Methode createKindBaustoffByElternBaustoffId angepasst werden, dass sie obige Checks macht nach dem findById() auf den Elternknoten
- Bei Baustoffen dann stets findById/deleteById/updateById machen, da die Bezeichnung nur unter einem Parent unique ist. Dies müsste möglich sein, da
  - am Backend MTree mit Ids arbeitet, um z.B. auf das Parent zuzugreifen
  - am Frontend QTree mit Ids als Key arbeitet
- Ursprünglich war find() ohne id in baustoffe.controller:
  - exportBaueigenschaftenByBaustoffBezeichnung => Wurde später ersetzt durch Methode, die auf der id arbeitet
    - Dort findIOne() mit Baustoffbezeichnung
    - Muss ersetzt werden durch findOne() mit id - dazu obige Methode geändert werden nach exportBaueigenschaften mit req.params.id des Baustoffs statt baustoffBezeichnung
  - Dazu könnte in Datenaustausch dem Export Button ein QSelect vorgeschaltet werden, das die Bezeichnungen und ids aller Baustoffe ausliest, als Optionen im Dropdown Menü anbietet, 
    und den Benutzer einen Baustoff auswählen lässt
  - Alternativ könnte man diesen Export auch verlagern nach Baustoffe.vue und dort direkt per Button bzw. Kontextmenü für den ausgewählten Baustoff den Export per id anstoßen
- Auch **Bauinformationen** müssen eine uniqe Bezeichnung haben
  - Wurde nicht überprüft! in bauinformationen.controller, Methode createBauinformation => **[DONE]**
  - Im Mongoose Model ist dieses Feld auch nicht unique!
- Eventuell hilfreich: https://www.npmjs.com/package/mongoose-unique-validator
- Beachten: https://luxiyalu.com/mongoose-unique-not-working/
- Guter Artikel zu Mongoose find(): http://thecodebarbarian.com/how-find-works-in-mongoose.html
- Dasselbe gilt für **Baueigenschaften** => **[DONE]**
  - createBaueigenschaft in baueigenschaften.controller macht bereits diese Prüfung!
  - Diese erweitert, sendet 403 ans Frontend, das diesen Fall dann behandelt und eine Benutzernachricht ausgibt
- Wenn man zusätzlich einen im gesamten System eindeutigen Namen für **Baustoffbezeichnungen** erzeugen wollte:
  - Man müsste dann einen Pfadnamen generieren aus den Bezeichnungen vom Wurzelknoten bis zum bereffenden Knoten - wenn alle Bezeichnungen unter einem Knoten unique sind, ist dieser
    Pfadname dann unique
  - Man bekommt aber unter Windows Probleme mit der Längenbeschränkung von Pfaden (255, nur mit Registry-Eingriff erhöhbar auf 4096)
  - Will man diesen Pfad auch für die Anlage einer Ordnerstruktur für die Ablage z.b. von Bildern zu Baustoffen verwenden, muss man die Bezeichnungen z.b. mit Slugify zu validen
    Dateinnamen machen
  - Dies erscheint aber wenig sinnvoll, da z.B. die Angabe von Links (in Markdown) auf Dateien in dieser komplexen Ordnerstruktur zu komplex wäre!
  - Man muss also die Bilder für die fachliche Hilfe für Baustofe am Besten alle in einem Ordner unter /statics/ halten und die Dateinamen dort manuell unique und unterscheidbar
    halten, indem man z.B. eine Baustoffbezeichnung im Dateinamen verwendet.
  - Siehe auch file-uploader.js
- **[DONE]** Uniqueness überprüfen beim Create von
  - Baustoffen unter Elternknoten
  - Baueigenschaften (createBauleigenschaft macht bereits Prüfung, führt aber bei Duplikat zu Hang am Frontend, weil kein Error zurückgegeben wird)
  - Bauinformationen
  - Dazu:
    - Am Backend in Post/Create Methoden für obige Objekte zunächst findAll bzw. bei Baustoffen findChildren
    - Dabei nur das Bezeichnungsfeld selektieren (in Array lesen)
    - Dann für die neue Bezeichnung mit array.includes prüfen, ob diese schon vergeben ist (arr.includes())
    - Ggf. Create verweigern und 403 vom Backend ans Frontend schicken, welches dann eine Fehlermeldung anzeigen muss - ansonsten Create durchführen
    - Dies könnte bereits bei der Eingabe am Frontend geprüft werden, wenn Eingabe in das Bezeichnungsfeld erfolgt (Field Validation)
    - Es muss allerdings am Backend auf jeden Fall nochmals geprüft werden

---

#### **[Epic 50.b]** REST APIs

- ==**Hinweis**==: Übernommen aus Evernote-Notiz "BIM.click Next Level (1/3)"
- Alle Informationen dazu sind in bimclick.routes.js
- Redesign basierend auf https://docs.microsoft.com/de-de/azure/architecture/best-practices/api-design
- https://restfulapi.net/resource-naming/ - API Signaturen wie z.B.
  - get /Baustoffe/Wurzel
  - get /Baustoffe/:id
  - put /Baustoffe/:id/Bauinformationen
- => Konflikt mit der Route darüber, wenn einfach herkömmlich deklariert mit neuer Route-Funktion!
  - die Route darüber funktioniert dann nicht mehr!
  - Daher umgestellt auf nested Routes mit mergeParams: true
- https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
- https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
  - Dort Antwort von Jordonias ausprobiert - funktioniert!
- https://stackoverflow.com/questions/28977253/express-router-undefined-params-with-router-use-when-split-across-files
  - {mergeParams: true}
  - ==**[TODO]**== Eventuell Swagger einsetzen

---

#### **[Epic 50.c]** Error Handling

- ==**Hinweis**==: Übernommen aus Evernote-Notiz "BIM.click Next Level (1/3)"
- Wurde vor Beginn Coding Bauvorhaben.vue in Baustoffe.vue eingeführt!
- Am Frontend:
  - Calls mit axios in Baustoffe.vue bzw. http in Bauinformationen.vue vereinheitlichen
  - Guter Artikel für http-Call-Optionen am Frontend: https://codeburst.io/all-about-http-in-node-js-and-3-best-ways-for-http-requests-in-web-development-6e5b6876c3a4
  - Calls vereinheitlichen (auf Axios-Basis)
    - Überall .then und .catch Blöcke nach den .get und .put!
  - Für Vue Anwendungen mit Axios: Interceptor wird empfohlen im created: Teil der Vue Root Component für globale Aktionen:
    - https://stackoverflow.com/questions/45645714/how-can-i-use-the-axios-interceptor-in-a-right-way
    - Ähnlich: https://www.qcode.in/api-error-handling-in-vue-with-axios/
    - In dem Interceptor könnte man z.B. den Error global loggen und in einer Alert Box als Teil von myLayout.vue z.B. unten anzeigen
    - In dem Interceptor kann man das Error Handling auch abschalten zugunsten individueller .catch Blöcke im Axios Call
  - Mit Quasar geht das bequem in einem extra dafür vorgesehenen Axios Boot File - siehe unten
  - Achtung: Es gibt 2 Axios Interceptors, für http Requests und Responses
  - Achtung: Vor allem bei Post-Requests (z.B. beim Import, der am Backend sehr lange dauern kann) erwartet das Frontend auch eine Status-Response (plus eventuell eine Response Message dazu) vom Backend - sonst passieren merkwürdige Effekte - z.B. automatische Retries nach gewisser Zeit!
    - Man kann sich behelfen, indem man einstweilen schon einen "Zwischen-Status" vom Backend zurückschickt, ohne dass z.B. ausstehend Promises am Backend fertig sind
  - Weitere Artikel:
    - https://www.raymondcamden.com/2019/05/01/handling-errors-in-vuejs
    - https://markus.oberlehner.net/blog/vue-error-handling-with-renderless-components/
    - https://medium.com/@danielalvidrez/handling-error-responses-with-grace-b6fd3c5886f0 - benutzt Quasar Toast für die Error Messages - http://v0-13.quasar-framework.org/components/toast.html - im neuesten Quasar nicht mehr vorhanden - Alternativen
      - Banner
      - Notify Plugin - https://quasar.dev/quasar-plugins/notify - ist offenbar der offizielle Nachfolger von Toast!
    - https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
  - Hinweise zur aktuellen Verwendung von Axios in BIM.click:
    - Baustoffe.vue importiert kein Axios, macht aber \$Axios Calls
    - Bauinformationen.vue importiert http-common (Axios under the Cover?), macht http Calls! DONE: Ersetzt durch Axios Calls!
    - MyLayout.vue importiert kein Axios
    - quasar.conf.js enthält boot: ["axios"]
  - https://forum.quasar-framework.org/topic/3415/how-to-use-quasar-plugins-notify-loading-inside-vuex-modules/10
    - Dort Sample Code von @metalsadman wie man in Axios Boot File \src\boot\axios.js Axios Interceptors für Requests, Responses und insbesondere Errors definieren kann!!!
    - Benutzt Quasar Plugins Notify und Loading
    - Der Error Interceptor benutzt das Quasar Notify Plugin! Erzeugt eine Nachricht mit Notify.create()
    - Der Request Interceptor zeigt einen Spinner per Loading.show()
    - Alternativ könnte man auch über BIM.click global Store eine Benutzernachricht anzeigen in MyLayout.vue
    - Dazu müsste der Interceptor wohl einfach den global-store.js impotieren wie schon viele andere Komponenten in BIM.click
    - Siehe auch https://forum.quasar-framework.org/topic/3167/axios-headers
  - Erster Testcode dafür in axios.js funktioniert und zeigt Testnachricht unten rechts im Footer an (später Notify Plugin dafür benutzt):
    ```javascript
    import axios from "axios";
    import { globalStore } from "../pages/global-store";
    export default async ({ Vue }) => {
      // ALT: Nur
      // Vue.prototype.$axios = axios
      // };
      // NEU: Vorläufig disabled - aber FUNKTIONIERT!
      // Add a request interceptor
      axios.interceptors.request.use(
        config => {
          // Change some state in your store here
          // Do something before request is sent
          // Loading.show({
          //    spinner: QSpinnerGears,
          //    // other props
          // })
          globalStore.showBenutzerNachricht(
            "Testnachricht von Axios Request Interceptor vor Request-Senden"
          );
          return config;
        },
        error => {
          // Do something with request error
          // Notify.create(...)
          // Loading.hide()
          globalStore.showBenutzerNachricht(
            "Testnachricht von Axios Request Interceptor - Request Error"
          );
          return Promise.reject(error);
        }
      );
      // Add a response interceptor
      axios.interceptors.response.use(
        response => {
          // Do something with response data
          // call some store functions etc..
          // Loading.hide()
          globalStore.showBenutzerNachricht(
            "Testnachricht von Axios Response Interceptor vor Response-Empfang"
          );
          return response;
        },
        error => {
          // Notify.create(...)
          // Loading.hide()
          // Do something with response error
          globalStore.showBenutzerNachricht(
            "Testnachricht von Axios Response Error Interceptor - Response Error"
          );
          return Promise.reject(error);
        }
      );
      Vue.prototype.$axios = axios;
    };
    ```
- Am Backend:

  - Express API Signaturen:
    - Siehe baustoffe.routes bzw. bimclick.routes.js
    - parameters, request, response, status, data, body, etc. vereinheitlichen
  - API Methoden (Controller Code):

    - Express related:
      - Beispiele hier: Siehe baustoffe.routes bzw. bimclick.routes.js, speziell für asynchronen Code
      - In https://stackoverflow.com/questions/47065704/mongoose-promise-break-then-chain-while-handling-errors wird ein generischer Express API Request/Response Handler empfohlen, um den Error Handling Code bei der API-Implementierung nicht zu duplizieren - die eigentlichen Handler sollten dann nur data returnen oder Error throwen
      - Beispiel dafür: https://dev.to/nedsoft/central-error-handling-in-express-3aej
      - Vorschläge zur besseren Strukturierung von asynchronen Calls: https://zellwk.com/blog/async-await-express/
      - Weitere Artikel:
        - https://dev.to/nedsoft/central-error-handling-in-express-3aej
        - https://markus.oberlehner.net/blog/try-catch-the-right-way/
    - Mongoose/MongoDB related:
      - Einheitliche Mongoose Queries
        - Mongoose Queries sind keine echten Promises, aber thenables
        - Bevorzugt Promises Pattern aka Chaining Pattern verwenden statt Parameter für die Queries:
          ```javascript
          Person.select.where.in.equals.populate; // Projection // Filter
          ```
        - Siehe An Introduction to Queries in Mongoose - Mastering JS
        - https://mongoosejs.com/docs/queries.html#queries-are-not-promises
          - Dort gutes Query Beispiel für Use of Query Builder:
            ```javascript
            Person.find({ occupation: /host/ })
              .where("name.last")
              .equals("Ghost")
              .where("age")
              .gt(17)
              .lt(66)
              .where("likes")
              .in(["vaporizing", "talking"])
              .limit(10)
              .sort("-occupation")
              .select("name occupation")
              .exec(callback);
            ```
      - .then verwenden zur Weiterverarbeitung
        - Beispiel:
          ```javascript
          User.findOne({ id: 12 }).then(user => {// success}).catch(err => {// catch any errors});
          ```
        - .catch danach ist optional
          - Siehe A concise collection of tips for MongoDB's Mongoose | Jay Gould
          - The then()’s can be chained to run as many separate queries as you need, and all errors will be caught by the last catch() function which keeps the code squeaky clean.
          - Für .catch Handling siehe auch das Package im nächsten Abschnitt (dort Beispiel für Mongoose Error mit throw)
        - .then und ,catch sind besser als die alternative "Callback Hell"
        - Queries brauchen ohne .then danach .exec, damit die Query ausgeführt wird (da Queries keine echte Mongoose Promises sind)
        - Es können mit der Chaining Syntax auch geschachtelte Queries gechained werden:
          ```javascript
          Person
          .find()
            .then(
              .find()
            )
          ```
      - async await verwenden statt "Callback Hell"
        - const result = await Model.query
        - result entspricht user oben
        - Z.B. const docs = await Customer.find()
        - Returned Query Result als Dokument oder null!
        - Siehe An Introduction to Queries in Mongoose - Mastering JS
        - Unterschied zwischen .then und await:
          - .then: Der Code unter der betreffenden Promise (falls vorhanden) wird weiter ausgeführt, während der .then Code auf die Promise wartet!
          - await: Der gesamte Code wartet!
      - Siehe auch Beispiele und Links dazu in bauinformationen.controller.js
      - Siehe baustoff/deleteBaustoffebyElternBaustoffId als Muster!!!
    - Einheitliches Error Handling für Mongoose Errors über zusätzliche Middleware
      - Beispiel für MongoDB duplicate Key Error Handling (mit Middleware, aber der Error Handler könnte auch anderswo eingesetzt werden, error.code === 11000)
        - https://thecodebarbarian.com/mongoose-error-handling
      - Ähnlicher Error Handler hier:
        - https://www.codepedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example
        - https://www.codepedia.org/ama/cleaner-code-in-expressjs-rest-api-with-custom-error-handling
          - Empfiehlt Package ExpressJS Async Errors
    - Mapping auf http Status Codes
      - http Status Codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#5xx_Server_Error
    - Die beste Lösung für Express/Mongoose Error Handling: Mit dem NPM Package ExpressJS Async Errors:

      - https://www.npmjs.com/package/express-async-errors
      - https://github.com/davidbanham/express-async-errors/
      - Wird überall im Netz empfohlen
      - Dieses hilft, die sogenannten Async Wrappers zu vermeiden, die sonst gebraucht werden, weil Express V4 keine Promises unterstüzt
      - Eigentlicher Code des Packages (Wrapper/Express Patch); https://github.com/davidbanham/express-async-errors/blob/master/index.js
      - Test Code dafür: https://github.com/davidbanham/express-async-errors/blob/master/test.js
      - Gute Erklärung für dieses Package:

        - https://zellwk.com/blog/async-await-express/
        - Verwendung: Man muss in den Express Routes (d.h. in bimclick.routes.js) den Error Handler "einpluggen":
        - Code Sample:
          ```javascript
          const asyncHandler = require('express-async-handler')
          app.post('/signup', asyncHandler(async( req, res) => {
              await firstThing()
              await secondThing()
              // res.send(something) // MS added
          })
          ```
        - Erklärt auch genau, was Express mit Errors macht (man muss ohne obiges Package return next(error) explizit aufrufen in einem catch-Block!
        - Hinweis: Dieses Sample enthält direkt die Backend Funktionen in der Route - alternativ kann man wie in bimclick.routes.js diese weiterhin als exportierte Funktionen im Controller.js definieren!

          - Das wird hier genau erklärt: https://stackoverflow.com/questions/53077127/how-to-use-express-async-handler
          - Das heißt, bei in bimclick.routes.js würde eine Route mit dem Async Handler dann so aussehen:

            ```javascript
            const asyncHandler = require('express-async-handler')
            router.route('/').post(asyncHandler(insert)); // insert steht stellvertretend z.B. für eine Controller-Funktion, die vom Async Handler gewrapped wird für das Error Handling, in BIM.click z.B. baustoffe.importMaterialEigenschaften

            // Noch mehr angepasstes Beispiel:
            app.post("/api/baustoffe/importMaterialEigenschaften", asyncHandler(baustoffe.importMaterialEigenschaften));					-
            Die async Controller Funktionen können dann ganz normal res.status, res.json setzen
            ```

          - Frage: Was passiert mit einem res.status(400)?
          - Bei einem Error können Sie auch wie folgt verfahren (Hinweis: by Default liefert der Express Error Handler dann Status 500 an den Client)
            - https://github.com/davidbanham/express-async-errors#a-notice-about-calling-next
            - As we all know express sends a function called next into the middleware, which then needs to be called with or without error to make it move the request handling to the next middleware. It still works, but in case of an async function, you don't need to do that. If you want to pass an error, just throw a normal exception:
            ```javascript
            app.use(async (req, res) => {
              const user = await User.findByToken(req.get("authorization"));
              if (!user) throw Error("access denied");
            });
            ```
          - https://stackoverflow.com/questions/53077127/how-to-use-express-async-handler - sehr gute Erklärungen zur Verwendung im Router
            - Die Hauptrolle von Async Handler ist es, rejected Promises in den gewrappten Funktionen für die Routes zu erkennen und korrekt an Express weiterzureichen, indem er automatisch next(err) aufruft.
            - Annahme: Dadurch wird gewährleistet, dass wirklich bei jedem Fehler am Backend eine Error Response an das Frontend geschickt wird, die dann dort von Axios gehandled werden kann!
            - Mit obigen Axios Interceptors werden diese Fehler aus dem Backend dann auch im Frontend zentral geloggt und dem Benutzer per QNotify angezeigt

        - Ähnliches oder Package, etwas älter und weniger Downloads:

          - https://www.npmjs.com/package/express-async-handler
          - Gute "How to Use" Erklärung dafür hier.

            - https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
            - Verwendung genauso wie obiges Package: Man muss in den Express Routes (d.h. in bimclick.routes.js) den Error Handler "einpluggen":
            - Code Sample:

              ```javascript
              const asyncMiddleware = require("./utils/asyncMiddleware");
              router.get(
                "/users/:id",
                asyncMiddleware(async (req, res, next) => {
                  /*
              if there is an error thrown in getUserFromDb, asyncMiddleware
              will pass it to next() and express will handle the error;
              */
                  const user = await getUserFromDb({ id: req.params.id });
                  res.json(user);
                })
              );

              router.post(
                "/users",
                asyncMiddleware(async (req, res, next) => {
                  const user = await makeNewUser(req.body);
                  res.json(user);
                })
              );
              ```

          - An important thing to remember is when using this approach we need to have all of our async code return promises, as this approach won’t work with async callbacks that aren’t promisified.

      - Weitere Error Handlers hier:
        - https://stackoverflow.com/questions/51391080/handling-errors-in-express-async-middleware
          - Empfiehlt ebenfalls Package https://github.com/davidbanham/express-async-errors/
        - Beispiel für zentralen Handler für Database Errors: https://stackoverflow.com/questions/45885948/how-could-i-generalize-a-http-response-handler-in-node-js
      - Weitere Artikel:
        - http://thecodebarbarian.com/using-async-await-with-mocha-express-and-mongoose
        - https://stackoverflow.com/questions/46457071/using-mongoose-promises-with-async-await

- Vorgehen:
  - Eine "Muster Call Chain" End-to-End (vom Frontend zum Backend) selektieren und exemplarisch implementieren (mit neuen generischen Handlern)
  - Dann die anderen Calls nachziehen
  - Dies zunächst exemplarisch für deleteBaustoffeByByElternBaustoffId vollzogen
    - Bereits mit Async Handler
    - Axios Interceptors unabhängig davon angetestet - siehe oben
- Ergebnisse:
  - Axios Interceptors funktionieren gut
  - Express Async Handler hatte anfangs allerdings keinen erkennbaren Einfluss:
    - Bei disableten Catch-Blöcken an Mongoose Calls (z.b. für find mit illegaler id) hängt das Backend trotzdem, und danach wird nur ein Network Error an das Frontend geschickt
    - Entgegen den in https://zellwk.com/blog/async-await-express/ geweckten Erwartungen kann man also trotz Asyc Handler wohl keine Catch-Blöcke weglassen am Backend
    - Auch zusätzlich vor den .then eingefügte .exec(), die vollwertige Mongoose Promises erzeugen, helfen nicht!
  - Da Express Async Handler die lästigen Wrapper in den Routes braucht: Stattdessen zusätzlich das ähnliche NPM Package Express-Async-Errors installiert - dieses funktioniert ohne Wrappers, hat aber anfangs ebenfalls keinen erkennbaren Einfluss
    - https://www.npmjs.com/package/express-async-errors
    - Hat mehr Downloads als async handler
    - Einfaches require dafür in bimclick.routes.js enabled es im Code - keine weiteren Coceänderungen außer den unten beschriebenen throw Erro Statements in catch-Blöcken und dem Errror Handler
  - Damit zunächst getestet, ob mit next() in den Catch-Blöcken etwas an den Wrapper übergeben wird
    - http://thecodebarbarian.com/using-async-await-with-mocha-express-and-mongoose suggeriert das - allerdings unklar wie man den Code des Wrappers dabei beeinflussen kann
      ```javascript
      exports.updateRelevanteBauinformationenBaustoff = async function(req, res, next) {
      ```
    - D.h. zunächst die Parameter (req, res) am Route Handler erweitert um next
    - Dann in den obersten catch Block next(error) eingebaut:
      ```javascript
      catch(error => {
        return next(error);
      });
      ```
    - Damit wird sofort bei falscher id ("Cast to ObjectId failed" im Backend Log) eine nicht weiter detaillierte Put Response 500 (Internal Server Error) an das Frontend zurückgegeben, d.h. das Frontend hängt dann nicht mehr, wie wenn man den Catch-Block ganz weglässt
    - Im Vergleich enthält der Catch-Block sonst das normale res.status(500).send, allerdings mit einer spezifischen Fehlermeldung und dem originalen Error-Objekt
    - Allerdings passiert diese sofortige Response mit und ohne das Package express-async-errors - also weiterhin unklar, wo dieses hilft!
    - Mit dem regulären Catch-Block, der eine 404- oder 500.Response in diesem Fall schickt, ist das Verhalten nicht entscheidend anders!!!
    - Next() bringt also keine Verbesserung!
  - Die Lösung (mit enabletem Express Async Errorrs) sieht schließlich so aus: throw Error in .catch Block (getestet an Methode importBauinformationen in bauinformatioen.controller.js):
    ```javascript
        .catch(error => {
          console.log("csvToJson Error: ", error); // Z.B. (von csvToJson): "Error: File does not exist. Check to make sure the file path to your csv is correct."
          // NEU:
          throw Error("csvToJson Error");
          // HINWEIS: throw ist die richtige Lösung für Errors am Backend, in Verbindung MIT Express Async Errors Package UND await vor der Promise
          // Siehe Vorlage auf https://www.npmjs.com/package/express-async-errors - A Notice About Calling Next:
          // If you want to pass an error, just throw a normal exception:
          // Verhalten OHNE Express Async Errors Package:
          //   - Backend: Beendet den Request mit Error, Log zeigt aber UnhandledPromiseRejectionWarning:
          //   - Frontend hängt, erhält nach Timeout Status 500
          // Verhalten MIT Express Async Errors Package in bimclick.routes.js
          //   - Backend: Beendet den Request mit Error (d.h. keine weitere Codeausführung weiter unten)
          //   - Frontend bekommt sofort nach dem Error Response mit Status 500, weil der Error Handler von Express Async Errors hier eingreift!!!
          //   - Über Error Handler in bimclick.routes.js kann die weitere Fehlerbehandlung gesteuert werden!!!
          //   - Der Error-Text, der beim throw Error("Error-Text") mitgegeben wird, kann dabei zur Steuerung dienen
          // ACHTUNG: Funktioniert so aber NUR bei bestimmten Nebenbedingungen:
          // 1. Kritisch: async (req, res) in den Funktions-Headers für die Route Handler, sonst kommt für das await in 2. eine Fehlermeldung:
          //    SyntaxError: await is only valid in async function
          // 2. Sehr kritisch: await vor csvtojson oben ist NOTWENDIG!!!
          //    - Ist im Fehlerfall entscheidend für die Ausführung des Express Async Error Handlers in bimclick.routes.js wie oben beschrieben!!!
          //      Auch in der Vorlage auf https://www.npmjs.com/package/express-async-errors ist ein await enthalten!
          //    - Ist daneben AUCH kritisch für den Erfolgsfall, damit der weitere Code unten für den Erfolsfall unten nicht vorzeitig ausgeführt wird!!!
          // 3. Kein zusätzliches async() => {} um den await oben (dies ist vermutlich nicht notwendig wegen 1.)
          // 4. Nur async (req, res), kein (erro, req, res, next) am Funktions-Header oben (err und next scheinen nicht gebraucht zu werden,
          //    ist auch so in der Vorlage, unklar, ob kritisch)
          // 5. Wie bei 2. AUCH awaits an den restlichen Mongoose Calls unten (die dortigen throws wurden allerdings bisher nicht getestet)
          //
          // Alternative Versuche:
          // 1) Next(error) - braucht oben im Funktions-Header exports.importBauinformationen = async (req, res, next)
          //    next(error); // ACHTUNG: NICHT verwenden - macht weiter mit der Codeausführung weiter unten!!!
          // 2) ALTE Variante:
          //    return res.status(500).send({ message: "CSVToJSON Error beim Import Bauinformationen", error });
          //    PROBLEM mit 2): Trotz des awaits und des return wurde im Error Fall (z.B. CSV-File not found) der Code unten weiter ausgeführt!!!
        });
    ```
    - Dabei ist per Tests wichtig für das korrekte Funktionieren:
      1. async an der Route Funktion
      2. await an der Promise mit dem .catch Block!
    - Das throw Error spielt ggf. zusammen mit einem in bimclick.routes.js definierten Express Async Errors Error Handler:
      ```javascript
      //------------------------------------------------------------------------------------------------------------------------------
      // Testweiser Error Handler für Express Async Errors nach Vorlage auf https://www.npmjs.com/package/express-async-errors
      // Laut https://nemethgergely.com/error-handling-express-async-await/ definiert app.use mit den 4 Parametern gegenüber Express
      // einen Error Handler:
      app.use((err, req, res, next) => {
        console.log("In Express Async Errors Error Handler");
        console.log("err.message: ", err.message);
        if (err.message === "csvToJson Error") {
          // individuelle Error Message, per throw Error gesetzt in Route Handlern,
          // z.B.: throw Error("csvToJson Error");
          res.status(501); // Setze http Status
          res.json({ error: err.message }); // Sende individuelle Message für das Frontend, der Axios Response Interceptor dort kann
          // auf diese Message zugreifen per console.log("error.response.data.error: ", error.response.data.error);
        }
        next(err);
      });
      ```

---

#### **[Epic 50.d]** Markdown

- ==**Hinweis**==: Dieses Epic wurde übernommen aus Evernote-Notiz "BIM.click Next Level (1/3)"
- Markdown vs Rich Text: https://www.k15t.com/blog/2015/04/markdown-vs-rich-formatting-who-will-win-the-ultimate-text-processing-competition
- Interessant auch für spätere Diagramme: https://www.maketecheasier.com/5-best-free-alternatives-to-microsoft-visio/
- **Quasar Markdown App Extension QMarkdown**
  - QMarkdown ist Quasar Komponente und Quasar App Extension!
  - Siehe https://quasarframework.github.io/quasar-ui-qmarkdown/docs
  - Demo: https://quasarframework.github.io/quasar-ui-qmarkdown/demo
  - Installation aus bimclickfrontend>
    - quasar ext add @quasar/qmarkdown
    - Dabei die Fragen, ob man in der Lage sein will, .md und .vmd Files zu importieren, mit "Y" beantworten
  - Danach die Quasar App neu bauen, mit der App Extension QMarkdown (und der bereits installierten App Extension QPDFViewer)
  - Kann einfach benutzt werden in Quasar Komponenten mittels Vue Slot <q-markdown>::: tipp xyz:::</q-markdown>
  - Import von Markdown Files:
    ```javascript
    import markdown from '../markdown/calendar.md'
    export default {
    data () {
    return {
    markdown: markdown
    } },...
    ```
  - Zusammen mit: <q-markdown :src="markdown" />
  - Erfolgreich getestet in MyLayout.vue für Kontexthilfe im rechten Drawer und in Hilfe ganz unten
  - Hilfe.vue auf Markdown umgestellt, modulo einiger Teile, die Quasar Komponenten nutzen
  - Offener Issue: Smooth Scrolling direkt im Markdown (funktioniert von außerhalb mit Quasar q-bn type="to"
  - Siehe https://forum.quasar-framework.org/topic/5012/qmarkdown-extension-how-to-link-and-scroll-within-the-markup-without-reloading-page
- Markdown Editing/Editors mit Vue/Quasar (manche auch WYSYWYG)
  - https://forum.quasar-framework.org/topic/4763/solved-ui-component-for-code-editor/3
  - https://vuejs.org/v2/examples/index.html
  - https://www.npmjs.com/package/v-markdown-editor
  - https://panjiachen.github.io/vue-element-admin-site/feature/component/markdown-editor.html#props -
    - Dort auch Rich Text Editor, JSON Editor, Clipboard, Excel, ...
    - WYSYWYG Markdown Editor dort ist ein Vue Wrapper des TUI Editor (Toast UI):
      - https://github.com/nhn/tui.editor
    - https://panjiachen.github.io/vue-element-admin/#/components/markdown - Online Sample
    - https://github.com/nhn/toast-ui.vue-editor - NPM Package für denn Vue Wrapper des Toast UI Editors mit Instruktionen zur Nutzung, enthält auch einen Viewer
    - Getestet, Ergebnis war negativ - der Editor und seine Toolbar kam innerhalb eines Quasar QTabPanels nicht richtig hoch!
  - Alternative: QInput-Feld und QMarkup Side by Side - funktioniert, ist aber nicht so komfortabel, da im QInput-Feld die Markdown-Tags per Hand eingegeben werden müssen
    - Image Upload muss dabei separat gelöst werden, mit Variante von file-uploader.js - siehe Kommentare dort
  - Weitere Alternative: Quasar QEditor (Rich Text Editor, erzeugt allerdings HTML, kein Markdown)
- Damit konnte man folgendes Szenario für die Anzeige von fachlicher Kontexthilfe-Information für Baustoffe implementieren:
  - Baustoffe erhalten zusätzliches Feld baustoffBeschreibung (in der Datenbank kann es ein String sein, der dann markdown enthält), wird mit dem Baustoff in der Datenbank gespeichert
  - Lokale "Proxy" Objekte für diese baustoffBeschreibung des selektierten Baustoffs: localStore.state.baustoffBeschreibungAusgewaehlterBaustoff
    - in Baustoffe.vue
    - in MyLayout.vue
    - Beide verknüpft mit globalem Objekt baustoffBeschreibungAusgewaehlterBaustoff für den Markdown, plus Mutator-Methode dafür in global Store, SetBaustoffBeschreibungAusgewaehlterBaustoff()
  - Beim Selektieren eines Baustoffs im Baum in Baustoffe.vue:
    - Konnte integriert werden in vorhandenen Watcher für selectedKeyTreeBaustoffe
    - Eintragen des Markdowns aus dem Backend mit obiger Mutator Methode in den global Store (zum Sharing mit MyLayout.vue/rechter Drawer zur Anzeige)
    - Damit reaktives Update aller lokalen Proxy-Objekte darauf, so z.B. localStore.state.baustoffBeschreibungAusgewaehlterBaustoff
    - Analog lokales reaktives Proxy localStore.state.baustoffBeschreibungAusgewaehlterBaustoff für den Markdown in MyLayout.vue verwenden zur Anzeige des Markdowns im rechten Drawer
      - Rechter Drawer zeigt dann den Markdown mittels QMarkdown Extension an (dann z.B. Containers unterstützt)
      - TODO: Alternativ auch mit obigem Markdown Viewer?
  - Positiv getestet: In Baustoff.vue den originalen Markdown in q-input Feld editieren und speichern, in weiterem Tab unter "Baustoffe", z.B. "Beschreibung"
    - Parallele Anzeige des gerenderten Markdowns im rechten Drawer
    - Eventuell auch zusätzlich direkte Anzeige auf dem Tab
    - Nach Abspeichern neuer Werte aus dem Input-Feld ist ggf. auch der obige global Store upzudaten!
  - Ausbaustufe:
    - In Baustoffe.vue Markdown WYSYWYG Editor integriert zum Editieren des Markdowns, in obiges weiteres Tab (z.B. "Beschreibung") unter "Baustoffe"
    - Den vom Markdown Editor erzeugten Markdown abspeichern in der Datenbank
    - Nach Abspeichern ist ggf. auch der global Store upzudaten!
    - Getestet mit Vue Wrapper Toast UI Markdown Editor - negativ (siehe oben)
- Dasselbe geht auch für andere Objekte (z.B. Baueigenschaften)

---

#### **[Epic 50.e]** Lokalen Development Server für Demo- und Testzwecke öffentlich zugänglich machen

- ==**Hinweis**==: Dieses Epic wurde übernommen aus Evernote-Notiz "BIM.click Next Level (1/3)"
- https://quasar.dev/quasar-cli/opening-dev-server-to-public
  - Optionen dort:
    - (localhost.run)
      - Erfordert keine lokale Installation
      - Zuerst ausprobiert:
        - Aus Powershell in VS Code:
        ```
          PS C:\Users\Familie Scheible\GitHub\BIMclick> ssh -R 80:localhost:8080 ssh.localhost.run
          The authenticity of host 'ssh.localhost.run (35.193.161.204)' can't be established.
          RSA key fingerprint is SHA256:FV8IMJ4IYjYUTnd6on7PqbRjaZf4c1EhhEBgeUdE94I.
          Are you sure you want to continue connecting (yes/no)? yes
          Warning: Permanently added 'ssh.localhost.run,35.193.161.204' (RSA) to the list of known hosts.
          Connect to http://familie scheible-acqm.localhost.run or https://familie scheible-acqm.localhost.run
          ^c
          Connection to ssh.localhost.run closed.
          PS C:\Users\Familie Scheible\GitHub\BIMclick>
        ```
      - Problem mit localhost.run: Es wird "Familie Scheible" (lokale Windows User Id) wird als Base URL genommen - enthält Blank, ist damit keine valide URL, kann allerdings nicht geändert werden
    - NGrok - siehe unten
- Alternativen: https://www.chenhuijing.com/blog/tunnelling-services-for-exposing-localhost-to-the-web/
  - (Serveo)
    - Ausprobiert: ssh -R 80:localhost:4200 serveo.net - Reagiert mit Timeout
    - Site ist down: https://github.com/milio48/serveo/issues/4
  - NGrok
    - Download NGrok Zip File von https://dashboard.ngrok.com/get-started
    - Extrahieren und ausführen, installiert NGrok auf Windows
    - In Command Window unter c:\Users\Familie Scheible\Downlaods\ngork-stable-windows-amd64 eingeben: ngrok http 4200
    - NGrok Web Interface läuft mit unter http://127.0.0.1:4040 - dort Inspektion des http-Traffics möglich
    - ACHTUNG: In Chrome muss dabei oben rechts (rotes C) Access Control Allow Origin aktiivert werden, sonst führen CORS-Fehler dazu, dass Backend Calls auf localhost:8ß80 blockiert werden!
    - BIM.click kann dann remote z.B. unter https:// oder http://9cf28446.ngrok.io/ laufen - die jeweilige URL wird als Antwort auf obiges ngrok Command zurückgegeben
    - NGrok baut dabei für 8 Stunden eine remote Session auf, wenn man nciht mit Ctrl-C canceled
    - Funktioniert!
    - Parallel Konto bei NGrok erföffnet, Id michael.scheible@bimlinve.de, allerdings bsiher nicht verwendet
