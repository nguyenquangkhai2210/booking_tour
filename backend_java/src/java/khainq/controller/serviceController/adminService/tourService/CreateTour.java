/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.controller.serviceController.adminService.tourService;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import khainq.controller.ReadBodyRequest;
import khainq.modals.dto.TourDetail;
import khainq.modals.tbl_Image.Tbl_ImageDAO;
import khainq.modals.tbl_Tours.Tbl_ToursDAO;
import khainq.security.TokenAuthencationService;

/**
 *
 * @author khainguyenquang
 */
public class CreateTour extends HttpServlet {

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("test/json;charset=UTF-8");
        PrintWriter pw = response.getWriter();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        TokenAuthencationService authencationService = new TokenAuthencationService();
        String role = authencationService.getRoleFromAuthentication(request);

        ReadBodyRequest bodyRequest = new ReadBodyRequest();
        String jsonBody = bodyRequest.getJsonBody(request);

        TourDetail tour = gson.fromJson(jsonBody, TourDetail.class);

        try {
            if (role.equals("admin")) {
                Tbl_ToursDAO dao = new Tbl_ToursDAO();
                boolean check = dao.insertTours(tour);
                if(check){
                    int id = dao.getTourId(tour);
                    Tbl_ImageDAO imageDAO = new Tbl_ImageDAO();

                    tour.getListImage().forEach(data -> {
                        try {
                            imageDAO.insertImage(data, id);
                        } catch (Exception e) {
                            log("ERROR at UpdateProfile controller: " + e.getMessage());
                            response.setStatus(404);
                        }
                    });
                    response.setStatus(200);
                }
                
            }
        } catch (Exception e) {
            log("ERROR at CreateTour controller: " + e.getMessage());
            response.setStatus(404);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
