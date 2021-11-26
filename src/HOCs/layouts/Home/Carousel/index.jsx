import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Container, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { useSpring, animated } from "react-spring";
import { ReactComponent as ScrollArrowIcon } from "../../../../assets/img/scroll-arrow.svg";
import useStyles from "./style";

// swiper bundle styles
import "swiper/swiper-bundle.min.css";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

const Carousel = () => {
  const classes = useStyles();
  const delay = 200;
  const duration = 500;

  const AnimatedTypography = animated(Typography);
  const AnimatedButton = animated(Button);
  const AnimatedScrollArrowIcon = animated(ScrollArrowIcon);

  const [categoryStyles, categoryApi] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay,
    config: { duration },
    reset: true,
  }));

  const [titleStyles, titleApi] = useSpring(() => ({
    from: { y: -100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay,
    config: { duration },
    reset: true,
  }));

  const [descriptionStyles, descriptionApi] = useSpring(() => ({
    from: { scale: 1.15, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay,
    config: { duration },
    reset: true,
  }));

  const [buttonStyles, buttonApi] = useSpring(() => ({
    from: { y: 100, opacity: 0 },
    to: { y: 0, opacity: 1 },
    delay,
    config: { duration },
    reset: true,
  }));

  const [scrollArrowIconStyles, scrollArrowIconApi] = useSpring(() => ({
    from: { x: -3 },
    x: 0,
    config: { duration: 1000 },
  }));

  useEffect(() => {
    scrollArrowIconApi.start({
      transformX: scrollArrowIconStyles.x.to({
        range: [0, 0.5, 1],
        output: [-3, 0, 3],
      }),
      loop: { reverse: true },
    });
  }, [scrollArrowIconApi, scrollArrowIconStyles.x]);

  const handleSlideChange = () => {
    categoryApi.stop();
    titleApi.stop();
    descriptionApi.stop();
    buttonApi.stop();

    categoryApi.start({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay,
      config: { duration },
    });

    titleApi.start({
      from: { y: -100, opacity: 0 },
      to: { y: 0, opacity: 1 },
      delay,
      config: { duration },
    });

    descriptionApi.start({
      from: { scale: 1.15, opacity: 0 },
      to: { scale: 1, opacity: 1 },
      delay,
      config: { duration },
    });

    buttonApi.start({
      from: { y: 100, opacity: 0 },
      to: { y: 0, opacity: 1 },
      delay,
      config: { duration },
    });
  };

  const banners = [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
      tenPhim: "Bàn tay diệt quỷ",
      moTa: 'Sau khi bản thân bỗng nhiên sở hữu "Bàn tay diệt quỷ", võ sĩ MMA Yong Hoo (Park Seo Joon thủ vai) đã dấn thân vào hành trình trừ tà, trục quỷ đối đầu với Giám Mục Bóng Tối (Woo Dowan) – tên quỷ Satan đột lốt người. Từ đó sự thật về cái chết của cha Yong Hoo cũng dần được hé lộ cũng như nguyên nhân anh trở thành "người được chọn".',
    },
    {
      maBanner: 2,
      maPhim: 1283,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h.png",
      tenPhim: "Lật mặt: 48h",
      moTa: "Một gia đình bị truy đuổi giữa vùng sông nước. Cơ hội nào cho người đàn ông cứu lấy vợ con khỏi bọn xã hội đen máu mặt?",
    },
    {
      maBanner: 3,
      maPhim: 1284,
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/cuoc-chien-sinh-tu.png",
      tenPhim: "Mortal Kombat",
      moTa: "Mortal Kombat: Cuộc chiến sinh tử là bộ phim điện ảnh thuộc thể loại hành động võ thuật xen lẫn giả tưởng sắp ra mắt của Mỹ. Phim do Simon McQuoid chịu trách nhiệm chỉ đạo, với phần kịch bản được chắp bút bởi Greg Russo và Dave Callaham, phát triển dựa trên cốt truyện của Oren Uziel và Russo.",
    },
  ];

  return (
    <Box position="relative">
      <Swiper
        autoHeight={true}
        loop={true}
        autoplay={{ delay: 8000 }}
        pagination={{
          clickable: true,
          type: "bullets",
          bulletClass: classes.sliderPaginationBullet,
          bulletActiveClass: "active",
        }}
        onSlideChange={handleSlideChange}
      >
        {banners.map((banner) => {
          return (
            <SwiperSlide key={banner.maPhim}>
              <Box position="relative">
                <Box className={classes.sliderOverlay}></Box>
                <img
                  src={banner.hinhAnh}
                  alt="slide1"
                  className={classes.sliderImage}
                />
                <Box className={classes.sliderContent}>
                  <Container fixed>
                    <Box width="70%">
                      <AnimatedTypography
                        variant="overline"
                        className={classes.silderContentCategory}
                        style={categoryStyles}
                      >
                        ACTION, ADVENTURE, FANTASY
                      </AnimatedTypography>
                      <AnimatedTypography
                        variant="h3"
                        className={classes.sliderContentTitle}
                        style={titleStyles}
                      >
                        {banner.tenPhim}
                      </AnimatedTypography>
                      <AnimatedTypography
                        variant="body"
                        className={classes.sliderContentDescription}
                        style={descriptionStyles}
                      >
                        {banner.moTa}
                      </AnimatedTypography>
                      <AnimatedButton
                        variant="contained"
                        startIcon={<PlayArrowIcon />}
                        className={classes.sliderButton}
                        style={buttonStyles}
                      >
                        <span className={classes.playTrailer}>
                          Play trailer
                        </span>
                      </AnimatedButton>
                    </Box>
                  </Container>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Box
        className={classes.scrollArrowContainer}
        component="a"
        href="#movieList"
      >
        <AnimatedScrollArrowIcon
          className={classes.scrollArrowIcon}
          style={scrollArrowIconStyles}
        />
      </Box>
    </Box>
  );
};

export default Carousel;
