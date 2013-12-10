<?php

namespace Znieh\UserBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Ressource
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class Ressource
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="gold", type="integer")
     */
    private $gold;

    /**
     * @var integer
     *
     * @ORM\Column(name="sto", type="integer")
     */
    private $sto;

    public function __construct()
    {
        $this->gold = 0;
        $this->sto = 0;
    }


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set gold
     *
     * @param integer $gold
     * @return Ressource
     */
    public function setGold($gold)
    {
        $this->gold = $gold;
    
        return $this;
    }

    /**
     * Get gold
     *
     * @return integer 
     */
    public function getGold()
    {
        return $this->gold;
    }

    /**
     * Set sto
     *
     * @param integer $sto
     * @return Ressource
     */
    public function setSto($sto)
    {
        $this->sto = $sto;
    
        return $this;
    }

    /**
     * Get sto
     *
     * @return integer 
     */
    public function getSto()
    {
        return $this->sto;
    }
}
