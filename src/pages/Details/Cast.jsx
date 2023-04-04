import React from "react";
import { useSelector } from "react-redux";
import ContentWrap from "../../components/ContentWrap";
import LazyLoadImg from '../../components/lazyLoadImg';
import avatar from "../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrap>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((itm) => {
                            let imgUrl = itm.profile_path ? url.profile + itm.profile_path : avatar;
                            return(
                                <div key={itm.id} className="listItem">
                                    <div className="profileImg">
                                        <LazyLoadImg src={imgUrl} alt="Avatar"/>
                                    </div>
                                    <div className="name">{itm.name}</div>
                                    <div className="character">{itm.character}</div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrap>
        </div>
    );
};

export default Cast;