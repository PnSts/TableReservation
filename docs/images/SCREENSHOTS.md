# README screenshots

Language: English (the application is English only).
Devices: phone and desktop, side by side (responsive website).
Captured by `tests/readme-screens/capture.cjs` from the GitHub Pages demo
(`BASE_URL=https://pnsts.github.io/TableReservation`); the site has no backend and no stored data.

| File | Screen | Size | Data and state | Source behind it |
|---|---|---|---|---|
| home-desktop.png | Home page, top | 1280×1000 | Static content, page at the top | src/components/Header.js, src/components/Home/HeroSection.js, src/components/Home/SpecialsSection.js, src/components/header.css, src/components/Home/home.css |
| home-phone.png | Home page, top | 390×844 @2x | Static content, menu closed | src/components/Header.js, src/components/Home/HeroSection.js, src/components/header.css, src/components/Home/home.css |
| reservation-desktop.png | Reservation, Table Details step | 1280×1000 | Today's date, first available time, 4 guests, Anniversary, invented guest Emma Carter (emma@example.test, 5550100123) | src/components/Reservations/ReservationsHome.js, src/components/Reservations/ReservationsFormDetails.js, src/components/Reservations/reservations.css, src/utils/mockAPI.js |
| review-desktop.png | Reservation, Review step | 1280×1000 | Same booking as above, after Next | src/components/Reservations/ReservationReview.js, src/components/Reservations/reservations.css |
