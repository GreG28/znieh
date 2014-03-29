<?php

namespace Znieh\UnitGameBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Expose;

/**
 * Armor
 *
 * @ORM\Table()
 * @ORM\Entity
 * @ExclusionPolicy("all")
 */
class Armor
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
     * @ORM\ManyToOne(targetEntity="Znieh\UserBundle\Entity\User", inversedBy="armors")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="ArmorPiece", cascade={"persist"})
     * @Expose
     */
    private $helm;

    /**
     * @ORM\ManyToOne(targetEntity="ArmorPiece", cascade={"persist"})
     * @Expose
     */
    private $torso;

    /**
     * @ORM\ManyToOne(targetEntity="ArmorPiece", cascade={"persist"})
     * @Expose
     */
    private $gloves;

    /**
     * @ORM\ManyToOne(targetEntity="ArmorPiece", cascade={"persist"})
     * @Expose
     */
    private $greaves;

    /**
     * @ORM\ManyToOne(targetEntity="ArmorPiece", cascade={"persist"})
     * @Expose
     */
    private $boots;

    /**
     * @ORM\ManyToOne(targetEntity="Znieh\VillageGameBundle\Entity\ArmorType")
     * @ORM\JoinColumn(nullable=false)
     * @Expose
     */
    private $type;

    public function guessType() {
        return "Lourd";
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
     * Constructor
     */
    public function __construct()
    {
        $this->pieces = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set user
     *
     * @param \Znieh\UserBundle\Entity\User $user
     *
     * @return Armor
     */
    public function setUser(\Znieh\UserBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Znieh\UserBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Add parts
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $piece
     *
     * @return Armor
     */
    public function addPiece(\Znieh\UnitGameBundle\Entity\ArmorPiece $piece)
    {
        $this->pieces[] = $piece;

        return $this;
    }

    /**
     * Remove pieces
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPieces $pieces
     */
    public function removePiece(\Znieh\UnitGameBundle\Entity\ArmorPiece $piece)
    {
        $this->pieces->removeElement($piece);
    }

    /**
     * Get parts
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPieces()
    {
        return $this->pieces;
    }

    /**
     * Set type
     *
     * @param \Znieh\VillageGameBundle\Entity\ArmorType $type
     *
     * @return Armor
     */
    public function setType(\Znieh\VillageGameBundle\Entity\ArmorType $type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return \Znieh\VillageGameBundle\Entity\ArmorType
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set helm
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $helm
     *
     * @return Armor
     */
    public function setHelm(\Znieh\UnitGameBundle\Entity\ArmorPiece $helm = null)
    {
        $this->helm = $helm;

        return $this;
    }

    /**
     * Get helm
     *
     * @return \Znieh\UnitGameBundle\Entity\ArmorPiece 
     */
    public function getHelm()
    {
        return $this->helm;
    }

    /**
     * Set torso
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $torso
     *
     * @return Armor
     */
    public function setTorso(\Znieh\UnitGameBundle\Entity\ArmorPiece $torso = null)
    {
        $this->torso = $torso;

        return $this;
    }

    /**
     * Get torso
     *
     * @return \Znieh\UnitGameBundle\Entity\ArmorPiece 
     */
    public function getTorso()
    {
        return $this->torso;
    }

    /**
     * Set gloves
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $gloves
     *
     * @return Armor
     */
    public function setGloves(\Znieh\UnitGameBundle\Entity\ArmorPiece $gloves = null)
    {
        $this->gloves = $gloves;

        return $this;
    }

    /**
     * Get gloves
     *
     * @return \Znieh\UnitGameBundle\Entity\ArmorPiece 
     */
    public function getGloves()
    {
        return $this->gloves;
    }

    /**
     * Set greaves
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $greaves
     *
     * @return Armor
     */
    public function setGreaves(\Znieh\UnitGameBundle\Entity\ArmorPiece $greaves = null)
    {
        $this->greaves = $greaves;

        return $this;
    }

    /**
     * Get greaves
     *
     * @return \Znieh\UnitGameBundle\Entity\ArmorPiece 
     */
    public function getGreaves()
    {
        return $this->greaves;
    }

    /**
     * Set boots
     *
     * @param \Znieh\UnitGameBundle\Entity\ArmorPiece $boots
     *
     * @return Armor
     */
    public function setBoots(\Znieh\UnitGameBundle\Entity\ArmorPiece $boots = null)
    {
        $this->boots = $boots;

        return $this;
    }

    /**
     * Get boots
     *
     * @return \Znieh\UnitGameBundle\Entity\ArmorPiece 
     */
    public function getBoots()
    {
        return $this->boots;
    }
}
