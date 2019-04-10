/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_Image;

import java.io.Serializable;

/**
 *
 * @author khainguyenquang
 */
public class Tbl_ImageDTO implements Serializable{
    private String url;
    private int tourId;

    public Tbl_ImageDTO() {
    }

    public Tbl_ImageDTO(String url, int tourId) {
        this.url = url;
        this.tourId = tourId;
    }

    /**
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * @return the tourId
     */
    public int getTourId() {
        return tourId;
    }

    /**
     * @param tourId the tourId to set
     */
    public void setTourId(int tourId) {
        this.tourId = tourId;
    }
    
    
}
