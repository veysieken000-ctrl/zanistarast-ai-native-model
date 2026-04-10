(() => {
fonksiyon normalize(ham) {
eğer (!raw) ise {
geri dönmek {
Cevap: "Cevap yok",
sınıflandırma: "Yok",
meta: "Henüz kaynak meta verisi yok."
};
}

sabit cevap =
ham.cevap ||
ham.yanıt ||
ham çıktı ||
"Cevap yok";

sabit sınıflandırma =
ham.sınıflandırma ||
ham etiket ||
"Hiçbiri";

sabit meta =
ham.meta ||
ham.meta veriler ||
ham kaynak ||
"Henüz kaynak meta verisi yok.";

geri dönmek {
cevap: Dize(cevap),
sınıflandırma: Dize(sınıflandırma),
meta: Dize(meta)
};
}

fonksiyon applyResponse(raw) {
sabit ayrıştırılmış = normalize(ham);

if (window.UIRenderer) {
if (typeof window.UIRenderer.typeAssistantMessage === "function") {
window.UIRenderer.typeAssistantMessage(parsed.answer, 10);
} aksi takdirde (typeof window.UIRenderer.appendAssistantMessage === "function") {
pencere.UIRenderer.appendAssistantMessage(parsed.answer);
}
}

if (window.UIStatus) {
if (typeof window.UIStatus.setSystemStatus === "function") {
pencere.UIStatus.setSystemStatus("Bitti");
}
}
}

işlev applyError(error) {
konsol.hata(hata);

if (window.UIRenderer) {
if (typeof window.UIRenderer.typeAssistantMessage === "function") {
window.UIRenderer.typeAssistantMessage("Hata", 10);
} aksi takdirde (typeof window.UIRenderer.appendAssistantMessage === "function") {
window.UIRenderer.appendAssistantMessage("Hata");
}
}

if (window.UIStatus && typeof window.UIStatus.setSystemStatus === "function") {
window.UIStatus.setSystemStatus("Hata");
}
}

pencere.AIResponse = {
normalleştirmek,
Yanıtı uygula,
Hata uygula
};
})();
