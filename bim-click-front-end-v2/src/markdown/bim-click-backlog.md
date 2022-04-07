<!-- bim-click-backlog.md -->

## <!-- Projekt-Backlog für BIM.click -->

#### **Hinweise zum Projekt-Backlog**

- ==**Alle Informationen in diesem Abschnitt der Dokumentation sind vertraulich zu behandeln!**==
- Aktuelle Sammlung von zu erledigenden Aufgaben für das BIM.click-Projekt
  - Bugs/Defects
  - Feature Requests
  - Requirements
  - Sonstige Aufgaben
- Terminologie: Backlog Items werden als solche bezeichnet, oder als "Issues"
- **Status-Codes** für jedes Backlog Item:
  - ==**[TODO]**== - noch zu erledigen
  - ==**[WORK]**== - in Arbeit
  - **[DONE]** - erledigt
  - **[DEFER]** - verschoben auf später
  - **[REJECT]** - abgelehnt
- Verwendete **Prioritäten**
  - (Prio 1) - Dringend zu erledigen, kritisch
  - (Prio 2) - "Must Have", aber nicht kritisch
  - (Prio 3) - "Nice to Have", nicht kritisch
- Dateiformat: **Markdown** (.md)
  - Siehe https://quasarframework.github.io/quasar-ui-qmarkdown/examples
  - Siehe https://shd101wyy.github.io/markdown-preview-enhanced/#/markdown-basics
- Zur **Preview** des Markdowns in Visual Studio Code: **VS Code Extension _Markdown Preview Enhanced_** installieren per Extensions: Marketplace

---

#### **Backlog Items für zugeordnete Bauinformationen**

1. **[DONE]** Fehler: Diese werden aktuell nur populiert in den Wurzelknoten im Baustoffbaum, nicht in andere Knoten, muss am Controller liegen!
   Erster Fix im Controller in getChildrenByName .populate("zugeordneteBauinformationen"); hinzugefügt, wie schon in getKnotenByName
   Dieser populiert dann nur manchmal den testweise mit ids in zugeordneteBauinformationen bestückten Testknoten "Kleber für Fliesen und Platten"!!!
   Zusätzlich in MPath Methode getImmediateChildren auch noch .populate hinzugefügt, dann funktioniert es!
2. **[DONE]** selectModelBauinformationenAusgewaehlterBaustoff initialisieren mit selectedNodeTreeBaustoffe.zugeordneteBauinformationen (bzw. daraus
   bauinformationsBezeichnung und bauinformationsTyp)
3. **[DONE]** selectOptionsBauinformationenAusgewaehlterBaustoff laden mit allen Bauinformationen (bzw. daraus bauinformationsBezeichnung und
   bauinformationsTyp)
4. **[DONE]** Bei Neuauswahl des Baustoffs im Baum müssen obige Werte neu initialisiert werden (ACHTUNG: Dies ist kein Tab-Wechsel!)
   HINWEIS: In der Compute-Funktion selectedNodeTreeBaustoffe wäre dies ein "unexpected Side Effect"
   Deshalb im Watch für selectedKeyTreeBaustoff implementiert
5. **[DONE]** Neue Methode für Update der ids der im Q-Select ausgewählten zugeordneten Bauinformationen per QButton "Speichern" in der Datenbank (-> Stefan)
   Sonderfall beachten: Speichern bei bisher leeren zugeordneten Bauinformationen!!!
   Der Refresh der QTable für die zugeordneten Bauinformationen nach dem Speichern funktioniert noch nicht!

---

#### **Backlog Items für Baustoff- und Bauvorhabenbaum**

1. **[DONE]** Verschönern mit v-slots, z.B. Verzweigungsknoten anders anzeigen als Blattknoten
2. **[DONE]** Filter auf dem QTree, siehe https://quasar.dev/vue-components/tree#Example--Filtering-nodes
3. **[DONE]** Buttons für Löschen von Knoten und Neuanlegen Kindknoten von den q-tabs rechts nach links unter den q-tree verschieben
4. **[DONE]** Neuanlage Knoten: Ein neuer Knoten (außer dem Wurzelknoten) sollte zunächst ein Blattknoten sein,
   erst wenn darunter ein Kind neu angelegt wird, sollte er in einen Verzweigungsknoten umgewandelt werden.
   Im Baustofbaum sind alle Verzweigungsknoten automatisch vom Verzweigungstyp "(ungeordnete) Selektion" - dessen q-input Feld daher
   im Baustoffbaum disabled, wird (nur im Baustoffbaum, nicht im Bauvorhabenbaum) vom System gesetzt
   TBD - Sollen bei Neuanlage evtl. weitere Eingaben neben Bezeichnung erfolgen, z.B. per Tab "strukturierungsAngabenTabBaustoffe"?
5. **[DONE]** Bei Neuanlage eines Kinds unter einem solchen Blattknoten muss dessen Knotentyp von "Blattknoten" in "Verzweigungsknoten" geändert
   werden und dabei der Verzweigungstyp auf "(ungeordnete) Selektion" gesetzt werden.
6. **[DONE]** (Prio 2) Context Menus für Löschen, Kindknoten neu anlegen, etc., siehe https://quasar.dev/vue-components/menu#Context-menu
   Vorlage: https://codepen.io/metalsadman/pen/OJJVGKr?editors=1010 - dort wird allerdings q-popup-edit (linke Maustaste) statt q-menu verwendet
   Bereits eingebaut, allerdings ist das Kontextmenü noch ohne Funktion

---

#### **Backlog Items für Baueigenschaften, Baustoffe und Baueinheiten**

==**Hinweis**== ==Die Backlog Items hier gelten mittlerweile verallgemeinert für alle Teile von BIM.click, mit fortlaufender Nummerierung!==

1. **[DONE]** Neuen multiplen Table Header eingebaut am Header v-slot mit Oberspalten und Unterspalten, CSS dafür angepasst
2. **[DONE]** Löschen einer Baueigenschaft funktioniert nicht, weder über Button in "Übersicht", noch über Button in "Auswahl"
   Es wird dort bisher noch die Methode "onlyForTesting" gerufen, diese wirft TypeErrors im Log!!!
3. **[DONE]** Tab "Eigenschaft bearbeiten":

   - **[DONE]** Speichern von Datumswerten funktioniert nicht => Richtiges Format wie in Hinweis unter Eingabe-->
   - **[DONE]** Datum 2 wird gefüllt mit Wert von Datum 1 bei Eingabe
   - **[DONE]** Wertetyp sollte man vorläufig nicht ändern dürfen, d.h. das Feld für diesen sollte disabled werden!
     (später solles evtl. am Wurzelknoten erlaubt sein bzw. implizit für diesen gelten)
     (dies könnte sonst dazu führen, dass im Pfad dasselbe Attribut verschiedene Wertetypen haben kann, was verboten ist!)
   - **[DONE]** Nach Auswahl von "Speichern" soll Erfolgs- oder Fehlermeldung kommen - stattdessen erfolgt Tab-Wechsel auf "Übersicht" - dabei geht aber auch die Auswahl verloren! Hinweis: Mittlerweile gefixed
   - **[DONE]** Danach kann der Benutzer weitere Änderungen machen und diese nochmals speichern
     Alternativ soll der Button "Abbrechen" die Werte auf die zuletzt in der Datenbank abgespeicherten Werte zurücksetzen
     Aktuell so gelöst, dass bei "Zurücksetzen" die Originalwerte aus dem Baustoffbaum genommen werden
   - **[DONE]** Den Button "Abbrechen" umbenannt in "Zurücksetzen" - dieser soll NICHT nach "Übersicht" wechseln (ist implementiert)
   - **[DONE]** In Abhängigkeit vom Wertetyp müssen die richtigen, zum Wertetyp passenden Werte eingebbar sein und gespeichert werden,
     illegale Kombinationen müssen im Tab "Auswahl" und "Neu"
     disabled werden
   - **[DONE]** (außer Bezeichnung) - Die typbezogenen Felder wie "Bezeichnung", "Bemerkung", "zugeordnete Bauinformationen" und "Schutzkategorien" sollten
     änderbar sein, wobei sich Änderungen stets auf alle Knoten im Baum auswirken müssen (dies ist durch das neue Datenbankdesign gewährleistet)

4. **[DONE]** (singleSelect) - der Wertetyp "Aufzählungswert" muss noch implementiert werden
   Dafür folgendes Design für die Definition der Options für die Aufzählung bei Auswahl dieses Wertetyps:
   Ein dediziertes q-select im Tab "neuTabBaueigenschaften" hinzugefügt
   unter dem q-input für das Feld aufzaehlungsWert, mit dem die auszuwählenden Select Options folgendermaßen DEFINIERT werden können:
   Die Auswahl an diesem q-select sollte später :multiple=false sein. in der Definitonsphase true
   Die Select Options (Array, z.B. selectOptionsAufzaehlungswertNeueBaueigenschaft)
   können anfangs leer sein, und über eine Funktion createSelectValueAufzaehlungswertNeueBaueigenschaft
   durch den Benutzer erzeugt werden, nach demselben Prinzip wie in den q-selects zur Auswahl von Bauinformationen.
   Dabei musste am q-select @new-value="createSelectvalueAufzaehlungswertNeueBaueigenschaft" spezifiziert werden.
   Diese Funktion musste wie in https://quasar.dev/vue-components/select#Example--Filtering-and-adding-to-menu einen vom Benutzer
   eingegebenen Wert dem Array für die Select Options und damit auch dem Menü im q-select hinzufügen:
   Die so befüllten selectOptionsAufzaehlungswertBaueigenschaft müssen immer zusammen mit dem tatsächlichen Wert (d.h. v-model)
   des Felds "aufzaehlungsWert" abgespeichert werden. Sie sollten nach der Erstanlage nicht mehr ohne Weiteres geändert werden.
   Das heisst, das im Tab "Auswahl" in einem q-select für den aufzaehlungsWert dann obige Funktion keine neuen Werte mehr auf den Array
   für die Options pushen darf, sondern nur noch die bereits vordefinierten Options per done(val, 'toggle') selektieren darf.
5. **[DONE]** Tab "Neu" bzw. "Eigenschaft neu anlegen"

   - **[DONE]** Nach dem Speichern soll Erfolgs- oder Fehlermeldung kommen - stattdessen erfolgt Tab-Wechsel auf "Übersicht" - dieser Fehler ist behoben!
   - **[DONE]** Damit der Benutzer nicht bei erneutem Drücken von "Speichern" 2-mal dasselbe Dokument in der Datenbank anlegt,
     muss beim Speichern der Key für die Bezeichnung auf Uniqueness abgeprüft werden. Mit dem Button "Zurücksetzen" soll
     das Tab "Neu" auf die leere Baueigenschaft zurückgesetzt werden.
   - **[DONE]** Den Button "Abbrechen" umbenennen in "Zurücksetzen" - dieser soll NICHT nach "Übersicht" wechseln.

6. **[DONE]** Bezeichnung, Bemerkung, Bauinformation, Wertetyp, kennwertbezogene Angaben (falls Wertetyp = "Kennwert"
   oder "Kennwertepaar"), sowie Schutzkategorien sollen als "typbezogene Baueigenschaften" für eine (per Bezeichnung identifizierte)
   Baueigenschaft stets zusammen verwaltet werden und somit für alle Knoten im Baustoffbaum gleich sein.
   ACHTUNG: Aktivierungsmerkmale beziehen sich auf den Knoten im Baustoffbaum und gehören nicht dazu!
   Dafür neue separate Collection "BaueigenschaftenCollection" zu definieren.
   Die übrigen Attribute, inklusive der Aktivierungsmerkmale, beziehen sich alle auf Werte bzw. einen Knoten im Baustoffbaum und könnten "wertbezogene
   Baueigenschaften" heißen
   Zusammen würden sie in der Collection für die Baustoffe liegen.
   Damit verbundene Umbenennungen:
   baustoffeigenschaft.model.js => typbezogeneBaueigenschaften.model.js
   mit typbezogeneBaueigenschaftenSchema/Model/Collection
   BaueigenschaftSchema/Model/Collection => BaueigenschaftenSchema/Model/Collection
   In Baustoffen:
   baustoff01919.model.js => baustoffe.model.js
   bauphysikalischeEigenschaften: [BauphysikalischeEigenschaftSchema], => materialEigenschaften: [BaueigenschaftenSchema]
   In Bauvorhaben:
   Noch zu entscheiden: nutzungsEigenschaften: [BaueigenschaftenSchema] oder baueinheitEigenschaften: [BaueigenschaftenSchema]
   Später wurde die 3 beteiligten Schemas nochmals umbenannt:

   - BaueigenschaftenSchema/Model/Collection für die (typbezogenen) Baueigenschaften
   - WertbezogeneBaueigenschaftenSchema/Model für die wertbezogenen Baueigenschaften, diese haben keine eigene Collection, sondern Instanzen liegen mit in
     der BaustoffeCollection
   - MaterialeigenschaftenSchema: Dies ist ein Alias für das WertbezogeneBaueigenschaftenSchema, dieses wird innerhalb des BaustoffeSchemas
     verwendet unter dem Namen MaterialEigenschaftenSchema

7. **[DONE]** Korrektes Abspeichern der Referenz auf Bauinformation, die per q-select ausgewählt werden kann im Tab Baueigenschaften/Auswahl
   Diese steht in selectModelBauinformationAusgewaehlteBaueigenschaft und muss nach ausgewaehlteBaueigenschaft.bauinformation
   Nach dem Speichern (mit der allgemeinen Speichermethode am Button "Speichern" für das Tab "Auswahl" passiert trotz Erfolgsmeldung aktuell ein Fehler,
   der dazu führt, dass die q-table im Tab Auswahl nach dem Speichern nicht mehr lädt!
   Im Log kommt eine Fehlermeldung, dass das Feld bauinformationsBezeichnung undefined ist beim Rendern der QTable
   Hinweis: Die Methode submitZugeordneteBauinformationAusgewaehlteBaueigenschaft wurde ursprünglich für separates Speichern dieses Feldes angelegt,
   ist aber nicht funktionsfähig, und wird wahrscheinlich auch nicht gebraucht, wenn das Speichern der Bauinformation gemeinsam mit den anderen Feldern für
   die Baueigenschaft erfolgt.
   Bisher **[DONE]**:

   - Änderung in der Methode für das Abspeichern des q-forms für die ausgewählte Baueigenschaft: selectModelBauinformationAusgewaehlteBaueigenschaft
     kopieren nach ausgewaehlteBaueigenschaft.bauinformation, inklusive des \_id Felds, zum Abspeichern des neuen oder leeren Verweises auf die bauinformation
     in der Datenbank mittels Controller-Methode updateBaueigenschaftBaustoff
   - Änderung im Baustoff-Controller: Null-Referenz mit Mongoose abgespeichert, falls Bauinformation leer ist
   - Änderung im Code für die q-table für Baueigenschaften:
     Logik in v-slot für die Textfelder eingebaut, die den Fall behandelt, falls das Feld bauinformation null ist
     Selektierte Bauinformation ändern, abspeichern => Es kommt Erfolgsmeldung, aber das geänderte Feld (das nun Teil der typbezogenen Eigenschaften ist),
     wird nicht abgespeichert. Dies ist gefixed.
     Das Ändern/Abspeichern ist für anderen typbezogenen Eigenschaften (z.B. "Bemerkung", etc.) wurde ebenfalls implementiert!

8. **[DONE]** Analog zu 11.: Korrektes Abspeichern der im Tab Baueigenschaften/Neu per q-select ausgewählten Referenz auf eine Bauinformation
   Es kommt im Log nach dem (als erfolgreich gemeldetem?) Speichern im Tab "Übersicht" ein "Uncaught (in promise) TypeError" beim Neuaufbau des Baums/bzw.
   der QTable für die Baueigenschaften
   Eine neue selektierte Bauinformation wird dabei nicht korrekt abgespeichert, wie ein Blick in die Datenbank zeigt
   In der Methode createNeueBaueigenschaft musste auch hier erst das selectModelBauinformationNeueBaueigenschaft kopiert werden nach
   neueBaueigenschaft.bauinformation, etc.
9. **[DONE]** Korrektes Abspeichern der im Tab Baueigenschaften/Neu für den Wertetyp "Aufzählungswert" per q-select neue angelegten Aufzählungsoptionen
   Diese befinden sich aktuell in einem (flachen) Array aus String-Werten namens selectModelAufzaehlungswertNeueBaueigenschaft
   Eventuell könnte man auch direkt auf neueBaueigenschaft.aufzaehlungsWert als v-model arbeiten, allerdings ist das eher das v-model
   für den später zu selektierenden aktuellen Wert des Aufzählungswerts (single Selection) - das Design dafür muss noch überlegt werden
   Man braucht auf jeden Fall ein Feld (Array) für die zulässigen Optionswerte, und ein Feld für den später zu selektierenden aktuellen Optionswert (oder
   einen Index dafür)
10. **[DONE]** Korrektes Anzeigen und Ändern von Aufzählungswerten im Tab Baueigenschaften/Auswahl (für die im Tab /Neu die Options definiert wurden) -
    siehe 5. und 13.
11. **[DONE]** Im Tab "Neu" sollen bei der Erstanlage einer Baueigenschaft die wertbezogenen Angaben und kennwertbezogenen Angaben in Abhängigkeit vom
    Wertetyp
    disabled bzw. enabled werden, wie auch schon im Tab "Auswahl" - dazu die Funktion disabledFields dupliziert in disabledFieldsNeueBaueigenschaft und
    disabledFieldsAugewaehlteBaueigenschaft
12. **[DONE]** Unterstützung von Selection "multiple" für Wertetyp "Aufzaehlungswert" - im Frontend schon vorbereitet (q-selects in q-table), in Datenbank
    Array für select Model statt String-Objekt notwendig
13. **[DONE]** Im Tab "Neu" werden die Options für das Feld Aufzählungswert nicht ordentlich zurückgesetzt
14. **[DONE]** Umbenennungen/Refactoring

    - baueigenschaftenSchema/Model/Collection => BaueigenschaftenSchema/Model/Collection (in baueigenschaften.model.js, diese Datei dann auch mit
      umbenennen in baueigenschaften.model.js, und in baustoff0919.controller.js)
    - typbezogeneBaueigenschaftenSchema/Model/Collection => TypbezogeneBaueigenschaftenSchema/Model/Collection (Model/Schema/Collection stets mit
      Großbuchstaben, in typbezogeneBaueigenschaften.model.js, diese Datei dann auch mit umbenennen in typbezogeneBaueigenschaften.model.js)
    - typbezogeneEigenschaftsattribute => typbezogeneBaueigenschaften (in baueigenschaften.model.js und (kommt dort sehr oft vor!) in baustoff0919.
      controller.js
    - baustoff0919.controller.js => baustoffe.controller.js (der neue Name kollidiert so auch nicht mit dem alten baustoff.controller.js)
    - baustoff0919.model.js => baustoffe.model.js (der neue Name kollidiert so auch nicht mit dem alten baustoff.model.js)
    - BaustoffSchema/Model/Collection => BaustoffeSchema/Model/Collection (in baustoff0919.model.js bzw. neu baustofffe.model.js)
    - bauinformation.controller.js => bauinformationen.controller.js
    - BauinformationSchema/Model/Collection => BauinformationenSchema/Model/Collection (in bauinformation.model.js, diese Datei auch gleich umbenennen in
      bauinformationen.model.js, und in bauinformationen.controller.js)
    - In server.js waren dann auch entsprechende Änderungen notwendig
    - Baustoffe.vue => BaustoffeAlteVersion.vue, BaustoffeNeueVersion.vue => Baustoffe.vue
      Entsprechende Anpassungen in MyLayout.vue und routes.js
      ACHTUNG: Es musste auch der Component Name in der Komponente selbst geändert werden!!!
    - Im neuen Baustoffe.vue bauphysikalischeEigenschaft => baueigenschaft
      ACHtUNG: Es musste auch die Child-Komponenten, z.B. BaueigenschaftBearbeitung.vue geändet werden!!!
    - Später nochmals umbenannt: BaueigenschaftenSchema/Model/Collection => WertbezogeneBaueigenschaftenSchema/Model/Collection
      typbezogeneBaueigenschaftenSchema/Model/Collection => BaueigenschaftenSchema/Model/Collection

15. **[DONE]** (Prio 1) - Aktivieren - siehe dazu http://localhost:4200/Hilfe/1.3.2 (Anwählen über Hilfeverzeichnis)
    "Aktivieren" (d.h. Betätigen des Schiebereglers für "Aktiviert" in den Tabs "Neu" und "Auswahl") sollte Folgendes auslösen:

    - Prüfung, ob Aktivieren erlaubt ist gemäß Vererbungsregeln für Attribute (d.h. die Baueigenschaft muss auch am Vaterknoten aktiviert sein), sonst
      muss eine Fehlermeldung erfolgen, bzw. der Toggle für "Aktiviert" sollte, sofern dies automatisch ermittelbar ist, in diesem Fall von vorne herein
      disabled sein!
    - Die Felder für die wertbezogenen und ggf. die kennwertbezogenen Angaben im Tab "Neu" und Tab "Auswahl" sollen dann entsprechend des gesetzten
      Wertetyps enabled werden,
      damit Werteeingaben in diesen Felder möglich sind. Dafür müssen die Funktionen disabledFieldsNeueBaueigenschaft und
      disabledFieldsAugewaehlteBaueigenschaft erweitert werden, dass sie, wenn aktiviertNichtDeaktiviert "false" ist, zunächst diese Felder disablen,
      und, wenn es (nach Prüfung, ob erlaubt) auf "true" gesetzt wird, die entsprechenden Felder in Abhängigkeit vom Wertetyp enabled werden
    - Falls dann Werteeingaben vom Benutzer erfolgen, sollte das System definiertNichtUndefiniert auf "true" setzen (sonst Default "false")
    - "Obligatoriche" Felder sollten dabei sofort vom System aktiviert werden, das Deaktivieren solcher Felder muss verhindert werden
      Weitere ==**TODOs**== hier (siehe Excel-Spreadsheet "BIM.click Aktivierung und Wertebvererbung V4.0"):
      Dort nach Spalte H die Logik für folgende 5 Fälle = Zustandsübergänge implementieren - die Details sind dort alle beschrieben:
    - Aktivieren einer bisher deaktivierten Eigenschaft, mit und ohne Wertedefinition (Zeilen 11 und 12)
    - Deaktivieren einer bisher aktivierten Eigenschaft (Zeilen 5 und 9)
    - Neu-(Definieren)eines bisher undefinierten Wertes (Zeile 4)
    - Undefiniertmachen bzw. Ändern eines definierten Wertes (Zeilen 7 und 8) - dies sollte nur am obersten Knoten im Pfad erlaubt sein, der einen
      definierten Wert hat
    - Obligatorisch (Priorität 2):
      Die Variante, dass obligatorisch auch für Teilbäume gesetzt werden kann (nicht nur am Wurzelknoten) ist flexibler/besser.
      Dann dürfen nur Eigenschaften an Knoten auf obligatorisch gesetzt werden, die auch am Elternknoten aktiviert sind (obligatorisch müssen sie dort nicht
      unbedingt sein).
      Obligatorisch-Machen bewirkt dann, dass die Eigenschaft am betreffenden Knoten und an allen direkten und indirekten Kindknoten auf obligatorisch gesetzt
      wird, dort aktiviert wird, und ggf. Werte an diese vererbt werden!!!
      Beim Abschalten von "obligatorisch" muss geprüft werden, ob der Elternknoten "obligatorisch" gesetzt hat, dann ist es nicht erlaubt, sonst ist nichts
      weiter zu tun, außer das Flag selbst zurückzusetzen am betreffenden Knoten und dessen Kindern und Kindeskindern

16. **[DONE]** (Prio 1) Vererbung überprüfen - Beispiel: Werteänderung wird nicht an Kindknoten vererbt und Übersicht wird nicht updated mit dem neuen Wert.
17. **[DONE]** (Prio 1) Deaktivieren - TBD - sollen bereits definierte Werte gelöscht werden? Werden zur Zeit gelöscht.
18. **[DONE]** (Prio 1) Bei Werteänderungen von Baueigenschaften im Baum muss die Wertekonsistenz (siehe Dokumentation, 1.3.2) überprüft und sichergestellt
    werden. Sobald ab einem bestimmten Knoten in einem Pfad im Baustoff- bzw. Bauvorhabenbaum Werte für eine aktivierte Baueigenschaft definiert werden,
    müssen alle direkten und indirekten Kindknoten dieses Knotens dieselben Werte für diese aktvierte Baueigenschaft aufweisen.
19. **[DONE]** (Prio 1) Bug: Obskurer Fehler in der Table für die Baueigenschaften bei Verwendung des Filters bei 2 Baueigenschaften, bei denen die
    Bauinfomrmationen "null" sind: Error in getter for watcher "pagesNumber": "TypeError: Cannot read property 'bauinformationsBezeichnung' of null"
    Dazu gibt es einen Hinweis auf https://forum.quasar-framework.org/topic/1946/qtable-error-in-console/2 - der sagt,
    dass man eine Property rowsNumber im Pagination Objekt setzen muss. Wir verwenden zwar das Pagination Objekt, aber nicht das Feld rowsNumber darin.
    Siehe auch https://quasar.dev/vue-components/table#Server-side-pagination%2C-filter-and-sorting
    Unter https://quasar.dev/vue-components/table#Pagination wird allerdings gesagt, dass das Feld rowsNumber im Pagination Objekt Server Side Pagnination
    impliziert - diesee verwenden wir nicht für die q-table!
    Der Fehler wird deshalb wahrscheinlich nicht durch das fehlende Setzen von rowsNumber verursacht, sondern weil der Default Filter-Code von Quasar nicht
    mit nested, d.h. nicht "flachen" Objekten umgehen kann, speziell im Fall des nested Objekts für die bauinformation
    Dafür spricht, dass die rechts unten von Quasar als "von x" angezeigte Anzahl x der Zeilen der Tabelle grundsätzlich funktioniert, Quasar auch bei
    Eintippen eines Strings in den Filter (ohne vorhandene Bauinformationen mit "null") die gefilterte Anzahl von Zeilen korrekt angezeigt, und der obskure
    Fehler also nur auftritt, wenn man etwas in den Filter tippt, falls Bauinformationen mit "null" vorhanden sind.
    Dann kommmt obige Fehlermeldung plus die Meldung "cannot read property
    'bauinformationsBezeichnung of null', d.h. vermutlich Zugriff auf bauinformation: null statt bauinformation: {}
    Lösungsalternativen:

    - Man könnte mit Hilfe der Prop Filter im QTable API eine Custom Filter Methode programmieren, die auch nested Felder durchsucht.
      Siehe https://quasar.dev/vue-components/table#QTable-API - die Custom Filter Methode hat ein komplexes API (rows, terms, cols, getCellValue) => Array).
    - Vermutlich ist deshalb die bessere Lösung, den Array für
      die Q-Table "flach" zu machen, d.h. die nested Felder für die Bauinformation direkt in den Array aufzunehmen und ggf. auf null zu setzen,
      in den Methoden, die die Daten vom Server holen!!!
    - **[DONE]** Die zweite Variante wurde von Stefan implementiert, allerdings noch potentielle Rest- oder Folgefehler, siehe #21. und #22.

20. **[DONE]** (Prio 1) Bug in Table für Baueigenschaften - bei wiederholter Auswahl von Zeilen stellte sich heraus, dass diese identische IDs haben, was
    dazu führt, dass Quasar diese mehrfach selektiert. Ursache ist, dass nach dem Flachmachen das \_id Feld die ID der der Baueigenschaft zugeordneten
    Bauinformatoin enthält.
    Fix: Beide Ids mit unterschiedlichem Namen in die flache Baueigenschaft aufnehmen. Behoben durch Anpassung der Objekte vom Backend
21. **[DONE]** (Prio 1) Bei Vorhandensein von Baueigenschaften mit Feld bauinformation: null (siehe Testdaten in server.js) kommt beim Zugriff auf den
    Baustoffbaum
    (Mausklick auf Knoten) ab und zu Fehler: TypeError: Cannot read property 'getImmediateChildren' of null. Vorläufig behoben durch Einsatz von geeigneter
    Backend-Methode zum Reloaden des Baums-->
22. **[DONE]** Bei Vorhandensein von Baueigenschaften mit Feld bauinformation: null (siehe Testdaten in server.js) kommt bei Aufruf von
    localhost:8080/api/baustoffe/exportMaterialEigenschaftenByBaustoffBezeichnung/Baustoffe die Fehlermeldung
    TypeError: Cannot read property 'bauinformationsTyp' of null
    Dieses Feld wurde in der Controller-Methode für dieses API im Populatre und in einer Map explizit referenziert!
    Der Populate kann damit umgehen, die Map nicht => Dort als Fix speziellen Code für die Null-Fälle eingebaut
23. **[DONE]** Buttons am Baustoffbaum nach oben moven, separaten Scrollbar für den Baum einfügen
24. **[DONE]** (Prio 2) Bei Neuanlage von Baueigenschaften mit Datumswert gibt es einen Fehler bei der Werteeingabe
25. **[DONE]** (Prio 2) Date Handling überarbeiten, dabei Backend untouched (verwendet Mongoose UTC-Dates), am Frontend Quasar Date Utils verwendet, mit
    diesen Date-Format-Umformatierungen an diversen Stellen beim Laden
    von ausgewaehlteBaueigenschaft.datumsWert1/2 sowie neueBaueigenschaft.datumsWert1/2 aus dem aus Mongoose kokmmenden UTC-Format in das von q-input mit
    type="date"
    verwendete einfache String-Format "YYYY-MM-DD" (ohne Time-Anhängsel!!!). Insbesondere ist dies auch notwendig nach dem Neu-Laden dieser Felder nach
    einem Update aus der Datenbank!
    Dies erfolgt in for-Schleife am Ende von updateAusgewaehlteBaueigenschaft
    Es stellte sich also heraus, dass Quasar für q-input-Felder mit type="date" einfache String-Werte im Format "YYYY-MM-DD" erwartet - diese im Code von
    Baustoffe.vue in
    ausgewaehlterBaueigenschaft.datumsWert1/2 bzw. neueBaueigenschaft.datumsWert1/2 aus den UTC-Werten von Mongoose mittels Quasar Date Util erzeugt beim
    ersten Laden und beim Neu-Laden nach
    Update aus der Datenbank. Im originalen Array mit diesen Werten für die QTable der Baueigenschaften bleiben diese Datumswerte also nach wie vor im
    Mongoose UTC-Format und werden mit einer
    Funktion formatDate unter Nutzung von Quasar Date Utils in das Anzeigeformat in der QTable "DD.MM.YYYY" umformatiert!
    Vor dem Speichern ist keine Rückverwandlung notwendig!, da Mongoose Strings im Format "YYYY-MM-DD" akzeptiert und in UTC umwandelt!!
26. **[DONE]** (Prio 3) Neuen Wertetyp "Tageszeitwert" bzw. "Tageszeitwertetepaar" eingeführt. Auf Mongoose String abgebildet, da sich Quasar Date dafür als
    zu sperrig herausstellte.
27. **[DONE]** (Prio 1) Die Bezeichnung einer Baueigenschaft muss im gesamten System unique sein:

    - **[DONE]** Dies wird im Frontend und im Backend nun bereits abgeprüft! Früher gab es dabei einen Hang im Frontend.
    - **[DONE]** In der neuen Collection für die Baueigenschaften sollte das Bezeichnungsfeld in Mongoose noch auf "unique" gesetzt werden

28. **[DONE]** (Prio 1) Im Baustoffbaum sollten die Bezeichnungen für Baustoffe nicht unique sein müssen, bzw. nur unter ihrem Elternknoten. Beim Import der
    Stammdaten aus dem
    Word-Dokument für den neuen Baustoffbaum sind die Bezeichnungen bereits nicht unique. Das dort mit importierte Feld gliederungsNummer ist unique,
    müsste aber von BIM.click
    beim Einfügen und Löschen mit verwaltet werden. Es ist vermutlich besser, sich auf die unique Mongoose \_ids zu verlassen, und alle Mongoose finds auf
    by \_id statt by Name umustellen.
    Diese Umstellung bereits gemacht, zusätzlich beim Neuanlegen eines Kinknotens Prüfung gegen Geschwisterbezeichnungen eingebaut.
    Mongoose unique ist in diesem Fall nicht sinnvoll.
29. **[DONE]** (Prio 2) Bei Neuanlage von Baueigenschaften mit leerer Bauinformation wirft der baustoffe.controller am Backend Fehler (cannot read property
    \_id of undefined o.ä.)

    - **[DONE]** Dies wird nun als Validation Error erkannt und als Error 500 ans Frontend gegeben. Dort allerdings noch keine saubere Benutzernachricht dafür ausgegeben
    - **[DONE]** Per neuem Test ist das gefixed, es kann eine Baueigenschaft angelegt werden mit leerer Bauinformation!!!

30. **[DONE]** (Prio 2) Bei Ändern von typbezogenen Werten in Baueigenschaften erfolgt kein Refresh für bereits geladene Knoten weiter oben im Baum!
    Im betroffenen Knoten und dessen Kindknoten werden die typbezogenen Felder korrekt aktualisiert, NICHT jedoch in den Elternknoten - offenbar wird
    dieser Teil des Baums in baustoffe.vue aktuell nicht refreshed!
    Außerdem speichert der Hotfix in baustoffe.controller IMMMER die typbezogenen Felder (per Save für typbezogeneBaueigenschaft der geänderten
    Baueigenschft im ausgewählten Baustoff), egal,
    ob diese geändert wurden oder nicht. Die Feststellung der Änderung könnte im Frontend oder im Backend (dort wird sowieso der bisherige Zustand der
    typbezogenen Felder gelesen) erfolgen.
    UPDATE: FIXED, durch advancedReload, aber es fehlen noch Meldungen, und Folgefehler #46.
31. **[DONE]** (Prio 2) Flattening wurde wieder abgestellt - Umstellung hat Problem beseitigtIn baustoffe.controller.js haben Sender- und Receiver-Objekte
    im Log unterschiedliches Format bzgl. Bauinformation und typbezogeneBaueigenschaft
    (Flattening Issue - eventuell in der betreffenden Funktion selbst unschädlich, aber zumindest unschön)
32. **[DONE]** (DEFECT 31, Prio 1) In baustoffe.controller.js - bei Neuanlage eines Baustoffs wird die Aktierbarkeit nicht korrekt gesetzt - es werden
    die falschen (im Elternknoten deaktivierten) Baueigenschaften auf nicht aktivierbar gesetzt
    Dies liegt daran, dass die ids für die Baueigenschaft in den Arrays im Elternknoten und im neu erzeugten Kindknoten unterschiedlich sind
    Gefixed als Defect 31 in baustoffe.controller.js
33. **[DONE]** (Prio 1) Früheres "obligatorisch" an Baueigenschaften entfernen bzw. durch obligatorisch als "Löschen verboten" für Baueigenschaften,
    Baustoffe, etc. einführen
34. **[DONE]** (Prio 2) Baueigenschaftsbeschreibung einführen (Markdown) analog zu baustoffBeschreibung
35. **[DONE]** (Prio 2) "Im Pfad aktiviert" implementieren, ist in Baustoffe/Auswahl schon als Radio Button vorbereitet, in Baustoffe/Neu noch nicht
36. **[DONE]** (Prio 2) Kommentar von Stefan in baustoffe.vue und in baustoffe-baueigenschaft-bearbeitung.vue:
    resetWertbezogeneAngabenAusgewaehlteBaueigenschaft richtig implementieren, wird aktuell nicht
    aufgerufen, weil die Komponente AufzaehlungsWerteAuswahl das Event nicht feuert
37. **[DONE]** (Prio 2) In Bauinformationene kann bei "Bearbeiten" die Bezeichnung geändert werden - wird dort noch nicht auf Uniqeness geprüft!!!

    - Prüfung eingebaut im Frontend(submitAusgewahlteBauinformationAusQForm), dass bei Eingabe einer ggf. geänderten Bezeichnung diese noch nicht vergeben ist

38. **[DONE]** (Prio 2) Kindkomponenten-Design überprüfen:

    - Aktuell sind alle Props auf 2-Way-Props umgestellt
    - Zum Teil üÜerflüssige Events und Watchs
    - Achtung: Watch ausgewaehlteBaueigenschaftAmElternknoten in baustoffe-baueigenschaft-bearbeitung überprüfen
      -- Siehe Kommentare dort
      -- Am Wurzelknoten kommen dadurch nicht die praktischen Meldungen, ob Werteeingabe möglich ist oder nicht, wie an den anderen Knoten weiter unten im
      Baum, weil der Watch nur für
      Knoten mit Elternknoten aufgerufen wird!
      Kindkomponenten wurden zurückgebaut

39. **[DONE]** (Prio 2) Tab "Neu" überarbeiten in Baustoffe, angleichen an Tab "Übersicht"
40. **[DONE]** (Prio 2) Folgendes Problem tritt aufgrund einer kompletten Überarbeitung der Kindkomponente nicht mehr auf:
    In der Komponente Baustoffe wird für die Kindkomponente BaueigenschaftBearbeitung eine Prop
    ausgewaehlteBaueigenschaftAmElternKnoten="ausgewaehlteBaueigenschaftInParent" übergeben, diese ist aber undefiniert, deshalb
    Warnung "Property or method "ausgewaehlteBaueigenschaftInParent" is not defined on the instance but referenced during render."
    Diese nun definiert in baustoffe.vue und umbenannt in setzeAusgewaehlteBaueigenschaftAmElternKnoten
41. **[DONE]** (Prio 1) Nach Änderung von Wertefeldern, Sprung nach Übersicht, Rücksprung nach Auswahl: Alte Werte werden angezeigt, weil
    selectedRowsTableBaueigenschaften nicht updated wird!!!
42. ==**[DEFER]**== (Prio 3) Ändern des Wertetyps im Tab "Auswahl" - bisher nicht implementiert
43. **[DONE]** (Prio 3) Der Button "Löschen" im Tab "Neu" kann bleiben, soll aber solange noch keine neue Baueigenschaft gespeichert wurde, disabled werden!
44. ==**[DEFER]**== (Prio 3) Im Tab "Übersicht" unter der Tabelle für die Baueigenschaften neuen Button "Bauinformation öffnen" für
    ausgewählte Baueigenschaft einführen - diesen später auch im Tab "Auswahl" und "Neu" anbieten.
    Dieser sollte die zugehörige Bauinformation öffnen, d.h. das Tab "Auswahl" im Tab "Bauinformationen".
    Dazu muss die Komponente Bauinformationen eine Prop mit der id bekommen, analog zur Komponente "Dokumentation". Dabei
    könnte ein Watch in der Komponente Bauinformationen auf eine Route-Änderung hin zu Bauinformationen reagieren, und
    die selektierte Bauinformation auf den Wert, der aus der Prop kommt, setzen, und dann das Tab "Auswahl" aufrufen.
    Analog könnte die Anzeige von Details zu Rohstoffen in Baustoffen ablaufen
45. **[DONE]** (Prio 3) Kontextmenüs in den QTables für Baueigenschaften in Baustoffen und Bauvorhaben- testweise zunächst eines eingebaut für die Boolean-Spalten -
    am 26.05.2020 zentrales Kontextmenü für alle Spalten
46. **[DONE]** (Prio 3) Referenzen auf zugeordnete Rohstoffe in Baustoffen verwalten
    Ist implementiert in neuem Tab unter "Baustoffe". Noch offene Details:
47. **[DONE]** (DEFECT: FIXED) Wenn im Baustoffbaum der ausgewählte Baustoff geändert wird, verheddert sich der QTree für die Rohstoffe
48. **[DONE]** (DEFECT: FIXED) Im Log erscheinen manchmal TypeError: Cannot read property 'isTicked' of undefined - auf isTicked wird im Body Slot des QTrees für die
    Rohstoffe zugegriffen. Trotz Verbesserungen (Boolean-Parameter show an loadTreeBaustoffe) kommt diese Warnung noch manchmal, insbesondere beim
    Wechseln zwischen Rohstoffen und Baustoffen im Baustoffbaum - dies kann am Disablen des Tab Contents von "Zugeordnete Rohstoffe"
    per v-if und computed Prop selectedKeyTreeBaustoffeIstImRohstoffunterbaum liegen für Rohstoffe
    Manchmal kommt auch Warnung "Error in nextTick: "TypeError: Cannot read property 'expandAll' of undefined" - gefixed mittels Abfrage
    if (!selectedKeyTreeRohstoffeIstInRohstoffunterbaum) {} vor loadTreeRohstoffe(true) in initialisiereAusgewaehltesTabBaustoffe()
49. **[DONE]** Anzeige und Bearbeitung der 3 erweiterten Felder anteil/einheit/symbolVonRohstoffInBaustoff => Mit Popup Edit auf RSB?
50. **[DONE]** Die Aufnahme dieser Felder in den Rohstoffbaum und das Laden aus dem Backend ist bereits implementiert in loadTreeRohstoffe
51. **[DONE]** Das Anzeigen im Rohstofftree per Template funktioniert schon, aber das Ändern/Zurückspeichern dieser Felder fehlt noch - siehe Hinweise in
    updateZugeordneteRohstoffeAusgewaehlterBaustoff()
52. **[DONE]** Auch resetZugeordneteRohstoffeAusgewaehlterBaustoff muss auf Support für diese 3 Felder überprüft werden!!!
53. **[DONE]** Die Buttons im q-popup-edit funktionieren noch nicht richtig - sie sind offenbar für einzelne q-input-Felder
    gedacht, im vorliegenden Fall sind es aber 3 q-input-Felder. Die q-popup-edit spezifischen Buttons
    müssen eventuell durch normale Cancel/Save-Buttons ersetzt werden oder durch einen
    einzigen "Schließen"-Button, mit implizitem Save, da das v-model der q-inputs ja bei Benutzereingabe geändert wurde.
    ACHTUNG: Eventuell muss auch wie beim übergeordneten Speichern \$nextTick ausgelöst werden!!!
    Gelöst mit Alternative 4 in Kommentaren zu q-popup-edit am Rohstoffbaum
54. **[DONE]** Filter auf TreeRohstoffe
    Hier noch einige **TODOs** für die zugeordneten Rohstoffe mit Prio 3:
55. ==**[DEFER]**== (Prio 3) Die Buttons unten am q-popup-edit sind leider mit Großbuchstaben, da no-caps dort nicht angeboten wird - siehe dazu Alternative 5 in den
    Kommentaren für das q-popup-edit (Custom Buttons statt den q-popup-edit Buttons). Dies Alternative 5 ist aber sehr komplex und bisher nicht
    erfolgreich zum Laufen zu bekommen
56. **[DONE]** (Prio 3) expandedKeysTreeRohstoffe wird, wie man im Debug Output sehen kann, durch die expandAll-Aufrufe verändert - allerdings fügt Quasar
    wie man durch Tests sieht, einfach immer wieder die selben ids per Push dem Array hinzu, was zu Duplikaten im Array führt - dies hat zunächst aber keinen
    sichtbaren negativen Effekt, daher bisher ignoriert. Unklar, ob Fehler in BIM.click oder Quasar. Mittlerweile nicht mehr zu beobachten, da
    expandAll umgestellt wurde auf das Expandieren nur der ticked Nodes - closed.
57. **[DONE]** (Prio 3) Man könnte statt expandAll für den Rohstoffbaum auch nur die ticked Nodes expandieren: Dazu Funktion expandTickedNodesTreeRohstoffe()
    definiert. Allerdings funktioniert mit dieser - warum auch immer - das Refreshen der geänderten erweiterten Felder nicht mehr, deshalb disabled
    Außerdem werden dabei bereits früher expandierte Felder dennoch wieder expandiert! Dies ist mittleweile gefixed.
58. ==**[TODO]**== (Prio 3) Beim Unticken von Nodes und späteren Reticken (ohne Speichern dazwischen) werden die 3 erweiterten Felder nicht resetted - dies müsste aber
    komplex gelöst werden über QTree API-Event @update:ticked, dieser hat Parameter target mit dem ticked Node, damit könnten die 3 Felder in dem betreffenden Node
    in nodesTreeRohstoffe auf null gesetzt werden (per rekursivem Traversieren und Aufspüren des unticked Nodes wie in
    updateZugeordneteRohstoffeAusgewaehlterBaustoff). Dieses ==**[TODO]**== ist aber nicht dringend - eventuell wird fehlender Reset sogar gewünscht
59. **[DONE]** (Prio 2) Bei Löschen von Rohstoffen werden die Verweise darauf in zugeordneteRohstoffe NICHT gelöscht!!!
    Sie werden bei der Ermittlung von tickedKeysTreeRohstoffe aber ignoriert, so dass es auf den ersten Blick dadurch keine unmittelbaren
    Fehler gibt. Eine genauere Analyse zeigt, dass das beim Löschen von Bauinformationen auch nicht anders ist:
    Die Referenzen in Baustoffen in zugeordneteBauinformationen auf eine Bauinformation sind nach dem Löchen der Bauinformation noch da, was in
    Compass leicht überprüft werden kann. Diese Referenzen in zugeordnete Bauinformationen werden allerdings von
    Mongoose einfach nicht mehr populiert, wenn der Baustoff neu aus der DB gelesen wird, was am UI dann so aussieht, als seien sie gelöscht!!!
    Ist selbst so, wenn kompletter Refresh von Baustoffe aus der Datenbank gemacht wird!!!
    Siehe auch:

    - https://stackoverflow.com/questions/32674280/removing-one-one-and-one-many-references-mongoose
    - https://stackoverflow.com/questions/46911393/mongoose-remove-document-with-references
    - https://stackoverflow.com/questions/14348516/cascade-style-delete-in-mongoose
    - https://stackoverflow.com/questions/36167286/how-to-properly-delete-an-orphaned-reference-in-mongodb
    - Pre Hook for deleteOne and deleteMany: https://stackoverflow.com/questions/11904159/automatically-remove-referencing-objects-on-deletion-in-mongodb
    - Bei Arrays mit Referenzen muss dabei \$pull verwendet werden!!! Siehe Beispiele im ersten SO Link oben, sowie in https://stackoverflow.com/questions/55576222/mongoose-pre-hook-pull-id-from-array-on-remove
    - Code:
      profileSchema.pre('remove', async function() {
      console.log("clearing user ID from skills model");
      await Skills.update({}, { $pull: { associatedUsers: { \$in: this.\_id } } }, { multi: true });
      });
    - Package: https://www.npmjs.com/package/cascading-relations

    **[DONE]** In bauinformationen.model.js per .pre Middleware für findAndDelete gelöst, in baustoffemodel.js vorläufig direkt in der
    delete Methode, später ebenfalls mit .pre Middleware für deleteMany gelöst

60. **[REJECT]** (Prio 3) Ursprünglich: Benötigen dynamische Statusmeldungen zur Anzeige der durch Aktivierung im Pfad implizit
    aktivierten Baueigenschaften. Zurückgestellt, da UI - Überfrachtung möglich.
61. ==**[REJECT]**== (Prio 2) Im Backend muss das Attribut gesetztNichtGeerbt noch in den Datenbank-Updates berücksichtigt werden
62. **[DONE]** Im Backend muss die Error-Behandlung noch weiter ergänzt werden, Genau Fehlerangabe noch mit ausgeben anstatt AXIOS-ERROR
63. **[DONE]** Beim Anlegen einer neuen Baueigenschaft im Wurzelknoten ist die Aktivierung falsch - ist auf deaktiviert statt aktiviert
64. **[DONE]** Baueigenschaften werden wegen besserem Debugging by Bezeichnung updated, muss durch by id ersetzt werden
    Hier sind Methoden inklusive Parametern in baueigenschaften.controller und baustoffe.controller beteiligt, muss von Stefan geändert werden!
65. **[DONE]** Wenn eine Baueigenschaft mit leerer Bezeichnung neu angelegt wird, läuft dies ohne Fehlermeldung durch.
    Am Backend bekommt createBaueigenschaft zwar per Server Log einen Mongoose Validation Error 500, liefert aber per Browser Log
    dennoch selbst Status 200 zurück!
    Siehe dazu auch createBauinformation in bauinformationen.controller - dort führt per Test derselbe Mongoose Validation Error bei leerer
    bauinformationsBezeichnung auf einen Error 500 in der API Response von createBauinformation,
    der betreffende .catch-Zweig mit status(500) dort ist "Error bei create per save für Bauinformation"
    In legeNeuAnBaueigenschaft werden dagegen mehrere .thens gechained, und erst am Ende gibt es einen .catch mit status(500)!
    Laut Server Log wird dieser zwar ausgelöst, aber die rufende Methode createBaueigenschaft gibt im nächsten .then trotzdem Success
    dennoch Status 200 zurück!!! Lösung: Fehler war eine falsch gesetzte Klammer, die das Chaining zerstörte!
66. **[DONE]** Zusätzlich zeigt im q-input Feld für die Bezeichnung eine Rule an, dass die Bezeichnung erforderlich ist
67. **[DONE]** (Prio 1) Typbezogene Felder in Baueigenschaft können aktuell NICHT geändert werden. Speichern läuft zwar mit Status 200 durch, aber in Tab
    "Auswahl" und "Übersicht" werden die alten Werte angezeigt, und die Änderungen wurden offenbar nicht persistiert!!! Gilt für Bemerkung und
    Bauinformation!
    Die Baustoffe-Controller Methode updateBaueigenschaftBaustoff aktiviert bzw. deaktiviert in diesem Fall die Baueigenschaft, das kann
    nicht stimmen!!! Am Frontend bleibt die Eigenschaft dabei allerdings im bisherigen Aktivierungszustand.
    Wozu ist die andere Controller-Methode updateBaueigenschaft, diese gehört eigentlich in den Baueigenschaften-Controller und
    und updated die typbezogenen Felder, aber sie wird aktuell wohl nirgends aufgerufen!?!
68. **[DONE]** updateBaueigenschaft umbenannt in updateTypbezogeneFelderBaueigenschaft und aufgerufen in updateBaueigenschaftBaustoff (dieser Auruf fehlte)
69. **[DONE]** (Prio 1) Watch in baustoffe-baueigenschaft-bearbeitung - ruft handleAktivierung - dadurch wurde zeitweise auch Aktivierung ausgelöst,
    selbst wenn die aktuellen Radio Buttons für Aktivierung/Deaktivierung im Tab Auswahl vom Benutzer nicht geändert wurden.
    Daher handleAktivierung dort zeitweise disabled. Aktuell ist handleAktivierung im watch wieder enabled - aus welchem Grund auch immer
    wird dieser watch nicht mehr so häufig ausgelöst.
    HINWEIS: Die Aufrufe von handleAktivierung per @input an den Radio Buttons in baustoffe-baueigenschaft-bearbeitung sind aktuell enabled!
    Die dadurch getriggerten Benutzernachrichten funktionieren.
70. **[DONE]** (Prio 1) Es kommen teilweise "doppelte" Benutzernachrichten, unklar, ob das ein Folgefehler von #68. ist oder ein unabhängiges Problem!
    Diese kommen immer noch, z.B. nachdem man eine Baueigenschaft aktiviert hat, die vom Elternbaustoff Werte erbt, kommt nach dem Speichern
    nochmals die Meldung, dass keine Werteeingabe möglich ist. Diese wurde (Browser Log: "Prop changed") von dem handleAktivierung im Watch
    ausgelöst. Entweder diesen watch entfernen, oder handleAktivierung dort disablen! Fixed im Rahmen von #73.
71. **[DONE]** (Prio 1) Wenn der ausgewählte Baustoff im Baustoffbaum geändert wird, die ausgewählte Baueigenschaft in der Übersicht (QTable) aber
    beibehalten wird (was offenbar der Default ist), zeigt die Anzeige der ausgewählten Baueigenschaft unter Umständen die falschen Werte
    an, nämlich die der Baueigenschaft am vorher ausgewählten Baustoff.
    Offenbar bekommt die Kindkomponente dabei nicht mit, dass sich die ausgewählte Baueigenschaft eigentlich geändert hat.
    Im Browser Log wird dabei auch NICHT der Watch für die Prop ausgewaehlteBaueigenschaft ausgelöst!!!
    Hier der Recreation Testcase für diesen Fehler:
    Browser refreshen - der Fehler passiert unter Umständen sonst nicht!!!

    1. Im Baustoffbaum "Baustoffe" auswählen
    2. Im Tab "Übersicht" eine aktivierte Baueigenschaft, z.B. "Geokoordinaten", auswählen
    3. Tab "Auswahl: Details" anwählen
    4. Im Baustoffbaum "Mauwerwerk, einschließlich Mörtelfugen"
       auswählen. "Geokoordinaten" bleibt dabei ausgewählt im Tab "Übersicht"
    5. Button "Eigenschaft bearbeiten"aus dem Tab "Übersicht" drücken um in das Tab "Auswahl: Details" zu wechseln.
       FEHLER: Die Eigenschaft wird als "aktiviert" angezeigt, obwohl sie deaktiviert ist. Es werden dabei generell auch alle Werte
       der ausgewählten Baueigenschaft aus 3. angezeigt, d.h. die Kindkomponente hat nicht mitbekommen, dass es sich um eine andere
       ausgewählte Baueigenschaft handelt.
       Derselbe Fehler kann "umgekehrt" erzeugt werden, wenn man zunächst die Details der Baueigenschaft in einem Kindknoten anzeigt,
       dann im Baustoffbaum zum Elternknoten wechselt, und dann dort zum Tab "Auswahl: Details" wechselt -
       dann werden am Elternknoten die Werte der Baueigenschaft am Kindknoten angezeigt!!!

72. **[DONE]** (Prio 2) Wenn trotz definierter Werte im Elternknoten Werte am Kindknoten geändert werden, ist dies im Frontend zunächst möglich, beim
    Speichern kommt Success, aber offenbar wurden die Änderungen dabei am Backend einfach verworfen. Es sollten da Benutzermeldungen kommen.
    Repro dieses Fehlers ist aktuell nicht mehr möglich!
73. **[DONE]** (Prio 2) Im Backend Server Log kommen deprecated Warnungen: express deprecated res.send(status): Use res.sendStatus(status) instead
    app\controllers\baustoffe.controller.js:631:15
    Stattdessen verwenden: res.status(200).send - Fixed
74. **[DONE]** (Prio 1) Rückbau der Komponente baustoffe-baueigenschaft-bearbeitung nach baustoffe, Props entfernen, Watch entfernen, Events dafür entfernen
    Löst eventuell auch gleich #68 und #69
75. **[DONE]** Bug: Nullsetzen der einer Baueigenschaft zugeordneten Bauinformation funktioniert nicht (Stefan) - ist noch nicht gefixed. Bei Michael
    kann auch keine Baueigenschaft nach Auswahl im QSelect gespeichert werden! Eventuelle Ursache: arg durch ausgewaehlteBaueigenschaft ersetzt in
    updateAusgewaehlteBaueigenschaft. Gefixed beim Rückbau der Komponente für die Auswahl der Bauinformation für eine Baueigenschaft.
76. **[DONE]** Bereiningen von Baueigenschaft Neuanlage (Stefan)
77. **[DONE]** File Upload/Download: Generell die Files in der MongoDB speichern für ephemeral File System auf Heroku.
    Upload nach tmp/upload und in die DB, Download aus DB nach tmp/download, dieses Directory wird durch Express statisch geserved in
    back-end-file-server.js
78. **[DONE]** File Upload/Download: Filenamen sollten slugififed werden, sonst Probleme beim Zugriff per URL im Ordner tmp/download
    Siehe Kommentare zum Stichwort "slugify" in dateien.controller.js
79. **[DONE]** File Upload/Download: Auch Upload von Dateien für Markdown Links (Beschreibungen) anpassen auf Speicherung in Datenbank
    Design: Diese Hochladen in ein Directory tmp/upload, Speichern in Datenbank
80. **[DONE]** (Prio 2) Beim Server Start diese Dateien für Markdown Links aus Datenbank laden in Directory tmp/download/img, Links im Markdown zeigen
    dorthin (bereits getestet).
    Done: Zusätzlich müssen diese nach dem Upload mit QUploader und Backend Route /Dateien/upload entsprechend getagged werden in der Datenbank.
    Dazu neue Methode in dateien.controller.js, z.B. Dateien/tag/:id, und Parameter body.tag, mit der diese nach dem Upload als "Markdown Image Link" getagged
    werden können zum Einfachen späteren Finden bei obigem Backend Server Start. Das entsprechende Feld dateiTag ist bereits im DateienModel vorhanden.
    Die id der hochgeladenen per DateienModel gespeicherten Datei kommt nach diesem Upload vom Backend zurück im xhr-Header.
    Dieses Tagging eingebaut in die upload-Methode in dateien.controller.js. Zusätzlich Code eingebaut in back-end-server.js (Step 9), der diese
    Dateien beim Server (Re)Start aus der Datenbank liest und sie in das Download Director \app\tmp\download\img schreibt, aus dem sie im Markdown
    angezeigt werden, bzw. auch direkt per URL, z.B. per https://bimclickserver.herokuapp.com/img/parkplatz_2020-12-21_11-38-17-434.gif
    HINWEIS: Markdown für fachliche Hilfe kommt aus Feld für die Beschreibung in der DB, nicht aus dynamisch erzeugten Files - also dafür nichts zu ändern.
    Die Markdown Files für die Bedienungshilfe sind statisch vorhanden, als dafür ebenfalls nichts zu ändern.
    - **Update 18.02.2022**:
      - Dieses Thema musste nochmal revisited werden:
      - Am Server waren diese Dateien vor der Lösung in #390 auch ohne Anmeldung zugänglich
      - Nach der Lösung (app.use für statische Files verschieben in back-end-sever.js) sind sie protected (Zugriff erfordert Anmeldung,
        sonst kommt "Unauthorized"!
81. **[DONE]** Import/Export auf Heroku testen - baustoffe.controller.js: Greift auf Datei im BIMclick Frontend zu, Zeile 481 - baueigenschaften.controller.
    js: Greift auf Datei im BIMclick Frontend zu, Zeile 456 - daten-austausch.vue verwendet localhost:4200 hard coded an 2 Stellen
82. **[DONE]** (Prio 2) Benutzerauthorisierung/-verwaltung - Frontend Routes mit Navigation Guards sichern (diese prüfen, ob der aktuelle Benutzer angemeldet ist)
    Siehe https://css-tricks.com/protecting-vue-routes-with-navigation-guards/
    Siehe https://itnext.io/yes-this-is-how-vue-router-guards-work-when-to-use-them-ed7e34946211?gi=3af0512840dd - Die aktuellen Benutzerdaten des
    angemeldeten Benutzers werden dabei im global Store gespeichert, damit er aus myLayout.vue und allen
    Komponenten zugreifbar ist - Dafür neue Methoden anmeldungBenutzer und abmeldungBenutzer im global Store eingeführt - diese mutaten ein neues globales
    Objekt anmeldeDatenBenutzer, welches ein Boolean-Feld istAbgemeldetBenutzer und nach Anmeldung die eMail-Adressse des angemeldeten Benutzers
    und dessen JWT-Token enthält (letzterer wird zusätzlich in localStorage gespeichert!) - Diese werden aufgerufen von den jeweiligen Methoden, die rechts
    oben in myLayout.vue die Anmeldung/Abmeldung erledigen - Dann testweise in myLayout.vue das q-route-tab für "Bauvorhaben" disabled, wenn localStore.
    anmeldeDatenBenutzer.istAbgemeldetBenutzer true ist! - Funktioniert!
83. **[DONE]** CORS Calls in bim-click-back-end-sever und bim-click-back-end-file-server vereinheitlichen (diese zusammengelegt)
84. **[DONE]** Im Tab "Neue Baueigenschaft anlegen" kommt Fehler im Browser Log:
    Error in callback for watcher "neueBaueigenschaft": "TypeError: Cannot read property 'werteTyp' of undefined"
85. **[DONE]** Operationen auf Baueigenschaften schlagen fehl (Löschen Baueigenschaft, Update Beschreibung, Reset Beschreibung)
    Grund: typbezogeneBaueigenschaftId verwendet, muss nach Entfernen Flattening ersetzt werden durch typbezogeneBaueigenschaft.\_id
86. ==**[TODO]**== (Prio 2) Aktivierung und Definiert/Undefiniert bei Import von Baueigenschaften überarbeiten - die Eigenschaften werden aktuell alle (am Wurzelknoten)
    aktiviert, egal ob Werte mitkommen. Testdaten um undefinierte Eigenschaften erweitern.
87. **[DONE]** MongoDB/Mongoose Timeouts bei Import von Baueigenschaften - NUR lokal, nicht auf Heroku/Atlas. Gefixed durch Timeout-Erhöung in Mongoose Connect in
    back-end-server.js. Gleichzeitig "localhost" durch "127.0.0.1" ersetzt in mongodb.config.js für bim-click-back-end (dadurch kein wesentlicher Zeitgewinn)
88. **[DONE]** Im Tab "Neu" für Baueigenschaften werden, wenn man den Wertetyp vom Default "Kennwert" auf einen anderen Wertetyp ändert, die dafür gültigen
    anderen Wertefelder NICHT enabled,, sondern es bleiben die für "Kennwert" enabled. Muss entweder in den watch für neueBaueigenschaft aufgenommen werden oder in
    aktualisiereDefiniertNichtUndefiniert()
89. **[DONE]** Wertetyp wird in QTable für Baueigenschaften nicht korrekt angezeigt. Dito andere typbezogene Felder (baueigenschaftsbemerkung, symbol,
    einheit, operator, Schutzkategorien)! Ist durch Nesting statt Flattening verursacht, muss jeweils in wertetypabhängige v-slots eingebaut werden
    (Fallunterscheidung) - dabei müssen Kontextemenüs erhalten bleiben!
90. **[DONE]** (Prio 3) Nach dem Löschen von Baustoffen und Baueinheiten ggf. Baumknotentyp des Elternknotens anpassen:
    Verzweigungsknoten wird Blattknoten, wenn letzter Kindknoten gelöscht wurde

    - **[DONE]** Änderung in Controller Methoden deleteKnotenUndKindKnotenBaustoff(). Verzweigungsknoten wird Blattknoten, wenn letzter Kindknoten darunter gelöscht wird.
    - **[DONE]** Im Frontend (aktualisiereTreeBaustoffe() bzw. aktualisiereTreeBaueinheiten()) wid das Icon nicht aktualisiert (erst nach Browser Refresh)

91. (Prio 3) Die watches auf selectedKeyTreeBaustoff und selectedKeyTreeBaueinheiten rufen loadTreeRohstoffe() bzw. loadTreeBaustoffe() sowie  
    loadAngabenBauvorhaben() auf. Diese werden auch bei Anwahl der enstsprechenden Tabs "Zugeordnete Rohstoffe" bzw. "zugeordnete Baustoffe" bzw. "Angaben zum
    Bauvorhaben" aufgerufen, daher wird der Code doppelt ausgeführt! Dies hat keinen Einfluss auf die Funktion, ist aber eventuell schädlich für die Performance!
    **[DONE]** Gefixed für loadAngabenBauvorhaben() - dies wird nur noch bei Auswahl des Knotens im Bauvorhabenbaum ausgeführt.
    ==**[DEFER]**== Für die anderen beiden Fälle: Es werden dort beide Aufrufe gebraucht, insbesondere wenn man bei angewähltem Tab "Zugeordnete Baustoffe/
    Baueinheiten" einen anderen
    Knoten im Baum auswählt! Gleichzeitig ist es möglich, dass ein neuer Knoten im Baum ausgewählt wird, aber das betreffende Tab noch gar nicht
    angewählt wurde - komplex - müsste durch Refactoring der Funktionen in 2 separate Funktionen gelöst werden. Gleichzeitig gibt es Probleme,
    wenn die Funktionen mit show === false aufgerufen werden, aktuell muss immer show === true gewählt werden (durch Tests bestätigt!)
92. ==**[REJECT]**== Finalisierung der Frontend und Backend Operationen auf "Angaben zum ausgewählten Bauvorhaben" (vorläufiges
    prototypisches Profilformular, das in baueinheiten.vue integriert ist).
    Darunterliegende Baueigenschaften müssen obligatorisch sein im neuen Sinn (nicht löschbar bzw. nur durch Administrator).
    Sie sollten am Wurzelknoten des BVB aktiviert, aber undefiniert sein.
    An darunterliegenden Knoten können sie (müssen aber nicht) definierte Werte annehmen.
    Diese Prüfungen müssen im Frontend Code für dieses Tab/Form noch eingebaut werden.
    Insbesondere müsste das Tab oder Form disabled werden, sobald eine der Baueigenschaften auf dem Form nicht aktiviert ist!
    Dies geht mit einer Oder-Abfrage auf aktiviertNichtDeaktiviert aller beteiligten Baueigenschaften (computed).
    Daneben muss am Backend noch eine Vererbung der Werte durchgeführt werden nach dem Save in updateBauvorhabenBaueinheit im Controller für Baueinheiten.
    Außerdem muss nach Rückkehr von Speichern der BVB updated werden und die Tabelle der Baueigenschaften an der Baueinheit.
    Details dazu:

    1. **[DONE]** Am Frontend prüfen für alle betroffenen Baueigenschaften, dass ALLE am betreffenden Knoten AKTIVIERT sind
       Dies erfolgt in computed Property alleBaueigenschaftenSindAktiviertBauvorhabenAusgewaehlteBaueinheit in baueinheiten.vue
       Wenn dies nicht der Fall ist, das ganze Tab disablen
       Dabei KEINE automatische Aktivierung von betroffenen Baueigenschaften wie z.B. im Tab "Details zur ausgewählten Baueigenschaft",
       da dies für die vielen verschiedenen betroffenen Baueigenschaften zu undurchschaubar für den Benutzer wäre!
    2. Am Frontend weiterhin prüfen für alle betroffenen Baueigenschaften:
       - **[DONE]** Am Wurzelknoten im Bauvorhabenbaum das Tab "Angaben zum Bauvorhaben" disablen
       - **[TODO]** Sonst: Ist eine aus allen in dem Tab betroffenen Baueigenschaften bereits an einem Elternknoten definiert,
         dann Änderungen per Tab "Angaben zum Bauvorhaben" disablen (z.B. dann alle Felder auf read-only setzen und Button "Speichern" disablen)
         Dazu kann ähnlicher Code wie in baueinheiten.vue in pruefeAktivierungFuerAusgewaehlteBaueigenschaft() verwendet werden
         Dies erlaubt das Anschauen (nicht Ändern) von Angaben zum Bauvorhaben an tieferliegenden Knoten im Baueinheitenbaum, an denen diese aktiviert sind im Sinne von 1.
    3. **[TODO]** Am Frontend per speziellem Code prüfen, ob/welche Eingabefelder im Form für die Angaben zum Bauvorhaben geändert wurden - wenn ja,
       "definiertNichtUndefiniert" für die betreffende Baueigenschaft auf "true" setzen, und beim "Speichern" dieses Merkmal auch gleich im Backend so mit abspeichern!
    4. **[TODO]** Am Backend NACH dem Save in der Datenbank für alle betroffenen Baueigenschaften:
       Wenn diese am aktuellen Knoten definiert sind (NACH save) UND in Kindknoten aktiviert sind, definierte Werte an die Kindknoten weitervererben vom aktuellen Knoten
       Durch diese Logik werden die Aktivierungs- und Wertevererbungsregeln eingehalten, auch ohne automatische Aktivierung für die betreffenden Baueigenschaften in Bauvorhaben

93. **[DONE]** (Prio 2) Nach dem Abspeichern der früheren, vorläufigen "Angaben zum Bauvorhaben" musste der QTree für die Baueinheiten und die QTable für die Baueigenschaften aktualisiert werden.
    Dies geschah provisorisch durch Übetragen von Werten aus dem q-form für das Bauvorhaben nach selectedNodeTreeBaueinheiten.baueigenschaften, nicht mit den
    Werten aus der Datenbank aus dem Axios Put Call. Die vorläufige Version wurde mittlerweile ersetzt durch das finale
    Baueigenschaftsprofilformular "Bauvorhaben" - daher ist dies obsolet.
94. **[DONE]** (Prio 3) Mit aktiver Benutzerauthentifizierung gibt es einen Fehler, wenn man in der Dokumentation auf den Link für die Baustoffe oder die Baueinheiten
    klickt. Dies lädt die App neu mit den entsprechenden Routes, aber dann sind trotz angemeldetem Benutzer die Tabs im Hauptmenü disabled (da offenbar bei dem Reload die
    Benutzeranmeldung im global Store resetted wird). Ein erneutes Anmelden behebt das Problem. Update Mai 2020: Dieser Fehler ist nicht mehr reproduzierbar - ein Klick
    auf die Links "Baustoffe" bzw. "Bauvorhaben" im QCarousel in Abschnitt "Grunkonstrukte" der Dokumentation funktioniert.
95. **[DONE]** (Prio 2) Route Guarding mit Passport und JWT am Backend steuerbar machen in Abhängigkeit von Envioronment Variable, z.B. NODE_ENV="production" oder separate
    Environment Variable SECURE_ROUTE_GUARD (String, "on" oder "off") - siehe back-end-server-routes.js. Zugriff auf die Environment Variable: if (process.env.hasOwnProperty
    ("SECURE_ROUTE_GUARDS") { if (process.env.SECURE_ROUTE_GUARDS === "on") {} }
96. **[DONE]** (Prio 2) An den Frontend Routes muss auch noch ein zusätzliches Guarding eingebaut werden, entweder per Vue Router, oder, indem die Komponenten in
    mounted ode created abprüfen, ob Benutzer eingelogged ist, und nur dann rendern - sonst kann unter Umgehung des Menüs direkt eine Route per Browser aufgerufen werden
    und
    diese zeigt dann ggf. einen Teil der Daten an!!! Gelöst mit Vue Router beforeEnter Route Guards und Änderung in keep alive in my-layout.vue ("keep alive" nur noch,wenn
    Benutzer angemeldet ist)
97. **[DONE]** (Prio 2) Mit den secure Routes (per JWT) macht der q-uploader Probleme. Es kommt Error Status 401 beim Upload. Offensichtlich ist der Header
    mit dem Token nicht gesetzt! In q-uploader wird ja beim Upload in computeUploadURL auch nur eine einfache URL (dateien/upload) mitgegeben, kein Header.

    - Entweder müssen diese Routes vom Route Guarding erst einmal ausgenommen werden, oder es muss ein Header mit JWT Token mitgeschickt werden.
    - Beispiel für Custom Upload Methode am Frontend mti Axios hier: https://stackoverflow.com/questions/53784888/quasar-framework-uploader-with-axios
    - Sowie in https://stackoverflow.com/questions/53899220/quasar-quploader-failed-upload-with-upload-fcatory - dort wird per :headers ein Header mitgegeben
    - Dies könnte funktionieren mit demselben Header, der für die regulären API Requests gesetzt wird in this.\$axios.defaults.headers.common["Authorization"] = "bearer " +
      myJWTToken;
    - Der Header könnte dann in diesem Fall so aussehen: [{name: "Authorization", value: "bearer " + myJWTToken}] - ein Versuch damit liefert jedoch auch 401 zurück!
    - Außerdem gibt es im q-uploader API eine Property with-credentials - siehe https://quasar.dev/vue-components/uploader#QUploader-API - damit kommt aber ein
      CORS Fehler zurück!
    - Lösung: Auf https://quasar.dev/vue-components/uploader#ASP.NET-MVC%2FCore wird für JWT Token die **q-uploader factory function** empfohlen, um den XHR Header zu
      setzen,
      in Verbindung mit q-uploader prop :factory="factoryFn" - den dortigen Code als Vorlage genommen an q-uploader im Tab "Übersicht" in bauinformationen.vue und
      angepasst,
      mit dem oben bereits skizzierten Header => Success!!! Code ist allerdings OHNE Axios.
    - So dann an allen Uploader implementiert.

98. **[REJECT]** (Prio 3) Die Factory Funktionen fileUpload auf Axios umstellen. Dies stellte sich als falsch heraus, weil in fileUpload nur eine Promise an Quasar übergeben
    wird (inklusive Header mit JWT Token), und der Post-Request dort nicht selbst durchgeführt wird.
99. **[DONE]** (Prio 2) Mit den über 4000 Baustoffen/Rohstoffen in den Stammdaten (Import aus Word-Dokumnent von Erik) wird der
    Rohstoffunterbaum sehr groß. Das bisherige expandAll() für den Rohstoffunterbaum macht keinen Sinn mehr.
    Stattdessen sollte nur die erste oder zweite Unterebene expandiert werden, oder nur
    die Zweige, in denen ticked Nodes sind. Letzeres wurde von Stefan implementiert, allerdings trat zwischenzeitlich noch ein Fehler auf, dass der Baum doch wieder ganz expandiert wird,
    wenn man an einem ticked Rohstoff-Node Werte für den Anteil des Rohstoffs im Baustoff eingegeben hat (per Kontextmnenü). Dies lag an Zeile 7209 ff. in baustoffe.vue,
    wo der Baum expandiert wird nach dem Abspeichern von ticked Nodes. Dies temporär auskommentiert (okay für Demozwecke. Später musste dort noch der Baum für die
    zugeordneten Rohstoffe des Baustoffs neu geladen werden aus der Datenbank und dann neu gerendered werden mit den ticked Nodes expandiert.
100. **[DONE]** (Prio 2) Fehler beim Import von Baueigenschaften: Löschen der bisherigen wertbezogenen Baueigenschaften in Baueinheiten fehlte (war nur in Baustoffen
     implementiert) und Fehler bei Parameterübergabe (Parameter baumTyp und idKnoten nicht übergeben). Aus historischen Gründen wurde in importBaueigenschaften
     createBaueigenschaft intern aufgerufen statt der neueren Funktion - umgestellt auf legeNeuAnBaueigenschaft mit den korrekten Parametern für baumTyp und idKnoten
101. **[DONE]** (Prio 2) Beim Import von Baueigenschaften zusätzliches Feld "baumTyp" eingeführt - abhängig davon wird die zu importierende Baueigenschaft entweder im
     Baustoffbaum oder im Bauvorhabenbaum aktiviert und mit den beim Import per JSON spezifizierten Werten belegt. Siehe auch TODO #86 oben zur weiteren Verfeinerung
102. **[DONE]** (Prio 2) Kontext-Menü und Funktionen für das schnelle Aktivieren von Baueigenschaften in Baustoffen und Baueinheiten - dabei keine Werteeingabe, sondern
     die Werte dabei entweder (wenn kein direkter oder indirekter Elternknoten existiert, an dem die Eigenschaft aktiviert ist und definierte Werte hat) undefiniert lassen oder
     (wenn in einem direkten oder indirekten Elternknoten aktiviert und definiert), die Werte erben von diesem Elternknoten
103. ==**[DEFER]**== (Prio 2) Nach einem Update einer Baueigenschaftsbeschreibung (Markdown-Feld) mit Speichern wird diese nur lokal in der ausgewählten Baueigenschaft
     aktualisiert. In anderen Baustoffen/Baueinheiten ist dieselbe Eigenschaft ausgewaehlteBaueigenschaft.typbezogeneBaueigenschaft.baueigenschaftsBeschreibung noch im
     Zustand vor dem Speichern! In der fachlichen Hilfe wird es korrekt aktualisiert.
     ==**Hinweis:**== Siehe dazu das Item "State Management" im folgenden Abschnitt "Internes Design" (es werden Socket-Aktualisierungsnachrichten verschickt,
     allerdings werden diese nur an <u>anderen</u> Clients angezeigt (als der Client, der die Aktualisierung ausgelöst hat). Neu-Laden des gesamten Clients
     aktualisiert alle Anzeigen, in denen das geänderte Feld referenziert wird.
104. ==**[DEFER]**== (Prio 2) Nach einem Update in Bauinformationen (Änderung, Neuanlage, Löschen einer Bauinformation) müssen, falls diese geladen
     sind, die Bäume für Baustoffe und Bauvorhaben neu geladen werden, denn sie enthalten populierte Referenzen auf die ursprünglichen Bauinformationen!
     ==**Hinweis:**== Siehe dazu das Item "State Management" im folgenden Abschnitt "Internes Design" (es werden Socket-Aktualisierungsnachrichten verschickt,
     allerdings werden diese nur an <u>anderen</u> Clients angezeigt (als der Client, der die Aktualisierung ausgelöst hat). Neu-Laden des gesamten Clients
     aktualisiert alle Anzeigen, in denen das geänderte Feld referenziert wird.
105. ==**[DEFER]**== (Prio 3) Nach Änderungen in Baustoffen muss in "Bauvorhaben" > "Zugeordnete Baustoffe", falls dort der Baustoffbaum geladen ist,
     dieser neu geladen werden, da er die ursprünglichen Baustoffe enthält (inklusive etwaigen ticked Nodes)
     ==**Hinweis:**== Siehe dazu das Item "State Management" im folgenden Abschnitt "Internes Design" (es werden Socket-Aktualisierungsnachrichten verschickt,
     allerdings werden diese nur an <u>anderen</u> Clients angezeigt (als der Client, der die Aktualisierung ausgelöst hat). Neu-Laden des gesamten Clients
     aktualisiert alle Anzeigen, in denen das geänderte Feld referenziert wird.
106. ==**[DEFER]**== (Prio 3) Nach Löschen von Baueigenschaften aus dem Baum für Baustoffe bzw. Baueinheiten muss der jeweils andere Baum für Baueinheiten bzw. Baustoffe
     refreshed werden, da er die gelöschte Baueigenschaft in den entsprechenden Tabellen noch im Speicher enthält
     ==**Hinweis:**== Siehe dazu das Item "State Management" im folgenden Abschnitt "Internes Design" (es werden Socket-Aktualisierungsnachrichten verschickt,
     allerdings werden diese nur an <u>anderen</u> Clients angezeigt (als der Client, der die Aktualisierung ausgelöst hat). Neu-Laden des gesamten Clients
     aktualisiert alle Anzeigen, in denen das geänderte Feld referenziert wird.
107. **[WORK]** (Prio 3) Das Laden der zugeordneten Baustoffe in baueinheiten.vue dauert sehr lange, weil der gesamte Baustoffbaum sehr groß ist. Es dauert
     merklich länger als das vergleichbare Laden der zugeordneten Rohstoffe (d.h. des deutlich kleineren Rohstoffunterbaums) in baustoffe.vue.
     Eine Verbesserung konnte erzielt werden durch das Auslagern der Funktionen showTreeBaustoffe/Rohstoffe() aus load loadTreeBaustoffe/Rohstoffe()
     und Aufruf von showTreeBaustoffe/Rohstoffe() statt loadTreeBaustoffe/Rohstoffe() bei der Anwahl des Tabs - siehe Kommentare in diesen Funktionen.
     ==**Hinweis**==: Langfristig könnte hier auch lazy Loading in Verbindung mit dem Expandieren der ticked Nodes implementiert werden, um die Performance zu verbessern.
     ==**Update 25.02.2021**==: Experimentelle Performance-Verbesserung mit Object.freeze(this.nodesTreeBaustoffe) in baueinheiten.loadTreeBaustoffe()
     - Tipp dafür: https://forum.quasar-framework.org/topic/5650/qtree-search-filter-very-slow-when-number-of-nodes-is-1000s-how-to-optimize-it/8
     - Vorlage: https://vuedose.tips/improve-performance-on-large-lists-in-vue-js/
     - Dies beschleunigt tatsächlich auf Heroku die Ladezeiten beträchtlich!
     - **[DONE]** Welche Seiteneffekte hat dies? Reaktivität bei Änderungen im Array/Tree? Filtern, Reset, Ticking
       scheint noch zu funktionieren (nur Sniff Test bisher)! Es gibt ein Problem allerdings mit denm QPopupEdit -
       Änderungen in den QInput-Feldern dort werden nach dem Object.Freeze nicht mehr reaktiv in prop.node reflektiert (da dieses ja eingefroren
       wurde). Der Code für das QPopupEdit und die QInputs dort musste angepasst werden! Siehe Kommentare dort.
     - Beim Reset und Refresh wird ebenfalls loadTreeBaustoffe() aufgerufen, so dass sonst vermutlich nichts anzupassen ist!
     - ==**[TODO]**== In baustoffe.vue sollte loadTreeRohstoffe() analog angepasst werden, allerdings ist die Performance dort
       auch ohne diese Verbesserung schon deutlich besser, da es deutlich weniger Knoten im Rohstoffunterbaum als im Baustoffbaum gibt.
     - ==**Update 05.10.2021**==: Nachdem das QPopupEdit in baustoffe.vue für den Rohstoffbaum auch nicht zuverlässig funktionierte, dort den Code für das QPopupEdit
       ebenfalls umstellt nach Vorlage aus baueinheiten.vue. Allerdings wird der Rohstoffbaum bisher nicht eingefroren mit Object.freeze()
108. ==**[TODO]**== (Prio 2) Die Eingabe in den 3 Input-Feldern im Popup Edit in baueinheiten.vue auf dem Baustoffbaum der zugeordneten Baustoffe einer Baueinheit
     funktioniert nur sehr langsam. Das könnte daran liegen, dass nach den per v-model korrespondierenden Feldern, die an Knoten im Baum liegen, gesucht wird
     (von Vue/Quasar). Hier könnte man eventuell diese Werte in einem separaten Array zwischenspeichern, und erst beim Save diese in den Baum speichern.
     Die Eingabe im vergleichbaren Popup Edit in baustoffe.vue auf dem Rohstoffunterbaum der zugeordneten Rohstoffe eines Baustoffs ist ebenfalls langsam,
     aber gefühlt etwas schneller als im Baustoffbaum (vermutlich aufgrund der kleineren Größe des Rohstoffunterbaums im Vergleich zum Baustoffbaum).
     ==**Hinweis:**== Dies wird aktuell mitigiert mit _debounce_ Props (1000 ms) an den q-input Feldern.
109. **[DONE]** (Prio 2) Die QPopupEdits für Angaben zum Rohstoff im Baustoff bzw. Baustoff in Baueinheit funktionieren
     für Baustoffe bzw. Baueinheiten aktuell nicht korrekt - das Editing in den 3 Input-Feldern funktioniert nicht korrekt für die
     3 erweiterten Felder anteil/symbol/einheitVonRohstoffInBaustoff bzw. anteil/symbol/einheitVonBautoffInBaueinheit. Nur an neu getickten Nodes können Werte
     eingegeben und auch gespeichert werden. Hinweis: Auch in den Testdaten sind diese 3 Feldern nur an manchen Knoten
     vorhanden, nicht an allen. Das ist also vermutlich nicht die Ursache es Fehlers. Die Ursache dafür war ein Reactivity Problem beim Hinzufügen der Felder
     in loadTreeBaustoffe/Rohstoffe in den Array treeBaustoffe bzw. treeRohstoffe - dort wurden keine \$set-Methoden verwendet, weshalb Vue wohl nicht
     mit diesen Feldern zurechtkam => gefixed.
110. ==**[TODO]**== (Prio 3) Wenn man in den QPopupEdits für Angaben zum Rohstoff im Baustoff bzw. Baustoff in Baueinheit einen Node unticked, werden dessen
     erweiterte Felder zwar nicht mehr angezeigt, sind aber weiterhin vorhanden. Erst beim Speichern und Reload werden sie entfernt. Kann eventuell auch so bleiben
     als Komfortfeature statt Bug. Wenn man beim Unticken die Werte ausnullen wollte, müsste man eine Methode einfügen,
     die beim @update:ticked ausgeführt wird - diese bekommt als Parameter den Array der ticked Nodes mit (dies
     können auch mehrere sein!). Diesen müsste man traversieren und irgendwie die untickten herausfinden. Dann für
     diese die Felder für diese Angaben ausnullen. Vorläufig noch nicht implementiert, da eventuell die alten
     Werte sogar hilfreich sind, und beim Speichern nur die Angaben der getickten Nodes an das Backend geschickt werden.
111. (Prio 2) Nach Verschieben/Kopieren von Zweigen per Kontextmenü im BVB/BSB:
     - **[DONE]** Aktualisierung des Baums im Frontend funktionierte nicht immer korrekt - siehe den entsprechenden Abschnitt unten im internen Design
     - **[DONE]** (Prio 3) Die Sleep-Zeit für das Expandieren des neuen Elternknotens eines verschobenen/kopierten Zweigs sollte insbesondere auf Heroku kalibriert
       werden (aktuell 2000 ms) - war immer noch zu kurz, daher das Expandieren sicherheitshalber einstweilen wieder disabled (Sleep-Zeit wird dann nicht benutzt). ==**Update 02.02.2021**==: Gegen diese Timing-Problemen half ein await vor dem
       refreshTreeBaueinheiten() oder refreshTreeBaustoffe(), danach setExpanded()-API aufrufen per \$refs.
112. **[DONE]** (Prio 3) In refreshTreeBaueinheiten(): Beim Löschen des letzten Kindknoten unter einem Elternknoten wird der neue
     Baumknotentyp "Blatt" nach dem Aktualisieren nicht korrekt angezeigt - Refresh notwendig - gefixed in deleteBaustoff/deleteBaueinheit!
113. **[DONE]** (Prio 3) In lazyLoadHandlingTreeBaustoffe/Baueinheiten() wurde bisher das Flag lazy für die neu geladenen Kinder unabhängig vom  
     Baumknotentyp immer auf true gesetzt. Genauso in den Funktionen in refreshTreeBaustoffe/Baueinheiten(). Dies bewirkte die Anzeige eines Rechtspfeils
     zum Expandieren an diesen Knoten (obwohl diese keine Kinder haben). Nun diese Methoden geändert, dass sie bei Blattknoten lazy auf false setzen, sonst
     auf true.
114. **[DONE]** (Prio 3) Es gibt aus Item #111 noch einen Restfehler: Beim Kopieren oder Verschieben eines Blattknotens unter einen neuen
     Elternknoten wird für diesen nach dem Tree Refresh ein grauer Rechtspfeil angezeigt. refreshTreeBaustoffe/Baueinheiten() behandelt diesen
     Fall bisher nicht - dort musste wie in lazyLoadHandlingTreeBaustoffe/Baueinheiten in ladeKinderRekursiv() in der Schleife nach dem Lesen
     der Kinder deren lazy-Flag in Abhängigkeit vom baumKnotenTyp gesetz werden - fixed.
115. **[DONE]** (Prio 2) Nach Browser-Refresh muss sich der Benutzer aktuell neu anmelden - die Session sollte aber dabei beibehalten werden.
     - Allerdings musste in diesem Fall wohl aus Sicherheitsgründen auch ein Session Timeout eingebaut werden (auf Heroku erfolgt allerdings Logout nach 24 h bei
       Server Restart) - dies ist im Backend in authentifizierung.controller bereits eingebaut (12 Stunden Epiration) mittels neuem jwt.sign() exp Parameter.
       In my-layout.vue nun ebenfalls eingebaut: Timestamp wird mit den Credentials in localStorage abgespeichert und abgeprüft, ob älter als 12 Stunden.
       Falls ja, wird Neuanmeldung ausgelöst, falls nein, werden bisherige Credentials aus localStorage weiterverwendet.
     - Der JWT-Token wird im Browser in localStorage gehalten. myLayout.vue muss beim Neu-Laden der App nach dem Browser Refresh also in created() erst dort nachschauen,
       ob der Token dort noch vorhanden ist, und Login nur dann machen, wenn nicht vorhanden. Allerdings musste dazu in localStorage auch die e-Mail des Benutzers gespeichert
       werden, da diese in diesem Fall statt einer Neuanmeldung zusammen mit dem Token auch wieder nach globalStore.anmeldeDatenBenutzer zurückgespeichert werden muss, da auch
       global-store.js diese Daten nach dem Refresh vergessen hat. Zusätzlich musste in front-end-server-routes.js in den Route Guards noch zusätzliche Abfrage eingebaut
       werden, dass bei Browser Refresh nicht die Aufforderung zur Neuanmeldung angezeigt wird. ==**Achtung**==: Dies funktioniert nur, wenn in der obersten
       Frontend Route "" statt "/" als Wurzel-Pfad angegeben wird!!!
116. **[DONE]** (Prio 3) Wenn nach Markieren in den Bäumen eine andere Aktion (Kind anlegen, Löschen - nicht bei Umbenennen) ausgeführt wird und dadurch der Baum
     refreshed wird, geht die Markierung nach dem Refresh potentiell verloren, aber die Kontextmenüeinträge für markierte
     Zweige sind noch enabled - in diesem Fall muss idWurzelZuBewegenderZweig auf null gesetzt werden. Dies funktioniert in createChildBaustoff/Baueinheit. In deleteBaustoff/Baueinheit musste zusätzlich dazu spezieller Code eingefügt werden, um per \$set das Feld zurückzusetzen, das die Anzeige
117. **[DONE]** (Prio 3) Ersetzen aller !== null durch != null - siehe https://stackoverflow.com/questions/38977829/what-is-the-difference-between-null-and-null - der einzige
     Unterschied zwischen den beiden ist: (undefined == null) ist true, während (undefined === null) false ist - daher "erschlagen" Prüfungen x == null
     auch den undefined-Fall - wenn x undefined ist, ist das Resultat true, sonst falsch, es sei denn x ist null. Siehe auch
     https://stackoverflow.com/questions/38977829/what-is-the-difference-between-null-and-null. Daher viele !== null durch
     != null ersetzt, vor allem in v-ifs im Template. Nicht bei Prüfungen, wo vorher undefined explizit abgefragt wird und nicht,
     wenn vorher mit hasOwnProperty() abgefragt wird, ob das Feld existiert. Dies im Frontend am 22.05.2020 geändert. Im Backend nur selektiv geändert, dort gibt es oft Abfragen auf === null in den .then-Zweigen nach dem Aufruf von Mongoose-Promise-Methode, diese
     belassen.
118. **[DONE]** (Prio 2) Vorkehrungen für den Import der Schall-Baueigenschaften von Roland:

     - Felder für Symbol, Einheit, Operator enthalten Markdown statt einfachen Strings, in Backend und Frontend (mit Ausgabe der formatierten Felder)
     - Dies ist notwendig, um alle Hoch- und Tiefstellungen von Zeichen (nicht alle gehen per Unicode, sondern es ist HTML notwendig z.B. per <sub>1234</sub> bzw. <sup>1234</sup>)
       in diesen Feldern zu unterstützen sowie die bequeme Eingabe von mathematischen Unicode-Sonderzeichen per generierten <span>\u2248</span> Tags (Beispiel)
     - Weiteres dediziertes Markdown-Feld für Formel hinzugefügt in Baueigenschaften
     - Neuer Sonderzeichen-Selektor unter diesen Feldern in den Masken für Baueigenschaftsbearbeitung und Neuanlage, der obige Formatierungen in das Clipboard stellt

119. **[DONE]** (Prio 3) Bei der Neuanlage von Baueigenschaften lassen sich beim Wertetyp "Kennwert" die Felder symbol, einheit, operator, formel nur bei Aktivierung füllen!
     Gefixed in computed-Funktionen disabledFieldsNeueBaueigenschaft
120. **[DONE]** (Prio 1) Defect nach Quasar Upgrade auf v1.11.3 - Nach "Speichern" tritt z.B. beim Speichern von Baueigenschaften ein
     obskurer Fehler auf, der den Benutzer auf die Anmeldungsseite (Default Route) bringt, erkennbar z.B. an localhost:4200/Bauvorhaben? - mit
     Fragezeichen hinten. Das Speichern vorher funktioniert noch, allerdings nicht mehr das Refreshen des Bauvorhabenbaums bzw. Baustoffbaums. Stefan identifizierte die Ursache als einen
     ==Konflikt in q-forms, die q-btns mit type="submit" enthalten==. In sämtlichen solchen q-btns per Fix (22.05.2020) die Prop
     type="submit" entfernt. Dabei noch weiteren Fix in updateAusgewaehlteBaueigenschaft() eingebaut, betreffend die Zuweisungen
     von Objekten dort. Potentiell ähnliches Problem wie in https://github.com/quasarframework/quasar/issues/5358? ==**\*Hinweis**: Dort wird
     empfohlen statt type="submit": Add an `@click` listener on QBtn that calls the method that submits the form.==
121. **[DONE]** (Prio 3) Bei 2-maligem Speichern in den Details für Baueigenschaft mit leerer Bauinformation trat ein Fehler "Cannot set
     property '\_id' of null" für das Objekt selectModelBauinformationAusgewaehlteBaueigenschaft
     auf - gefixed in updateAusgewaehlteBaueigenschaft() am 22.05.2020
122. **[DONE]** (Prio 3) <keep-alive> in my-layout.vue erweitert auf alle aktuell vorhandenen Komponenten in \pages.
123. **[DONE]** (Prio 3) "Relevante" in "Zugeordnete" Bauinformationen/Baustoffe/Rohstoffe umbenannt (zunächst nur in den Externals, erst
     später auch in den internen Bezeichnungen, da dies bis ins Backend durchschlug, das diese Bezeichnungen ebenfalls verwendet!)
124. **[DONE]** (Prio 3) Kontextmenüs auch auf der QTable für die Bauinformationen
125. **[DONE]** (Prio 3) Kontextmenüs zum Öffnen von internen und externen Links auch in den QTables für die zugeordneten Bauinformationen in baustoffe.vue und baueinheiten.vue nach der Vorlage aus #124.
126. ==**[TODO]**== (Prio 3) Für das QSelect der einem Baueigenschaftsprofil zugeordneten Baueigenschaften sollte aus Performance-Gründen eventuell nur ein
     Extrakt der Baueigenschaften aus der Datenbank gelesen werden
127. ==**[TODO]**== (Prio 2) **Token Expiration**: Am Backend per Test die Token Expiration testweise von 12 Stunden auf 1 Minute gesetzt und verifiziert, dass nach
     einer Minute tatsächlich
     der Token expired und 401 zurückkommt. Der Axios Interceptor am Client fordert in diesem Fall den Benutzer zum Relogon auf - also alles okay. Andererseits sind auch nach Server Restart die vorher vergebenen Tokens weiter gültig, wie man lokal testen kann, indem sich am Frontend einlogt, dann den Server neu startet, und dann z.B. das Tab Baustoffe neu anwählt - dessen Wurzelknoten wird mit dem alten Token erfolgreich geladen! Im
     Frontend wird bisher nur in created() von myLayout.vue (was nur nach Browser Refresh durchlaufen wird) geprüft, ob der Token älter als 12 h ist. Dies müsste bei jedem Backend Call geprüft werden, in axios.js. Artikel dazu:
     - https://blog.liplex.de/axios-interceptor-to-refresh-jwt-token-after-expiration/
     - https://stackoverflow.com/questions/51563821/axios-interceptors-retry-original-request-and-access-original-promise/51600050#51600050
     - https://github.com/Flyrell/axios-auth-refresh
     - https://stackoverflow.com/questions/51646853/automating-access-token-refreshing-via-interceptors-in-axios
128. **[DONE]** (Prio 2) verbleibende ToDos für Baueigenschaften/Baueigenschaftsprofile

     - **[DONE]** Header für alle Funktionen im Fronend und Backend, Kommentare für komplexe/neue Lösungen
       - Z.B. Methode populateBaueigenschaft(currentValue) in details-tab-baueigenschaft.vue
     - **[DONE]** Variablen- und Props-Bezeichnungen müssen stellenweise noch angepasst werden - sie sollten stets den Typ des betreffenden Objekts
       wiedergeben! Dies betrifft insbesondere die Bezeichnungen für die Props in uebersicht-tab-baueigenschaften.vue und uebersicht-tab-baueigenschafts-profile.vue
     - Tab "Baueigenschaften"
       - **[DONE]** Die Komponenten- und Tab-Namen überarbeitet nach BIM.click Namenskonventionen
       - Tab "Übersicht aller Baueigenschaften"
         - **[DONE]** Es fehlen Buttons für Bearbeiten, Neuanlage, Löschen von Baueigenschaften - siehe Vorlage in baustoffe.vue. Diese Buttons wurden mittlerweile hinzugefügt.
         - **[DONE]** Der Button für Löschen funktioniert auch bereits, es sollte aber noch
           eine Warnung eingebaut werden, ob der Benutzer wirklich die Baueigenschaft löschen möchte - siehe Vorlage in baustoffe.vue
         - **[DONE]** Dito Kontextmenüs dafür - siehe Vorlage in baustoffe.vue
         - **[DONE]** Checkboxes statt true/false für Wahrheitswerte in der Tabelle - siehe Vorlage in baustoffe.vue
         - **[DONE]** Die Markdown-Anzeige der Felder Symbol, Einheit, Operator, Formel in der Tabelle funktioniert nicht - Fix durch MS (Code aus baustoffe.vue)
       - Tabs "Details zur ausgewählten Baueigenschaft" und "Neuanlage einer Baueigenschaft"
         - **[DONE]** Fehler: Beim Speichern im Tab "Details zur ausgewählten Baueigenschaft" wird Create-Methode für neue Baueigenschaft aufgerufen statt
           Update-Methode für die ausgewählte Baueigenschaft! ==> Route war fehlerhaft
         - QSelect "Mögliche Optionen für Aufzählungswert"
           - **[DONE}** anders positionieren
           - **[DONE]** Es sollte auch nur enabled sein bei Wertetyp "Aufzählungsswert", sonst disabled!
         - **[DONE]** Sowohl bei der Neuerzeugung einer Baueigenschaft wie auch bei der Änderung der Bezeichnung muss eine Überprüfung der Eindeutigkeit der
           baueigenschaftsBezeichnung erfolgen - siehe Vorlage in baustoffe.vue
         - **[DONE]** Bei einem Test mit Erzeugung einer bereits vorhandenen Bezeichnung kommt am
           Backend ein Fehler "Cannot set headers after they are sent to the client" - gefixed in baueigenschaften.controller.js
         - **[DONE]** Am Frontend muss in diesem Fall noch die Benutzermeldung erscheinen "Es gibt bereits eine Baueigenschaft mit derselben Bezeichnung...."
           (erkennbar an Status 403 - siehe baustoffe.vue)
         - **[DONE]** Bei einem Test mit Änderung des Felds "Symbol" der Baueigenschaft"Kennwert geografische Länge" passiert beim Speichern am
           Backend ein Error mit Status 500 in Methode updateBaueigenschaft(), Cannot read property '\_id' of null, diese wird im Frontend aufgerufen aus
           details-tab-baueigenschaft.vue aus Methode createNeueBaueigenschaft() mit Modus "Bearbeitung". Die Ursache ist eventuell die fehlende Bauinformation?!?
           Zu klären: Wird typbezogeneBaueigenschaft in createNeueBaueigenschaft() richtig übergeben?
         - **[DONE]** Der Filter am QSelect für die zugeordnete Bauinformation und der Hint unter dem QSelect funktioniert nicht! Siehe Vorlage in baustoffe.vue.
         - **[DONE]** Das selektive Disabling von Angaben zum Wertetyp funktioniert nicht. Es wird gesteuert durch disabledFieldsNeueBaueigenschaft - dies muss noch als computed-Funktion hinzugefügt werden - siehe Vorlage in baustoffe.vue
     - Tab "Baueigenschaftsprofile"
       - **[DONE]** Die Komponenten- und Tab-Namen überarbeitet nach BIM.click Namenskonventionen
       - Tab "Übersicht aller Baueigenschaftsprofile"
         - **[DONE]** Auf Heroku kam ursprünglich bei Anwahl eines Baueigenschaftsprofils mit leerer Bauinformation in der Tabelle im Tab "Übersicht
           aller Baueigenschaftsprofile" ein Fehler "TypeError: Cannot read
           property '\_id' of undefined" - die Ursache lag im computed getter für ausgewaehlteBauinformation in tab-details-baueigenschafts-profil.vue.
           Dieser Fehler verschwand jedoch, seit alle
           Baueigenschaftsprofile in der Datenbank (überprüfbar mit MongoDB Compasss) wenigstens ein Baueigenschaftsprofil mit dem Feld
           zugeordneteBauinformation = null statt gar keinem solchen Feld angelegt haben!
           <br/>
           **Update 1**: Dieser Fehler lässt sich nun doch wieder reproduzieren, mit lokaler Datenbank! Er tritt auf bei Anwahl eines neu
           angelegten Profils mit leerer Bauinformation.
           **Update 2**: Lässt sich aktuell nicht mehr reproduzieren
         - **[DONE]** Es fehlen Buttons für Bearbeiten, Neuanlage, Löschen von Baueigenschaftsprofilen - siehe Vorlage in baustoffe.vue. Diese Buttons wurden mittlerweile hinzugefügt.
         - **[DONE]** Der Button für Löschen funktioniert auch bereits, es sollte aber noch
           eine Warnung eingebaut werden, ob der Benutzer wirklich die Baueigenschaft löschen möchte - siehe Vorlage in baustoffe.vue
         - **[DONE]** Beim Neuanlegen gibt es noch ab und zu Errors mit Status 500.
         - **[DONE]** Dito Kontextmenüs dafür - siehe Vorlage in baustoffe.vue
       - Tab "Details für Baueigenschaftsprofil"
         - **[DONE]** Überprüfung der Eindeutigkeit der baueigenschaftsProfilBezeichnung - siehe Vorlage in baustoffe.vue für baueigenschaftsBezeichnung
         - **[DONE]** In createBaueigenschaftsProfil() returned, da die baueigenschaftsProfilBezeichnung unique ist, der catch-Block bei
           Aufruf mit einer bereits existierenden Bezeichnung einen Status 500 - es sollte
           aber in diesem Fall eine spezifische Meldung kommen, dass schon ein Profil mit dieser Bezeichnung existiert - siehe baustoffe.vue.
           Am API sollte in diesem Fall Status 403 zurückkommen wegen Einheitlichkeit zu Baueigenschaften, Bauinformationen, etc.!
       - Tab "Beschreibung für Baueigenschaftsprofil"
         - **[DONE]** Beim Speichern wird die Beschreibung zwar korrekt gespeichert, aber danach wird eine leere Beschreibung am Frontend angezeigt - hängt
           eventuell mit Event refreshRequest zusammen
         - **[DONE]** Das Zurücksetzen funktioniert nicht - noch nicht implementeirt
         - **[DONE]** Das initiale Laden der Beschreibung aus der Datenbank funktioniert nicht - noch nicht implementiert
         - **[DONE]** Im Log erscheint eine Fehlermeldung, dass :nutzermeldung="localStore.showBenutzerNachricht" keine Function ist! Diese Fehlermeldung gefixed,
           allerdings muss noch Code eingefügt werden für diverse Fehlermeldungen
       - Tab "Zugeordnete Baueigenschaften am Baueigenschaftsprofil"
         - **[DONE]** Es fehlt der Filter auf dem QSelect - siehe Vorlage in baustoffe.vue
         - **[DONE]** Das Refreshen der Table mit den zugeordneten Baueigenschaften sollte erst nach dem Speichern der im QSelect ausgewählten Baueigenschaften erfolgen
         - **[DONE]** Fehler: Wenn dieses Tab bei Neuanlage angewählt, ausgefüllt und abgespeichert wird, **bevor** im ersten Tab "Details für Baueigenschaftsprofil" ein neues Profil erzeugt und abgespeichert worden ist, gibt es beim Speichern einen Status 500 aus dem Post vom API!!! Kommentar: Ist aufgrund neuer Tab-Struktur nicht mehr möglich.
         - **[DONE]** Die neuen, zusätzlichen Buttons rechts unten sind eigentlich nicht nötig, es
           sollte möglich sein, mit dem "Speichern"-Button am QSelect die ausgewählten Baueigenschaften
           in der Tabelle darüber zu speichern. Diese zusätzlichen Buttons entfernt.
         - **[DONE]** Auf der Baueigenschaft sollte es einen Button "Bearbeiten" und ein Kontextmenü "Baueigenschaft auswählen und bearbeiten" geben
         - **[DONE]** Die Boolean-Felder in der QTable für die Baueigenschaften (Wahrheitswert, Schutzkategorien) sollten statt true/false die grauen Checkmarks anzeigen wie in baustoffe.vue
       - Tab "Vorgabewerte für ausgewählte Baueigenschaft am Baueigenschaftsprofil"
         - **[DONE]** Es fehlt im QForm das Feld für "Formel" unter "Operator" - dieses eingefügt, dabei die betreffenden 4 Felder auf Markdown-Ausgabe umgestellt
         - **[DONE]** Vor dem Speichern können auch typbezogene Felder geändert werden (z.B. Bezeichnung, Bauinformation oder Bemerkung) - Dies vorläufig nicht
           unterstützt, daher diese Felder einstweilen disabled bemerkung, bauinformation und Schutzkategorien. Die Felder symbol, einheit, operator, formel sind aktuell nur Ausgabefelder - müssten durch q-input-Felder mit Markdown ersetzt werden,
           falls Änderung der typbezogenen Felder hier enabled werden soll.
         - **[DONE]** Fehler: Das Speichern von geändertern wertbezogenen Feldern schlägt fehl mit Status 500!
       - Tab "Neuanlage eines Baueigenschaftsprofils"\_
         - **[DONE]** Nur das Unter-Tab "Details für Baueigenschaftsprofil" soll dafür bleiben, die 3 anderen Unter-Tabs können entfernt werden.
           Nach der Neuanlage sollte das neu angelegte Profil in der Übersicht ausgewählt werden und es sollte das Tab "Details" dafür angezeigt werden, sowie
           die 3 weiteren Tabs dafür
     - Weiteres **[TODO]** für Baueigenschaftsprofile: **#134** unten, mittlerweile **[DONE]**

129. **[DONE]** (Prio 3) Bauinformation-QSelects (womöglich auch andere QSelects) werfen eine Exception, wenn man nach einer nicht vorhandenen Bauinformation filtert (z.B. FHDSJFHD) und mit Tab bestätigt. ==**Update 02.02.2021**==: Problem nicht mehr
     reprodzierbar.
130. **[DONE]** (Prio 3) Beim Löschen von Baueigenschaften müssen Referenzen auf diese per Pre-Middleware auch aus den Baueigenschaftsprofilen entfernt werden!
131. **[DONE]** (Prio 3) Beim Server Start kommt neuerdings eine Warnung, dass Collection.remove deprecated ist. Dies kommt aus baueigenschaftsProfileController.deleteBaueigenschaftsProfile(); dort remove() ersetzt durch deleteMany() und deleteOne()
132. ==**[TODO]**== (Prio 3) Beim Zuordnen von Bauinformationen bzw. Baueigenschaften an Baustoffe/Baueinheiten bzw. Baueigenschaftsprofile sollte zusätzlich zum Button
     "Speichern" ein Button "Zurücksetzen" angeboten werden (Einheitlichkeit)
133. **[DONE]** (Prio 2) **Aktivierung und Wertevererbung für Baueigenschaften in verschobenen/kopierten Zweigen** am neuen Zielelternknoten im Baustoffbaum und Bauvorhabenbaum - muss noch implementiert
     werden im Front- und Backend
134. **[DONE]**(Prio 2) **Aktivieren eines Baueigenschaftsprofils** an einem Baustoff oder einer Baueinheit: Siehe entsprechend gekennzeichneten Abschnitt im "Internen Design" unten - die zu wählende Variante muss vor Implementierungsbeginn besprochen werden. Ist mittlerweile implementiert. Tests laut Testmatrix im internen Design unten wurden am 26.09.2020 durchgeführt - die Fälle 5 und 6 wurden von Stefan korrigiert - siehe Testmatrix unten.
135. **[DONE]** (Prio 2) **Benutzerverwaltung mit Benutzerrechten und Zugriffskontrolle**

- Siehe folgender Abschnitt "Internes Design"
- Weitgehend erledigt - verbleibende Arbeiten:
  - **[DONE]** **Weitervererbung von Autoren** bei **Neuanlage** einer Baueinheit
  - **[DONE]** **Weitervererbung von Autoren** bei **Bewegen eines Zweigs** unter einer Baueinheit
  - **[DONE]** **Hinzufügen/Entfernen von Autoren** an Baueinheiten (dort inklusive Vererbung an Kindknoten)
  - **[DONE]** **Hinzufügen/Entfernen von Autoren** an Bauinformationen per QSelect
  - **[DONE]** Es ist zusätzlich ein neues Tab zur **Benutzerverwaltung** unter "Verwaltung" erforderlich, in dem Administratoren eine Übersicht aller Benutzer per
    QTable erhalten, und in einem Unter-Tab "Details" die Daten eines ausgewählten Benutzers ändern können (z.B. dessen Benutzerrolle oder andere Felder), sowie
    einen neuen Benutzer anlegen können (entspricht dem schon vorhandenen "Registrieren") - als Vorlage dafür kann z.B. baueigenschaften.vue
    dienen.

136. **[DONE]** (Prio 3) **E-Mail-Verifikation bei Benutzerregistrierung**

     - Siehe folgender Abschnitt "Internes Design"
     - **[DONE]**: registerBenutzer() erweitert um Verification Token mit neuem Model/Collection für diese Tokens und Verification E-Mail mittels nodeMailer - siehe authentifizierung.controller.js
     - **[DONE]**: Neue Methode confirmBenutzer(), vorläufig per einfachem Get Request mit Token Parameter ("Variante 1")
     - **[DONE]**: Dies wurde dann erweitert ("Variante 2") zu Form mit Post Request für Token und E-Mail in Body-Feldern
     - **[DONE]**: Für dieses Form im Frontend eine neue Page/Komponente konto-bestaetigung.vue angelegt, die diese Post-Methode aufruft
     - **[DEFER]**: Methode, um neuen Verification Token nach Expiration eines alten Tokens zu resenden, siehe https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
     - Andernfalls verbleiben nicht verifizierte Benutzer in BenutzerCollection und müssen dort manuell gelöscht werden, damit
       eine Neu-Registrierung mit derselben E-Mail-Adresse möglich ist
     - **[DONE]**: Alternativ auf nicht verifizierten Benutzern in der BenutzerCollection eine conditional TTL Expiration gesetzt (abhängig vom Feld
       istVerifiziert: false) - funktioniert per Tests mit Compass auf lokaler Datenbank, indem es neu registrierte, nicht verifizierte Benutzer nach
       einer festlegebaren Zeit expireAfterSeconds aus der Datenbank löscht
     - Siehe https://www.albertgao.xyz/2019/02/07/how-to-auto-delete-mongodb-records-after-certain-time-with-mongoose/
     - Siehe https://stackoverflow.com/questions/45783761/mongoose-conditional-ttl-for-document
     - Siehe https://stackoverflow.com/questions/35178356/create-a-conditional-ttl-in-mongo
     - Code dafür in benutzer.model.js: BenutzerModel.collection.createIndex({createdAt: 1},{expireAfterSeconds: 24*60*60,partialFilterExpression : {istVerifiziert: false}});
     - Dies removed alle Benutzer nach 24 h, bei denen das Feld istVerifziert false ist

137. **[DONE]** (Prio 3) Änderbare **Einstellungen** im Tab "Verwaltung" - siehe folgender Abschnitt "Internes Design". Für die Anzahl der
     Zeilen in den Tabellen bereits implementiert.
138. **[DONE]** (Prio 3) Bei **Datumswerten/Datumswertepaaren** in den Details bzw. der Neuanlage von Baueigenschaften (in baustoffe.vue,
     baueinheiten.vue und vorgabe-werte-tab-baueigenschaft-baueigenschafts-profil.vue) gibt es nach einer Änderung eines Datumswerts per Kalender einen Anzeigefehler - es
     wird statt des geänderten Datums "tt.mm.jjjj" angezeigt, obwohl der geänderte Wert korrekt abgespeichert wurde. Im Log erscheint eine Fehlermeldung, dass das Datumsformat falsch ist. Update 25.08.2020: Fehler ist weiterhin reproduzierbar! Update 29.09.2020: Fehler ist nicht mehr reproduzierbar.
139. ==**[TODO]**== (Prio 3) Bei Neuanlage einer Bauinformation mit gleichzeitigem Hochladen einer Datei für internen Link wird der interne
     Link zwar richtig gespeichert und die QTable im Tab "Übersicht" aktualisiert, die computed-Funktionen für den internen Link bemerken
     allerdings offenbar nicht reaktiv die Änderung in selectedRowsTableBauinformationen[0].internerLink, deshalb bleiben die beiden Buttons für das Öffnen des internen Links fälschlich disabled. ==**Update 31.08.2020**== (@sts): Die neu angelegte Bauinformation wird nicht direkt ausgewählt. Sobald man sie per Hand auswählt, funktioniert die Auswahl.
140. **[DONE]** (Prio 3) Nach Löschen einer Bauinformation müssen in bauinformationen.model.js per Pre auch die Referenzen darauf in
     Baueigenschaftsprofilen gelöscht werden.
141. **[DONE]** (Prio 3) Anpassungen in den Tabellen für zugeordnete Bauinformationen nach Vorlage in bauinformationen.vue:
     - Spalte für Autoren
     - Neues Arrangement für die Toggles
142. ==**[DEFER]**== (Prio 3) Man könnte auch schon beim Neuanlegen einer Bauinformation andere Autoren per QSelect zuordnen lassen.
     Da dies nach der Neuanlage im Tab "Baueigenschaft bearbeiten" problemlos möglich ist, ist dies nicht dringlich.
143. **[DONE]** (Prio 3) Den Button "Bauinformation bearbeiten" in Bauinformationen umbenennen in "Bauinformation anzeigen / bearbeiten"
     bzw. beim Öffnen des Tabs dafür durch einen nicht zum Bearbeiten berechtigten Mitarbeiter eine entsprechende Benutzernachricht anzeigen.
144. ==**[WORK]**== (Prio 2) Die q-scroll-areas um den Bauvorhabenbaum und Baustoffbaum haben eine feste Höhe (style = "height:
     1350px"), diese sollte variabel sein. Einstweilen gelöst mit "height: 60vh", muss weiter beobachtet werden. Aktuell ist 77vh für Testzwecke eingestellt. Anderer interessanter Vorschlag auf https://forum.quasar-framework.org/topic/5315/q-scroll-area-height:
     - The key I found was needing to have an absolute height set on at least one parent element.
     - What I ended up doing was attaching a Style-Fn to the q-page element…
       ```html
       <q-page class="column" :style-fn="styleFn"></q-page>
       ```
     - And then a function that sets absolute height instead of the default min-height:
       ```javascript
       styleFn(offset, height) {
          let pageheight = height - offset;
          console.log("PageHeight: " + pageheight);
          return "height: " + pageheight + "px";
        }
       ```
     - After that I found that the scroll area sized properly simply by adding the col class.
     - Letzteres meint vermutlich die Verwendung von flex column und q-scroll-area mit class="col"
     - Siehe auch https://forum.quasar-framework.org/topic/3756/best-practice-setting-up-q-scroll-area/5
     - Sowie https://codepen.io/dsl101/pen/jOOJNXK
145. **[DONE]** (Prio 2) Bug: In "Baueigenschaften/"Details zur ausgewählten Baueigenschaft" können bei Wertetyp "Aufzählungswert" dessen
     Optionswerte im QSelect unten nicht geändert werden.
146. ==**[DEFER]**== (Prio 3) Aktuell wird in baueinheiten.vue, initialisiereSelectOptionsUndSelectFilterOptionsAutorenAusgewaehlteBaueinheit() die benutzerRolle
     generisch als "Benutzer" angezeigt in den Options am QSelect, falls diese vom Elternknoten geholt werden. Stattdessen sollte die wirkliche benutzerRolle pro
     benutzerKennung aus der Datenbank geholt werden.
     Alternativen:
     - Statt in benutzerKennungenAutoren die Benutzerkennungen (d.h. E-Mail-Adressen) der Autoren zu halten wäre es besser, gleich Referenzen
       (ids) auf Benutzer zu halten und diese dann mit benutzerKennung und benutzerRolle zu populieren beim Laden der Baueinheit aus der Datenbank - analog zu
       relevevanteBauinformationen. Dies erfordert aber eine Migration der Datenbank (statt Array of String ein Array of ObjectId) im Feld benutzerKennungenAutoren.
     - Alternativ könnte man auch nur Mitarbeiter anbieten als Autoren statt alle Benutzer, damit würde das Feld benutzerRolle in den QSelect Options allerdings
       ganz überflüssig!
147. **[DONE]** (Prio 2) Bug: Nach einem Update der Angaben zu einem Benutzer in Verwaltung/Benutzer/Details zum ausgewählten Benutzerkonto (in details-tab-benutzer.vue)
     werden die Updates im QForm zwar korrekt im Backend gespeichert
     und die QTable im Tab "Übersicht" refreshed, allerdings zeigt das Tab "Details" nach Anzeige der Übersicht und Rückkehr nach Details die alten Werte vor dem Update
     an! Die Fehlerursache war ein Kopierfehler in einem Variablennamen in refreshBenutzer() - statt selectedBaueigenschaft muss es selectedBenutzer heißen.
148. **[DONE]** (Prio 2) Es fehlt noch
     - **[DONE]** eine Funktion **"Kennwort vergessen?"** unter "Registrieren/Anmelden/Abmelden", mit der das Kennwort zurückgesetzt werden kann (Password Reset)
       - Siehe https://stackoverflow.com/questions/20277020/how-to-reset-change-password-in-node-js-with-passport-js
         - Zweite Antwort von oben für Password Reset
         - Diese Funktion muss auf einer unauthenticated /Forgot-Route ein Form anzeigen, in die der Benutzer seine Benutzerkennung (d.h. E-Mail-Adresse) eingibt - heißt bei BIM.click /Kennwortresetanforderung
         - Bei valider Benutzerkennung muss ein Reset Token und Link generiert werden (analog zum Verification Token) und an die E-Mail-Adresse gemailt werden
         - Dieser Link muss auf einer unauthenticated /Reset-Route ein Form anzeigen, wo der Benutzer seine E-Mail-Adresse und das neue Passwort eingibt, bei BIM.click /Kennwortreset/:token
         - Bei valider Benutzerkennung muss dann die Passport local Mongoose Methode setPassword() aufgerufen werden
       - Siehe auch https://stackoverflow.com/questions/17828663/passport-local-mongoose-change-password
         - Passport local Mongoose setPassword() für Neu-Setzen des Passworts (als Teil des Password Reset)
         - Hinweis: Passport local Mongoose kann so konfiguriert werden, dass die Password und Salt Felder nicht von findByUsername() returned werden!
       - Siehe auch http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
         - Password Reset Tutorial
     - **[DONE]** eine Funktion unter "Einstellungen" zum **Ändern des Kennworts** (Password Change)
       - Sollte für authentifizierten Benutzer auf guarded Route /Authorisierung/Kennwortaenderung erfolgen
       - Sollte Passport local Mongoose Methode changePassword() aufrufen - siehe unten
       - Dafür eine API-Methode changeKennWortBenutzer() in authentifizierungController und back-end-server.routes.js eingebaut und entsprechendes Tab in einstellungen.vue
     - Allgemein: Siehe https://www.geeksforgeeks.org/nodejs-authentication-using-passportjs-and-passport-local-mongoose/
       - setPassword(password, ...) - für den ersten Fall oben - sollte wie die Verification nur von spezieller Route aus zugänglich sein, die per E-Mail an den User
         geschickt wurde
       - changePassword(oldpassword, newpassword, ...) - für den zweiten Fall oben
149. **[DONE]** (Prio 3) Beim Registrieren in my-layout.vue muss wie in "Verwaltung" ein zweites Kennwort-Feld hinzugefügt werden und geprüft werden, ob die Eingabe
     dort identisch ist mit der Eingabe im ersten Kennwort-Feld. Allerdings ist diese Funktion dort aktuell nur für angemeldete Administratoren enabled, ansonsten kann eine Registrierung von neuen Benutzern durch Administratoren unter "Verwaltung" erfolgen. ==**Update 02.02.2021**==: Das zweite Kennwortfeld wurde hinzugefügt - am 01.02.2021
     sind Registrierungen auf Heroku möglich, mit zusätzlichen Sicherheitsmaßnahmen (#285).
150. **[DONE]** (Prio 3) Das Feld "istAktiv" für Benutzerkonten unterstützen - inaktive Benutzer in authentifizierung.controller.js,
     loginBenutzer() nicht zur Anmeldung
     zulassen (Status 403, ähnlich wie 401 wie bei fehlender Registrierung). Das Feld im benutzer.model gleichzeitig von default: false
     auf default: true gesetzt, damit neue Benutzer als aktiv angelegt werden. Die manuelle Inaktivierung eines Kontos ist bereits möglich
     durch Administrator unter "Verwaltung".
151. ==**[TODO]**== (Prio 3) In "Einstellungen" > "Kennwort des Benutzerkontos ändern" werden nach Drücken des Buttons
     "Eingaben zurücksetzen" die 3 Eingabefelder auf null gesetzt.
     Dann kommen allerdings Validierungs-Fehlermeldungen - diese sollten wie beim initialen Laden des Tabs, wo diese Felder auch null sind, unterdrückt werden!
152. **[DONE]** (Prio 3) Bei der Neuvergabe des Kennworts in authentifizierung.controller.js, resetKennWortBenutzer() wurde der Token
     nicht gelöscht und konnte somit für eine erneute Kennwortänderung wiederverwendet werden (bis er nach 24 Stunden abläuft). Diesen nun aus
     Sicherheitsgründen gelöscht. ==Allerdings ist der Code dafür asynchron zur Kennwortänderung, eventuell nicht optimal.==
     Hinweis: Der Token bei der Verifikation der Neuregistrierung eines Benutzers wird bisher **nicht** gelöscht,
     allerdings ist eine wiederholte Verifikation mit demselben Token ungefährlicher als eine erneute Kennwortvergabe (mit eventuell
     anderem Kennwort).
153. **[DONE]** (Prio 3) Das NPM Package **web-push** am Backend konnte wieder entfernt werden. Es wurde nur für den Prototyp für Web Push Notifications gebraucht.
     Sockets mit NPM Package socket.io (npm install socket.io) am Frontend und Backend ist die bessere Lösung!
154. **[DONE]** (Prio 2) Fehler beim Deaktivieren: Wenn z.B. im Heesters-Senorenheim eine auch im Knoten darunter aktivierte Baueigenschaft deaktiviert wird, wird diese nur im Heesters-Seniorenheim deaktiviert, nicht im Knoten darunter! Gefixed durch
     Stefan am 15.07.20
155. **[DONE]** (Prio 2) Bug bei der Vererbung von bewegten Zweigen, siehe Testmatrix dafür, Marker [TEST FAIL] - Fix von Stefan positiv verifiziert am 21.07.2020.
156. **[DONE]** (Prio 2) In baueigenschaften.vue: Es erscheint im Browser Log nach eigentlich erfolgreicher Neuanlage einer Baueigenschaft per Tab "Neuanlage" der Fehler:
     - "TypeError: Cannot read property '\_id' of undefined" found in <DetailsTabBaueigenschaft> at src/components/details-tab-baueigenschaft.vue
     - bzw. TypeError: Cannot read property '\_id' of undefined at VueComponent.refreshBaueigenschaften
       Die Tabelle der Baueigenschaften wird dann nicht updated mit der neuen Baueigenschaft (erst Refresh zeigt diese an)
       Dagegen scheint der Refresh nach Neuanlage per Button unter der Tabelle zu funktionieren?
       Update 21.07.2020: Fehler lässt sich nicht reproduzieren. Update 25.08.2020: Fehler lässt sich reproduzieren. Update 29.09.2020: Fehler lässt sich nicht mehr reproduzieren.
157. **[DONE]** (Prio 3) In baueigenschaften.vue: Nach der eigentlich erfolgreichen Neuanlage einer Baueigenschaft per Tab erscheint manchmal KEINE Benutzernachricht - es müsste BAUEIGENSCHAFT_NEUANLAGE_ERFOLG angezeigt werden
     Update 21.07.2020: Fehler lässt sich nicht reproduzieren. Update 25.08.2020: Fehler muss neu reproduziert werden! Update 05.09.2020: Fehler lässt sich nicht mehr reproduzieren.
158. **[DONE]** (Prio 3) In baueigenschaften.vue: Bei erfoglreicher Neuanlage einer Baueigenschaft per Button erscheint eine Benutzernachricht BAUEIGENSCHAFT_AENDERUNG_ERFOLG - es müsste stattdessen
     BAUEIGENSCHAFT_NEUANLAGE_ERFOLG kommen
     Update 21.07.2020: Fehler lässt sich nicht reproduzieren. Update 25.08.2020: Fehler muss neu reproduziert werden. Update 05.09.2020: Fehler lässt sich nicht mehr reproduzieren.
159. **[DONE]** (Prio 3) In baueigenschaften.vue und baueigenschaftsprofile.vue: Es sollten am Ende nicht alleBauinformationen geholt werden sondern nur Extrakt davon! Dito bei der Weitergabe an die Kindkomponenten! Sonst zu viele Daten nur
     für die QSelects!!!
160. **[DONE]** (Prio 3) In vorgabe-werte-tab-baueigenschaft-baueigenschaftsprofile.vue, updateVorgabeWerteImBackend() fehlt catch-Block und Benutzernachrichten
161. **[DONE]** (Prio 3) In beschreibung-tab-baueigenschafts-profil.vue, updateBaueigenschaftsProfilBeschreibungAusgewaehltesBaueigenschaftsProfil() fehlen Benutzernachrichten. Kommentar sts: Sind eigentlich vorhanden. Update 25.08.2020: Fehler nicht mehr reproduzierbar.
162. **[DONE]** (Prio 3) In vorgabe-werte-tab-baueigenschaft-baueigenschaftsprofil.vue, updateVorgabeWerteImBackend() werden nach dem Axios-Call keine Benutzernachrichten ausgegeben - kann das dort eingebaut
     werden oder muss ein Event emittiert werden an baueigenschaftsprofile.vue, der dort behandelt wird
     per showErrorNotification()?
163. **[DONE]** (Prio 3) In details-tab-baueigenschaftsprofil.vue fehlt ein Button "Vorgabewerte anzeigen / bearbeiten" für die ausgewählte Baueigenschaft - das Kontextmenü ist vorhanden. Layout sollte
     identisch sein mit Buttons für "Aktionen für Baueigenschaften ->" unten in baueigenschaften.vue.
     sts: Der Button wurde eingebaut, so wie in "Zugeordnete Bauinformationen" in baustoffe.vue.
164. **[DONE]** (Prio 3) Im Tab "Details zur ausgewählten Baueigenschaft" eine aktivierte Baueigenschaft bearbeiten, die ihre Werte von einem definierten Elternknoten erbt. Der Wert kann im Input-Feld geändet
     werden. Dies sollte
     wenn möglich disabled werden, und es sollte idealerweise zusätzlich die Meldung angezeigt werden, dass die Werte ererbt werden und nicht geändert werden können, die auch beim Aktivieren erscheint. Diese
     Benutzernachricht gib es bereits: WERTEEINGABE_NICHT_MOEGLICH. Es kann "Speichern" gedrückt werden, was wegen der typbezogenen Felder okay ist. Beim Speichern wird wie gewünscht der geerbte Wert wieder
     eingetragen. Dadurch sind die Werte alle korrekt, allerdings ist die Benutzererfahrung irreführend. Update 25.08.2020: Fehler noch vorhanden. Update 29.09.2020: Fehler lässt sich nicht mehr reproduzieren.
165. **[DONE]** (Prio 3) Beim Neuanlegen einer Baueigenschaft kann eine leere Bezeichnung gespeichert werden - es kommt dann ein Fehler vom Backend - dies sollte aber bereits im Frontend validiert und zurückgewiesen werden
166. **[DONE]** (Prio 3) Beim Neuanlegen eines Baueigenschaftsprofils kann eine leere Bezeichnung gespeichert werden - es kommt dann ein Fehler im Log "Error in v-on handler" ohne Benutzernachricht - dies sollte aber bereits im Frontend validiert und zurückgewiesen werden
167. **[DONE]** (Prio 3) Komponenten für Baueigenschaftsprofile und Baueigenschaften haben keine einheitliche Fehlerbehandlung. Siehe auch Backlog Items #161, #162.
168. **[DONE]**(Prio 3) Beim Bewegen von Zweigen in Baustoffen und Vorlagen für Baueinheiten erscheinen noch keine Socket Aktualisierungsnachrichten - betrifft die Funktionen
     bewegeZweigBaustoff/Baueinheit() in den Controllern. **Update 26.08.2020:** In baustoffe.controller.js ist das Senden von Socket-Aktualisierungsnachrichten bei Status
     200 bereits implementiert und funktioniert. In beinheiten.controller.js wurden an diesen Stellen bisher noch keine Socket-Aktualisierungsnachrichten versendet.
     Dies ist aber nur dann sinnvoll, wenn es sich um ein Bewegen handelt, das den Bauvorlagenunterbaum ändert, nicht bei Bewegungen in Bauprojekten, die meist
     von unterschiedlichen Benutzern bearbeitet werden. Deshalb dort vor Senden von Status 200 jeweils Prüfung eingebaut, ob der neue Zielelternknoten im
     Bauvorhabenunterbaum ist - dieser Code war bereits vorhanden in Update-Methoden im Controller), und, nur falls ja, das Senden einer Socket-Aktualisierungsnachricht,
     dass sich die Vorlagen für Baueinheiten geändert haben. Erfolgreich getestet mit weiterem Client (im Edge-Browser), der die Aktualisierungsnachricht anzeigt (der das
     Bewegen auslösende Client im Chrome-Browser disabled ja den Empfang von Socket-Aktualisierungsnachrichten, damit er keine Nachrichten für Änderungen
     empfängt, die er selbst ausgelöst hat).
169. **[DONE]** (Prio 3) Beim Löschen von Knoten funktionierte die Funktion nodeTreeBaueinheitenIstImBauvorlagenunterbaumById() nicht, da in diesem
     Fall die id bereits gelöscht ist, der erste find liefert dann null zurück und die Funktion fälschlich false!!! Als Fix mit parentKnoten.\_id
     aufgerufen in deleteKnotenUndKindknotenBaueinheit().
170. **[DONE]** (Prio 2) Mit der neu eingeführten Boolean-Einstellung localStore.state.einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig gibt es noch Probleme - die QRadio Buttons in
     baueinheiten.vue dafür funktionieren nur mit val="true", daher ist beim API-Aufruf in Zeile 10737 auch Abfrage auf "true" statt true notwendig.
     Das ist vermutlich auch mit die Fehlerursache dafür, dass beim initialen Laden in Einstellungen die QRadio Buttons immer leer sind (dann kommt Boolean-Wert true/false vom Backend, danach setzt
     der Quasar QRadio Code vermutlich "true" und "false" dafür ein, so dass es dann funktioniert.
     Bei Aufruf mit "true" warf außerdem das Backend eine Exception:
     Aufruf kopiereZweigMitVererbungBaueigenschaften mit ueberschreibeWerteBaueigenschaftenAnZielknotenBeiKonflikt: true
     Start von kopiereZweig_VererbungsregelnDurchsetzenMitUeberschreibenInZielknoten
     Es ist ein Fehler aufgetreten
     TypeError: Cannot read property 'aktivierteBaueigenschaften' of undefined
     at kopiereZweig_VererbungsregelnDurchsetzenMitUeberschreibenInZielknoten (C:\Users\BIMIive\Documents\GitHub\bim-click\bim-click-back-end\app\controllers\baueinheiten.controller.js:5215:38)

     Fix 23.07.2020: Erster Fix-Versuch in einstellungen.vue an den QRadio Buttons, dort :val=false, nicht :val="false" (letzeres bindet Variable mit Namen false)!?!

     Update 24.07.2020: Allerdings waren damit zunächst beide Radio Buttons beim initialen Rendern des Tabs immer noch leer, obowhl (Debug Mode einschalten) localStore.state.einstellungenBenutzer.treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig den korrekten Wert enthält!

     Update 25.07.2020: Gefixed in einstellungen.vue mit :val="false" bzw. "true" (obige :val=false/true werden durch Prettify bzw. ESLint nach Format wieder dahin geändert - siehe Kommentare dort) UND Fix in my-layout.vue und einstellungen.vue zum Abspeichern
     dieses Boolean-Werts im Browser local Storage, wo diese Einstellungen ebenfalls gehalten werden, um nach einem Browser Refresh von dort retrieved zu werden und von dort wieder in
     globalStore abgelegt zu werden! Da local Storage nur String, nicht Boolean kennt, musste in den Code zum Speichern und Lesen dieser Werte in/aus dem local Storage eine Konvertierung eingebaut werden.

171. **[DONE]** (Prio 2) Fehler beim **Deaktivieren**: Deaktiviert man eine Baueigenschaft an einem Knoten, der einen ebenfalls aktivierten Elterknoten hat, sowie 2 weitere Kindknoten, die Blattknoten sein
     können (am einen ist sie deaktiviert, am anderen ist sie aktiviert), wird diese an dem Kindknoten, an dem sie aktiviert ist, **nicht deaktiviert!** Dies lässt sich auch mit nur einem aktivierten Kindknoten
     reproduzieren, der ebenfalls nicht deaktiviert wird. Dies liegt daran, dass beim Deaktivieren die \_id vom Subdokument genutzt wird, nicht die \_id der typbezogenen Baueigenschaft. Die ids dieser
     Subdokumente sind in den bei Server Start angelegten Baueinheiten und Baustoffen immer dieselbe (pro wertbezogene Baueigenschaft), bei mit createKindKnotenBaueinheit/Baustoff() erzeugten Objekten, sind
     diese pro Aufruf unterschiedlich.
172. **[DONE]** (Prio 2) Tests gemäß der Testmatrix für die Vererbung beim Bewegen von Zweigen in den Bäumen: Es gibt noch einige mit ==**[TEST FAIL]**== in der rechten Spalte markierte Testfälle im Fall b), wenn sich die am Ziel bereits vorhandenen
     Werte durchsetzen sollen. Möglicherweise haben die meisten davon dieselbe Fehlerursache. Das Testen der Fälle a) und b) kann bequem durch das mittlerweile fuktionierende Einstellung "Logik der Wertevererbung" im Tab "Einstellungen" gesteuert werden.
173. **[DONE]** (Prio 3) Im Tab "Baueigenschaften" im Hauptmenü werden beim Rücksprung von anderen Tabs in das Tab "Übersicht" dessen Einstellungen (Anzahl Zeilen in
     der Tabelle, Toggles für ausgewählte Spalten) neu gesetzt statt gemerkt. ==**Hinweis:**== Dies liegt daran, dass "Übersicht" eine eigene Komponente ist und diese
     aktuell sich nicht diese Einstellungen merkt. Dies müsste geändert werden, indem sich die Komponente diese Einstellungen merkt im global Store. Update
     ==**Update 30.11.2020**==: Die Anzahl der Zeilen in der Tabelle wird nun im global Store gemerkt, dito für Baueigenschaftsprofile (als selbstständige Komponente und eingebettet in baustoffe.vue und baueinheiten.vue).
174. **[DONE]** (Prio 2) Bug: Im Tab "Neuanlage einer Baueigenschaft" in Baustoffen und Baueinheiten funktioniert das Anlegen einer Baueigenschaft vom Wertetyp "Aufzählungswert" nicht - er wird als "Kennwert" angelegt!!!
     Im Tab "Baueigenschaften" funktioniert dieselbe Aktion!
175. **[DONE]** (Prio 2) Bug: Undefiniert-Machen eines Aufzählungswerts funktioniert nicht
176. **[DONE]** (Prio 3) Beim allerersten Aktivieren eines Baueigenschaftsprofils an einer Baueinheit gibt es noch ein Problem - es wird eine Meldung angezeigt, dass die Aktivierung erfolgreich war, aber
     in Wirklichkeit wurde eine Deaktivierung durchgeführt und die Checkbox "Ist aktiviert" ist dementsprechend ausgegraut. Bei einer wiederholten Aktivierung/Deaktivierung funktioniert es dann.
177. **[DONE]** (Prio 2) In "Baueinheiten" dürfen Benutzer mit Benutzerrolle "Mitarbeiter" keine Berechtigung haben, Änderungen an Baueigenschaftsprofilen durchzuführen - diese dürfen sie nur
     anzeigen, nicht ändern! Es handelt sich dabei um dieselben :disables für Benutzerberechtigungen, die schon im Hauptmenü "Baueigenschaftsprofile" implementiert sind
178. **[DONE]** (Prio 1) Aktivierung erfordert (kleineren) Rework, da es zur Zeit nur an Kinder der ersten Ebene vererbt wird.
179. **[DONE]** (Prio 3) Das Aktivieren und das Deaktivieren eines Baueigenschaftsprofils per Button (statt per Kontextmenü) funktioniert nicht
180. **[DONE]** (Prio 2) Beim Löschen von Baueigenschaftsprofilen müssen per .pre Middleware an allen Baueinheiten und Baustoffen die Referenzen auf das
     Baueigenschaftsprofil gelöscht werden. ==Hinweis: Eine Deaktivierung des Profils vor dem Löschen ist bisher nicht geplant.==
181. **[DONE]** (Prio 3) Das Aktivieren eines Baueigenschaftsprofils funktioniert nur per Button, nicht per Kontextmenü! Gemäß Meldungen im Server Log wird
     vermutlich beim Aktivieren per Kontextmenü versehentlich Deaktivieren ausgelöst?
182. **[DONE]** (Prio 2) Bei der Anzeige der Baueigenschaftsprofile an einer Baueinheit oder einem Baustoff gab es auf Heroku zwei Fehler:
     - Fehler 1: Es wurde die Fehlermeldung "Die Bauinformationen konnten nicht gelesen werden" angezeigt. Dies war verursacht durch unsaubere Catch-Logik in
       mounted von zuordnung-profile.vue - der Error dort entstand allerdings gar nicht beim Lesen des Extrakts der Bauinformationen, sondern weil in der Funktion
       prepareZugeordneteProfileTable() ein Error geworfen wurde, weil dort auf das auf MongoDB Atlas/Heroku in den Baueinheiten noch nicht vorhandene Feld zugeordneteBaueigenschaftsProfile
       zugegriffen wurde! Die Catch-Logik dort verbessert.
     - Fehler 2: Alle Dokumente für Baueinheiten und Baustoffe in der MongoDB Atlas Datenbank um dieses Feld zugeordneteBaueigenschaftsProfile erweitert, mittels MongoDB Shell
       (wie im internen Design beschrieben für das Feld benutzerKennungenAutoren in Baueinheiten):
       ```use test
          db.BaueinheitenCollection.updateMany( { }, { $set: { zugeordneteBaueigenschaftsProfile: [] }} )
          db.BaustoffeCollection.updateMany( { }, { $set: { zugeordneteBaueigenschaftsProfile: [] }} )
       ```
183. **[DONE]** (Prio 3) Problem mit den Toggles, die die angezeigten QTable-Spalten für die zugeordneten Baueigenschaften eines
     Baueigenschaftsprofils steuern:
     - In Baueigenschaftsprofile/Details zum ausgewählten Baueigenschaftsprofil/Zugeordnete Baueigenschaften am Baueigenschaftsprofil werden die Toggles
       links angezeigt, unabhängig davon, wieviele Spalten in der QTable angezeigt werden - das ist so in Ordnung.
     - In Bauvorhaben/Baueigenschaftsprofile/Details zum ausgewählten Baueigenschaftsprofil/Zugeordnete Baueigenschaften am Baueigenschaftsprofil
       werden die Toggles über die gesamte Breite der Scroll-Area verteilt, wenn per Toggle viele Spalten angezeigt werden, ebenso
       die Controls unterhalb der QTable. Die QTable selbst hat gar kein Scrollbar, sondern nur das Tab als Ganzes - das ist so nicht in Ordnung.
     - Da die Toggles selbst offenbar im selben Code in details-tab-baueigenschafts-profil.vue sind, muss dies vermutlich durch unterschiedlichen
       Kontext in den jeweils übergeordneten Komopnenten/Tabs, die diese Komponente aufrufen, ausgelöst werden. Die Komponente wird aufgerufen in
       - baueigenschafts-profile.vue (dort ist die Formatierung der Toggles und der Table in Ordnung)
       - zuordnung-profile.vue (dort ist die Formatierung der Toggles und der Table nicht in Ordnung)
     - Die zusätzliche testweise Hinzufügung des Styles für stickyColumnsTable2HeaderLines in details-tab-baueigenschafts-profil fixte das Problem
       ebenfalls nicht!
     - Ebenso eine testweise Änderung in zuordnung-profile.vue am Anfang im Template (<q-page padding>) in Angleichung an baueigenschafts-profile.vue.
       damit verschwindet aber die Scrollbar unten am Tab (bei vielen Spalten in der Table) ganz, daher wieder rückgängig gemacht! Hinweis auf
       https://quasar.dev/layout/page/#Usage: A QPage must be encapsulated by QPageContainer, which in turn must be a child of QLayout.
     - ==**Update 02.02.2021**==: Problem nicht mehr reproduzierbar
184. **[DONE]** (Prio 2) Bei im Pfad aktiviertem, aber eigentlich vermutlich überall undefiniertem **Aufzählungswert "Schicht: Schichttyp im Bodenaufbau"** in der lokalen Datenbank
     kann dieser Wert **nur an der Einstein-Schule** geändert werden, nicht an den anderen Baueinheiten, insbesondere nicht an den 9 Baueinheiten, die zum Test-Schichtaufbau unter
     Einstein-Schule/Obergeschoss/Klassenraum 1/Bodenaufbau gehören, an denen dieser Aufzählungswert
     eigentlich aktiviert ist, per Aktivierung des Profils für eine Schicht in back-end-server.js. Dies wurde von Stefan gefixed.
185. ==**[TODO]**== (Prio 3) Temporär den Export für Baueigenschaften an Baustoff umgestellt von CSV-Download auf JSON-Download - ggf. wieder zurückstellen (in baustoffe.
     controller.js)
186. **[DONE]** (Prio 3) Code für Generierung Baueigenschaftsprofil "Nutzungsprofil für Einzelbüro" in back-end-server.js wirft Exception - temporär disabled. Fehler
     war verursacht durch Typos in Baueigenschaftsbezeichunungen (z.B. "Raum: " statt "Raum: ", oder Trailing Blanks in Bezeichnungen), gefixed. Der
     "Abstand" des Auftreten solcher Fehler vom Array-Ende von myQueryResult dort zeigt an, wieviele Bezeichnungen in der Query ggf. fehlerhaft sind.
187. **[DONE]** (Prio 2) Der **Update von Vorgabewerten** aus Baueigenschaftsprofile > Details > Vorgabwewerte schlägt mit Error 500 am Backend fehl,
     egal ob vorher schon ein Wert definiert war oder nicht. Von Stefan gefixed am 30.09.2020.
188. **[DONE]** (Prio 2) **Löschungen** von bereits **zugeordneten Baueigenschaften** von **Baueigenschaftsprofilen** per QSelect schlagen
     fehl, egal ob direkt aus
     dem Tab für die Baueigenschaftsprofile oder aus Baueinheiten/Baustoffe > Baueigenschaftsprofile > Details > Zugeordnete Baueigenschaften. Die Backend-Methode kommt wohl mit Status 200 zurück, obwohl sie die Löschungen offenbar nicht ordentlich durchgeführt hat. Hinzufügungen
     funktionieren offenbar. Von Stefan gefixed am 30.09.2020.
189. **[DONE]** (Prio 3) Beim Versuch der Neuanlage einer Baueigenschaft im Tab Baueigenschaften > Neuanlage
     oder auch im Tab Baueinheiten bzw. Baustoffe > Baueigenschaften > Neuanlage mit einer schon vorhandenen
     Bezeichnung kommt eine generische
     Fehlernachricht "Fehler in Antwort vom Server" bzw. "Die neu angelegte Baueigenschaft konnte nicht gespeichert werden" statt
     der dafür vorhandenen Meldung (benutzerNachrichten.BAUEIGENSCHAFT_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS).
     Das Backend müsste dafür Status 403 statt 500 an das Frontend schicken! Eigentlich prüft der Code in createBaueigenschaft in
     baueigenschaften.controller.js dies sogar zuerst ab und schickt 403? Warum ist dieser Code nicht aktiv? Von Stefan gefixed am 30.09.2020.
190. **[DONE]** (Prio 3) Beim **Umbenennen** einer Baueigenschaft auf eine **bereits existierende Bezeichnung** kommt wie in #189.
     ebenfalls nur eine generische
     Fehlernachricht "Fehler in Antwort vom Server" bzw. "Die neu angelegte Baueigenschaft konnte nicht gespeichert werden" statt
     der dafür vorhandenen Meldung (benutzerNachrichten.BAUEIGENSCHAFT_NEUANLAGE_FEHLER_BEZEICHNUNG_EXISTIERT_BEREITS). Update 17.11.2020: Problem existiert noch. Update 25.11.2020: Gefixed. Ursache war fehlendes Handling im Backend.
191. **[DONE]** (Prio 3) Beim Aktivieren des Baueigenschaftsprofils "Nutzungsanforderungen für Einzelbüro" die **Vorgabewerte mit anlegen**
     in back-end-server.js, wie schon auch in anderen Testprofilen.
192. **[DONE]** (Prio 3) Wenn man in Baueigenschaften zunächst eine Baueigenschaft löscht, und danach sofort eine neue anlegt im Tab "Neuanlage"
     oder per Button, wird diese in der Übersicht nicht angezeigt (nur nach Refresh). Im Browser Log gibt es einen Fehler "Error in v-on handler: TypeError: Cannot read property '\_id' of undefined". Update 17.11.2020: Problem existiert noch. Update 25.11.2020: Gefixed. Ursache war fehlende Löschen der Auswahl der Table Baueigenschaften, nachdem das Löschen durchgeführt wurde. In anderen Worten: Die gelöschte Row war noch immer ausgewählt.
193. ==**[DEFER]**== (Prio 3) In Baueigenschaften/Details können für Aufzählungswerte die Optionen geändert und auch gelöscht werden für die
     typbezogene Baueigenschaft. Dies funktioniert auch.
     Allerdings wird keine Prüfung für existierende aktivierte Baueigenschaften gemacht, die ggf. gelöschte Optionen verwenden.
     Diese werden weiterhin angezeigt (können aber nicht neu per Dropdown ausgewählt werden). Es gibt keinen Fehler. Dieses Verhalten sollte
     überprüft werden. Ggf. sollten existierende Werte ebenfalls gelöscht werden. Dies würde aber eine Durchsuchen aller Baueinheiten und
     Baustoffe erfordern am Backend.
194. **[DONE]**(Prio 3) In "Details zur ausgewählten Baueigenschaft" im Tab Baueigenschaften: Keine Initialisierung der
     selektierbareOptionenAufzaehlungsWert und
     der selectFilterOptionenAufzaehlungswert - diese müssen anfangs gleich initialisiert werden, sonst werden keine Options im
     Dropdown-Menü angezeigt, sondern nur die QChips. Dies gefixed von MS im Rahmen des Reworks für das dense Layout. Hinweis: Sowohl im Tab
     "Neuanlage" wie im Tab "Details" befindet sich das QSelect für den Aufzählungswert im "new Value Mode" - damit kann eine Änderung
     von vorhandenen Options des Aufzählungswerts durchgeführt werden im Tab "Details zur ausgewählten Baueigenschaft"! Sieh aber #193 für Restriktionen!
195. ==**[TODO]**== (Prio 3) In importBaueigenschaften in baueigenschaften.controller.js müssen vor dem Import und nach dem Löschen
     der existierenden Baueigenschaften auch die Referenzen auf die
     existierende Baueigenschaften in **Baueigenschaftsprofilen** gelöscht werden, sonst enthalten diese korrupte Referenzen. Da beim
     Import aktuell dieses Löschen disabled ist (d.h. nur neue Baueigenschaften hinzugefügt werden, siehe #215), hat dies keine Priorität.
196. **[DONE]** (Prio 2) **Benutzerberechtigungen** müssen geprüft werden in Baueigenschaftsprofilformularen. Die vergleichbaren computed-Funktionen dafür
     in baueinheiten.vue und baustoffe.vue greifen auf den jeweiligen Baumknoten zu, speziell auf Felder wie Baumknotentyp und Autoren.
     Lösung: Zusätzliche Prop benutzerDarfBearbeitenSelectedNode in profilformular-generisch.vue - dieser wird aus der aufrufenden Komponente baueinheiten.vue
     (bzw. baustoffe.vue) der Stand dieser Berechtigung übergeben (dieser ändert sich normalerweise nicht während einer Bearbeitung), statt ihn
     neu zu berechnen in der Komponente (dazu reichen die bisherigen Parameter node und nodesTree wahrscheinlich nicht aus, da die computed-Funktionen für
     die Benutzerberechtigungen in baueinheiten.vue mit \$refs.treeBaueinheiten arbeiten!
197. **[DONE]** (Prio 3) Um für alle Felder in Baueigenschaftsprofilformularen die **fachliche Hilfe** für die entsprechende Baueigenschaft anzuzeigen, müssen alle
     QInput- und QSelect-Felder im Template von mit @focus-Events und -Methoden versehen werden, die die Eigenschaftsbezeichnung und -beschreibung in den
     global Store lädt, und dann das richtige Event für die fachliche Hilfe feuert, analog zur Vorlage in der Methode
     selectModelChangedAufzaehlungswertSchichttypImBodenaufbau() in profilformular-generisch.vue. Für QToggles gibt es keinen @focus-Event, daher dort @input-Event
     verwendet.
198. **[DONE]** (Prio 2) In Baueigenschaftsprofilformularen müssen Felder, die **nicht aktiviert** sind, oder
     die **am Elternknoten im Pfad definiert, d.h. ererbt** sind,
     **disabled** werden. Dafür sind Flags in profilModelAusgewaehlterKnoten zu setzen. Dies ist bisher im generischen Teil implementiert (Stefan)
     Im spezifischen Teil des Codes für Schicht ebenfalls nachgezogen (Michael).
199. ==**[TODO]**== (Prio 3)
     - a) **Baueigenschaftsprofile** in Kontextmenüs des Baustoffbaums in baustoffe.vue nachziehen
     - b) **Baueigenschaftsprofilformulare** in baustoffe.vue nachziehen - dort z.B. für Masken für Baustoffdatenblätter
     - c) **Bauinformationsprofile** auch in baustoffe.vue nachziehen - das Unter-Tab "Bauinformationsprofile" nach dem
       Unter-Tab "Zugeordnete Bauinformationen" fehlt dort noch
200. **[DONE]** (Prio 2) Diverse ToDos in submitWerteAnBaueinheit() in baueigenschafts-profil-formular.vue - siehe Kommentare dort im Code.
201. **[DONE]** (Prio 2) In Baueigenschaftsprofilformularen funktioniert das **Speichern von Aufzählungswerten** nicht. Code ist bereits auf Heroku!
     Wichtig für Demos! War falsche Abfrage in pruefeDefiniertheitVonEigenschaft(), musste "=== null" bei Aufzählungswert lauten.
     Zusätzlich Hotfix in erstelleMongooseUpdateQueryPartNewValuesObjekt().
202. ==**[WORK]**== (Prio 3) Im generischen Baueigenschaftsprofilformular muss die Anwahl und die Anzeige des **ausgewählten Profils** nachgearbeitet werden. ==Es sollten außerdem nur Profile im QSelect angeboten werden, die an der ausgewählten Baueinheit **aktiviert** sind!
     Daneben müssen die angezeigten Baueigenschaften im generischen Formular **nach der Baueigenschaftsbezeichnung sortiert werden** - dazu
     muss die Quasar-Sortierreihenfolge angewendet werden (Kleinbuchstaben sollten direkt nach ihren Großbuchstaben erscheinen).== ==**Update 21.10.2020**==: Sortierung
     wurde eingebaut, per QSelect kann ein Formular angezeigt werden (Default aktuell: "Allgemein > Test > Wertetypen"). Es fehlt noch die Möglichkeit, nur aktivierte Profile im QSelect
     anzubieten.
203. **[DONE]** (Prio 3) Beim Testen von Baueigenschaftsprofilformularen mit leerem Datumsfeldern kommt "Error in v-on handler: "TypeError: Cannot read
     property 'split' of undefined" - split in submitWerteAnBaueinheit() wird offenbar für datumsFeld1 null- oder undefined gemacht! Gefixed per null-Abfrage.
204. **[DONE]** (Prio 3) An q-input-Feldern für numerische Werte "type='number'" - Default ist 'text' - siehe
     https://quasar.dev/vue-components/input#Input-types - passend für Kennwerte/Kennwertepaare. ==**Achtung**==: Erfordert laut https://quasar.dev/vue-components/
     input#Input-of-number-type v-model.number statt v-model. Laut https://stackoverflow.com/questions/42111991/
     validating-input-with-vue-js-what-does-v-model-number-really-mean macht das aber nur eine NaN-Validation, nicht unbedingt notwendig, daher v.model.number
     vorläufig nicht implementiert. "type='number'" auch nachgezogen in baueinheiten.vue, baustoffe.vue und vorgabe-werte-tab-baueigenschaft-baueigenschafts-profile.vue.
205. ==**[TODO]**== (Prio 3) Wenn man an mehreren Kindbaueinheiten für einzelne Schichten unter einer Elternbaueinheit für einen Schichtaufbau
     nacheinander das Profil für "Schicht" aktiviert, wird im Tab "Bauvorhaben" > "Baueigenschaftsprofile" > "Übersicht aller
     Baueigenschaftsprofile" fälschlich auch
     in Kindbaueinheiten **unter** der Baueinheit, an der das Profil für "Schicht" aktiviert wurde angezeigt, dass dieses
     aktiviert ist. Auf Heroku so getestet -
     der Fehler kommt nicht immer! Lokal nicht reproduzierbar. ==**Update 02.02.2021**==: Mittlerweile werden
     Schichten unterhalb von Bodenaufbauten nicht mehr per Kontextmenü oder Button angelegt, sondern im neuen Profilformular
     "Bodenaufbau" per Button "Neue Schicht unten hinzufügen". Dort funktioniert das Anlegen von Schichten (mit
     gleichzeitiger Profilaktivierung) korrekt.
     Auch unter Schichten ist das Anlegen von weiteren Kindknoten per Kontextmenü oder Button disabled.
206. ==**[TODO]**== (Prio 3) In baueigenschafts-profil-formular.vue werden in readAlleProfile alle Daten für alle Profile geholt. Zur Performance-Optimierung
     eventuell zunächst nur einen Extrakt (Bezeichnung) holen, und erst bei Auswahl im QSelect das ganze Profil.
207. **[DONE]** (Prio 1) Beim Neuanlegen eines Baueigenschaftsprofils "Baueinheit > Standort" und Zuordnen aller mit "Standort: ..." bezeichneten Baueigenschaften
     kommt vom Server ein Error 500 "Payload too large" - dies könnte an den Tausenden von Kommunen liegen, die mit den Aufzählungswerten mitkommen!
     Derselbe Fehler kommt auch beim Speichern von Eigenschaften im Profil "Baueinheit > Standort". Behoben durch Heraufsetzen des Limits für Express per https://stackoverflow.com/questions/19917401/error-request-entity-too-large mit app.use(express.json({limit: '50mb'})); in back-end-server.js
208. **[DONE]** (Prio 2) Weitere Tests des Disablings von Feldern im Tab "Standort" > "Geopolitische Angaben"
209. **[DONE]** (Prio 2) Disabling/Enabling für Bundestaaten USA/Kanada, Australien fehlt noch
210. **[DONE]** (Prio 2) Aufzählungswerte ohne Vorgabewert werden nicht auf "undefiniert" gesetzt bei Aktivieren eines Baueigenschaftsprofils (Stefan).
     ==**Update 11.11.2020**==: Dieser
     Fehler ist offenbar behoben. Allerdings werden aktuell vorhandene Vorgabewerte von Aufzählungswerten beim Aktivieren des Profils nicht übernommen und die
     Baueigenschaft bleibt undefiniert, so wie Aufzählungswerte ohne Vorgabewerte!
     Ursache: Funktion pruefeDefiniertheitVonBaueigenschaft war noch auf altem Stand
211. ==**[TODO]**== (Prio 3) In Baueigenschaftsformular für Standort, submitWerteAnBaueinheit(), eventuell **Bestätigungs-Dialog** vor Speichern einfügen, da der Button "Speichern" alle Tabs speichert
212. ==**[TODO]**== (Prio 3) Mit **QCards** experimentieren: Diese können an QTabs und QTabPanels angelegt werden - siehe z.B. bauinformationen.vue als Vorlage.
     ==**Achtung**==: Innerhalb baueinheiten.vue und baustoffe.vue, die jeweils einen QSplitter enthalten,
     tritt damit das bekannte "doppelte horizontale Scrollbar-Problem" auf, wenn QTables in der QCard enthalten sind - daher kann dort in Unter-Tabs mit QTables bisher keine q-card verwendet werden, was
     leider das Layout uneinheitlich macht zwischen Unter-Tabs, die QTables enthalten, und solchen, die keine enthalten. Oft ist class="q-pa-xs" an der q-card hilfreich für Abstände zum Rand.
213. **[DONE]** (Prio 3) Im Tab "Baueigenschaften" wird das Tab "Übersicht" nicht refreshed nach Neuanlage einer Baueigenschaft im letzten Tab. Das Problem
     konnte allerdings nicht reprodziert werden.
214. **[DONE]** (Prio 2) NEU: Auch Aufzählungs- und Wahrheitswerte sollten das Feld bezeichnungsWert1 zusätzlich enabled haben - Änderungen dafür in
     baueinheiten.vue, baueinheiten.controller.js, baustoffe.vue, baustoffe.controller.js
215. ==**[TODO]**== (Prio 3) Aktuell ist in baueigenschaften.controller.js für den Import der Code so eingestellt, dass ==beim **Import
     von Baueigenschaften** die bisherigen Baueigenschaften **nicht gelöscht**== werden, um so zusätzliche Baueigenschaften nach Heroku importieren zu können.
     Z.B. ist eine solche Import-Datei baueigenschaften-standort-neue-importiert-nach-heroku-20201020.json, diese Import-Dateien einfach dem Backend-Ordner \tmp\upload in Github hinzufügen und per Github nach Heroku replizieren, danach auf Heroku per Datenaustausch/Import
     die Datei importieren (Dateiname in das Feld "Baueigenschaften (für Baustoffe und Baueinheiten" eingeben).
     Dabei muss jedoch auf Korrektheit der importierten Eigenschaften geachtet werden, und dass diese keine Duplicates enthalten zu existierenden! Der Import sollte mittels Heroku Backend Server Log überwacht werden, dass das Frontend sofort returned, während
     am Backend noch Promises laufen. Außerdem müssen die Baueigenschaften nach dem Import ggf. manuell
     aktiviert werden und je nach Bedarf manuell Baueigenschaftsprofilen hinzugefügt werden. Dieser Workflow wurde mehrfach
     erfolgreich durchgeführt.
216. **[DONE]** (Prio 3) Lokal und auf Heroku kann die Baueigenschaft "Baueinheit > Standort > Infrastruktur > Strom > Hausanschluss > Nennstrom" an
     der Einstein-Schule nicht editiert werden im Baueigenschaftsprofilformular "Standort" > "Bauordnungsrechtliche Angaben", obwohl
     sie an der Wurzel des Bauvorhabenbaums eigentlich undefiniert ist. Liegt es daran, dass sie in den typbezogenen Feldern
     die Einheit und das Symbol gesetzt hat? Es kommt beim ebenfalls vergeblichen Versuch, sie im Tab "Baueigenschaften an Baueinheit" an der
     Einstein-Schule zu editieren die Meldung, dass ihre Werte von einer Elternbaueinheit ererbt werden, was falsch ist!
     Update 23.10.2020: Problem ist auf Heroku reproduzierbar, nicht jedoch lokal. Ursache war, dass auf Heroku diese Baueigenschaft an
     der Einstein-Schule nicht aktiviert war (nach dem Hinzufügen als neue Baueigenschaft), daher eventuell kein Defect.
     ==**Update 27.10.2020**==: Problem lässt sich auf Heroku auch mit "Radon-Konzentration" reproduzieren - allerdings ist diese
     sowohl an der Wurzel als auch in der Einstein-Schule aktiviert! Mit einem Deaktivieren und Rekativieren kann das Problem
     eventuell beseitigt werden! Dies lag daran, dass internalCreateBaueigenschaft() beim Aufruf aus dem Import die Baueigenschaft am Wurzelknoten des BVB
     immer als definiert eintrug, selbst bei leeren Wertefeldern. Dies war sogar unabhängig vom Wertetyp. Gefixed in
     internalCreateBaueigenschaft() durch neue Funktion pruefeDefiniertheitVonEigenschaft(). Dabei gleich #222 berücksichtigt! Auf Heroku
     mussten die betroffenen Baueigenschaften manuell deaktiviert und dann aktiviert werden als Korrektur.
217. **[DONE]** (Prio 3) Landkreise pro Bundesland hinzufügen im Tab "Standort" > "Geopolitische Angaben" -
     siehe https://de.wikipedia.org/wiki/Liste_der_Landkreise_in_Deutschland - erledigt, aber beim Switch von Deutschland auf ein
     anderes Land werden die Kreise und Kommunen nicht resetted! Latenter Fehler in Zeile 7692 in baueinheit-standort-baueigenschafts-profil-formular.vue, dort gefixed.
218. ==**[TODO]**== (Prio 3) Landkreise auch für Stadtstaaten? Baueigenschaften bereits definiert, aber keine Felder im Tab "Geopolitische Angaben" dafür.
219. **[DONE]** (Prio 3) Karten für Wasserversorgung in BW (https://www.lw-online.de/fileadmin/lwonline/redaktion/bilder/trinkwasser/grafiken/grafik_fernleitung_versorgungsbereich.svg) und Karte für Schlagregenzonen in D in fachliche Hilfe aufnehmen -
     erledigt auf Heroku für BEg "Baueinheit > Standort > Infrastruktur > Trinkwasser > Versorger"
220. **[DONE]** (Prio 3) Karten für Erdbebenzonen und Untergrundklassen in fachliche Hilfe aufnehmen
     (https://de.wikipedia.org/wiki/Erdbebenzone#/media/Datei:Erdbebenzonen.png) - erledigt auf Heroku für BEg "Standort >
     Hydrogeologie > Boden > Erdbebenzone"
221. ==**[TODO]**== (Prio 3) Bei Kennwertepaaren werden beim Import nicht die Werte für baueigenschaftsBezeichnung1/2 übernommen, z.B. bei
     Baueigenschaft "Baueinheit > Standort > Hydrogeologie > Wasser > Grundwasser > Schwankungsbereich)"
222. **[DONE]** (Prio 3) mask="0,##" an q-inputs schlägt in baueinheit-standort-baueigenschafts-profil-formular.vue beim Speichern fehl, mask="0.##"
     funktioniert dagegegen - Problem liegt eventuell am Backend/Mongoose? Problem ist, dass mask nur für Textfelder verwendet werden kann - für
     Integers oder Dezimalzahlen ist es nicht geeignet - siehe https://quasar.dev/vue-components/input#Mask. Daher alle solchen masks, außer die für Bezeichnungswerte, entfernt.
223. **[DONE]** (Prio 3) Das generische Baueigenschaftsprofilformular wirft noch einen Fehler "Error in render: "TypeError: Cannot read
     property 'baueigenschaftsProfilBezeichnung' of null" beim Zugriff auf ausgewaehltesBaueigenschaftsProfil.baueigenschaftsProfilBezeichnung
     in der Überschrift des Forms. Per v-if behoben.
224. **[DONE]** (Prio 3) Das generische Baueigenschaftsprofilformular wechselt nach dem Speichern aus dem Profil "Baueinheit > Standort" in das Profil "Allgemein > Test > Wertetypen"
225. **[DONE]** (Prio 3) Restarbeiten im Profilformular für Standort: Baueigenschaften für geografische Höhe per Word-Dokument:
     - 2.9.1.2 **Grundstücksfläche** (m<sup>2</sup>)
       - **"Baueinheit > Standort > Geografie > Grundstück > Fläche**
       - Siehe auch https://www.bau-doch-selber.de/bautipps/din277-grundstueck.html
       - Ist auch nach DIN 277 festgelegt, d.h. es könnte auch in "Baueinheit > Standort > Recht > Städtebau > Grundstücksfläche (GF)" eingeordnet werden, ist
         allerdings ein Istwert im Gegensatz zu den Sollwerten, die dort schon definiertr sind (städtebauliche Kennzahlen, z.B. BGF, GFZ, etc.)
     - 2.9.2.4 **Höhe GOK (Geländeoberkante) über NHN (Normalhöhennull)** (= Referenzpunkt des Grundstücks)
       - **"Baueinheit > Standort > Geografie > Grundstück > Höhenlage"**
       - https://de.wikipedia.org/wiki/Normalh%C3%B6hennull - NHN ersetzte NN in Deutschland!
       - https://de.wikipedia.org/wiki/Gel%C3%A4ndeoberkante#:~:text=Gel%C3%A4ndeoberkante%20(oft%20abgek%C3%BCrzt%20GOK)%20oder,Erdoberfl%C3%A4che%20auf%20dem%20trockenen%20Land
       - https://de.wikipedia.org/wiki/Gel%C3%A4ndeoberfl%C3%A4che
       - Diese wird in Metern über dem NHN gemessen
     - 2.9.2.5 Festlegung des Nullniveaus 0,00 = Höhe GOK über NHN (==**[TODO]**==: Ist dies dasselbe wie 2.9.2.4?)
     - 2.10.3 **Im Mittel gemessene Höhenlage** = arithmetischen Mittel der Höhenlage der Geländeoberfläche an den Gebäudeecken (für
       Brandschutz)
       - **"Baueinheit > Standort > Geografie > Grundstück > Im Mittel gemessene Höhenlage"**
     - ==**Hinweis:**== Sonstige Größen sind Anforderungen/Eigenschaften des **Gebäudes**, z.B. **Gebäudehöhe**
       - https://de.wikipedia.org/wiki/Geb%C3%A4udeh%C3%B6he - Gebäudehöhe
     - Quellen dafür: Lage- und Höhenplan vom Vermessungsingenieur, Lageplan als Teil des Bauantrags (1:500)
       - https://www.wuttke-vermessung.de/leistungen/leistung/bauantrag-amtlicher-lageplan.html
226. **[DONE]** (Prio 3) Restarbeiten im Profilformular für Standort: Gefährdungsklasse für Hölzer nach DIN 68800,
     https://informationsdienst-holz.de/fileadmin/Publikationen/2_Holzbau_Handbuch/R05_T02_F02_Holzschutz_Bauliche_Massnahmen.pdf -
     Gebrauchsklassen GK 0 bis GK 5, zum Tab "Umweltbezogene Angaben" hinzugefügt in Rubrik "Luftqualität am Standort"
227. ==**[WORK]**== (Prio 3) Restarbeiten im Profilformular für Standort: Google-API-Aufrufe für Ermittlung Koordinaten aus Adresse, Höhe,
     Plus Code, Aufrufe Google Maps mit Koordinaten und Plus Code, Aufruf topografische Karte mit Koordinaten - Code übernehmen
     aus "Bauvorhaben (Preview) - DONE außer Plus Code (neues Feld dafür erforderlich). Beim Geocoding der Geokoordinaten aus Adresse ist
     ist das Google Billing zu klären, oder neuer API Key für michael.scheible@bimlive.de - bisheriger läuft auf michael.g.scheible@gmail.com)
228. ==**[DEFER]**== (Prio 3) Quasar **Masks** zur **Field Validation** ausprobiert an q-input-Feldern in baueinheit-standort-baueigenschafts-profil-formular.vue
     - https://quasar.dev/vue-components/input#Mask.
     - Funktioniert für Textfelder, z.B. die Postleitzahl (mask="#####")
     - Bei Kennwerten gibt es jedoch erhebliche Probleme damit:
       - Wie können eine oder mehrere Ziffern vor dem Dezimalpunkt erlaubt werden?
       - Wie werden leading und trailing Zeros in Dezimalzahlen behandelt (erforderlich z.B. bei Geokoordinaten)?
     - Beispiel: mask="#.#######", fill-mask
       - Dies erlaubt nur die Eingabe von einer Ziffer vor dem Dezimalpunkt, trailing Zeros
         hinten sind dabei dagegen erlaubt, sie werden beim Speichern abgeschnitten: Gibt man 9.666000 ein, wird korrekt 9.666 abgespeichert,
         und anschließend 9.666\_\_\_ angezeigt. Problem dabei: Man kann dann vor dem Dezimpalpunkt nicht wie gewünscht mehrere Ziffern eingeben!
     - Beispiel: mask="###.#######", fill-mask
       - Dies erlaubt die Eingabe von genau drei Ziffern vor dem Dezimalpunkt, leading Zeros führen zu Fehler beim Speichern:
         Gibt man 045.666 ein, wird dies erst gar nicht gespeichert!
     - Beispiel: mask="#.#######", fill-mask, reverse-fill-mask
       - Das "#." in Verbindung mit reverse-fill-mask erlaubt zwar die Eingabe von einer <b>oder</b> mehreren Ziffern vor dem Dezimalpunkt.
         Problem dabei: Es werden dann trailing Zeros hinten nicht korrekt behandelt - gibt man 48.666000 ein, wird zwar korrekt 48.666 abgespeichert, aber
         anschließend \_.\_48666 angezeigt!
     - Beispiel: mask="#.# , fill-mask, reverse-fill-mask
       - Problem dabei: Es können vor dem Dezimalpunkt zwar beliebig viele Ziffern eingegeben werden, nach dem Dezimalpunkt kann aber nur eine Stelle
         eingegeben werden!
     - Beispiel: mask="###.#######", fill-mask
       - Problem dabei: Bei Eingabe von 045.666000 wird 456.66 abgespeichert und 456.66\_\_\_\_ angezeigt!
     - ==**Achtung**==: Offenbar ist der obige Punkt in den Masks gar kein Dezimalpunkt, sondern lediglich ein beliebiges Trennzeichen!!!
       Daher kann Mask für Dezimalzahlen nicht sinnvoll verwendet werden, nur für die Formatierung von Telefonnummern etc.!!!
     - ==Unter https://quasar.dev/vue-components/input#Mask wird bestätigt, dass Quasar Mask nur für Textfelder verfügbar ist!!!==
     - ==**Achtung**==: Bei Verwendung von mask="..." muss type"number" entfernt werden, sonst Konflikte!!!
     - Daher einstweilen die Q-Input-Felder für Kennwerte wieder auf type="number" umgestellt!
     - Weitere Hinweise für Zahlen mit Dezimalpunkt:
       - https://stackoverflow.com/questions/39782176/filter-input-text-only-accept-number-and-dot-vue-js
         - Als eine der Lösungen dort wird empfohlen type="number" am (Q)Input-Feld dafür zu nehmen
         - Dies gestestet an den Geokoordinaten im Baueigenschaftsprofilformular baueinheit-standort-baueigenschafts-profil-formular.vue im Tab "Standort" > "Lageangaben":
         - Tatsächlich erlaubt der Browser mit type="number" keine Texteingabe, dafür Dezimalzahl-Eingaben wie 48.87619 oder 9.389161 bzw. 48,87619 oder 9,389161 - es wird
           beides akzeptiert und funktioniert beides!
         - Allerdings erscheinen dann die für Dezimalzahlen möglicherweise irreführenden Auf- und Abwärtspfeile (Spinners) am Eingabefeld, die den Eingabewert immer nur in ganzen Zahlen
           in- bzw. dekrementieren
         - Diese versucht, per selektiver CSS per class="no-spin" zu entfernen, funktioniert aber am Quasar QInput, warum auch immer, so nicht:
           - https://stackoverflow.com/questions/33749896/hide-html5-input-type-number-arrow-with-a-css-class
         - Stattdessen vorläufig die Spinners per CSS an ALLEN Input-Feldern mit type="number" in dieser Komponente entfernt!
           - https://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box
         - Zur Beeinflussing des Inkrements/Dekrements an den Spinners gibt es laut
           https://stackoverflow.com/questions/48892570/please-enter-a-valid-value-the-two-nearest-valid-value-is noch step="any" für
           type="number" - damit wird dann ggf. nur der Wert vor dem Dezimalpunkt inkrementiert bzw.
           dekrementiert - dies später wieder hinzugefügt an die q-inputs mit type="number"
     - Für Textfelder (Bezeichnungswerte) kann zum Teil die Vue Property maxlength="6" (Beispiel) verwendet werden
     - Alternativen:
       - Angepasste Quasar Mask Helper-Funktion? https://github.com/quasarframework/quasar/blob/dev/ui/src/mixins/mask.js#L2 - erfordert Mixin?
       - Externe Validation Library? Von Quasar wird Vuelidate empfohlen - https://vuelidate.js.org/
         - https://medium.com/quasar-framework/adding-validation-to-quasar-based-forms-5391cee48c20 - Quasar mit Vuelidate
         - https://medium.com/@email_47764/quasar-form-validation-with-vuelidate-b3aeb3d27fc2
         - https://forum.quasar-framework.org/topic/2980/q-tabs-and-vee-validate/4 - Vuelidate empfohlen over Vee Validate
       - QDecimal, ist noch experimentell: https://www.npmjs.com/package/quasar-app-extension-qdecimal
       - VMoney: https://www.npmjs.com/package/v-money (problematisch per Tests)
       - VueAutoNumeric: https://github.com/autoNumeric/vue-autoNumeric - besser als VMoney (verwendet nach Tests)
229. **[DONE]** (Prio 3) In baueigenschaften.vue funktionieren die Buttons für Anzeigen/Bearbeiten und Löschen nicht richtig, sie
     bleiben disabled, nachdem eine Baueigenschaft in der Tabelle ausgewählt ist! Dasselbe Problem besteht oben bei den Tabs. Per Log
     wird changeSelectionAusgewaehlteBaueigenschaft() bei der Auswahl einer Zeile in der Tabelle nicht aufgerufen (nur bei Auswahl eines
     Kontextmenüs)! ==Die ausgetauschten Events zwischen baueigenschaften.vue und uebersicht-tab-baueigenschaften.vue sind zu dokumentieren!
230. **[DONE]**(Prio 3) QSelect für Bauwerkszuordnung (BWZ) in nested QSelect umwandeln. Vorlage: https://codepen.io/mickey58/pen/oNjaQQR?editors=1111
     Das QSelect der oberen Levels machte zunächst Probleme, da der @click-Event von einem unteren Level offenbar weiter oben überschrieben wurde. Die neue Version benutzt
     v-fors per divs wie im Inhaltsverzeichnis der Dokumentation, damit ist der Code besser lesbar als in der ursprünglichen Variante. Für die
     neue Variante existiert auch ein Codepen: https://codepen.io/mickey58/pen/yLJEJNG. die BZW-Options sind in neuer Datei
     bauwerks-zuordnungen-hierarchisch.js. ==**Hinweis**==: Diese Datei muss stets genau dieselben String-Werte für die hierarchisch gruppierten Options enthalten, wie die linear definierten Options, die in baueigenschaften.js für die Baueigenschaft für die Bauwerkszuordnungen definiert sind. Diese zog ursprünglich bauwerks-zuordnungen.js an, enthält aber wegen der häufigen Notwendigkeit, JSON daraus zu erzeugen, aktuell die Werte direkt als Strings!!!
231. **[DONE]** (Prio 3) "clearable" Prop an QSelects hinzufügen - DONE für Baueigenschaftsprofilformulare: Standort, Schicht, generisches
232. **[DONE]** (Prio 3) "multiple" für Mehrfachauswahl am QSelect hinzufügen an Expositionsklasse für Beton in Standort - ==**Achtung**==: Eigentlich ist das ein
     Bauteilattribut, kein Standortattribut! Vorläufig unter "Standort" belassen. Dasselbe gilt für die Gefährdungsklasse für Holz!== Auch für
     die Gefährdungsklasse bei Holz und die Bodenklasse "multiple" erlaubt.
233. **[DONE]** (Prio 3) Zusätzliche Option "CX" in Luftkorrosivitätskategorie in Standort - extreme Korrosivität, z.B. für Offshore-Anwendungen
     - Siehe https://www.korrosionsschutz-kann-mehr.de/beschichtungssysteme/cx.html
234. **[DONE]** (Prio 3) Im Tab "Hydrogeologische Angaben" sollte die Rubrik "Wasser" vor "Boden" verschoben werden
235. ==**[TODO]**== (Prio 3) Die Versionsinfo rechts oben ist auf Smartphone-Bildschirmen übermäßig groß!
236. **[DONE]** (Prio 3) In den spezifischen Baueigenschaftsprofilformularen (bisher: Standort, Schicht) sollte eine Benutzernachricht angezeigt werden,
     falls das zugehörige Baueigenschaftsprofil nicht gefunden wurde!
237. ==**[TODO]**== (Prio 3) schicht-baueigenschafts-profil.vue holt alle Baueigenschaftsprofile per API statt nur das für die Schicht!
     Angleichen an standort-baueigenschafts-profil.vue.
238. ==**[TODO]**== (Prio 3) Bezeichnungsfeld für Gliederungsnummern einführen an Baueigenschaftsprofilen ("1", "2.1", etc.), mit dem
     diese in der QTable separat von der Baueigenschaftsprofilbezeichnung sortiert werden kann - alternativ ist es vermutlich sinnvoller,
     die Baueigenschaftsprofilbezeichnung zu belassen und einen zusätzlichen Anzeigetext einzuführen wie für Baueigenschaften und Bauinformationen.
239. **[DONE]** (Prio 2) Screen Space auf Laptop-Bildschirmen: Viele Masken sind vertikal zu lang, so dass die Buttons unten
     nur durch Scrollen erreichbar sind. Buttons verschieben? Split oder Twisties für einige zu lange Masken noch erforderlich.
     Weitgehend gelöst durch engeres Tableisten- und Masken-Layout, z.B. class="q-pa-xs q-col-gutter-xs"m mit "-Xs stat "-md".
     - **[DONE]** Sämtliche Layouts inklusive der Tableisten optimiert in baueinheiten.vue und baustoffe.vue
     - **[DONE]** Update 24.11.2020: Dies auch in Baueigenschaften, Baueigenschaftsprofile, Bauinformationen, etc. nachgezogen!
     - Hinweise:
       - Neues Format der q-tabs:
         - class="q-pa-none text-black bg-grey-4 full-width" active-color="primary" active-bg-color="white" content-class="text-h7" dense align="left"
       - Neues Format der q-tab-panels:
         - class="q-pa-xs full-width" (in Einzelfällen auch "q-pa-sm")
240. **[DONE]** (Prio 3) "Land" hinzufügen zu Standort > Lage > Anschrift. Die Baueigenschaft dafür wurde bereits angelegt, auch auf Heroku. Feld
     hinzugefügt in Profilformular "Standort".
241. ==**[TODO]**== (Prio 3) Mit :reveal-offset am q-header experimentieren, eventuell obere Tableiste aus dem Header herausnehmen, so dass nur das
     Logo verschwindet? Aktuell ist Offset auf "15" zum Ausprobieren auf Laptops.
242. ==**[TODO]**== (Prio 3) In "Zugeordnete Baustoffe/Rohstoffe" ist noch eine Scroll Area mit aktuell fester Höhe!
243. **[DONE**]\*\* (Prio 2) Beim Speichern eines Vorgabewerts für eine Baueigenschaft in einem Profil kommt es zu einem Refresh-Fehler.
     Eventuell durch Änderungen der Refresh-Events verursacht? Nein! Die Ursache war ein Button mit type="submit" in
     vorgabe-werte-tab-baueigenschaft-baueigenschafts-profil.vue! Duplicate von #120 oben.
244. **[DONE]** (Prio 2) details-tab-baueigenschafts-profil.vue emittiert this.\$emit("neuanlage-request-baueigenschafts-profil") - wo ist der Event Handler
     dafür? Hieß vorher neuanlageRequest, ebenfalls ohne Catcher. Wird nach Stefan nicht mehr gebraucht, daher disabled. Ähnlich in Schwesterkomponente uebersicht-tab-baueigenschafts-profile.vue, contextMenuSelectionHandler() - dort die Events verifiziert auf Korrektheit (Event-Namen müsssen kebab-case sein! Allerdings gibt es im Code an vielen Stellen noch Events, die keine Cross Component Events sind, die nicht in kebab-case sind (z.B. @click-Events).
     ==**Achtung [TODO]**==: Die Komponente baueinheit-bodenaufbau-baueigenschafts-profil-formular.vue hat ebenfalls noch Cross Component Events, die nicht kebab-case sind - siehe deren Aufruf in baueinheiten.vue!
245. **[DONE]** (Prio 2) "keep-alive" an der obersten Tab-Zeile (q-tab-panel) in baueinheiten.vue, baustoffe.vue, bauinformationen.vue,
     baueigenschaften.vue - dies erhält den Zustand der Unter-Tabs in jeweils der
     ersten grauen Tab-Zeile unter dem Hauptemenü für diese Komponenten. Weiteres keep-alive an q-tab-panel in
     baueigenschafts-profile-tab-baustoffe-und-baueinheiten.vue
     eingefügt. ==**Achtung [TODO]**==: An den q-tab-panels in baueigenschafts-profile.vue ist aktuell **kein keep-alive** möglich. Grund: Wenn eine Baueigenschaft für ein in
     "Übersicht" ausgewähltes Profil zunächst in "Vorgabewerte" bearbeitet wird, und dann im Tab "Übersicht" das Profil gewechselt wird, bekommt das Tab
     "Vorgabewerte" diese Änderung nicht mit und zeigt eine leere Baueigenschaft an (Fehler). Keep-alive ist auf dieser unteren Ebene nicht unbedingt
     notwendig, verwirrt eventuell sogar, weil der Benutzer dann eventuell gar nicht mitbekommt, dass er das Profil gewechselt hat (weil das Tab dasselbe
     bliebe). Wenn keep-alive gewünscht würde, müsste die Komponente für die Vorgabewerte diesen Fall explizit handlen.
246. **[DONE]** (Prio 3) Das Speichern im Baueigenschaftsprofilformular für Schicht wurde von Stefan für Testzwecke durch eine andere Methode ersetzt,
     ohne dass man das beim Drücken des Buttons merkt. Aktuell ist bei Anwahl einer Einzelschicht im Bauvorhabenbaum gar keine Speicherung mehr möglich (nur als Teil des überarbeiteten Profilformulars "Bauvorhaben"). Es muss entschieden
     werden, wie mit den Buttons für das Speichern/Zurücksetzten in den Einzelschichten verfahren wird. Entscheidung: Soll vorläufig nicht
     wieder enabled werden - Begründung siehe #253.
247. **[DONE]** (Prio 3) Beim Anlegen einer neuen Schicht im Bodenaufbau wird nicht abgefangen, wenn die Schicht dieselbe Bezeichnung wie eine vorhandene Schicht hat.
     Das Problem besteht auch im Backend - es wird kein Status 403 vom Backend gemeldet in diesem Fall!
248. **[DONE]** (Prio 3) Im Schichtaufbau/Bodenaufbau sollte das Aufklappen der Expansion Items für eine Schicht (Arrow rechts) und das Selektieren einer Schicht
     (Anklicken des Headers) voneinander getrennt werden, damit
     nicht z.B. für das Verschieben einer Schicht immer die Schicht aufgeklappt werden muss, und dabei die Buttons für das Verschieben nach unten
     verschwinden und gescrolled werden muss. Dies ist per expand-icon-toggle auch möglich (siehe Inhaltsverzeichnis Doku), funktionierte aber zunächst
     nicht zusammen mit dem VSlot für den Header in den Expansion Items für die Schichten. Lösung: @click-Event auch an q-icon und q-item-section im Template
     für den Header Slot.
249. **[DONE]** (Prio 2) Der Button für das Speichern des Gesamtbodenaufbaus (ganz unten) speichert aktuell zwar korrekt
     die Eigenschaften des Bodenaufbaus, nicht aber die der Einzelschichten
250. ==**[TODO]**== (Prio 3) Das Speichern des Gesamtbodenaufbaus (ganz unten) passiert bisher über 2 API Calls, die aus Gründen
     der Transaktionalität in einen API Call gemerged werden sollten
251. **[DONE]** (Prio 3) In allen Baueigenschaftsprofilformular-Komponenten muss die Property benutzerDarfBearbeitenSelectedNode
     angeschaut werden, ob diese reaktiv auf Änderungen reagiert. Da diese ursprünglich eine per computed() berechnte Funktion am
     ausgewählten Knoten ist und per Prop an die Kindkomponenten weitergereicht wird, müsste sie tatsächlich wie gewünscht
     reaktiv updated werden auch in den
     Kindkomponenten! Analog zum Verhalten auf https://codepen.io/mickey58/pen/NWxdqKO.
252. **[DONE]** (Prio 2) Felder für Kennwerte und Aufzählungswerte im neuen Bodenaufbau sind disabled im neuen Bodenaufbau, weil diese
     durch einen Fehler im Backend an der indirekten Elternbaueinheit (Einstein-Schule), wo sie bei Neuanlage und Aktivieren in back-end-server.js
     fälschlicherweise gleich mit auf "definiert" gesetzt wurden, und daher die (meist gar nicht vorhandenen) Werte an die Kindbaueinheit
     für den Bodenaufbau vererbt wurden bzw. diese Felder dann disabled wurden für die Eingabe wegen der Vererbung von der Elternbaueinheit.
     Gefixed in baueinheiten.controller.js: Dort für Kennwerte Test auf "eigenschaft.bezeichnungsWert1/2 == null" statt "=== null",
     für Aufzählungswerte Test auf "eigenschaft.aufzählungsWert == null" statt "=== null" eingebaut.
     ==**Achtung**==: Auf Heroku waren als Folge dieser Fehler diverse Baueigenschaften aus dem Profil "Bodenaufbau (NEU)" sogar in allen
     Baueinheiten von der Wurzel bis zum Klassenraum 1 im UG der Einstein-Schule (d.h. in allen Elternbaueinheiten über dessen Kindbaueinheit "Bodenaufbau")
     definiert, obwohl sie gar keine definierten Werte besassen! Daher waren diese vielen Felder im Profilformular für "Bodenaufbau (neu)"
     auf Heroku fälschlich ebenfalls disabled! Dieses Problem in der Datenintegrität auf Heroku in 2 Schritten gelöst:
     - Deaktivierung des Profils "Bodenaufbau (NEU)" **an der Wurzel des Bauvorhabenbaums** - dadurch werden alle dem Profil zugeordneten
       Baueigenschaften an allen Knoten deaktiviert und undefiniert gemacht.
     - Achtung: Eine Deaktivierung nur am Bodenaufbau unterhalb des Klassenraums 1 im UG der Einsteinschule genügt hier nicht, da dann
       das Profil an den Elternbaueinheiten aktiviert bleibt und die dem Profil zugeordneten Baueigenschaften dort aktiviert und definiert bleiben!
     - Neu-Aktivierung des Profils "Bodenaufbau (NEU)" **am Bodenaufbau unterhalb des Klassenraums 1 im UG der Einsteinschule**
253. ==**[WORK]**== (Prio 3) Restarbeiten am neuen Bodenaufbau:
     - a) **[DONE]** Vue Warning im Browser Console Log: "Duplicate keys detected: 'Bodenaufbau > Wärmeschutz > Wärmedurchlasswiderstand > Istwert'"
     - b) **[DONE]** Die bisherigen computed-Funktionen aus dem alten Bodenaufbau für die Spalte "Bewertung" anpassen an die Eigenschaften im neuen Bodenaufbau
     - c) **[DONE]** "Rechenfelder": Lösung, wie diese automatisch berechnet werden können im jetzigen Layout mit den v-fors (z.B. Gesamtdeckenhöhe)
     - d) **[DONE]** Den neuen Bodenaufbau in dasselbe übergeordnete Layout (Expansion Items für Eigenschaften des Bodenaufbaus/Schichten im Bodenaufbau) einbetten wie den
       alten Bodenaufbau
     - e) ==**[TODO]**== Felder für den Schallschutz (im alten Bodenaufbau waren schon welche vorhanden, mit Erik zu besprechen)
     - f) **[DONE]** **Update 28.01.2021**:
       - Die 4 Button-Operationen sind absichtlich inkonsistent:
         - Verschieben von Schichten erfolgt nur am Frontend, wird erst bei "Speichern" in der Datenbank aktualisiert
         - Einfügen und Löschen von Schichten erfolgt am Backend mit Refresh des Frontends (dabei noch Bugs, zu lösen per #282)
         - Zusätzliches Problem: Nach dem Einfügen und Löschen von Schichten werden die "Computed-Felder" im Gesamt-Bodenaufbau (wie z.B. Aufbauhöhe)
           in der Datenbank nicht aktualisiert und haben insofern falsche Werte - das Frontend gleicht das bisher aus, indem es diese immer neu
           berechnet, aber in der Datenbank sind die Werte ohne weiteres Speichern des Gesamt-Bodenaufbaus falsch, was z.B. bei einem späteren Export
           ein Problem wäre
         - [Verworfen] Lösungsalternative 1 für Operationen auf Schichten:
         - Es würden alle obigen Operationen zunächst nur am Frontend erfolgen, und erst beim Speichern des Gesamt-Bodenaufbaus würden
           alle Schichten plus der Gesamt-Bodenaufbau konsistent in der Datenbank gespeichert werden, mit anschließendem Refresh
         - Bei dieser Alternative müsste beim Verlassen des Formulars zwingend eine Aufforderung zum Speichern oder Verwerfen
           angezeigt werden, da sonst sehr viele Änderungen verloren gehen können
           werden - die Lösung dafür müsste noch designed werden (Vue Route Guards funktionieren nur bei Route Wechsel,
           deshalb sind vermutlich Watcher auf selectedNodeTreeBaueinheiten und auf das ausgewählte Tab notwendig, oder ein
           Hook am beforeDestroy Lifecycle Event der Komponente für das Profilformular "Bodenaufbau" - allerdings wird dieser
           nicht aufgerufen, wenn in baueinheiten.vue "keep alive" an den QTabPanels für "Fachliche Planung" (früher: "Baueigenschaftsprofilformulare") spezifiziert ist!
         - Vorteil:
           - Das Verschieben von Schichten geht sehr schnell am UI
           - Es können die obigen Inkonsistenzen nicht mehr auftreten
         - Nachteil: Sehr viel mehr Verwaltung am Frontend und beim Speichern, etwa 2 Wochen Aufwand
         - **[DONE]** [Bevorzugt] ==Lösungsalternative 2 für Operationen auf Schichten (= #282)==
           - Das Verschieben von Schichten wird weiterhin am Frontend gemacht und erst beim Speichern in der Datenbank reflektiert
           - Das Neu-Einfügen und Löschen von Schichten wird weiterhin sofort in der Datenbank reflektiert, mit Korrekturen im Rahmen von #282
           - Beim Entfernen und Hinzufügen einer Schicht müssen dann als Erweiterung des Speicherns beim Einfügen oder Löschen von
             Schichten zur
             Behebung des obigen Inkonsistenz-Problems
             auch noch die "computed-Felder" im Gesamt-Bodenaufbau in der Datenbank aktualisiert werden (per zusätzlichem Mongoose Update Call
             auf dem Gesamt-Bodenaufbau - der Code dafür ist derselbe, wie der, der beim Speichern des Gesamt-Bodenaufbaus abläuft)
           - Anschließend muss ein Refresh ausgelöst werden
           - (Prio 3) Beim Verlassen ohne Speichern sollte ebenfalls eine Aufforderung zum Speichern oder Verwerfen angezeigt werden
           - Durch "keep-alive" an allen Baueignschaftsprofilformularen inklusive "Bodenaufbau" bleibt immerhin der
             Frontend-Zustand im Formular beim Tab-Wechsel erhalten - trotzdem könnte der Benutzer vergessen, seine Änderungen
             zu speichern - dies gilt allerdings für alle Profilformulare
           - Vorteile:
             - Ist weniger aufwändig als Alternative 1
             - Die Responsiveness und Schnelligkeit beim Verschieben von Schichten bleibt erhalten wie in Alternative 1
           - Nachteil: Inkonsistenz zwischen Verschieben und Einfügen/Löschen bleibt erhalten (ist aber akzeptabel)
       - g) ==**[WORK]**== Handling von Einfügungen und Löschungen von Schichten direkt im Bauvorhabenbaum unter Umgehung obiger
         Button-Funktionen, die im Profilformular "Bodenaufbau" dafür vorgesehen sind
         - Dies ist heute noch möglich
         - Problem: Das Profilformular für den Bodenaufbau wird bei einem solchen Löschen nicht aktualisiert (erst
           nach Refresh), da in baueinheiten.vue beim Löschen aktuell kein Refresh ausgelöst wird (Performance)! Dies könnte dadurch
           behoben werdden, dass auch dort ein Refresh ausgelöst wird!
         - Beim Einfügen wird ein Refresh ausgelöst, der auch das Profilformular für den Bodenaufbau refreshed,
           so das dieses korrekt die eingefügte Schicht mit anzeigt!
         - Mit den bisherigen Kontextmenüs sind Einfügungen auch nur ganz unten in der Schichtenfolge möglich
         - Problem: Zusätzlich tritt allerdings potentiell obiges Inkonsistenz-Problem von computed-Werten am Gesamt-Bodenaufbau auf.
           Für die heutigen einfachen Dickenberechnungen ist dies noch kein wirkliches Problem,
           da eine neue Schicht den Default-Wert 0 in die Schichtdickenberechnung einbringt. Für künftige Berechnungen (z.B. Wärmedurchgangskoeffizient) könnte es
           zum ein Problem werden, abhängig von den Default-Werten.
         - Es ist slso zu überlegen, ob wir diese Buttons und Kontextmenüs an Elternknoten, die das Profil "Baueinheit > Bodenaufbau" aktiviert haben, verbieten
         - Falls es erlaubt bleibt, müssen bei solchen Löschungen/Einfügungen von Baueinheiten, die das Profil für "Schicht" aktiviert haben,
           entsprechende Updates in der Elternbaueinheit für die genannten computed-Felder eingefügt werden, sowie der
           genannte Refresh nach dem Löschen per Kontextmenü
         - Deshalb diese Aktionen einstweilen disabled im Bauvorhabenbaum per :disable unter Nutzung der Funktion
           nodeIstUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst(node, "Baueinheit > Schicht")
           bzw. nodeIstUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst(node, "Baueinheit > Bodenaufbau")
       - h) ==**[TODO]**== Weitere computed-Funktionen (siehe Word-Dokument "Bauteilblatt Böden..." von Erik) zur Berechnung von
         Wärmedurchgangskoeffizient und R-Wert - dazu ist erst die Überarbeitung des Profils für "Schicht" erforderlich (#281)
       - i) **[DONE]** Im Profilformular für "Schicht" wurden die Buttons für "Speichern" und "Zurücksetzen" entfernt. Grund: Die Komponente dafür
         wird identisch auch in den Einzelschichten im Bodenaufbau verwendet, der eigene Buttons hat, die alle Schichten mit
         speichern. Wenn man diese Buttons in "Schicht" wieder enablen würde, müssten beim Speichern entsprechende Updates in der Elternbaueinheit für die genannten computed-Felder eingefügt werden! Siehe auch #246.
254. ==**[TODO]**== (Prio 3) Benutzernachrichten beim Datenaustausch > Import. Beim Export bereits implementiert.
255. ==**[WORK]**== (Prio 3) Frontend Upgrade (aktuell z.B. Quasar 1.12.6 vom Juni 2020, aktuell ist 1.14.7 vom Dezember 2020), Backend Upgrade (Mongoose etc.). Hinweise für NPM Dependencies Updates auf https://flaviocopes.com/update-npm-dependencies/
     - ==**Update 24.12.2020**==: Am Frontend Quasar Upgrade durchgeführt mit quasar upgrade --install
     - ==**Update 19.02.2021**==: Aktuell ist am Frontend Quasar 1.15.2 installiert
     - ==**Update 24.06.2021**==: Upgrade des Frontends auf @quasar/extras: 1.10.4 → 1.10.7, quasar: 1.15.15 → 1.15.21,
       @quasar/quasar-app-extension-qmarkdown: 1.4.1 → 1.4.3 mittels quasar upgrade -install
     - ==**[TODO]**== (Prio 2) BIM.click Frontend Upgrade von Quasar V1/Vue V2 nach Quasar V2/Vue V3, siehe https://quasar.dev/start/upgrade-guide
       - ==**Achtung**==: Beim Upgrade nach Vue 3/Quasar 2 muss das NPM Paket **VueAutoNumeric** ggf. ersetzt werden
         - Es unterstützt aktuell kein Vue 3, nur Vue 2!
       - NPM Paket **VueNumeric** als potentiellen Ersatz angetestet in verwaltung.vue
         - https://www.npmjs.com/package/vue-numeric - unterstützt Vue 2!
         - Ist leider per Kurztest in verwaltung.vue, Test Area 13, keine Alternative, da nur für Ausgabe, nicht Eingabe von Dezimalzahlen geeignet, kein "as-you-type" Support wie VueAutoNumeric
       - Vue kennt in Vue 2 sogenannte **Vue Filters** - eventueller Ersatz?
         - https://vuejs.org/v2/guide/filters.html
         - https://www.npmjs.com/package/vue2-filters#placeholder
         - https://stackoverflow.com/questions/54744877/vue-filters-for-input-v-model - Einbindung in Input-Feld
         - Kurztest in verwaltung.vue, Test Area 14 - funktioniert nicht zuverlässig für Dezimalzahlen, kann wie Quasar Masks nicht mit
           negativen Zahlen umgehen! Es können auch Buchstaben eingegeben werden, Backspace-Eingabe bringt alles durcheinander - verworfen.
       - Vielversprechend: **VueCurrencyInput**
         - https://github.com/dm4t2/vue-currency-input
         - https://dm4t2.github.io/vue-currency-input/
         - https://dm4t2.github.io/vue-currency-input/playground.html
         - https://dm4t2.github.io/vue-currency-input/guide.html
         - Nutzung in Quasar QInput-Feld:
         - https://codesandbox.io/s/using-vue-currency-input-with-quasar-veevalidate-gokw6?from-embed=&file=/src/QCurrencyInput.vue -->
         - ==Unterstützt Vue 3!==
         - Benutzt Vue Composition API
         - npm install vue-currency-inpu
         - npm install @vue/composition-api
         - ACHTUNG: https://codesandbox.io/s/using-vue-currency-input-with-quasar-veevalidate-gokw6?from-embed=&file=/src/QCurrencyInput.vue
         - If the value of the input is changed externally (and not only by user input) you need to use the setValue function returned by useCurrencyInput within a watcher.
         - Dies ist wegen unserer computed-Funktionen zur Vorinitialisierung von Feldern und der Inkrement-/Dekrement-Funktionen
           bei uns der Fall! Code-Beispiel dafür unter obigem Link - watch() danach eingebaut
         - Getestet in dezimal-eingabe.vue (neue Komponente) und verwaltung.vue, Test Area 15 - positive Ergebnisse.
256. ==**[TODO]**== (Prio 3) Die Baueigenschaft "Baueinheit > Bauvorhaben > Baumaßnahme > Art" ist zwar im Profil "Baueinheit > Bauvorhaben", wird aktuell aber nicht verwendet im
     Profilformular und Layout dafür!
257. **[DONE]** (Prio 3) In baueinheiten.vue, Tab zugeordneteBauinformationen, Zeile 8467: Eine der disable Props dort wirft Vue Warning
     "vue.runtime.esm.js?5593:619 [Vue warn]: Invalid prop: type check failed for prop "disable". Expected Boolean, got String with value "".
     In baustoffe.vue ist dort :disable="benutzerRolleIstMitarbeiter" - das funktioniert! Ursache war disable statt :disable am q-btn unter der q-table,
     gefixed!
258. ==**[TODO]**== (Prio 3): Das Flag ererbtNichtGesetzt in den wertbezogenen Baueigenschaften sollte gesetzt werden, wenn ein Wert ererbt wird von einem Elternknoten.
259. **[DONE]** (Prio 2): Das Scrollen auf Ziele im Inhaltsverzeichnis der Dokumentation funktioniert nach dem Quasar/QMarkdown Update nicht mehr auf
     Ziele, die per Log eigentlich von QMarkdown korrekt erzeugt werden (elementIds). Grund ist Vue Call document.getElementById(elementId) in
     dokumentation.vue, dieser liefert null zurück für solche Ziele! Gelöst durch Workarounds in bim-click-dokumentation und dokumentation.vue - siehe
     Kommentare dort
260. **[DONE]** (Prio 3): Beim Import der baueigenschaften.js werden durch baueigenschaftenController.internalCreateBaueigenschaft() in
     back-end-server.js für die Baueigenschaft "Baueinheit > Standort > Hydrogeologie > Wasser > Grundwasser > Schwankungsbereich" (Kennwertepaar) die Werte von
     bezeichnungsWert1/2 nicht in die Datenbank übernommen. Der Grund ist zunächst unklar - die Funktion ruft baueinheitenController.aktiviereBaueigenschaft
     () auf, diese ruft setzeBaueigenschaftAufDefiniertMitWerteUebergabe(), diese ruft erstelleMongooseUpdateQueryPartNewValuesObjekt(), welche eigentlich
     bezeichnungsWert1/2 berücksichtigt in Zeile 5034 ff.!
     Weitere Tests ergeben:
     - Das Eintragen der Bezeichnungswerte funktioniert auf keinen Fall, wenn kennWert1/2 auf null statt 0 gesetzt werden in baueigenschaften.js
     - Bezeichnungswerte können also nur mitgegeben werden, wenn kennWert1/2 definiert sind (dies ist sinnvoll)
     - Das Eintragen von Werten funktioniert scheinbar aber zunächst überhaupt nur für die Baueigenschaften "Allgemein > Test > Wertetypen > ..." am Wurzelknoten des Baustoffbaums!
     - Der Grund liegt jedoch nicht in obigem Code, sondern in der Tatsache, dass die obige Baueigenschaft dem Profil "Baueinheit > Standort" zugehörig ist,
       und dieses (an der Einstein-Schule) aktiviert wird als Teil von back-end-server.js. Offenbar werden dabei deren vorher definierte
       Werte überschrieben durch leere Vorgabewerte...
     - Wenn man diese Profilaktivierung auskommentiert, hat nach der Erstanlage diese
       Baueigenschaft die korrekten Werte (inklusive bezeichnungsWert1/2) am Wurzelknoten des Bauvorhabenbaums!
     - Obwohl beim Aufruf von baueigenschaftsProfileController.createBaueigenschaftsProfilAtServerStart() definiertNichtUndefniert für alle Baueigenschaften im Profil auf
       false gesetzt ist, hat aktiviereBaueigenschaftsProfilAnBaueinheit() obige Auswirkung, dass die vorhandenen Werte offenbar undefiniert werden.
     - **[DONE]** In baueigenschafts-profile-aktivierungslogik.aktiviereBaueigenschaftsprofilAufElternPfad()
       für diesen Fall einen Fix eingebaut, damit vorhandene Werte in diesem Fall nicht durch undefinierte Vorgabewerte
       überschrieben werden. Dieser Fix wurde später noch mehrfach modifiziert, und ist teilweise unterschiedlich in den Geschwisterfunktionen
       schreibeInhalteAusProfilformular() und aktiviereBaueigenschaftsprofilAufElternPfad().
     - Die Benutzung der Felder bezeichnungsWert1/2 als Label-Felder für paarige Baueigenschaften (z.B. Kennwertepaar), wie es für obige Baueigenschaft im
       Baueigenschaftsprofilformular "Standort" ursprünglich der Fall war, ist generell keine so gute Idee, da diese eben nicht typ- sondern wertbezogene Felder sind
     - **[DONE]** Daher die bezeichnungsWert1/2 ersetzt durch Speziallösung im Layout File für das Baueigenschaftsprofilformular "Standort" - spezielle
       neue Properties dort für solche paarige Baueigenschaften: label1PaarigeBaueigenschaft und label2PaarigeBaueigenschaft
261. **[DONE]** (Prio 3) Refresh-Problem in der Table für Baueigenschaftsprofile in Baueinheiten/Baustoffen für
     Spalte für aktiviertNichtDeaktiviert. #275 war Duplicate dieses Problems, dort gefixed!
262. **[DONE]** (Prio 3) In baueigenschafts-profile-aktivierungslogik.schreibeInhalteAusProfilformular() muss das Flag
     vorgabeWerteUeberschreibenVorhandeneWerte richtig implementiert werden. Dort markiert mit #262. Es sollte außerdem wie
     das Flag treesWerteVererbungVorhandeneWerteUeberschreibenMitWertenAusEingefuegtemZweig (Vorlage, siehe benutzer.model.js, benutzer.controller.js, einstellungen.vue) aus den Einstellungen des Benutzers entnommen werden. Ist implementiert, muss noch mehr getestet werden, im Rahmen von #263.
263. ==**[WORK]**== (Prio 3) Das **Eintragen von Vorgabewerten bei Baueigenschaftsprofilaktivierung** muss nochmals getestet und überprüft werden.
     Defect #260 (betrifft die Behandlung von undefinierten Vorgabewerten) wurde bereits gefixed. Es kann zum Testen das Profil "Allgemein > Test > Wertetypen" benutzt werden.
     Dort werden für manche der Baueigenschaften im Profil Vorgabewerte in back-end-server.js mitgegeben (nur lokal!). Auf Heroku
     können solche per UI angelegt werden. Die Vorgabewerte sollten
     gemäß der Testmatrix im internen Design eingetragen werden. Wenn keine Vorgabewerte vorhanden sind, sollten gemäß der Tabelle
     die vorhandenen Werte stehen bleiben. Dieses ToDo wird insbesondere dann wichtig, wenn künftig die Profilaktivierung in Abhängigkeit von
     Aufzählungswerten (z.B. für Raumprofile nach erweiterter DIN 18599) implementiert wird.
     ==**Achtung**==: Der Fall, dass Vorgabewerte undefiniert sind, und dann stets die vorhandenen Werte genommen werden (#260)
     funktioniert per Test am 17.02.2021 mit Profil Allgemein > Test > Wertetypen und Kennwert wohl doch nicht immer! Der Grund ist, dass nur ein Sonderfall, nicht ein zweiter möglicher, sogar häufigerer Fall beim ersten Fix von #260 berücksichtigt wurde. Dies im Fix nachgezogen am 18.02.2021 in aktiviereBaueigenschaftsProfilAufElternPfad() - beide Fälle markiert mit #260.
264. ==**[TODO]**== (Prio 3) Den Bauprojekteunterbaum offizell als baumKnotenTyp implementieren - wird bisher im watch von baueinheiten.vue über das Feld
     baueinheitsBezeichnung "Bauprojekte" selektiert.
265. ==**[TODO]**== (Prio 3) Performance: Das Speichern der Angaben zur Baueinheit dauert wesentlich länger als das Speichern der
     Baueinheitsbeschreibung! Grund ist offenbar refreshTreeBaueinheiten() im ersteren Fall - laut Kommentare odrt aber offenbar notwendig,
     wegen Vererbung eventuell geänderter Autoren! Dementsprechend müsste man refreshTreeBaueinheiten() dort nur aufrufen, wenn sich
     diese geändert haben!
266. **[DONE]** (Prio 3) Methoden baueinheiten.toggleAktivierungBaueigenschaftsProfilAnBaueinheit() und
     baustoffe.toggleAktivierungBaueigenschaftsProfilAnBaueinheit() sowie die
     zugehörigen APIs sollten umbenannt werden, z.B. in updateAktivierungsZustandBaueigenschaftsProfilAnBaueinheit/Baustoff
     Sie togglen nicht den Aktivierungszustand des Baueigenschaftsprofils,
     sondern ändern ihn in Abhängigkeit des Body-Parameters aktivierenNichtDeaktivieren (Boolean)]
267. **[DONE]** (Prio 3) In Vorbereitung auf Baueigenschaftsprofilformulare zusätzliches Feld im Model für Bauinformationen eingeführt: **bauinformationsAnzeigeText**.
     Dieses eingefügt in die QTabs/QForms zur Bearbeitung/Neuanlage von Bauinformationen sowie in alle QTables, die Bauinformationen anzeigen.
     In den QSelects, welche Bauinformationen als Options haben, trat anschließend ein schwieriger Fehler auf, der daran lag, dass in bauinformationen.js
     versehentlich eine Test-Bauinformation enthalten war ohne das Feld Anzeigetext (undefined). Die Array-Filter auf solchen Options
     mit needle funktionieren offenbar nicht, wenn eines der beteiligten Felder undefined ist! Sie werfen dann im Browser Log Fehler "Cannot read property 'toLowerCase'
     of undefined". Daher sollten Filter nur auf Feldern definiert werden, die im Model required sind bzw. default: null haben!!! Das Feld bauinformationsAnzeigeText
     vorsorglich im Model mit default: null definiert. In den Test-Bauinformationen auf Heroku überall manuell einen Anzeigetext eingetragen.
     In den QTables für Baueigenschaften wird nun der bauinformationsAnzeigetext statt des sehr langen Felds bauinformationsBemerkung angezeigt. Dafür auch die
     Populates entsprechend geändert im Backend. Gleichzeitig für die Columns "Bemerkung" in den QTables eine Max-Width-Begrenzung eingebaut nach Vorlage auf
     https://forum.quasar-framework.org/topic/6290/q-table-custom-column-width-via-column-style-property/9 und https://codepen.io/metalsadman/pen/XWXVNoZ
268. **[DONE]** (Prio 3) Leider besteht das Problem mit der QSelect-Auswahl einer Bauinformation für eine Baueigenschaft (jeweills in den Tabs "Details" und
     "Neuanlage") weiter auf Heroku, obwohl dort nun alle Bauinformationen laut Compass das Feld bauinformationsAnzeigeText haben, aber einige mit null. Neuanlage lokal
     einer Bauinformation mit leerem Anzeigetext erzeugt lokal laut Compass ebenfalls eine Bauinformation mit bauinformationsAnzeigeText null. Trotzdem
     lässt sich lokal damit das Problem zunächst scheinbar nicht reproduzieren. Allerdings gelingt die Reproduktion dannn doch, wenn ein Suchstring eingegeben wird,
     der nicht in den als erstes im Filter abgefragten Bauinformationsbezeichnungen vorkommmt, deren "paariges" Feld bauinformationsAnzeigeText null ist! Daraus
     ist zu schließen, dass der Filter nicht nur bei undefined fehlschlägt, sondern auch bei null. Die Fehlermeldung in diesen null-Fällen ist
     dementsprechend "Error in v-on handler: "TypeError: Cannot read property 'toLowerCase' of null". Es musste also als Fix eine entsprechende Abfrage des
     null-Falls
     eingebaut werden in die Filter-Funktionen in baustoffe.vue und baueinheiten.vue. Diese berücksichtigt durch Abfrage auf "!= null" auch gleich den
     undefined-Fall. Das
     Problem trat auch in details-tab-baueigenschafts-profi.vue bei der Auswahl der Bauinformation an
     einem Baueigenschaftsprofil auf, dort ebenfalls gefixed. Dito in etails-tab-baueigenschaft.vue. Vorsicht also bei weiteren Fileter-Funktionen (Suchstrings
     im Code dafür: "needle", "toLowerCase", "filter"). Sicherheitshalber auch die obige null-Abfrage für bauinformationsBezeichnung eingefügt in
     baueinheiten.vue, baustoffe.vue, details-tab-baueigenschaft.vue, details-tab-baueigenschafts-profil.vue und
     vorgabe-werte-tab-baueigenschaft-baueigenschafts-profil.vue - ist aber nur nötig, falls z.B. keine Bauinformationen im System definiert sind und dann auch
     bauinformationsBezeichnung in den Options undefined oder null ist! Dies auch gleich noch in einigen anderen Filter-Funktionen in diversen Komponenten (Suche nach "needle") gefixed, für die Options von Baueigenschafts-Aufzählungswerten, die nur auf einfachen Feldern filtern, und für die Auswahl von
     Benutzerkennungen für Autoren.
269. **[DONE]** (Prio 3) Bei mehrfachem Drücken der Enter-Taste bei der Eingabe von Filter-Strings in das QSelect für die Bauinformation am Baueigenschaftsprofil
     (details-tab-baueigenschafts-profil-vue)kommt allerdings noch eine ähnliche
     Fehlermeldung "TypeError: Cannot read property 'bauinformationsBezeichnung' of null" - diese kommt jedoch aus einer anderen Funktion am QSelect dort,
     createSelectValueBauinformationenAusgewaehltesBaueigenschaftsProfil(). Dies durch weitere "!= null"-Abfrage in dieser Funktion gefixed.
270. **[DONE]** (Prio 3) Long Label Truncation an LQChips - diese ragen bei langen Label-Texten manchmal rechts über die QSelect-Felder hinaus.
     An allen QChips gefixed nach Vorlage auf https://quasar.dev/vue-components/chip#Example--Long-label-truncation
271. ==**[TODO]**== (Prio 3) QSelect für Auswahl Sonderzeichen noch einbauen in Beschreibungs-Tabs für Baustoffe, Baueigenschaften, Baueigenschaftsprofile -
     Vorlage ist Beschreibungs-Tab für Baueinheiten.
272. **[DONE]** (Prio 2) Flag für #505 in Datenbank und Code - Implementierungsstufen:
     - **[DONE]** Model Update vorbereiten - baueinheiten.model.js (DONE), baustoffe.model.js, baueigenschafts-profile-model.js  
       (Löschen von Profilen). Models von flachen Arrays auf Array of Objects erweitert mit zusätzlichem neuen Flag
       istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst, das bei Aktivierung eines Baueigenschaftsprofils
       in baueigenschafst-profile-aktivierungs-logik.js auf true gesetzt wird am aktuellen Knoten, an der Beziehung des Knotens
       (Baueinheit oder Baustoff) zum aktivierten Baueigenschaftsprofil.
     - **[DONE]** MongoDB Shell Skript für Model-Update erstellen und lokal testen (mongo-db-migration-baueinheiten-zugeordnete-baueigenschafts-profile.js)
     - **[DONE]** Tests auf Heroku
     - **[DONE]** Codeänderungen in:
       - Backend:
         - baueinheiten.model.js, baustoffe.model.js - dort markiert mit #272/#505
         - baueigenschafts-profile-model.js (.pre) - dort markiert mit #272/#505
         - baueinheiten.controller.js, baustoffe.controller.js - dort markiert mit #272/#505
         - baueigenschafts-profile-aktivierungslogik.js - dort markiert mit #272/#505
         - (bauinformations-profile-aktivierungslogik.js - dort markiert mit #272/#505, allerdings wird der Code dort aktuell nicht verwendet
           und ist auch nicht aktuell, Aktivierung von Bauinformationsprofilen erfolgt direkt in baueinheiten.controller.js)
         - Verschieben/Kopieren von Zweigen? (=> Stefan, bisher keine betroffenen Stellen bekannt - allerdings gibt es bzgl. Profile dort sowieso noch eine Lücke - siehe #273)
       - Frontend:
         - Anzeige, ob Profile aktiviert sind oder nicht: baueigenschafts-profile-tab-baustoffe-und-baueinheiten - dort markiert mit "#272/#505"
         - Diverse Profilformulare (wenn sich der Array am Frontend nicht inkompatibel
           ändert und nur istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst als Feld dazukommt,
           sind dort keine Codeänderungen zu erwarten)
         - baueinheiten.vue - diverse Stellen, wo geprüft wird, ob ein Baueigesnschaftsprofil aktiviert ist - dort markiert mit #272/#505
         - baustoffe.vue - dort fehlen die vergleichbaren Prüfungen für Profile noch, daher dort nur eine Anpassung in getTabVonHierarchischOberstemProfilFormularInAktiviertenBaueigenschaftsProfilen()
     - **[DONE]** Lokale Tests des Codes
     - **[DONE]** Datenbankmigration mit den Commands aus obigem Skript mittels MongoDB Shell gegen MongoDB Cloud Atlas
     - **[DONE]** Code Deployment und Test auf Heroku - durchgeführt am 13.01.2021. Ein dabei auftretender Fehler
       ist in mongo-db-migration-baueinheiten-zugeordnete-baueigenschafts-profile.js beschrieben und wurde gefixed durch
       Korrektur eines Feldnamen-Fehlers in der Datenbank mit Compass. Anschließend läuft das System lokal und Heroku
       mit der Model-Änderung und dem Flag istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst
     - Aktuelle Baueigenschaftsprofile auf MongoDB Cloud Atlas mit ihren Ids:
       - 5fa182e0bb906400175d44b5 - "Baueinheit > Bauvorhaben"
       - 5f9ebea77299740017c5abf3 - "Baueinheit > Standort"
       - 5f9ebfb77299740017c5ac87 - "Baueinheit > Gebäude"
       - 5fc3deac35cc1e001545de0e - "Baueinheit > Geschoss"
       - 5fc3dd0f35cc1e001545dc0c - "Baueinheit > Raum"
       - 5fb82149f81c0300174bc7bc - "Bodenaufbau", mittlerweile gelöscht
       - 5fc3dad835cc1e001545dbeb - "Bodenaufbau (NEU)", mittlerweile umbenannt in "Baueinheit > Bodenaufbau"
       - 5f7729730203670017945e1a - "Baueinheit > Schicht"
       - 5f9becbc846acb00175440f7 - "Allgemein > Test > Wertetypen"
       - 5f9ebe157299740017c5abdf - "Bauvorhaben (Preview)"
       - 5f9ebff37299740017c5ac94 - "Schichtaufbau"
       - 5fa979b9236c4a0017290525 - "Nutzungsprofil für Einzelbüro"
       - Es mussten im Anschluss noch einige Fehlerfälle auf MongoDB Atlas mit Compass bereinigt werden, für Dokumente,
         in denen das neue Flag per Default auf false gesetzt war, jedoch true sein musste
     - **[DONE]** Das Flag dann zur Ansteuerung von Profilformularen verwendet (automatische Anwahl und Disabling)- es werden
       jeweils diejenigen Profile als "relevant" enabled (per :disable-Funktion), für die die betreffende Baueinheit der unterste Knoten im Pfad ist, an dem das betreffende Profil aktiviert ist. Dafür neue Funktionen in baueinheiten.vue, z.B.
       nodeIstUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst(node, baueigenschafsProfilBezeichnung).
273. ==**[WORK]**== (Prio 2) Beim Bewegen (Kopieren/Verschieben) von Zweigen in den Bäumen muss vermutlich noch eine erneute
     Baueigenschaftsprofilaktivierung am Zielknoten
     durchgeführt werden - diese ist jedenfalls noch nicht berücksichtigt (nur Aktivierung/Wertevererbung von Baueigenschaften).
     Wahrscheinlich genügt es, das Profil als "aktiviert" einzutragen, da die dem Profil zugeordneten Baueigenschaften bereits
     korrekt aktiviert sein müssten im Quellzweig. Es ist auch zu untersuchen, ob es dabei Konflikte geben kann mit bereits
     aktivierten Profilen. Zusätzlich ist #279 (Flag für untersten Knoten im Zweig, an dem Profil aktiviert ist)
     beim Bewegen zu implementieren. ==**Update 10.02.2021**==: Von Stefan implementiert in baueinheiten.controller, noch
     ausstehend in baustoffe.controller. ==**Update 15.03.2021**==: Profilaktivierung in baustoffe.controller nachgezogen
     ==**TODO**:== Nach Fehlern Ausschau halten in baustoffe.controller
274. ==**[WORK]**== (Prio 2) Ebenso müssen beim Bewegen für die am bewegten Zweig aktivierten Bauinformationsprofile ggf. die
     Bauinformationen am Ziel zugeordnet werden und die am markierten Zweig aktivierten Bauinformationsprofile aktiviert werden!
     - ==**Update 10.02.2021**==: Von Stefan implementiert in baueinheiten.controller, noch ausstehend in baustoffe.controller.
     - ==**Update 15.03.2021**==: Profilaktivierung in baustoffe.controller nachgezogen
     - ==**[TODO]**== Nach Fehlern Ausschau halten in baustoffe.controller
275. **[DONE]** (Prio 3) In bauinformationen.model.js fehlte noch ein .pre für das Löschen von Referenzen auf Bauinformationen in
     Baueinheiten beim
     Löschen einer Bauinformation. Dort wurden vorher nur Referenzen auf Bauinformationen in Baustoffen und in Baueigenschaften gelöscht!
     Merkwürdigerweise war beim Testen einer Löschung einer in "zugeordneteBauinformationen" an Einstein-Schule eingetragenen Bauinformation
     aber auch ohne dieses .pre kein Fehler im Log zu sehen, wenn die Einstein-Schule refreshed wird und die zugeordneten Bauinformationen angezeigt werden.
     Die gelöschte war einfach verschwunden. Vermutlich wird diese beim Neu-Laden am Backend beim Populieren ignoriert.
276. **[DONE]** (Prio 2) Problem bei der Baueigenschaftsprofilaktivierung, nur in baustoffe.vue, nicht in baueinheiten.vue: Nach
     Baueigenschaftsprofilaktivierung wurde der neue Aktivierungszustand des Profils
     nicht korrekt an das Frontend übermittelt (als Teil von refreshTreeBaueinheiten()). Ursache: Fehlendes populate für zugeordneteBaueigenschaftsProfile in
     baustoffe.controller.js als Teil von readKindKnotenBaueinheit. Dieses populate ware in baueinheiten.controller.js schon eingebaut, nicht aber in baustoffe.controller.js.
277. ==**[WORK]**== (Prio 3) In baueinheiten.vue die Funktionen zum Disabling der Aktivierung von Baueigenschaftsprofilen per Kontextmenü verbessern.
     Siehe Kommentare in Funktion istAktiviertProfilAnNodeUndNodeIstUntersterImPfadAnDemProfilAktiviertIst().
278. **[DONE]**(Prio 3) Problem mit Opazität in QTables mit 2 Header-Zeilen (Baueigenschaften in uebersicht-tab-baueigenschaften, baueinheiten,
     baustoffe.vue) in der 2. Header-Zeile, 1. Spalte. Gefixt in der CSS für sticky Tables mit 2 Header Rows, markiert.
279. **[DONE]** (Prio 2) Vervollständigung der Logik für das
     **Flag istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst:**
     Beim **Löschen einer Baueinheit bzw. eines Baustoffs** mit aktivierten Baueigenschaftsprofilen müssen diese Flags auch im Pfad von
     der Wurzel bis zum Elternknoten des gelöschten Knotens aktualisiert
     werden! Mindestens müssen die Flags für alle am gelöschten Knoten aktivierten Baueigenschaftsprofile, falls true, in den Elternknoten übertragen werden.
     Dazu beim Delete am Backend den Array zugeordneteBaueigenschaftsProfile traversieren und die Flags per Mongoose updateOne am Elternknoten setzen, falls vorhanden. ==**Update 23.03.2021**==:
     - **[DONE]** Beim Löschen von Stefan implementiert
     - **[DONE]** Diese Flags müssen außerdem auch beim **Bewegen von Zweigen** aktualisiert werden, und zwar am Zielknoten, und
       beim Verschieben auch im Ausgangspfad des bewegten Zweigs. Die Logik für die Profilaktivierung und
       -deaktivierung bei diesen Operationen muss vorher designed werden! Siehe auch #273.
     - Ein Sniff Test ergibt, dass beim Bewegen eines Knotens mit aktiviertem Profil
       "Baueinheit > Standort" als unterstem Knoten im PFad unter einen Zielelternknoten mit aktiviertem
       Profil "Baueinheit > Bauvorhaben" das Flag korrekt übernommen wird, und auch im Elternpfad dieses Profil nach dem Bewegen korrekt aktiviert wird.
     - Neben dem korrekten Updates des Flags an der Quelle und am Ziel könnte man unabhängig davon auch "illegale" Bewegungen per computed-Funktionen unterbinden, z.B. einen Knoten
       mit aktiviertem Profil "Baueinheit > Standort" unter einen Zielelternknoten zu bewegen, an dem bereits
       "Baueinheit > Standort" aktviert ist als unterstem Knoten - wenn dieser Fall nicht unterbunden würde,
       ist per Sniff Test das Flag fälschlich sowohl am Zielelternknoten als auch am
       bewegten Knoten "true".
     - Das könnte man rigoros unterbinden, indem man als Zielelternknoten
       beim Bewegen nur solche Knoten zulässt, an dem die am zu bewegenden Knoten aktivierten Profile alle deaktiviert sind - allerdings wäre dadurch auch das Flag in den Benutzereinstellungen,
       welches Wertekonflikte beim Bewegen an aktivierten Baueigenschaften steuert, überflüssig, denn es würde dann gar keine solchen Wertekonflikte geben.
     - Vielleicht gibt es auch weniger rigorose Lösungen?
     - ==**Update 01.04.2021**==: Das Design und die Fall-Unterscheidungen dafür stehen in einer separaten XLS-Datei in https://bimclick.herokuapp.com/statics/excels/bim-click-faelle-fuer-flag-ist-unterster-knoten-an-dem-profil-aktiviert-ist.xlsx
     - **[DONE]** Auch in baustoffe.controller.js nachzuziehen!
280. ==**[TODO]**== (Prio 3): **Rubrik "Radon"** im Profilformular "Standort" > "Umwelt" muss nach neuer Gesetzeslage aktualisiert werden (Input von Erik pending)
281. ==**[TODO]**== (Prio 2): Das Baueigenschaftsprofil und zugehörige Profilformular für **"Schicht"** ist bisher nur vorläufig. Es muss mit Erik
     besprochen und überarbeitet werden. Es muss außerdem entschieden werden, wie die Einzelschichten den in den Profilen "Baueinheit > Geschoss" und "Baueinheit > Raum" bereits bei den Niveaus
     verwendeten drei "Hauptschichtkategorien" ("Bodenaufbau" - Arbeitstitel für alle Schichten über dem Rohboden, zu unterscheiden allerdings vom Gesamtbodenaufbau, "Rohboden" - manchmal auch "Tragschicht" genannt, "Bodenunterseite" - manchmal auch "Unterkonstruktion" genannt), zugeordnet werden. Diese 3-schichtige Struktur wird bereits in den Masken und Baueigenschaften für die Niveaus von Geschossen und Räumen verwendet. Die Zuordnung zu
     den drei "Schichtkategorien" könnte auch über einen weiteren Aufzählungswert "Schichtkategorie" (Arbeitstitel)
     erfolgen, oder automatisch aus dem bereits vorhandenen Aufzählungswert "Schichttyp im Bodenaufbau" ermittelt wird, oder durch
     manuelle Auswahl durch den Benutzer. In den bisher definierten Werten des Aufzählungswerts "Schichttyp im Bodenaufbau" sind alle bisherigen Werte außer "Rohdecke" (mittlerweile in "Rohboden" umbenannt!) und "Unterdecke" (mittlerweile in "Unterboden" umbenannt, müsste eventuell "Bodenunterseite" heißen und vermutlich in weitere Schichttypen zerlegt werden) der obigen Schichtkategorie
     "Fertigboden" zuzurechnen! Mit dieser Zuordnung aus dem Schichttyp wird aktuell bereits provisorisch im Code für das Profilformular **"Bodenaufbau"** die Dicke jeder "Hauptschichtkategorie" durch Addition der
     Einzelschichten computed und mit dem entsprechenden Sollwert aus dem Raum verglichen (z.B. per computed-Funktion
     aufbauhoeheFertigbodenBerechnet)
     - Hinweis: Für **Wandaufbauten** ist eine ähnliche Strukturierung und Festlegung der dafür benötigten Schichttypen und
       Schichtkategorien notwendig. Dabei müssen ggf. auch Spezialfälle, wie z.B. ein "2-schaliges Massivbauteil" (Haustrennwand mit Dämmung
       zwischen den Schalen) berücksichtigt werden (bei denen das 3-Schichtmodell eventuell erweitert werden müsste auf 5 Schichten?)
       Außerdem muss bei Wandaufbauten modelliert werden, was "außen" und was "innen" ist (entsprechend "unten" und "oben" bei
       Bodenaufbauten, wobei die natürliche Blickrichtung der Raum, unter der Wandaufbau als Kindbaueinheit modelliert wird, sein sollte).
       Auf https://cwmag.computerworks.de/ausgaben/ausgabe-01-2016/geschosse-und-referenzhoehen.html sind Skizzen für Boden- und
       Wandaufbauten zu finden. Die dort skizzierte äußere Wandverkleidung hat neben einer Dicke auch eine Unterkante, deren Abstand
       zu OKFFB angegeben wird. Als Begriffe könnten z.B. "äußere Wandverkleidung" (z.B. bestehend aus Dämmung und Außenputz, oder Dämmung und Verblendsteinen), "Tragwand" (z.B. bestehend aus Mauerwerk oder Beton) und "innere Wandverkleidung" (z.B. bestehend aus Innenputz) dienen. Allerdings gibt es auch andere spezielle Wandaufbauten, z.B. bei Innenwänden, bei Fassaden aus Holz oder Metall,
       oder bei erdberührten Wänden. Siehe Skizzen z.B. auf https://www.mauerwerksbau-lehre.de/vorlesungen/1-grundlagen-und-baustoffe-des-mauerwerksbaus/13-wandkonstruktionen/131-wandaufbau oder auf
       https://nordic-haus.de/patentierter-wandaufbau/.
       Die Einzel- und Hauptschichten von Wänden könnten als Maße jeweils eine Dicke haben, sowie ggf. zusätzliche Maße wie der genannte Abstand der Unterkante der
       äußeren Wandverkleidung zu OKFFB. Die Höhe und Breite von Wänden hängen geometrisch zusammen mit den Maßen von durch die Wände
       begrenzten Räumen, welche in BIM.click bereits eigene Baueigenschaften haben (lichte Raumbreite an der Flurseite, lichte
       Raumbreite an der Fassadenseite, lichte Raumtiefe, lichte Raumhöhe), müssen aber ggf. mit eigenen Baueigenschaften modellierbar sein.
     - Hinweis: Für **Wandaufbauten** gibt es in "Verwaltung" > "Test Area 2" bereits einen Prototypen
       zur Visualisierung eines Wandaufbaus per QCarousel.
     - **[DONE]** Bisher wird dazu für die oberste Schicht des Fertigbodens (im Bodenaufbau früher noch "Oberboden" genannt) noch die Baueigenschaft für "Aufbauhöhe des Fertigbodens am
       **Geschoss**, nicht am **Raum** verwendet. Dies alles umgestellt als Teil von #302.
     - **[DONE]** Bisher wird dazu für die Dicke des Rohbodens (im Bodenaufbau früher noch "Rohdeckenhöhe" genannt) noch die Baueigenschaft für "Dicke des Rohbodens"
       am **Geschoss**, nicht am **Raum** verwendet. Dies alles korrigiert als Teil von #302.
     - ==**[DEFER]**== Zusätzlich wird eine "Rohdeckenabsenkung" verglichen, die bisher so nicht am Geschoss/Raum ermittelt wird - diese vorübergehend disabled als Teil von #302.
     - **[DONE]** Früher wurden für die Dicke der Bodenunterseite (im Bodenaufbau früher "Rohdeckenbekleidung" bzw. "Höhe der Unterdeckenbekleidung" genannt )
       noch die Baueigenschaft für die Dicke der Bodenunterseite am **Geschoss**, nicht am **Raum** verwendet. Dies alles umgestellt als Teil von #302.
282. **[DONE]** (Prio 2) Bodenaufbau: Die Methoden für createSchicht() und deleteSchicht() müssen überarbeitet werden:
     Sie müssen zuerst den Gesamtbodenaufbau abspeichern, um die dortigen computed-Felder in der Datenbank zu persistieren, dann Create bzw. Delete der Schicht in der Datenbank, dann Refresh des Trees und der Komponente perAufruf Refresh der Elternkomponente. Erledigt
     von Stefan.
283. ==**[WORK]**== (Prio 3) "keep-alive" auch in den q-tab-panels für die Baueigenschaftsprofilformulare in baueinheiten.vue
     eingefügt, um deren Zustand beim Tab-Wechsel zu erhalten. Speicherbedarf dafür ist zu beobachten! Siehe auch #245.
284. **[DONE]** (Prio 3) In den Kontextmenüs an den Bäumen gibt es bisher nur eine "Auswählen und Löschen" - das ist verwirrend, wenn
     ein Kindknoten eines Elternknotens, an dem aktuell ein Baueigenschaftsprofilformular angezeigt wird, gelöscht wird. In diesem
     Fall wird nämlich kein Profilformular mehr angezeigt, da nach dem Löschen ja kein Knoten mehr ausgewählt ist.
     Dafür wäre es besser, wenn es stattdessen eine Funktion "Löschen" ohne Auswählen gäbe (auf dem per Kontextmenü angewählten Node, in diesem Fall
     dem Kindknoten), die den ausgewählten Knoten erhält. Dasselbe Problem tritt auf beim Löschen einer Schicht aus dem Bodenaufbau - dort
     wird offenbar derselbe Dialog deleteSelectedBaueinheitDialog verwendet, der den zu löschenden Knoten erst auswählt und dann löscht.
     Es wird stattdessen derselbe Dialog gebraucht, der z.B. in einer Variablen zwischengespeicherten Node (der per Kontextmenü angewählt wird)
     löscht und den selectedNodeTreeBaueinheiten unangetastet lässt. **Update 28.01.2021**: Implementiert in baueinheiten.vue
     (neuer Dialog deleteBaueinheitDialog zusätzlich zu deleteSelectedBaueinheitDialog, der auch vom "Löschen"-Button oben über dem Tree
     benutzt wird). Am 29.01.2021 auch nachgezogen in baustoffe.vue.
285. ==**[WORK]**== (Prio 2) Weitere Verfeinerung der Feld-Validierung und Security bei Anmeldung und Registrierung,
     speziell für die Felder E-Mail-Adresse (Benutzerkennung) und Kennwort
     - a) ==**[TODO]**== In my-layout.vue: Die lazy-rules dort zeigen leider nicht gleich am Anfang das Ergebnis der Validation. Abschalten? Sniff Test: reactive-rules ist auch nicht besser! Aber: In einstellungen.vue werden :rules ohne v-bind:rules verwendet und ohne lazy-rules! Sniff Test damit in my-layout.vue zeigt aber auch keinen Unterschied!
       - Siehe https://forum.quasar-framework.org/topic/5062/email-validation-using-quasar-itself/6
       - Bessere Alternative: QForm mit @submit-Methode und @reset-Methode verwenden - siehe f) unten, Vorlage in details-tab-benutzer.vue
     - b) **[DONE]** Validierung der Felder für Benutzerkennung/E-Mail-Adresse, insbesondere bei Neuregistrierung in my-layout.vue. type="email" an q-input in Verbindung mit @submit am q-form und
       type="submit" am q-btn für "Registrierung absenden"? Funktionierte nicht. Deshalb eigene Validierung nach Vorlage auf
       https://forum.quasar-framework.org/topic/5062/email-validation-using-quasar-itself/4 implementiert für Anmeldung/Registrierung,
       Kennwort-Reset-Anforderung, Kennwort-Reset und Kontobestätigung.
     - c) **[DONE]** In authentifizierung.controller.js am Backend früher keine Einschränkungen/Validierungen für das Feld benutzer.kennWort - daher  
       zusätzlich diese im Frontend eingefügt für
       Registrierung in my-layout.vue, Kennwort-Reset in kennwort-reset-vue, Kennwort-Änderung in einstellungen.vue. Die Regeln
       beinhalten Mindestlänge, Großbuchstabe, Kleinbuchstabe, Sonderzeichen (siehe Code)
     - d) **[DONE]** Ursprünglich waren Registrierungen verboten auf Heroku (computed-Funktion computeDisableRegistrierenBenutzer in my-layout.vue). Am 31.01.2021 enabled (siehe auch #519), in Verbindung mit neuen Kennwortregeln (siehe oben) und Einschränkung der zur
       Registrierung zugelassenen E-Mail-Adressen am Frontend (my-layout.vue) und Backend (authentifzierung.controller.js)
     - e) **[DONE]** Nach Abmeldung, Registrierung, Kennwort-Reset, Kennwort-Reset-Anforderung, Kontobestätigung die Eingabefelder
       aus Security-Gründen leeren, sonst bleiben sensitive Inhalte dort stehen und sind einsehbar, z.B. wenn Abmeldung vergessen wird!
     - f) **[DONE]** In details-tab-benutzer.vue (Benutzerverwaltung für Admins) die Validierungen für E-Mail-Adresse und Kennwort
       ebenfalls nachgezogen - dort allerdigns QForm mit @submit-Methoden und @reset-Methoden am QForm statt an den QBtns verwendet -
       siehe Kommentare im Code dort! Dies hat den Vorteil, dass keine "doppelten" Validierungsfunktionen an den :disables der QBtns
       erforderlich sind, und automatisch die Verletzungen der Validierungen angezeigt werden beim Drücken des Buttons (dann mit type="submit")!
286. **[DONE]** (Prio 3) Im Bodenaufbau geht nach dem Speichern die Anzeige der ausgewählten Schicht verloren. Die Buttons
     für Verschieben und Löschen von Schichten bleiben aber aktiv, was verwirrend ist. Fixed von @ms:
     In baueinheit-bodenaufbau-baueigenschafts-profil-formular.js, am q-expansion-item für eine Schicht: header-class="selectedSchicht !== schicht" ersetzt durch :header-class="selectedSchicht != null && selectedSchicht.\_id !== schicht.\_id".
287. **[DONE]** Build Break of Heroku am 08.02.2021 - Dependency related Errors (findet manche Pakete nicht mehr, offenbar weil es "devDependencies" sind, keine (Production) Dependencies!)
     - Verschiedene Fehlversuche zur Lösung:
       - Quasar Upgrade auf V1.15.2
       - Quasar App (= Quasar CLI) Upgrade auf V1.9.6 (nicht gleich auf die neue V2 oder V3!!!)
       - QPdfViewer deinstalliert/neu installiert (eine der betroffenen Dependencies)
       - Auskommentierung der Zeile node-modules in .gitignore für bim-click-front-end (dies
         hängt mit QPdfViewer zusammen) - wirkungslos, daher den Kommentare für die Zeile wieder
         entfernt, d.h. node_modules wieder in das .gitignore aufgenommen
       - yarn entfernt aus "engines" Section in package.json (war aber nicht das Problem)
       - Diverse devDependencies in package.json nach Dependencies verschoben (wieder rückgängig gemacht)
     - Lösung: Das bisher angeblich notwendige, Heroku-spezifische Postbuild-Skript ganz entfernt aus package.json
       - "scripts": { ... "heroku-postbuild": "npm install --only=dev --no-shrinkwrap && npm run build"},
     - ==Update 09.08.2021==: Obige Zeile war wieder enabled im Heroku Build, funktionierte (offenbar wieder)
     - ==Update 09.08.2021==: Obige Zeile wieder disabled beim Versuch, Build für PWA zu enablen (quasar build -m pwa), Build funktioniert danach ohne diese Zeile. Weiter beobachten.
     - Links zum Thema:
       - https://forum.quasar-framework.org/topic/5666/how-to-deploy-spa-to-heroku/9 - Selbes Problem
         am 02.02.2020 von @jc_71950 gemeldet mit obigem Lösungsvorschlag
       - https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version
       - https://devcenter.heroku.com/articles/nodejs-support#heroku-specific-build-steps
       - https://www.wyeworks.com/blog/2018/01/08/how-to-quickly-deploy-a-vuejs-app-to-heroku/ - dort
         wurde diese ursprünglichen Postbuild Commands für Heroku empfohlen, es wird dort auch
         empfohlen, devDependencies zu vermeiden (allerdings sind diese durchaus sinnvoll für
         "Dev only" Pakete)
288. **[DONE]** (Prio 3) Package "Fibers" deinstalliert und damit aus devDependencies am Frontend entfernt. Es wird nicht benötigt, wurde früher vorsorglich installiert im Kontext von Package sass.
289. **[DONE]** (Prio 2) Auf Heroku funktionierte die Eintragung von Vorgabewerten bei der Profilaktivierung nicht. Test Case dafür auf Heroku:

- Profil "Allgemein > Test > Wertetypen", hat vordefiniert die zugeordneten Baueigenschaften "Allgemein > Test > Wertetypen > ..."
- Zunächst für Baueigenschaft "Allgemein > Test > Wertetypen > Herstellerkurzbezeichnung" "Knauf" als Vorgabewert in
  Feld bezeichnungsWert1, für "Allgemein > Test > Wertetypen > Dynamische Steifigkeit" 35 als Vorgabewert in Feld kennWert 1
  eingetragen, per User Interface für Baueigenschaftsprofile (das ist ein Unterschied zu lokalem Build - dort
  werden die Vorgabewerte für dieses Profil in back-end-server.js per API eingetragen!)
- Dann das Profil aktiviert an Blattknoten "Testbaustoff" - letzter Knoten unten im Baustoffbaum auf Heroku
- Im Gegensatz zu lokalen Tests funktioniert die Eintragung der Vorgabewerte bei dieser Profilaktivierung dort nicht
- Per Heroku Sever Log stimmt potentiell schon etwas mit den Vorgabewerten nicht, denn
  es erscheint dort für alle Baueigenschaften im Profil folgende Meldung für uebersichtAktivierungsErgebnis: "Keine definierten Elternknoten und keine Vorgabewerte" - letzteres
  stimmt eigentlich nicht!
- Gefixt in baueigenschaftsprofile.controller.js - dort wurde in Zeile 390 der Wertetyp nicht als 1.
  Parameter an die Methode pruefeDefiniertheitVonEigenschaft() übergeben. Dies führte dazu, dass
  per UI eingetragene Vorgabewerte nicht korrekt gespeichert wurden (das Feld definiertNichtUndefiniert
  im Array zugeordneteBaueigenschaften am Profil war dann "false" - bei Setzen der Vorgabwerte per API
  lokal in back-end-server.js war es auf "true", da das Feld dort explizit der Methode
  createBaueigenschaftsProfilAtServerStart() mitgegeben wird).

290. **[DONE]** (Prio 3) Die Test-Query readFilteredBaustoffe in baustoffe.controller.js warf auf Heroku (bisher nur bei
     getestet mit keinen Baustoffen, die die Filterbedingungen erfüllen, wegen #289) einen
     "MongoError: Path collision at baueigenschaften.typbezogeneBaueigenschaft remaining portion typbezogeneBaueigenschaft", Code 31249

- Dieser Error bleibt zusätzlich zunächst unhandled, daher Hang am Frontend! Eigentlich ist ein .catch
  im Code nach dem .then! Dort war ein Fehler im catch, Zugriff auf "status" statt 500 - gefixt
- Vermutlich tritt dieser Fehler auf Heroku mit MongoDB Atlas (neueste MongoDB Version 4.4.3) immer auf! Lokal arbeitet @ms mit MongoDB 4.2.5
- https://stackoverflow.com/questions/64059795/mongodb-get-error-message-mongoerror-path-collision-at-activity - Breaking Change in Mongo V4.4!
- Der Grund ist aber nicht der Zugriff im .elemMatch auf baueigenschaften.typbezogeneBaueigenschaft.\_id
  und auf Felder in baueigenschaften und auch nicht das dortige doppelte .elemMatch, sondern
  die Verwendung von baueigenschaften.\$ in der Projektion am .select!!! Gefixed, indem zunächst
  alle Baueigenschaften selektiert werden und danach ein Filterung in JS auf die für die Filterung
  relevanten Baueigenschaften

291. **[DONE]** (Prio 2) Im Profilformular "Bodenaufbau" werden die Schichten im Bodenaufbau nur noch
     angezeigt, wenn vorher im Bauvorhabenbaum der Bodenaufbau expandiert wurde und danach erst selektiert
     wird. Offenbar nimmt der Code an, dass die Kinder bereits geladen sind! In Version vom 12.02.2021 von Stefan gefixt!
292. **[DONE]** (Prio 3) Die Variablen Map_xyz in baueinheit-bodenaufbau-baueigenschafts-profil-formular.vue folgen nicht den
     camelCase-Konventionen, sondern sind eine Mischung aus Pascal_Case und camelCase. Umbenennung von @ms am 23.06.2021 durchgeführt.
293. **[DONE]** (Prio 2) Fehler bei der Eintragung von **Vorgabewerten bei Profilaktivierung** in Elternknoten.
     - ==**Achtung**==: User Error bei diesem Test - die Baueigenschaften im Profil "Allgemein > Test > Wertetypen" waren alle aktiviert am  
       Wurzelknoten, die meisten davon definiert!
     - Dennoch muss untersucht werden, warum sich die 4 unten genannten Baueigenschaften anders verhalten als der Rest - hat mit
       der Wertgleichheitsprüfung zu tun!
     - Ergebnis:
       - Die Vergleichsergebnisse sind korrekt, es handelt sich tatsächlich um kleine Unterschiede zwischen den
         Vorgabewerten und den in baueigenschaften.js definierten Initialwerten dieser Baueigenschaften, die im
         Wurzelknoten des Bauvorhabenbaums beim lokalen Server-Start eingetragen werden
       - Die einzigen Probleme in pruefeWertegleichheit() sind
         - 1. Aufzählungswerte werden nicht verglichen
         - 2. String-Vergleiche: Hier wird "" (wie es in den Initialwerten manchmal vorkommt) und null als ungleich behandelt,
              das sollte man ändern in der Prüflogik der Funktion (wird am Frontend auch als gleich behandelt und in
              pruefeDefiniertheitVonEigenschaft() in baueinheiten.controller.js und baustoffe.controller.js.
         - 3. Vergleich von Datumswerten (Mongo Typ Date) erfordert speziellen Code mit getTime() - siehe auch #295
       - Dies alles gefixt in pruefeWertgleichheit()
     - Ursprünglicher Testfall für diesen Defect: Profil "Allgemein > Test > Wertetypen" lokal an Einstein-Schule
       aktiviert am Obergeschoss. Die dortigen Eigenschaften haben bis auf wenige alle Vorgabewerte. Für 4 daraus wird jedoch
       auch der Vorgabewert
       eingetragen an den Elternknoten darüber (für Dynamische Steifigkeit, Geokoordinaten, Wärmedurchlasswiderstand,
       Wärmeleitfähigkeit)!
     - Das hängt mit der Prüfung
       pruefeWertgleichheit() in baueigenschafts-profile-aktivierungslogik zusammen - diese ergibt offenbar true
       bei den betroffenen Baueigenschaften.
     - Update: Dies ist korrekt - f+r diese 4 Eigenschaften sind tatsächlich die obigen Initialwerte und die Vorgabewerte
       identisch, für die anderen gibt es subtile Unterschiede, u.a. ist dort manchmal bezeichnungsWert1/2 = "" als Initialwert
       in baueigenschaften.js eingetragen für diese Baueigenschaften!
     - Wozu ist diese Wertgleichheitsprüfung überhaupt notwendig? Antwort von Stefan: Ohne diese Prüfung würden im Elternpfad,
       wenn dort schon
       dieselbe Baueigenschaft, die im Profil neu aktiviert wurde, vorher aktiviert wurde mit denselben (durch die
       Funktion als gleich erkannten) Werten,
       diese als undefiniert eingetragen werden im Elternpfad, was intuitiv als falsch betrachtet werden kann.
     - Diese Funktion wird aufgerufen mit der tiefsten aktivierten/definierten Baueigenschaft im Pfad und der
       zu aktivierenden Baueigenschaft als Parametern
     - Achtung: Diese Funktion enthält obigen Fehler, dass sie den Wertetyp "Aufzählungswert" in der Prüfung bisher nicht
       berücksichtigt!
     - Die Prüfungen dort auf Wertgleichheit erscheinen basieren nicht auf dem Wertetyp, sondern vergleichen die Felder,
       und geben "ungleich" zurück, sobald sie einen Unterschied feststellen (wenn alle Felder identisch sind, besteht
       Gleichheit)
     - Es gibt also deinitiv Inkonsistenzen zwischen den Wertefeldern für das initiale Anlegen der Vorgabewerte in
       back-end-server.js und den entsprechenden Feldern für selben Eigenschaften in baueigenschaften.js bzgl. Vollständigkeit und null- bzw. ""-Werten! Diese spielen die entscheidende Rolle bei den Vergleichen durch diese
       Funktion.
294. ==**[WORK]**== (Prio 2) Der obige Fehler #290 (Path Collision) trat neuerdings auch auf bei der Profilaktivierung auf
     Heroku, am Backend. Grund sind Projektionen, die Subdokumente (baueigenschaften.\$) enthalten zusammen mit Feldern auf selbem
     Level in baueigenschaften. Von Stefan schon gefixt in baueinheiten.controller.js. Noch nachzuziehen
     in baustoffe.controller.js, ggf. auch in baueigenschaften.controller.js. Diese Calls mit Aggregation Framework
     gemäß Empfehlung auf https://docs.mongodb.com/manual/release-notes/4.4-compatibility/#path-collision-slice-of-an-array-and-embedded-fields. ==**[WORK]**== Alle Fixes in baueinheiten.controller für #294 und
     für Folgefehler #296 sind auch in baustoffe.controller.js und ggf. baueigenschaften.controller.js nachzuziehen (markiert mit #294/#296).
     - ==**Update 16.03.2021**==: In baustoffe.controller.js alle Stellen nachgezogen. In baueigenschaften.controller.js
       gibt es in internalCreateBaueigenschaft() ebenfalls 4 gefährdete Stellen, dort trat auf Heroku aber bisher der
       Path Collision Error nicht auf. Daher diese vorläufig im alten Zustand belassen. Diese Stellen dort sind aber markiert mit #294. Weiter beobachten (Fehler müsste bei Neuerzeugung von Baueigenschaften auftreten).
295. **[DONE]** (Prio 2) Für aus Vorgabewerten stammende Datumswerte gibt es lokal einen Fehler im generischen
     Profilformular - diese werden inkorrekt angezeigt, z.B. 19.99.0101 statt 01.01.1999. Dies hängt mit der Kombination von
     QInput und QDate zusammen. In "Übersicht aller Baueigenschaften" und "Details" (native HTML Date) dafür werden diese korrekt angezeigt.
     - Ändert man den Vorgabewert von "1990-01-01" nach "01.01.1990", wird nach Profilaktivierung im generischen Profilformular
       angezeigt: 19.08.1231 - noch falscher. Benutzt man in back-end-server.js nicht das Format "YYYY-MM-DD", gibt es
       Mongoose Cast-Fehler auf Date im Log. Folglich muss dieser Fehler im Frontend liegen, in mounted:
       und in submitWerteAnBaueinheit() dort, wo diverse Date-Konvertierungen gemacht werden.
       Die Ursache hierfür waren letztendlich fehlende Konvertierungen von Date nach dem von QInput und QDate erwarteten
       String-Format (mask: "DD.MM.YYYY" am QDate, mask:"##.##.####" am QInput) speziell in mounted: - diese waren nur bei Reset
       und watch: (= Refresh) enthalten. Dieser Fehler war spezifisch für das generische Profilformular.
     - Beim Speichern gab es einen weiteren Fehler wegen falscher Rückkonvertierung der auf dem Hinweg in Strings im Format
       "DD.MM.YYYY" umgewandelten Felder datumsWert1/2 von String in das von Mongoose erwartete Date-Format, gefixt.
       Diesen Fehler auch in allen spezifischen Profilformularen (Standort, Gebäude, Bodenaufbau, Schicht) gefixt.
     - Nach Bearbeitung mit QDate scheiterte außerdem zusätzlich auch noch das Speichern am Backend, mit TypeError:
       eigenschaft2.datumsWert1.getTime is not a function, dies
       kam aus dem neuen Code für #293 in pruefeWertgleichheit() - dort mussten zusätzliche "new Date"-Aufrufe in die Vergleiche
       eingebaut werden (siehe Kommentare dort).
296. **[DONE]** (Prio 2) Folgefehler aus #294 - zunächst Fehler beim Deaktivieren, TypeError: Cannot read property
     'populierteTypbezogeneBaueigenschaft' of undefined, baueinheiten.controller.js:5443:48
     Dort problematisches aggregate, die \_id Statements nach Vorlage von Stefan ersetzt dort. Damit funktioniert es dann.
     Es gibt aber noch weitere problematische aggregates! Zeile 4675 ff. in baueinheiten.controller zu untersuchen. Die
     Query enthielt hard coded "Einstein-Schule", gefixt. Trotzdem passiert dann noch ein Fehler beim
     Aktivieren einer Baueigenschaft an einem Zielknoten (z.B. Splash-Erlebnisbad), die am Elternknoten definierte Werte hat (z.B. nach Aktivierung von Profil "Allgemein > Test > Wertetypen" am Splash-Erlebnisbad, dann Deaktivierung der Test-Baueigenschaft nur am Zielknoten, dann Reaktivierung). Wie man im Backend Server Log sieht, denkt der Code,
     dass die Baueigenschaft am Elternknoten undefiniert ist, und lässt die aktivierte Baueigenschaft am Zielknoten irrtümlich undefiniert. Es kommt im Console Log "Es existiert kein Elternknoten, an dem die zu aktivierende Baueigenschaft definierte Werte hat". Fehler in findeDefinierteElternBaueigenschaft(), die von #294 betroffen ist, und neue Query erhielt mit Aggregation Framework? Oder Fehler schon vor Aufruf, wo ebenfalls neue Query mit
     Aggregation Framework ausgeführt wird? Unwahrscheinlich per Log. Funktion liefert per Log fälschlich leeren Array [] zurück! Tatsächlich benötigte auch das \$ne mit Vergleich gegen Array aus Ids eine Konvertierung in einen
     Array aus Mongoose Ids!
297. **[DONE]** (Prio 2) Der neue Code ab Zeile 638 ff. in baueigenschafts-profile-aktivierungslogik.js, schreibeInhalteAusProfilformular()
     ("Mitgebrachte Frontend-Werte sind undefiniert (z.B. durch Benutzereingabe, "Backspace-Taste")") muss mit Stefan reviewed werden. Erledigt - siehe Kommentare dort.
298. **[DONE]** (Prio 3) Auf Heroku und lokal festgestellt: Refresh-Problem nach Update von
     Baueigenschaftsbeschreibungen (Markdown). Nach Speichern sind diese in der Datenbank
     korrekt, aber beim Wieder-Öffnen des Tabs "Beschreibung" ist dieses manchmal noch im alten Zustand. Gefixt in
     updateBaueigenschaftsBeschreibungAusgewaehlteBaueigenschaft() - dort den geänderten Wert nach dem put nicht nur in
     ausgewaehlteBaueigenschaft, sondern auch in selectedRowsTableBaueigenschaften[0].typbezogeneBaueigenschaft.baueigenschaftsBeschreibung aktualisieren! Gefixt in baueinheiten.controller und baustoffe.controller.
299. **[DONE]** (Prio 3) In baueinheiten.controller.js, createEinzelschicht(), steht vorgabeWerteUeberschreibenVorhandenWerte auf false, Default
     ist aber true! Dito in baueigenschafts-profile-aktivierungslogik.js (markiert mit #299). Beim Server Start erscheint im Console Log auch einmal die Meldung, dass der Parameter false ist!!! Übeerall von false auf true umgestellt.
300. **[DONE]** (Prio 3) Auf Heroku: Für Baueigenschaft "Baueinheit > Gebäude > Geometrie > Eingang > Niveau > Fertigboden > Oberkante (OKFFB EG)"
     und 2 weitere konnte am EG der Einstein-Schule keine Gütebewertung abgespeichert werden. Ist auch lokal reproduzierbar.
     Am Backend zeigt updateBaueigenschaftAnBaueinheit dieses Feld anders im Log an als andere ('güteBewertung' statt güteBewertung). Das liegt aber
     am Umlaut im Namen, ist für andere Felder auch so und wohl nicht die Ursache. Das Feld "güteBewertung" wurde ja vor einiger Zeit verlagert in die wertbezogenen Baueigenschaften. Gefixt in erstelleMongooseUpdateQueryPartNewValuesObjekt() in baueinheiten.controller
     und baustoffe.controller - allerdings die Gütebewertung nur berücksichtigt und gespeichert, wenn definierte Werte übergeben wurden. Entsprechenden
     Hinweis im Frontend hinzugefügt und Disabling des Felds am Frontend, wenn die Werte der Baueigenchaft undefiniert sind.
301. ==**[WORK]**== (Prio 2) Probleme mit VMoney in Profilformular "Geschoss" - es funktioniert zwar, aber es gibt
     versteckte Probleme damit:
     - Oberflächlich unschädliche Vue Warnings bei null-Werten in von VMoney verwalteten Feldern im Browser Log
       - Diese können teilweise umgangen werden, indem die computed-Funktionen "0" oder 0 returnen statt null
       - Dies zwingt aber dazu, dass wir null als undefinierten Wert aufgeben!?!
       - Dies temporär in den 10 computeNull/NHN... computed-Funktionen testweise so eingebaut
       - Es kommen dann nach Refresh aber immer noch Warnungen aus den 8 Niveaufeldern mit VMoney in der linken Spalte -
         dort sind keine computed-Funktionen, sondern dies Warnungen kommen offenbar, weil beim ersten Laden
         das v-model jeweils null ist - VMoney löst dann obige Warnungen aus, und zeigt aber "0.0" (nicht Blank) für diese Werte an!
     - Tatsächlich scheint VMoney wohl immer "0.0" in ein Feld zu schreiben, wenn es null ist!
     - Lösungsversuche:
       - Testweise einige Felder mit v-if="computeNullNiveauXYZ != null" bestückt, dies reduziert die Warnungen, aber
         die Felder werden dann, wenn die computed-Funktion tatsächlich regulär null zurückliefern möchte, gar nicht
         mehr angezeigt, daher ist das auch keine Lösung!
       - In mounted/refresh/reset könnte man alle null-Werte für Kennwertepaare nach 0 umwandeln, aber dann kann man
         sie auf dem Rückweg nicht mehr erkennen und nach null rückumwandeln!
       - Unsere Vererbungslogik basiert auf null === undefiniert und käme durcheinander!
     - https://github.com/vuejs-tips/v-money/issues/15
       - VMoney wird nicht mehr maintained!
       - VueAutoNumeric wird empfohlen, zeigt Blank, wenn Wert null ist, nicht wie VMoney
         - https://github.com/autoNumeric/vue-autoNumeric
         - http://autonumeric.org/
         - http://autonumeric.org/configurator - Configurator für Options Generation
       - Oder: https://github.com/dm4t2/vue-currency-input
     - https://www.npmjs.com/package/vue-autonumeric - 1053 Downloads/Woche
       - https://codepen.io/AnotherLinuxUser/pen/pWgOrZ?editors=1010 - Codepen
     - Erste Tests mit VueAutoNumeric sind sehr positiv:
       - npm install autonumeric --save
       - npm install vue-autonumeric --save
       - import VueAutonumeric from 'vue-autonumeric';
       - Hinweis aus Doku:
       - However, when doing that if you want to be able to bundle all the scripts together with  
         Webpack, you'll need to define an alias for the AutoNumeric library in your Webpack config, otherwise
         Webpack will complain about the npm package autonumeric case. (Anleitung für Alias dort)
       - components: components: { ..., VueAutonumeric },
       - <vue-autonumeric> ... </vue-autonumeric> <!-- Analog zur Einbettung von v-money -->
       - Options: Siehe verwaltung.vue (ggf. mit Generator erzeugbar - siehe Link oben)
       - Mehr Formatierungsmöglichkeiten, inklusive Minimum/Maximum u.v.m.
       - "Null"-Support für das v-model, Typ wird dann als "Object" angezeigt, wenn man ein Feld ausnullt z.B. mit Delete-Taste - dies kann
         offenbar noch durch eine Option emptyInputBehavior beeinflusst werden
       - Der Typ des v-models scheint ansonsten stets Number zu sein - d.h. Dezimalstring wird wie gewünscht nur zur Anzeige verwendet!
       - Damit können vermutlich alle Berechnungen in computed-Funktionen und Buttons auf Number umgestellt werden
         (ggf. mit Rundungskorrektur), ohne die lästige Hin- und Herkonvertierung zwischen Dezimalstring und Number!!!
       - Auch die Rückkonvertierung für Niveaus von String nach Number vor dem Submit an das Backend kann damit ebenfalls entfallen!
       - Die Funktionen in decimal-handling.js bleiben dennoch nützlich für die Anzeige von Dezimalzahlen auch ohne
         VueAutoNumeric oder VMoney
     - Profilformular "Geschoss" am 03.03.2021 umgestellt von VMoney auf VueAutoNumeric
     - Es gab damit zunächst einen Heroku Build Fehler, der einen Webpack Alias in quasar.conf.js zur Lösung benötigte - Beschreibung in
       Kommmentaren in quasar.conf.js
     - Für die Soll-/Istwertanzeige im Profilformular "Raum" mit Initialisierung der Felder für die Istwerte mit ererbten Sollwerten
       ist nach wie vor eine Initialisierung (falls der Istwert null ist) in mounted() erforderlich - siehe Testbeispiel in
       verwaltung.vue! Auf dem Rückweg können diese mit VueAutoNumeric angezeigten und ggf. vom Benutzer geänderten Werte jedoch
       direkt gespeichert werden ohne umständliche Rückkonvertierung, weil VueAutoNumeric das v-model weiterhin als Number behandelt, wie
       es auch von unserem Backend erwartet wird, und null-Werte können weiterhin gemäß BIM.click-Design als undefinierte Werte
       identifiziert und behandelt werden (VMoney schrieb "0.00" in alle null-Werte)
     - **[DONE]** VMoney deinstalliert (unnötige Dependency) mit npm uninstall v-money
     - ==**[TODO]**== Verbleibend:
       - Doc PR für Quasar zur Benutzung von VueAutoNumeric: https://github.com/quasarframework/quasar/pull/8568
       - Computed-Funktionen streamlinen - diese sind für VMoney geschrieben und daher unnötig komplex
       - Feldvalidierung noch ausbauen
       - Null-Handling in einigen Funktionen überprüfen (z.B. die Addition/Subtraktion von 0.01 per Button)
       - Responsive Design dort angewendet - noch fine Tuning nötig
302. ==**[WORK]**== (Prio 3) Im Profilformular "Bodenaufbau" sind einige Bereinigungen notwendig:
     - **[DONE]** Erledigt:
       - Überarbeitung der Baueigenschaften im Profil "Baueinheit > Bodenaufbau" - siehe Kommentare
         (markiert mit #302) in back-end-server.js, wo das Baueigenschaftsprofil dafür angelegt wird)
       - 5 Baueigenschaften für Aufbauhöhe/Dicken umbenannt (auch auf Heroku)
       - 13 gemeinsame Baueigenschaften mit "Raum" statt wie bisher "Geschoss"
       - Weitere gemeinsame Baueigenschaft mit "Baueinheit > Gebäude" (OKFFB EG) zur Berechnung von NHN-Werten
       - Profil "Baueinheit > Bodenaufbau" hat jetzt 1 BEg gemeinsam mit "Baueinheit > Bauvorhaben", 2 mit "Baueinheit > Gebäude", 13 mit "Baueinheit > Raum" und 18 am Bodenaufbau selbst
       - Anzeige und NHN-Berechnung der Niveaus vom Raum
       - computed-Funktionen für Aufbauhöhe und Dicken
       - Soll-/Istwertvergleiche "Raum" vs. "Bodenaufbau"
       - Bezeichnungen für Schichttyp von Schichten angepasst, z.B. "Rohboden" statt "Rohdecke", "Unterboden" statt
         "Unterdecke" (zählt zur "Bodenunterseite" als Kategorie), auf Heroku manuell geändert in den Options, sowie im
         Code für Bodenaufbau und back-end-server.js.
       - Einheiten sind verschieden für Dicken (mm am Bodenaufbau vs. m am Raum) - im Rahmen von #305 umgerechnet
     - ==**[TODO]**== Verbleibend:
       - Etwaige verbleibende Rundungsfehler bei Dezimalzahlen ausmerzen (mit Math.round() - viele schon vorläufig damit behandelt)
       - Absenkung des Rohbodens: Vorläufig disabled, der eventuelle Sollwert dafür wird aktuell am Raum noch gar nicht berechnet und weitervererbt, macht aber eventuell sowieso keinen Sinn
         (gemeint war damit z.B. eine Absenkung im Raum für eine Dusche?)
       - Andere Rubriken außer "Geometrie" überarbeiten, z.B. Lastannahmen (Nutzlastenkategorie - siehe Kommentare in layout-baueinheit-baueinheit-bodenaufbau-baueigenschafts-profil-formular.js)
303. **[DONE]** (Prio 3) Close-Action für Benutzernachrichten mit Quasar Notify Plugin: Z.B. wie in https://forum.quasar-framework.org/topic/7953/notify-plugin-with-click-action/2 - betrifft Notify in global-store.js. Bessere Lösung: Siehe https://quasar.dev/quasar-plugins/notify#setting-defaults - in /src/boot/notify-defaults.js die Zeile enablen: actions: [{ icon: 'close', color: 'white' }].
304. ==**[TODO]**== (Prio 3) :disable an allen Eingabefelder in Abhängigkeit von Benutzerrolle: Eventuell alle umstellen auf :readonly. Vorteil:
     Tooltip und Clipboard sind enabled auf readonly-Feldern, nicht auf disableten Feldern. Readonly funktioniert auch in Verbindung
     mit Dezimalwert-Feldern mit VueAutonNumeric. Per CodePen Test können auch beide zusammen verwendet werden - disable hat Präzedenz über readonly.
305. **[DONE]** (Prio 3) Input von Erik: Bodenaufbau sollte alle Maße in mm haben, nicht cm wie BTK-Builder, und diese
     (ggf. mit Rundung) gegen m-Maße aus Raum vergleichen). D.h. wir verwenden nur 2 Maße (m, mm), nicht 3 (m, cm, mm). Die
     aktuellen Funktionen zum Soll-/Istwertevergleich in der Rubrik "Geometrie" am Bodenaufbau haben sowieso noch einen Fehler,
     dass sie die Sollwerte aus dem Raum (in m) mit den Istwerten am Bodenaufbau (laut Text in Spalte "Einheit" in mm) ohne
     Umrechnung vergleichen - wenn die Istwerte tatsächlich in mm sein sollen, müssten entweder die Sollwerte mit 1000
     multipliziert werden vor dem Vergleich oder die Istwerte durch 1000 dividiert werden! Aktueller Workaround (nur auf Heroku): Dort die Einheit für diese Dicken von "mm"
     (aus dem Baueigenschaften-Import) nach "m (vorläufig)", umbenannt, damit der Vergleich vorläufig stimmt (falls bei
     den Istwerten auch Werte in m eingegeben werden). Im August 2021 dies in bodenaufbau-profil-eigenschafts-formular.vue korrigiert, sollIstWerteVergleich_02() - Division durch 1000 für
     die betroffenen Dicken, gesteuert über zusätzlichen Parameter an dieser Funktion. Auf Heroku dann die
     Einheiten dieser Baueigenschaften wieder auf "mm" geändert.
306. ==**[WORK]**== (Prio 3) Prioritäten für Unter-Tabs im Profilformular "Raum": Boden/Decke, Maße, Feuchte, Energie (alle **[DONE]**), Gebrauchstauglichkeit/Lastannahmen/Verkehrssicherheit/Barrierefreiheit, Abdichtung/Korrosion. Außerdem: Profilformular "Bodenaufbau" entsprechend
     anpassen bzgl. vom Raum geerbter Attribute, "Schicht" überarbeiten (inklusive #305 - erledigt). Nutzungsspezifische Raumprofile anlegen und
     diese per QSelect in den Profilformularen für Räume aktivieren - ist bereits implementiert in Funktion aendereNutzungsProfil().
307. ==**[WORK]**== (Prio 2) Sporadische Out-of-Memory-Probleme am Browser, besonders während Refreshes des Bauvorhabenbaums nach Speichern:
     - Monitoring mit Tools
     - Guidelines für Memory Leaks auf https://vuejs.org/v2/cookbook/avoiding-memory-leaks.html - Lifecycle Hooks
       von Vue verwenden für Cleanup!
     - Einflüsse verstehen, z.B.:
       - Die Anzahl der bisher geöffneten Knoten ist vermutlich direkt proportional zur Anzahl der Knoten, die
         beim Refresh in den Browser-Speicher geladen werden
     - Performance Tuning im Code, z.B.:
       - [307.a] Optimierungen des Refresh-Algorithums nach Neu-Laden der Bäume:
         - Z.B. nur noch den aktuell ausgewählten Knoten und eventuell dessen Kindknoten refreshen, andere Knoten ggf.
           zuklappen (hilfreich z.B. beim Refresh
           nach Speichern eines Baueigenschaftsprofilformulars an einem ausgewählten Knoten, was häufig vorkommt).
         - ==**[WORK]**== Optimierte Variante des rekursiven Refreshs - Stefan hat experimentellen Code dafür, der
           Eingriffe am Frontend
           und Backend erfordert. Diese würde helfen, die Dauer des Refreshs zu reduzieren. Siehe **Epic 38.g** im internen
           Design dazu.
       - [307.b] Fachliche Rubriken nicht mehr laden für eine Baueigenschaft, bzw. nur noch laden, in APIs, die aus
         BEg-Admin-Panels aufgerufen
         werden - in den Baueigenschafsprofilformularen werden die fachlichen Rubriken normalerweise nicht verwendet! Dies dürfte
         über 50% Speicherplatz einsparen pro geladener Baueigenschaft!
       - [307.c] Wenn Knoten unterster Knoten ist, an dem eine Baueigenschaft aktiviert ist, in dessen Kindknoten diese
         Baueigenschaft nicht mehr
         laden (dann allerdings auch das Aktivieren für diese Baueigenschaft in den Kindknoten verbieten - außerdem gibt
         es Ausnahmen,
         wenn eine Baueigenschaft in mehreren Profilen gemeinsam verwendet wird, wie z.B. das NHN-Niveau am Gebäudeingang)
       - **[DONE]** [307.d][performance] Optionen von bestimmten speicherhungrigen Aufzählungswerten mit sehr vielen auswählbaren
         Optionen nicht mehr "duplizieren" - diese stammen zwar aus den typbezogenen Baueigenschaften
         (d.h. sie sind zentral verwaltet), aber sie werden in den Array der Baueigenschaften an Baueinheiten/Baustoffen
         populiert und "cluttern" damit den Speicher - als Optimierung diese nicht mehr populieren, sondern "on Demand" vom Backend
         holen. Dies sind zuallerst die Aufzählungswerte für Gemeinden/Kommunen (auftgeteilt nach Bundesländern). Diese (nur diese!) sollten
         als Optimierung nicht populiert werden, sondern "on Demand" vom Backend geholt werden. Die Implementierung
         könnte analog sein zum QSelect für Gemeindeschlüssel in baueinheit-standort-baueigenschafts-profil-formular.vue.
         Das VModel dafür wäre dann kein Aufzählungswert mehr, sondern ein Bezeichnungswert. Die Options für das QSelect würden
         dann in mounted() aus einer JSON-Datei geladen und kämen somit nicht mehr aus den populierten typbezogenen Baueigenschaften, wie die selektierbaren Options von regulären Aufzählungswerten! Die Umstellung muss allerdings berücksichtigen, dass
         es auf Heroku schon viele Baueinheiten gibt, die die bisherigen Aufzählungswerte benutzen. Diese müssten, wenn sie
         in Bezeichnungswerte umgewandelt werden, ihre Werte statt im Feld aufzaehlungsWert im Feld bezeichnungsWert1 halten.
         Das heißt, es ist ein Datenbank-Migration-Script notwendig, welches das Feld aufzaehlungsWert umkopiert nach
         bezeichnungsWert1 in den wertbezogenen Baueigenschaften für die betroffenen "Gemeinde"-Baueigenschaften in allen
         Baueinheiten, auf MongoDB Cloud Atlas für Heroku). Dafür bereits lokal ein Node Modul getestet:
         mongo-db-migration-baueinheiten-baueigenschaften-kommunen.js. Siehe Kommentare dort. Dieses wandelt
         am Ende auch den Wertetyp der typbezogenen Baueigenschaft um von "Bezeichnungswert" nach "Aufzählungswert".
         Am 12./13.05.2021 dann nach folgendem Ablauf den Code und die Datenbanken umgestellt:
         - Betroffene 13 Kommunen-Baueigenschaften lokal umstellen von Aufzählungswerten nach Bezeichnungswerten
         - Frontend-Code (Standort) lokal umstellen (Zugriff auf Options per JSON statt aus den Baueigenschaften)
           - Achtung: Diese werden per v-for prozessiert, es handelt sich um Rubrik 4 (für v-if an :options, das
             bereits vorhandene v-if am QSelect muss dabei erweitert werden auf Abfrage auf Aufzählungswert oder Bezeichnungswert!
         - Heroku Zugriff sperren für Migration
         - Neuen Frontend Code deployen (speziell Profilformular für "Standort" - dieses unterstützt sowohl Kommunen als
           Aufzählungswerte (alt) als auch als Bezeichnungswerte (neu), d.h. ist rückwärtskompatibel!
         - Datenbank-Skript zur Umstellung der Cloud-Atlas DB laufen lassen (13 mal für alle Kommunen)
         - Heroku Zugriff wieder erlauben
           Hinweis: Allerdings kann man bei dieser Gelegenheit nicht einfach
           generell alle Aufzählungswerte umstellen, denn das Feld aufzaehlungsWert im Mongoose Model vom Typ Array of String für
           potentielle Mehrfachauswahl (bei Gemeinden nur Einfachauswahl, deshalb ist dort eine Umstellung möglich nach bezeichnungsWert1,
           während die Felder bezeichnungsWert1/2 einfache String-Felder sind im Model.
       - [307.e] "Keep alive" für Baueigenschaftsprofilformulare abschalten - dann werden diese jedes Mal neu geladen -
         Auswirkungen sind zu testen
       - ==**[WORK]**== [307.f] Kein stringify der JSON am Backend - letzteres testweise in 2 Methoden in baueinheiten.
         controller eingebaut, markiert mit #307.f
308. **[DONE]** (Prio 3) "Durch Wasser aufquellendes Gestein (Anhydrit)" aufnehmen in Hydrogeologische Risiken (Wasser).
     Option für den betroffenen Aufzählungswert auch auf Heroku hinzugefügt.
309. **[DONE]** (Prio 3) In "Baueinheit > Raum > Maße" ausstehende Items:
     - **[DONE]** Initalisierung von Istwerten aus Sollwerten in mounted, reset, watch (= refresh)
     - **[DONE]** customBackgroundColorIstWerteFelder, customStandoutColorIstWerteFelder
     - **[DONE]** Vergleich von Soll- und Istwerten
     - **[DONE]** @click-Funktionen für Fläche, Volumen
     - **[DONE]** Styling, Hinweise
     - **[DONE]** Buttons für Reset Istwerte auf Sollwerte
     - **[DONE]** Hints zur Unterscheidung "Berechnet" > "Handeingabe" > "Vorbelegt" etc.
     - **[DONE]** Warnung im Log: V-Model sollte Array sein für die 2 q-option-groups auf Wahrheitswerten links oben, Speichern scheint aber zu funktionieren! Durch q-checkboxes ersetzt.
310. **[DONE]** (Prio 3) Zulassung spezielle E-Mail-Adresse für Masterarbeit zur Registrierung
311. ==**[TODO]**== (Prio 3) Im Bodenaufbau beim Neu-Einfügen einer Schicht unten diese auch selektieren. Bisher nicht erfolgreich,
     wegen Timing-Problemen beim Refresh. Siehe Kommentare in createSchicht() in baueinheit-bodenaufbau-baueigenschafts-profil-formular.js.
     Am Anfang der Methode Kommentare, dass die Methode "umgebaut" werden muss!!!
312. **[DONE]** (Prio 2) Im Baustoffbaum funktioniert das Abspeichern von Werten für aktivierte Baueigenschaften aus der
     Maske "Baustoffe > Baueigenschaften an Baustoff > Details zur ausgewählten Baueinheit" nicht (lokal funktioniert es dagegen). Der Grund ist Path Collision Error in aktiviereBaueigenschaftAnBaustoff().
     Daher #294/#296 nachgezogen an 2 Stellen in baustoffe.controller.js.
313. **[DONE]** (Prio 3) In baueigenschaften.controller.js gibt es in internalCreateBaueigenschaft() eine problematische
     Stelle im Code (onfullfilled, ist undefined per Log, die Stelle im Code ist markiert mit #313), die verbessert werden sollte. Sie
     führt zum Senden einer Response mit undefiniertem Feld data im API bei Status 200. Stattdessen eine Text-Message geschickt.
     Den Code, der dazu führt, dass onfullfilled undefined ist, zu ändern, wäre komplex - alle beteiligten Funktionen müssten einheitlich
     Promises oder Results zurückgeben (Refactoring am Backend, unter Berücksichtigung der ".that."-Struktur) - deferred.
314. **[DONE]** (Prio 1) Am 24.03.2021 **Frontend Build Break auf Heroku:**
     - Fehlermeldung (irreführend!): "Quasar App Extension "@quasar/qpdfviewer" is missing..."
     - Lösung nach Chat mit Jeff Galbraith auf dem Quasar Discord Channel: Downgrade des auf Heroku verwendeten Node Levels in
       package.json: "engines": { "node": "12.x" } statt "engines": { "node": ">=12.16.1" }
     - Das alleine halft aber noch nicht: Auch der NPM Level musste angepasst werden, von { npm: ">=6.13.4 } nach npm: "6.x" }
     - Siehe auch https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version.
     - Als letztes Mittel könnte auch der
       QPDFViewer ausgebaut werden, z.B. indem man in quasar.extensions.json die Zeile für QPDFViewer entfernt.
     - QPDFViewer war aber nicht die Ursache, sondern nur der Betroffene bei diesem Quasar Build Break wegen falscher Node und
       NPM Level!
     - ==Jeff Galbraith empfiehlt: Node Level 12 für Quasar V1!==
     - ==Ungerade Node Levels wie z.B. 13 sind experimentell, nicht für Production!==
     - Zusätzliche wichtige Info für den Node Level von Ravzan Stonescu auf https://github.com/quasarframework/quasar/issues/6884:
       Due to the Webpack v4 and its dependencies, ==it's recommended that you use Node.js 12 for Quasar v1.== The file change
       detection will not be working correctly or efficiently (this has impact over HMR !). It doesn't mean that newer Node.js
       versions won't somewhat appear to work, but you'll most likely get a lot of headaches as time goes by because almost all
       webpack plugins might get in trouble with newer Node.js (as they will not get the needed updates). All focus in the webpack
       world is now on Webpack 5 (which Qv2 supports). ==Best way is to upgrade to Quasar v2 or stick with Node.js 12 for Qv1
       for a painless experience.==
     - Siehe auch (für Quasar V1): https://v1.quasar.dev/quasar-cli/installation - ==Do not use any Node version higher than
       12. Do not use uneven Node versions i.e. 11, 13, etc.==
     - Quasar V2 unterstüzt Node.js 14. Upgrade von Quasar V1 nach V2 erfordert größere Änderungen (Vue V3), siehe Upgrade
       Guide.
315. ==**[WORK]**== (Prio 3) Für "Standort" > "Außenluft": Validierung für PLZ (teilweise erledigt mit :rule am PLZ-Eingabefeld, die allerdings nur warnt, sowie
     mit Fehlermeldung, falls PLZ vom API für Ermittlung der Normtemperaturen nicht gefunden wurde (404)), awaits optimieren
316. ==**[TODO]**== (Prio 3) Für Aufzählungswerte sollte auch die Angabe von Symbol/Einheit/Formel möglich sein, wie für Kennwerte. Grund: Es gibt
     bestimmte Aufzählunswerte, z.B. Delta-p und Delta-v bei "Feuchte", die Einheiten haben sollten.
317. ==**[WORK]**== (Prio 3) Bei der Anzeige von Baueigenschaften mit Markdown-Symbolen und -Einheiten kommen neuerdings (?) in den
     QTables für Baueigenschaften in baueinheiten.vue und baueigenschaften.vue viele Vue Warnings: Error in callback for watcher "src" - cannot read property "replace" of null. Steht per Log wohl im Zusammenhang mit der Prop von q-markdown, in der die
     Markdown Source, z.B. :src="props.row.typbezogeneBaueigenschaft.symbol" angegeben wird. Der Fehler könnte auch auftreten, wenn
     der Markdown null ist (?). Es wird auch noch eine Spalte angezeigt für "Operator" - wenn man für diese testweise den Markdown für "Symbol" anzeigt, kommen aber trotzdem die Warnings. ==**Update 25.06.2021**==: Problem ist aktuell nicht mehr reproduzierbar.
318. **[DONE]** (Prio 3) In "Standort" > "Außenluft" und "Baueinheit > Raum > Luftfeuchte": step="0.1" an den q-inputs überprüfen und konsistent machen mit den Dezimalstellen
     der computed-Funktionen in math-handling.js.
319. **[DONE]** (Prio 3) In "Baueinheit > Raum > Luftfeuchte", 3. Quadrant, werden beim Reset per dortigem Button nicht die 4 Felder für
     den Sättigungsdampfdruck Innenluft resetted. Der Grund dafür ist, dass die computed-Funktion für diese Felder zwar aufgerufen
     werden, wenn sich die Temperatur ändert, aber weil die Temperatur in diesem Fall null ist, returnen diese, ohne die betreffenden
     Felder zu aktualisieren per $set. Hotfix dafür eingebaut in der @click-Methode für den Button. Eventuell sollten auch bei null 
    die Felder per $set auf null aktualisiert werden. Dies sollte konsistent behandelt werden für alle computed-Funktionen. Wird in #320 behandelt. Daher den Hotfix für #319 wieder disabled.
320. ==**[WORK]**== (Prio 3) In "Baueinheit > Raum > Luftfeuchte", in allen computed-Funktionen: Dort die "return null", falls eines
     der Input-Felder für die Berechnungen null ist, disabled (gekennzeichnet mit #320). Vorteil: dann wird auch $set weiter unten mit null 
    aufgerufen (d.h. es erfolgt eine korrekte Aktualisierung v-model). Die aufgerufenen Funktionen zur eigentlichen 
    Berechnung in math-handling.js wurden auf diesen Fall vorbereitet und liefern dann null zurück - dieser Wert geht
    dann ein in die v-Model-Aktualisierung per $set. Ist noch weiter zu testen.
321. ==**[TODO]**== (Prio 3) In "Standort" > "Lage" funktioniert im Zusammenspiel mit den Berechnungen in "Standort" >
     "Außenluft" das Wechseln der PLZ, nicht aber ein Reset auf null. Bei Reset auf null bleiben die alten Werte stehen.
322. **[DONE]** (Prio 3) Restarbeiten "Baueinheit > Raum > Luftfeuchte":
     - [DONE] Anzeigetexte und Tooltips für Quadrant 3: Wasserdampfpartialdrücke und Relative Innenluftfeuchten überarbeiten auf Grund
       neuer computed-Formeln (z.B. DIN 4108-2 Wert ist fix 50% Luftfeuchte)
     - [DONE] BEg-Bezeichnungen und Anzeigetexte für Quadrant 3: Umbenennungen von "Mindest-Sättigungsdampfdruck" in  
       "Höchst-Wasserdampfpartialdruck" für 3 x 3 BEgs, inklusive Anzeigetexte und Tooltips, manuell auf Heroku
     - [DONE] Umschaltung testen von "Innenluftfeuchte geregelt?"
     - [DONE] Entscheidung Formel für ungeregelten Fall in Quadrant 3, Spalte 4: Wird aktuell mit selber Formel wie Spalte 1
       berechnet, geregelt wie Spalte 2 - ist okay nach Demo mit Erik
323. ==**[TODO]**== (Prio 3) Die Baueigenschaft "Baueinheit > Raum > Nutzung > Profil" sollte von einem Bezeichnungswert in
     einen geeigneten Aufzählungswert umdefiniert werden. Sie muss allerdings im Gegensatz zu dem Array of Objects
     in raum-nutzungs-arten-und-profile.js Array of Strings sein,
     sonst Mongoose Cast Errors beim Speichern!
     Dazu sind auch Änderungen in baueinheit-raum-baueigenschafts-profil-formular notwendig, markiert
     mit #323. Außerdem muss in diese Baueigenschaft beim Aktivieren des Profils "Baueinheit > Raum" der Wert "Baueinheit > Raum" eingetragen
     werden! Derzeit ist diese by Default null. Das Aktivieren des Profils "Baueinheit > Raum" kann erfolgen:
     - a) per Kontextmenüs an vorhandenen Baueinheiten
     - b) üer Kontextmenüs an neu angelegten Kindbaueinheiten!
     - c) per Admin-Funktion
       In allen Fällen muss der Wert "Baueinheit > Raum" für diese Baueigenschaft eingetragen werden. Erfordert eventuell neue APIs? Bessere Lösung: Nutzen von Vorgabewerten - damit wird
       "Baueinheit > Raum" bei Profilaktivierung und korrekt gesetztem Parameter vorgabeWerteUeberschreibenVorhandeneWerte korrekt eingetragen. Bereits implementiert
       in back-end-sever.js, geflagt mit #323. Auch auf Heroku entsprechenden Vorgabewert "Baueinheit > Raum" für diese Baueigenschaft per Admin UI eingetragen - funktioniert
       hervorragend, beim Aktivieren des Profils "Baueinheit > Raum" wird der Vorgabewert dann automatisch eingetragen!
324. ==**[WORK]**== (Prio 3) Sortierung von Geschossen. Zunächst umgekehrt alphabetisch nach Baueinheitsbezeichnung, in readKindKnotenBaueinheit()
     in baueinheiten.controller.js. Dann alternative Variante nachh aufsteigendem 0,0-Wert von OKFFB implementiert. Könnte optional noch steuerbar über eine Benutzereinstellung gemacht werden.
325. ==**[WORK]**== (Prio 2) Es kommt zu einer Vue Warnung in baustoffe.vue beim Verschieben eines Knotens. Auch in baueinheiten.vue. Im Browser Log kommt Die Vue Warnung "Cannot read property 'children' of null". Betrifft Zeile 10556 in baustoffe.vue.
     ==**Update 27.06.2021**==: Lässt sich auch beim Bewegen eines Zweigs im Bauvorhabenbaum reproduzieren, selbst wenn der Elernknoten
     noch Kinder hat. Es kommt dann die Vue Warnung "TypeError: Cannot read property 'children' of undefined" aus der Funktion
     collectIdsInChildrenOfWurzelZuBewegenderZweig(node, ...). Der Grund dafür ist, dass node beim Aufruf undefined ist. Dieser
     ode wird in der im Template aufgerufenen Funktion knotenIstImFuerBewegenMarkiertenZweig() ermittelt in Zeile
     16009 per this.$refs.treeBaueinheiten.getNodeByKey(this.idWurzelZuBewegenderZweig). $refs.treeBaueinheiten ist laut Log
     zu diesem Zeitpunkt definiert, also nicht die Ursache, dass getNodeByKey() offenbar undefined zurückliefert.
     Vermutliche Ursache ist, dass am Ende von bewegeZweig() idWurzelZuBewegenderZweig auf null gesetzt wird.
     Diese wird zwar in der Funktion knotenIstImFuerBewegenMarkiertenZweig() abgefragt, aber eventuell laufen diese
     Codeteile asynchron ab. Als Workaround den Aufruf von idWurzelZuBewegenderZweig = null in bewegeZweig() vor den Aufruf von
     reloadTreeBaueinheiten() verschoben - damit verschwinden die Warnings. Sollte weiter beobachtet werden.
326. **[DONE]** (Prio 3) In sämtlichen Vue-Komponenten für Baueigenschaftsprofilformulare wird eine Funktion
     baueEigenschaftenVererbungsDatenstruktur() verwendet, die noch dokumentiert werden muss! Sie ermittelt für die Baueigenschaften im Profil, ob es definierte Elternwerte gibt und
     schreibt diese Information in eine Property baueigenschaftAnWerteVererbendemElternknoten im profilModelAugewaehlterKnoten, die von den :disable-Funktionen im Template abgefragt wird.
     ==**326.a) [ACHTUNG: Hier Nummerierungsfehler im Backlog!]**== ==**[TODO]**== (Prio 3) Testhalber installierte Pakete deinstallieren, damit aus package.json entfernen (auch auf Heroku), und in verwaltung.vue (Test Areas) disablen - VMoney - Bereits deinstalliert - Vue Excel Editor - Installiert mit npm install vue-excel-editor - VGEditor - Installiert mit npm install vg-editor@2.7.2 -S bzw. -G - Vue Diagram Editor - Installiert mit npm install vue-diagram-editor
327. ==**[TODO]**== (Prio 3) In Profilformular für "Baueinheit > Standort" die reset- und disable-Funktionen kompakter machen, Schleifen einbauen und
     gemeinsame Unterfunktionen für weniger Code und Speicher
328. ==**[WORK]**== (Prio 3) Nach Upgrade auf Quasar 1.15.15 ist unterschiedliche Einfärbung von geraden und ungeraden Zeilen in QTables
     möglich, mittels neuer :class Prop an q-tds. Dies erfolgt allerdings neuen Style für die Färbung der Key-Spalte (z.B.
     "Baueigenschaftsbezeichnung", welches aber nur für den inneren div-Teil einer Zelle funktioniert (diese Färbung erfolgt
     normalerweise in der style-Sektion, was aber durch das obige neue :class am q-td für die Zeilenfärbung offenbar überschrieben wird. Experimentell für QTable für die Baueigenschaften in baueinheiten.vue implementiert, in anderen QTables noch nicht.
329. **[DONE]** (Prio 3) Im neuen optimierten Refresh-Algorithums von Stefan in baueinheiten.vue muss noch eingebaut werden, dass
     bei Blattknoten das lazy-Flag zum Unterdrücken des graune Dreiecks zum Aufklappen dieser Knoten korrekt gesetzt wird.
     Dies am Backend eingebaut. Allerdings gibt es noch einen Spezialfall, wenn der ausgewählte Knoten ein Blattknoten ist und
     gespeichert wird. Dann wird fälschlich das graue Dreieck dafür angezeigt. Dies im Frontend gefixed (markiert mit #329)
330. **[DONE]** (Prio 3) In baueinheiten.vue, getTabVonHierarchischOberstemProfilFormularInAktiviertenBaueigenschaftsProfilen(),
     gibt es einen Fehler, dass fälschlich das Profilformular für ein diesem Knoten nicht unterste aktivierte Profil angezeigt wird,
     falls dort vorher das einzige unterste Profil deaktiviert wird, so dass dann nur noch "nicht unterste" Profile aktiviert sind.
     Der Code prüft zwar ab, ob alle Profile deaktiviert sind, nicht aber, ob gleichzeitig kein unterstes Profil an diesem Knoten
     aktiviert ist. Ist ein Spezialfall, der nicht häufig vorkommt. Gefixt durch zusätzliche Oder-Bedingung in baueinheiten.vue,
     getTabVonHierarchischOberstemProfilFormularInAktiviertenBaueigenschaftsProfilen().
331. ==**[WORK]**== (Prio 3) Optimierten Refresh-Algorithmus aus baueinheiten.vue nach baustoffe.vue übertragen - dort arbeitete bisher noch der alte refreshTreeBaustoffe()
     statt des reloadTreeAllgemein() in baueinheiten.vue. Von Stefan implementiert. Der optimierte Refresh wird bisher nur als refreshTreeBaustoffeSpecialized()
     beim Speichern des (generischen) Profilformulars für einen Baustoff aufgerufen. Ob auch noch an anderen Stellen ein optimierter Refresh
     sinnvoll ist, muss noch entschieden werden.
332. **[DONE]** (Prio 3) Optimierten Refresh-Algorithmus auch beim Neu-Anlegen von Baueinheiten. Gelöst, indem in den Methoden für
     createChildBaueinheitMitXYZProfilAktivierung() zusätzlich der neue eingefügte Knoten mit auf den children-Array gepushed wird,
     und dann der obige neue Refresh-Algorithmus aufgerufen wird statt des alten.
333. **[DONE]** (Prio 3) Weitere Performance-Optimierung für das Speichern von Profilformularen: Im Rahmen von Epic 38.g
     in die Profilaktivierungslogik 2 Optimierungen eingebaut (kein Aktivieren im Elternpfad mehr, promise.All)
334. **[DONE]** (Prio 2) Fehler beim Bewegen eines Geschosses von einem Elternknoten "Standort" unter einen neuen Elternknoten "Gebäude":
     - ■■■■■■■■■ Vor \$push in Array zugeordneteBaueigenschaftsProfile mit aktiviertem Profil auf gesamtem Pfad
       Fehler bei getImmediateChildren() für Zielelternknoten mit id: 60c8e40488ac644d99e7f7fa
       error: ReferenceError: b is not defined
       at updateFlagUntersterKnotenAufFalse (C:\Users\BIMIive\Documents\GitHub\bim-click\bim-click-back-end\app\controllers\baueinheiten.controller.js:8006:9)
       at C:\Users\BIMIive\Documents\GitHub\bim-click\bim-click-back-end\app\controllers\baueinheiten.controller.js:1223:31
       at runMicrotasks (<anonymous>)
       at processTicksAndRejections (internal/process/task_queues.js:97:5)
       XXXXXXXXXXXXXXXXXXXXXXXXXXX Error Status 500 aus bewegeZweigBaueinheit() XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
       Dies ist gar kein echter Programmierfehler, sondern per File History habe ich festgestellt, dass in der fraglichen Funktion updateFlagUntersterKnotenAufFalse() bei einem meiner letzten Edits dieser Datei versehentlich 2 eigentlich sinnlose Buchstaben„b,“ aus dem Clipboard oder aus der Tastatur eingefügt wurden, was zu diesem wirklich saublöden Fehler führt. Erstaunlicherweise war dieses eigentlich völlig zufällige Einfügen sogar syntaktisch korrekt, hat aber zu obigem Laufzeitfehler geführt.
335. **[DEFER]** (Prio 3) Weitere, optionale Strukturierungsebene unter "Bauprojekte" im Bauvorhabenbaum (z.B. "Projekte 2021" o.ä.) -
     dabei zu lösende Probleme:
     - Eindeutigkeit der Bezeichnungen auf dieser Ebene: Funktioniert - wird per Test überprüft, wenn Erzeugung eines solchen neuen
       Strukturierungsknotens per "Kindbaueinheit neu anlegen" erfolgt
     - Auswirkung auf Kontextmenüs an solchen neuen Strukturierungsknoten im Bauvorhabenbaum:
     - Mit "Kindbaueinheit neu anlegen und Baueigenschaftsprofil daran aktivieren" ein neues
       Bauvorhaben unter einem so angelegten Strukturierungsknoten eine Ebene unter "Bauvorhaben" anlegen: Funktioniert per Test
     - Anzeige der relevanten Profile an einem solchen Knoten: Funktioniert per Test ("Keine")
     - Anzeige der aktivierbaren Profile mit Kontextmenü "...und bestimmtes Baueigenschaftsprofil daran aktivieren" an einem solchen Knoten:
       - Funktioniert <it>nicht</it> korrekt - das gesamte Elternkontextmenü "Baueinheit auswählen und bestimmtes Baueigenschaftsprofil daran aktivieren" müsste
         an solchen Strukturierungsknoten unter "Bauprojekte" ausgegraut werden - markiert mit #335 im Code.
       - Nachdem ein Bauvorhaben darunter angelegt wurde, funktioniert es teilweise auf der Kontextmenüebene darunter (wohl zufällig - scheinbar
         returned istAktiviertProfilAnNodeUndNodeIstUntersterImPfadAnDemProfilAktiviertIst() hier zufällig (?) true)
     - Eine Lösung per Änderung der beteiligten, schon komplexen :disable-Funktionen erscheint schwierig, zumal diese Ebene optional sein sollte!
     - Eine bessere Lösung wäre es, anlässlich dieses Backlog Items offiziell den Baumknotentyp "Bauprojekte" zu etablieren, sowie einen weiteren
       optionalen Baumknotentyp "Unterprojekte" - diese Knoten könnten dann per neuem Kontextmenü ausschließlich unter "Bauprojekte" eingefügt werden und
       es wären dafür dediziert angepasste :disable-Funktionen möglich, spezifisch für genau diesem Baumknotentyp
     - Die Funktion istAktiviertProfilAnNodeUndNodeIstUntersterImPfadAnDemProfilAktiviertIst() müsste trotzdem angepasst werden - sie enthält eine Prüfung
       if (idsImPfad.length <= 2) {return true} - diese müsste geändert werden für den Fall, dass
       ein Strukturierungsknoten für Unterprojekte im Pfad vorhanden ist: Falls ja, sollte die Funktion auch bei idsImPfad.length <= 3 den Wert true
       returnen! Markiert mit #335 im Code.
     - Gleichzeitig ist zu überlegen, ob man im Zweig "Vorlagen" nicht auch eine solche Unterebene zur Strukturierung benötigt!
     - ==Update 18.09.2021==: Im Rahmen von #353 eine andere Variante implementiert, bei der keine weitere
       Strukturierungsebene unter "Bauprojekte" eingezogen wurde, sondern ==mehrere parallele Bauprojekte-Geschwisterknoten== unterstützt werden, um damit Bauvorhaben zu gruppieren und zu verteilen, und damit
       die Ladezeit für die Kindbauvorhaben beim Öffnen eines solchen Bauprojekte-Elternknotens zu reduzieren.
     - ==Hinweis: #353 ist also eine Variante von #335 - letzteres deshalb auf **[DEFER]** gesetzt.==
336. **[DONE]** (Prio 3) Quasar Extension **QPDfViewer deinstalliert** - wurde testweise in dokumentation.vue benutzt, ist aber dort auskommentiert.
     Deinstalliert mit Befehl quasar ext remove @quasar/qpdfviewer - deinstalliert lokal die Dateien und entfernt die Einträge in
     package.json und quasar.extensions.json. Auf Stefans Maschine bleibt der QPdfViewer so installiert, er wird aber beim nächsten
     Build mit der aktuellen package.json nicht mehr verwendet beim Build! Hinweis: quasar upgrade -i aktualisiert auch die App Extension QMarkdown,
     laut https://www.npmjs.com/package/@quasar/quasar-app-extension-qmarkdown. Dieser Hinweis fehlt bei https://www.npmjs.com/package/@quasar/quasar-app-extension-qpdfviewer.
337. **[DONE]** (Prio 2) Build Break des Quasar Frontends auf Stefans Rechner, quasar dev wirft Fehler: "Node Sass could not find a binding for your current
     environment: Win 64-bit with Node.js 12.x [..] Found bindings for the following environments:Windows 64-bit with Node.js 10.x".
     Node: 12.16.1 (war bei Stefan zuerst 12.20.2, aber unerheblich), Quasar: 1.15.21 (bei Stefan 1.15.22, aber unerheblich),
     sass: 1.25.0 (bei Stefan und Michael), node-sass: 4.14.1 (bei Stefan und Michael), laut package.json in node_modules/node-sass. Fehler kommt beim Bauen von Pages
     (z.B. baueinheiten.vue, etc.) die Sass in ihrer CSS benutzen z.b. für QTable sticky Columns.
     Diverse Lösungsversuche - alle vergeblich: npm rebuild node-sass, npm rebuild node-sass --force (erfordert Installation von Python 2),
     Delete von node_modules und Rebuild mit npm install, danach dann quasar dev. Beim npm install holt Node gemäß package.json die Packages,
     "^" (Caret) zählt ggf. die letzten Stellen der Versionsnummer hoch, "x.y.z" holt exakt eine Version. Erst nach ==Uninstall von Node 12 und Install von Node 10
     als Workaround==, d.h. Downgrade von Node, funktionierte bei ihm quasar dev bzw. quasar build --debug wieder ohne obige Fehler!
     Siehe https://discord.com/channels/415874313728688138/601046346602119168, https://stackoverflow.com/questions/37986800/node-sass-couldnt-find-a-binding-for-your-current-environment, https://stackoverflow.com/questions/55573236/how-to-fix-node-sass-could-not-find-a-binding-in-your-current-env-when-runnin/55769917#55769917,
     https://stackoverflow.com/questions/43811639/node-sass-no-binding-for-your-current-environment.
     Möglicher Auslöser des Problems: Installation und Deinstallation von Node-Support-Komponenten in Stefans Visuals Studio (parallel zu VS Code installiert und benutzt) oder manuelle Upgrades der Node-Version per Download eines aktuellen Node-Installables und Upgrade Installation über existierendes Node.
     ==Lösung== am 16.07.2021: Stefan hatte auch noch nach Deinstallation von Node per "Programme hinzufügen/entfernen" noch Relikte einer älteren Node 10
     Version auf dem PC (gefunden mit "where node" in Windows-Kommandozeile), die wohl ursächlich
     für dieses Problem war. Wenn durch mehrfache Node-Installationen bzw. Node Upgrades auf einem System gemacht wurden, kann es sein,
     dass (offenbar wegen Fehlern im Node Deinstall bzw. Upgrade Install) ältere Versionen nicht komplett entfernt werden, was dann bestimmte Node
     Pakete (hier node-sass, benutzt durch Quasar beim Build) zum Stolpern bringen kann. Die Lösung war eine **komplette, manuelle De-Installation von Node
     nach Anleitung** auf https://stackoverflow.com/questions/20711240/how-to-completely-remove-node-js-from-windows, mit anschließender Neu-Installation
     von Node 12, Löschen von node_modules und package_lock.json, Neuinstallation von Quasar CLI und npm install.
338. **[DONE]** (Prio 3) Der **Refresh nach dem Löschen von Knoten im Bauvorhabenbaum** funktioniert nicht immmer. Z.B. neue Baueinheit
     im Bauvorhabenbaum unter "Bauprojekte" anlegen (wird unterster Blattknoten). Obwohl diese gelöscht wird, wird
     sie weiterhin angezeigt. Werden zwei solche Baueinheiten unter "Bauprojekte" angelegt, und dann die erste der
     beiden gelöscht (zweitunterster Blattknoten), tritt das Problem ebenfalls auf. Unter einem Bauvorhaben tritt das Problem auch
     beim Löschen von Verzweigungsknoten auf, sowohl beim untersten als auch bei anderen. Durch Ein- und Ausklappen des Elternknoten
     wird das Problem behoben, dito durch Browser Refresh. Im Baustoffbaum ließ sich das Problem ähnlich reproduzieren, muss
     weiter untersucht werden. In deleteBaueinheit() in baueinheiten.vue wird bisher kein Refresh ausgelöst aus Performance-Gründen -
     eventuell ist das mit die Ursache. Es handelt sich um ein Reaktivitätsproblem, dass manchmal (nicht immer) der Update von parent.children
     per splice() nicht reaktiv erkannt wird, obwohl Vue das eigentlich unterstützt per https://stackoverflow.com/questions/42807888/vuejs-and-vue-set-update-array.
     Lösung per Workaround: In baueinheiten.vue und baustoffe.vue die Funktionen deleteBaueinheit(),
     deleteSelectedBaueinheit(), deleteBaustoff() und deleteSelectedBaustoff() geändert: a) Als Workaround jeweils ein setExpanded() eingebaut (statt Refresh).
     Später im Zuge der Analyse von #339 doch noch einen Refresh statt des Workarounds eingebaut.
     b) (zusätzliches dabei gefundenes Problem): Falls der im Baum selektierte Knoten selbst gelöscht wird (ist bei Auslösung per Button oben immer der Fall),
     muss selectedKeyTreeBaueinheiten bzw. selectedKeyTreeBaustoffe auf null bzw. die Id des Elternknotens des gelöschten Knotens gesetzt werden.
339. **[DONE]** (Prio 2) Beim **Löschen von Knoten** im Bauvorhabenbaum mit aktivierten Profilen kann es vorkommen, dass z.B. der
     letzte (oder der einzige) Kindknoten mit aktiviertem
     Profil "Raum" unter einem Elternknoten mit aktiviertem Profil "Baueinheit > Geschoss" gelöscht wird (z.B. "Klassenraum 1" unter "Obergeschoss" der "Einstein-Schule" in den lokalen Testdaten). Allerdings bleiben bei dieser Aktion sämtliche im gelöschten Unterknoten aktivierten Profile auch im Elternknoten (Geschoss) aktiviert, z.B.
     "Baueinheit > Raum", "Baueinheit > Bodenaufbau", "Baueinheit > Schicht". Nach einem (nicht ohne einen solchen!) Refresh (der ursprünglich aus Performance-Gründen, siehe #338, nach einem solchen Delete vor Implementierung von #338 unterblieb) werden die Flags "istUntersterKnotenImPfadAnDemBaueigenschaftsProfilAktiviertIst" dann offenbar auch entsprechend korrekt aktualisiert. Z.B. stehen
     diese dann nach dem Refresh laut Debug-Info Bauvorhabenbaum für "Raum", "Bodenaufbau" und "Schicht" auf true. Dieses Flag ist dann zwar so formal gesehen aktuell und korrekt, führt aber (nach dem Refresh)
     zu mehreren **unterwünschten Nebeneffekten**: a) Es kann per Kontextmenü dann kein neuer Raum mehr angelegt werden unter diesem
     Geschoss (das Menü dafür wird per computed-Funktion am Kontextmenü disabled, weil ja der Geschoss-Knoten jetzt formal der unterste Knoten mit aktiviertem Profil "Baueinheit > Raum" ist, unter dem kein anderer Raum angelegt werden darf). Und b), weil der Geschoss-Knoten zudem das Profil "Baueinheit > Schicht" aktiviert hat, darf er außerdem nicht per Kontextmenü oder Button gelöscht werden (weil
     für alle Schichten das Löschen nur im Profilformular "Bodenaufbau" mit den dortigen Buttons enabled ist, nicht per Kontextmenü). Diese Nebeneffekte können aktuell
     nur durch manuelles Deaktivieren der Profile "Baueinheit > Raum", "Baueinheit > Bodenaufbau" und "Baueinheit > Schicht" am Geschoss-Knoten umgangen werden (Workaround per Admin-UI).
     Daher sicherheitshalber doch zusätzlich noch einen Refresh am Ende der 4 Delete-Funktionen aus #338 eingebaut. Dies erscheint
     aus Konsistenzgründen (die obigen, aktuellen Flags korrekt aus dem Backend laden) erforderlich, führt jedoch sofort zu den beschriebenen beiden unerwünschten Nebeneffekten! Der Delete am Backend müsste für ein korrektes Setzen der Aktiviertheit bzw.
     Deaktiviertheit der Profile an den Knoten im Elternpfad prüfen, ob noch Geschwisterknoten des gelöschten Knotens mit aktiviertem Profil "Baueinheit > Raum" existieren, und falls keine solchen mehr
     existieren, die Profile "Baueinheit > Raum", "Baueinheit > Bodenaufbau" und "Baueinheit > Schicht" am Elternknoten deaktivieren. Falls aber auf der Ebene darüber auch keine anderen Geschwistergeschosse mit Räumen mehr existieren, müsste
     diese Deaktivierung jedoch ggf. an allen indirekten Elternknoten sogar zusätzlich bis hoch zum Wurzelknoten des Bauvorhabenbaums erfolgen. Dafür wären zahlreiche Prüfungen und Aktualisierungen im Baum auf dem Elternpfad notwendig. Diese Aktualisierungen der aktivierten Profile im Elternpfad müssten auch bei Löschung von Knoten mit anderen aktivierten Profilen als "Baueinheit > Raum" erfolgen. Die Frage ist, ob dieses Problem durch einen zentralen Eingriff/Algorithmus in der Backend-Logik beim Löschen korrigierbar ist, mit dem sämtliche betroffenen Profile im Elternpfad ggf. deaktiviert werden müssten. Was wäre dafür die Logik, in Pseudocode ausgedrückt? Dies hängt entgegen erster Überlegungen nicht mit dem unterstützten Metamodell der aktivierten Profile im Baum (d.h. der angestrebten Hierarchie der aktivierten Profile) zusammen. Es gibt eine Variante des Algorithmus, die ausschließlich auf den aktivierten Profilen an den beteiligten Knoten arbeitet (siehe ==**Epic 38.k**==). Dieser
     Algorithmus wurde von Stefan implementiert und wurde eingebaut beim Löschen von Zweigen, sowie bei der
     Profilaktivierung an einem Knoten, die dassselbe Problem hatte. Mittlerweile auch eingebaut nach dem Bewegen von Zweigen,
     gekennzeichnet mit #339. ==**Update 28.11.2021**==: #339/38.k wurde von Stefan auch in baustoffe.controller.js nachgezogen.
340. **[DONE]** (Prio 2) Beim Löschen eines Elternknotens (mit Kindknoten) mit vorausgehendem Löschen von einem von dessen Kindknoten kommmt es nach obigen Fixes für
     #338/#339 am Backend manchmal beim Reload noch zu einem Fehler (Backend-Fehlermeldung: siehe Box unten).

     Das Problem kann mit der Code-Version vom 19.07.2021 (Aufruf von neuem Refresh in baueinheiten.vue, plus selected Node wird nach dem Löschen auf den Elternknoten geändert)
     so reproduziert werden: Einfachheitshalber ohne blaue Auswahl unter "Einstein-Schule" > "Obergeschoss" > "Flur" einen seiner zwei Kindknoten
     (z.B. "Wandaufbau") per Kontextmenü löschen. Dies ist zunächst erfolgreich. Nach Refresh ist dann das Eltern-Geschoss ("Flur") ausgewählt.
     Das nachfolgende Löschen von "Flur" zeigt allerdings ein Refresh-Problem (Flur mit verbliebenem Kindknoten, z.B. "Fußbodenaufbau", wird als nicht gelöscht nach wie vor angezeigt,
     verschwindet erst nach Zu- und Aufklappen des Elternknotens "Obergeschoss".). Das Backend zeigt beim Löschen von "Flur" obigen TypeError: Cannot read property 'baueigenschaften' of null! Nach einiger Zeit zeigt auch das Frontend eine rote Fehlermeldung an, dass die Baueinheit nicht gelöscht werden konnte.
     Eventuell ist die Ursache für das Problem, dass das Backend das Löschen der beteiligten Knoten (entweder der Kindknoten - im Testfall "Wandaufbau" oder "Bodenaufbau", oder das Löschen des zweiten Knotens - "Flur" nicht mitbekommt
     und versucht in Zeile 8750 ff. von baueinheiten.vue auf die baueigenschaften eines gelöschten Knotens zuzugreifen. Das Refresh-Problem
     kann durch ein setExpanded() für den Elternknoten in deleteBaueinheit() als Workaround umgangen werden, das Backend-Problem (TypeError) bleibt aber bestehen.
     Im aktuellen Code den setExpanded()-Workaround einstweilen enabled! Hinweis: Das Problem tritt ohne das erste Löschen eines Kindknotens nicht auf!
     Achtung: Manchmal ist das Problem nicht sofort wie oben reproduzierbar, sondern tritt erst beim
     Löschen eines Kindknotens an einem anderen Raum (z.B. "Wandaufbau" unter "Klassenraum 3" mit nachfolgendem Löschen dieses anderen Raums
     ("Klassenraum 3") auf! Es scheinen also das Timing und die Reihenfolge der Aktionen sowie die Tatsache, welcher Knoten selektiert ist, eine Rolle zu spielen. Nach Auftreten dieses Problems
     tritt das Problem am Backend z.B. beim Löschen von weiteren Räumen unter "Obergeschoss" aber immer wieder auf, was gefährlich ist!

     Ursache: Der Aufruf der Performance-optimierten Version des Refreshs war die Ursache (Frontend Code, nicht Backend Code).
     Der Code dafür war erstens abhängig davon, dass selectedNodeTreeBaueinheiten
     gesetzt war (was z.B. bei Profilformularanzeige der Fall ist), was aber bei obigen Lösch-Aktionen nicht immer der Fall ist, und zweitens wurde beim zweiten
     Löschen der (nach dem ersten Löschen ausgewählte) Konten selectedNodeTreeBaueinheiten selbst gelöscht - dieser wurde von der optimierten Reload-Methode
     ans Backend für den Reload übermittelt, obwohl er ja vorher bereits gelöscht wurde - dies führte dann zu dem TypeError am Backend.
     Lösung: In baueinheiten.vue, deleteBaueinheit() eine neu überarbeitete Variante des optimierten Refreshs (refreshTreeBaueinheitenPerformanceOptimiert()) aufgerufen, welche
     statt auf selectedNodeTreeBaueinheiten auf einem per Parameter übergebenen Node (beim Aufruf dafür den Knoten parent übergeben) arbeitet.
     In deleteSelectedBaueinheit() kann der bisherige Refresh aufgerufen werden, d.h. es wird kein Parameter übergeben.

```
     ■■■■■■■■■ req.method:  GET  req.url:  /Baueinheiten/Reload/Nodes/?ids=60f6069d0eca1cdeb9ee8410&ids=60f6069d0eca1cdeb9ee841d&ids=60f6069d0eca1cdeb9ee8431&ids=60f6069d0eca1cdeb9ee8434&ids=60f6069d0eca1cdeb9ee844d  req.path:  /Baueinheiten/Reload/Nodes/
      reloadTreeBaueinheit_05_21_nodes_on_path: [
        '60f6069d0eca1cdeb9ee8410', // 'Bauvorhaben'
        '60f6069d0eca1cdeb9ee841d', // 'Bauprojekte'
        '60f6069d0eca1cdeb9ee8431', // 'Einstein-Schule'
        '60f6069d0eca1cdeb9ee8434', // 'Obergeschoss'
        '60f6069d0eca1cdeb9ee844d'  // 'Flur' - wurde als zweites gelöscht - obige Ids sind die aus dessen Elternpfad
      ]
      (node:122552) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'baueigenschaften' of null
          at C:\Users\BIMIive\Documents\GitHub\bim-click\bim-click-back-end\app\controllers\baueinheiten.controller.js:8751:20
          at Array.forEach (<anonymous>)
          at C:\Users\BIMIive\Documents\GitHub\bim-click\bim-click-back-end\app\controllers\baueinheiten.controller.js:8750:20
          at processTicksAndRejections (internal/process/task_queues.js:97:5)
      (node:122552) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 2)

```

341. ==**[TODO]**== (Prio 3) Eine Admin-Funktion, welche einem Baueigenschaftsprofil neu hinzugefügte
     Baueigenschaften an allen Knoten aktiviert, an denen das Profil aktiviert ist, würde helfen
     bei Profilerweiterungen. Es passieren zwar keine Fehler an von solchen Erweiterungen betroffenen Profilen,
     die neu hinzugefügten Baueigenschaften sind aber nicht editierbar (disabled), weil die zugehörige neue
     Baueigenschaft nicht aktiviert ist. Als Workaround kann man entweder das Profil deaktivieren und neu aktivieren, was
     aber zum Verlust der eingetragenen Werte führt, oder man muss manuell die neu hinzugefügten Baueigenschaften
     per Admin UI aktivieren.
342. **[DONE]** (Prio 3) - In "Standort" > "Umwelt": Schnee-, Wind- und Erdbebenzonen und zugehörige Kennwerte gemäß Mail von Erik vom 19.07.2021.
343. **[DONE]** (Prio 3) - Nach dem Löschen eines Profils in "Baueigenschaftsprofile" stimmt die angezeigte Aktivierung für die verbleibenden Profile nicht mehr. Ähnliche Fehler bei anderen Aktionen auf den Profilen in der Tabelle.
     Ein Refresh umgeht das Problem. Von Stefan mittlerweile gefixt in baueigenschafts-profile-tab-baustoffe-und-baueinheiten,
     markiert mit #343.
344. ==**[WORK]**== (Prio 3) - Request von Kim Weidlich: BIM.click Frontend zusätzlich zur Browser-Version (SPA) als **PWA** anbieten (erst einmal
     allerdings ohne Offline-Support, d.h.
     der BIM.click Backend Server wird weiterhin benötigt). Testweise erfolgreich implementiert gemäß
     https://v1.quasar.dev/quasar-cli/developing-pwa/preparation. Command quasar dev -m pwa bringt die lokal laufende SPA-App wie gewohnt hoch im Browser, zusätzlich wird im Chrome Menü rechts oben dann "BIM.click installieren" angeboten für die PWA-Version.
     Diese kann nach lokaler Installation auch vom Windows Start-Menü gelaunched werden.

     Anschließender Versuch, dies auch im Production Build auf Heroku
     zu enablen, mit 2 Änderungen: 1. In package.json: "build": "quasar build -m pwa", statt "build": "quasar build", 2. In
     front-end-server.js: app.use(serveStatic(**dirname + "/dist/pwa")); statt app.use(serveStatic(**dirname + "/dist/spa"));
     Leider kommt danach zwar die SPA-App im Browser hoch, es wird aber nicht wie beim obigen Development Build in Chrome
     die Option zur Installation der App als PWA angeboten.

     Neuer Versuch mit app.use(serveStatic(\_\_dirname + "/dist")); Der Build
     funktioniert damit zwar, und die SPA-App kommt im Browser hoch, es fehlt aber nach wie vor der obige Menüeintrag zur lokalen Installation als PWA im Hamburger-Menü von Chrome! Wieder rückgängig gemacht zugunsten von "/dist/pwa".

     Siehe https://github.com/quasarframework/quasar/discussions/10326. Beobachtung: In Edge funktioniert es, dort wird die PWA zur Installation angeboten! Hinweise auf https://stackoverflow.com/questions/58985103/progressive-web-app-not-showing-install-button-in-browser-bar und https://developer.chrome.com/docs/devtools/progressive-web-apps/

     Lösung: In Chrome für https://bimclick.herokuapp.com wird mit F12 in der Konsole
     ein Fehler angezeigt, dass eine Icon-Datei nicht gefunden wird (bim-click-lego-Icon-256x256.png). Diese hat
     einen Großbuchstaben! Alle 3 betroffenen Icon-Dateien umbenannt in Kleinbuchstaben (erfordert in VS Code Löschen und
     Neuanlagen, da auf Windows keine Groß- und Kleinbuchstaben unterschieden werden). Diese Dateien werden in quasar.conf.js,
     PWA-Section, Manifest-Teil tatsächlich angezogen. Nach der Umbenennung neu deployed nach Heroku und gebaut.
     Danach funktioniert die Installation von BIM.click als PWA-App - laut Test von Kim auch auf iOS. Nur kurz
     getestet aus Chrome und Edge. Allerdings nach einiger Zeit merkwürdige Nebeneffekte beobachtet,
     dass sowohl die Browser-Version als auch die PWA-App (lokale Version und die Heroku-Version!) nicht den neuesten Stand
     der App reflektieren, und so z.B. einen veralteten Stand des Backlogs in der Dokumentation
     anzeigten - siehe Update weiter unten.

     Zusätzlich noch eine 16 x 16 große
     favicon.ico Datei für BIM.click erzeugt, aus der entsprechenden png-Datei, auf https://www.favicon-generator.org
     und dieses Favicon abgelegt in \src\statics\icons\favicon.ico, nachdem im Browser Log eine Meldung kam, dass diese nicht gefunden wurde.

     ==**Update 11.08.2021**:== Seit Enabling des PWA-Modes gibt es im Chrome und Edge Browser Log häufige Fehler "Workbox: Precaching did not find a match
     for...". Siehe dazu z.B. https://stackoverflow.com/questions/49696828/correct-way-to-precache-the-root-url.
     Außerdem muss offenbar wegen Änderungen im Caching- und Refresh-Verhalten durch das für den PWA-Mode verwendete Workbox (Google Tools für Service Worker) mit von
     Quasar generiertem Service Worker seit Enabling des PWA-Modes (insbsondere auf Heroku) im schlimmsten Fall **erst der Browser Cache geleert werden**, um die neueste Version
     der Anwendung und ihrer Files (z.B. generierte HTML wie z.B. bim-click-backlog.md und andere Teile der Online-Doku, aber auch andere Änderungen in der App) aktualisiert in BIM.click angezeigt zu bekommen. Selbst manuelle Refreshes des
     Browsers wirken nicht immer zuverlässig!

     Der PWA Mode für Quasar ist dokumentiert auf
     https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa#reload-and-update-automatically - dort
     nach Hinweis auf https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa#reload-and-update-automatically
     eine zusätzliche Sektion eingebaut in quasar.conf.js, pwa: {workboxOptions: {skipWaiting: true, clientsClaim: true}}. Mit dieser Änderung scheinen Änderungen in einer der Markdown-Dateien, allerdings
     **erst nach einem manuellen Browser Refresh (selbst nach einem neuen lokalen Build, der die App von selbst neu lädt, allerdings vor diesem manuellen Refresh mit dem alten Markdown-/HTML-Content!)**, korrekt aktualisiert angezeigt zu werden.

     ==**Achtung**==: Auch andere UI-Änderungen, z.B. Änderung der BIM.click Versionsnummer in my-layout.vue, werden nach Rebuild mit dem PWA-Mode auch erst nach einem solchen manuellen Browser Refresh wirksam!

     Diese Refresh-Probleme mit dem neuen PWA-Mode sind weiter zu beobachten. Außerdem ist es wahrscheinlich, dass der von Quasar im PWA Mode
     generierte Service Worker den für BIM.click angelegten Service Worker für Web Push Notifications überschreibt, der aber
     aktuell sowieso disabled ist zugunsten von Sockets (siehe my-layout.vue).

     Bei anhaltenden Problemen ist (insbesondere auf Heroku)
     der PWA-Mode wieder in den vorherigen SPA-Mode zurückzudrehen, d.h. obige Änderungen im Build auf Heroku und im
     front-end-server.js und in quasar.conf.js wären dann zurückzudrehen. Im Dev Build ist der Unterschied nur quasar dev vs. quasar dev -m pwa.

     Weitere Links zum Thema PWA, Service Worker und Refresh/Caching:

     - https://stackoverflow.com/questions/68350647/how-to-disable-caching-service-worker-using-workbox.
     - https://forum.quasar-framework.org/topic/2560/solved-pwa-force-refresh-when-new-version-released/58?lang=de - Probleme mit PWAs, z.B. Erkennung, dass neue Version der App existiert.
     - https://stackoverflow.com/questions/52221805/any-way-yet-to-auto-update-or-just-clear-the-cache-on-a-pwa-on-ios - Lösung für Versions-Updates auf iOS
     - https://medium.com/js-dojo/vuejs-pwa-cache-busting-8d09edd22a31
     - https://github.com/quasarframework/quasar-cli/issues/206 - die dort vorgeschlagene Workbox Option 'exclude: ...' ausprobiert,
       im Zusammenspiel mit den obigen Options skipWaiting, clientsClaim führt dies aber dazu, dass selbst bei Browser Refresh nicht
       der aktuelle HTML-Content in der Doku angezeigt wird!
     - Artikel, der die Refresh-/Caching-Probleme mit Service Workers erklärt: https://stackoverflow.com/questions/60912127/workbox-update-cache-on-new-version
     - Weiterführender Artikel mit Lösungen: https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68
       - Die erste Lösung scheint dasselbe zu machen wie die von Quasar in quasar.conf.js angebotene PWA-Option skipWaiting (siehe oben), ist aber
         gefährlich!
       - Die dritte Lösung schlägt manuellen Refresh Button in der App vor, der angezeigt wird, wenn neuer Service Worker installiert
         wurde
       - Alle Lösungen außer der ersten sind sehr kompliziert und erfordern Coding (Setup eines Custom Service Workers mit
         entsprechenden Vorkehrungen, d.h. quasar.conf.js müsste dann von workboxPluginMode: 'GenerateSW'
         auf workboxPluginMode: 'InjectManifest' umgestellt werden und der Custom Service Worker entsprechend codiert werden).
     - Ursprünglicher Artikel, der das Problem erklärt: https://redfin.engineering/service-workers-break-the-browsers-refresh-button-by-default-here-s-why-56f9417694

345. ==**[WORK]**== (Prio 3) Experimentelle alternative Modellierung und Ausgabe von **Bauteilkatalogen**: Diese würden
     nach Vorschlag von Kim potentiell auf einem anderen anderes, alternativen Metamodell ohne Verwendung der Profile für
     Geschosse und Räume basieren - stattdessen gäbe es neue Profile für "Sammelkategorien" für Bauteile. Siehe PPTs dazu.
     Experimentelle Ausgabe eines solchen Modells (z.B. Heesters-Seniorenheim auf Heroku) programmiert im Unter-Tab
     "Auswertungen", noch ohne neue Profile, in Excel-Datei per ExcelJS, mittels neuer API-Methode
     exportBauteilkatalogAnBaueinheit() in baueinheiten.controller.js. In Videokonferenz am 27.08.2021 mit Erik, Kim,
     Tobias, Stefan wurde dann aber Folgendes beschlossen:
     - Wir bleiben beim bisherigen Metamodell - es soll nicht alternativ bzw. parallel ein zweites/anderes eingeführt
       werden, da dann viele Operationen (Bewegen von Zweigen, Profilaktivierungen, Vorlagen, etc.) komplex bzw. auf das
       jeweilige Metamodell eingeschränkt werden müssten.
     - Aus dem bisherigen Metamodell sollen Bauteilkataloge zunächst als einfache, lineare Excel-Listen generiert
       werden, die zunächst alle Bodenaufbauten als lineare Liste nach Excel ausgeben, zusammen mit weiteren
       Detail-Informationen (d.h. ein 1-Pager-artiges Tab pro Bodenaufbau), welche aus den betreffenden Baueinheiten
       stammen (Bauteilinformationen, d.h. Attribute aus dem Bodenaufbau und seinen Schichten, aber auch aus
       seinen Elternbaueinheiten, wie z.B. Projektinformationen, Angaben zur Lage des Bauteils im Bauvorhaben, d.h. aus
       Gebäude, Geschoss und Raum)
     - Später dasselbe dann für Wandaufbauten und andere künftige Bauteile.
     - Diese Excel-Ausgabe soll durch eine Auswahlmaske gesteuert werden, mit welcher bestimmt werden kann, welche
       Bauteilarten ausgegeben werden sollen, und in welcher Detailtiefe etc.
     - Als Orientierung für diese Excel-Ausgaben sollen die Excel-Vorlagen von Caro für den BTK-Builder genommen werden.
     - Eine erste Implementierung wurde in exportBauteilKatalogAnBaueinheit() in baueinheiten.controller.js begonnnen.
346. **[DONE]** (Prio 2) Potentielles Problem mit verschiedenen Raumnutzungsprofilen: Wenn eines davon
     deaktiviert wird, werden im Elternpfad eventuell Baueigenschaften deaktiviert, die in einem Nachbarraum als Teil
     eines anderen Raumnutzungsprofils aktiviert sind? Der Deaktivierungscode für Profile ist zu überprüfen: baueigenschafts-profil-aktivierungslogik.deaktiviereBaueigenschaftsProfilAufElternPfad(). Es werden dort
     bei der Deaktivierung eines Profils absichtlich <it>keine</it> Baueigenschaften im Elternpfad deaktiviert,
     nur ggf. die am Knoten selbst und seinen Kind- und Kindeskindknoten aktivierten Baueigenschaften im Profil.
     Dort gibt es zur Steuerung einen Parameter baueigenschaftenDeaktivieren mit Default "true", über den
     ggf. auch die Deaktivierung am Knoten selbst und seinen Kindern und Kindeskindern abschaltbar ist.
     Dieser wurde im Rahmen von ==**#502**== eingeführt. In raum-baueigenschafts-profilformular.vue wird
     beim Wechsel des Nutzungsprofils das API mit diesem Parameter mit Wert "false" aufgerufen, was bewirkt,
     dass das Profil nur "unzugeordnet" wird, und keine Baueigenschaften deaktiviert werden. Siehe Details in #502. Damit dürfte
     es insgesamt kein Problem geben.
347. ==**[TODO]**== (Prio 3) Beim Bewegen von Zweigen sollte für Zweige aus dem Bauvorlagenunterbaum kein
     "Hierher verschieben" in den Zweig "Bauprojekte" erlaubt werden (nur Verschieben innerhalb des Bauvorlagenunterbaums).
     Dazu ist eine neue Funktion
     notwendig, die ermittelt, ob der Wurzelknoten des zu bewegenden Zweigs im Bauvorlagenunterbaum liegt
     und gleichzeitig dre Zielknoten im Zweig "Bauprojekte" liegt. Muss eingebaut werden in das :disable ab
     Zeile 1160 ff. in baueinheiten.vue. Sollte verknüpft werden mit #335, zusätzliche Unterebene unter "Bauprojekte".
348. ==**[TODO]**== (Prio 2) **Metamodell-Enforcement** bei Operationen in den Bäumen:
     Im **Bauvorhabenbaum** werden illegale Operationen im Metamodell auf Profilebene bisher nicht
     verhindert, z.B. einen "Standort" unter einen "Raum" zu kopieren, oder ein "Bauvorhaben" unter ein bestehendes
     "Bauvorhaben".
     Damit können **korrupte Modelle** erzeugt werden, was, insbesondere ohne Undo-Funktion gefährlich ist. Allerdings sind
     die Regeln, was erlaubt und was verboten ist, relativ komplex zu definieren und zu implementieren. Im Grunde
     müsste das Kontextmenü für das Bewegen die Profilsituation am zu bewegenden Zweig und am Zielknoten analysieren, und
     dann auf Basis solcher Regeln ein Einfügen erlauben oder verbieten. Dasselbe gilt für die
     Kontextmenüs, die das Einfügen/Anlegen von Kindknoten steuern (dort erfolgen heute
     schon bestimmte Prüfungen, die die Aktivierung bestimmter "passender" Profile gemäß einer vordefinierten
     **Profilhierarchie** an oder unter einem Knoten enablen und andere disablen).
     Aktuell ist es allerdings möglich (z.B. in
     "Mehrgenerationenwohnen Krauch" und im "Eissportzentrum Selb" so modelliert) beliebige **"Strukturierungsknoten" als Kindknoten ohne
     Profilaktivierung** anzulegen (z.B. im "Mehrgenerationenwohnen Krauch" unter "Bestandsgebäude" einen Kindknoten "Bestehende Wohnung",
     ohne Profilaktivierung, bzw. unter "Eissportzentrum Selb" zwei Kindknoten "Bestandsgebäude" und "Neubauteil",
     jeweils ohne Profilaktivierung). Erst darunter kommen dann weitere Kindknoten mit Profilaktivierung (im ersten Beispiel dann Geschosse, im zweiten Gebäude).
     Ob alle Funktionen im System auf solche "abgewandelten" Metamodell-Situationen vorbereitet sind, ist fraglich und müsste
     getestet werden. Eventuell werden dafür auch zusätzliche Profile benötigt (im ersten Beispiel "Wohnung" oder allgemeiner "Nutzungseinheit" > "Raumgruppe", in der
     Profilhierarchie zwischen "Baueinheit > Geschoss" und "Baueinheit > Raum", im zweiten Beispiel "Gebäudegruppe", in der Profilhierarchie zwischen
     "Baueinheit > Standort" und "Baueinheit > Gebäude"). Ähnliches gilt im **Baustoffbaum**, wo (siehe Epic 38.l)
     allerdings andere Profile und andere Regeln gelten.
349. ==**[WORK]**== Neue **Performance-Probleme** im September 2021 - Heroku/MongoDB Cloud Atlas Cloud Version
     von BIM.click ist langsam, inbesondere beim Speichern von Profilformularen!
     - Dafür als ersten Versuch den MongoDB Cloud Atlas Cluster vom bisherigen free Tier M2 auf dedicated Tier M10 upgraded
     - Kostet ca. 65 USD/Monat statt 9 USD/Monat
     - Bringt eine gewisse Verbesserung, z.B. von 25 Sekunden auf ca. 15 Sekunden beim Speichern eines Raums an
       Einstein-Schule, allerdings nicht so stark wie erhofft
     - Plan daher: Diesen dedicated Cluster wieder downgraden auf einen neu zu erzeugenden shared Cluster (siehe unten)
     - Danach den dedicated Cluster wieder freigeben
     - Danach auch mit den Heroku Servern experimentieren
     - Insbesondere das Frontend scheint ein Bottleneck
       zu sein, wie temporäre Vergleichstests mit lokalem Node Frontend und Backend Server gegen die MongoDB Cloud
       Atlas Datenbank zeigen (diese sind schneller als die Heroku Server)
       - ==Es ist aber unwahrscheinlich, dass dies am Frontend Server auf Heroku liegt - dieser lädt als statischer Web Server nur
         den JS-Code in den Browser! Es ist wahrscheinlicher, dass ein Bottleneck in der Refresh Processing/Rendering-Zeit im Browser liegt.==
       - Den Dyno des Frontend Servers könnte man z.B. von einem free Dyno auf einen hobby oder professional Dyno
         upgraden (gegen Gebühr) - siehe https://dashboard.heroku.com/apps/bimclick/resources -
         Change Dyno Type
       - Hobby Dynos haben keine Downtime
       - Eventuell könnte auch das Heroku Dyno RAM/Memory ein Bottleneck sein (ist aber nicht bewiesen!)
       - Allerdings haben Hobby Dynos auch nur 512 MB (wie free Dynos), wesentlich weniger als unsere ThinkPads!
       - Erst teurere Dynos haben mehr RAM!
       - https://www.heroku.com/pricing#data-services
       - Get memory usage on Heroku Node.js: https://stackoverflow.com/questions/9681490/how-to-monitor-memory-usage-on-heroku-node-js
       - https://stackoverflow.com/questions/12023359/what-do-the-return-values-of-node-js-process-memoryusage-stand-for
       - https://www.tomspencer.dev/blog/2016/10/01/running-a-node-dot-js-app-in-a-low-memory-environment/
       - https://devcenter.heroku.com/articles/node-best-practices - ==Node ist auf 1.5 GB und single CPU
         beschränkt, nur Cluster Support in der App kann das überwinden!==
       - https://devcenter.heroku.com/articles/node-memory-use - man müsste im Application Log
         R14 Errors sehen, wenn Memory knapp wird!
     - Der obige MongoDB Cluster Downgrade geht nur manuell per Database Backup/Restore!
     - Reguläre Backups sind einsehbar auf https://cloud.mongodb.com/v2/5e54e923b4e2d2704c5f06f8#clusters/backup/Cluster0
     - Vorlage für diese manuelle Backup/Restore (über Mongo System Commands):
     - (Alternativ kann auch ein Backup über UI (Take Snapshot) erzeugt werden)
     - Einen neuen MongoDB shared Cluster erzeugen, dessen URI notieren (kostet wieder 9 USD/Monat)
       - https://cloud.mongodb.com/v2/5e54e923b4e2d2704c5f06f8#clusters - dort + Create
     - Dann Dump der MongoDB Cloud Atlas Datenbank:
       - https://docs.mongodb.com/database-tools/mongodump/
       - https://www.bmc.com/blogs/mongodb-mongodump/
     - Dazu z.B. Powershell auf lokalem MongoDB-Verzeichnis starten: C:\Program Files\MongoDB\Server\4.2\bin> - dort folgende 2 Commands ausführen
     - Dump der Cloud Atlas Datenbank erzeugen (dauert einige Minuten), speichert die Dateien in einen neuen lokalen Ordner /dump
       - ./mongodump --uri mongodb+srv://dbUser:>>password<<@cluster0-ft9dn.mongodb.net/testmongodump
         - Für die BIM.click Produktions-Datenbank muss es /test statt /testmongodump heißen (der Datenbankname)
     - Mongo Restore in den neu angelegten shared Cluster: Holt defaultmäßig, d.h. ohne spezielle Parameter für den Datenbanknamen die Dateien aus dem eben erzeugten Ordner /dump, und erzeugt daraus eine neue MongoDB (in Compass einsehbar) mit dem originalen Datenbanknamen
       - ./mongorestore --uri URI
         - Nach --uri muss die URI des neu erzeugten MongoDB shared Clusters angegeben werden mit derselben
           Syntax wie beim mongodump oben
         - Siehe https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/#restore-backups-to-non-local-mongod-instances
         - Siehe z.B. https://dba.stackexchange.com/questions/113017/how-restore-a-specific-database-from-backup-using-mongorestore-command
           - Mit weiteren Parametern nach der URI könnte die Datenbank bzw. das Dump Directory geändert werden
         - https://stackoverflow.com/questions/56319314/mongorestore-not-restoring-data-from-uri
           - mongorestore kann mit --host auch eine Datenbank direkt von einem "remote Host" restoren,
             vermutlich ohne den Umweg über mongodump, --uri scheint dabei immer das Ziel zu sein
     - Den teuren dedicated MongoDB Cluster nach erfolgreichem Restore und Test terminaten (Menüpunkt unter "...")
     - Dies durchgeführt:
       - Zur Verkleinerung der Datenbank (unter 2 GB) den ersten Unterzweig in den Vorlagen für Baueinheiten (mit Strukturen aus Word-Dokument
         von Erik) mit "Baueinheit löschen" gelöscht, dadurch reduziert sich die Größe der BaueinheitenCollection um einige Hundert MB - danach ist die Datenbankgröße nur noch 1.2 GB
       - Auf MongoDB Cloud Atlas zusätzlich zu obigem dedicated Cluster einen neuen shared Cluster cluster1 angelegt mit 2 GB:
       - Connection String für diesen cluster1 (abfragbar in Mongo Admin UI):
         - mongodb+srv://dbUser:>>password<<@cluster1.ft9dn.mongodb.net/test
         - ACHTUNG: "cluster1.ft9dn", NICHT "cluster1-ft9dn"
       - Selbes Passwort gesetzt wie für cluster0, durch erstmaligen Connect gegen cluster1 mit Compass via obigem Connection String mit neuem Passwort
       - Beim restore dieses Mal gleich auch den Datenbanknamen geändert von "test" nach "bimclickdb" mittels des angepassten Commands mit Parameter -d bimclickdb:
         - ./mongorestore --uri mongodb+srv://dbUser:dbuserm1x3@cluster1.ft9dn.mongodb.net -d bimclickdb dump/test
         - Siehe https://stackoverflow.com/questions/36321899/mongorestore-to-a-different-database
       - Damit den neue shared MongoDB Cluster produktionsreif gemacht
         - Dann den Connection String dafür auf Heroku von cluster0 auf cluster1 geändert (bimclickserver Environment Variable)
         - Nach einem Fehler ("." statt "-" in der URL dafür) konnte sich die BIM.click Heroku Version erfolgreich
           mit dem neuen cluster1 und dessen von cluster0 restaurierter Datenbank connecten!
       - Danach den teuren dedicated cluster0 terminated im Admin UI von Mongo Cloud Atlas
     - Eventuell Console Logging im Backend Server in Production abschalten (schon abgeschaltet im Frontend Server
       mit Quasar Mitteln) zur Performance-Verbesserung (allerdings vermutlich nicht ursächlich):
       - https://medium.com/@hfally/deactivate-console-log-on-production-why-and-how-d0345abbe71
     - ==Prüfen, ob die Anzahl der zu ladenden Geschwisterknoten im Baum (z.B. auf der Ebene der einzelnen
       Bauvorhaben unter "Bauprojekte") einen wesentlichen Einflluss auf die Refresh-Performance hat - in dieser Hinsicht
       unterscheidet sich die Datenbank auf Heroku von der Testdatenbank!==
     - ==Eine Analyse des Backend Server Application Logs auf Heroku zeigt, dass (mit dem alten, langsamen
       Refresh am Frontend, was sich später als Ursache bzw. Bug herausstellte, siehe unten) tatsächlich die meiste Zeit
       verbraucht wird
       im Refresh nach dem Speichern, und zwar beim Aufruf von readKindKnotenBaueinheit() auf der Ebene unter
       "Bauprojekte" (dieser Aufruf entfällt beim optimierten Refresh im Frontend, der später als Fix aktiviert wurde)==:
       - Es vergehen ca. 18 Sekunden, bis der nächste Aufruf auf der Ebene darunter erfolgt
       - Andere Aufrufe der Methode mit wenigen Kindern brauchen dagegen nur 1-2 Sekunden
       - Diese Methode besteht vor allem aus einem
         Aufruf von getImmediateChildren() für alle Bauvorhaben unter "Bauprojekte", d.h.
         es werden dort viele Kinder (aktuell ca. 20 Bauvorhaben) geladen!
         Dies ist konsistent mit obiger Beobachtung, dass
         darin ein Unterschied besteht zur lokalen Testdatenbank, und auch konsistent mit dem
         ähnlich langsamen Laden beim ersten Aufklappen des Knotens "Bauprojekte".
     - Es muss im Rahmen der Analysen noch genauer ermittelt werden, ob die Zeit im API-Aufruf am Backend verbraucht wird, oder
       durch Frontend Processing, bis dann der nächste API-Aufruf erfolgt!
     - Nach Stefans Meinung könnte Zeit vor allem auch
       im Quasar-internen QTree Handling im Frontend/Browser verbraucht werden. Dafür als Startpunkt das Timing um die Methode
       done() herum
       in lazyLoadHandlingTreeBaueinheiten() analysiert, dort Console Logging eingebaut. Der Aufruf der Methode
       alleine ist jedoch nicht auffällig, aber diese Methode triggert asynchrone Quasar Aktivitäten, die bis
       zum Rendern des Baums Quasar-intern ablaufen!
     - Ein erster Test mit lokalen Servern (mit Frontend Logging) gegen die neue shared MongoDB Cloud Atlas Datenbank
       (cluster1) zeigt, dass
       dort beim Ausklappen von "Bauprojekte" (wo ebenfalls lazyLoadHandlingTreeBaueinheiten() mit getImmediateChildren()
       aufgerufen wird) nur scheinbar die längere Zeit verbraucht wird im Warten auf die API Response für das Lesen der
       Kindknoten (ca. 5 Sekunden von 6 insgesamt)! Für die Nachbereitung inklusive done() wird (scheinbar!) ca. 1 Sekunde
       verbraucht! ==Achtung: Diese letzte Zahl ist allerdings potentiell irreführend, da Quasar bis zum Rerendern
       asynchrone Aktionen durchführt!==
     - ==Das Ausklappen von "Bauprojekte" läuft allerdings mit lokalen Servern gegen die remote Mongo Datenbank erheblich
       schneller (maximal ca. 9 Sekunden für das Holen aller Kinder unter
       "Bauprojekte") als auf Heroku, wo es aktuell maximal ca. 22 Sekunden dauert! Dies ist ein Indiz, dass
       der größere Bottleneck der Backend Server bzw. das Senden der API Response durcdh diesen ist, im
       Vergleich zum Frontend/Browser, der lokal und gegen Heroku stets lokal im Browser läuft!==
     - ==Achtung: **Die Response Time mit Heroku Servern schwankt!** Am 09.09.2021 dauert dasselbe Laden über Heroku free
       Server gegendie neu aufgesetzte shared Tier M2 MongoDB ziemlich konstant nur 9 Sekunden (cluster1), nicht wie am Tag
       vorher 22 Sekunden! Auch der ug. Link (heroku Network Test) zeigt deutlich bessere Werte, 20 Mbit/s bis 100 Mbit/s!==
     - Deshalb könnte auch der Backend Server auf Heroku ein potentieller Bottleneck sein - z.B. beim
       Beantworten der API Requests, die getImmediateChildren gegen die Datenbank auslösen.
     - Das Backend Server Log zeigt allerdings, dass bis zum Absenden der API Response, abhängig
       von der Anzahl der Kindknoten bei getImmmediateChildren() nur ca. 1 (bei 2 Kindknoten) bis 4 Sekunden (bei 20+
       Kindknoten) vergehen.
     - Derselbe Test mit einem lokalen Backend Server gegen dieselbe Datenbank zeigt in etwa dieselben Werte für
       das Bereitstellen der API Requests. Allerdings müssen danach ja die API Responses an den Browser geschickt werden.
     - ==Der Grund für die Unterschiede zwischen lokalen Servern und Heroku Servern ist deshalb wahrscheinlich, dass die
       Netzwerkverbindung zwischen Backend Server und Frontend (d.h. dem Browser) Einfluss auf die Performance hat,
       insbesondere, weil ja zwischen Backend Server
       und Frontend (d.h. dem Browser) bei vielen Kindknoten auch sehr große Datenmengen übertragen werden! Der
       Frontend Server spielt vermutlich keine Rolle, da er nur die App in den Browser lädt - danach kommunhiziert der
       Browser mit dem Backend Server.==
     - Der Response Header auf den API Request für die Kindknoten unter "Bauprojekte" zeigt im lokalen Browser Log mit
       lokalem Backend Server eine Größe (headers: content-length) von 42.586.936 Bytes - das sind 42 MB! Beim API Request für
       die Kindknoten des
       Wurzelknotens des Bauvorhabenbaums sind es nur 2.508.819 Bytes, d.h. 2.5 MB!
     - Siehe https://www.geeksforgeeks.org/http-headers-content-length/#:~:text=HTTP%20Content%2DLength%20entity%2Dheader,blank%20line%20below%20the%20headers.
     - Auf https://cloudharmony.com/speedtest-for-heroku gibt es einen Network "Downlink" Test für Heroku:
       - Die Werte dort (für eu-west-1) sind relativ niedrig: 10 - 20 Mbit/s, das sind 1.2 - 2.5 MB/s
       - Rechnet man optimistisch mit 2.5 MB/s, würden 42 MB ca. 17 Sekunden dauern!
       - Rechnet man dazu noch die obigen 4 Sekunden für den Datenbank-Request, kommt man auch ohne weiteres Frontend
         Processing schon auf 21 Sekunden!
       - Ein Sniff Test, bei dem beide Heroku Server (Frontend Server und Backend Server)
         von free auf Hobby Dyno Types (7 USD/Month statt 0) umgestellt wurden,
         bringt aber auch keine dramatische Verbesserung! Daher diese wieder auf free Dynos zurückgestellt. Es ist in der
         Heroku Doku auch keine Information zu Unterschieden in deren Netzwerkgeschwindigkeit zu finden.
       - Achtung: Beim Zurücksetzen der Dynos für den bimclickserver von Hobby nach free gab es ein Problem, dass der Backend
         Server nicht mehr erreichbar war - im Log war Error H14 "No web processes running" zu sehen
         - https://stackoverflow.com/questions/41804507/h14-error-in-heroku-no-web-processes-running
         - Dort zweitletzte Antwort: Mit Heroku CLI das Command "heroku ps:scale web=1" ausführen
         - Dazu auf Windows Heroku Command Line Interface (CLI) heruntergeladen und installiert
           - https://devcenter.heroku.com/articles/heroku-cli
         - Aufgerufen in Windows shell eingeben: > heroku login
         - Dann Passwort Prompt für Heroku Login in Browser
         - Dann in Windows Shell eingeben: > heroku ps:scale web=1 -a bimclickserver
           - Siehe https://stackoverflow.com/questions/52704791/how-to-connect-to-the-selected-app-with-heroku-cli
         - Das behebt das Problem!
     - ==Hinweis: Damit liegen die obigen Unterschiede zwischen lokalen Servern vs. Heroku Servern (beide mit MongoDB
       auf Cloud Atlas) vermutlich in der Netzwerkgeschwindigkeit zwischen Backend Server und Browser, die
       sich insbesondere bei der Übertragung großer Datenmengen in API Responses auswirkt (bei lokalen Servern ist gar keine
       echtes Netzwerk dazwischen, was deutlich schneller gehen müsste).==
     - ==Die zweite vermutliche Hauptursache der Langsamkeit bei vielen Kindknoten ist neben der Netzwerkgeschwindigkeit
       allerdings der auf dem Quasar QTree basierende
       Processing der Response nach deren Empfang im Frontend, d.h. im Browser - dessen Performance hängt vermutlich
       stark von der Größe der Daten in jedem QTree Node ab!==
       - Wie allein die Debug-Ausgabe von selectedNodeTreeBaueinheiten zeigt, ist diese sehr groß und wächst
         proportional mit der Anzahl der geladenen Kindknoten
       - Das "Reaktiv-Machen" des gesamten QTrees durch Quasar kann dabei Zeit kosten.
         - Dies dies wurde auch durch die Performance von "Zugeordnete Baustoffe" bewiesen, die nur durch Object.freeze()
           besser wurde
       - Ein Sniff Quasar Code Pen mit 12 QTree Nodes a ca. 100.000 Bytes (0.1 MB) zeigt allerdings noch keine großen
         Verzögerungen,
         solange der Array für die Nodes im QTree nicht per {{ ... }} im Template mit ausgegeben wird! Alledings sind
         dies dann nur 1 bis 2 MB, was deutlich weniger ist als die 42 MB bei 20+ Kindknoten unter "Bauprojekte".
         Insofern war dieser Test nicht repräsentativ. Bei einem Test mit 1 MB pro Knoten statt 0.1 MB
         steigt die Code Sandbox aus - auch ein Indiz für Memory Probleme bei der Ausführung.
       - Daher sind weitere Analysen notwendig.
       - ==Eine Möglichkeit, das Datenvolumen bzw. den Memory Footprint sowohl bei der Übertragung in der API Response im
         Netzwerk als auch beim
         Post-Processing der API Response im Frontend duch Quasar
         zu reduzieren, wäre, die fachlichen Rubriken/Schutzkategorien, die aus
         den typbezogenen Baueigenschaften in jede einzelne Baueigenschaft populiert werden, nicht mehr zu übertragen.
         Dies würde vermutlich ca. 25-30% Speicherplatz reduzieren in jeder Baueigenschaft.
         Sie müssten dann am Frontend in den entsprechenden QTables disabled werden oder nachgeladen werden.==
       - Weitere Vue Performance Tipps hier: https://codeburst.io/5-vue-performance-tips-98e184338439, u.a. für Watcher
     - **[DONE]**: Im Rahmen der obigen Performance-Analyse wurde festgestellt, dass in baueinheiten.vue, reloadTreeWrapper(useVersion = "Optimiert, ..) zwar der
       korrekte Default "Optimiert" eingestellt war, unten im Code aber auf case "05/2021" abgefragt wurde statt case "Optimiert".
       Daher wurde beim Aufruf mit Parameter "Optimiert" die NICHT optimierte Version aufgerufen statt der optimierten, wie man
       auch im Log sah. Dort gefixt!
       - ==Damit verbessern sich lokal und auch auf Heroku die Zeiten zum Speichern von Profilformularen drastisch!==
     - ==**[WORK]**:== ==Es bleibt allerdings immer noch die lange Ladezeit beim **Expandieren der Bauvorhaben** unter
       einem "Bauprojekte"-Knoten auf Heroku (siehe oben - kein Refresh-Problem, sondern separates Performance-Problem).==
       - Dafür muss obige Analyse erfolgen (Frontend vs. Backend-Anteile, potentielle Optimierungsmöglichkeiten)
       - Die Datenbank ist dabei nicht der Bottleneck!
       - Die API Response Time des Backend Servers ist der erste Bottleneck - diese ist stark abhängig von der Größe der
         gesendeten Daten (diese ist wiederum proportional zur Anzahl der Kindknoten und der Daten
         in jedem Kindknoten - dort sind die wertbezogenen Baueigenschaften, in denen die typbezogenen
         Baueigenschaften populiert sind, der größte Anteil) und der Netzwerkanbindung des Backend Servers
       - Die anschließende Rendering Zeit im Frontend/Browser ist potentiell ein zweiter Bottleneck (Quasar/Vue QTree
         Rendering, ausgelöst durch done() - diese Zeitanteile wurden durch einen Timing Event am Ende des QTree
         Renderings mit Console Log von Stefan transparent gemacht).
       - ==Allerdings sind diese Frontend Rendering Zeiten tendenziell stets kleiner als die vorher verbrauchten API Response
         Zeiten inklusive des Empfangs der Response (z.B. 1 s vs. 7 s, bzw. 0.6 s vs. 2.5 s, bzw. 3 s vs. 11 s in
         verschiedenen Tests)!==
       - Die insgesamt verbrauchte Zeit schwankt leider von Messung zu Messung (abhängig von Heroku Verfügbarkeit?).
         Es ist aber konsistent so, dass die Zeit bis zum Erhalt der API Response besonders bei den "langsamen"
         Tests (innerhalb des schwankenden Spektrums) erheblich länger ist als die Rendering Zeit im Frontend.
       - Im Backend Log sieht man allerdings, dass die Backend Processing und Datenbank-Zeiten nur einen Teil ausmachen,
         ein stattlicher Teil wird nur für das Senden der Response über das Netzwerk verbraucht (abhängig von
         der Response Size und der Netzwerkgeschwindigkeit zwischen Heroku und dem Browser über das Internet).
       - Verbleibende Optimierungsmöglichkeiten:
         - **[DONE]** Mehrere Knoten für "Bauprojekte" - im Frontend Code (baueinheiten.vue) bereits vorbereitet.
           Beim ersten Testen wurde allerdings zunächst das Problem #352 entdeckt - mittlerweile gefixt. Die Einführung einer Unterebene unter "Bauprojekte" (#335 - verworfen) oder
           noch besser das Aufbrechen von "Bauprojekte" in mehrere parallele "Bauprojektunterzweige" (#353 - "Bauprojekte (Test)", "Bauprojekte (ab
           12000)", "Bauprojekte (ab 13000"), "Bauprojekte (ab 14000)" bringt eine Verbesserung mit sich, da dann damit potentiell
           weniger Geschwisterknoten geladen werden müssen bzw. diese aufgeteilt werden können
           in kleinere Untergruppen - implementiert in #353 und auf Heroku die Bauprojekte-Strukturen entsprechend
           angepasst.
         - ==**[TODO]**== Prüfen, warum beim Refresh offenbar readExtraktBaustoffe() ausgelöst wird - diese Funktion
           sollte möglichst nur bei Anwahl des Tabs "Zugeordnete Baustoffe" aufgerufen werden!
           Verdächtig: baueinheiten.vue, Watch selectedKeyTreeBaueinheiten(), Zeile 27649. Wenn man diese disabled,
           werden allerdings die zugeordneten Baustoffe beim Wechsel des Knotens im Baum nicht mehr korrekt angezeigt.
           Beim Aufruf von readExtraktBaustoffe() wird der Baustoffbaum in eine globale Variable nodesTreeBaustoffe
           geladen. Dies sollte weniger häufig erfolgen - eigentlich ändert sich der Baustoffbaum selten, nur
           die ticked Nodes ändern sich bei Auswahl eines anderen Knotens im Baum.
           Die andere Backend-Funktion readAlleBenutzer() wird offenbar vorher in Zeile 27618 durch
           Aufruf von initialisiereSelectOptionsUndSelectFilterOptionsAutorenAusgewaehlteBaueinheit() ausgelöst.
         - Fachliche Rubriken nicht mehr mitsenden in API Response (ca. 40% Größeneinsparung?)
         - ==**[WORK]**== "Object.freeze()" für typbezogene Baueigenschaften in response.data -
           dazu ist ein
           Traversieren aller Baueigenschaften in allen Kindknoten erforderlich, mit Object.freeze() für das Unterobjekt "typbezogeneBaueigenschaft". Die fachlichen Rubriken
           sind ein Teil davon, deshalb ist es sinnvoll, dies vor obiger Eliminierung
           der fachlichen Rubriken zu testen! Allerdings könnten dadurch die typbezogenen
           Baueigenschaften eventuell innnerhalb von baueinheiten.vue nicht mehr geändert
           werden- dies muss mit getestet und berücksichtigt werden! Ein erster Sniff Test
           mit dieser Optimierung auf Heroku (Expandieren von "Bauprojekte") bringt jedoch
           keine große Verbesserung (bei "schnellem" Heroku, ca. 10 Sekunden mit und ohne
           Object.freeze(), später bei "langsamem" Heroku, ca. 17 Sekunden mit und ohne Object.freeze()). Einstweilen wieder disabled.
         - ==**[WORK]**== Die "fachlichen Rubriken" nicht mehr mitschicken - bringt eine Reduktion der Response um ca. 25-30%
           und damit eine API Response-Zeit Verbesserung. Probeweise per Test Fix getestet in baueinheiten.controller.js.
           Allerdings war Heroku bei diesen Tests sowieso schon schnell, so dass unklar ist, wie groß die Verbesserung
           dadurch wirklich ist.
         - ==**[TODO]**== Migration nach Quasar 2/Vue 3 - Vue 3 hat laut Stefan ein performance-optimiertes Reactivity System!
     - ==**[TODO]**:== ==Zusätzlich besteht ein Performance-Problem beim **Bewegen von Zweigen (#354)**==
350. **[DONE]** Auf Heroku kommt beim Frontend Build die Warnung "Browserslist: caniuse-lite is outdated.
     Please run: npx browserslist@latest --update-db" Siehe
     https://stackoverflow.com/questions/55271798/browserslist-caniuse-lite-is-outdated-please-run-next-command-npm-update-cani und
     https://www.npmjs.com/package/browserslist.
     Daher dieses Command im lokalen BIM.click Frontend Ordner ausgeführt. Updated package-lock.json - müsste auch nach Heroku propagiert
     werden. Die Warnung im Heroku Build ist danach verschwunden.
351. **[DONE]** (Prio 2) Beim Verschieben von Zweigen im Bauvorhabenbaum: Die Ids der Wurzel des zu verschiebenden Zweigs tauchte
     beim deleteMany() als String im Array auf im Console Log, anders als die dort schon versammelten anderen Ids - daher als Fix ObjectID(id) (statt vorher nur id) auf diesen Array gepusht. Dies war allerdings vermutlich nicht die Ursache
     des obigen Problems beim Verschieben eines Zweigs auf Heroku!
352. **[DONE]** (Prio 2) Bei Test auf Heroku gravierendes Problem, beim Versuch, das Projekt "13167 Mehrgenerationenwohnen
     Krauch" aus Elternknoten "Bauprojekte" zu verschieben unter einen testweise angelegten Knoten "Bauprojekte (13XXX)".
     - Stefans Funktionen beim Verschieben
       laufen laut Backend Server Log, aber ab einem bestimmten Punkt kommen API Requests für readAlleBenutzer() und readExtraktBaustoffe() dazwischen (ausgelöst durch Refresh-Funktion vom Frontend). Das Verschieben schlägt mit einer Fehlermeldung fehl, und anschließend ist an fast allen Geschwisterbauvorhaben des
       verschobenen Zweigs kein Profil mehr aktiviert!
     - Danach die Datenbank restored aus Vortagsversion!
     - Das deleteMany() für den ursprünglichen zu verschiebenden
       Zweig scheint per Log erfolgreich zu funktionieren (außer #351 - gefixt), daher liegt der
       Fehler in deaktiviereBaueigenschaftsProfilAnBaueinheitVersion0821(), was neuerdings
       nach dem deleteMany() aufgerufen wird, um die Profile im Elternpfad nach dem Löschen, abhängig von Geschwistern, zu aktualisieren. Dafür spricht auch, dass
       die verbleibenden Geschwister des verschobenen und gelöschten Zweigs
       die Profile nicht mehr aktiviert haben, die am Wurzelknoten des zu bewegenden Zweigs aktiviert waren.
     - Das Problem kann
       jedoch lokal nicht einfach reproduziert werden. Es kann jedoch mit einer lokal restaurierten Kopie der Heroku-Datenbank lokal reproduziert werden (siehe
       Epic 48). Z.B. Verschieben von Bauvorhaben "13167 Mehrgenenerationenwohnen Krauch" - der verschobenen Zweig
       kommt erfolgreich z.B. unter Knoten "Bauprojekte (NEU)" an, sogar ohne Fehlermeldung, aber alle Gechwisterknoten
       unter "Bauprojekte" haben die am Wurzelknoten des bewegten Zweigs aktivierten Profile deaktiviert, d.h. "vergessen"!
     - Gefixt in baueinheiten.controller und baueigenschafts-profile-aktivierungslogik, jeweils markiert mit #352.
353. ==**[WORK]**== (Prio 3) Unterstützung mehrerer paralleler "Bauprojekte"-Geschwisterknoten im Bauvorhabenbaum.
     - Dazu eine entsprechende Umstrukturierung der Bauvorhaben auf Heroku/Cloud Atlas durchgeführt per BIM.click UI - im Gefolge von #349 (Performance)
       den bisherigen Knoten "Bauprojekte" aufgesplittet in "Bauprojekte (Test)", "Bauprojekte (ab 12000)",
       Bauprojekte (ab 13000)", usw. Die dortigen Unterknoten (Bauvorhaben) entsprechend per Kontextmenü
       unter neuen Zielknoten verschoben. Diverse Umbenennungen von Knoten per Compass durchgeführt.
       Dabei noch diverse :disable-Funktionen in baueinheiten.vue umgestellt von baueinheitsBezeichnung === 'Bauprojekte'
       auf baueinheitsBezeichnung.startsWith('Bauprojekte'). Beim Bewegen/Verschieben diverser Bauvorhaben
       unter neue Zielelternknoten ("Bauprojekte ...") traten allerdings Timeout-Fehler auf (siehe #354).
     - ==**[TODO]**== Die Implementierung von "Bauprojekte" ist damit auch noch nicht vollständig: Die Identifizierung solcher
       Knoten erfolgt noch nicht per Baumknotentyp, sondern über die Bezeichnung (startsWith("Bauprojekte")) und
       sicherheitshalber können diese Knoten nicht umbenannt werden - dort müsste, solange die Identifizierung
       nicht per Baumknotentyp erfolgt, eine Prüfung eingebaut werden, dass die Bezeichnung mit "Bauprojekte"
       beginnen muss. ==Hinweis: #335 war eine andere Variante #353 - #335 deshalb auf **[DEFER]** gesetzt.==
354. ==**[WORK]**== (Prio 2) Beim Bewegen von Zweigen auf Heroku/MongoDB Cloud Atlas kommen oft rote
     Fehlermeldungen am Frontend, noch bevor im Backend Server Log auf Heroku bewegeZweig() erfolgreich mit
     Status 200 abgeschlossen ist. Nach einem manuellem Browser Refresh war das Bewegen jedoch trotzdem erfolgreich.
     - Es handelt es sich also offenbar um Timeouts der API Requests des Frontends an das Backend für das Bewegen von Zweigen.
     - Laut https://stackoverflow.com/questions/57995863/what-is-axios-default-timeout hat aber
       Axios am Frontend gar keinen Default Timeout, sondern es handelt sich dabei um Timeouts am Backend Server,
       falls dort das Request Processing inklusive der Datenbank-Operationen zu lange dauert. Im Backend Server Log tauchen während der
       Abarbeitung eines solchen Requests für das Bewegen eines Zweigs schon früh **Heroku-spezifische H13 Errors** auf - siehe
       https://stackoverflow.com/questions/41488602/heroku-connection-closed-code-h13/41489179 und
       https://stackoverflow.com/questions/26597101/heroku-error-h13. Express schickt dann vorzeitig eine Error Response
       mit Status 503
       an das Frontend, das mit einer roten Meldung reagiert! Im Hintergrund läuft aber das Request Processing gegen
       die MongoDB eigentlich erfolgreich weiter!
     - Laut Antwort auf StackOverflow
       gibt es einen Node Express Server Default Timeout von 2 Minuten. Siehe https://stackoverflow.com/questions/23925284/how-to-modify-the-nodejs-request-default-timeout-time - diesen Node Timeout testweise in back-end-server.js auf 4 Minuten erhöht. Dies half jedoch nicht, es kamen damit statt Heroku H13 Errors **Heroku H12 Errors** nach genau 30 Sekunden.
     - Dies ist offenbar schwer oder gar nicht zu fixen: https://stackoverflow.com/questions/21749396/how-to-change-default-request-time-out-on-heroku. Auf https://devcenter.heroku.com/articles/request-timeout und
       https://devcenter.heroku.com/articles/background-jobs-queueing wird
       empfohlen, Requests, die Datenbank-intensiv sind, in einen Background Job zu moven!
     - Dazu siehe
       https://stackoverflow.com/questions/31009340/background-processes-in-node-js - für MongoDB wird dort
       als Background Job Manager **Agenda** empfohlen, https://www.npmjs.com/package/agenda.
     - Allerdings müsste dafür auch das Frontend signifikant geändert werden - dieses müsste nach Initiieren
       eines solchen Requests dessen Abarbeitungszustand pollen (mittels Progress Dialog?) und erst dann einen Refresh
       veranlassen, wenn das Backend mittels Background Job meldet, dass der Request abgearbeitet ist! Alternativ
       müsste das Backend das Frontend per Event über die Abarbeitung benachrichtigen (z.B. per Socket
       Aktualisierungsnachricht).
     - Das Problem
       ist insofern gravierend, als dass während solcher Requests offenbar das System auch unresponsive ist für
       andere Benutzer!
     - Anhaltspunkte für das Timing bei diesem Problem:
       Das Kopieren eines größeren Projekts ("Mehrgenerationenwohnen Krauch") dauert am 17.09.2021 laut Backend Log ca. 60
       Sekunden, wobei nach 30 Sekunden der Heroku Timeout zuschlägt, wodurch das Frontend vorzeitig bzw. irrtümlich
       einen Fehler meldet!
     - Als vorläufigen Workaround am Frontend beim Bewegen eines Zweigs bei Status 503 eine Warnung mit Hinweis zum
       manuellen Refresh eingebaut. Die Erkennung des H12/H13-Errors am Backend mit angeblichem Status 503
       am Frontend ist jedoch fragil, es kommt dort nur ein "Network Error" an in error.message, error.response und error.response.status
       sind dabei undefiniert.
     - ==Einen Workaround (Warnmeldung) dafür eingebaut in axios.js und baueinheiten.bewegeZweigBaueinheit(), markiert mit #354.==
       Testweise auch einen Custom Timeout für Axios Requests am Frontend in axios.js eingebaut (Default ist 0 - kein
       Request Timeout), diesen aber wieder disabled. ==**Update**==: Die H12-Fehler treten auf Heroku auch auf beim transitiven Aktivieren von Baueigenschaftsprofilen
       in großen Zweigen, und zwar nachdem #377 gefixt wurde!
     - ==**Update 21.01.2022**==: Tests in verwaltung.vue, baueinheiten.controller.vue und back-end-server.vue mit Agenda und Socket
       Nachrichten zur Benachrichtung des Clients nach Agenda Job Completion am Server (#354)
     - Vorlage:
       - https://stackoverflow.com/questions/4647348/send-message-to-specific-client-with-socket-io-and-node-js
       - https://stackoverflow.com/a/24232050/11858583
     - ==**[WORK]**== ==Weiteres Design und Tests für die Umstellung von baueinheiten.controller.bewegeZweigBaueinheit() auf Agenda Job:==
       - ==**Achtung**==: bewegeZweigBaueinheit() wurde für die Umstellung dupliziert in eine Methode  
         wrapperBewegeZweigBaueinheitMitAgenda(), welche internalBewegeZweigBaueinheit() für das Bewegen per Agenda Job auslöst -
         die bisherige Backend-Controller-Methode bewegeZweigBaueinheit() ist unverändert, als
         Backup-Variante bis die neue Version stabil läuft!
       - Die neue Router-Methode baueinheiten.controller.wrapperBewegeZweigBaueinheit() mit Agenda startet dann künftig einen vordefinierten Agenda Job für das Bewegen eines Zweigs
       - Dieser Job muss vorher in back-end-server vordefiniert werden, da er nur einmal definiert werden sollte (nicht im Controller)
         - Vorlage dafür: back-end-server.setupAgenda() - dort agenda.define()
         - Statt "agendaTestJob" hat dieser Job den Namen "bewegeZweigBaueinheit" (camelCase ist üblich für jobName per Agenda Doku)
         - Der Job muss jedoch Code aus dem bisherigen baueinheiten.controller.bewegeZweigBaueinheit() aufrufen allerdings ohne req/res
         - Dazu wurde im baueinheiten.controller eine neue Funktion internalBewegeZweigBaueinheit() angelegt, siehe unten
         - Dazu schon ein require für diesen Controller neu eingefügt in back-end-server
         - Aufruf dann per baueinheitenController.internalBewegeZweigBaueinheit(), analog zu baueigenschafteController.internalCreateBaueigenschaft()
         - Achtung: Der Job muss diese Funktion entweder mit await aufrufen (diese muss dann auf jeden Fall korrekt eine Promise returnen,  
           per new Promise, und resolve/reject!) oder das .define muss
           erweitert werden um eine Funktion done(), die am Ende gerufen werden muss!
         - Parameter können an die Funktion übergeben werden beim Start des Jobs per agenda.now (siehe unten)
         - Die Rückgabeparameter werden in agenda.define passend gesetzt nach dem await
       - Vorlage für Start des Jobs in baueinheiten.controller.doSomeLongTask() - dort agenda.now() - in unserem Fall: agenda.now(jobName, data) - data
         sind Parameter des Jobs, die passend sein sollten zu denen von internalBewegeZweigBaueinheit() - siehe unten
       - Nach dem Start des Jobs per var job = await agenda.now() erhält man die Id des Jobs in jobs.attrs.\_id - diese schickt die neue internalBewegeZweigBaueinheit()-Methode
         per Response an den Client - sie dient dann gleichzeitig als als eindeutige und job- und clientspezifische Bezeichnung für einen Socket-Room, in dem die Benachrichtigung des Clients durch den Server erfolgt, wenn der Job completed ist
         - Vorlage dafür: baueinheiten.controller.doSomeLongTask() - dort res.type("json").status(200).send({"room": job.attrs.\_id});
       - Im Client, baueinheiten.bewegeZweigBaueinheit() muss nach dem Absenden des Put-Requests bei erfolgreicher Response ein Socket-Room gejoined werden, mit der Bezeichnung aus der Response
         - Vorlage dafür: verwaltung.startAgendaJob - dort \$socket.emit("joinRoomForAgendaJob")
         - Ansonsten muss der Client auf die Socket Nachricht warten (d.h. zuerst eine Benutzernachricht, dass der Request dauert, danach spinning Gears anzeigen)
       - Für das eigentliche Bewegen muss bewegeZweigBaueinheit() umgebaut werden in eine Methode internalBewegeZweigBaueinheit(), die ohne req/res arbeitet
         - Vorlage dafür: baueigenschaften.controller.internalCreateBaueigenschaft()
         - Die Methode benötigt Parameter (id der Wurzel des zu bewegenden Zweis, body mit id des Zielelternknotens, etc.)
         - Siehe req.body von bewegeZweigBaueinheit(), es dient der gesamte body als Objekt-Parameter
         - Diese Methode muss in dem Agenda Job (siehe oben) aufgerufen werden
         - Wenn sie komplett fertig ist (alle Promises in Mongo abgearbeitet), muss sie returnen
         - Was sie returned, muss noch designed werden (Unterscheidung Erfolg/Error mittels status, Ergebnisse (idNeueWurzelZuBewegnderZweig, error))
           - Hilfsfunktionen (copyZweig(), kopiereZweigMitVererbungBaueigenschaften()) returnen in ihren catch-Blöcken einfach ohne eine
             Exception zu werfen! Hilfsfunktion baueigenschafts-profile-aktivierungslogik.kopiereZweigMitVererbungBaueigenschaften() macht dagegen throw error - das ist so korrekt.
           - Hinweis: Die Funktion sendet auch Socket-Aktualisierungsnachrichten bei Änderungen im Zweig "Vorlagen" des Bauvorhabenbaums!
           - Vorher: res.status(200).send({message, idNeueWurzelZuBewegenderZweig}) bzw. res.status(500.send({ error }))
           - ==**Achtung**==: Damit die Agenda Job Completion nach dem Aufruf dieser Funktion korrekt funktioniert, mussten alle
             solchen res.status(xxx).send umgestellt werden auf Promise-Rückgaben (resolve/reject({ status: xxx, ...}), und der Body der Funktion gewrapped werden mit return (dieses return ist unbedingt erforderlich!) new Promise((resolve, reject) => {...})
           - Abhängig vom Ergebnis, muss bei Job Completion eine Socket-Nachricht an den oben ermittelten Room gesendet werden, die ebenfalls
             den status aus internalBewegeZweigBaueinheit() als Parameter enthält, sowie weitere Rückgabe-Parameter.
           - Dieses Parameter-Mapping erfolgt dabei in back-end-server.js, in dem Code, der per agenda.define(") den Job
             bewegeZweigBaueinheit definiert.
           - Vorlage dafür: back-end-server.setupAgenda() - dort agenda.on("complete:agendaTestJob", ...), io.sockets.emit("agendaTestJobComplete", ...) für den Agenda-Testjob
           - ==**Hinweis**==: Es gibt auch die Events agenda.on("success:agendaTestJob", ...) und agenda.on("fail:agendaTestJob", ...) statt agenda.on("complete:agendaTestJob")
       - Im Client, baueinheiten.vue. muss abhängig vom Erfolg/Error bei Erhalt obiger Socket Nachricht eine Benutzernachricht ausgegeben werden und der passende
         Refresh des Bauvorhabenbaums ausgelöst werden
         - Vorlage dafür: verwaltung.mounted() - dort \$socket.on("agendaTestJobComplete", ...)
         - Dieser Code ist in baueinheiten.mounted(): this.\$socket.on("agendaTestJobComplete", data => { this.handleBewegeZweigMitAgendaJob(data) }
         - ==**Achtung**==: Dieser Code muss mit Arrow-Funktion gebunden werden, dass er .this von Vue versteht, sonst kommt es zu ominösen
           "is not a function" Fehlern zur Laufzeit!
       - Zum Testen wurde dieses Bewegen eines Zweigs im Bauvorhabenbaum per Agenda Job auf eine vorläufige Route unter der Route
         /Baueinheiten/ gelegt, welche
         am Backend eine Funktion baueinheiten.controller.wrapperBewegeZweigBaueinheit() aufruft - diese startet dann den Agenda Job per agenda.now("bewegeZweigBaueinheit", ...), mit den Parametern aus dem Request vom Frontend
       - Weiterhin wurde auch der Import von Baueigenschaften als Agenda Job implementiert. Dieser
         läuft parallel zum bisherigen Import auf einer neuen Route \ImportMitAgendaJob\.
         Es gibt in daten-austausch.vue neue Methoden dafür (#354), sowie in baueigenschaften.controller - dort
         insbesondere importBaueigenschaften) - dort resolve für promise eingebaut. Allerdings könnte es damit noch ein Problem geben (siehe unten,
         Problem mit promise von internalCreateBaueigenschaft()).
       - Diesen Import mit Agenda Job bereits auf Heroku enabled! Muss dort noch getestet werden.
     - ==**Update 25.02.2022**==:
       - Das Bewegen von Zweigen im Bauvorhabenbaum mit Agenda Job funktioniert, bis auf folgende Vue Warnings, die
         während bzw. nach dem Refresh auftreten können
         - ==**[TODO]**== undefined-Warnings z.B. bei Zugriff auf das lazy-Flag des zu expandierenden Knotens nach dem Refresh in
           handleBewegeZweigMitAgendaJob()
         - ==**[TODO]**== "TypeError: Cannot read properties of undefined (reading 'children')" in
           knotenIstImFuerBewegenMarkiertenZweigTreeBaueinheiten() - diese wird im Template für den q-tree aufgerufen
         - ==Es handelt sich hier um Timing-Probleme, bei denen der Refresh noch nicht fertig ist (dessen awaits/Promises müssen überprüft
           werden, vermutlich unabhängig davon, ob er nach Agenda Job oder wie bisher ausgeführt wird)==
       - Vorläufig wieder den alten Refresh bewegeZweig() statt bewegeZweigMitAgendaJob() enabled im Template (2 Stellen an Kontextmenüs)
       - ==**[TODO]**== Beim Testen mit Server Restarts ohne neue Datenbank kommt nach einiger Zeit
         eine Fehlermeldung "(node:41516) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 exit listeners added to [Bus]. Use emitter.setMaxListeners() to increase limit"
       - **[DONE]** Per Test returned internalCreateBaueigenschaft() offenbar KEIN promise-Resul -
         let promiseAusCreateBaueigenschaft = await that.internalCreateBaueigenschaft() in internalImportBaueigenschaften() - diese
         Variable ist undefined per Log. Trotzdem
         completed der Agenda Job in diesem Fall erst nach dem Anlegen aller Test-Baueigenschaften. Der Code von internalCreateBaueigenschaft()
         diesbezüglich reviewed mit Stefan - die überflüssigen returns am Ende entfernt.
       - **[DONE]** Bei Import bereits vorhandener Baueigenschaften crashed internalCreateBaueigenschaft() mit einem MongoError (duplicate
         Key). Dieser wird nicht abgefangen, so dass der Client mit Spinner hängt. Hier müsste eine Promise mit status 500 zurückgegeben werden!
         Dies gefixt, auch für andere Error Situationen, indem in dem Code in socket.define("") ein try/catch eingebaut wurde,
         welcher abhängig vom status das Mapping auf die Parameter in der socket-Message macht.
       - **[DONE]** Die finale Benutzernachricht nach erfolgreichem Import erfolgt dabei mit globalStore.showBenutzerAktion(),
         damit unter der Nachricht ein Refresh-Button angezeigt wird.
       - Ein Test-Import auf Heroku ist erfolgreich, im Server Log sind keine H12 oder H13 Fehler zu finden!
       - **[DONE]** Allerdings wird nach Completion des Imports nicht nur die Erfolgsmeldung für den Import angezeigt,
         sondern die Fehlermeldung für das Bewegen von Zweigen im Bauvorhabenbaum - die Ursache dafür ist der gemeinsame Listener
         zwischen baueinheiten.vue und daten-austausch.vue - beide hören auf den socket-Event "agendaTestJobComplete" und denselben Room,
         der per Id vom Server angesprochen wird. Dabei empfängt der Listener in daten-austausch.vue den status 201, der Listener
         in baueinheiten.vue ebenfalls - letzterer reagiert auf diesen unerwarteteten Statuscode in handleBewegeZweigMitAgendaJob() mit einer Fehlermeldung. mit Hier müssen verschiedene socket-Events verwendet werden! Auch innerhalb daten-austausch.vue müssen unterschiedliche Imports unterstützt werden,
         deshalb sind schon innerhalb einer Komponente künftig mehrere socket-Events zu unterscheiden und per socket.on("eventName")
         Listener zu registrieren in mounted():
         - Dort muss in agenda.on("complete:bewegeZweigBaueinheit") ein Event "bewegeZweigBaueinheitAgendaJobComplete" emitted werden
         - Dort muss in agenda.on("complete:importBaueigenschaften") ein Event "importBaueigenschaftenAgendaJobComplete" emitted werden
         - Entsprechend wurden diese Events am Client geändert, in baueinheiten.mounted() und daten-austausch.mounted()
       - ==**[WORK]**== Bei wiederholten raschen Imports mit falschem File Name (404) kann es vorkommen, dass der Client hängenbleibt.
         Nach Client Refresh und (manchmal) Server Restart funktioniert es dann wieder. Dies liegt vermutlich
         am Socket Handling, dass Socket Events "verschluckt" werden. Socket.once statt socket.on verwenden? Sockets "aufräumen"?
         Siehe nächste Bullets.
     - ==**Update 28.01.2022**==
       - In baueinheiten.vue mit $socket.timeout() und $socket.off() experimentiert
       - **[DONE]** Dabei das \$socket.on("bewegeZweigBaueinheitAgendaJobComplete") von mounted() verschoben nach bewegeZweigMitAgendaJob()
       - **[DONE]** Statt $socket.on $socket.once verwendet
       - ==**[DEFER]**== Dann könnte man wohl auf das $socket.off() im Normalfall (nicht bei Timeout!) in handleBewegeZweigMitAgendaJob() 
          verzichten! Einstweilen belassen, das $socket.off schadet offenbar nicht.
       - **[DONE]** Der Timeout funktioniert zwar, wenn er kürzer ist als der Server mit der Agenda Job Completion braucht, er wird aber,
         wenn er länger dauert als die Completion, trotz erfolgreicher Completion ausgelöst, was irritierend für den Benutzer ist! Daher
         den Timeout einstweilen wieder disabled. Dies im Code behandelt über einen Merker waitingForBewegeZweigBaueinheitAgendaJobComplete
         mit dem echte von unechten Timeouts unterschieden werden.
       - ==**[TODO]**== Der Socket-Code für importBaueigenschaftenMitAgendaJob() in daten-austausch.vue sollte analog umgestellt werden!
       - ==**[TODO]**== In baueinheiten.vue ist aktuell noch das alte Bewegen von Zweigen ohne Agenda aktiv. Für das Bewegen mit
         Agenda Job muss nur im Template an zwei Stellen in den Kontextmenüs für Kopieren/Verschieben der Aufruf von
         bewegeZweig() auf bewegeZweigMitAgendaJob() umgestellt werden, um es endgültig auch in Produktion auf Heroku auf Agenda Job
         umzustellen.
355. ==**[TODO]**== (Prio 3) Die Bauvorhaben unter 'Bauprojekte'-Knoten nach Projektnummer sortieren, ähnlich
     wie Geschosse nach Niveau sortiert werden.
356. ==**[WORK]**== (Prio 3) Container Item für die weiterführenden Arbeiten am "Durchstich":
     - **Bauvorhaben**
       - **[DONE]** **Bodenaufbau**
         - Profilformular bzgl. Visual Design überarbeiten (ähnlicher Look wie "Raum")
         - Baueigenschaften überarbeiten (siehe XLS "Baueigenschaften")
         - Dabei: Wärmeschutz - U-Wert und R-Wert aus Einzelschichten berechnen (siehe PPT "Conceptual Design")
         - Dabei: Nutzlasten überarbeiten
       - **[DONE]** **Schicht**
         - Profilformular bzgl. Visual Design überarbeiten (ähnlicher Look wie "Raum")
         - Baueigenschaften überarbeiten (siehe XLS "Baueigenschaften)
         - Dabei: Estricheigenschaften überarbeiten gemäß neuem Input von Erik (siehe E-Mails)
         - Geeignete Rubrik dafür anzeigen
     - ==**[WORK]**== **Baustoffe** (Design dafür in Epic 38.l)
       - **Überarbeitung von baustoffe.vue**
         - Angleichung an baueinheiten.vue
         - **[DONE]** Optimierter Refresh wie in baueinheiten.vue
         - **[DONE]** Kontextmenü-Funktionen für Profilaktivierung vorsehen
       - ==**[WORK]**== **Baueigenschaftsprofile für Baustoffe ("Baustoffprofile")**
         - Z.B. beginnend mit "Estrich" und "Beton"
         - Dabei bei "Estrich" korrespondierende Baustoff-Baueigenschaften definieren zur Baueinheit "Schicht" mit Schichttyp "Estrich" - siehe
           korrespondierende-baueigenschaften.js
         - Diese werden bei der "Hochzeit" (siehe unten) zur Suche/Filterung verwendet werden
       - ==**[WORK]**== **Semi-generisches Baueigenschaftsprofilformular für Baustoffe**
         - Als **eine** Komponente zur Anzeige/Eingabe aller Baustoffprofile/Baustoffeigenschaften
         - Dessen Unter-Tabs entsprechen bestimmten Baustoffprofilen ("Allgemeine Eigenschaften", "Estrich", "Beton", "Ökobilanz", ...)
         - Z.B. beginnend mit "Estrich" als erstem zu implementierendem Unter-Tab
         - "Datenblatt"-artige Anzeige/Eingabe von Werten für die Baustoffeigenschaften
         - **[DONE]** Als erste Stufe zunächst Enabling des bisherigen generischen Profilformulars für die Anzeige von
           Profilen und Baueigenschaften auch im Baustoffbaum (bisher nur im Bauvorhabenbaum) implementiert.
       - **[DONE]** Kontextmenü-Aktion für **"Baueigenschaftsprofil an Baustoff und allen Kind- und Kindeskindknoten (transitiv) aktivieren"**
         - Neue Funktion im Baustoffbaum für Baustoffprofile - aktiviert Baustoffprofil an einem Knoten und allen dessen Kind- und Kindeskindknoten im Zweig
         - Dabei eventuell Flag am betreffenden (obersten) Knoten im Zweig setzen:
           **"baueigenschaftsProfilIstAmKnotenTransitivAktiviert"**
           - Allerdings wird dieses Flag voraussichtlich nur noch zur Auswahl des Startpunkts bei der Suche nach passenden
             Baustoffen im Rahmen der "Hochzeit" benötigt - diese Startpunkte könnten alternativ aber auch über eine Admin-Funkion
             verwaltet werden oder zunächst hart kodiert sein über eine Config-Datei.
           - ==**Update 05.10.2021**==: Aktuell kann der Startpunkt des zu durchsuchenden Zweigs für eine Filterung im Baustoffbaum vom Benutzer ausgewählt werden,
             was für den Anfang auch eine passable Lösung ist. Daher hat dieses Flag höchstens Priorität 3!
         - Der Algorithmus sollte im Sinne der Effizienz z.B. zuerst alle Blattknoten im betreffenden Zweig suchen und das Profil dann
           an diesen aktivieren - dies aktiviert es automatisch auch im Elternpfad
           - Allerdings kann wegen der mindestens quadratischen Steigerung auf jeder Ebene im Baum die gesamte Anzahl der Blattknoten
             oft deutlich höher sein als die gesamte Anzahl der Verzweigungsknoten in den Elternpfaden dieser Blattknoten, so dass
             diese transitive Aktivierung dennoch performance-kritisch sein dürfte!
           - Dazu folgenden Algorithmus getestet:
             - https://stackoverflow.com/questions/47307575/mongodb-compute-a-value-before-using-it-as-connectfromfield-in-an-aggregate
             - Dieser \$graphLookup basiert lediglich auf dem von MPath maintainten parent-Feld!
           - Diesen ausprobiert in Compass auf lokaler Testdatenbank (unter "Aggregations" diese beiden Stages eingetragen:
             - $graphLookup: { from: 'BaueinheitenCollection', startWith: "$\_id", connectFromField: "\_id", connectToField: "parent",
               as: "dependents" } // Generiert rekursive Arrays dependents: [ ... ] an jedem Knoten im Zweig
             - \$match: { dependents: [] } // Liefert alle Knoten mit leeren dependents zurück (= Blattknoten)
           - Diese 2 Stages liefern am Ende tatsächlich die Blattknoten zurück!
           - Da in Compass jeweils nur 20 Knoten angezeigt werden als Resultatmenge aus jeder Stage, glaubt man es auf den ersten Blick nicht!
           - Wenn der Algorithmus darauf aufbauen könnte, dass das BIM.click-Flag für "Blattknoten" korrekt gesetzt ist, ist es einfacher!
             - Dazu müsste allerdings unser Code dieses stets korrekt setzen, sowohl per UI als auch beim Import!
           - **[DONE]** Obigen \$graphLookup implementiert in Methode baustoffe.controller.aktiviereBaueigenschaftsProfilTransitivImZweigAnBaustoff()
       - **[DONE]** Kontextmenü-Aktion für **Baustoff auwählen und selbe Profile wie am Elternknoten aktivieren**
       - ==**[WORK]**== Zusätzlich: Kontextmenü-Aktion für **Baustoff auswählen und bestimmtes Baueigenschaftsprofil daran aktivieren** für Baustoffprofile,
         analog zur entsprechenden Aktion im Bauvorhabenbaum)
       - Testbaustoffe anlegen mit befüllten Testeigenschaften (beginnend mit Estrichen)
     - **Zuordnung von Baustoffen zu Baueinheiten ("Hochzeit")**
       - Obiges semi-generisches Profilformular für Baustoffe als Komponente zusätzlich anzeigbar machen bei Anwahl eines Knotens im
         Baustoffbaum im Tab "Bauvorhaben" > "Zugeordnete Baustoffe" (einer Baueinheit)
         - **[DONE]** Dazu Splitter in die Baumdarstellung einbauen, wo im linken Teil der Baustoffbaum für die zugordeneten Baustoffe einer Baueinheit und im rechten Teil das
           Profilformular für einen links ausgewählten Baustoff angezeigt wird
         - Das bisherige generische Profilformular (für Baueinheiten und Baustoffe enabled) lädt seine Daten in mounted() aus dem jeweiligen Node im Baum (d.h. aus dem
           Speicher)
         - Die Anzeige dort muss nur read-only sein, d.h. ein Zurückspeichern von dort ist nicht erforderlich!
         - Die in das Unter-Tab für die zugeordneten Baustoffe einer Baueinheit einbettbare Variante dieses Formulars muss, da in diesem Unter-Tab
           nicht der vollständige Baustoffbaum, sondern
           nur ein Extrakt des Baums ohne die Baueigenschaften an den Knoten geladen wird (baustoffe.controller.readExtraktBaustoffe()),
           den ausgewählten Knoten vom Backend lesen, um dessen Felder anzeigen zu können. Da das Formular read-only ist, sind dabei auch
           die ansonsten in den Profilformulare verwendeten :disable-Funktionen unnötig (welche Vererbungsinformationen aus den Elternknoten
           benötigen - siehe unten). Auch submit- und reset-Funktionen sind unnötig, nur mounted() und watch() für die Props.
         - **[DONE]** Dafür ein neues Profilformular read-only-generisches-baueigenschafts-profil-formular.vue aus
           dem bisherigen generischen Profilformular implementiert. Dieses hat als Prop selectedKey und holt in mounted() und watch()
           mit diesem Key den Knoten vom Backend. Eine Prop zum Zugriff auf den vollen Baum ist nicht nötig.
         - ==**Achtung**==: Die bereits vorhandenem API/Controller-Methode readBaustoff()) ist nicht geeignet, auch noch die Daten für die
           :disable-Funktionen aller Felder in den bisherigen Profilformularen zu liefern - diese benötigen
           das Flag bezeichungVonWerteVererbendemElternKnoten für jede
           Baueigenschaft - dieses wird beim Laden (sowie beim Reset und in den Watches) des Formulars in der Funktion
           baueEigenschaftenVererbungsDatenstruktur() aus den Werten der Knoten im Elternpfad im Baum ermittelt (deren Feld path wird zum Traversal der Knoten im
           Elternpfad benutzt, per Zugriff auf den Baum, der der Komponente als Prop nodes übergeben wird). Daher werden beim Laden nicht
           nur der ausgewählte Node benötigt, sondern es werden auch die Nodes in dessen Elternpfad benötigt! Per MPath-Methode **getAncestors()** könnten
           diese jedoch per API an das Frontend geschickt werden als linearer Array, beginnend mit dem Wurzelknoten. Statt dem Traversal des Elternpfads in nodes
           (QTree) per Feld path müsste eine angepasste Funktion
           baueBaueigenschaftenVererbungsDatenstruktur() dann den Array der Ancestors verarbeiten zum Setzen dieses Flags am ausgewählten Node.
           Um statt dem normalen verschachtelten Nodes-Array diesen Array als Prop nodes verwenden zu können, müsste
           dann per Code noch das Feld parent an jedem Knoten hinzugefügt werden. Der ausgewählte Knoten ist dann allerdings nicht enthalten -
           dieser wird aber per Prop selectedNode separat übergeben und könnte mit readBaustoff() ermittelt werden.
           Eventuell könnten die in diesem Array enthaltenen
           Baueigenschaften auch dem ansonsten "reduzierten" Quasar QTree für die zugeordneten Baustoffe nachträglich hinzugefügt werden bei
           Auswahl eines Knotens im Baum. Dieser Baum ist jedoch durch Object.freeze()
           eventuell nicht veränderbar! Alternativ könnte man dieses Flag auch am Backend befüllen bzw. gleich am Backend das im Model dafür
           vorgesehene Flag **ererbtNichtGesetzt** befüllen, und stattdessen dann dieses in dann am Frontend in den :disable-Funktionen benutzen.
         - ==**[WORK]**== Dazu bereits testweise Aktualisierungen des Flags als **#258** in baueinheiten.controller.js und baustoffe.controller.js
           eingefügt - funktioniert
           aber noch nicht! Unter anderem muss der Wurzelknoten wohl besonders behandelt werden - dort muss das Flag stets false sein! Es ist
           außerdem noch zu prüfen,
           ob das Flag auch noch bei anderen Operationen, z.B. dem Bewegen von Zweigen aktualisiert werden muss! Der Default dafür in
           wertbezogene-baueigenschaften.model.js ist false.
       - ==**[WORK]**== Für neue, optionale Suche und Filterung von Baustoffen dort:
         - Suchfiltermaske entwerfen Z.B. beginnend mit Estricheigenschaften
         - Dort können Sollwerte für die Filterung eingetragen werden
         - Diese werden dann als Query Parameter an das API
           übergeben - die bei den Baustoffen jeweils korrespondierenden Baueigenchaften werden per Layout File für "Schicht" in der
           Rubrik "Estrich" (bei Schichttyp "Estrich") identifiziert
         - Diese Suchfiltermaske muss anwählbar sein bei Auswahl einer Schicht im Baum, z.B. indem der linke Teil (dort wird ohne Suche der ganze Baustoffbaum
           angezeigt) es oben schon erwähnten Tabs "Zugeordnete Baustoffe" aufgeteilt wird in zwei Unter-Tabs:
           - Manuelle Auswahl (dort manuelle Auswahl aus dem Baustoffbaum wie bisher)
           - Gefilterte Suche (dort die neue Suchfiltermaske anzeigen, die abhängig von der ausgewählten Schicht und deren Schichttyp
             geeignete Baueigenschaften für die Suche anbietet - in diesem Sinne wäre sie ein neues
             generisches Baueigenschaftsprofilformular "Baustoffsuche", dem der Knoten und das Profil "Baueinheit > Schicht" als Props zu übergeben wären)
         - Bei Schichttyp "Estrich" müssen die passenden Estricheigenschaften für die Filterung als Sollwerte angezeigt werden.
       - ==**[WORK]**== Die Baustoffe-Controller-Methode readFilteredBaustoffe() dafür erweitern und aufrufen mit diesen Query Parametern (es ist dabei noch
         zu entscheiden, ob nur
         nach Blattknoten oder auch nach Verzweigungsknoten gesucht werden kann - bei Verzweigungsknoten muss die Suche mit
         null-Werten umgehen können)
       - ==**[WORK]**== Ergebnisse der gefilterten Suche aus dem API am Frontend anzeigen (in Baumstruktur wie bei manueller Auswahl, irrelevante Knoten kommen nicht mit?)
       - ==**[WORK]**== Manuelle Auswahl von zugeordneten Baustoff(en) in den Filterergebnissen (Checkboxes wie bei manueller Auswahl?)
       - ==**[WORK]**== Anzeige von Baustoffeigenschaften für links ausgewählte Baustoffe per Formular im rechten Teil wie oben
       - ==**[WORK]**== Zuweisung von mitgebrachten Baustoffeigenschaftswerten an die Baueinheit (Schicht) per Button - ==die Funktion
         uebertrageWerteAusBaustoffAnAusgewaehlteBaueinheit() funktioniert bisher nur für das Baustoff-Profil "Baustoff > Estrich" und muss noch erweitert werden==
357. **[DONE]** (Prio 3) Der Parameter vorgabeWerteUeberschreibenVorhandeneWerte in baueinheiten.vue, baustoffe.vue und
     baueigenschafts-profile-tab-baustoffe-und-baueinheiten.vue wurde überall mit
     true an das Backend übergeben, statt den Wert aus
     this.localStore.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte zu entnehmen.
     Allerdings gab es noch einen zusätzlichen Fehler in einstellungen.vue: Die
     :val-Werte für die Radio-Buttons zum Togglen dieser Einstellung waren vertauscht - dies gefixt. Die Radio Buttons arbeiten reaktiv direkt
     auf localstore.state.einstellungenBenutzer.vorgabeWerteUeberschreibenVorhandeneWerte - beim Togglen der Radio Buttons wird der Wert reaktiv geändert.
     ==**Achtung**==: In baueinheit-raum-baueigenschafts-profil-formular.vue beim Wechsel eines Raumprofils den Parameter stets mit true nehmen,
     nicht die Benutzereinstellung, damit sich die Vorgabewerte aus dem neuen Raumprofil durchsetzen! ==**Achtung**==: Außerdem werden bei der Anlage der
     Baueigenschaften in "Allgemein > Test > Wertetypen" beim lokalen Serverstart Werte aus baueigenschaften.js für die dort enthaltenen Baueigenschaften (nur) am Wurzelknoten des
     Baustoffbaums definiert, die ggf. bei der Aktivierung dieser Baueigenschaften bzw. des Profils "Allgemein > Test > Wertetypen" an einem Kindknoten vom Wurzelnknoten nach unten
     weitervererbt werden. Diese sind nicht zu verwechseln mit
     den (meist gleichen) Vorgabewerten für dieselben Baueigenschaften im Profil "Allgemein > Test > Wertetypen", die in back-end-server-js definiert und als Vorgabewerte
     am Profil eingetragen werden. Diese können mit dem Flag vorgabeWerteUeberschreibenVorhandeneWerte mittels Profilaktivierung an Knoten in beiden Bäumen
     eingetragen werden
358. ==**[WORK]**== (Prio 2) Im Bodenaufbau funktioniert der optimierte Refresh nach dem Hinzufügen einer Schicht (ab der 2. Schicht per Button)
     nicht korrekt. Der Array alleSchichten enthält dabei noch die
     Schichten vor der Hinzufügung. Workaround durch Ersetzen des optimierten Refreshs durch den nicht optimierten in handleCreateSchicht() in
     baueinheiten.vue. ==Optimierte Variante muss von Stefan noch gefixt werden.==

     - ==**Update 08.01.2022:**==
       - Es gibt weiterhin einen Fehler beim **Hinzufügen einer Schicht** im Bodenaufbau - sie erscheint weder im Schichteditor noch als Knoten im Baum
       - Nach manuellem Browser Refresh wurde die Schicht aber scheinbar korrekt hinzugefügt
       - Das Backend Log zeigt einen Fehler in baueinheiten.controller.readBaueinheitenById(): "TypeError: Cannot read property 'baueigenschaften' of null" - siehe
         Kommentare dort
       - Als Workaround dafür in baueinheiten.handleCreateSchicht(): Wie oben schon erwähnt den nicht optimierten Refresh aufrufen statt den optimierten
       - Damit funktioniert es vom Ergebnis her
       - Beim **Löschen einer Schicht** tritt allerdings derselbe Fehler auf!
       - Am Ende 2 Workarounds in baueinheiten.vue eingebaut, wo der nicht optimierte Refresh aufgerufen wird, markiert mit #358:
         - In handleCreateSchicht(): "reloadTreeWrapper('Nicht optimiert')" - dis ist für das Hinzufügen von Schichten notwendig als Workaround!
         - Beim Aufruf von bodenaufbau-baueigenschafts.profil-formular.vue in baueinheiten.vue: @refresh-request-baueigenschafts-profil="reloadTreeWrapper('Nicht optimiert')" - die
           ist für das Löschen von Schichten notwendig als Workaround!
       - Mit diesen 2 Workarounds funktionieren dann Einfügen und Löschen von Schichten ohne Fehler am Frontend und ohne Fehler im Backend Log
       - ==Es werden aber während des nicht optimierten Refreshs zeitweise rechts im Schichteditor alle Schichten doppelt angezeigt, was irritierend ist!==
         - Dies wird von push-Code in handleCreateSchicht() ausgelöst (markiert), der benötigt wird im Fall des optimierten Refreshs (unabhängiges
           Problem)
       - Das Problem beim Einfügen mit optimiertem Refresh eigentlich gefixt durch
         Eingriffe in baueinheiten.handleCreateSchicht() und baueinheiten.controller.
         createSchichtaufbauEinzelneSchicht() (gekennzeichent mit #358). Aber: Es passiert dann die obige lästige "temporäre Duplikation" der Schichten im Editor während des
         Refreshs. Im nicht optimierten Fall kann diese verhindert werden durch Disabling des push-codes in handleCreateSchicht().
         Daher doch den Workaround (= nicht optimierter Refresh in handleCreateSchicht(): "reloadTreeWrapper('Nicht optimiert')") plus den Eingriff in den push-Code von handleCreateSchicht() enabled.
       - Den optimierten Fall beim Löschen einstweilen ebenfalls nicht gefixt! Der optimierte Refresh ist noch nicht auf Löschen vorbereitet.
         Deshalb dort auch den Workaround enabled (= nicht optimierter Refresh beim Aufruf von bodenaufbau-baueigenschafts.profil-formular.vue in baueinheiten.vue).
       - **[DONE]** Es gibt außerdem noch einen weiteren Fehler im Browser Log, der ohne weitere Folgen zu sein scheint:
         "Error in callback for watcher "selectedSchicht": "TypeError: Cannot read properties of null (reading '\_id')" nach dem Löschen einer Schicht - gefixt
         in baueinheit-bodenaufbau-baueigenschafts-profil-formular.selectedSchicht() - null-Abfrage hinzugefügt.

359. ==**[WORK]**== (Prio 2) - Auf Heroku gibt es einen "Javascript heap out of memory" Error beim Filtern in Baustoffen in dem dort großen Baustoffbaum.
     Siehe https://stackoverflow.com/questions/59205530/heroku-server-crashes-with-javascript-heap-out-of-memory-when-deploying-react
     Dort empfohlen für free Dynos: In package.json für Backend Server statt "start": node back-end-server.js" (alt) "start": "node --optimize_for_size --max_old_space_size=460
     back-end-server.js" (neu) - dies zuerst probiert. Es kommt dann aber zunächst ein Heroku H13 Fehler, und dann derselbe "JS heap out of memory".
     Stattdessen in package.json "start": "node --optimize_for_size --max_old_space_size=2560 back-end-server.js" (neu): Dann
     kommt bei Suche im gesamten Baustoffbaum auf Heroku zwar kein "Javascript heap out of memory" Error mehr, aber dafür Heroku "Error R14 (Memory quote exceeded) -
     Process running mem=861M(168.3%)" und danach
     "Error R15 (Memory quota vastly exceeded) - Process running mem=1123M(219.5%)". D.h. auf Heroku müssten wir Server mit mehr Memory mieten!
     Der "Standard 2X" Dyno hat 1 GB und kostet 50 USD/Monat. Der "Performance M" Dyno hat 2.5 GB, kostet aber 250 USD/Monat!
     Als Workaround die Suche an tieferem Wurzelknoten probiert mit temporärem Hack auf Heroku in baustoffe.controller.readFilteredExtraktBaustoffe(): Nur
     im Zweig "Estriche" filtern - damit dann kein Out of Memory! Das Problem wurde weiter reduziert durch die neue Möglichkeit, beim
     Filtern im Baustoffbaum in filterGenerischesBaueigenschaftsProfilFormular.filtereBaustoffe() einen tieferen Startknoten im Baustoffbaum
     auswählen zu können - wenn dort Knoten auf der zweiten oder dritten Ebene auf Heroku ausgewählt werden, funktioniert das Filtern ohne out of Memory
     auf Heroku!
360. **[DONE]** (Prio 3) Fehler in Disabling von Eingabefelder in Abhängigkeit vom Schichttyp in baueinheit-schicht-baueigenschafts-profil-formular.vue.
     In disableFelderInAbhaengigkeitVonAufzaehlungswertSchichttypImBodenaufbau() werden die :disable-Boolean-Werte in das Layout File eingetragen statt in das Profil-Model, dadurch werden sie überschrieben,
     wenn in einer anderen Schicht der Schichttyp anders gesetzt wird, bzw. wenn schon in mounted() Schichttypen, die null sind nach anderen
     Schichttypen durchlaufen werden. Potentielle Vorlage für Fix: baueinheit-standort-baueigenschafts-profil-formular.vue,
     Funktionen disableFelderInAbhaengigkeitVon...() - stimmt aber so nicht, verwendet auch die disable-Felder im Layout File!. Lösung von Stefan:
     Das herkömmliche Layout File für "Schicht" umgewandelt in Factory-Funktion, die einen individuellen Array mit dem Layout für jede Schicht erzeugt.
     - ==**Hinweis**==: In baustoffe.vue gab es im Zuge der Einfügung von ermittleDefinierheitKindKnoten() ein ähnliches Problem, wo ebenfalls
       eine Property bgColor zunächst im Layout eingeführt wurde. Dort wurde als alternative Lösung diese Property im Layout wieder entfernt und stattdessen die
       Property per Vue \$set() transient in das Profil Model
       eingefügt - allerdings ist diese Lösung nur möglich, wenn die Property nicht permanent benötigt wird, was dort der Fall war.
361. **[DONE]** (Prio 2) Neues Profil "Baueinheit > Schicht" angelegt mit 25 Baueigenschaften, die dem vereinbarten Bezeichnungsschema gehorchen ("Baueinheit > Schicht > ...").
     Das Baueigenschaftsprofilformular und Layout File für "Schicht" darauf angepasst, dito das Formular für den Bodenaufbau, dass einige
     der Baueigenschaften aus "Schicht" für Berechnungen benutzt. Die neuen Baueigenschaften importiert nach Heroku. Dort zunächst das bisherige
     Profil "Baueinheit > Schicht" umbenannt nach "Schicht (alt)". Dann ein neues Profil "Baueinheit > Schicht" angelegt und diesem die 25 Baueigenschaften zugeordnet.
     Dies mit dem generischen Formular überprüft. Dann den neuen Codestand nach Heroku deployed. Die Formulare funktionieren sofort, allerdings sind
     die Felder alle disabled. ==Um sie zu enablen, muss man das neue Profil "Baueinheit > Schicht" an jedem Schicht-Knoten auf Heroku aktivieren.== Vorher das alte
     Profil "Schicht (alt)" ordnungshalber deaktiviert an diesen Knoten. Die 13 alten Schicht-Baueigenschaften "Schicht: ..." vorläufig belassen
     auf Heroku, dito das alte Profil "Schicht (alt)".
362. **[DONE]** (Prio 3) Überarbeitung des Wärmeschutzes im Bodenaufbau mit Berechnung des U-Werts nach Formel aus Einzelschichten.
363. **[DONE]** (Prio 3) Die nicht mehr benötigten Baueigenschaften "Schicht: ..." und "Bauvorhaben: ..." können sowohl in baueigenschaften.js
     und auf Heroku gelöscht werden. Die Profile dafür werden bereits nicht mehr erzeugt in back-end-server-js und wurden auf Heroku bereits gelöscht.
364. ==**[TODO]**== (Prio 3) Im Bodenaufbau: Die Zuordnung einer Schicht zu einem Schichtpaket wird neuerdings nicht mehr statisch aus dem Schichttyp
     bestimmt, sondern kann vom Benutzer in einem neuen Aufzählungswert gesetzt werden: "Baueinheit > Schicht > Zuordnung > Schichtpaket"
     Die 3 Arrays elementeBodenoberseite, elementeRohboden und elementeBodenunterseite müssen daher nicht mehr aus dem Schichttyp statisch gesetzt werden, sondern es müssen jeweils die Schichten in den passenden Array gepushed werden,
     deren Aufzählungswert für das Schichtpaket den Wert "Bodenunterseite", "Rohboden" bzw."Bodenoberseite" hat
365. **[DONE]** (Prio 3) Im Bodenaufbau: Felder auf readonly und hellblaue Farbe setzen, wenn vom Elternknoten geerbt (vermutlich nur bei Sollwerten).
     Berechnte Istwert werden bereits auf readonly und hellgrüne Farbe gesetzt.
366. **[DONE]** (Prio 3) Profilformular für "Schicht":
     - **[DONE]** Layout wie Bodenaufbau (d.h. Anzeige von Soll-/Istwerten statt Wertepaaren in den Spalten für die Eingabefelder).  
       Steuerung über Layout File analog zum
       Profilformular für "Bodenaufbau" - damit kann dann auch die Reihenfolge der angezeigten Baueigenschaften beeinflusst werden.
     - **[DONE]** (Prio 3) Parameter readOnlyModus: false - damit sollte das Formular, wenn als Einzelformular an Schichtknoten
       angezeigt, alle Eingabefelder auf readonly schalten.
       Heute können dort, bwohl kein Speichern-Button vorhanden ist, Werte in die Felder eingegeben werden, was verwirren kann.
     - **[DONE]** (Prio 3) Die computed-Funktionen im Bodenaufbau und Schicht müssen per \$set (Side Effect) das Profil-Model
       updaten, sonst werden die berechneten Werte nicht in der Datenbank gespeichert. Sie werden beim Refresh jeweils neu
       berechnet, so dass dies nicht sofort auffällt. Die Werte zu speichern ist aber z.B. notwendig für die Ausgabe von Reports.
367. ==**[WORK]**== (Prio 2) Weitere **Baueigenschaftsprofile für Baustoffe**:
     - Allgemeine Materialeigenschaften: Dazu zählen Rohdichten und andere Eigenschaften. Erik arbeitet an der Definition dieser Eigenschaften per Excel-Sheet.
       Dabei wird auch das Feld "Gütebewertung" verwendet (für Nennwerte - entspricht "gelb", offizielle Bemessungswerte - entspricht "grün").
     - Maßangaben: Länge, Breite, Höhe, Dicke, ...: Achtung: Dazu sind jeweils passende Einheiten (mm, cm, m etc.) erforderlich. Entweder
       legt man dafür unterschiedliche Baueigenschaften an, oder man speichert die Maßeinheit als Bezeichnungswert beim Kennwert.
     - Ökobilanz: Separates Profil?
     - Herstellerangaben: Herstellerbezeichnung, Herstelleradresse, etc. (neues Profil "Baustoff > Handel")
     - Produktbezogene Angaben: Bestellnummer, EAN-Code, etc. (neues Profil "Baustoff > Handel")
     - Eventuell textuelle Angaben (Bezeichnungswerte): Allgemeine Hinweise, Besondere Hinweise, Verarbeitungshinweise, Nachbehandlungshinweise,
       Lagerungshinweise, Entsorgungshinweise, Verbrauchshinweise, Anwendungshinweise, Verpackungshinweise, Qualitätshinweise, Produkteigenschaften, etc.
       Alternativ kann auch das Markdown-Feld "Baustoffbeschreibung" dafür benutzt werden, sowie ein Datenblatt als Bauinformation zugeordnet werden,
       statt solche langen textuellen Informationen als Attribute in BIM.click zu übernehmen.
368. **[DONE]** Fehler auf Heroku bei der Anzeige aller Bauinformationen - die Tabelle bleibt leer, obwohl die Daten korrekt vom
     Backend kommen. Zum Debugging das Console Log
     auf Heroku temporär eingeschaltet in quasar.conf.js. Fehler "Cannot read properties of null" in includes-Array-Funktion in bauinformationen.vue,
     benutzerDarfLoeschenPerKontextmenueSelektierteBauinformationInTableBauinformationen(). Tritt nur mit Benutzerrolle "Mitarbeiter"
     auf bei Zugriff auf den Array benutzerKennungenAutoren. Deshalb dort null-Prüfung eingebaut. ==**Achtung**==: Es gibt
     noch andere Zugriffe in bauinformationen.vue auf benutzerKennungenAutoren, wo ebenfalls keine null-Prüfung erfolgt. Muss weiter beobachtet werden.
369. ==**[WORK]**== (Prio 3) - Bei kleinen Bildschirmen (z.B. PWA auf Smartphone, aber auch im Browser bei
     Verkleinerung des Windows reproduzierbar) funktioniert das Scrollen in der
     Online-Doku aus dem Doku-Inhaltsverzeichnis im linken Drawer nicht - der Offset für das Scrollen in dokumentation.vue
     wird in scrollToElement() vermutlich größenordnungsmäßig (siehe Console Log) richtig berechnet, aber
     es erfolgt gar kein Scrollen. Dies könnte damit zusammenhängen, dass sich der Drawer für das Inhaltsverzeichnis
     bei schmalem Bildschirm (sogar schon bevor !\$q.screen.gt.xs erkannt wird) selbstständig in eine Art Overlay-Mode begibt, der rechte Teil des Fensters mit dem Doku-Inhalt wird
     dann ausgegraut, d.h. das Fenster ist nicht im Fokus. Dieses Verhalten bleibt auch, wenn man an diesem q-drawer :overlay="false" als Prop setzt.
     Lösung am q-drawer für das Doku-Inhaltsverzeichnis in my-layout.vue durch zusätzliches :breakpoint="500", siehe Kommentare dort. Leider
     funktioniert diese per Test nur beim Klein-Zoomen am Browser (ist insofern eine Verbesserung), nicht jedoch in der App auf dem Smartphone!
370. **[DONE]** (Prio 3) Im PWA-Modus wird auf Apple Devices nicht das BIM.click Icon angezeigt für die App, sondern erwatzweise das Icon
     von Quasar. Dafür sind spezielle Apple Icons notwendig. Diese können mit Icon Genie erzeugt werden: https://quasar.dev/icongenie/introduction.
     Die damit erzeugten Icons müssen in /src/index.template.html referenziert werden: https://quasar.dev/quasar-cli/developing-pwa/app-icons-pwa#manual-instructions.
     - Icon Genie Installation:
       - Siehe https://quasar.dev/icongenie/installation
       - Command: bim-click-front-end> npm install -g @quasar/icongenie
     - PWA Icons Erzeugung mit Icon Genie:
       - Siehe https://quasar.dev/quasar-cli/developing-pwa/app-icons-pwa
       - Commmand: bim-click-front-end> icongenie generate -m pwa -i src\statics\icons\bim-click-lego-icon-512x512.png
       - Dies erzeugt 28 Dateien mit Icons im Ordner bim-click-front-end/public
       - Diese anschließend kopiert nach bim-click-front-end/src/statics/icons
       - Die noch nicht vorhandenen mussten anschließend manuell als <link>s in die Datei index.template.html eingefügt werden
       - Dabei musst der Pfad korrigiert werden von (public/)icons/ nach (src/)statics/icons
       - ==**Achtung**==: In diesem Ordner statics/icons sind noch andere von BIM.click benutzte Icons, z.B. die Icons für die Schichtnummern!!!
       ```html
       <link
         rel="icon"
         type="image/png"
         sizes="128x128"
         href="icons/favicon-128x128.png"
       />
       <link
         rel="icon"
         type="image/png"
         sizes="96x96"
         href="icons/favicon-96x96.png"
       />
       <link
         rel="icon"
         type="image/png"
         sizes="32x32"
         href="icons/favicon-32x32.png"
       />
       <link
         rel="icon"
         type="image/png"
         sizes="16x16"
         href="icons/favicon-16x16.png"
       />
       <link rel="icon" type="image/ico" href="favicon.ico" />
       <!-- iPhone 12 Pro Max -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)"
         href="icons/apple-launch-1284x2778.png"
       />
       <!-- iPhone 12, 12 Pro -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)"
         href="icons/apple-launch-1170x2532.png"
       />
       <!-- iPhone XR, 11 -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
         href="icons/apple-launch-828x1792.png"
       />
       <!-- iPhone X, XS, 12 mini, 11 Pro -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
         href="icons/apple-launch-1125x2436.png"
       />
       <!-- iPhone XS Max, 11 Pro Max -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
         href="icons/apple-launch-1242x2688.png"
       />
       <!-- iPhone 8, 7, 6s, 6 -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
         href="icons/apple-launch-750x1334.png"
       />
       <!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
         href="icons/apple-launch-1242x2208.png"
       />
       <!-- iPad 10.2" -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2)"
         href="icons/apple-launch-1620x2160.png"
       />
       <!-- iPad Mini, Air, 9.7" -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
         href="icons/apple-launch-1536x2048.png"
       />
       <!-- iPad Pro 10.5" -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
         href="icons/apple-launch-1668x2224.png"
       />
       <!-- iPad Pro 11" -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
         href="icons/apple-launch-1668x2388.png"
       />
       <!-- iPad Pro 12.9" -->
       <link
         rel="apple-touch-startup-image"
         media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
         href="icons/apple-launch-2048x2732.png"
       />
       ```
371. **[DONE]** (Prio 3) Beim Löschen einer Baueinheit mit aktiviertem Profil (z.B. "Baueinheit > Bauvorhaben") schlägt das Löschen fehl. Im Server Log
     gibt es einen Fehler "Cannot read property 'find' of undefined" in Zeile 995 in baueigenschafts-profile-aktivierungslogik.js.
     Die Ursache ist ein fehlender Parameter mit dem Model (hier "BaueinheitenModel") in baueinheiten.controller.deleteKnotenUndKindKnotenBaueinheit
     (), Zeile 8366 - dort eingefügt als Fix. Dieser Aufruf ist Teil der neu eingeführten Logik, die beim Löschen eines Knotens prüft,
     ob es neben diesem Knoten noch andere Geschwisterknoten gibt, an denen das aktuell iterierte Profil aktiviert ist, und, falls nein,
     das Profil auch am Elternknoten deaktiviert (#339). Diese Deaktivierung, d.h. #339 wird in baustoffe.controller.js noch nicht durchgeführt, daher
     ist dort bisher nichts zu fixen. ==Allerdings ist #339 noch in baustoffe.controller.js nachzuziehen!==
372. ==**[WORK]**== (Prio 2) Epic 38.o (layoutgesteuertes generisches Profilformular) implementiert. Funktioniert - erste Layouts für die Profile "Allgemein > Test > Wertetypen",
     "Baustoff > Estrich" und "Baueinheit > Gebäude" werden unterstützt - weitere sind im Rahmen der Anlage von neuen Baustoffprofilen geplant. Diverse
     Erweiterungen bereits eingebaut - siehe Epic 38.o.
373. **[DONE]** (Prio 2) Epic 38.n (selektive Anlage von Baueigenschaften nur im Bauvorhabenbaum bzw. Baustoffbaum) implementiert.
374. **[DONE]** (Prio 3) Das baustoffspezifische Profi "Estrich" nach der neuen Nomenklatur umbenannt nach "Baustoff > Estrich", im Code und auf Heroku.
375. **[DONE]** (Prio 3) **Umbenennung der Baueigenschaftsprofile** nach neuestem Bezeichnungsschema - Präfix "Baueinheit > " vor "Bauvorhaben", "Standort", "Gebäude", "Geschoss", "Raum", "Bodenaufbau", "Schicht", Präfix "Allgemein > " für bisheriges "Testprofil 1" (neu: "Allgemein > Test > Wertetypen")
     Mit Deployment der Codeänderungen die jeweils betroffenen Profile auch auf Heroku umbenannt.
376. **[DONE]** (Prio 3) **Umbenennung aller Baueigenschaften im Bauvorhabenbaum** nach neuestem Bezeichnungsschema
     - Durchgeführt für alle Baueigenschaften für "Bauvorhaben", "Standort", "Gebäude", "Geschoss", "Raum", "Bodenaufbau",
       "Schicht" - diese haben nun ein Präfix "Baueinheit > " vor der bisherigen Bezeichnung
     - 2 Baueigenschaften gehören bisher zu keinem Baueinheitsprofil:
       - "Baueinheit > Fundament > Gründungsart"
       - "Baueinheit > Wand > Erdberührt > Erddruckaufnahme"
     - 17 Testbaueigenschaften heißen jetzt "Allgemein > Test > Wertetypen > ..." - diese sind in beiden Bäumen angelegt
       - ==**Achtung**==:
         - 3 von diesen haben auf Heroku Vorgabewerte aus dem Profil "Allgemein > Test > Wertetypen
         - Lokal haben praktisch alle diese Baueigenschaften Vorgabewerte - diese werden in back-end-server.js beim Server
           Start in das Profil eingetragen
377. **[DONE]** (Prio 3) Beim transitiven Aktivieren von Profilen im Baustoffbaum auf Heroku gibt es einen MongoDB Fehler im BIM.click Server Log::
     - Out of Memory Error:
     - err.name: MongoError
       . err.message: \$graphLookup reached maximum memory consumption
     - MongoError: \$graphLookup reached maximum memory consumption
     - Das Problem kann umgangen werden, wenn man nur in bestimmten Unterzweigen diese transitive Aktivierung durchführt
     - In baustoffe.controller.aktiviereBaueigenschaftsProfilTransitivImZweigAnBaustoff() muss überprüft werden, ob man die Memory Consumption von \$graphLookup reduzieren kann
     - Lösung: Die Aggregation Stage Logik dort mit Stefan geändert, $match vor $graphLookup, um die Anzahl der bearbeiteten Knoten zu reduzieren
     - Bei einem Test trat dieses Memory Problem dann nicht mehr auf
     - ==Achtung: Stattdessen trat leider der bereits vom Bewegen von Zweigen bekannte **Heroku H12 Request Timeout Error** am Backend, mit dadurch ausgelöstem Network Error am Frontend auf - der Axios Request Handler am Frontend erkennt ihn immerhin! (siehe #354, offen)==
378. **[DONE]** (Prio 3): Verbesserungen für die PWA auf Mobilgeräten: In quasar.conf orientation von "portrait" nach "any" geändert (erlaubt bei Drehung des Mobilgeräts Drehung der app, wenn es für die App im Betriebssystem aktiviert ist), in allen QTables nur auf großen Bildschirmen die erste Spalte beim Scrollen fixiert (CSS class .sticky...), da sonst
     das horizontale Scrollen auf Mobilgeräten in den QTables nicht funktioniert.
379. ==**[WORK]**== (Prio 3) **Erweiterung der fachlichen Hilfe an Feldern für Baueigenschaften in Baueigenschaftsprofilformularen um Buttons zur Anzeige interner und externer Links** für eine der Baueigenschaft ggf. zugeordnete Bauinformation:

- Es sollte zusätzlich ein interner und externer Link für eine der Baueigenschaft ggf. zugeordnete Bauinformation anzeigbar sein in der fachlichen Hilfe zu einer Baueigenschaft
- Dazu muss im profilModelAusgewaehlterKnoten[baueigenschaft.indexInProfilModelAusgewaehlterKnoten].typbezogeneBaueigenschaft das Unterfeld
  bauinformation populiert sein - dieses hat Props internerLink und externerLink:
  - In baueinheiten.controller.readBaueinheit() wird das Feld bauinformation bereits populiert!
  - Auch im ausgewählten Knoten im Bauvorhabenbaum ist per Debug-Info dieses Unterfeld bauinformation entsprechend bereits vorhanden und populiert, allerdings nur, wenn
    der Baueigenschaft auch eine Bauinformation zugeordnet ist! (z.B. bei Baueigenschaft "Allgemein > Test > Wertetypen > Bauinformationstest 1")
  - Es wird dann in layout-gesteuertes-generisches-baueigenschafts-profil-formular.mounted() auch nach profilModelAusgewaehlterKnoten übertragen
- D.h., wenn das Unterfeld typbezogeneBaueigenschaft.bauinformation dort nicht undefined ist und interner und externer Link dort nicht undefined sind, können diese beiden Link-Parameter direkt aus dem Profil Model entnommen werden ohne weiteren Backend Call
- Die Funktion setzeFelderFuerFachlicheHilfe(), die als @focus-Methode an jedem Feld aufgerufen wird, erfordert dann zwei zusätzliche Parameter, die ggf. diese Link-Informationen zu der der Baueigenschaft zugeordneten Bauinformation an die fachliche Hilfe weiterreichen
- Deren Werte müssen dann in der Funktion per globalStore.set-Methoden in Variablen im global Store zwischengespeichert werden
- Anschließend muss die Funktion my-layout.showFachlicheHilfe() wie bisher aufgerufen werden
- Im Template für die fachliche Hilfe in my-layout.vue müssen Buttons eingebaut werden zur Anzeige dieser Links zur zugeordneten Bauinformation - Vorlagen dafür:
  - Button: q-btn "Dokumentation öffnen" in Bedienungshilfe dort
  - Vorhandener Button, um z.B. internen Link zu öffnen: baueinheiten.openSelectedInternerLinkTableBauinformationen() - lädt die mit dem internen Link
    verknüpfte Datei in den Download-Ordner und zeigt diese dann in einem separaten Browser-Window an - diese musste angepasst werden mit der
    id der zu herunterzuladenden Datei für den internen Link der Bauinformation als Parameter
- ==**Update 27.01.2022**==
  - Vorläufig implementiert in my-layout.vue, global-store.js und layout-gesteuertes-baueigenschafts-profil-formular.vue
  - Die Daten für eine zugeordnete Bauinformation für eine Baueigenschaft an einem Baustoff werden provisorisch auch übertragen in die fachliche Hilfe, Rubrik "Bauinformation"
  - Dort Anzeige des Anzeigetextes und Buttons mit internem und externem Link zur Bauinformation
  - Dies musste noch verallgemeinert werden, dass es auch für Bauinformationen für Baueigenschaften an Baueinheiten funktioniert
  - Entweder müssen in global-store.js alle Felder für die fachliche Hilfe für Bauinformationen auf gemeinsame Felder across Baustoffe, Baueinheiten, Bauinformationen zusammengeführt werden - dies würde aber die vorhanden Struktur der fachlichen Hilfe ignorieren
  - Oder es muss in der fachlichen Hilfe für die Bauinformation in my-layout.vue eine Steuerung eingebaut werden, welche davon aktuell angezeigt werden sollen
    (z.B. abhängig davon, welche Page aktuell angezeigt wird, z.B. mit this.\$route.name === "Bauvorhaben" - dies testweise eingebaut
  - Am Besten sollten die Daten zu der der Baueigenschaft zugeordneten Bauinformation in der fachlichen Hilfe jeweils
    separat angezeigt werden, unter "Baueigenschaft an Baueinheit" bzw. "Baueigenschaft an Baustoff" - dies ist am
    sinnvollsten, da es die vorhandenen Strukturen nutzt, daher so umgesetzt

380. **[DONE]** (Prio 3) Die Baueigenschaft "Baustoff > Estrich > Bauart" sollte aus den Baueigenschaften, dem Baustoffprofil "Baustoff > Estrich",
     aus den Filterfeldern in filter-generisches-baueigenschafts-profil.vue und aus korrespondierende-baueigenschaften.js
     entfernt werden. Sie ist nur eine Baueigenschaft an einer Baueinheit "Schicht" mit Schichttyp "Estrich", "Baueinheit > Schicht > Estrich > Einbauart", nicht an Estrich-Baustoffen mit Profil "Baustoff (> Schicht) > Estrich". Auch auf Heroku gelöscht.
381. **[DONE]** (Prio 3) An allen Baustoffen ein neues Feld baustoffAusgabeText vom Typ string hinzufügen für spätere Report-Ausgabe von Knoten im
     Baustoffbaum.

- Dieses ist zunächst ein normales Textfeld - könnte später auch mit Markdown befüllt und gerendert werden
- Auf Heroku hinzugefügt mit MongoDB Shell > db.BaustoffeCollection.updateMany( { }, { \$set: { baustoffAusgabeText: null }} )
- In baustoffe.model, baustoffe.controller und baustoffe.vue hinzugefügt

382. ==**[WORK]**== (Prio 2) **BIM.click/OneDrive-Integration** mittlerweile vollständig integriert in BIM.click-Bauinformationen.
     Auswahl/Upload/Download von OneDrive-Dateien wurde getestet mit OneDrive-Konto von MS. Noch zu tun:
     - **[DONE]** Die bisherigen internen Links an Bauinformationen (intern und Cloud) bereinigt nach "interner BIM.click-Link" und
       "Interner BIM.click-Link (Test)" mit entsprechendem Tooltip
     - **[DONE]** Fehler beim Speichern einer ausgewählten Bauinformation mit auf null gelöschtem Feld für OneDrive-Link - dieses öffnet
       dann den alten Link, wenn "OneDrive-Link öffnen" ausgewählt wird in der QTable, nach dem Submit
       - Dies könnte auch daran liegen, dass computeOneDriveLinkTableBauinformationen für diesen OneDrive-Link in der QTable falsch ist - diese
         ist aber obeflächlich gesehen richtig.
       - Daher eher Fehler in submitAusgewaehlteBauinformationAusQForm(): Das Feld oneDriveLink wird beim submit vermeintlich als null
         mitgegeben, kommt aber beim anschließenden get aller Bauinformationen als leerer String "" zurück (siehe Debug-Ausgabe der
         ausgewählten Bauinformation). Leere Strings werden aber von obiger compute-Funktion als valider Link behandelt, daher
         ist auch der Button nicht disabled! Diese Funktionen alle erweitert, dass sie den ""-Fall gleich wie den null-Fall behandeln.
       - Der Fehler besteht jedoch weiter - er tritt auch an den Feldern internerLink und externerLink auf! Erst nach einem Refresh
         werden die Buttons zur Anzeige dieser Link-Felder dann disabled, vorher nicht.
       - Ursache: Nicht reaktiver Upate von selectedRowsTableBauinformationen[0] - durch Array-push-Operation ersetzt in obiger
         submit-Funktion - das fixt das Problem.
     - **[DONE]** Die Kontextmenüs in der QTable für die Bauinformationen wurden abhängig davon, welche Spalten per QToggles oben ausgewählt
       werden, teilweise gar nicht mehr eingeblendet. Beobachtung: Bei Abwahl von "Typ" verschwinden die Kontextmenüs! Temporäre Lösung
       in bauinformationen.vue eingebaut (verwendet für die Kontextmenüs jetzt die Spalte bauinformationsBezeichnung statt bauinformationsTyp).
       Diesen Fix auch in die QTables für die zugeordneten Bauinformationen in baueinheiten.vue und baustoffe.vue eingebaut.
     - ==**[TODO]**== Allerdings gehören alle QTables für die Bauinformationen bzgl. ihrer VSlots überarbeitet, nach der Vorlage z.B. in
       uebersicht-tab-baueigenchaften.vue.
     - ==**[TODO]**== Das Feld idInternerLink wird, wenn internerLink gelöscht wird, nicht korrekt auf null gesetzt, wie man in der
       Debug-Ausgabe sieht. Dies hat aber keine erkennbaren Auswirkungen. Dieses Feld idInternerLink könnte jedoch auch positiv
       beim Cleanup benutzt werden.
     - ==**[TODO]**== Für nicht mehr verwendete, d.h. manuell gelöschte interne Links muss noch ein Cleanup eingebaut werden, der
       deren hochgeladene Dateien aus der DateienCollection entfernt. Dazu kann z.B. beim Server-Startüberprüft werden, ob eine Datei
       in der DateienCollection auch eine Entsprechung im Feld internerLink in der BauinformationenCollection hat, und diese,
       falls nein, gelöscht werden. Das obige Feld idInternerLink könnte auch bei diesem Cleanup benutzt werden. Alternativ könnte man beim "Auswipen" von internen
       Links durch den Benutzer am Frontend auch gleich das Löschen der entsprechenden Datei triggern.
     - ==**[TODO]**== Tests mit anderen OneDrive-Konten:
       - Reichen die bisherigen Berechtigungen für die App BIM.click im Azure Portal dafür aus?
       - Ein OneDrive-Link, der testweise mit Eriks privatem OneDrive-Konto erzeugt wurde, war anschließend aus Michaels BIM.click nicht
         anzeigbar - es müssen als shareable Links erzeugt werden durch entsprechend OneDrive Konfiguration
       - Siehe Kommentare in bauinformationen.vue zum OneDrive File Picker bezüglich des Setups von Azure.
       - Die Options für den File Picker sind aktuell: multiSelect: false, accountSwitchEnabled: true - dies ist zu überprüfen!
383. **[DONE]** (Prio 3) Erweiterte Typen von Bauinformationen, speziell **Baustoff-Datenblätter**:
     - Technisches Datenblatt (neu eingefügt)
     - Sicherheitsdatenblatt (schon vorhanden)
     - Leistungs- und Konformitätserklärung (getrennt schon vorhanden)
     - EPD (Environmental Product Declaration, Umwelt-Produktdeklaration, neu eingefügt)
     - Nachhaltigkeitszertifikat (schon vorhanden)
384. ==**[TODO]**== (Prio 3) Einheitliche Maße:
     - Alles im Bauvorhabenbaum in Metern - erfordert aber eventuell mehr Nachkommastellen (z.B. Niveaus)
     - Alles im Baustoffbaum in Millimetern
     - Keine Zentimeter
     - MKS-System für Einheiten (Meter, Kilo, Sekunde)
     - ==TBD: Müssen Niveauwerte zur Kompatibilität mit Bodenaufbauten 3-Dezimalstellen bekommen? Dies dann im Rahmen der anstehenden Umstellung
       von VueAutoNumeric nach Vue Currency Input mit erledigen!==
385. **[DONE]** (Prio 3) Umschaltbares **Farbschema**, änderbar in Benutzereinstellungen. Neues graues Layout (nur Header und Footer und zweites BIM.click
     Logo, braun/grün) zusätzlich zu blauem Layout (Default). Wird in global Store gehalten (localStore.state.einstellungenBenutzer.farbSchema) und über
     my-layout.vue reaktiv aktualisiert. Die Icons sind weiterhin die blauen - es wäre schlecht für
     die Markenwiedererkennung des Logos, dafür alternative Farben anzubieten. Gleichzeitig per npm install vue-marquee-text-component@1.2.0 am
     Frontend eine Marquee-Vue-Komponente in my-layout.vue eingebaut. Diese zeigt eine **Laufschrift** im Footer an nach Logon.
386. **[DONE]** Beim Neu-Import des Baustoffbaums werden alle Baustoffe gelöscht (mit dem alten und dem neuen Agenda-basierten Import, welcher eine neue Controller-Methode
     internalImportBaustoffe() verwendet). Danach sind aber auch keine Baueigenschaften mehr angelegt im Baustoffbaum! Bisher gibt es auch nur
     eine Funktion zum Anlegen an einem der oder beiden Bäumen bei der Neuanlage einer Baueigenschaft. Es müsst also eine solche Funktion eingefüht werden (dann mit Flags
     an der typbezogenen Baueigenschaft, um die Anlage an den Bäumen auch zu kontrollieren). Workaround: Beim Import der Baustoffe den Wurzelknoten des Baustoffbaums nicht löschen.
     Dann bleiben dort die bereits am Baustoffbaum angelegten (wertbezogenen) Baueigenschaften (mit Referenz auf die jeweilige typbezogene Baueigenschaft) erhalten und werden anschließend auch in den neu angelegten Kind- und Kindeskindknoten angelegt. Den neuen internalImportBaustoffe() entsprechend angepasst, dass er den Wurzelknoten nicht löscht, und
     in den Kindknoten per push die Baueigenschaften aus dem Wurzelknoten einträgt - funktioniert!
     - **[DONE]** Der "alte" importBaustoffe() musste auch noch dementsprechend angepasst werden
     - **[DONE]** Es gab noch ein Folgeproblem mit dem pre() für deleteMany() in baustoffe.model zur Austragung von Referenzen auf Rohstoffe/Baustoffe - dort
       undefined-Fehler beim Löschen des Wurzelknotens mit Condition {\$ne: BaumKnotenTypen.WURZEL} - diese
       arbeitet im Gegensatz zu allen anderen BaustoffeModel.deleteMany nicht auf einer \_id - deshalb ist wahrscheinlich this.\_conditions.\_id dort nun undefined!
       Zunächst Workaround eingebaut, dass den pre() aber wirkungslos macht. Dann Fix eingebaut in baustoffe.controller.internalImportBaustoffe(), der beim
       deleteMany auf dem Feld \_id arbeitet statt auf Baumknotentyp.
     - **[DEFER]** Bei beiden Imports kam ein sporadischer MPath-Fehler, dass beim Zugriff auf irgendeine einzelne, aber wechselnde parentGliederungsNummer unter
       \Rohstoffe der path nicht definiert ist!
       Der Code läuft aber weiter und importiert scheinbar alles korrekt, auch den beanstandeten Zweig. Wenn im cactch-Block von (internal)ImportBaustoffe() ein
       throw error enabled war, wurde in diesem Fall aber ein Status 500 zurückgemeldet. Da der Fehler scheinbar ohne Wirkung ist, dieses throw error disabled! Dann
       gilt der Fehler durch den catch-Block als behandelt! Dies ignoriert de facto den MPath Fehler. Möglicherweise hilft ein Mongoose MPath Upgrade von 2.0.x auf
       2.4.x
387. ==**[WORK]**== (Prio 2) Neues Profil/Baueinheits-Konstrukt "Boden" bzw. "Wand" (allgemein: **"Trennbauteil"**), im Bauvorhabenbaum aktiviert an Baueinheiten zwischen "Raum" und "Bodenaufbau"
     bzw. künftigem "Wandaufbau". Bei "Wand" können als Kindbaueinheiten dann auch künftige Fenster, Türen, Tore etc. untergebracht werden, bei "Boden" künftige
     Treppen, Luken etc.. Dächer und Fassaden sind noch zu entscheiden, sie sind eher Kindbaueinheit von "Gebäude" oder "Geschoss". Siehe Mail-Thread MS/EF vom
     12.02.2022:
     - Neue Baueigenschaften für Fläche, U-Wert, Schalldämmmaße notwendig in "Boden", "Wand" und deren Kindbaueinheiten (teilweise schon vorhanden z.B. im
       Bodenaufbau gibt es U-Wert-Istwert, der seinerseits berechnet ist)
     - Gesamt-U-Wert und Gesamt-Schalldämmmaß werden per Formeln berechnet aus der Gesamtfläche des Trennbauteils und den gewichteten Einzel-U-Werten bzw.
       Einzel-Schalldämmmaßen mit den Einzel-Flächen ihrer Kindbaueinheiten
       - Die Trennbauteile brauchen für ihre Berechnungen also Werte aus ihren Kindbaueinheiten, d.h. "von unten" im Baum, die normalerweise nicht geladen werden beim lazy Loading (außer
         Boden-/Wandaufbauten)
       - ==Deshalb sollten wir diese Berechnungen "von unten" im Baum per Button machen, nicht über computed-Funktionen!==
     - Außerdem könnte dabei die Gesamtfläche eines Trennbauteils
       - einerseits **vorbelegt** oder errechnet werden aus den entsprechenden geometrischen Baueigenschaften am Raum, d.h. "von oben" im Baum - die entsprechenden Baueigenschaften aus der Elternbaueinheit müssten dann
         als gemeinsame Baueigenschaften definiert werden am Raum und am Trennbauteil (vorhandene Baueigenschaften zu Raumfläche, Länge, Breite, Tiefe)
       - alternativ additiv oder subtraktiv **errechnet** werden aus den Einzelflächen ihrer Kindbaueinheiten "von unten" im Baum (Boden-/Wandaufbauten, Fenster, Türen, Tore, Treppen, Luken) - diese müsste wie oben
         bereits festgestellt per Button erfolgen (z.B. mit der neuen Button-Prop im Rahmen von Epic 38.o)
         - Zur additiven oder subtraktiven Berechnung "von unten" im Baum gilt:
           - Subtraktives Verfahren: Dabei nimmt man an, dass die gesamte Trennwandfläche homogen ist, z. B. eine Ziegelwand, aus der dann ein Fenster „ausgestochen“ wird. Damit ergibt sich die Wandfläche aus der
             Fläche des Trennbauteils minus der Fensterfläche(n). Solche Fassaden nennt man „Lochfassaden“
           - Additives Verfahren: Z.B. ein Fabrikgebäude vor, dessen Außenwände aus Stützen bestehen, gemauerte Brüstungen unter den Fenstern und Stahlbetonstürze über den Fenstern. Hier ergibt sich die Trennfläche
             aus Stützenfläche plus Brüstungfläche plus fensterfläche plus Sturzfläche
     - Deshalb sind verschiedene Varianten der Baueigenschaft für die Gesamtfläche eines Trennbauteils notwendig:
       - **Ggf. berechneter \*Sollwert "von oben":**
         - Errechneter Wert "von oben" - dieser könnte auch wie bei anderen schon implementierten Soll-/Istwerten (lilafarbige Felder z.B. in "Raum" > "Boden/Decke") automatisch vorbelegt werden mit einem errechneten Wert "von oben", per Initialisierungsfunktion, oder er könnte auf Knopfdruck "von oben" berechnet werden, (z.B. aus lichter Breite oder lichter Tiefe des Raums, mal dessen lichter Höhe)
         - Alternativ manuell eingetragener Wert
         - Noch komfortabler ginge es, wenn man nicht nur Baueigenschaften für den Sollwert der Gesamtfläche anbietet, sondern separate Baueigenschaften für die Breite und Höhe der Wand
           - Diese könnten wiederum "von oben", d.h. vom Raum übernommen werden oder ihrerseits manuell eingegeben werden
           - Daraus könnte dann der Sollwert der Gesamtfläche der Wand berechnet werden, oder manuell eingegeben werden
       - **Ggf. berechneter Istwert "von unten":**
         - Errechneter Wert "von unten" - auf Button-Druck
         - Alternativ manuell eingetragener Wert (solange z.B. an Kindbaueinheiten "unten" noch nichts eingegeben wurden oder diese noch gar nicht existieren im Modell)
     - Präventiv sollte man also folgende Baueigenschaften vorsehen für die geometrischen Maße (Beispiel "Wand", "Boden" dann analog):
       - Dafür benötigt man als Sollwerte einige gemeinsame Baueigenschaften mit dem Profil "Raum" (lichte Breite Fassadenseite/Flurseite, lichte Tiefe, Grundfläche des Raums)
       - Diese können verwendet werden zur Vorbelegung entsprechender Istwerte am Trennbauteil "Boden" (analog für "Wand"), die manuell verändert werden können (Istwerte für Länge/Breite/Fläche des Bodens)
       - An Istwert für die Fläche des Bodens treffen die ggf. "von oben" übernommenen bzw. eingegebenen Werte und die ggf. "von unten" errechneten Werte zusammen
       - Dies könnte man auf 2 Arten lösen:
         - a) Nochmals getrennte Baueigenschaften für diesen Istwert für die Fläche des Bodens, nämlich für "von oben" und für "von unten" , dann könnte man sie auch vergleichen - z.B.
           - "Baueinheit > Boden > Geometrie > Maße > Fläche > Istwert" (das wäre obiger Wert, der ggf. "von oben" errechnet sein kann, oder per Hand eingegeben sein kann)
           - "Baueinheit > Boden > Geometrie > Maße > Fläche > Berechneter Wert aus Kindbaueinheiten" (hier könnte man noch additiv und subtraktiv unterscheiden)
           - Das ist klarer, aber man muss dann entscheiden, welcher der beiden Werte für welche weiteren Berechnungen gilt, bzw. sogar eine dritte Baueigenschaft dafür vorhalten, in der entweder der
             Wert von oben oder oder von unten, oder sogar ein ggf. manuell eingetragener Wert stehen kann
         - b) Eine Baueigenschaft (nämlich obige "... > Fläche > Istwert), aber mit 2 Buttons, einen, der den Wert des Felds "von oben" berechnet (aus den Sollwerten, die aus dem Raum kommen können)
           und einen, der den Wert von unten berechnet - dann könnte man sie nur "im Kopf" vergleichen durch mehrmaliges Drücken der beiden Buttons
       - Mit Variante a) könnte dann die Gesamtfläche eines Trennbauteils als eine Art spezielles Soll-/Istwertepaar dargestellt und die Werte visuell miteinander verglichen werden:
         - Links lilafarbiges Feld für den ggf. "von oben" bestimmten **Istwert**:
           - Wert "von oben" vorbelegt oder auf Knopfdruck "von oben" berechnet
           - Alternativ Handeingabe
           - Baueigenschaft: z.B. "Baueinheit > Boden > Geometrie > Maße > Fläche > Istwert")
         - Rechts daneben hellgrünes Feld für den ggf. "von unten" bestimmten **Istwert**:
           - Auf Knopfdruck berechnet "von unten" aus den Einzelflächen der Kind-Baueinheiten, wahlweise additiv oder subtraktiv
           - Alternativ ebenfalls Handeingabe
           - Baueigenschaft: z.B. "Baueinheit > Boden > Geometrie > Maße > Fläche > Berechneter Wert aus Kindbaueinheiten"
         - Dazwischen visueller automatischer Vergleich, wie z.B. in "Raum" > "Boden/Decke"
     - Hinweis: Obige Aufteilung ist eher für das additive Verfahren geeignet. Für das subtraktive Verfahren könnte man den oben als Sollwert bezeichneten "von oben" kommenden Wert hernehmen, und
       den anderen Wert daraus berechnen, indem man die Teilflächen bestimmter Kindbaueinheiten (z.B. Fenster) davon abzieht - dann handelt es sich allerdings nicht mehr um Soll-/Istwerte im
       herkömmlichen Sinn, sondern eher um **Brutto-/Nettowerte** - ein direkter Vergleich ist dann nicht sinnvoll
     - Hinweis: Analog müssen die Felder für die Berechnungen von U-Wert und Schalldämmmaß (in die die (Gesamt-)Fläche und bestimmte Werte aus den Kindbaueinheiten eingehen) definiert werden
       - Auch hier sollte es Sollwerte geben - diese könnten zunächst per Hand eingeben werden, oder zukünftig auch aus dem Raum kommen
     - ==**Achtung:**== Zusätzliche zu klärende Themen, wie die gemeinsame Trennwand (bzw. der gemeinsame Trennboden) zwischen zwei benachbarten Räumen in unserem Metamodell modelliert wird:
       - Thema 1: Wird diese Trennwand „per Konvention“ nur einmal angelegt, im Baum unter einem der beiden beteiligten Räume?
       - Wahrscheinlich ist das eine implizite Annahme, aber diese Konventionen wurden noch nie irgendwo präzisiert (wir haben sie ja schon oft gestreift bei der Master-Arbeit)
       - Wenn ja, an welchem der beiden Räume?
         - Beispiel: Wird die Trennwand zwischen Flur und Schlafzimmer dann im Baum unter dem Flur oder unter dem Schlafzimmer angelegt?
         - Das wird dann wichtig, wenn daraus irgendwelche Schlüsse gezogen werden sollen, was der benachbarte Raum hinter der Trennwand ist!
       - Thema 2: Ohne allgemeine „Raumnachbarschaftsverwaltung“ (was eine sehr komplexe Metamodell-Erweiterung wäre, siehe Master-Arbeit) weiß die obige Trennwand in unserem Metamodell nicht, zu welchem Nachbarraum sie die
         Trennwand ist!
         - Sie hängt ja nur unter einem der beiden Räume im Baum, und weiß somit nichts von dem anderen (Nachbar-)Raum (egal an welchem der beiden Räume sie hängt, das ist ja nur eine Konvention)
         - Man könnte als Hilfslösung noch ein Attribut (Aufzählungswert) am Trennbauteil hinzufügen, dass das **Nutzungsprofil des (ansonsten fiktiven bzw. anonymen) Nachbarraums** widerspiegelt
         - Allerdings bleibt das eine ziemliche Krücke, denn das Attribut wäre manuell vom Benutzer zu verwalten – sprich, wenn sich der ansonsten „fiktive“ Nachbarraum oder auch nur das
           Nutzungsprofil des „fiktiven“ Nachbarraums ändert, müsste das der Benutzer merken, und alle betroffenen Attribute manuell ändern
         - Siehe ==**Epic 29.a**== zu möglicher Lösung dafür **(Referenz zum Nachbarraum am Trennbauteil)**
           - Diese Lösung ist zwar genauer, stösst aber auch an Grenzen, weil es z.B. für die korrekte Identifikation von Flankenbauteilen sogar mehrerer Nachbarräume bedarf (z.B. in
             den angrenzenden Geschossen bzgl. Decke/Boden)
           - Wir wollen solche Situationen, die hochgradig geometrieabhängig sind, auch gar nicht modellieren!
           - ==Im Schallschutz genügen meistens angenäherte Verfahren, wofür die obige Variante mit dem Nutzungsprofil eines ansonsten fiktiven bzw. anonymen Nachbarraums ausreicht==
     - ==Fragen zu den für die "exemplarische" Modellierung mit **Musterbaueinheiten** und **Musterbaustoffen** angewendeten Practices/Konventionen==
       - Konvention 0: Welche Baueinheiten/Baustoffe können Muster-Baueinheiten/-Baustoffe sein?
          - Folgende Baueinheiten könnten exemplarische/fiktive/anonyme/"Muster-"Baueinheiten (Profile) vs. reale/reguläre Baueinheiten (Profile) sein:
          - Muster-Baueinheiten: Geschoss, Raum, Trennbauteile, Bodenaufbau, Wandaufbau, Schicht
          - Bauvorhaben, Standort, Gebäude sind dagegen immer "reale" Baueinheiten?
          - Müssen wir auf der Baustoffseite ebenfalls „Musterbaustoffe“ von realen Baustoffen entscheiden, und wie wollen wir das tun, über Attribute oder über 
            Bezeichnungskonventionen?
          - Erik hat im Fluge schon mal „unspezifiziert“ eingeführt als eine Art Sammelkategorie
          - Das müssen wir natürlich genauer durchdenken, auf Knoten- und Blattebene im Baustoffbaum  
          - Über die genaue Terminologie werden wird noch entscheiden
       - Konvention 1: Zusammenhänge zwischen Muster-Räumen und Muster-Trennbauteilen
         - Siehe begonnenes Word-Dokument dazu mit Beispielen
         - Rule of Thumb 1.a : Das Trennbauteil wird an dem Raum modelliert, der die Größe der Trennfläche bestimmt (Annahme/damit verbundene Konvention dabei: an Raumgrenzen 
           gesplittete/segmentierte Wänden)
         - Beispiel: Flur mit mehreren angrenzenden Räumen => Wände werden als Knoten unter den Räumen, nicht dem Flur modelliert
         - Gibt es hier noch mehr solche „Rules of Thumb“?
       - Konvention 2:  Berücksichtigung von Maßen bei der Modellierung von Muster-Trennbauteilen
         - Siehe von Erik begonnenes Word-Dokument dazu mit Beispielen
         - Rule of Thumb 2.a: Bei einfachen Bauteilen wie Wänden ohne Türen und Fester spielt zur Festlegung der Anforderungen an den Schallschutz die Trennfläche keine Rolle 
         - Rule of Thumb 2.b : Bei zusammengesetzten Bauteilen ändert sich das Gesamtschalldämmmaß mit den variablen Flächenanteilen. Das zusammengesetzte Schalldämmmaß einer Wand 
           mit Tür ist mit steigendem Flächenanteil  der Tür geringer. Die Dimensionierung der Trennwände liegt damit auf der sicheren Seite, wenn zur Modellierung ein Raum mit 
           einem kleineren Trennwandanteil gewählt wird. Das ist der schmalere Raum. D.h. bei solchen Situationen wird die Mustertrennwand als Knoten unter dem "Musterraum" 
           angelegt, der die schmalere Wand hat.
         - Gibt es hier noch mehr solche „Rules of Thumb“?
       - Konvention 3: Auswahl der Muster-Räume in Relation zu den realen Räumen
         - Welche Musterräume werden überhaupt modelliert, welche werden weggelassen?
         - Z.B. im Sinne von Nutzungsprofilen oder bestimmten geometrischen Situationen?
         - Beispielhafte Rule of Thumb 3.a: Z.B. könnten exemplarische Räume modelliert werden mindestens für alle im Geschoss vorkommenden Nutzungsprofilen von Räumen
         - Zusätzlich könnten weitere Kriterien gelten
       - Konvention 4: Zuordnung von Muster-Trennbauteilen zu Musterräumen
         - Nach welchen Regeln werden Trennbauteile als Knoten unter welchen Musterräumen modelliert?
         - Z.B. "Trennwand vom Klassenraum zum Geräteraum", falls 2 Klassenräume an einen Geräteraum angrenzen: Unter welchem der beiden Klassenräumen wird die Trennwand modelliert?
       - Konvention 5:  Gültigkeitsbereich von Mustertrennbauteilen
         - Welchen Gültigkeitsbereich (Gebäude, Geschoss, Nachbarraum) hat ein Mustertrennbauteil, d.h. auf welche realen Trennbauteile soll es angewendet werden als Muster?
       - Am Telefon erwähnte Erik noch mindestens noch eine weitere implizite Konvention bzw. weitere Attribute von Trennbauteilen, die mir aber entfallen sind ("Konvention 6") - 
         waren es z.B. Empfangs-/Senderaum betreffende Attribute?
     - ==Allgemeinere Anforderungen für die Modellierung von **Musterbauteilen**==
       - A) Differenzierung von Mustertrennbauteilen von regulären Trennbauteilen
         - Dazu führen wir (hier als Beispiel für Wände) ein neues Attribut ein im Profil „Baueinheit > Wand“, das an Mustertrennbauteilen (Wände, Böden) angeknipst werden kann, um diese zu identifizieren und auseinander halten zu können von „regulären“ Trennbauteilen
         - „Baueinheit > Wand > Ist Mustertrennbauteil?“: Wahrheitswert – damit können wir dann „Musterwände“ von den „regulären“ Wänden unterscheiden:
           - Im Ausgangsmodell können wir z.B. in Reports für den Architekten diese erkennen und entsprechend kennzeichnen
           - Später, wenn das „reale“ Modell vom Architekten mit dem Ausgangsmodell gemerged werden soll, erkennen wird, was die Musterwände waren, und können diesen ggf. „reale“ Wände zuordnen
           - Analoge Wahrheitswerte kann es dann für Musterräume und Mustergeschosse geben (siehe dazu meine Frage zu Konvention 0, was überhaupt „Muster“-Profile sein sollen)
       - B) Identifikation, für welche Nachbarräume ein solches Trennbauteil gelten soll
       - An der Lösung dafür müssen wir noch feilen
       - Wir könnten es relativ simpel halten, und wie beim Schallschutz schon oben diskutiert, hierfür nur ein Nutzungsprofil eines Nachbarraums als Attribut am Trennbauteil festhalten
         - „Baueinheit > Wand > Nachbarraum > Nutzungsprofil“: Aufzählungswert – hier kann man dann aus einer Dropdown-Liste der vorhandenen Nutzungsprofile eines auswählen für den Nachbarraum „hinter der Wand“
       - Damit lassen sich komplexere räumliche Situationen nicht so einfach wiedergeben, was aber akzeptabel scheint
       - Alternativ könnten wir die Lösung implementieren, hierfür eine Referenz auf einen Nachbarraum (im selben Modell) als Attribut am Trennbauteil festzuhalten
         - Damit bekommen wir auch automatisch dessen Nutzungsprofil mit
         - Es gibt aber auch da komplexere Situationen, wo man eigentlich mehrere Referenzen auf mehrere Nachbarräume bräuchte
       - Und natürlich muss man bei allen diesen Überlegungen noch einbeziehen, ob es sich bei diesen Referenzen um solche auf „Musterräume“ handelt, oder um „reale Räume“
       - Für die richtige Lösung muss man sich klarer werden, was die Antworten auf Konvention 3 und 4 sind
       - C) Festlegung des Gültigkeitsbereichs, wofür das Mustertrennbauteil als Muster dienen soll
       - Das ist relativ einfach zu lösen, z.B. durch 2 weitere Wahrheitswerte am Trennbauteil, die zusätzlich zu obigem Wahrheitswert gesetzt werden können, wenn dieser „true“ ist, z.B.
         - „Baueinheit > Wand > Mustertrennbauteil > Gültig im gesamten Gebäude?“: Wahrheitswert
         - „Baueinheit > Wand > Mustertrennbauteil > Gültig im gesamten Geschoss?“: Wahrheitswert
     - ==Zu den Musterbaueinheiten/Musterbaustoffen: Siehe dazu auch das PPTX-Dokument "Conceptual Design"==
388. ==**[WORK]**== (Prio 3) **Knotentypabhängiges Enabling/Disabling der Eingabe in Profilformularen im Baustoffbaum**:
     - Die Attribute in den meisten Profilformulare sind tendenziell für Blattknoten, so auch die in "Baustoff" (generelle Angaben) die für alle Baustoffe gelten
       (z.B. Herstellerangaben, Dichten), oder in "Schicht", die für alle Schichtbaustoffe gelten (z.B. Dicken, Schalldämmmaße)
     - Nur wenige, bestimmte Attribute, z.B. "steuernde Aufzählungswerte" sollten schon an Verzweigungsknoten gesetzt werden, um im darunterliegenen Zweig alle Baustoffe
       einheitlich mit einem bestimmten Wert zu versehen
     - Insofern wäre es sinnvoll, die Profilformulare im Baustoffbaum nur an **Blattknoten** zur Eingabe zu enablen, und sie ansonsten defaultmäßig auf "readonly" zu schalten
     - Dann könnten erst gar nicht versehentlich Werte an Kindknoten mit Eingaben an Verzweigungsknoten überschrieben werden
     - Über einen Schalter könnte dann ein Administrator oder Redakteur die Eingabe per Profilformular auch an Verzweigungsknoten freischalten
     - Dieser könnte wie der orangefarbige Button für die Ermittlung der Definiertheit an Kindbaustoffen unten rechts auf dem Profilformular erscheinen ("Eingabe am ausgewählten  
       Verzweigungsknoten temporär freischalten") - dieser würde "readonly" abschalten mit einer Warnung.
     - Diese readonly-Properties müssten dann ebenfalls temporär im Profil Model gehalten werden (ähnlich wie die Property bgColor, die am einzelnen Feld hängt), denn sie sind
       knotenspezifisch und profilabhängig, d.h. beim Wechsel des Knotens oder des Profils müssten sie aktualisiert bzw. wenigstens zurückgesetzt werden. Allerdings genügt es,
       sie für das gesamte Profil Model nur einmal vorzuhalten. Alternativ kann die Property auch als transiente Variable in data() vorgehalten werden, muss dann allerdings in
       mounted(), watch() (= Refresh, dort 2-mal) und reset() auf false zurückgesetzt werden. Wenn diese Variable eingabeFreischaltenAnVerzweigungsKnoten dann auf Knopfdruck auf true gesetzt wird, kann sie abgefragt werden im Template bzw. in einer Hilfsmethode (determineReadonly(baueigenschaft)) am Knoten
       (ähnlich wie determineFieldBackgroundColor(baueigenschaft)) und dann das defaultmäßige :readonly auf false setzen (sofern nicht andere Properties, z.B.
       die Benutzerrolle, die Deaktviertheit oder die Definiertheit an einem Elternknoten dies verhindern).
     - Am Besten ist dann an Verzweigungsknoten im Baustoffbaum alle Felder defaultmäßig auf readonly zu schalten, es sei denn, diese Property wurde gesetzt per Button
     - Wenn sie gesetzt wurde, erscheint auch eine Benutzerwarnung
     - Nach Freischaltung können dann (mit dem bereits vohandenen orangefarbigen Button dafür, oder künftig sogar generell?) die undefinierten Felder, die definierte Werte an
       Kind- oder Kindeskindknoten haben, orangefarbig markiert werden als zusätzliche Vorkehrung
     - **[DONE]** Beim Speichern an Verzweigungsknoten im Baustoffbaum könnte man noch einen Bestätigungsdialog einblenden, der nochmals darauf hinweist, dass das Speichern
       die Werte auch an allen (aktivierten) Kindknoten einträgt und ggf. vorhandene definierte Wert an Kindknoten überschrieben werden.
     - ==**Achtung**==: Diese Funktionalität ist baustoffbaumspezifisch, so wie auch schon der orangefarbige Button zur Ermittlung der Definiertheit an Kindbaustoffen und der Button
       zum Freischalten der Werteeingabe an Verzweigungsknoten
389. ==**[WORK]**== (Prio 3) **Vererbung von Werten von Baueigenschaften im Baustoffbaum**
     - Diskussion mit Erik: Es wäre erstens sinnvoll, Vorgabewerte für Baueigenschaften zu haben, die bei der Eingabe helfen sollen
     - Vorgabewerten an Nutzungsprofilen existieren bereits heute, werden aber bisher nur im Bauvorhabenbaum verwendet für Raumnutzungsprofile
     - Diese werden bereits heute getrennt von den (änderbaren) echten Werten der Baueigenschaften am Knoten verwaltet
     - ==Man könnte solche Vorgabwerte also auch für Profile im Baustoffbaum anlegen und diese dann aktivieren!==
     - ==Allerdings bleibt dabei die Logik der in allen Bäumen geltenden Vererbungsregel, dass Werte (inklusive Vorgabewerte) immer bis in die Kindknoten propagiert werden, erhalten!==
       - Da Profile im Baustoffbaum ab einer bestimmten Ebene an allen Kind- und Kindeskindknoten aktiviert werden, hat das im Baustoffbaum gravierendere Auswirkungen als im Bauvorhabenbaum
       - Die Kindknoten können deshalb, wenn die Vorgabewerte weiter oben im Baum eingetragen werden, keine davon abweichenden individuellen Werte haben, was offenbar eine weitere
         Anforderung ist!
       - ==Für Ausnahmen davon müsste die Wertevererbungsregel für bestimmte Baueigenschaften abgeschaltet werden, was das gesamte System korrumpieren würde bzw. die
         gesamte Logik auf jeder Baueigenschaft zweigleisig machen würde, allerdings auch abhängig, ab wo und wie tief die Abschaltung bzw. Umschaltung möglich wäre - so würde
         z.B. auch das Bewegen von Zweigen, die aktivierte Baueigenschaften enthalten, wo dieses Um-/Abschalten anders wäre als am Zielelternknoten für das Bewegen, erheblich
         verkompliziert und vom Benutzer praktisch nicht mehr zu durchschauen!==
       - Die Alternative wäre, für Baueigenschaften im Baustoffbaum, die von den Istwerten abweichende Vorgabewerte benötigen, **getrennte Soll- und Istwerte** zu definieren
         und die ansonsten änderbaren Istwerte mit den Sollwerten vorzuinitialisieren
       - Das müsste dann aber für alle betroffenen Baueigenschaften im gesamten Zweig bis zu den Blattknoten so modelliert werden - mühsam! Es ist auch unklar, welche Baueigenschaften
         davon genau betroffen sind!
     - ==Der Nebeneffekt der geltenden Vererbungsregel ist, dass viele Verzweigungsknoten im Baustoffbaum zwangsläufig undefinierte Werte haben werden, da erst auf unteren Ebenen bzw.
       an Blattknoten die Werte individuell gesetzt werden können (wie z.B. die Wärmeleitfähigkeit)==
     - De facto muss man deshalb auch für "generische" Baustoffe, die bestimmte vorgabewertähnliche "Musterwerte" (z.B. für die Wärmeleitfähigkeit) für die initiale Planung haben,
       Blattknoten im Baustoffbaum anlegen und diese dann Baueinheiten bei der "Hochzeit" als "herstellerneutrale Musterbaustoffe" zuordnen!
390. **[DONE]** (Prio 3) In sämtlichen betroffenen Profilformularen mussten die q-times und q-dates mit den :readonly Props ihrer
     umgebenden q-inputs versehen werden. Das war vergessen worden, so dass eine Werteeingabe und Speicherung auch möglich war,
     wenn das umgebende q-input auf readonly geschaltet war. Gefixt in allen betroffenen vue-Komponenten.
391. ==**[TODO]**== (Prio 3) **Security: Zugriff auf Online Doku URLs, Frontend Routes und Backend Routes/URLs**
     - Kann auf Frontend Doku-Routes, wie z.B. https://bimclick.herokuapp.com/Dokumentation/5-3-Aktivierung-und-Wertevererbung-von-Baueigenschaften#3.2-gliederung auch
       ohne
       Prüfung von Berechtigungen per URL zugegriffen werden?
     - Wenn man im Browser in BIM.click angemeldet ist, ist der Zugriff per URL-Eingabe möglich
     - Nach Abmeldung erschien bei einem Sniff Test nach einem kurzen "Zucken" die Anmeldemaske, allerdings blieb links das Doku-Inhaltsverzeichnis geöffnet
     - **[WORK]** Daher sicherheitshalber in my-layout.vue zweimal zusätzliches Schließen der Drawers eingebaut, u.a. auf der Route für die Anmeldung, in navigateToDefaultRoute()
       - Alerdings ist nicht klar, ob das die ausreichenden Maßnahmen sind...
       - Bei neuem Sniff Test auf Heroku war wieder, trotz Logoff, immer noch der linke Drawer zu sehen!
       - my-layout.abmeldenBenutzer() schließt schon die Drawers, kann also nicht ursächlich sein!
       - An anderer Stelle deshalb ein zweites Schließen der Drawers eingebaut (markiert mit #391)
     - Es kommt ja ansonsten öfter die Meldung "Cannot GET /Dokumentation/14.2-Design-Internals" , z.B. nach Abmeldung und URL-Eingabe http://localhost:4200/Dokumentation/14.2-Design-Internals - diese kommt vermutlich vom Vue-Router
     - Oder es kommt die 404-Seite, z.B. bei Abmeldung und URL-Eingabe http://localhost:4200/Dokumentation - diese kommt vermutlich vom HTTP-Server
     - Das scheint erst mal keine Probleme zu machen
     - Dies muss aer möglicherweise entweder im Vue Router, im HTTP-Server oder auf Heroku noch weiter abgesichert werden
     - ==**[TODO]**== Präventive Penetration Tests sind mit Tool auf möglich - z.B. Heise-Artikel Februar 2022 dazu
     - ==**[TODO]**== **Anchor Links Problem**
       - ==Dabei fiel oben nebenbei noch auf, dass für Unterabschnitte in der Doku ein #-Suffix in der URL auftaucht (siehe obiges Beispiel), was weiter evaluiert werden sollte, eventuell
         kann das auch für ein verbessertes Scrolling genutzt werden==
       - Es handelt sich dabei um **Anchor Links** von QMarkdown: https://quasarframework.github.io/quasar-ui-qmarkdown/docs#anchor-links
       - Dabei gibt es jedoch Dubletten-Fehler, z.B. bei Klick auf Überschrift für Abschnitt 5.2 wird folgende URL angezeigt: http://localhost:4200/Dokumentation/5.2-Beispiele-fuer-Baueigenschaften-mit-unterschiedlichen-Wertetypen#5.2-beispiele-f%C3%BCr-baueigenschaften-mit-unterschiedlichen-wertetypen
       - ==Da diese Anchor Links so nicht funktionieren (vermutlich ein Konflikt mit der Scrolling-Logik für das eigene Inhaltsverzeichnis) diese
         per QMarkdown Prop no-heading-anchor-links vorübergehend abgeklemmt!==
       - Die Variable selectedDocTopicId in my-layout.vue spielt dabei auch eine Rolle!
       - Das sollte weiter untersucht und gefixt werden, es ist eventuell ursprächlich für manche Fehler beim Scrollen
     - ==**[WORK]**== Genauso wichtig ist auf Heroku die Absicherung von Backend URLs und potentiell auch Dateien in den tmp/download (Backend) bzw. src/statics (Frontend) Folders
     - ==**[Update 19.02.2022]**==
       - Protection für Backend Server Dateien: Alles was im download-Ordner liegt, ist unprotected - es könnte aber per Router app.use ("Step 5 Lösung" unten) abgesichert werden,
         was aber andere große Probleme brint (href-Links darauf funktionieren nicht mehr, bekommen "Unauthorized", Download-Links funktioneren nicht mehr!)
       - Am Frontend wird die Protection offenbar durch Vue erledigt, aber es gibt dort noch offene Restrisiken (alles was in statics liegt, ist frei zugänglich, was in assets liegt, nicht)
       - Z.B. Zugriff auf https://bimclickserver.herokuapp.com und Unter-Routes davon (die Routes scheinen abgesichert zu sei - es kommt "Unauthorized" im Browser)
       - z.B. Zugriff auf https://bimclickserver.herokuapp.com/LBO_BW.pdf als Beispiel für Datei-Zugriff auf Ordner im dortigen download Folder - diese Dateizugriffe sind
         ohne die "Step 5 Lösung" unten in back-end-server.js **nicht abgesichert**!
       - ==D.h. nach Abmeldung gelang der Zugriff auf letztere Datei (eine der dort statisch liegenden Dateien) dennoch!==
         - Auch auf das dortige Unterverzeichnis kann zugegriffen werden, z.B. per https://bimclickserver.herokuapp.com/img/estrich.jpg
         - ==Ein Zugriff ist auch aus parallelem Edge-Browser möglich!==
         - **Achtung**: Dies hat nichts zu tun mit dem JWT-Token, der API Calls absichert!
         - ==Dort liegen z.B. einige in der Doku benutzte Dateien/Images==
         - ==Diese müssen in ein anderes nicht zugängliches Verzeichnis verschoben werden!==
       - ==Oder sollten diese eventuell alternativ besser im Frontend liegen? (Siehe unten: Antwort ist "nein"!)==
         - Dies für manche Dateien, z.B. den Beta Quickstart Guide (PDF) und einen der Screenshots in der Doku testweise vollzogen, diese wurden probeweise
           vom Backend (tmp/download/) ins Frontend, nach /statics/pdfs bzw. /xls bzw. /screenshots verschoben - nach der Lösung der Protection am Backend wieder rückgängig
           gemacht, und diese wieder in tmp/download am Backend gespeichert
         - Update: Am Ende gehören sie wohl ins Frontend, nach assets, das ist der protected Folder dort für solche Assets, erfordert aber spezielle Vorkehrungen für PDFs (siehe ganz unten)
         - ==**Hinweis**==: Direkt auf der obersten Ebene im Backend Folder tmp/download liegen auch noch einige wenige, unkritische, statisch definierte Testdateien (z.B. PDFs, JPGs), welche als interne Links von Test-Bauinformationen
           verwendet werden (dort sind die sogenannten internen Links relative Links in diesen download Folder). Diese werden
           teilweise für Tests auch am Frontend vorgehalten (statics/pdfs), sind aber unkritisch
         - ==Bei neuem Test auf Heroku konnten die ins Frontend (statics-Folder) verschobenen Dateien aber ebenfalls ohne Login accessed werden (wenn man ihre URL kennt)!==
           - z.B. https://bimclick.herokuapp.com/statics/pdfs/LBO_BW.pdf - hier für Frontend URLS muss der statics Folder, im Gegensatz zum download Folder in Backend URLS, mit angegeben werden!
       - Frontend Infos dazu: Vue und static Files:
         - Siehe https://cli.vuejs.org/guide/html-and-static-assets.html#url-transform-rules
         - Siehe auch https://stackoverflow.com/questions/37645243/static-image-src-in-vue-js-template zu Vue und dem statics Folder
         - Siehe auch https://vuejs-templates.github.io/webpack/static.html
       - Lösungen: Protection/Security der public/static Folders ist eine Express/Express Router bzw. Express/Vue Router Frage, das diese Folder served, und zwar
         - am Backend (back-end-server.js) mit dem Expresss Router und backend-server-routes.js
         - am Frontend (front-end-server.js) mit dem Vue Router und den front-end-server-routes.js
         - ==Das Problem scheint sowohl am Backend als auch am Frontend zu sein, dass die statics (Frontend) bzw. download (Backend) Folders nicht per Login protected werden!==
         - Betrifft am Frontend den front-end-server.js:
           - Dieser enthält u.a. ein require("serve-static"), allerdings auf Heroku für /dist/pwa - scheint für das statics-Protection Problem irrelevant zu sein
           - https://www.npmjs.com/package/serve-static
           - Testfälle (jeweils mit und ohne Anmeldung zu testen:)
             - Lokal: http://localhost:4200/statics/pdfs/LBO_BW.pdf - hier muss statics als Folder angegeben werden!
             - Heroku: https://bimclick.herokuapp.com/statics/pdfs/LBO_BW.pdf - hier muss statics als Folder angegeben werden!
           - ==Neue Tests mit Stefan zeigen, dass die Frontend-Zugriffe auf statics eventuell durch Vue abgesichert werden, allerdings ist auch noch nach Abmeldung noch "eine Weile" ein
             Zugriff auf diese Dateien möglich, daher unklar, ob die Sicherung der Dateien in statics am Frontend wirklich klappt (Antwort am Ende: Nein, nur in assets!)
         - Betrifft am Backend back-end-server den Express Server:
           - app.use(express.static(downloadFileFolder));
           - Dort ist es besser lösbar als am Frontend, da man in diese Express static-Logik eingreifen kann mit den Lösungen unten
           - Dies spricht dafür, die betroffenen Files doch aus dem Backend zu serven!
           - ==Die (notwendige) Lösung von Stefan am Backend war, in back-end-server.js nach dem Muster der Lösungen unten, den app.use für die statics als Middleware (das ist in
             Express alles das, was zwischen req und res ausgeführt wird) zu verschieben, von Step 4 nach Step 5, d.h. an eine Stelle **nach** dem Aufsetzen der Passport-Protection mit Tokens
             für alle Routes, statt wie bisher davor!==
           - ==Damit wäre es künftig sicherer, solche statischen Dateien im Folder /download und seinen Subdirectories **am Backend zu halten und zu serven**!==
             - Z.B. in der Doku benötigte, statisch bekannte Dateien
             - Z.B. in der Online-Hilfe benötigte, statisch bekannte Dateien
             - Z.B. selbst nach /upload hochgeladene Dateien in der Online-Hilfe, die in der Datenbank gespeichert werden und bei Server Start in Step 9 in das /download Ordner kopiert werden!
           - Damit ist auch eine Lösung für die temporär für die fachliche Hilfe angezeigten Dateien gefunden (Backlog Item #80)
           - Testfälle:
             - Lokal: http://localhost:8080/screenshots/dokumentation-screenshot-baueigenschafts-profil-aktivieren-per-kontext-menu.png - hier muss downloads **nicht** als Folder angegeben werden!
               - Bei fehlender Anmeldung kommt "Unauthorized", d.h. Protection ist aktiv!
             - Heroku: https://bimclickserver.herokuapp.com/screenshots/dokumentation-screenshot-baueigenschafts-profil-aktivieren-per-kontext-menu.png - hier muss downloads **nicht** als Folder angegeben werden!
               - Achtung: Protection auf Heroku funktioniert erst nach Deployment der obigen Lösung nach Heroku!
         - Zu diesem Thema noch folgende Links:
           - Siehe https://www.tutorialsteacher.com/nodejs/serving-static-files-in-nodejs
           - Siehe https://stackoverflow.com/questions/60856126/is-a-file-outside-the-public-folder-in-express-safe
           - Mögliche Lösung: https://stackoverflow.com/questions/14612774/how-to-secure-a-static-route-with-express-and-nodejs - Secure Route auf static Folder
             - Aber unklar, ob das am Frontend so mit Vue zusammen zum Laufen zu bringen wäre!
           - Weitere Lösung: https://stackoverflow.com/questions/11910956/how-to-protect-a-public-dynamic-folder-in-nodejs
           - Weitere Lösung: https://stackoverflow.com/questions/21170253/cannot-use-basic-authentication-while-serving-static-files-using-express/21170931#21170931
           - Oder auch: https://stackoverflow.com/questions/5683657/restricting-access-to-static-files-in-expressjs
     - ==**[Update]**==: Nach dem Deployment obiger Lösung mit den Files am Backend wurden q-img basierende Zugriffe vom Frontend (in dokumentation.vue) auf Links zu Files im download Ordner am Backend mit "Unauthorized" rejected!!! Das heisst man hätte damit eine "Overprotection" erreicht...
       - Lösungsversuche:
         - JWT Token per Cookie schicken (siehe dokumentation.vue und back-end-server-routes.vue): FAILED (die Links/hrefs schicken wohl grundsätzlich keine Cookies)
         - Vue Directive **VueAuthImage** für HTML img Tags:
           - https://gitlab.com/jlalande/vue-auth-image - könnte das Problem lösen, aber die Vue Directive funktioniert am Frontend in dokumentation.vue erst einmal nicht, disabled
           - Frage pending: https://github.com/quasarframework/quasar/discussions/12536 - Boot File notwendig?
           - Ein Blick in den Source Code von VueAuthImage auf https://github.com/xzag/vue-auth-image/blob/master/vue-auth-image.js zeigt, dass dieses under the Covers einen Axios get macht statt des normalen http-Calls für einen Link - der
             Axios Call hat dann einen Header, der wie in BIM.click üblich in mounted() gesetzt werden könnte
           - Insofern könnte man diese Logik auch selbst implementieren, z.B. auf einem Quasar q-button, allerdings müsste dann unser Markdown für die Doku wohl endgültig
             in dokumentation.vue integriert werden, damit er neben Markdown und den Markdown/HTML-Image-Links auch Vue/Quasar-Komponenten enthalten darf!
           - VueAuthImage schließlich positiv getestet (lokal mit Zugriff auf Heroku-Image) in dokumentation.vue - es kann damit ein HTML-Link mit Vue Directive auf eine Datei im protected Folder auf Heroku angezeigt werden
             - Under the covers sendet VueAuthImage per Axios einen Authorization Header (muss in mounted( von dokumentation.vue gesetzt werden))
             - https://github.com/quasarframework/quasar/discussions/12536 - Boot File dafür eingerichtet, quasar.conf boot-Array dafür erweiter
             - Achtung: Die Syntax für den Aufruf ist mit Double Quotes: < img v-auth-image="'https://bimclickserver.herokuapp.com/img/estrich.jpg'" >
             - Aber: Es versursachte erst einmal einen Build Break auf Heroku, daher einstweilen wieder disabled
               - Module not found: Error: Can't resolve 'vue-auth-image' in '/tmp/build_fd03e8d8/src/boot'
               - Vermutliche Ursache: Kein Eintrag in package.json trotz npm vue-auth-image --save
             - Nach wiederholter Installation des Pakets wird die package.json und die package-lock.json korrekt updated mit einem Eintrag für vue-auth-image (0.0.3 oder höher), und
               damit klappt dann der Build auf Heroku!
             - VueAuthImage könnte so also eingesetzt werden, erfordert allerdings Vue im Markdown!
             - Es ist aktuell wieder disabled in dokumentation.vue
           - ==**QImg** (siehe unten), das mittels VMD Support in QMarkdown ebenfalls mit Markdown vermischt werden könnte, ist der VueAutImage Directive am herkömmlichen
             HTML img haushoch überlegen - es ist also bei Einsatz von "mixed" Vue/Quasar + Markdown" (per VMD) die beste Lösung!==
       - ==Daher in back-end-server.js den Step 5 wieder disabled zugunsten des originalen Steps 4!==
       - ==Allerdings stellten sich dann einige der Test-Links als falsch heraus im Code, daher neuer Versuch, und siehe da, der Zugriff per Links im Markdown auf Dateien im download-Folder auf Heroku funktioniert dann (temporär, wie sich unten herausstellte) doch mit Step 5! Dies gilt sowohl für Zugriffe per Links aus der Doku in der Heroku-App als auch lokal, die in beiden Fällen auf den download-Ordner am Backend auf Heroku zeigen, Unterordner /screenshots (neben /pdfs und /xls)==
       - ==Allerdings funktioniert auch noch nach Abmeldung auf Heroku ein Zugriff auf die Dateien aus dem Browser, z.B. https://bimclickserver.herokuapp.com/screenshots/dokumentation-screenshot-bauvorhaben-baueigenschaften-uebersicht-baueigenschaft-aktivieren.png, d.h. die Protection funktioniert
         möglicherweise nicht oder erst nach gewisser Zeit, weil gewisse Credentials im Browser erhalten bleiben?==
       - Zugriff war sogar aus dem Samsung Browser auf dem Galaxy Note 8 möglich (allerdings kurz nach Logoff aus der PWA App)!
       - Nach einigen Stunden kommt in beiden Browsern "Unauthorized" (401) zurück
       - ==Es ist also nun mit dem aktiven Step 5 eine Protection vorhanden für die Dateien in diesem Ordner, allerdings ist sie vermutlich von der **Token Expiration** abhängig!==
         - ==**[TODO]**== Die Token Expiration wird in Backlog Item #127 behandelt, sie ist aktuell am Client und am Server auf 12 Stunden eingestellt
         - Am Client wird in my-layout.vue beim Anmelden abgefragt, ob ein Token vorhanden ist, der jünger als 12 Stunden ist, der dann weiterverwendet wird - sonst wird eine Abmeldung und Neuanmeldung
           erzwungen)
         - Der Token wird am Client im Browser Storage gehalten, u.a. deshalb, damit nach Refresh nicht jedesmal ein neues Logon nötig ist!
         - Am Server ist authentifizierung.controller.js für die Tokens zuständig (sie werden in loginBenutzer() gesigned und mit dem Expiration Timestamp von 12 h versehen)
         - Am Server expiren die Tokens vermutlich auch zusätzlich beim 24-stündlichen Restart der Heroku Server!
       - ==Vorübergehend war dann die neue Lösung mit Step 5 aktiv, muss weiter beobachtet werden!==
       - ==Folgende neue Beobachtung: Der protected-Fall auf Heroku funktioniert nicht!==
         - Lokal werden (nach Anmeldung) die Doku-Links auf Heroku im download-Folder befindliche Files zunächst noch korrekt angezeigt!
         - ==Auf Heroku selbst sind diese Doku-Links aber broken!==
         - ==Einige Zeit später sind sie trotz Anmeldung auch in der lokalen Version broken!==
         - Auch eine Setzen des Axios Headers in mounted() von dokumentation.vue wie in den anderen Komponenten hilft nicht dagegen!
         - Logging in back-end-server-routes.js für die Get-Requests zeigt, dass dort der Authorization Header mit dem sonst in den Requests befindlichen Bearer Token für diese Get-Requests von gelinkten Files in
           download/screenshots nicht gesetzt ist, weder in den Requests, die vom Frontend in der Heroku-Version kommen, noch in denen, die vom lokalen Frontend kommen
           (das ist im Server Log unterscheidbar als referer: 'https://bimclick.herokuapp.com' bzw. referer: 'http://localhost:4200/')
         - Auch ein Einschalten von withCredentials: true in axios.js am Frontend hilft nicht dagegen!
         - Auch in quasar.conf.js im PWA-Teil half useCredentials: true nicht dagegen!
         - Auch beides gleichzeitig half nicht dagegen!
       - ==Aktuell ist deshalb wieder die alte Lösung mit Step 4 aktiv, muss weiter verfolgt werden!==
     - ==Potentielle weitere Alternative (mit Files am Frontend im assets-Folder)==
       - Die Dateien aus dem **am Frontend** aus dem Vue assets-Folder laden statt dem public/statics Folder - dieser ist protected - jedenfalls deutet
         die QImg Doc darauf hin
         - https://quasar.dev/vue-components/img#qimg-api
       - https://stackoverflow.com/questions/62846063/whats-the-proper-location-to-store-images-in-vuejs-public-folder-or-assets-fo - Unterschied ist Webpack
       - Fraglich, ob pure HTML/Markdown-Links diese dann laden können:
         - Ein Versuch mit einem Link im Markdown auf http://localhost:4200/assets/estrich.jpg scheitert mit 401 (Unauthorized)
       - Es ist aber einen Versuch per QImg wert (d.h. dann ist es wenigstens in dokumentation.vue verwendbar)
         - Ein Test von q-img mit src="http://localhost:4200/assets/estrich.jpg" bringt jedoch zunächst einen 401 (Unauthorized)
         - ==Erst q-img mit src="~/assets/estrich.jpg" funktioniert der Zugriff, d.h. die Tilde vorne im Pfad ist der Unterschied!==
         - ==Gleichzeitig bringt ein Zugriff im Browser mit http://localhost:4200/assets/estrich.jpg ein "Cannot GET..." - was positiv ist im Sinne von Protection!==
     - ==**Vorläufiges Summary**==:
       - Protection der File im download-Ordner am Backend ist zwar mit der "app.use() Step 5"-Lösung möglich, aber normale HTML-Links insbesondere im Markdown
         können keinen Authorization Header mitschicken, daher scheitert dann der Zugriff darauf im protected-Fall
         - Eine Lösung für dieses Frontend-Problem ist bisher nur mit der hakeligen Vue-Directive VueAuthImage in Sicht
           - Der Build Break auf Heroku damit ist gelöst
           - Sie kann wegen der Vue Directive aber nicht direkt im Markdown verwendet werden!
           - Sie ist QImg (= q-img) von Quasar, das bei mixed Vue + Markdown Content (per VMD, siehe unten) ebenfalls mit Markdown vermischt eingesetzt werden könnte, unterlegen!
         - Aktuell ist wieder die alte Lösung am Backend (Step 4) aktiv
         - Mit dieser sollten kritische Files nicht im Download-Folder liegen und solche, die temporär zum Download dort liegen, sollten per Timer gelöscht werden (Heroku löscht sie nach 24 Stunden)
       - Für am Frontend liegende Files wäre eine Absicherung kritischer Files über den asset statt statics Folder möglich (z.B. für den Beta Quickstart Guide) - siehe oben
         - Zugriff auf diesen protected Folder kann über Quasar q-img erfolgen, vermutlich auch über q-btn (mit Tilde in der URL für die source Prop)
         - Insofern ist dies auch nur eine Lösung für Links außerhalb des Markdowns (oder bei der Möglichkeit, Vue/Quasar-Content und Markdown zu mischen, siehe unten)
       - Mittelfristig läuft es vermutlich über eine Umgestaltung von dokumentation.vue im Zusammenspiel mit bim-click-dokumentation.md hinaus:
         - Markdown muss entweder intermittierend mit in dokumentation.ve per q-markdown eingebettet werden und dann mit anderen Komponenten, speziell q-img "gemischt" werden
         - Dann kann dort überall für Links q-img verwendet werden, normalerweise mit Link auf den protected asset-Folder am Frontend
       - Für die fachliche Hilfe, die aus purem Markdown aufgebaut ist (editierbar durch Admins) ist diese Lösung nicht möglich
         - Für diese wäre allerdings die "Step 5"-Lösung ebenfalls nicht tauglich, da aus Markdown-Links nicht auf protected Content zugegriffen werden kann
         - Selbst die VueAuthImage Directive hilft dabei nicht, da sie auf Vue basiert
       - Alternativ gibt es allerdings in QMarkdown auch einen "VMD Importer", der es erlaubt, Vue und Markdown Content vermischt zu verwenden!
         - Das dürfte mittelfristig die beste Lösung sein, zumal es auch einige andere Probleme beim Scrollen und Springen in der Dokumentation lösen dürfte!
         - Siehe dazu https://forum.quasar-framework.org/topic/5012/qmarkdown-extension-how-to-link-and-scroll-within-the-markdown-without-reloading-page/5
         - Siehe auch https://quasarframework.github.io/quasar-ui-qmarkdown/docs#importing-vue%2Bmarkdown-(.vmd) - mixed Vue + Markdown Content kann so ohne Installation
           weiterer Pakete (d.h. dieser Support kommt durch QMarkdown) direkt per .vmd-File benutzt werden aus dokumentation.vue, ähnlich
           wie Dateien mit reinem Markdown-Content, die von q-markdown angezogen wird!
         - Nach einem Post von Hawkeye kann man in solchen vmd-Dateien dann q-btn und q-img, d.h. Quasar Components, mit dem Markdown mischen
         - Da diese per :src und "Tilde" in den URLs auch Links in den protected assets Folder verwenden können, könnte damit auch dort statt auf Backend Files zu verweisen, diese aus dem
           protected assets Folder am Frontend entnommen werden - Bingo!
         - Das hakelige vue-auth-image wird dann nicht benötigt!
         - ==Dies positiv verifiziert in dokumentation.vue mit VMD-Testkomponente vmd-test.vmd (liegt im markdown-Unterordner)==
           - Diese angelegt nach Instruktionen auf https://quasarframework.github.io/quasar-ui-qmarkdown/docs#importing-vue%2Bmarkdown-(.vmd)
           - Es hakte anfangs etwas (fehlendes abschließendes div-Tag in der Vorlage), Naming für die Komponente musste angepasst werden
           - Es funktioniert aber dann perfekt!
           - ==q-img kann so statt den unflexiblen HTML-/Markdown-Links eingebettet werden in den Markdown und sowohl Bilder aus dem protected assets Folder aus dem Frontend laden, als auch
             mit Authorization Header und Bearer Token (muss in mounted() gesetzt werden auf dem Backend Server im ggf. protected (Step 5) download Folder dort!==
         - Bei **QBtn** findet sich allerdigs kein Hinweis, dass auch dort obige Tilde-Lösung möglich ist in href, z.B. zur Anzeige eines PDFs aus dem assets Folder - ein Test dafür verläuft
           ebenfalls negativ! QBtns im Markdown könnten trotzdem nützlich sein zur Anzeige von PDFs in anderen Ordnern oder für Sprünge in der Doku oder auf andere Sites.
           - Siehe https://github.com/quasarframework/quasar/discussions/12548
           - Siehe https://quasar.dev/quasar-cli/handling-assets#introduction
           - Siehe https://stackoverflow.com/questions/55290663/how-to-put-a-link-to-assets-pdf-in-vuejs - asset Folder funktioniert für Images, nicht für PDFs...diese müssen in den
             statics Folder, wenn sie mit href angessprochen werden sollen, laut der Antwort dort! hhrefs sind URLs, keine Assets...
           - Ein neuer Test mit **QPdfViewer** Quasar App Extension ist allerdings auch negativ - bringt "Cannot GET" bei Versuch, PDF aus assets statt statics Folder anzuzeigen!
           - Mehrere StackOverflow Posts, die darauf hinweisen, dass man einen WebPack Loader für PDFs bräuchte, um das href-Problem zu lösen!
             - Erste Versuche damit aber erfolglos
               - Z.B. https://stackoverflow.com/questions/46239945/server-a-static-pdf-vue-cli-webpack-issue
             - https://stackoverflow.com/questions/36643649/serving-static-pdf-with-react-webpack-file-loader brachte die Lösung!
               - ==q-btn mit href auf PDF im protected assets Folder, welches durch Webpack Loader und computed-Funktion geladen wird==
               - Erfordert:
                 - a) Webpack PDF Loader - musste in quasar.conf.js in extendedWebpackConf eingetragen werden - siehe dort
                   - Anleitung dafür: https://quasar.dev/quasar-cli/handling-webpack#installing-loaders
                 - b) Oben: import MyPDF from ("../assets/LBO_BW.pdf")- Test-PDF in protectd assets Folder
                 - c) In data(): myPDF: MyPDF,
                 - c) In computed: computeMyPDF, welches this.myPDF returned
                 - d) Im Template: q-btn mit type="\_a" und :href="computeMyPDF">
           - Die hakelige VueAuthImage Directive könnnte so zwar auch im Markdown benutzt werden, ist aber die schlechtere Wahl vs. QImg
       - https://code-farmer-i.github.io/vue-markdown-editor/ - alternativer, Vue basierter Editor für VMD - könnte man auch noch einbauen zum Editieren von Markdown
       - Welche Files dann (in assets gesichert) am Frontend liegen (Doku), und welche künftig entweder "per Step 4" offen (z.B. die "echten", temporären Download-Files, die
         aber nach 24 h regulär austimen, bzw. mit Timer eventuell sogar schneller) oder "per Step 5"
         gesichert am Backend liegen sollten (Bauinformationen?, fachliche Hilfe? (aber dann dafür ebenfalls andere Lösung für Links wie bisher nötig!)), ist noch zu entscheiden
         - Da interne Links auf Bauinformationen per q-btn geladen werden, was mangels "Tilde-Support" keinen Authorization Header mitschickt, gibt es damit bei der "Step 5"-Variante
           auch Probleme!
         - Das wird auch in dem QBtn zum Beta Quickstart PDF so gemacht - dort kommt mit "Step 5"-Lösung auch "Unauthorized", wie ein Test zeigt!
       - ==Es ist auch zu testen, ob mit Step 5 überhaupt noch der normale Download von exportierten Files aus diesem Folder funktioniert!==
         - ==Und siehe da: Ein Sniff Test bringt bei aktiviertem Step 5 für den Download File Folder in back-end-server.js ein "Unauthorized"!==
       - ==Daher scheidet diese "Step-5-Lösung" wohl aus mehreren Gründen vorläufig aus!==
       - ==Daher Step 4 wieder aktiviert am Backend Server!==
     - ==**Zusammenfassung**==:
       - ==Es gibt am Frontend für **QBtn** obige Webpack/import/computed href-Lösung für href-Links auf PDFs im protected asset Folder!==
         - Diese funktioniert aber nicht mit protected Files aus dem Backend!
       - ==Es gibt am Frontend für **QImg** die "Tilde-Lösung" zum Zugriff auf Images im protected asset Folder!==
       - vueAuthImage o.ä. wird nicht benötigt, allerdings müsste zur Verwendung von QImg mit Tilde-Lösung im Markdown wohl am Besten VMD-Support von QMarkdown verwendet werden (siehe oben)
       - Am Backend muss der download Folder wohl unprotected bleiben (d.h. "Step 4" Lösung), deshalb muss dort über Timeout von Download Files nachgedacht werden, sowie die Security
         von Dateien, die in fachlicher Hilfe angezogen werden, sowie vor allem für interne Links aus Bauinformationen (ebenfalls q-btns mit hrefs, aber auf remote Files)
392. ==**[TODO]**== (Prio 3) Im Heroku Server Log kommen beim Server Restart nach Build Warnungen "Accessing non-existent property ... of module exports inside circular dependency"
     Ursache sind vermutlich zirkuläre requires im Backend Code: https://stackoverflow.com/questions/64713565/accessing-non-existent-property-padlevels-of-module-exports-inside-circular-de
393. ==**[TODO]**== ==**Container Item/Bucket**== für ausstehende größere Arbeitspakete in BIM.click
     - ==**[WORK]**== Baustoffe: Neuer Baustoffbaum, Baustoff-Baueigenschaften, -Profile, -Profilformulare (auf Basis des layoutgesteuerten generischen Profilformulars)
     - "Baueinheit > Raum": Weitere Baueigenschaften und Tabs, beginnend nach "Lasten"
     - Raum-Nutzungsprofile: Solche im System anlegen, mit Vorgabewerten, Mechanismus zur Umschaltung und Initialisierung mit Vorgabewerten, Review: Wie soll "außen" reflektiert werden?
     - Trennbauteile: Wand/Boden (begonnen mit "Wand", ausstehende Fragen: Siehe #387, inklusive **Musterbaueinheiten/-baustoffe**)
     - Überarbeitung Bodenaufbauten mit Schicht (Baueigenschaften, Layout, Verzahnung mit Boden "von oben" und Schichten "von unten", Überarbeitung von Schichttypen/Schichtpaketen)
     - Wandaufbauten mit Schichten nach selbem Prinzip wie Bodenaufbauten
     - "Hochzeit": Übetragungen von Werten von Baustoffbaueigenschaften nach Baueinheitsbaueigenschaften ("korrespondierende Baueigenschaften", Mechanismus ist vorhanden)
       - Beispiel Nachhaltigkeit/Umweltverträglichkeit/Ökobilanz:
         - Dort könnte man bestimmte Baustoffeigenschaften, die durch ein DGNB-Nutzungsprofil oder ein sonstiges Nutzungsprofil (BNB, NBBW, RELM, LEED?) definiert sein könnten,
           in korrespondierende Baueinheitseigenschaften übertragen
         - Dabei könnten auch Berechnungen erfolgen, z.B. die Berechnung einer Herstellungs-/Entsorgungs-/Instandhaltungsenergie aus bestimmten Maßen (siehe E-Mail vom 25.02.2020) sowie
           eventuell einer Nutzungsdauer am Gebäude
     - "Filtern": Laden von Sollwerten aus Baueinheit als Filterkriterien für Baustoffe ("korrespondierende Baueigenschaften", Mechanismus ist vorhanden), Unterstützung von Wertepaaren - dabei
       zweite Prop für Operator erforderlich im Model für die wertbezogenen Baueigenschaften
     - Export von Excel-Bauteilkatalogen
     - Export von Word-Planungsgutachen
     - Export nach Revit mit Attributierung
     - Import aus CAD (mit abstractBIM?)
     - Bauelemente (Prio 3, vorher Vorlagen ausprobieren)
     - Unterstützung des DGNB-Systems für eine frühzeitige nachhaltige Planung und Nachweisführung als Resultat dieser Planung - Priorisierung erforderlich
       - DGNB-Strukturen im eLCA-Web-Tool sind durch die DIN 276 Kostengruppen bestimmt
         - 3 Schichtpakete z.B. für Decken/Wände
         - 351/352/353/359
         - Haustechnik ist in eLCA vernachlässigbar
       - DGNB-Kriterien/Attribute sind in ÖkoBauDat (XML) festgelegt
         - https://www.oekobaudat.de/
         - https://www.oekobaudat.de/service/downloads.html
         - https://www.oekobaudat.de/fileadmin/downloads/Einreichung/2021-04-01_ILCD-EPD-CP-2020_de.pdf
         - https://www.oekobaudat.de/fileadmin/downloads/Einreichung/2021-05-19_FAQ_ILCD-EPD_CP-2020_A2_de.pdf
         - Tool: Es gibt einen openLCA-basierten EPD Editor
         - Basiert auf EU ILCD-Datenformat mit Erweiterungen für DIN EN 15804
       - In viele Berechnungen gehen Massen/Maße ein, die Dicke ist bei Schichten entscheidend, Berechnungen erfolgen bezogen auf 1 m2
       - ENV 1.1 (Ökobilanz, LCA)
         - BNB: eLCA ist verpflichtend
         - DGNB: eLCA ist nicht verpflichtend, auch andere Tools könnten zertifiziert werden (z.B. BIM.click)
         - Eriks Vorarbeit bzgl. Baustoffattributen bezieht sich vorwiegend auf ENV 1.1
         - Zusätzlich gibt es von Fraunhofer die Web-Anwendung **Generis** zur Ökobilanzierung, siehe Epic 38.i
       - ECO 1.1 (Lebenszyklus, LCC)
       - ENV 1.2 (Umweltrisiken): Export nach Excel, 4 Qualitätsstufen
       - ENV 1.3 (Nachhaltige Ressourcengewinnung): Export nach Excel
       - TEC 1.6 (Rückbaubarkeit)
       - Edit:
         - ENV 1.1 (LCA) ist komplex, es gibt bereits viele Tools dafür, sowie das eLCA vom BBSR - daher eher nicht höchste Priorität
         - Die Logik für ENV 1.2, 1.3 und TEC 1.6 könnte man direkt in BIM.click integrieren
         - ECO 1.1.: LCC-Berechnungen sind einfach, haben aber geringere Priorität
         - Alternativ: Schnitttellen zu den DGNB-Tools (Excel?)
       - Was sind jeweils die Zielgruppen (Personas)?
         - Nachhaltigkeits-Auditoren (Vorschlag von Kathrin Quante, Zsoka hatte Bedenken, allerdings eher in die Richtung, dass die Planer die Daten erfassen sollten, nicht die Auditoren)
       - ==Es macht wenig Sinn, die Daten nachgelagert zur Planung zu erfassen, sie müssen bereits frühzeitig in die Planung einfließen, damit die Planung die
           Nachhaltigkeitsanforderungen erfüllt!==
         - ==Das könnte der entscheidende Added Value von BIM.click für DGNB sein!==
       - DGNB-Partnering-Optionen (Anna Braune)
          - Es gibt eine Kategorie "Anerkannte Dienstleistung" bei DGNB, Beispiel: GIB, haben Betriebsgenehmigung, Bronze-Level
          - Es gibt "Taxonomie-Verifikation" (EU?), Umfang ist überschaubarer
394. **[DONE]** (Prio 2) Nach Bewegen von Schichten im Bodenaufbau kann es passieren, dass selectedSchicht falsch gesetzt bleibt - danach
     kann indexInAggregationsKnoten an beteiligten Knoten am Backend falsch werden, so dass keine weiteren Bewegungen mehr möglich sind
     (Corruption)! Mit Stefan gefixt, siehe #394 im Frontend (baueinheiten.vue und Bodenaufbau, Callback-Funktion für Refresh eingebaut,
     die aufgerufen wird nach einem Refresh, ausgelöst durch neues Event refresh-request-with-callback-for-selected-schicht, welches
     von baueinheit-bodenaufbau-baueigenschafts-profil-formular.vue an baueinheiten.vue emittiert wird). ==**Achtung**==: Der Refresh
     dauert länger als die Anzeige der Erfolgsnachrichten, insbesondere das Refreshen der Kindknoten für die Schichten links
     im Baum!
395. **[DONE]** (Prio 3) Die **Admin-Funktionen für wertbezogene Baueigenschaften** an Baueinheiten und Baustoffe sollten angepasst werden für die selektive Anlage
     von (wertbezogenen) Baueigenschaften in beiden oder nur einem der Bäume:
     - "Baueigenschaft neu anlegen" legt die Baueigenschaft aktuell bereits selektiv im jeweiligen Baum an - damit kann erreicht werden, dass Baueigenschaften
       nicht überall angelegt werden, sondern
       nur selektiv an einem der beiden Bäume (Performance- und Speicher-Gewinn!)
     - Allerdings gibt es aktuell dort noch keine Möglichkeit, eine Baueigenschaft wahlweise auch in beiden Bäumen anzulegen - diese gibt es allerdings bereits
       in "Baueigenschaften" im Hauptmenü, wo
       die typbezogenen Baueigenschaften verwaltet werden, sowie beim Import, wo dies über eine Property an der importierten Baueigenschaft erfolgt (baumTyp: "Baustoffbaum" oder "Bauvorhabenbaum" oder "Allgemein) - daher hat eine solche Funktion keine Dringlichkeit
     - Alt: "Baueigenschaft löschen" löschte die Baueigenschaft als wertbezogene Baueigenschaft bisher in beiden Bäumen und anschließend die typbezogene
       Baueigenschaft in der BaueigenschaftenCollection (Methode baueigenschaften.controller.deleteBaueigenschaft())
     - Neu: Hier ist es ebenfalls wünschenswert und wegen fehlender Alternative sogar dringlich, dass die Löschung der wertbezogenen Baueigenschaft so wie die
       symmetrische Neuanlage nur noch im jeweiligen Baum erfolgt
       - ==**Achtung**==: Bei Baueigenschaften, die nur in diesem Baumtyp angelegt wurden, kann dann eine "leere" typbezogene Baueigenschaft übrig bleiben!
       - Diese kann jedoch in "Baueigenschaften" mit der dortigen Löschfunktion endgültig gelöscht werden
     - Dazu zweiten Parameter und gleichnamigen Request-Parameter am API eingeführt:
       wertBezogeneBaueigenschaftenLoeschenInBaumTyp - "Allgemein", "Baustoffbaum", "Bauvorhabenbaum", an baueigenschaften.controller.deleteBaueigenschaft()
     - Mit dieser neuen Funktionalität können dann selektiv auf Heroku wertbezogene Baueinheits-Baueigenschaften im Baustoffbaum gelöscht werden, so dass
       dort nur noch die wirklichen Baustoff-Baueigenschaften übrig bleiben (Performance!)
     - ==**[DEFER]**== Damit fehlen allerdings noch Funktionen, mit denen für existierende typbezogene Baueigenschaften wertbezogene Baueigenschaften
       nachträglich angelegt werden könnten, wenn diese bei der Erstanlage "vergessen" wurden - dies hat allerdings keine hohe Priorität!
396. **[DONE]** (Prio 3) **Neu-Laden des Baustoffbaums auf Heroku mit neuer Gliederung**
     - Aus Excel erzeugt: baustoffe_import_2022_03_03.json - lokalen Import getestet mit neuem Agenda-Job-Import, in Verwaltung, Test Area 2
     - Hochgeladen nach Heroku
     - Dort müssen zuerst die Baueigenschaften an allen Baustoffen bereinigt werden - alle Baueinheitsbaueigenschaften an Baustoffen löschen
       - Dazu temporäre Controller Methode und API: baueigenschaften.controller.deleteBaueinheitsBaueigenschaftenAnBaustoffen
     - Dies auf Heroku durchgeführt
     - Anschließend Import auf Heroku
       - Dabei gab es beim ersten Import Probleme, vermutlich weil Parents broken waren aufgrund falscher JSON aus Excel
       - Die gesamte JSON nochmals neu erzeugt
       - Testweise lokal importiert - alles okay
       - Beim zweiten Versuch, diese JSON auf Heroku zu importieren:
         - Dieser läuft dann ohne Fehler durch, er dauert mit den reduzierten Baustoffbaueigenschaften ca. 25 Minuten für ca. 5.300 Baustoffe
         - Allerdings gibt es mehrere merkwürdige Phänomene/Abweichungen zum lokalen Import:
           - **[DONE]** Die "Bauelemente" kommen in der Anzeige am Frontend vor den "Schichtbaustoffen"
             - Dies kann von MongoDB Cloud Atlas wegen anderer Ids verursacht sein - die Reihenfolge wird von MongoDB nicht garantiert!
             - Einstweilen belassen, könnte eventuell per Sort auf der ersten Kindebene des Baustoffbaums am Backend oder Frontend mitigiert werden
             - Später gefixt per Hack in baustoffe.controller.readBaustoffeById(), .readKindKnotenBaustoff() und .readExtraktBaustoffe()
           - Es gibt am Ende einen zweiten Knoten "Bauelemente" am Ende als Blattknoten
           - Die Ursache bleibt unklar, es könnte ein Relikt aus dem ersten fehlgeschlagenen Import sein - allerdings löscht der Import alle
             Baustoffe außer dem Wurzelknoten, was dagegen spricht!
           - Diesen manuell gelöscht
           - Es gibt ganz am Anfang einen Blattknoten mit Baustoffbezeichnung "blank"
             - Dieser wird nur im Extrakt für die Baustoffe in "Zugeordnete Baustoffe" von "Baueinheiten" angezeigt, als Blattknoten
             - Dieser ist von einem Pfad her ein Unterknoten des Wurzelknotens
             - Er enthält aber im Pfad auch teilweise nicht existierende Knoten
             - Manche seiner Knoten im Pfad existieren aber durchaus!
             - Er stammt aus dem Unterzweig "Fassaden", wo es tatsächlich einen Knoten mit
               dieser Bezeichnung "blank" gibt, der auch korrekt importiert wurd
             - Manche seiner Knoten im Pfad sind durchaus korrekt!
             - Diesen ebenfalls manuell gelöscht
             - Die Ursache bleibt unklar
397. **[DONE]** (Prio 2) Auf Heroku: Wert für Bemessungswasserstand eintragen in "Standort" > "Hydrogeologie". Dann in "Geschoss" "Speichern" drücken.
     Danach wird offenbar im Backend der Bemesssungwasserstand zwar korrekt am Geschoss eingetragen, aber am Standort wird er auf null gesetzt (undefiniert in
     BIM.click-Terminologie). Backend Server Log zeigt, dass die Funktion baueigenschafts-profile-aktivierungs-logik.pruefeWertgleichheit() beim
     Vergleich dieser beiden Baueigenschaften Ungleichheit zurückliefert (false), weil die Funktion arrayCompare für Aufzählungswerte offenbar
     fälschlich false zurückliefert, weil beide Felder aufzaehlungsWert null sind. Tatsächlich liefert diese Funktion dann false zurück.
     Daher diesen Fall vor Aufruf von arrayCompare auf true ausgesteuert.
398. **[DONE]** (Prio 3) Bei Auruf des Profilformular für "Standort" gibt es im Tab "Hydrogeologie" im Browser Log einen Fehler "undefined (reading 'map')" bei einer QOptionGroup. Bringt
     aber ansonsten keine erkennbaren Probleme. Grund: In der dortigen Rubrik 4 waren die Indizes der QOptionGrup für "Bodenbedingte Risiken am Standort" falsch,
     korrigiert.
399. **[DONE]** (Prio 2) Im Baustoffbaum:
     - Aufzählungswert "Einbauart" an "Zementestriche" auf "erdfeucht" setzen, speichern (Baueigenschaft ist damit definiert)
     - Dudurch wird (selbes Profil ist aktiviert) Aufzählungswert "Einbauart" am Kindknoten "erdfeucht (CT)" ebenfalls auf "erdfeucht" gesetzt (ist damit definiert)
     - Den Aufzählungswert "Einbauart" an "Zementestriche" ausnullen, Speichern
     - Anschließend:
       - Fehler: An "Zementestriche" (ausgewählter Knoten) ist Wert von "Einbauart" anschließend leer (vermutlich []), aber die Baueigenschaft ist weiter definiert!
       - Am Kindknoten "erdfeucht (CT) bleibt "Einbauart" definiert und Wert auf "erdfeucht" - dies ist korrekt!
     - Analyse: 
       - In baueigenschafts-profile-aktivierungs-logik.schreibeInhalteAusProfilformular() liefert die Prüfung pruefeWertgleichheit() für diese Baueigenschaft "true" - die betreffende 
         Property aufzaehlungsWert ist an beiden durch diese Funktion verglichenen Knoten ein leerer Array [], wie das Console Log zeigt
       - Daher liefert der Vergleich Wertgleichheit (true)
       - Eigentlich müsste laut Kommentaren im Code vorher die Baueigenschaft im Elternpfad (inklusive des ausgewählten Knotens!) bereits undefiniert worden sein!
       - Warum ist sie dann am Ende undefiniert - wird es wieder rückgängig gemacht?
       - Anschließend wird definiereBaueigenschaft_10_21() aufgerufen
       - Ursache: Es kommt bereits aus dem Frontend das Feld definiertNichtUndefiert falsch als true mit, obwohl der Wert von aufzaehlungsWert ein leerer Array ist ([]).
         Grund ist eine falsche Klammerung für Aufzählungswerte in allen Prüfungen pruefeDefiniertheitVonEigenschaft() - diese Case überall gefixt in allen Profilformularen und Controllern
       - Ursache 2: Die Abfrage für #397 (null-Prüfung für die Aufzählungswerte beim Vergleich) hatte einen Fehler, diesen ebenfalls gefixt
       - Mit beiden Fixes ist #399 gefixt.
400. ==**[WORK]**== (Prio 3) In den Bäumen: Selektierten Node merken in Benutzerdaten und in Browser Storage. In mounted() und beim Refreshen dann den Baum so laden,
     dass die Knoten auf dem Pfad dorthin, inklusive des Knotens selbst, in den QTree geladen werden (wie beim manuellen lazy Loading), der gemerkete selected Node im QTree ausgewählt wird, dieser ausgeklappt wird, und dessen direkte Kinder ebenfalls (wie beim manuellen lazy Lading) geladen werden.
     Vorlagen dafür in vorhandenen Methoden:
     - baueinheiten.controller.reloadTreeBaueinheit_05_21_nodes_on_path()
       - Route: Baueinheiten/Reload/Nodes, mit req.query.ids
       - Liest alle Knoten auf dem Pfad, ausgewählter Knoten kann mit angegeben werden in req.query.ids
       - Liefert allerdings eine lineare Liste der Knoten im Pfad, aus der am Frontend erst wieder die verschachtelte QTree-Struktur aufgebaut werden muss
       - Wird in baueinheiten.refreshTreeBaueinheitenPerformanceOptimiert() bereits mit dem ausgewählten Knoten selbst aufgerufen!
       - Anschließend wird dort nodesTreeBaueinheiten schrittweise neu aufgebaut (mit Variable currentStage) - die Logik ist allerdings komplex
     - Eventuelle Alternative: 
       - Neue Backend-Methode, die mit getChildrenTree() (MPath-Methode) gleich einen verschachtelten Baum für den QTree an das Frontend liefert,
         analog zu baustoffe.controller.readExtraktBaustoffe() auf Backend-Route Baustoffe/Extrakt
       - Allerdings muss dabei die Population wie in readKindknotenBaueinheit.getImmdediateChildren() erfolgen (typbezogene Baueigenschaften, etc.)
       - Die Response wird in baustoffe.loadTreeBaustoffe() ganz einfach per nodesTreeBaustoffe = response.data an den QTree zugewiesen
       - Allerdings liefert diese Funktion den kompletten Baustoffbaum und ist insofern nicht direkt geeignet
      - ==Man sollte am Backend stattdessen eine spezielle API-Methode implementieren:==
        - Alle Knoten im Pfad holen bis inklusive des ausgewählten Knotens, dabei mit getImmediateChildren() wie beim lazy Loading die Kinder jedes Knotens holen
        - Dabei jeweils die so geholten immediate children dem Array children des jeweiligen Knotens im Pfad zuweisen
        - Den so aufgebauten verschachtelten Baum an das Frontend schicken
      - **[DONE]** Backend-Teil für baueinheiten.controller.js
        - Implementiert in baueinheiten.controller.loadTreeBaueinheitenPfadKnotenMitKindern()
        - Mit neuer API-Route get /baueinheiten/:id/Reload/Pfad
        - Es werden einfachheitshalber auch gleich die lazy-Flags für den QTree am Frontend mitgeschickt (sonst müsste der Baum dort erneut
          traversiert werden, um diese zu setzen)
      - **[DONE]** Frontend-Teil für baueinheiten.vue
        - In my-layout.anmeldenBenutzer() den gespeicherten Wert für selectedKeyTreeBaueinheiten (analog für selectedKeyTreeBaustoffe)
          aus den Benutzereinstellungen laden nach localStorage und localStore
        - In my-layout.created() ab Zeile 5064 ggf. selectedKeyTreeBaueinheiten und selectedKeyTreeBaustoffe aus localStorage holen und ggf. Benutzerdaten per anmeldenBenutzer()
          damit setzen
        - In baueinheiten.mounted() statt wie bisher Wurzelknoten laden aus localStore oder localStorage den gemerkten
          selectedKeyTreeBaueinheiten bzw. selectedKeyTreeBaustoffe holen und obiges API damit aufrufen
        - Das API-Ergebnis in nodesTreeBaueinheiten laden
        - $refs.treeBaueineiten.setExpanded() aufrufen mit dem Pfad des neuen selectedKeyTreeBaueinheiten, um den geladenen Baum aufzuklappen
          - Dieser wurde (Alternative 1) selectedNodeTreeBaueinheiten (computed) entnommen
          - Er könnte auch zusätzlich mit obigem API als Body-Parameter in der Response mitgesendet werden
        - Im watch() für selectedKeyTreeBaueinheiten muss bei dessen Änderung der geänderte Wert gespeichert werden in
          localStorage, localStore und Benutzereinstellungen
        - Bei Abmeldung muss er dann nicht erneut gespeichert werden, sondern nur aus Sicherheitsgründen gelöscht werden in localStorage und localStore
          - my-layout.abmeldenBenutzer()
        - benutzer.model, authentifizierung.controller, global-store.js entsprechend erweitert für selectedKeyTreeBaueinheiten und selectedKeyTreeBaustoffe
      - **[DONE]** Backend-Teil und Frontend-Teil für baustoffe.vue analog implementieren
      - **[DONE]** Handling im mounted() verbessert, indem, wenn das Laden mit dem ausgewählten Knoten fehlschlägt, stattdessen der Wurzelknoten geladen wird
        - Dies ist zum Beispiel der Fall, wenn die Datenbank neu populiert wurde und sich die Wurzelknoten geändert haben. Óhne diese Verbesserung
          musste man mit Compass die Werte für die ausgewählten Knoten auf null setzen in der BenutzerCollection
        - Es kann aber auch auftreten, wenn der ausgewählte Knoten zwischenzeitlich gelöscht wurde!
      - ==**[TODO]**== einstellungen.vue, uebersicht-tab-benutzer.vue und details-tab-benutzer.vue anpassen, um die selectedKeys anzuzeigen - allerdings müsste dann
        baueinheitsBezeichnung bzw. baustoffBezeichnung mit geladen werden per findOne() und angezeigt werden.
401.  ==**[WORK]**== (Prio 3) Umstellung der fachlichen Rubriken von Boolean-Werten auf mehrwertigen Enum-Wert (Array of Strings) aus Strings im Format "Kategorie > Rubrik"
      - Dazu muss dann auch die Anzeige dieser Werte in den QTables,
        z.B. in baueinheiten.vue, umgestellt werden: Diese werden in columnsTableBaueigenschaften als Columns mit type="toggle" angezeigt - dies triggert im Template
        dann die Anzeige einer Checkbox dafür, mittels :value="col.field(props.row)" an diesen Spalten, die zum Array booleanFieldsTypbezogen gehören. In
        columnsTableBaueigenschaften wird für diese Felder per Lambda-Funktion field: row => row.typbezogeneBaueigenschaft.projektManagement das v-model angesteuert.
        Werden diese von Boolean auf Enum umgestellt, muss diese Lambda-Funktion geändert werden nach z.B.
        row => row.typbezogeneBaueigenschaft.fachlicheKategorien.includes("Wirtschaft > Projektsteuerung"), wobei fachlicheKategorien für den neuen Enum-Wert (Array of String) steht.
      - Desweiteren muss in den Details für eine Baueigenschaft die bisherige Anzeige der fachlichen Rubriken umgestellt werden:  Dazu sollten die bisherigen Gruppen von q-toggles
        umgestellt werden auf mehrere q-option-groups mit type="checkbox" mit jeweils eigenem Label für jede Gruppe. Es gilt dann nicht mehr z.B. v-model="ausgewaehlteBaueigenschaft.typbezogeneBaueigenschaft.projektManagement" (Boolean),
        sondern v-model="ausgewaehlteBaueigenschaft.typbezogeneBaueigenschaft.fachlicheKategorien" (Array of Strings). Daneben benötigt jede q-option-group zur Steuerung
        mittels Prop :options einen Array options: [ { label: "Wirtschaft > Projektsteuerung", value: "Wirtschaft > Projektsteuerung", color: "black" }, {..} ], welcher
        steuert, welche Optionen als Checkboxes angezeigt werden - Vorlage z.B. layout-baueinheit-standort-baueigenschafts-profil-formular.js. Diese Struktur kann man in ein zentrales JS-Modul auslagern (Psuedo-JS-Map options-fachliche-kategorien-baueigenschaften.js)
      - Sofern die Updates des VModels fachlicheKategorien (Array of Strings) nicht automatisch durch diese q-option-groups erledigt werden, kann auch direkt der Array of Strings updated werden:
        - Z.B. statt Boolean-Wert auf true setzen: ausgewaehlteBaueigenschaft.typbezogeneBaueigenschaft.fachlicheKategorien.push("Wirtschaft > Projektsteuerung"). 
        - Z.B. statt Boolean-Wert auf false setzen: ausgewaehlteBaueigenschaft.typbezogeneBaueigenschaft.fachlicheKategorien = ausgewaehlteBaueigenschaft.typbezogeneBaueigenschaft.fachlicheKategorien.filter(value => value !== "Wirtschaft > Projektsteuerung").
      - Desweiteren müssen alle typbezogenen Baueigenschaften in der Datenbank migriert werden von den bisherigen Boolean-Werten in den neuen Enum-Wert: Dazu müssen
        alle typbezogenen Baueigenschaften traversiert werden und, wenn eine fachliche Rubrik (Boolean-Wert im Model) true ist, muss der entsprechende String in den neuen
        Array of Strings fachlicheKategorien gepushed werden.
      - Im Sinne eines schrittweisen Implementierung sollte zuerst das Model erweitert werden für das neue Enum-Feld, dann die Controller-Methoden dafür, dann das Frontend (paralleler 
        Support). Danach kann die Datenbank migriert werden, danach kann dann schrittweise der bisherige Boolean-Support umgeschaltet werden auf den neuen Enum-Support.
      - ==Update 12.03.2022==:
        - Controller-Methode baueigenschaften.controller.migriereFachlicheKategorienBaueigenschaften() implementiert (Test-Button in "Verwaltung" > "Test Area 3")
        - BaueigenschaftenModel erweitert um Property fachlicheKategorien als Array of String mit vordefinierten Enum-Werten
        - Lokale Testdatenbank erfolgreich damit migriert (fügt nur die Arrays of String hinzu)
      - ==Update 15.03.2022==:
        - Überall zusätzlich den Array of String typbezogeneBaueigenschaft.fachlicheKategorien (["Kategorie > Rubrik"], ..) implementiert, vorläufig zusätzlich zu den vorhandenen Boolean-Werten
        - In den QTables für Baueigenschaften werden nur noch die Arrays of Strings angezeigt
        - In den Details-Tabs für eine Baueigenschaft werden QOptionGroups mit Checkboxes für die neuen Kategorien/Rubriken angezeigt, zusätzlich zu den QToggles
          für die bisherigen Boolean-Werte
        - In "Verwaltung" > "Test-Area 3" einen Button mit Migrations-Prozedur von den bisherigen Boolean-Werten auf die neuen Werte implementiert
          - Diese Migration zunächst lokal getestet
          - Diese Migration auf Heroku durchgeführt
        - Betroffen sind (siehe Tag #401 im Code):
          - Backend: baueigenschaften.model, baueigenschaften.controller, baueinheiten.controller, baustoffe.controller
          - Frontend: baueinheiten.vue, baustoffe.vue, baueigenschaften.vue, uebersicht-tab-baueigenschaften.vue, details-tab-baueigenschaft.vue,
            baueigenschafts-profile.vue, vorgabe-werte-tab-baueigenschaft-baueigenschafts-profil.vue, options-fachliche-kategorien-baueigenschaften.js
        - Nach einer Übergangsphase können die Boolean-Felder aus sämtlichen typbezogenen Baueigenschaften gelöscht werden, um Platz zu sparen
          - Siehe https://stackoverflow.com/questions/65457791/how-to-remove-a-field-from-all-documents-in-a-collection-using-mongoose
          - Allerdings sollten im Code vorher alle Referenzen auf die Boolean-Felder entfernt werden
            - Im Backend (auch in den Importen, Exporten und der XLS-Erzeugung)
            - Im Frontend
            - Für beide Bereinigungen kann das Tag #401 als Suchargument benutzt werden
            - ==Update 29.03.2022==: Diese Bereinigung am durchgeführt! Zusätliche API-Methode im baueigenschaften.controller implementiert, welche alle
              Schutzkategorien in allen Baueigenschaften in der Datenbank löscht.
            - ==Achtung==: 
              - Die JS-Files am Backend für den Import von Baueigenschaften (Allgemein, Bauvorhabenbaum, Baustoffbaum) enthalten allerdings aktuell
                nur die Boolean-Werte, nicht die entsprechenden Array-Werte (der Array ist noch leer)
              - Wenn man diese in Zukunft wiederverwenden bzw. mit neuen Baueigenschaften fortschreiben will, sollte man sie in die neue Struktur mit Enum-Werten im Feld fachlicheKategorien konvertieren:
                - Dazu könnte man allerdings auch die Export-Funktionen für Baueigenschaften verwenden und die in der Datenbank bereits konvertierten
                  Baueigenschaften als JSON File exportieren, im Tab "Datenaustausch" > "Export" > "Baueigenschaften an Baueinheit/Baustoff"
                - baueinheiten.controller.exportBaueigenschaften() leistet dies bereits! ("*" für Export am Wurzelknoten des Bauvorhabenbaums)
                - baustoffe.controller.exportBaueigenschaften() leistet dies ebenfalls bereits ("*" für Export am Wurzelknoten des Baustoffbaums)
                - Aktuell werden dort noch die Boolean-Werte mit ausgegeben, dies kann jedoch leicht unterdrückt werden!
                - Aus diesen JSON-Files lassen sich JS-Files mit Baueigenschaften, die die befüllten Arrays fachlicheKategorien enthalten, dann einfach erzeugen (ein "Roundtripping" von JS in die
                Datenbank, dort Konvertierung der Boolean-Werte in Arrays per obiger Methode
                migriereFachlicheKategorienBaueigenschaften(), dann Export nach JSON und Konvertierung nach JS):
                - JSON-Datei in VS Code öffnen
                - Mit Strg-a alles auswählen
                - Mit Strg-p+f Command auswählen: Convert JSON to Javascript Object
            - Import einer Testdatei, die nur den Array fachlicheKategorien enthält, ist erfolgreich:
              bim-click-back-end\tmp\upload\baueigenschaften-allgemein-test-import-neue-fachliche-kategorien-1-neue-ohne-alte-schutzkategorien.json
            - Im XLS für die Baueigenschaften neue Spalten und Formeln eingebaut, damit dort die Arrays of String statt der Booleans erzeugt werden können
402.  ==**[WORK]**== (Prio 3) Die Property bezeichnungWerteVererbenderElternknoten in allen Profilformularen ist etwas unglücklich benannt: Sie enthält während 
      ihrer "Herleitung"/Erstellung
      im Array datenstrukturVererbung eine vollständige Baueigenschaft, nämlich die jeweilige Baueigenschaft (wert- und typbezogen) am
      wertevererbenden Elternknoten (falls dieser existiert). Erst am Ende dieser "Herleitung"/Erstellung wird sie ersetzt durch die Baustoff- bzw. Baueinheitsbezeichnung
      des wertevererbenden Elternknoten und ist dann korrekt bzgl. ihrer Benennung (so wird sie auch im Template abgefragt).
403.  ==**[WORK]**== (Prio 3) Im Zuge von #387 (Musterhaftigkeit von Baueinheiten) ist noch offen:
      - **[DONE]** Erweiterung des Profilformulars für "Bodenaufbau" um Rubriken für "Musterhaftigkeit" und "Raumnutzungsnachbarschaften" gemäß
        Folie 12 im Conceptual Design
      - ==**[TODO]**== Auswahl des Nutzungsprofils des Nachbarraums im Profilformular für "Boden", "Wand", "Bodenaufbau", "Wandaufbau" (hat bisher keine auswählbaren Optionen)
      - ==**[TODO]**== Disabling diverser Aufzählungswerte in Abhängigkeit von anderen Aufzählungswerten
      - ==**Achtung**==: Auf Heroku müssen sämtliche Profile deaktiviert und neu aktiviert werden, um in den Genuss der neuen
        Funktionen für "Musterhaftigkeit" und "Raumnutzungsnachbarschaften" zu kommen - die betroffenen Profile enthalten diese
        zwar bereits, aber die neuen Baueigenschaften sind ohne diese Deaktivierung/Aktivierung deaktiviert - deshalb werden
        die betreffenden Felder als disabled angezeigt in den Profilformularen!