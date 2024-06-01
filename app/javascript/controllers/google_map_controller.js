import { Controller } from "@hotwired/stimulus";
var markersArray = [];
export default class extends Controller {
  static targets = [
    "myMap",
    "lat",
    "lng",
    "locationName",
  ];

  async connect() {
    const response = await fetch(
      "/locations.json"
    );
    const data = await response.json();
    // const polylineresponse = await fetch(
    //   "/polylines.json"
    // );
    // const polyline =
    //   "{evGyfxxRHFLLn@k@VUl@g@b@UNIPGTIVGj@Od@E\\E\\CR?jA?PBhCb@|@NV?F@`@JZFVF~@Lv@Vj@Z^VtAgAf@[FEJGK]SHOHOLGB[RUHEBA?C@E@E?A?C?G?EAYIMCEAICMCOAE?G@C?A@A@A@AB?Fv@Vj@Z^VtAgAf@[FEJGJGr@SFC`A[fA[~@YTIB?JEJCTGn@Sl@Sf@OTGHCJAFAJAJAJ?T@PBNBRBZJ`@LZJ\\Jr@VpA`@~@XbAXZHXJv@TFBPDx@Vv@RjBn@b@JRJ`@LB@p@RlA^dBh@v@VND`Bh@@@RDP@TBFAN?XCr@O~@YXGFRhBhIf@hCPlANv@Lv@?DD\\Ht@LdAJt@@JBJPf@X~@Nb@JXN^`@t@PV^d@RTTTLRNTNVHNFPLZJZVdAFXBN@FDb@BNDn@@bA@\\Aj@EdAA\\Cb@[Ms@U_@OeAc@{@_@sAm@QK_Ac@w@[}@]}Ao@YKYKaA]W@I@C@C@GHKLGLADILABABC@Kb@M`@La@Jc@?E?C@AHU@?DMBIBK?Q?CAEMSm@WyCqAk@SSIMEQIy@[EAo@UQI{@[KGq@WWK_CaAsBy@c@fAIZq@hBMVQZMRQPIHOJMFSHUHi@NeAZ]JSFSDODUFQB[BM@]@G?i@@iDD{CDU?w@A[?WAI?GAMCMC]K]KaEqACAQCIAIAMA[?i@BPxEv@v@DDFDDF@@?B?@?BCDGJIHEFEBEACAECKKEEEGCG?e@?o@QyE?Mn@AX?L@L@TD@@nCt@nA^^JLBLBH@H?b@?fA?Ba@@W?U?y@Ai@E{D?e@CmCC{@?iA?YB{@?qDCaBS?U?iACa@?i@CE?D?h@B`@?hABT?R?PA`A?bCErAAbA@N@F?FAF?HAHCFCJKFW@[Bc@?Q@MBIDKBE@ABCFCXKNEf@Ov@UXKj@Qn@UZKz@SxAe@n@SKa@Qq@Kc@AS?O?UBUDYRm@`@iAFSLa@@CV{@H]FU@EDU@Y?WAS?AAOCSEUGSEK?AOY_@m@S[Y[[]A?_@[YUYO]S]M_@Oe@Kc@KUC@MDk@Bs@@e@@k@?S@W@S@MBM@KDQHYHSHQJSJMRQJKJKl@m@h@u@H]?E?EAM@C?CqAiACCyAuAW^OOUOMGU?[?O?ICEACEUUAAC?AAC?A?o@@kA@jAAn@A@?B?@@B?@@TTBDD@HBN?Z?T?LFTNNNV_@aBuAGEq@k@_@]aC{Bg@g@m@i@o@k@o@i@C@EAE?EAE?G?G@E?SLg@RUFWDi@BmABa@@O?W@i@@U?wABQ@sADY?U@MAS?i@@C?W?g@@}@@i@@wCD@v@?R@B?@@B@@@@B@B@b@CRAZCdAARAP?@?@@@?@?@B@@B@@D?D@J@V?@BvD@DDDBN?RBZ?b@Ab@DnAClAANyA?DxA?ZRAJ?z@?RAN?f@h@^`@TT?@@@?@?@A@[^Z_@@A?A?AAA?AUU_@a@g@i@O?S@{@?K?S@?[EyAwCFS?{@?_A@eDDw@Dc@DG?A??@A??@A?A?A??@A?AAA?A?[NE@GDKDIFA@GFIHy@`AWZ_@`@Y\\YZYXIIw@q@OSGKGMWm@O_@Qa@Wm@_@{@CGYk@_@NFNDJf@jAFJN\\Zr@\\t@DNFJ?@?AGKEO]u@[s@O]GKg@kAEKGO^OXj@BF^z@Vl@P`@N^Vl@FLFJNRv@p@HHs@p@CDABEDGLCHABCJAHAJAP?j@@f@?\\A~@ATCPEPCHEJEJGJs@x@WZeAlAeDbEdAlAn@t@`@f@ZXx@x@\\\\RT@@HDZN\\L\\LlAX~@TJBPi@HUHQLS?AJOZe@FIZa@PSMMIG";
    // const polyline =
    //   await polylineresponse.json();
    this.initMap(data);
  }

  async initMap(data) {
    let lat = data[0].ltd;
    let lng = data[0].lng;
    const position = { lat, lng };
    let mapId = this.myMapTarget;

    const { Map } =
      await google.maps.importLibrary("maps");

    let map = new Map(mapId, {
      center: position,
      zoom: 15,
    });
    // var encoded_path = polyline;
    var encoded_path =
      "{evGyfxxRHFLLn@k@VUl@g@b@UNIPGTIVGj@Od@E\\E\\CR?jA?PBhCb@|@NV?F@`@JZFVF~@Lv@Vj@Z^VtAgAf@[FEJGK]SHOHOLGB[RUHEBA?C@E@E?A?C?G?EAYIMCEAICMCOAE?G@C?A@A@A@AB?Fv@Vj@Z^VtAgAf@[FEJGJGr@SFC`A[fA[~@YTIB?JEJCTGn@Sl@Sf@OTGHCJAFAJAJAJ?T@PBNBRBZJ`@LZJ\\Jr@VpA`@~@XbAXZHXJv@TFBPDx@Vv@RjBn@b@JRJ`@LB@p@RlA^dBh@v@VND`Bh@@@RDP@TBFAN?XCr@O~@YXGFRhBhIf@hCPlANv@Lv@?DD\\Ht@LdAJt@@JBJPf@X~@Nb@JXN^`@t@PV^d@RTTTLRNTNVHNFPLZJZVdAFXBN@FDb@BNDn@@bA@\\Aj@EdAA\\Cb@[Ms@U_@OeAc@{@_@sAm@QK_Ac@w@[}@]}Ao@YKYKaA]W@I@C@C@GHKLGLADILABABC@Kb@M`@La@Jc@?E?C@AHU@?DMBIBK?Q?CAEMSm@WyCqAk@SSIMEQIy@[EAo@UQI{@[KGq@WWK_CaAsBy@c@fAIZq@hBMVQZMRQPIHOJMFSHUHi@NeAZ]JSFSDODUFQB[BM@]@G?i@@iDD{CDU?w@A[?WAI?GAMCMC]K]KaEqACAQCIAIAMA[?i@BPxEv@v@DDFDDF@@?B?@?BCDGJIHEFEBEACAECKKEEEGCG?e@?o@QyE?Mn@AX?L@L@TD@@nCt@nA^^JLBLBH@H?b@?fA?Ba@@W?U?y@Ai@E{D?e@CmCC{@?iA?YB{@?qDCaBS?U?iACa@?i@CE?D?h@B`@?hABT?R?PA`A?bCErAAbA@N@F?FAF?HAHCFCJKFW@[Bc@?Q@MBIDKBE@ABCFCXKNEf@Ov@UXKj@Qn@UZKz@SxAe@n@SKa@Qq@Kc@AS?O?UBUDYRm@`@iAFSLa@@CV{@H]FU@EDU@Y?WAS?AAOCSEUGSEK?AOY_@m@S[Y[[]A?_@[YUYO]S]M_@Oe@Kc@KUC@MDk@Bs@@e@@k@?S@W@S@MBM@KDQHYHSHQJSJMRQJKJKl@m@h@u@H]?E?EAM@C?CqAiACCyAuAW^OOUOMGU?[?O?ICEACEUUAAC?AAC?A?o@@kA@jAAn@A@?B?@@B?@@TTBDD@HBN?Z?T?LFTNNNV_@aBuAGEq@k@_@]aC{Bg@g@m@i@o@k@o@i@C@EAE?EAE?G?G@E?SLg@RUFWDi@BmABa@@O?W@i@@U?wABQ@sADY?U@MAS?i@@C?W?g@@}@@i@@wCD@v@?R@B?@@B@@@@B@B@b@CRAZCdAARAP?@?@@@?@?@B@@B@@D?D@J@V?@BvD@DDDBN?RBZ?b@Ab@DnAClAANyA?DxA?ZRAJ?z@?RAN?f@h@^`@TT?@@@?@?@A@[^Z_@@A?A?AAA?AUU_@a@g@i@O?S@{@?K?S@?[EyAwCFS?{@?_A@eDDw@Dc@DG?A??@A??@A?A?A??@A?AAA?A?[NE@GDKDIFA@GFIHy@`AWZ_@`@Y\\YZYXIIw@q@OSGKGMWm@O_@Qa@Wm@_@{@CGYk@_@NFNDJf@jAFJN\\Zr@\\t@DNFJ?@?AGKEO]u@[s@O]GKg@kAEKGO^OXj@BF^z@Vl@P`@N^Vl@FLFJNRv@p@HHs@p@CDABEDGLCHABCJAHAJAP?j@@f@?\\A~@ATCPEPCHEJEJGJs@x@WZeAlAeDbEdAlAn@t@`@f@ZXx@x@\\\\RT@@HDZN\\L\\LlAX~@TJBPi@HUHQLS?AJOZe@FIZa@PSMMIG";
    var decoded_path =
      google.maps.geometry.encoding.decodePath(
        encoded_path
      );

    var setRegion = new google.maps.Polyline({
      path: decoded_path,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: map,
    });
    setRegion.setMap(map);

    // Clear existing markers
    this.clearMarkers();

    // Add new markers
    for (let i = 0; i < data.length; i++) {
      const marker = this.addSingleMarker(
        {
          lat: data[i].ltd,
          lng: data[i].lng,
        },
        map,
        i + 1
      );
      markersArray.push(marker);
    }
  }

  addSingleMarker(position, map, index) {
    return new google.maps.Marker({
      position,
      map,
      title: `This is marker ${index}`,
      label: `${index}`,
    });
  }

  clearMarkers() {
    markersArray.forEach((marker) => {
      marker.setMap(null);
    });
    markersArray = [];
  }

  decodeLevels(encodedLevelsString) {
    var decodedLevels = [];
    for (
      var i = 0;
      i < encodedLevelsString.length;
      ++i
    ) {
      var level =
        encodedLevelsString.charCodeAt(i) - 63;
      decodedLevels.push(level);
    }
    return decodedLevels;
  }

  updateCordinate(event) {
    if (
      event.currentTarget.dataset
        .googleMapTarget === "lat"
    ) {
      this.initMap(
        parseFloat(event.currentTarget.value),
        parseFloat(this.lngTarget.value)
      );
    } else {
      this.initMap(
        parseFloat(this.latTarget.value),
        parseFloat(event.currentTarget.value)
      );
    }
  }
}
